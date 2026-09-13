import { useLocation } from "react-router-dom"
import { TestResultResponse } from "../../../types/testTypes"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface UseClientTestResultOptions<TInput> {
    calculateResult: (data: TInput, time?: number) => TestResultResponse
    extractInputData: (state: any) => TInput | null
    transformResponse?: (response: TestResultResponse) => TestResultResponse
}

export const useClientTestResult = <TInput>({
    calculateResult,
    extractInputData,
    transformResponse = (r) => r
}: UseClientTestResultOptions<TInput>) => {
    const location = useLocation()
    const [result, setResult] = useState<TestResultResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            // Если пришли уже готовые результаты
            if (location.state?.psychTest) {
                setResult(transformResponse(location.state.psychTest))
                return
            }

            // Извлекаем ответы
            const inputData = extractInputData(location.state)
            if (!inputData) {
                toast.error("Нет данных для обработки")
                return
            }

            // Считаем локально БЕЗ запроса к testApi.createTest
            const calculatedResult = calculateResult(
                inputData,
                location.state?.completionTimeSeconds
            )

            // Устанавливаем в состояние
            setResult(transformResponse(calculatedResult))
        } catch (err) {
            console.error(err)
            toast.error("Ошибка при расчете результатов")
        } finally {
            setLoading(false)
        }
    }, [])

    return { result, loading }
}