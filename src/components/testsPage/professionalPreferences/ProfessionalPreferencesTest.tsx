import { data as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";

export const ProfessionalPreferencesTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () =>
        tasksData.map((item) => ({
            id: item.id,
            taskNumber: item.id,
            text: item.text,
            options: item.options.map(option => ({
                ...option,
                isPicked: false
            })),
            userAnswer: 0,
        })) as Task[],
    resultPath: "/tests/professional-preferences/results",
    stateKey: "professionalPreferencesTask",
    description: "Выбери то, что нравится или ближе именно тебе.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "column",
})