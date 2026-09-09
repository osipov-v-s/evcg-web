import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import axios from "axios"
import { getBaseUrl } from "../../../services/api/api"
import { calcIqTestResult, calcIqTestScore } from "./IqPotentialResultsCalc"
import { usePupilData } from "../hooks/usePupilData"
import toast from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { formatDateRU } from "../../../services/dates/formatDate"
import { Moon, Clock, Droplet, Repeat, MessageCircleQuestion, ChevronDown } from "lucide-react"
import { formatTime } from "../utils/formatTime"
import { ResultCard } from "../../resultsPage/ResultCard"
import { ResultMetadata } from "../../resultsPage/ResultMetadata"
import { TestResultLayout } from "../../resultsPage/TestResultLayout"
import { NoResults } from "../../ui/noResultComponent/NoResult"

const iqTestPath = "public/iq_potential/data"

export const IqPotentialResults = () => {
    const location = useLocation()
    const { getToken } = useAuth()
    const { pupilData, getBirthdayDate } = usePupilData()
    
    // State
    const [result, setResult] = useState<TestResultResponse>()
    const [loading, setLoading] = useState(true)
    const [allResults, setAllResults] = useState<TestResultResponse[]>()
    const [showHistory, setShowHistory] = useState(false)
    const [iqTableData, setIqTableData] = useState<any>(null)

    const isViewMode = location.state?.isViewMode || false

    //  STEP 1: Load IQ table data
    useEffect(() => {
        const loadIqTable = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/${iqTestPath}/iqData.json`)
                setIqTableData(response.data)
            } catch (err) {
                console.error(err)
                toast.error("Ошибка при загрузке данных")
            }
        }
        loadIqTable()
    }, [])

    //  STEP 2: Handle view mode (show existing result)
    useEffect(() => {
        if (!isViewMode) return
        
        const psychTest = location.state?.psychTest
        if (psychTest) {
            setResult(psychTest)
            setLoading(false)
        }
    }, [isViewMode, location.state?.psychTest])

    //  STEP 3: Calculate result (only when ALL data is ready)
    useEffect(() => {
        // Skip if:
        // - View mode (already handled above)
        // - No pupil data
        // - No IQ table data
        // - No tasks to calculate
        if (isViewMode) return
        if (!pupilData) return
        if (!iqTableData) return
        
        const iqTasks = location.state?.tasks
        if (!iqTasks) {
            toast.error("Нет данных для расчета")
            setLoading(false)
            return
        }

        const calculateAndSave = async () => {
            try {
                // 3a: Calculate age
                const birthday = getBirthdayDate(pupilData)
                const age = birthday !== undefined && birthday.getFullYear() <= 16 
                    ? new Date().getFullYear() - birthday.getFullYear() 
                    : 16
                
                // 3b: Calculate test score
                const testScore = calcIqTestScore(iqTasks)
                
                // 3c: Get IQ score from table
                const iqScore = iqTableData.iqTable[age]?.[testScore] || 0
                console.log(location.state)
                
                // 3d: Prepare result data
                const resultData = {
                    completionTimeSeconds: location.state?.completionTimeSeconds || 0,
                    testTypeName: "Intellectual-Potential",
                    psychParams: [{ name: "iq_score", param: iqScore }]
                }

                // 3e: Save to API
                const savedResult = await testApi.createTest(getToken(), resultData)
                setResult(savedResult)
                
            } catch (err) {
                console.error(err)
                toast.error("Ошибка при сохранении результатов")
            } finally {
                setLoading(false)
            }
        }

        calculateAndSave()
    }, [pupilData, iqTableData, isViewMode, location.state?.tasks])

    //  STEP 4: Load history (separate from main result)
    const loadTestResults = async () => {
        if (showHistory) {
            setShowHistory(false)
            return
        }
        
        if (allResults && !showHistory) {
            setShowHistory(true)
            return
        }
        
        try {
            const results = await testApi.getTestsByType(getToken(), "Intellectual-Potential")
            setAllResults(results)
            setShowHistory(true)
        } catch (err) {
            console.error(err)
            toast.error("Произошла ошибка при загрузке истории")
        }
    }

    //  STEP 5: Loading state
    if (loading || !result || !pupilData || !iqTableData) {
        return <NoResults message="Загрузка данных..." />
    }

    const score = result.psychParams[0].param
    const averageScore = allResults?.length 
        ? Math.round(allResults.reduce((total, res) => total + res.psychParams[0].param, 0) / allResults.length)
        : null

    //  STEP 6: Render using custom components
    return (
        <TestResultLayout title="Результаты теста интеллектуального потенциала">
            {/* Main Score Card */}
            <ResultCard title="Ваш результат">
                <p>Балл с последнего прохождения: <b>{score}</b></p>
                
                {/* History Section */}
                <div className="history-content-wrapper">
                    <div className="detailed-title">
                        <p>Подробнее</p>
                        <ChevronDown 
                            className={`rotate-item ${showHistory ? "rotated" : ""}`} 
                            onClick={loadTestResults} 
                            style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className={`history-content ${showHistory ? "visible" : ""}`}>
                        {showHistory && allResults && averageScore !== null && (
                            <p><b>Средний Балл: {averageScore}</b></p>
                        )}
                        {showHistory && allResults?.map((res, index) => (
                            <div key={index} className="history-card">
                                <p><b>{res.psychParams[0].param} Баллов</b></p>
                                <p>
                                    Время - {formatTime(Math.floor(res.completionTimeSeconds / 60))}:
                                    {formatTime(res.completionTimeSeconds % 60)} 
                                    Дата - {formatDateRU(res.createdAt)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </ResultCard>

            {/* Note Card */}
            <ResultCard>
                <div className="detailed-title">
                    <h3>На заметку</h3>
                    <MessageCircleQuestion />
                </div>
                <p>
                    Ваш интеллект не меняется день ото дня, а вот концентрация, утомляемость и эмоциональный фон — да. 
                    Этот тест фиксирует вашу текущую продуктивность. Низкий результат сегодня — это повод отдохнуть. 
                    Исследования подтверждают: многократное прохождение в разных состояниях дает более объективную картину, 
                    чем один замер.
                </p>
            </ResultCard>

            {/* Tips Grid */}
            <div className="test-result-grid">
                <ResultCard>
                    <Moon />
                    <p>
                        <b>Высыпайтесь</b> - даже легкое недосыпание снижает скорость обработки информации на 10–15% 
                        по данным исследований когнитивной психологии.
                    </p>
                </ResultCard>
                
                <ResultCard>
                    <Clock />
                    <p>
                        <b>Выбирайте время</b> - пик умственной работоспособности у большинства людей приходится 
                        на первую половину дня, через 2–3 часа после пробуждения.
                    </p>
                </ResultCard>
                
                <ResultCard>
                    <Droplet />
                    <p>
                        <b>Следите за гидратацией и глюкозой</b> - мозг потребляет около 20% всей энергии организма; 
                        голод или обезвоживание напрямую влияют на концентрацию.
                    </p>
                </ResultCard>
                
                <ResultCard>
                    <Repeat />
                    <p>
                        <b>Пробуйте снова</b> - повторное прохождение снижает тревожность и дает более точную картину 
                        ваших реальных способностей. Один замер — это не истина.
                    </p>
                </ResultCard>
            </div>

            {/* Metadata */}
            <ResultMetadata 
                createdAt={result.createdAt}
                completionTimeSeconds={result.completionTimeSeconds}
            />
        </TestResultLayout>
    )
}