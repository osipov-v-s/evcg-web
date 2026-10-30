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
        <div className="auth">
            <div className="auth-container">
                <div className="auth-header">
                    <div onClick={() => navigate("/")}>
                        <h2>ПрофиВектор</h2>
                        <span>Твой вектор в инженерное будущее</span>
                    </div>
                    <h2>Выберите, кем вы являетесь</h2>
                </div>

                <div className="auth-form-cols">
                    {USER_TYPE.map(({ id, title, description }) => (
                        <button type="button" className="auth-type-item" key={id} onClick={() => handleSelectType(id)}>
                            <p>{title}</p>
                            <span>{description}</span>
                        </button>
                    ))}

                    <div className="auth-actions">
                        <div className="auth-regsiter"><span>Уже есть аккаунт?</span><Button type="button" label="Войти" variant="tertiary" onClick={handleBackToLoginPage} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}