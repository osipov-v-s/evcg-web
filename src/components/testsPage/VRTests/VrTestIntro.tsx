import { useNavigate, useParams } from "react-router-dom"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { useEffect, useState } from "react"
import { Button } from "../../ui/reusable/button"
import { ArrowRight } from "lucide-react"
import api from "../../../services/api/api"

export const VrTestIntro = () => {
    const { professionId } = useParams<{ professionId: string }>()
    const navigate = useNavigate()
    const [description, setDescription] = useState<string | null>(null)
    const [error, setError] = useState(false)
    useEffect(() => {
        let isMounted = true
        const loadDescription = async () => {
            try {
                const { data } = await api.get<{ fullDescription?: string }>(
                    "/public/professions_questionnaire/data/description.json"
                )
                if (isMounted) setDescription(data.fullDescription ?? "")
            } catch (err) {
                console.error(err)
                if (isMounted) setError(true)
            }
        }
        loadDescription()
        return () => {
            isMounted = false
        }
    }, [])
    if (error) return (
        <NoResults variant="error" message="Не удалось загрузить описание теста" />
    )
    if (description === null) return  <NoResults variant="loading" message="Загружаем описание…" />
    return (
        <div className="intro-wrapper">
            <div className="intro-container">
                <div className="intro-description">
                    <span>{description}</span>
                </div>
                <div className="intro-options">
                    <Button
                        label="Начать тест"
                        variant="timer"
                        timerSeconds={5}
                        icon={<ArrowRight />}
                        onClick={() => navigate(`/tests/vr/${professionId}`)}
                    />
                </div>
            </div>
        </div>
    )
}