import { useAuth } from "../../contexts/AuthContext"
import { ROLES } from "../../types/account/role"
import { PupilProfilePage } from "./PupilProfilePage"
import { SpecialistProfilePage } from "./SpecialistProfilePage"
import { CuratorProfilePage } from "./CuratorProfilePage"

export const ProfileCommonPage = () => {

    const { getRoles } = useAuth()

    if (getRoles()?.find(role => role.name === ROLES.PUPIL))
        return (<PupilProfilePage />)

    if (getRoles()?.find(role => role.name === ROLES.SPECIALIST))
        return (<SpecialistProfilePage />)

    if (getRoles()?.find(role => role.name === ROLES.CURATOR))
        return (<CuratorProfilePage />)

    return <p>Для этой роли профиль редактируется администратором организации.</p>
}
