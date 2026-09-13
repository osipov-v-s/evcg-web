import { TestResultResponse } from "../../../types/testTypes"
import { interestsMapDirections } from "./interestsMapData"

export interface InterestQuestion {
    id: number
    direction: number
    userAnswer?: number
}

const SCORE_MAP: Record<number, number> = {
    1: 2,
    2: 1,
    3: 0,
    4: -1,
    5: -2,
}

export const calculateInterestScores = (
    tasks: InterestQuestion[] = [],
    completionTimeSeconds: number = 0
): TestResultResponse => {
    const psychParams = interestsMapDirections.map((dir) => {
        const dirTasks = tasks.filter((task) => task.direction === dir.directionId)

        const totalScore = dirTasks.reduce((sum, task) => {
            const answerId = task.userAnswer
            const score = answerId ? (SCORE_MAP[answerId] ?? 0) : 0
            return sum + score
        }, 0)

        return {
            name: dir.directionName,
            param: totalScore,
        }
    })

    return {
        completionTimeSeconds,
        testTypeName: "Interests-Map",
        psychParams,
    }
}