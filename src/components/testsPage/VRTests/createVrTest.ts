import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { MultipleOptionsPicker, MultipleTask } from "../generalTemplates/multipleOptionsPicker/MultipleOptionsPicker"
import { ChainedTest } from "../generalTests/ChainedTest"

export type RawOption = {
    id: number
    text: string
    correct?: boolean
    type?: string
}

export type RawTask = {
    id: number
    text: string
    direction?: number
    options: RawOption[]
    userAnswer?: number
}

export interface VrTestOptions {
    fetchSingleChoice: () => Promise<RawTask[]>
    fetchMultipleChoice: () => Promise<RawTask[]>
    resultPath: string
    firstStepDescription?: string
    secondStepDescription?: string
    checkRequired?: number
}

// Универсальная фабрика для создания двухэтапных VR-тестов (Single Choice -> Multiple Choice)
//Принимает функции для подтягивания данных для 1ого и 2ого теста
//путь к результату и описание каждого теста
//Приводит данные к нужному виду и полноценно настраивает каждый тест
export const createVrTest = ({
    fetchSingleChoice,
    fetchMultipleChoice,
    resultPath ,
    firstStepDescription= "Первый этап: выбери то, что нравится или ближе именно тебе.",
    secondStepDescription = "Второй этап: выберите ровно 2 правильных варианта ответа.",
    checkRequired = 2
}: VrTestOptions) => {

    const loadSingleChoiceTasks = async (): Promise<Task[]> => {
        const data = await fetchSingleChoice()
        return (data || []).map((task) => ({
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
        const data = await fetchMultipleChoice()
        return (data || []).map((task) => ({
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
                description: firstStepDescription,
                autoStartTimer: true,
                pickerStyle: "squeezed",
                optionStyle: "column",
                hideSkipButton: true,
            },
            {
                id: "testSecondStep",
                Component: MultipleOptionsPicker,
                fetchData: loadMultipleChoiceTasks,
                description: secondStepDescription,
                autoStartTimer: true,
                hideSkipButton: false,
                componentProps: {checkRequired}
            },
        ],
    })
}