import { AuthCredentials, AuthMode } from "../types/account/authCredentials"



/* ───────────── Правила (при необходимости подстройте под бэкенд) ───────────── */
export const EMAIL_MAX_LENGTH = 254
export const LOGIN_MIN_LENGTH = 3
export const LOGIN_MAX_LENGTH = 32
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 64

export const LOGIN_HINT = `От ${LOGIN_MIN_LENGTH} до ${LOGIN_MAX_LENGTH} символов: латиница, цифры, «.», «_», «-»`
export const PASSWORD_HINT = `Не короче ${PASSWORD_MIN_LENGTH} символов, минимум одна буква и одна цифра`

const EMAIL_REGEX = /^[^\s@]+@[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)*\.\p{L}{2,}$/u
const LOGIN_REGEX = /^[A-Za-z0-9][A-Za-z0-9._-]*$/



/* ───────────── Нормализация ───────────── */
export const normalizeEmail = (value: string) => value.trim().toLowerCase()
export const normalizeLogin = (value: string) => value.trim()

/** В поле входа можно ввести и почту, и логин: наличие «@» означает почту */
export const detectAuthMode = (identifier: string): AuthMode =>
    identifier.includes("@") ? "email" : "login"

export const buildCredentials = (mode: AuthMode, identifier: string, password: string): AuthCredentials =>
    mode === "email"
        ? { email: normalizeEmail(identifier), password }
        : { login: normalizeLogin(identifier), password }

export const hasErrors = (errors: object) => Object.values(errors).some(Boolean)



/* ───────────── Валидаторы отдельных полей ───────────── */
export const validateEmail = (value: string): string | undefined => {
    const email = normalizeEmail(value)
    if (!email) return "Введите электронную почту"
    if (email.length > EMAIL_MAX_LENGTH) return `Почта не должна быть длиннее ${EMAIL_MAX_LENGTH} символов`

    const localPart = email.slice(0, Math.max(email.indexOf("@"), 0))
    const isLocalPartBroken =
        localPart.length > 64 ||
        localPart.startsWith(".") ||
        localPart.endsWith(".") ||
        localPart.includes("..")

    if (isLocalPartBroken || !EMAIL_REGEX.test(email)) {
        return "Введите корректную почту, например example@gmail.com"
    }
    return undefined
}

export const validateLogin = (value: string): string | undefined => {
    const login = normalizeLogin(value)
    if (!login) return "Введите логин"
    if (login.length < LOGIN_MIN_LENGTH) return `Логин должен быть не короче ${LOGIN_MIN_LENGTH} символов`
    if (login.length > LOGIN_MAX_LENGTH) return `Логин должен быть не длиннее ${LOGIN_MAX_LENGTH} символов`
    if (!LOGIN_REGEX.test(login)) {
        return "Логин может содержать только латиницу, цифры, «.», «_» и «-» и должен начинаться с буквы или цифры"
    }
    return undefined
}

export const validatePassword = (value: string, identifier?: string): string | undefined => {
    if (!value) return "Введите пароль"
    if (value.length < PASSWORD_MIN_LENGTH) return `Пароль должен быть не короче ${PASSWORD_MIN_LENGTH} символов`
    if (value.length > PASSWORD_MAX_LENGTH) return `Пароль не должен быть длиннее ${PASSWORD_MAX_LENGTH} символов`
    if (/\s/.test(value)) return "Пароль не должен содержать пробелы"
    if (!/\p{L}/u.test(value) || !/\d/.test(value)) return "Пароль должен содержать хотя бы одну букву и одну цифру"

    const trimmedIdentifier = identifier?.trim().toLowerCase()
    if (trimmedIdentifier && value.toLowerCase() === trimmedIdentifier) {
        return "Пароль не должен совпадать с почтой или логином"
    }
    return undefined
}

export const validateRepeatPassword = (password: string, repeat: string): string | undefined => {
    if (!repeat) return "Повторите пароль"
    if (password !== repeat) return "Пароли не совпадают"
    return undefined
}



/* ───────────── Форма входа ───────────── */
export interface LoginFormValues {
    identifier: string
    password: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
    const errors: LoginFormErrors = {}
    const identifier = values.identifier.trim()

    if (!identifier) {
        errors.identifier = "Введите почту или логин"
    } else if (identifier.length > EMAIL_MAX_LENGTH) {
        errors.identifier = `Значение не должно быть длиннее ${EMAIL_MAX_LENGTH} символов`
    } else if (/\s/.test(identifier)) {
        errors.identifier = "Почта или логин не должны содержать пробелы"
    } else if (detectAuthMode(identifier) === "email") {
        const emailError = validateEmail(identifier)
        if (emailError) errors.identifier = emailError
    }

    if (!values.password) errors.password = "Введите пароль"

    return errors
}



/* ───────────── Форма регистрации ───────────── */
export interface RegistrationFormValues {
    email: string
    login: string
    password: string
    repeatPassword: string
    privacyAccepted: boolean
    agreementAccepted: boolean
}

export type RegistrationField =
    | "email"
    | "login"
    | "identifier"
    | "password"
    | "repeatPassword"
    | "privacyAccepted"
    | "agreementAccepted"

export type RegistrationFormErrors = Partial<Record<RegistrationField, string>>

export const getRegistrationMode = ({ email, login }: Pick<RegistrationFormValues, "email" | "login">): AuthMode | undefined => {
    const hasEmail = email.trim() !== ""
    const hasLogin = login.trim() !== ""
    if (hasEmail === hasLogin) return undefined
    return hasEmail ? "email" : "login"
}

export const validateRegistrationForm = (values: RegistrationFormValues): RegistrationFormErrors => {
    const errors: RegistrationFormErrors = {}
    const hasEmail = values.email.trim() !== ""
    const hasLogin = values.login.trim() !== ""
    const identifier = hasEmail ? values.email : values.login

    if (!hasEmail && !hasLogin) {
        errors.identifier = "Укажите почту или логин"
    } else if (hasEmail && hasLogin) {
        errors.identifier = "Укажите что-то одно: почту или логин"
    } else if (hasEmail) {
        const emailError = validateEmail(values.email)
        if (emailError) errors.email = emailError
    } else {
        const loginError = validateLogin(values.login)
        if (loginError) errors.login = loginError
    }

    const passwordError = validatePassword(values.password, identifier)
    if (passwordError) errors.password = passwordError

    const repeatError = validateRepeatPassword(values.password, values.repeatPassword)
    if (repeatError) errors.repeatPassword = repeatError

    if (!values.privacyAccepted) errors.privacyAccepted = "Подтвердите согласие с политикой конфиденциальности"
    if (!values.agreementAccepted) errors.agreementAccepted = "Подтвердите согласие с пользовательским соглашением"

    return errors
}