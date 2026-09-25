
// Берем ответы пользователя и получая суммируем score для каждого 

import { VRTest } from "../../../../types/vrTests/VRTest"
import { ChainedResults } from "./VrTestResults"

// Пример: ответа от -12 до 12 для 6 тестов
const calculateFirstStepResults = (tasks : any[]) : number => {
    return tasks.reduce((sum, task) => sum += task.options[task.userAnswer-1]?.score, 0)
}
// Берем ответы пользователя и сравниваем их на корректность из options для каждой task
const calculateSecondStepResults = (tasks : any[]) : number => {
    return tasks.reduce((sum : number , task : any) => 
        sum += task.userAnswers.reduce((taskSum: number, answer: number) => taskSum += task.options[answer-1].correct ?  1 : 0
        , 0)
    , 0)
}

export const calcResults = (chained: ChainedResults, professionId: number) : VRTest[] => {
    return [
        {
            //pupil or specialist ids will be extracted on backend
            professionId: professionId, //think about ids may be extract in component from params before sending
            typeName: "motivation",
            completionTimeSeconds: chained.testFirstStep.completionTimeSeconds,
            score : calculateFirstStepResults(chained.testFirstStep.tasks),
            answers : chained.testFirstStep.tasks.map(task => ({
                answerScore: task.options[task.userAnswer-1]?.score,
                answerText: task.options[task.userAnswer-1]?.text,
                questionText: task.text //
            }))
        },
        {
            professionId: professionId,
            typeName: "knowledge",
            completionTimeSeconds: chained.testSecondStep.completionTimeSeconds,
            score: calculateSecondStepResults(chained.testSecondStep.tasks),
            answers: [], //no need to store answers only tests score metter
        }
    ]
}