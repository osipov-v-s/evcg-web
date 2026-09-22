import { useEffect, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../ui/reusable/button"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { ResultCard } from "../../resultsPage/ResultCard"
import { Toaster } from "react-hot-toast"

interface ChainedResults {
    firstStep: { tasks: any[]; completionTimeSeconds: number }
    secondStep: { tasks: any[]; completionTimeSeconds: number }
}

export const VrTestResults = () => {
    const { professionId } = useParams<{ professionId: string }>()
    const location = useLocation()
    const navigate = useNavigate()
    const savedRef = useRef(false)

    const chained = (location.state?.chainedResults ?? null) as ChainedResults | null

    // Placeholder for saving — enable when format is decided
    useEffect(() => {
        if (!chained || !professionId || savedRef.current) return
        savedRef.current = true
        // TODO: call vrTestApi.createTest here later
    }, [chained, professionId])

    if (!chained) {
        return (
            <div className="result-wrapper">
                <NoResults
                    variant="empty"
                    title="Результатов нет"
                    message="Сначала пройдите VR-тест."
                />
                <Button label="Назад к тестам" icon={<ArrowLeft />} onClick={() => navigate("/tests")} />
            </div>
        )
    }

    const stage1Count = chained.firstStep?.tasks?.length ?? 0
    const stage2Count = chained.secondStep?.tasks?.length ?? 0
    const time1 = chained.firstStep?.completionTimeSeconds ?? 0
    const time2 = chained.secondStep?.completionTimeSeconds ?? 0

    return (
        <div className="result-wrapper">
            <h3>Результаты VR-теста</h3>

            <ResultCard title="Этап 1 — интересы" highlight>
                <p>Отвечено вопросов: <b>{stage1Count}</b></p>
                <p>Время: {time1} сек.</p>
            </ResultCard>

            <ResultCard title="Этап 2 — знания" highlight>
                <p>Отвечено вопросов: <b>{stage2Count}</b></p>
                <p>Время: {time2} сек.</p>
            </ResultCard>

            <Button label="Назад к тестам" icon={<ArrowLeft />} onClick={() => navigate("/tests")} />
            <Toaster />
        </div>
    )
}