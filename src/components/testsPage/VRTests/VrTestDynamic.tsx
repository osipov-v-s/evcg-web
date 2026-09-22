import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { createVrTest, RawTask } from "./createVrTest"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import api from "../../../services/api/api"
/*
    Компонент извлекает id профессии из url как параметр
    и использует createVrTest для создания компонента со всеми данными
    Возвращает полностью собранный под профессию компонент с тестами
*/
const QUESTIONNAIRE_BASE = "/professions_questionnaire/data"
const VR_TESTS_BASE = "/vr_tests"

const fetchJson = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url)
    if (response.status === 404) throw new Error("VR_TEST_NOT_FOUND")
    if (!response.ok) throw new Error(`Failed to load ${url}`)
    return response.json()
}
export const VRTestDynamic = () => {
    const {professionId} = useParams<{professionId: string}>()
    const [professionName, setProfessionName] = useState<string>("")
    //Тут важно находим настоящую профессию из id в url
    useEffect(() => {
        if (!professionId) return
        const getProfessionById = async () => {
            const professions = await specialistsAPI.getProfessions()
            if (!professions) {
                setProfessionName("")
                return
            }
            const profession = professions.find(p => String(p.id) === professionId)
            setProfessionName(profession?.name ?? "")
        }
        getProfessionById()
    }, [professionId])

    const Component = useMemo(() => {
        if (!professionId || !professionName) return null
        return createVrTest({
            resultPath: `/tests/vr/${professionId}/results`,
            fetchSingleChoice: async () => {
                const { data } = await api.get<{ tasks: RawTask[] }>(
                    "/public/professions_questionnaire/data/generic_questions.json"
                )
                return data.tasks.map((task) => ({
                    ...task,
                    text: (task.text ?? "").replace(/\{profession\}/g, professionName),
                }))
            },
            fetchMultipleChoice: async () => {
                const { data } = await api.get<{ data: RawTask[] }>(
                    `/public/vr_tests/${professionId}/tasks_2.json`
                )
                return data.data
            },
        })
    }, [professionId, professionName])

    if (!professionId) return <NoResults variant="error" message="Профессия не найдена" />
    if (!professionName || !Component) return <NoResults variant="loading" message="Загружаем тест…" />
    return <Component />
}
