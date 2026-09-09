import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import toast, { Toaster } from "react-hot-toast"
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { HollandProfession, HollandTask } from "./hollandTypes"
import api, { getBaseUrl } from "../../../services/api/api"
import { testApi } from "../../../services/api/testApi"
import { sortByParam } from "../utils/sortByParams"
import { Button } from "../../ui/reusable/button"
import { ArrowLeft } from "lucide-react"
import { useTestResult } from "../../resultsPage/hooks/useTestResult"
import { time } from "console"
import { ResultCard } from "../../resultsPage/ResultCard"
import { TestResultLayout } from "../../resultsPage/TestResultLayout"

export const HollandResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()

    const [hollandProfessions, setHollandProfessions] = useState<HollandProfession[]>()

    const {result, loading} = useTestResult({
        testType: "Professional-Orientation-Holland",
        extractInputData: (state) => state?.hollandTasks,
        calculateResult: (hollandTasks, time) => ({
            ...calculateResults(hollandTasks),
            completionTimeSeconds: time || 0
        }),
        transformResponse: (response) => ({
            ...response, 
            psychParams: sortByParam(response.psychParams)
        })
    })

    useEffect(() => {
        const loadProfessions = async () => {
            try {
                const response = await api.get(`${getBaseUrl()}/public/prof_holland/data/profHollandTypes.json`)
                setHollandProfessions(response.data as HollandProfession[])
            } catch (err) {
                console.error(`Ошибка при загрузке профессий ${err}`)
                toast.error("Проверьте интернет соединение")
            }
        }
        loadProfessions()
    }, [])


    const calculateResults = (answers: HollandTask[]) => {
        const stats = answers.reduce<Record<string, number>>((acc, question) => {
            const selectedOption = question.options.find(opt => opt.id === question.userAnswer)
            if (selectedOption?.type)
                acc[selectedOption.type] = (acc[selectedOption.type] || 0) + 1
            return acc

        }, {})
        const resultsArray = Object.entries(stats).map(([name, param]) => ({ name, param }))
        return {
            testTypeName: "Professional-Orientation-Holland",
            psychParams: resultsArray
        }
    }
    if (!result || !hollandProfessions || loading) return (<>
        <p>Загрузка теста...</p>
    </>)
    const renderProfessionCard = (param: { name: string; param: number }, profession: HollandProfession) => {
        const isHigh = param.param >= 10

        return (
            <ResultCard key={param.name} highlight={isHigh}>
                <p>
                    {isHigh && <b>{profession.title} : {param.param} </b> }
                    {!isHigh && <>{profession.title} : {param.param}</>}
                </p>
                <p>{profession.short}</p>
                <p>{profession.description}</p>
                <p><strong>Подходящие профессии:</strong> {profession.suitable_professions}</p>
                <p><strong>Ключевые качества:</strong> {profession.traits}</p>
            </ResultCard>
        )
    }
    return (<>
        <TestResultLayout title="Результаты профориентации по методике Холланда">
            <div className="w-full scroll-y flex flex-col gap-3">
                {result.psychParams.map(param => {
                    const profession = hollandProfessions.find(prof => prof.name === param.name)
                    if (!profession) return null
                    return renderProfessionCard(param, profession)
                })}
            </div>
        </TestResultLayout>
        <Toaster />
    </>)

}