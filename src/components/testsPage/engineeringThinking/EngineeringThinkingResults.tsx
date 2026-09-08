import { useAuth } from "../../../contexts/AuthContext"
import { pupilApi } from "../../../services/api/pupilApi"
import { useTestResult } from "../../resultsPage/hooks/useTestResult"
import { ResultCard } from "../../resultsPage/ResultCard"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { EngineerLevels, Level } from "./engineerThinkingTypes"
import engineerLevelsData from "./engineerLevels.json"
import { useEffect, useState } from "react"
import { ResultMetadata } from "../../resultsPage/ResultMetadata"
import { TestResultLayout } from "../../resultsPage/TestResultLayout"

export const EngineeringThinkingResults = () => {
    const {getToken} = useAuth()
    const engineerLevels = engineerLevelsData as EngineerLevels[]
    const [level, setLevel] = useState<Level>()
    const {result, loading} = useTestResult({
        testType: "Engineering-Thinking",
        extractInputData: (state) => state?.tasks,
        calculateResult: (tasks, time) => ({
            completionTimeSeconds: time || 0,
            testTypeName: "Engineering-Thinking",
            psychParams: [{
                name: "engineering_thinking_level",
                param: tasks.reduce((score, t) => t.answer === t.userAnswer ? score + 1 : score, 0)
            }]
        })
    })
    // Fetch pupil data and calculate level when result is ready
    useEffect(() => {
        const getEngineerLevel = async () => {
            if (!result) return
            
            const score = result.psychParams[0].param
            try {
                const pupil = await pupilApi.getPupilData(getToken())
                if (!pupil) return
                
                const foundLevel = engineerLevels
                    .find(engineer => engineer.gender === pupil.pupilDTO.gender)
                    ?.levels.find(level => score >= level.min && score <= level.max)
                    
                setLevel(foundLevel)
            } catch (error) {
                console.error("Failed to fetch pupil data:", error)
            }
        }
        
        getEngineerLevel()
    }, [result, getToken, engineerLevels])
    if (loading || !result) return <NoResults />
    const score = result.psychParams[0].param

     return (
        <TestResultLayout title="Результаты теста инженерного мышления">
            <ResultCard title="Ваш результат" highlight={true}>
                <p><strong>Уровень инженерного мышления:</strong> {score} из 70 баллов</p>
                {level && (
                    <>
                        <p><strong>Описание:</strong> {level.description}</p>
                        <p><strong>Технические способности:</strong> {level.techCapabilities}</p>
                    </>
                )}
            </ResultCard>
            
            <ResultCard title="Справочная информация">
                <h4>Юноши (старше 18 лет)</h4>
                <div className="gender-card">Меньше 26 - Очень низкий</div>
                <div className="gender-card">27 - 32 - Низкий</div>
                <div className="gender-card">33 - 38 - Средний</div>
                <div className="gender-card">39 - 47 - Высокий</div>
                <div className="gender-card">Больше 48 - Очень высокий</div>
                
                <h4>Девушки (старше 18 лет)</h4>
                <div className="gender-card">Меньше 17 - Очень низкий</div>
                <div className="gender-card">18 - 22 - Низкий</div>
                <div className="gender-card">23 - 27 - Средний</div>
                <div className="gender-card">28 - 34 - Высокий</div>
                <div className="gender-card">Больше 35 - Очень высокий</div>
            </ResultCard>
            
            <ResultMetadata 
                createdAt={result.createdAt}
                completionTimeSeconds={result.completionTimeSeconds}
            />
        </TestResultLayout>
    )
}