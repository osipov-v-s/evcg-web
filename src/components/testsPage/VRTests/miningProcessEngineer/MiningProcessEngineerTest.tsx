import { createVrTest } from "../createVrTest"
import { data as tasks1 } from "./tasks_1.json"
import { data as tasks2 } from "./tasks_2.json"

export const MiningProcessEngineerTest = createVrTest({
    singleChoiceData: tasks1,
    multipleChoiceData: tasks2,
    resultPath: "/tests/vr-mining-process-engineer/results",
    secondIntroPath: "/tests/vr-haul-truck-driver/intro",
})