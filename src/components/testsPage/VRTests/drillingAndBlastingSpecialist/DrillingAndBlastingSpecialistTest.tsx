import { createVrTest } from "../createVrTest"
import { data as tasks1 } from "./tasks_1.json"
import { data as tasks2 } from "./tasks_2.json"

export const DrillingAndBlastingSpecialistTest = createVrTest({
    singleChoiceData: tasks1,
    multipleChoiceData: tasks2,
    resultPath: "/tests/vr-drilling-and-blasting-specialist/results",
    secondIntroPath: "/tests/vr-haul-truck-driver/intro",
})