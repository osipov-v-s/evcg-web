import { useLocation } from "react-router-dom"
import { TestResultResponse } from "../../../types/testTypes"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"


interface UseTestResultOption<TInput, TResult> {
    testType: string
    calculateResult: (data: TInput, time?: number ) => TestResultResponse
    extractInputData: (state: any) => TInput | null
    transformResponse?: (response: TestResultResponse) => TestResultResponse
}

export const useTestResult = <TInput, TResult> ({
    testType,
    calculateResult,
    extractInputData,
    transformResponse = (r) => r
}: UseTestResultOption<TInput, TResult>) => {
    const location = useLocation()
    const {getToken} = useAuth()
    const [result, setResult] = useState<TestResultResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const isViewMode = location.state?.isViewMode || false

    useEffect(()=> {
        const processResult = async () => {
            try {
                if (isViewMode && location.state?.psychTest){
                    setResult(transformResponse(location.state?.psychTest))
                    return
                }
                const token = getToken()
                 //Обычно extractInputData возвращает неизмененные данные, работает в опр. сценариях
                const inputData = extractInputData(location.state)
                if (!inputData) {
                    toast.error("Нет данных для обработки")
                    return
                }
                const calculatedResult = calculateResult(
                    inputData, 
                    location.state?.completionTimeSeconds
                )
                const saveResult = await testApi.createTest(token, calculatedResult)
                //Тут функция как то меняет запрос (зачем ?)
                setResult(transformResponse(saveResult))

            } catch(err) {
                console.error(err)
                toast.error("Ошибка при сохоанении результатов")
            } finally {
                setLoading(false)
            }
        }
        processResult()
    }, [])
    return {result, loading, isViewMode}
}