import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Glasses } from "lucide-react"
import toast from "react-hot-toast"
import { TestCard } from "../TestCard"
import { TestItem } from "../TestsData"
import { useAuth } from "../../../contexts/AuthContext"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { vrTestApi } from "../../../services/api/vrTestsApi"
import { profession } from "../../../types/specialist/specialist"
import api, { getBaseUrl } from "../../../services/api/api"
/*
    Отдельный компонент для отображения VR тестов
    Подтягивает все доступные професии и по их id ищет по доступному пути все, для которых на сервере есть файлы
    Если путь существует карточка будет отображена. 
    При добавлении новых файлов на сервер, новая карточка сама добавится сюда
*/

const hasStage2 = async (professionId: number): Promise<boolean> => {
    try {

        const response = await api.get(`/public/vr_tests/${professionId}/tasks_2.json`)
        console.log(response)
        if (!response) return false
        return true
        //const contentType = response.headers.get("content-type") ?? ""
        //return contentType.includes("application/json")

    } catch {
        return false
    }
}

export const VrTestsPage = () => {
    const navigate = useNavigate()
    const { getToken } = useAuth()

    const [availableProfessions, setAvailableProfessions] = useState<profession[]>([])
    const [completedByProfession, setCompletedByProfession] = useState<Record<number, number>>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            try {
                const [profs, tests] = await Promise.all([
                    specialistsAPI.getProfessions(),
                    vrTestApi.getMyTests(getToken()).catch(() => []),
                ])
                //Сама магия проверки доступных тестов
                const availability = await Promise.all(
                    profs.map(async (p) => ({
                        profession: p,
                        available: await hasStage2(p.id),
                    }))
                )

                if (cancelled) return

                setAvailableProfessions(
                    availability.filter((a) => a.available).map((a) => a.profession)
                )
                //Не понял зачем подсчитывает количество тестов с одинаковой профессией
                const counts: Record<number, number> = {}
                tests.forEach((t) => {
                    counts[t.professionId] = (counts[t.professionId] ?? 0) + 1
                })
                setCompletedByProfession(counts)
            } catch {
                if (!cancelled) toast.error("Не удалось загрузить список VR-профессий")
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [getToken])
    //Собираем наши карточки с путями и прочим
    const tiles: TestItem[] = useMemo(() => {
        return availableProfessions.map((prof) => ({
            id: `vr-${prof.id}`,
            label: `${prof.name}`,
            time: 3,
            questionscount: 12,
            icon: Glasses,
            path: `/tests/vr/${prof.id}/intro`,
            pathResults: `/tests/vr/${prof.id}/results`,
            isAvailable: true,
            name: `vr-${prof.id}`
        }))
    }, [availableProfessions])

    const handleClick = useCallback(
        (path: string) => {
            navigate(path)
        },
        [navigate]
    )

    const handleResultClick = useCallback(
        (item: TestItem) => {
            if (!item.pathResults) return
            navigate(item.pathResults)
        },
        [navigate]
    )

    if (isLoading) {
        return (
            <div className="test-grid">
                <p style={{ padding: 20 }}>Загружаем VR-тесты…</p>
            </div>
        )
    }

    if (tiles.length === 0) {
        return (
            <div className="test-grid">
                <p style={{ padding: 20 }}>VR-тесты пока недоступны.</p>
            </div>
        )
    }

    return (
        <div className="test-grid">
            {tiles.map((item, index) => (
                <div key={item.id} className="test-grid-item show">
                    <TestCard
                        dataId={item.id}
                        index={index}
                        isAvailable={item.isAvailable}
                        item={item}
                        onClick={handleClick}
                        resultOnClick={handleResultClick}
                        isComplete={
                            (completedByProfession[Number(item.id.replace("vr-", ""))] ?? 0) > 0
                        }
                    />
                </div>
            ))}
        </div>
    )
}