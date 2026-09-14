import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";
import api, { getBaseUrl } from "../../../services/api/api";

export const InterestsMapTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () =>{
        const tasksData = (await api.get(`${getBaseUrl()}/public/interests_map/data/interestsMap.json`)).data.data as Task[]
        return tasksData.map((task) => ({
            ...task,
            taskNumber: task.id,
            options: task.options.map(option => ({
                ...option
            })),
            userAnswer: 0,
        })) as Task[]},
    resultPath: "/tests/interests-map/results",
    stateKey: "interestsMapTasks",
    description: "Выбери то, что нравится или ближе именно тебе.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "column",
    hideSkipButton: true,
})