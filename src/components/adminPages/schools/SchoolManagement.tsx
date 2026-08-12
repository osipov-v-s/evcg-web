import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Pencil, Plus, Users } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"
import { educationApi } from "../../../services/api/educationApi"
import { getApiErrorMessage } from "../../../services/api/error"
import {
    Curator,
    CuratorCreateRequest,
    CuratorUpdateRequest,
    School
} from "../../../types/education/education"
import { PageHeader } from "../../ui/common/PageHeader"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import "./school-management.css"

const emptySchool: School = {name: "", address: "", email: "", phone: ""}
const emptyCurator: CuratorCreateRequest = {
    account: {email: "", password: ""},
    name: "",
    surname: "",
    patronymic: ""
}

const EntityModal = ({title, children, onClose}: {
    title: string
    children: ReactNode
    onClose: () => void
}) => <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="school-dialog" role="dialog" aria-modal="true" aria-label={title} onMouseDown={event => event.stopPropagation()}>
        <div className="school-dialog__header"><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Закрыть">×</button></div>
        {children}
    </section>
</div>

export const SchoolManagement = () => {
    const {getToken} = useAuth()
    const [schools, setSchools] = useState<School[]>([])
    const [curators, setCurators] = useState<Curator[]>([])
    const [selectedSchool, setSelectedSchool] = useState<School>()
    const [schoolDraft, setSchoolDraft] = useState<School>()
    const [curatorDraft, setCuratorDraft] = useState<CuratorCreateRequest | Curator>()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const loadSchools = useCallback(async () => {
        try {
            setSchools(await educationApi.getSchools(getToken()))
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось загрузить школы"))
        } finally {
            setIsLoading(false)
        }
    }, [getToken])

    useEffect(() => { loadSchools() }, [loadSchools])

    const openSchool = async (school: School) => {
        setSelectedSchool(school)
        setCurators([])
        try {
            setCurators(await educationApi.getSchoolCurators(getToken(), school.id!))
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось загрузить кураторов"))
        }
    }

    const saveSchool = async (event: FormEvent) => {
        event.preventDefault()
        if (!schoolDraft || isSaving) return
        try {
            setIsSaving(true)
            if (schoolDraft.id) await educationApi.updateSchool(getToken(), schoolDraft.id, schoolDraft)
            else await educationApi.createSchool(getToken(), schoolDraft)
            setSchoolDraft(undefined)
            await loadSchools()
            toast.success(schoolDraft.id ? "Школа обновлена" : "Школа создана")
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось сохранить школу"))
        } finally {
            setIsSaving(false)
        }
    }

    const saveCurator = async (event: FormEvent) => {
        event.preventDefault()
        if (!selectedSchool?.id || !curatorDraft || isSaving) return
        try {
            setIsSaving(true)
            if ("id" in curatorDraft) {
                const request: CuratorUpdateRequest = {
                    email: curatorDraft.email,
                    name: curatorDraft.name,
                    surname: curatorDraft.surname,
                    patronymic: curatorDraft.patronymic,
                    schoolId: selectedSchool.id
                }
                await educationApi.updateCurator(getToken(), curatorDraft.id, request)
            } else {
                await educationApi.createCurator(getToken(), selectedSchool.id, curatorDraft)
            }
            setCuratorDraft(undefined)
            await openSchool(selectedSchool)
            toast.success("Данные куратора сохранены")
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось сохранить куратора"))
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <NoResults variant="loading" message="Загружаем школы…" />

    return <main className="admin-list-wrapper school-management">
        <PageHeader
            title="Школы и кураторы"
            description="Образовательные организации, ученики которых участвуют в профориентационной диагностике."
            actions={<button className="primary-action" type="button" onClick={() => setSchoolDraft({...emptySchool})}>
                <Plus size={18} /> Добавить школу
            </button>} />

        {schools.length === 0
            ? <NoResults variant="empty" title="Школ пока нет" message="Создайте первую образовательную организацию." />
            : <div className="school-grid">{schools.map(school => <article className="base-card school-card" key={school.id}>
                <div className="school-card__title"><h2>{school.name}</h2><button type="button" onClick={() => setSchoolDraft({...school})} aria-label={`Редактировать ${school.name}`}><Pencil size={18} /></button></div>
                <p>{school.address || "Адрес не указан"}</p>
                <p>{[school.email, school.phone].filter(Boolean).join(" · ") || "Контакты не указаны"}</p>
                <button className="secondary-action" type="button" onClick={() => openSchool(school)}>
                    <Users size={18} /> Кураторы
                </button>
            </article>)}</div>}

        {selectedSchool && <section className="school-curators">
            <PageHeader
                title={`Кураторы: ${selectedSchool.name}`}
                actions={<button className="primary-action" type="button" onClick={() => setCuratorDraft({...emptyCurator, account: {...emptyCurator.account}})}>
                    <Plus size={18} /> Добавить куратора
                </button>} />
            {curators.length === 0
                ? <p className="school-empty">У этой школы пока нет кураторов.</p>
                : <div className="school-grid">{curators.map(curator => <article className="base-card" key={curator.id}>
                    <h3>{curator.surname} {curator.name} {curator.patronymic}</h3>
                    <p>{curator.email}</p>
                    <button className="secondary-action" type="button" onClick={() => setCuratorDraft({...curator})}>
                        <Pencil size={17} /> Редактировать
                    </button>
                </article>)}</div>}
        </section>}

        {schoolDraft && <EntityModal title={schoolDraft.id ? "Редактировать школу" : "Новая школа"} onClose={() => !isSaving && setSchoolDraft(undefined)}>
            <form className="entity-form" onSubmit={saveSchool}>
                <label>Название<input required value={schoolDraft.name} onChange={e => setSchoolDraft({...schoolDraft, name: e.target.value})} /></label>
                <label>Адрес<input value={schoolDraft.address || ""} onChange={e => setSchoolDraft({...schoolDraft, address: e.target.value})} /></label>
                <label>Email<input type="email" value={schoolDraft.email || ""} onChange={e => setSchoolDraft({...schoolDraft, email: e.target.value})} /></label>
                <label>Телефон<input value={schoolDraft.phone || ""} onChange={e => setSchoolDraft({...schoolDraft, phone: e.target.value})} /></label>
                <button className="primary-action" type="submit" disabled={isSaving}>{isSaving ? "Сохраняем…" : "Сохранить"}</button>
            </form>
        </EntityModal>}

        {curatorDraft && <EntityModal title={"id" in curatorDraft ? "Редактировать куратора" : "Новый куратор"} onClose={() => !isSaving && setCuratorDraft(undefined)}>
            <form className="entity-form" onSubmit={saveCurator}>
                <label>Фамилия<input required value={curatorDraft.surname} onChange={e => setCuratorDraft({...curatorDraft, surname: e.target.value})} /></label>
                <label>Имя<input required value={curatorDraft.name} onChange={e => setCuratorDraft({...curatorDraft, name: e.target.value})} /></label>
                <label>Отчество<input value={curatorDraft.patronymic || ""} onChange={e => setCuratorDraft({...curatorDraft, patronymic: e.target.value})} /></label>
                {"id" in curatorDraft
                    ? <label>Email<input required type="email" value={curatorDraft.email} onChange={e => setCuratorDraft({...curatorDraft, email: e.target.value})} /></label>
                    : <>
                        <label>Email<input required type="email" value={curatorDraft.account.email} onChange={e => setCuratorDraft({...curatorDraft, account: {...curatorDraft.account, email: e.target.value}})} /></label>
                        <label>Временный пароль<input required minLength={8} type="password" autoComplete="new-password" value={curatorDraft.account.password} onChange={e => setCuratorDraft({...curatorDraft, account: {...curatorDraft.account, password: e.target.value}})} /></label>
                    </>}
                <button className="primary-action" type="submit" disabled={isSaving}>{isSaving ? "Сохраняем…" : "Сохранить"}</button>
            </form>
        </EntityModal>}
        <Toaster />
    </main>
}
