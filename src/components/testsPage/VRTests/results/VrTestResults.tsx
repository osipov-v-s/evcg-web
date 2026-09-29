import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft , Trash2 } from "lucide-react";
import { Button } from "../../../ui/reusable/button";
import { NoResults } from "../../../ui/noResultComponent/NoResult";
import { ResultCard } from "../../../resultsPage/ResultCard";
import { Toaster } from "react-hot-toast";
import { vrTestApi } from "../../../../services/api/vrTestsApi";
import { useAuth } from "../../../../contexts/AuthContext";
import { VRTest } from "../../../../types/vrTests/VRTest";
import { calcResults } from "./scoring";
import { toSession } from "./sort";
import { formatDateRU } from "../../../../services/dates/formatDate";
import { formatTime } from "../../utils/formatTime";
import "./result.css"
import api, { getBaseUrl } from "../../../../services/api/api";

const TYPE_LABELS: Record<string, string> = {
    knowledge: "Знания",
    motivation: "Мотивация"
}
const MAX_LENGTH = 100
const MAX_TEST_SCORE = 12

export interface ChainedResults {
  testFirstStep: { tasks: any[]; completionTimeSeconds: number };
  testSecondStep: { tasks: any[]; completionTimeSeconds: number };
}

export const VrTestResults = () => {
    const { professionId } = useParams<{ professionId: string }>();
    const {getToken} = useAuth()
    const location = useLocation();
    const navigate = useNavigate();

    const [vrTestsResults, setVrTestsResults] = useState<VRTest[] | null>(null)

    console.log(location.state);
    const chained = (location.state?.chainedResults ??
        null) as ChainedResults | null;

    // Placeholder for saving — enable when format is decided
    useEffect(() => {
        //if there is no chained or no professionId then return
        if (!chained || !professionId ) return;
        const saveTests = async () => {
            try {
                const results = calcResults(chained, Number(professionId))
                //Send tests data to the server
                await Promise.all(results.map(result => vrTestApi.createTest(getToken(), result)))
                setVrTestsResults(results)
            } catch(err) {
                console.log(err)
            }
        }
        saveTests()

    }, [chained, professionId]);
    useEffect(() => {
        //if there is a chained (results from tests) or no professionId then return
        if (chained || !professionId) return
        const loadResults = async () => {
            try {
                const results = await vrTestApi.getMyTestsByProfessionId(getToken(), professionId)
                setVrTestsResults(results)
            } catch(err) {
                console.log(err)
            }
        }
        loadResults()
    },[])

    if (!professionId) {
        return (<div>
            <NoResults variant="error" title="Тест не найден" message="Проверьте наличие теста" />
        </div>)
    }

    if (!chained && !vrTestsResults) {
        return (
        <div className="result-wrapper">
            <NoResults
                variant="empty"
                title="Результатов нет"
                message="Сначала пройдите VR-тест."
            />
            <Button
                label="Назад к тестам"
                icon={<ArrowLeft />}
                onClick={() => navigate("/tests")}
            />
        </div>
        );
    }
    const resetTestResult = async (professionId: number | string) => {
        try {
            await vrTestApi.resetTests(getToken(), professionId)
            navigate("/tests")
        } catch(err) {
            console.log(err)
        }
    }
    const renderScoreColor = (score: number) => {
        if (score >= 9) return "green"
        else if (score >= 5) return "yellow"
        else return "red"
    }
    
    const sessions = toSession(vrTestsResults ?? [])
    return (
        <div className="result-wrapper">
            <div className="page-header-wrapper">
                <h3 className="page-header">Результаты VR-теста</h3>
                <Trash2 color="red" onClick={() => resetTestResult(professionId)}/>
            </div>
            
            {sessions.map((session) => (
                <section className="session" key={session[0]?.id}>
                    <div className="session__grid">
                        {session.map(result => (
                            <ResultCard
                                key={result.id}
                                title={TYPE_LABELS[result.typeName] ?? result.typeName}>
                                <p className="result-score" style={{color: `${renderScoreColor(result.score || 0)}`}}>
                                    Результат: {result.score} {TYPE_LABELS[result.typeName] === "Знания" ? `/ ${MAX_TEST_SCORE}` : ""}
                                </p>

                                {result.answers?.length > 0 && (
                                    <ul className="answer-list">
                                        {result.answers.map(answer => (
                                            <li className="answer" key={answer.questionText}>
                                                <p className="answer__question">
                                                    {answer.questionText.length < MAX_LENGTH
                                                        ? answer.questionText
                                                        : answer.questionText.substring(0, MAX_LENGTH) + "..."}
                                                </p>
                                                <p className="answer__text">{answer.answerText}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <span className="result-time">
                                    Пройдено за: {formatTime(Math.floor(result.completionTimeSeconds / 60))} : {formatTime(result.completionTimeSeconds % 60)}
                                </span>
                            </ResultCard>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
};
