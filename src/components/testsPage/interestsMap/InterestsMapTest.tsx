import { data as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";

export const InterestsMapTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () =>
        tasksData.map((item) => ({
            id: item.id,
            taskNumber: item.id,
            text: item.text,
            variants: [],
            options: item.options.map(option => ({
                ...option,
                isPicked: false
            })),
            userAnswer: 0,
        })) as Task[],
    resultPath: "/tests/interests-map-results",
    stateKey: "interestsMapTask",
    description: "Выбери то, что нравится или ближе именно тебе.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "column",
})