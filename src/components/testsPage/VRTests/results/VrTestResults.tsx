import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../ui/reusable/button";
import { NoResults } from "../../../ui/noResultComponent/NoResult";
import { ResultCard } from "../../../resultsPage/ResultCard";
import { Toaster } from "react-hot-toast";
import { vrTestApi } from "../../../../services/api/vrTestsApi";
import { useAuth } from "../../../../contexts/AuthContext";
import { VRTest } from "../../../../types/vrTests/VRTest";
import { calcResults } from "./scoring";


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

    // TODO: call vrTestApi.createTest here later
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

    //const stage1Count = chained.testFirstStep?.tasks?.length ?? 0;
    //const stage2Count = chained.testFirstStep?.tasks?.length ?? 0;
    //const time1 = chained.testFirstStep?.completionTimeSeconds ?? 0;
    //const time2 = chained.testFirstStep?.completionTimeSeconds ?? 0;

    return (
        <div className="result-wrapper">
        <h3>Результаты VR-теста</h3>
        {vrTestsResults?.map(result => (
            <ResultCard title={result.typeName}> 
                <p>
                    Результат: {result.score}
                </p>
                {result.answers && (
                    result.answers.map(answer => (
                        <p>{answer.questionText}: <b>{answer.answerText}({answer.answerScore})</b></p>

                    ))
                )}
                <p>
                    Время: {result.completionTimeSeconds}
                </p>
            </ResultCard>
        ))}

        <Button
            label="Назад к тестам"
            icon={<ArrowLeft />}
            onClick={() => navigate("/tests")}
        />
        <Toaster />
        </div>
    );
    };
