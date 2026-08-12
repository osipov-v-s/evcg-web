import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { educationApi } from "../../services/api/educationApi"
import { getApiErrorMessage } from "../../services/api/error"
import { Curator } from "../../types/education/education"
import { useAuth } from "../../contexts/AuthContext"
import { PageHeader } from "../ui/common/PageHeader"
import { NoResults } from "../ui/noResultComponent/NoResult"
import { PasswordReset } from "./PasswordReset"
import "./css/profilePageStyles.css"

export const CuratorProfilePage = () => {
    const {getToken} = useAuth()
    const [curator, setCurator] = useState<Curator>()

    useEffect(() => {
        educationApi.getCuratorProfile(getToken()).then(setCurator)
            .catch(error => toast.error(getApiErrorMessage(error, "Не удалось загрузить профиль")))
    }, [getToken])

    if (!curator) return <NoResults variant="loading" message="Загружаем профиль куратора…" />

    return <main className="profile-wrapper">
        <div className="profile-container">
            <PageHeader title="Профиль куратора" description="Организация назначается администратором и доступна только для чтения." />
            <div className="profile-grid flex-layout">
                <section className="profile-card row-full">
                    <h4>ФИО</h4>
                    <p>{curator.surname} {curator.name} {curator.patronymic || ""}</p>
                </section>
                <div className="profile-row row-2">
                    <section className="profile-card"><h4>Email аккаунта</h4><p>{curator.email}</p></section>
                    <section className="profile-card"><h4>Образовательная организация</h4><p>{curator.school.name}</p><small>{curator.school.address || "Адрес не указан"}</small></section>
                </div>
                <PasswordReset />
            </div>
        </div>
    </main>
}
