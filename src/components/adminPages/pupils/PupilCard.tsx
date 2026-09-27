import { KeyRound} from "lucide-react"
import { PupilResponse } from "../../../types/pupil/pupil"
import { Button } from "../../ui/reusable/button"
import style from "./pupils-list.module.css"
import { ReactNode } from "react"
import toast from "react-hot-toast"
import { authApi } from "../../../services/api/authApi"
import { useAuth } from "../../../contexts/AuthContext"
interface PupilCardProps {
    pupil: PupilResponse
    actions?: ReactNode
}

export const PupilCard = ({pupil, actions} : PupilCardProps) => {
    const {getToken} = useAuth()
    const fullName = [pupil.pupilDTO?.surname, pupil.pupilDTO?.name, pupil.pupilDTO?.patronymic]
                    .filter(Boolean)
                    .join(" ") || "ФИО не заполнено"
    const classInfo = pupil.pupilDTO?.classNumber ? `${pupil.pupilDTO.classNumber}${pupil.pupilDTO.classLabel}` : '--'
    const resetAccountPassword = async (pupilId: number | undefined) => {
        if (!pupilId) {
            throw new Error("Не получилось найти студента")
        }
        try {
            const response = await authApi.resetPasswordByPupilId(getToken(), pupilId)
            toast.success(`Новый пароль студента ${fullName}: 123123`)
        } catch(err) {
            console.log(err)
            toast.error(`Не удалось сбросить пароль ${err}`)
        }
    }
    return (
        <div className="base-card">
            <div className="card-title">
                
                <p>{fullName} <span style={{fontSize: '0.9rem', color: '#666'}}>({classInfo})</span></p>
                <KeyRound color="var(--error-color-500)" onClick={() => resetAccountPassword(pupil.pupilDTO.id)} />
            </div>
            <div className="info-row">
                <span className="info-label">Почта:</span>
                <span>{pupil.email || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Организация:</span>
                <span>{pupil.pupilDTO?.school || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">
                    Дата регистрации:
                </span>
                <span>{pupil.pupilDTO?.createdAt || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Пол:</span>
                <span>{pupil.pupilDTO?.gender === "MALE" ? "Мужской" : pupil.pupilDTO?.gender === "FEMALE" ? "Женский" : "—"}</span>
            </div>
            {actions && <div className="card-actions">{actions}</div>}
        </div>
    )
}
