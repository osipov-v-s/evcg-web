import { useEffect, useState } from "react"
import { TestResultResponse } from "../../../types/testTypes"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { calculateResults } from "./klimovResultsCalc"
import { KlimovProfession, klimovTypeTranslate } from "./klimovTypes"
import "../css/testsResultStyles.css"
import { sortByParam } from "../utils/sortByParams"
import klimovProfessionsData from "./klimovProfessions.json"
import { Button } from "../../ui/reusable/button"
import { formatTime } from "../utils/formatTime"
import { formatDateRU } from "../../../services/dates/formatDate"
import { ArrowLeft } from "lucide-react"
import { useTestResult } from "../../resultsPage/hooks/useTestResult"
export const KlimovResults = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const {result, loading} = useTestResult({
        testType: "Professional-Orientation-Klimov", 
        extractInputData: (state) => state?.klimovTasks,
        calculateResult: (tasks, time) => ({
            ...calculateResults(tasks)
        }),
        transformResponse: (response) => ({
            ...response, 
            psychParams: sortByParam(response.psychParams)
        })
    })
    //Описание профессий
    const klimovProfessions = klimovProfessionsData as KlimovProfession[]


    if (!result) return <>
        <p>Загрузка...</p>
        <Toaster />
    </>
    return (<>
        <div className="result-wrapper">
            <h3>Склонности к профессиям результат: </h3>

            {result.psychParams.map(param => (
                <div className="result-card">
                    {param.param >= 5 ?
                        <p><b>{`${klimovTypeTranslate[param.name]} : ${param.param}`}</b></p> :
                        <p>{`${klimovTypeTranslate[param.name]} : ${param.param}`}</p>}
                    <p>{klimovProfessions.find(prof => prof.name === param.name)?.description}</p>
                    <p>{klimovProfessions.find(prof => prof.name === param.name)?.traits}</p>
                </div>
            ))}

            <p>Дата прохождения: {formatDateRU(result.createdAt)}</p>
            {result.completionTimeSeconds !== null && result.completionTimeSeconds !== 0 &&
                <span>Пройдено за: {formatTime(Math.floor(result.completionTimeSeconds / 60))} : {formatTime(result.completionTimeSeconds % 60)}</span>
            }
            <div>
                <Button label="Назад" icon={<ArrowLeft />} onClick={() => navigate("/tests")} />
            </div>

        </div>

    </>)
}