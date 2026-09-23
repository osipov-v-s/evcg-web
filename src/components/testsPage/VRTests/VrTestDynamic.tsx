import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { createVrTest, RawTask } from "./createVrTest"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import api from "../../../services/api/api"
import { vrTestApi } from "../../../services/api/vrTestsApi"
import { useAuth } from "../../../contexts/AuthContext"
/*
    Компонент извлекает id профессии из url как параметр
    и использует createVrTest для создания компонента со всеми данными
    Возвращает полностью собранный под профессию компонент с тестами
*/

export const VRTestDynamic = () => {
    const {professionId} = useParams<{professionId: string}>()
    const [professionName, setProfessionName] = useState<string>("")
    
    const {getToken} = useAuth()
    const [stage2File, setStage2File] = useState<"before.json" | "after.json" | null>(null)
    //Тут важно находим настоящую профессию из id в url
    useEffect(() => {
        if (!professionId) return
        let cancelled = false
        const getProfessionById = async () => {
            try {
                const [professions, tests] = await Promise.all([
                    specialistsAPI.getProfessions(),
                    vrTestApi.getMyTestsByProfessionId(getToken(), professionId).catch(() => [])
                ])
                if (cancelled) return
                if (!professions) {
                    setProfessionName("")
                    return
                }
                const profession = professions.find(p => String(p.id) === professionId)
                setProfessionName(profession?.name ?? "")

                setStage2File(tests.length === 0 ? "before.json" : "after.json")
            } catch(err) {
                if (!cancelled) {
                    setProfessionName("")
                    setStage2File("before.json")
                }
            }

        }
        getProfessionById()
        return () => {
            cancelled = true
        }
    }, [professionId])

    const Component = useMemo(() => {
        if (!professionId || !professionName || !stage2File) return null
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
            },//need to pickup test depends on stage 
            fetchMultipleChoice: async () => {
                const { data } = await api.get<{ data: RawTask[] }>(
                    `/public/vr_tests/${professionId}/${stage2File}`
                )
                return data.data
            },
        })
    }, [professionId, professionName, stage2File])

    if (!professionId) return <NoResults variant="error" message="Профессия не найдена" />
    if (!professionName || !Component) return <NoResults variant="loading" message="Загружаем тест…" />
    return <Component />
}
