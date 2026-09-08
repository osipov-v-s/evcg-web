import { data as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";

const generateOptions = (count: number) => Array.from({ length: count }, (_, num) => ({
    id: num + 1,
    text: (num + 1).toString(),
    isPicked: false,
}))

export const CareerAnchorsTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () =>
        tasksData.map((item) => ({
            id: item.id,
            taskNumber: item.id,
            text: item.text,
            variants: [],
            options: generateOptions(10),
            userAnswer: item.userAnswer,
        })) as Task[],
    resultPath: "/tests/career-anchors/results",
    stateKey: "careerAnchorsTask",
    description: "Оцени, насколько каждое утверждение относится к тебе, по шкале от 1 до 10.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "row",
})