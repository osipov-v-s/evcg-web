import { FormEvent, useCallback, useEffect, useState } from "react"
import toast, {Toaster} from "react-hot-toast"
import { Upload } from "lucide-react"
import { PupilFilters, PupilListResponse } from "../../../types/pupil/pupil"
import { Gender } from "../../../types/pupil/gender"
import { pupilApi } from "../../../services/api/pupilApi"
import { educationApi } from "../../../services/api/educationApi"
import { getApiErrorMessage } from "../../../services/api/error"
import { School } from "../../../types/education/education"
import "../css/card.css"
import { Pagination } from "../../ui/reusable/Pagination"
import { PupilCard } from "./PupilCard"
import { useAuth } from "../../../contexts/AuthContext"
import { PageHeader } from "../../ui/common/PageHeader"
import { DataFilterBar } from "../../ui/common/DataFilterBar"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { PupilDataLoading } from "./data-loading/PupilDataLoading"

const emptyFilters: PupilFilters = {}

export const PupilsList = () => {
    const {getToken} = useAuth()
    const [response, setResponse] = useState<PupilListResponse>()
    const [schools, setSchools] = useState<School[]>([])
    const [draftFilters, setDraftFilters] = useState<PupilFilters>(emptyFilters)
    const [filters, setFilters] = useState<PupilFilters>(emptyFilters)
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const size = 9

    const fetchPupils = useCallback(async (signal: AbortSignal) => {
        try {
            setIsLoading(true)
            setResponse(await pupilApi.getAllPupils(currentPage, size, getToken(), filters, signal))
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return
            toast.error(getApiErrorMessage(error, "Не удалось загрузить список учеников"))
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, filters, getToken])

    useEffect(() => {
        educationApi.getSchools(getToken()).then(setSchools).catch(() => setSchools([]))
    }, [getToken])

    useEffect(() => {
        const controller = new AbortController()
        fetchPupils(controller.signal)
        return () => controller.abort()
    }, [fetchPupils])

    const applyFilters = (event: FormEvent) => {
        event.preventDefault()
        setCurrentPage(0)
        setFilters(draftFilters)
    }

    const resetFilters = () => {
        setDraftFilters(emptyFilters)
        setFilters(emptyFilters)
        setCurrentPage(0)
    }

    return <main className="admin-list-wrapper admin-entity-page">
        <PageHeader title="Ученики" description="Профили школьников, образовательные организации и классы." />

        <details className="admin-action-panel">
            <summary><Upload size={18} /> Массовая загрузка XLSX</summary>
            <PupilDataLoading />
        </details>

        <form onSubmit={applyFilters}>
            <DataFilterBar onReset={resetFilters}>
                <input aria-label="ФИО" placeholder="ФИО" value={draftFilters.name || ""} onChange={e => setDraftFilters({...draftFilters, name: e.target.value})} />
                <input aria-label="Email" type="email" placeholder="Email" value={draftFilters.email || ""} onChange={e => setDraftFilters({...draftFilters, email: e.target.value})} />
                <select aria-label="Школа" value={draftFilters.school || ""} onChange={e => setDraftFilters({...draftFilters, school: e.target.value})}>
                    <option value="">Все школы</option>
                    {schools.map(school => <option key={school.id} value={school.name}>{school.name}</option>)}
                </select>
                <select aria-label="Класс" value={draftFilters.classNumber || ""} onChange={e => setDraftFilters({...draftFilters, classNumber: e.target.value ? Number(e.target.value) : undefined})}>
                    <option value="">Все классы</option>
                    {[5,6,7,8,9,10,11].map(value => <option key={value} value={value}>{value} класс</option>)}
                </select>
                <select aria-label="Пол" value={draftFilters.gender || ""} onChange={e => setDraftFilters({...draftFilters, gender: e.target.value as Gender || undefined})}>
                    <option value="">Любой пол</option><option value={Gender.MALE}>Мужской</option><option value={Gender.FEMALE}>Женский</option>
                </select>
                <button className="primary-action" type="submit">Применить</button>
            </DataFilterBar>
        </form>

        {isLoading && !response ? <NoResults variant="loading" message="Загружаем учеников…" />
            : response?.content.length === 0 ? <NoResults variant="empty" title="Ученики не найдены" message="Измените фильтры или загрузите данные." />
            : <div className="cards-container">{response?.content.map(pupil => <PupilCard key={pupil.pupilDTO.id ?? pupil.email} pupil={pupil} />)}</div>}

        {response && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={response.totalPages} />}
        <Toaster position="top-right" />
    </main>
}
