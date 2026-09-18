import { useEffect, useState } from "react"
import { MathPrediction, Prediction } from "../../types/prediction/prediction"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { NoResults } from "../ui/noResultComponent/NoResult"
import "./css/prediction.css"
import { predictionAPI } from "../../services/api/predictionApi"
import { getApiErrorMessage } from "../../services/api/error"
import axios from "axios"
import { MathPredictionCard } from "./cards/MathPredictionCard"
import { PredictionCard } from "./cards/PredictionCard"


export const Predictions = () => {
    const [prediction, setPrediction] = useState<Prediction | null>(null)
    const [mathPredictions, setMathPredictions] = useState<MathPrediction[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [isPredicting, setIsPredicting] = useState(false)
    const { getToken, getEmail } = useAuth()

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const token = getToken()
                const [predictionsTemp, mathPredictionsTemp] = await Promise.all([
                    predictionAPI.getLatestPrediction(token),
                    predictionAPI.getLatestMathPrediction(token)
                ])
                if (!predictionsTemp || !mathPredictionsTemp){
                    toast.error("Не удалось загрузить один из результатов")
                }
                setPrediction(predictionsTemp)
                setMathPredictions(mathPredictionsTemp.sort((f, s) => s.percentage - f.percentage))
            } catch (err) {
                setPrediction(null)
                if (!(axios.isAxiosError(err) && err.response?.status === 404)) {
                    toast.error(getApiErrorMessage(err, "Не удалось загрузить результат"))
                }
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const predict = async () => {
        if (isPredicting || loading) return
        try {
            setIsPredicting(true)
            const token = getToken()
            const [cluster, math] = await Promise.all([
                predictionAPI.predict(token),
                predictionAPI.mathPredict(token),
            ])
            setPrediction(cluster)
            setMathPredictions(math.sort((f, s) => s.percentage - f.percentage))
            toast.success("Результаты успешно получены!")
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Возникла ошибка при подсчете результатов"))
        } finally {
            setIsPredicting(false)
        }
    }

    if (loading) {
        return <NoResults variant="loading" message="Загрузка результатов..." />
    }


    return (
        <div className="prediction-results scroll-y">
            <div className="results-header">
                <h1 className="results-title">Результаты подбора для {getEmail()}</h1>
                <p className="results-subtitle">
                    Результат рассчитывается по доступным данным профиля и пройденных этапов диагностики.
                </p>
            </div>
            {!prediction ? <NoResults variant="empty" message="Пока нет результатов" />:
            
                <PredictionCard
                    prediction={prediction}
                    isPredicting={isPredicting}
                    onRefresh={predict}
                />}

            {!mathPredictions ? <NoResults variant="empty" message="Пока нет результатов" /> : 
            (
                mathPredictions.map(mathPred => (
                    <div className="math-prediction-block">
                        <MathPredictionCard math={mathPred} />
                    </div>
                ))
                
            )}

            <Toaster position="top-right" />
        </div>
    )
}