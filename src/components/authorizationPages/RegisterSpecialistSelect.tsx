import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { specialistsAPI } from "../../services/api/specialistApi"
import { AuthCredentials, toAccountPayload } from "../../types/account/authCredentials"
import { Gender } from "../../types/pupil/gender"
import { Specialist } from "../../types/specialist/specialist"
import { RegisterPage } from "./RegisterPage"

export const RegisterSpecialistSelect: FC = () => {
    const navigate = useNavigate()
    const [specialistData, setSpecialistData] = useState<Specialist>({
        email: "", contactEmail: "", name: "", surname: "", patronymic: "",
        contactPhone: "", experience: "", jobSatisfaction: "", profession: "", gender: Gender.MALE
    })

    const register = async (credentials: AuthCredentials) => {
        await specialistsAPI.specialistRegister({
            account: toAccountPayload(credentials),
            specialist: specialistData,
        })
    }

    return (
        <RegisterPage
            userType="specialist"
            onSubmit={register}
            onSuccess={() => navigate("/login")} />
    )
}