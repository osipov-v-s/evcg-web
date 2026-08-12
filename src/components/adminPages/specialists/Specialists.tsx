import { FormEvent, useCallback, useEffect, useState } from "react"
import toast, {Toaster} from "react-hot-toast"
import { Upload } from "lucide-react"
import { profession, Specialist, SpecialistsFilter } from "../../../types/specialist/specialist"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { getApiErrorMessage } from "../../../services/api/error"
import { useAuth } from "../../../contexts/AuthContext"
import "./css/specialists.css"
import "../css/card.css"
import { SpecialistCard } from "./SpecialistCard"
import { Pagination } from "../../ui/reusable/Pagination"
import { PageHeader } from "../../ui/common/PageHeader"
import { DataFilterBar } from "../../ui/common/DataFilterBar"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { UploadSpecialists } from "./UploadSpecialists"

const emptyFilters: SpecialistsFilter = {}

export const Specialists = () => {
    const {getToken} = useAuth()
    const [specialists, setSpecialists] = useState<Specialist[]>([])
    const [professions, setProfessions] = useState<profession[]>([])
    const [draftFilters, setDraftFilters] = useState<SpecialistsFilter>(emptyFilters)
    const [filters, setFilters] = useState<SpecialistsFilter>(emptyFilters)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const size = 9

    const loadSpecialists = useCallback(async (signal: AbortSignal) => {
        try {
            setIsLoading(true)
            const page = await specialistsAPI.getSpecialistsPage(currentPage, size, getToken(), filters, signal)
            setSpecialists(page.content)
            setTotalPages(page.totalPages)
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось загрузить специалистов"))
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, filters, getToken])

    useEffect(() => {
        specialistsAPI.getProfessions().then(setProfessions).catch(() => setProfessions([]))
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        loadSpecialists(controller.signal)
        return () => controller.abort()
    }, [loadSpecialists])

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
        <PageHeader title="Специалисты" description="Представители профессий, формирующие данные для референсных моделей." />

        <details className="admin-action-panel">
            <summary><Upload size={18} /> Массовая загрузка XLSX</summary>
            <UploadSpecialists />
        </details>

        <form onSubmit={applyFilters}>
            <DataFilterBar onReset={resetFilters}>
                <input aria-label="ФИО" placeholder="ФИО" value={draftFilters.name || ""} onChange={e => setDraftFilters({...draftFilters, name: e.target.value})} />
                <select aria-label="Профессия" value={draftFilters.profession || ""} onChange={e => setDraftFilters({...draftFilters, profession: e.target.value})}>
                    <option value="">Все профессии</option>
                    {professions.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                </select>
                <input aria-label="Место работы" placeholder="Место работы" value={draftFilters.company || ""} onChange={e => setDraftFilters({...draftFilters, company: e.target.value})} />
                <button className="primary-action" type="submit">Применить</button>
            </DataFilterBar>
        </form>

        {isLoading && specialists.length === 0 ? <NoResults variant="loading" message="Загружаем специалистов…" />
            : specialists.length === 0 ? <NoResults variant="empty" title="Специалисты не найдены" message="Измените фильтры или загрузите данные." />
            : <div className="cards-container">{specialists.map(specialist => <SpecialistCard key={specialist.id ?? specialist.email} specialist={specialist} />)}</div>}

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={totalPages} />
        <Toaster />
    </main>
}
