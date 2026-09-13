import "./css/authStyle.css"

import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthBrand } from "./AuthBrand"
import { AuthSocialButtons } from "./AuthSocialButtons"

type UserType = "Школьник" | "Специалист"

const USER_TYPE = [
    {
        id: "Школьник" as UserType,
        title: "Школьник",
        description: "Я учусь в школе",
    },
    {
        id: "Специалист" as UserType,
        title: "Специалист",
        description: "Я работаю по профессии",
    },
]
const registrationRoutes: Record<UserType, string> = { "Школьник": "/register/pupil", "Специалист": "/register/specialist" }
export const RegistrationTypePicker = () => {
    const navigate = useNavigate()
    const handleSelectType = (type: UserType) => {
        navigate(registrationRoutes[type])
    }

    return (<>
        <div className="auth-container">
            <div className="registration-container">
                <div className="registration-header">
                    <AuthBrand />
                    <h2>Создайте аккаунт</h2>
                    <span>Выберите роль, чтобы продолжить регистрацию.</span>
                </div>

                <div className="registration-type-options">
                    {USER_TYPE.map(({ id, title, description }) => (
                        <button type="button" className="type-item" key={id} onClick={() => handleSelectType(id)}>
                            <span><p>{title}</p><small>{description}</small></span>
                            <ArrowRight size={20} />
                        </button>
                    ))}
                </div>

                <div className="auth-divider"><span>или зарегистрируйтесь через</span></div>
                <AuthSocialButtons />
                <p className="auth-switch">Уже есть аккаунт? <button type="button" onClick={() => navigate("/login")}>Войти</button></p>
            </div>


        </div>
        <Toaster />
    </>)
}
