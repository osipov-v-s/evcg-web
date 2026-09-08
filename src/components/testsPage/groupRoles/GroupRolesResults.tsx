import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { GroupRolesQuestion, groupRolesDataRoleEn, groupRolesDataRoleMapping, groupRoles } from "./groupRolesData"
import { calculateGroupRolesDominantRoles, calculateGroupRolesParams } from "./groupRolesResultsCalc"
import { TestResultResponse } from "../../../types/testTypes"
import { useTestResult } from "../../resultsPage/hooks/useTestResult"
import { ResultCard } from "../../resultsPage/ResultCard"
import { ResultMetadata } from "../../resultsPage/ResultMetadata"
import { TestResultLayout } from "../../resultsPage/TestResultLayout"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { sortByParam } from "../utils/sortByParams"

export const GroupRolesResults = () => {
    const location = useLocation()
    const isViewMode = location.state?.isViewMode || false
    
    // ✅ Use the hook for ALL result handling
    const { result, loading } = useTestResult({
        testType: "Group-Roles",
        extractInputData: (state) => state?.groupQuestionsResult,
        calculateResult: (groupQuestionsResult, time) => ({
            ...calculateGroupRolesParams(groupQuestionsResult),
            completionTimeSeconds: time || 0
        }),
        // ✅ Transform response - sort params by value
        transformResponse: (response) => ({
            ...response,
            psychParams: sortByParam(response.psychParams)
        })
    })

    // Helper function for readable names
    const getReadableParamName = (paramName: string, paramsMap: Record<string, groupRolesDataRoleEn>) => {
        return Object.keys(paramsMap).find(key => paramsMap[key] === paramName)
    }

    // ✅ Single loading state
    if (loading || !result) return <NoResults />

    return (
        <TestResultLayout title="Роли в команде. Ваши результаты:">
            {/* Dominant Roles Card */}
            <ResultCard title="Доминантные роли" highlight={true}>
                {calculateGroupRolesDominantRoles(result).map((param, index) => (
                    <p key={index}>
                        <b>{getReadableParamName(param.name, groupRolesDataRoleMapping)}</b> : {param.param} баллов, 
                        Ваш тип {groupRoles.find(role => role.name === param.name)?.description}
                    </p>
                ))}
            </ResultCard>

            {/* All Results Card */}
            <ResultCard title="Все результаты">
                {result.psychParams.map((param, index) => (
                    <p key={index}>
                        {getReadableParamName(param.name, groupRolesDataRoleMapping)}: {param.param} баллов{' '}
                        {groupRoles.find(role => role.name === param.name)?.description}
                    </p>
                ))}
            </ResultCard>

            {/* ✅ Metadata - automatically handles conditional display */}
            <ResultMetadata 
                createdAt={result.createdAt}
                completionTimeSeconds={result.completionTimeSeconds}
            />
        </TestResultLayout>
    )
}