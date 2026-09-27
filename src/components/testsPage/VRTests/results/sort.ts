//Сортирует тесты на сессионные пары

import { VRTest } from "../../../../types/vrTests/VRTest";
const TYPE_ORDER: Record<string, number> = {
    "motivation": 0,
    "knowledge": 1
}
export const toSession = (results: VRTest[]): VRTest[][] => {
    const sorted = [...results].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    const sessions: VRTest[][] = []
    for (let i = 0; i < sorted.length; i += 2)
        sessions.push(sorted.slice(i, i+2))

    return sessions.map(session => [...session].sort((a,b) => TYPE_ORDER[a.typeName] - TYPE_ORDER[b.typeName]))
}

