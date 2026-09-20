import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { MultipleOptionsPicker, MultipleTask } from "../generalTemplates/multipleOptionsPicker/MultipleOptionsPicker"
import { ChainedTest } from "../generalTests/ChainedTest"

type RawOption = {
    id: number
    text: string
    correct?: boolean
    type?: string
}

type RawTask = {
    id: number
    text: string
    direction?: number
    options: RawOption[]
    userAnswer?: number
}

export interface VrTestOptions {
    singleChoiceData: RawTask[]
    multipleChoiceData: RawTask[]
    resultPath?: string
    secondIntroPath?: string
    fisrtStepDescription?: string
    secondStepDescription?: string
}

// Универсальная фабрика для создания двухэтапных VR-тестов (Single Choice -> Multiple Choice)
export const createVrTest = ({
    singleChoiceData = [],
    multipleChoiceData = [],
    resultPath = "/tests/vr-test/results", // TODO: переделать
    secondIntroPath,
    fisrtStepDescription = "Первый этап: выбери то, что нравится или ближе именно тебе.",
    secondStepDescription = "Второй этап: выберите ровно 2 правильных варианта ответа."
}: VrTestOptions) => {

    const loadSingleChoiceTasks = async (): Promise<Task[]> => {
        return (singleChoiceData || []).map((task) => ({
            ...task,
            taskNumber: task.id,
            options: (task.options || []).map((option) => ({
                ...option,
                isPicked: false,
            })),
            userAnswer: 0,
        }))
    }

    const loadMultipleChoiceTasks = async (): Promise<MultipleTask[]> => {
        return (multipleChoiceData || []).map((task) => ({
            ...task,
            taskNumber: task.id,
            userAnswers: [],
            options: (task.options || []).map((option) => ({
                ...option,
                isChecked: false,
            })),
        }))
    }

    return ChainedTest({
        resultPath,
        steps: [
            {
                id: "testFirstStep",
                Component: SingleOptionsPicker,
                fetchData: loadSingleChoiceTasks,
                description: fisrtStepDescription,
                autoStartTimer: true,
                pickerStyle: "squeezed",
                optionStyle: "column",
                hideSkipButton: true,
            },
            {
                id: "testSecondStep",
                secondIntroPath,
                Component: MultipleOptionsPicker,
                fetchData: loadMultipleChoiceTasks,
                description: secondStepDescription,
                autoStartTimer: true,
                hideSkipButton: false,
            },
        ],
    })
}