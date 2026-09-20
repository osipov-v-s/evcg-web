import { createVrTest } from "../createVrTest"
import { data as tasks1 } from "./tasks_1.json"
import { data as tasks2 } from "./tasks_2.json"

export const MineRescuerTest = createVrTest({
    singleChoiceData: tasks1,
    multipleChoiceData: tasks2,
    resultPath: "/tests/vr-mine-rescuer/results",
    secondIntroPath: "/tests/vr-haul-truck-driver/intro",
})