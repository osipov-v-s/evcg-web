import { PupilResponse } from "../../../types/pupil/pupil"
import style from "./pupils-list.module.css"
import { ReactNode } from "react"
interface PupilCardProps {
    pupil: PupilResponse
    actions?: ReactNode
}

export const PupilCard = ({pupil, actions} : PupilCardProps) => {
    const fullName = [pupil.pupilDTO?.surname, pupil.pupilDTO?.name, pupil.pupilDTO?.patronymic]
                    .filter(Boolean)
                    .join(" ") || "ФИО не заполнено"
    const classInfo = pupil.pupilDTO?.classNumber ? `${pupil.pupilDTO.classNumber}${pupil.pupilDTO.classLabel}` : '--'
    return (
        <div className="base-card">
            <div className="card-title">
                {fullName} <span style={{fontSize: '0.9rem', color: '#666'}}>({classInfo})</span>
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
