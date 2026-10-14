import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { PaginatedResponse } from "../../../types/common"
import { StoredFile, StoredFileFilters } from "../../../types/files/file"
import { storedFileApi } from "../../../services/api/storedFileApi"

interface UseStoredFilesOptions {
    filters: StoredFileFilters
    page: number
    size: number
}

interface UseStoredFilesResult {
    response: PaginatedResponse<StoredFile> | undefined
    isLoading: boolean
    error: unknown
}
// Хук используется для фильтрации файлов, применяет signal для отмены запроса
// Возвращает: 
// states response - ответ
// isLoading - статус загрузки
// error - информацию об ошибке
export const useStoredFiles = ({
    filters,
    page,
    size,
}: UseStoredFilesOptions): UseStoredFilesResult => {
    const { getToken } = useAuth()
    const [response, setResponse] = useState<PaginatedResponse<StoredFile>>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    const load = useCallback(
        async (signal: AbortSignal) => {
            try {
                setIsLoading(true)
                setError(null)
                const data = await storedFileApi.getFiles(
                    getToken(),
                    filters,
                    page,
                    size,
                    "createdAt,desc",
                    signal
                )
                setResponse(data)
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return
                setError(err)
            } finally {
                setIsLoading(false)
            }
        },
        [getToken, filters, page, size]
    )

    useEffect(() => {
        const controller = new AbortController()
        load(controller.signal)
        return () => controller.abort()
    }, [load])

    return { response, isLoading, error }
}