import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";
import { StandartTest } from "../generalTests/StandartTest";
import api, { getBaseUrl } from "../../../services/api/api";

export const ProfessionalPreferencesTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () => {
        const tasksData = (await api.get(`${getBaseUrl()}/public/professional_preferences/data/professionalPreferences.json`)).data.data as Task[]
        return tasksData.map((task) => ({
            ...task,
            taskNumber: task.id,
            options: task.options.map((option) => ({
                ...option,
            })),
            userAnswer: 0,
        })) as Task[]},
    resultPath: "/tests/professional-preferences/results",
    stateKey: "professionalPreferencesTask",
    description: "Выбери то, что нравится или ближе именно тебе.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "column",
    hideSkipButton: true,
})