import { useState } from "react"
import { AccountForm } from "../../types/account/account"
import toast from "react-hot-toast"
import { specialistsAPI } from "../../services/api/specialistApi"
import { Specialist } from "../../types/specialist/specialist"
import { RegistrationForm } from "./forms/RegistrationForm"
import { useNavigate } from "react-router-dom"
import { authApi } from "../../services/api/authApi"
import { useAuth } from "../../contexts/AuthContext"
export const PupilRegistrationPage = () => {
    const {login, setRoles} = useAuth()
    const navigate = useNavigate()
    const [accountData, setAccountData] = useState<AccountForm>({email : "", password : "", repeatPassword : ""})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const registration = async () => {
        if (isSubmitting) return
        try {
            setIsSubmitting(true)
            await authApi.register(accountData.email, accountData.password)
            toast.success("Вы успешно зарегистрировались")
            //trying to auth user after success registration
            await authentificate()
            navigate("/profile")
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при регистрации")
        } finally {
            setIsSubmitting(false)
        }
    }
    const authentificate = async () => {
        if (!accountData) return
        const token = await authApi.login(accountData.email, accountData.password)
        const roles = await authApi.getRoles(token)
        login(token)
        setRoles(roles)
    }

    return (<>
        <RegistrationForm account={accountData} setAccount={setAccountData} 
        handleBack={() => navigate(-1)} userType={"Школьник"} handleRegistration={registration} isSubmitting={isSubmitting}/>
    </>)
}
