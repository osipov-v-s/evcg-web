import { TestResultResponse } from "../../../types/testTypes"
import { profPreferencesInterpretations } from "./professionalPreferencesData"

export interface OptionItem {
    id: number
    text: string
    interpretation: number
}

export interface PreferenceQuestion {
    id: number
    text: string
    options: OptionItem[]
    userAnswer: number
}

export const calculatePreferenceScores = (
    tasks: PreferenceQuestion[] = [],
    completionTimeSeconds: number = 0
): TestResultResponse => {
    const psychParams = profPreferencesInterpretations.map((dir) => {
        const totalScore = tasks.reduce((sum, task) => {
            const selectedOption = task.options.find((opt) => opt.id === task.userAnswer)
            if (selectedOption && selectedOption.interpretation === dir.interpretationId) {
                return sum + 1
            }
            return sum
        }, 0)

        return {
            name: dir.interpretationName,
            param: totalScore,
        }
    })

    return {
        completionTimeSeconds,
        testTypeName: "Professional-Preferences",
        psychParams,
    }
}