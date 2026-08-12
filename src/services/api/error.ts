import axios from "axios"

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
    if (!axios.isAxiosError(error)) return fallback
    const status = error.response?.status
    const responseMessage = error.response?.data?.message
    if (typeof responseMessage === "string" && responseMessage.trim()) return responseMessage
    if (status === 403) return "У вас нет доступа к этому действию."
    if (status === 404) return "Запрошенные данные не найдены."
    if (status === 409) return "Данные конфликтуют с уже существующей записью."
    if (status === 400) return "Проверьте заполнение полей."
    return fallback
}
