import { AuthMode } from "../types/account/authCredentials"

export type AuthAction = "login" | "register"
export type SeverFieldKey = "identifier" | "password"

export interface ParsedApiError {
    status?: number
    kind: "network" | "timeout" | "http" | "unknown"
    message: string
    fieldErrors: Partial<Record<SeverFieldKey, string>>
}

interface ParseOptions {
    action: AuthAction
    mode?: AuthMode
}

const MAX_SERVER_TEXT_LENGTH = 200
const CYRILLIC = /[А-Яа-яЁё]/

const SERVER_TEXT_STATUSES = new Set([400, 403, 422, 423])
const FIELD_ERROR_STATUSES = new Set([400, 409, 422])

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null


/* ───────────── Чтение «сырой» ошибки (axios / fetch-обёртка / Error) ───────────── */
const readStatus = (error: unknown): number | undefined => {
    if (!isRecord(error)) return undefined

    const response = error.response
    if (isRecord(response) && typeof response.status === "number") return response.status
    if (typeof error.status === "number") return error.status
    if (typeof error.statusCode === "number") return error.statusCode

    if (typeof error.message === "string") {
        const match = /status(?: code)?[:\s]+(\d{3})\b/i.exec(error.message)
        if (match) return Number(match[1])
    }
    return undefined
}

const readBody = (error: unknown): unknown => {
    if (!isRecord(error)) return undefined
    if (isRecord(error.response) && "data" in error.response) return error.response.data
    return error.data ?? error.body
}

const readRetryAfter = (error: unknown): number | undefined => {
    if (!isRecord(error) || !isRecord(error.response)) return undefined

    const headers = error.response.headers
    if (!isRecord(headers)) return undefined

    const raw: unknown = typeof headers.get === "function"
        ? (headers.get as (this: unknown, name: string) => unknown).call(headers, "retry-after")
        : headers["retry-after"]

    const seconds = Number(raw)
    return Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : undefined
}

const isTimeoutError = (error: unknown): boolean =>
    isRecord(error) &&
    (error.code === "ECONNABORTED" ||
        error.code === "ETIMEDOUT" ||
        error.name === "AbortError" ||
        error.name === "TimeoutError")

const isNetworkError = (error: unknown): boolean => {
    if (typeof navigator !== "undefined" && navigator.onLine === false) return true
    if (!isRecord(error)) return false
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") return true
    return error instanceof TypeError &&
        typeof error.message === "string" &&
        /fetch|network|load failed/i.test(error.message)
}



/* ───────────── Текст сервера и ошибки по полям ───────────── */
const cleanText = (value: unknown): string | undefined => {
    const raw = Array.isArray(value) ? value[0] : value
    if (typeof raw !== "string") return undefined

    const text = raw.trim()
    // длинные тексты и HTML (страницы ошибок nginx и т.п.) пользователю не показываем
    if (!text || text.length > MAX_SERVER_TEXT_LENGTH || text.startsWith("<")) return undefined
    return text
}

const extractServerMessage = (body: unknown): string | undefined => {
    if (typeof body === "string") return cleanText(body)
    if (!isRecord(body)) return undefined

    for (const key of ["message", "detail", "title"]) {
        const text = cleanText(body[key])
        if (text) return text
    }

    const nested = body.error
    return isRecord(nested) ? cleanText(nested.message) : cleanText(nested)
}

const toFieldKey = (name: string): SeverFieldKey | undefined => {
    const last = name.split(".").pop()?.replace(/\[\d+\]$/, "").toLowerCase()
    if (!last) return undefined
    if (["email", "mail", "login", "username", "identifier"].includes(last)) return "identifier"
    if (last === "password") return "password"
    return undefined
}

const collectFieldErrors = (body: unknown): ParsedApiError["fieldErrors"] => {
    const result: ParsedApiError["fieldErrors"] = {}
    if (!isRecord(body)) return result

    const add = (name: unknown, text: unknown) => {
        if (typeof name !== "string") return
        const key = toFieldKey(name)
        const message = cleanText(text)
        // как и общий текст, показываем только русские формулировки
        if (key && message && CYRILLIC.test(message) && !result[key]) result[key] = message
    }

    const source = body.errors ?? body.fieldErrors
    if (Array.isArray(source)) {
        for (const item of source) {
            if (isRecord(item)) add(item.field ?? item.property ?? item.propertyName ?? item.name, item.message ?? item.error)
        }
    } else if (isRecord(source)) {
        for (const [name, text] of Object.entries(source)) add(name, text)
    }
    return result
}



/* ───────────── Сообщения по статусам ───────────── */
const statusMessage = (status: number, action: AuthAction, mode?: AuthMode, retryAfter?: number): string => {
    const isLogin = action === "login"

    switch (status) {
        case 400:
            return isLogin
                ? "Некорректные данные для входа. Проверьте почту/логин и пароль"
                : "Некорректные данные. Проверьте заполненные поля"
        case 401:
            return isLogin
                ? "Неверная почта/логин или пароль"
                : "Требуется авторизация. Обновите страницу и повторите попытку"
        case 402:
            return "Доступ к сервису ограничен. Обратитесь в поддержку"
        case 403:
            return isLogin
                ? "Доступ запрещён. Аккаунт заблокирован или не подтверждён"
                : "Регистрация с этими данными недоступна"
        case 404:
            return isLogin
                ? "Аккаунт не найден. Проверьте правильность ввода почты / логина или зарегистрируйтесь"
                : "Сервис регистрации не найден (404). Попробуйте позже"
        case 405:
        case 415:
            return "Сервер не поддерживает этот запрос. Обратитесь в поддержку"
        case 408:
            return "Время ожидания ответа истекло. Повторите попытку"
        case 409:
            if (isLogin) return "Конфликт данных. Повторите попытку"
            if (mode === "login") return "Этот логин уже занят"
            if (mode === "email") return "Эта почта уже зарегистрирована"
            return "Аккаунт с такими данными уже существует"
        case 410:
            return "Этот способ входа больше не поддерживается"
        case 413:
            return "Слишком большой запрос. Сократите введённые данные"
        case 422:
            return "Данные не прошли проверку. Проверьте поля формы"
        case 423:
            return "Аккаунт временно заблокирован. Попробуйте позже"
        case 429:
            return retryAfter
                ? `Слишком много попыток. Повторите через ${retryAfter} сек.`
                : "Слишком много попыток. Подождите немного и повторите"
        case 500:
            return "Внутренняя ошибка сервера. Попробуйте позже"
        case 502:
        case 503:
        case 504:
            return "Сервер временно недоступен. Попробуйте через несколько минут"
        default:
            return status >= 500
                ? `Ошибка сервера (код ${status}). Попробуйте позже`
                : `Не удалось выполнить запрос (код ${status})`
    }
}



/* ───────────── Главная функция ───────────── */
export const parseApiError = (error: unknown, { action, mode }: ParseOptions): ParsedApiError => {
    const status = readStatus(error)

    if (status === undefined) {
        if (isTimeoutError(error)) {
            return { kind: "timeout", message: "Сервер не отвечает. Повторите попытку позже", fieldErrors: {} }
        }
        if (isNetworkError(error)) {
            return { kind: "network", message: "Нет соединения с сервером. Проверьте интернет и повторите попытку", fieldErrors: {} }
        }
        return {
            kind: "unknown",
            message: action === "login"
                ? "Не удалось войти. Повторите попытку"
                : "Не удалось зарегистрироваться. Повторите попытку",
            fieldErrors: {},
        }
    }

    const body = readBody(error)
    const fieldErrors = FIELD_ERROR_STATUSES.has(status) ? collectFieldErrors(body) : {}

    let message = statusMessage(status, action, mode, readRetryAfter(error))

    const serverMessage = extractServerMessage(body)
    if (SERVER_TEXT_STATUSES.has(status) && serverMessage && CYRILLIC.test(serverMessage)) {
        message = serverMessage
    }

    if (status === 409 && action === "register") {
        fieldErrors.identifier = message
    }

    return { status, kind: "http", message, fieldErrors }
}