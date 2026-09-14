import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";
import api, { getBaseUrl } from "../../../services/api/api";

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
    fetchData: async () => {
        const tasksData = (await api.get(`${getBaseUrl()}/public/career_anchors/data/careerAnchors.json`)).data.data as Task[]
        console.log(tasksData)
        return tasksData.map((task: Task) => ({
            ...task,
            taskNumber: task.id,
            options: generateOptions(10),
        })) as Task[]} ,
    resultPath: "/tests/career-anchors/results",
    stateKey: "careerAnchorsTasks",
    description: "Оцени, насколько каждое утверждение относится к тебе, по шкале от 1 до 10.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "row",
    hideSkipButton: true,
})