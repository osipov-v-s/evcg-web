import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { authApi } from "../../services/api/authApi"
import { AuthCredentials } from "../../types/account/authCredentials"
import { RegisterPage } from "./RegisterPage"

export const RegisterSchoolboySelect: FC = () => {
    const navigate = useNavigate()

    const register = async (credentials: AuthCredentials) => {
        await authApi.register(credentials)
    }

    return (
        <RegisterPage
            userType="schoolboy"
            onSubmit={register}
            onSuccess={() => navigate("/login")} />
    )
}