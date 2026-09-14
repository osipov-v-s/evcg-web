import { useNavigate } from "react-router-dom"
import { calculateOrientationScores } from "./careerAnchorsResultCalc"
import { sortByParam } from "../utils/sortByParams"
import { Toaster } from "react-hot-toast"
import { orientationsDescriptions, orientationsTranslate } from "./careerAnchorsData"
import { formatDateRU } from "../../../services/dates/formatDate"
import { formatTime } from "../utils/formatTime"
import { Button } from "../../ui/reusable/button"
import { ArrowLeft } from "lucide-react"
import { useClientTestResult } from "../../resultsPage/hooks/useClientTestResult"
import { useTestResult } from "../../resultsPage/hooks/useTestResult"

export const CareerAnchorsResults = () => {
    const navigate = useNavigate()

    const { result, loading } = useTestResult({
        testType: "Career-Anchors",
        extractInputData: (state) => state?.careerAnchorsTasks,
        calculateResult: (tasks, time) => calculateOrientationScores(tasks, time),
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
            <h3>Результаты теста «Якоря карьеры»:</h3>

            <div className="results-list">
                {result.psychParams.map((param) => {
                    const title = orientationsTranslate[param.name] || param.name
                    const description = orientationsDescriptions[param.name]
                    const isHigh = param.param >= 5

                    return (
                        <div className={`result-card ${isHigh ? "active-anchor" : ""}`} key={param.name}>
                            <p className="result-title">
                                {isHigh ? (
                                    <b>{title}: {param.param}</b>
                                ) : (
                                    `${title}: ${param.param}`
                                )}
                            </p>
                            {description && <p className="description-text">{description}</p>}
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