import "./css/intro.css"

import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import api, { getBaseUrl } from "../../services/api/api"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../ui/reusable/button"
import { ArrowRight } from "lucide-react"

interface TestIntroProps {
    testDescriptionPath: string
    testNavigation: string
}

interface TestDescription {
    testId: string
    title: string
    summary: string
    fullDescription: string
    timeHint: string
}

export const TestIntro = ({ testDescriptionPath, testNavigation }: TestIntroProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [description, setDescription] = useState<TestDescription>()

    useEffect(() => {
        const loadTestDescription = async () => {
            try {
                const response = await api.get(`${getBaseUrl()}/${testDescriptionPath}`)
                const descriptioTemp = response.data
                setDescription(descriptioTemp)
            } catch (err) {
                console.log(err)
                toast.error("Ошибка при загрузке данных")
            }
        }
        loadTestDescription()
    }, [testDescriptionPath])

    const handleStartTest = () => {
        // Получаем индекс следующего шага (если он был передан через location.state)
        const nextStepIndex = location.state?.nextStepIndex

        // Если был передан конкретный шаг — добавляем query-параметр ?step=X
        const targetPath = nextStepIndex !== undefined
            ? `${testNavigation}?step=${nextStepIndex}`
            : testNavigation

        // Переходим обратно на страницу теста, сохраняя накопленное состояние (chainedResults)
        navigate(targetPath, {
            state: location.state,
        })
    }

    if (!description) {
        return <p>Загрузка описания теста...</p>
    }

    return (
        <div className="intro-wrapper">
            <div className="intro-container">
                <div className="intro-description">
                    <span>{description.fullDescription}</span>
                </div>

                <div className="intro-options">
                    <Button
                        label="Начать тест"
                        variant="timer"
                        timerSeconds={5}
                        icon={<ArrowRight />}
                        onClick={handleStartTest}
                    />
                </div>
            </div>
        </div>
    )
}