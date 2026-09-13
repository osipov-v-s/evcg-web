import { data as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";

const generateOptions = (count: number) =>
    Array.from({ length: count }, (_, num) => {
        const val = num + 1
        let text = val.toString()

        if (val === 1) text = `${val} - Определенно нет`
        if (val === count) text = `${val} - Определенно да`

        return {
            id: val,
            text,
            isPicked: false,
        }
    })

export const CareerAnchorsTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () =>
        tasksData.map((item) => ({
            id: item.id,
            taskNumber: item.id,
            text: item.text,
            orientation: item.orientation,
            options: generateOptions(10),
            userAnswer: item.userAnswer,
        })) as Task[],
    resultPath: "/tests/career-anchors/results",
    stateKey: "careerAnchorsTasks",
    description: "Оцени, насколько каждое утверждение относится к тебе, по шкале от 1 до 10.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "row",
    hideSkipButton: true,
})