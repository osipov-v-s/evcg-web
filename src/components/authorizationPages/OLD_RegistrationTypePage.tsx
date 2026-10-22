import "./css/authStyle.css"

import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

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
                    <Button label="Уже есть аккаунт" variant="tertiary" onClick={() => navigate("/login")} icon={<ArrowLeft />} />
                </div>
            </div>


        </div>
        <Toaster />
    </>)
}
