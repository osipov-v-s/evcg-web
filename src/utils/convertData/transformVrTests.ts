import { VRTest } from "../../types/vrTests/VRTest";
import { ExcelRow } from "./exportRowsToExcel";

export const transformVrTests = (tests: VRTest[]): ExcelRow[] =>
    tests.map(t => ({
        "ID": t.id ?? "",
        "Email": t.accountEmail ?? "",
        "Профессия": t.professionName ?? "",
        "ID профессии": t.professionId,
        "Тип": t.typeName,
        "Балл": t.score ?? "",
        "Время (сек)": t.completionTimeSeconds,
        "Дата": t.createdAt ?? "",
        "Ученик": t.pupilId ?? "",
        "Специалист": t.specialistId ?? "",
        "Ответов": t.answers?.length ?? 0,
        "Ответы": (t.answers ?? [])
            .map((a, i) => `${i + 1}. ${a.questionText} → ${a.answerText} (${a.answerScore})`)
            .join("\n"),
    }))