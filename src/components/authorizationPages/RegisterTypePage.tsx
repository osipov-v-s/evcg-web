import "./css/authStyle.css"

import { ArrowLeft, GraduationCap } from "lucide-react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/reusable/button"

type UserType = "schoolboy" | "specialist"

const USER_TYPE = [
    {
        id: "schoolboy" as UserType,
        title: "Школьник",
        description: "Я учусь в школе",
    },
    {
        id: "specialist" as UserType,
        title: "Специалист",
        description: "Я работаю по профессии",
    }
]

const registerRoutes: Record<UserType, string> = { "schoolboy": "/register/pupil", "specialist": "/register/specialist" }

export const RegisterTypePage: FC = () => {
    const navigate = useNavigate()

    const handleSelectType = (type: UserType) => {
        navigate(registerRoutes[type])
    }

    const handleBackToLoginPage = () => {
        navigate("/login")
    }

    return (
        <div className="auth-container">
            <div className="registration-container">
                <div className="registration-header">
                    <div className="registration-icon"><GraduationCap size={34} /></div>
                    <h2>Добро пожаловать!</h2>
                    <span>Выберите, кем вы являетесь</span>
                </div>

                <div className="registration-type-options">
                    {USER_TYPE.map(({ id, title, description }) => (
                        <button type="button" className="type-item" key={id} onClick={() => handleSelectType(id)}>
                            <p>{title}</p>
                            <span>{description}</span>
                        </button>
                    ))}
                </div>

                <div className="registration-form-row">
                    <Button label="Уже есть аккаунт" variant="tertiary" onClick={handleBackToLoginPage} icon={<ArrowLeft />} />
                </div>
            </div>
        </div>
    )
}