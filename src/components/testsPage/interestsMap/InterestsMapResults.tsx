import { useNavigate } from "react-router-dom"
import { calculateInterestScores } from "./interestsMapResultCalc"
import { sortByParam } from "../utils/sortByParams"
import { Toaster } from "react-hot-toast"
import { directionsTranslate } from "./interestsMapData"
import { formatDateRU } from "../../../services/dates/formatDate"
import { formatTime } from "../utils/formatTime"
import { Button } from "../../ui/reusable/button"
import { ArrowLeft } from "lucide-react"
import { useClientTestResult } from "../../resultsPage/hooks/useClientTestResult"

export const InterestsMapResults = () => {
    const navigate = useNavigate()

    const { result, loading } = useClientTestResult({
        extractInputData: (state) => state?.interestsMapTasks,
        calculateResult: (tasks, time) => calculateInterestScores(tasks, time),
        transformResponse: (response) => ({
            ...response,
            psychParams: sortByParam(response.psychParams)
        })
    })

    if (loading || !result) {
        return (
            <div className="result-wrapper">
                <p>Загрузка результатов...</p>
                <Toaster />
            </div>
        )
    }

    return (
        <div className="result-wrapper">
            <h3>Результаты теста «Карта интересов»:</h3>

            <div className="results-list">
                {result.psychParams.map((param) => {
                    const title = directionsTranslate[param.name] || param.name
                    const isHigh = param.param >= 5 // Выделяем ярко выраженные интересы (от 5 до 10 баллов)

                    return (
                        <div className={`result-card ${isHigh ? "active-anchor" : ""}`} key={param.name}>
                            <p className="result-title">
                                {isHigh ? (
                                    <b>{title}: {param.param > 0 ? `+${param.param}` : param.param}</b>
                                ) : (
                                    `${title}: ${param.param > 0 ? `+${param.param}` : param.param}`
                                )}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="result-footer">
                {result.createdAt && (
                    <p>Дата прохождения: {formatDateRU(result.createdAt)}</p>
                )}

                {result.completionTimeSeconds !== undefined && result.completionTimeSeconds > 0 && (
                    <p>
                        Пройдено за: {formatTime(Math.floor(result.completionTimeSeconds / 60))} : {formatTime(result.completionTimeSeconds % 60)}
                    </p>
                )}

                <div className="result-actions">
                    <Button label="Назад к тестам" icon={<ArrowLeft />} onClick={() => navigate("/tests")} />
                </div>
            </div>

            <Toaster />
        </div>
    )
}