import { TestResultResponse } from "../../../types/testTypes"
import { careerAnchorsOrientations } from "./careerAnchorsData"

export interface CareerQuestion {
    id: number
    text?: string | null
    orientation: number
    userAnswer: number
}

export const calculateOrientationScores = (
    tasks: CareerQuestion[] = [],
    completionTimeSeconds: number = 0
): TestResultResponse => {
    const psychParams = careerAnchorsOrientations.map((anchor) => {
        const anchorTasks = tasks.filter((task) => task.orientation === anchor.orientationId)

        const totalScore = anchorTasks.reduce((sum, task) => {
            const score = typeof task.userAnswer === "number" ? task.userAnswer : 0
            return sum + score
        }, 0)

        const count = anchorTasks.length
        const avgScore = count > 0 ? Number((totalScore / count).toFixed(2)) : 0

        return {
            name: anchor.orientationName,
            param: avgScore,
        }
    })

    const overallScore = psychParams.length > 0
        ? Number((psychParams.reduce((sum, item) => sum + item.param, 0) / psychParams.length).toFixed(2))
        : 0
    /*
    psychParams.push({
        name: "Обобщенный результат",
        param: overallScore,
    })
    */

    return {
        completionTimeSeconds,
        testTypeName: "Career-Anchors",
        psychParams,
    }
}