import { FormEvent, useCallback, useEffect, useState } from "react"
import { Download, KeyRound, UserRound } from "lucide-react"
import toast, {Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { educationApi } from "../../services/api/educationApi"
import { pupilApi } from "../../services/api/pupilApi"
import { getApiErrorMessage } from "../../services/api/error"
import { Curator } from "../../types/education/education"
import { Gender } from "../../types/pupil/gender"
import { PupilFilters, PupilListResponse, PupilResponse } from "../../types/pupil/pupil"
import { exportToExcel } from "../../utils/convertData/exportToExcel"
import { exportToJson } from "../../utils/convertData/exportToJson"
import { PupilCard } from "../adminPages/pupils/PupilCard"
import { PageHeader } from "../ui/common/PageHeader"
import { DataFilterBar } from "../ui/common/DataFilterBar"
import { ConfirmDialog } from "../ui/common/ConfirmDialog"
import { Pagination } from "../ui/reusable/Pagination"
import { NoResults } from "../ui/noResultComponent/NoResult"
import "./curator.css"

type ExportFormat = "xlsx" | "json"
const emptyFilters: PupilFilters = {}
const today = new Date().toISOString().slice(0, 10)
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

export const CuratorDashboard = () => {
    const {getToken} = useAuth()
    const navigate = useNavigate()
    const [curator, setCurator] = useState<Curator>()
    const [pupils, setPupils] = useState<PupilListResponse>()
    const [draftFilters, setDraftFilters] = useState<PupilFilters>(emptyFilters)
    const [filters, setFilters] = useState<PupilFilters>(emptyFilters)
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [resetTarget, setResetTarget] = useState<PupilResponse>()
    const [isResetting, setIsResetting] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [exportSettings, setExportSettings] = useState({startDate: monthAgo, endDate: today, format: "xlsx" as ExportFormat})
    const size = 9

    const loadPupils = useCallback(async (signal: AbortSignal) => {
        try {
            setIsLoading(true)
            setPupils(await pupilApi.getAllPupils(currentPage, size, getToken(), filters, signal))
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось загрузить учеников вашей школы"))
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, filters, getToken])

    useEffect(() => {
        educationApi.getCuratorProfile(getToken()).then(setCurator)
            .catch(error => toast.error(getApiErrorMessage(error, "Не удалось загрузить профиль куратора")))
    }, [getToken])

    useEffect(() => {
        const controller = new AbortController()
        loadPupils(controller.signal)
        return () => controller.abort()
    }, [loadPupils])

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

    const resetPassword = async () => {
        const pupilId = resetTarget?.pupilDTO.id
        if (!pupilId || isResetting) return
        try {
            setIsResetting(true)
            await educationApi.resetPupilPassword(getToken(), pupilId)
            toast.success("Пароль ученика сброшен на 123123")
            setResetTarget(undefined)
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось сбросить пароль ученика"))
        } finally {
            setIsResetting(false)
        }
    }

    const exportResults = async (event: FormEvent) => {
        event.preventDefault()
        if (isExporting) return
        if (exportSettings.startDate > exportSettings.endDate) {
            toast.error("Дата начала должна быть раньше даты окончания")
            return
        }
        try {
            setIsExporting(true)
            const data = await educationApi.getCuratorPupilResults(
                getToken(),
                `${exportSettings.startDate}T00:00:00`,
                `${exportSettings.endDate}T23:59:59`
            )
            if (data.length === 0) {
                toast.error("За выбранный период завершённых тестов нет")
                return
            }
            const filename = `school_results_${exportSettings.startDate}_${exportSettings.endDate}`
            if (exportSettings.format === "xlsx") exportToExcel(data, filename)
            else exportToJson(data, filename)
            toast.success("Файл подготовлен")
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось выгрузить результаты"))
        } finally {
            setIsExporting(false)
        }
    }

    return <main className="curator-page">
        <PageHeader
            title="Ученики моей школы"
            description={curator ? `${curator.school.name} · ${curator.surname} ${curator.name}` : "Загружаем данные организации…"}
            actions={<button className="secondary-action" type="button" onClick={() => navigate("/profile")}><UserRound size={18} /> Мой профиль</button>} />

        <form onSubmit={applyFilters}>
            <DataFilterBar onReset={resetFilters}>
                <input aria-label="ФИО" placeholder="ФИО ученика" value={draftFilters.name || ""} onChange={e => setDraftFilters({...draftFilters, name: e.target.value})} />
                <input aria-label="Email" type="email" placeholder="Email" value={draftFilters.email || ""} onChange={e => setDraftFilters({...draftFilters, email: e.target.value})} />
                <select aria-label="Класс" value={draftFilters.classNumber || ""} onChange={e => setDraftFilters({...draftFilters, classNumber: e.target.value ? Number(e.target.value) : undefined})}>
                    <option value="">Все классы</option>{[5,6,7,8,9,10,11].map(value => <option key={value} value={value}>{value} класс</option>)}
                </select>
                <select aria-label="Пол" value={draftFilters.gender || ""} onChange={e => setDraftFilters({...draftFilters, gender: e.target.value as Gender || undefined})}>
                    <option value="">Любой пол</option><option value={Gender.MALE}>Мужской</option><option value={Gender.FEMALE}>Женский</option>
                </select>
                <button className="primary-action" type="submit">Применить</button>
            </DataFilterBar>
        </form>

        {isLoading && !pupils ? <NoResults variant="loading" message="Загружаем учеников…" />
            : pupils?.content.length === 0 ? <NoResults variant="empty" title="Ученики не найдены" message="Измените фильтры или обратитесь к администратору." />
            : <div className="cards-container">{pupils?.content.map(pupil => <PupilCard
                key={pupil.pupilDTO.id ?? pupil.email}
                pupil={pupil}
                actions={<button className="secondary-action" type="button" onClick={() => setResetTarget(pupil)}><KeyRound size={17} /> Сбросить пароль</button>} />)}</div>}

        {pupils && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={pupils.totalPages} />}

        <section className="curator-export">
            <PageHeader title="Выгрузка результатов" description="В файл попадут только ученики вашей школы и только тесты за выбранный период." />
            <form className="entity-form curator-export__form" onSubmit={exportResults}>
                <label>Начало периода<input type="date" required value={exportSettings.startDate} onChange={e => setExportSettings({...exportSettings, startDate: e.target.value})} /></label>
                <label>Конец периода<input type="date" required value={exportSettings.endDate} onChange={e => setExportSettings({...exportSettings, endDate: e.target.value})} /></label>
                <label>Формат<select value={exportSettings.format} onChange={e => setExportSettings({...exportSettings, format: e.target.value as ExportFormat})}><option value="xlsx">XLSX</option><option value="json">JSON</option></select></label>
                <button className="primary-action" type="submit" disabled={isExporting}><Download size={18} /> {isExporting ? "Готовим файл…" : "Выгрузить"}</button>
            </form>
        </section>

        <ConfirmDialog
            open={!!resetTarget}
            title="Сбросить пароль ученика?"
            message={`Пароль ученика ${resetTarget?.pupilDTO.surname || ""} ${resetTarget?.pupilDTO.name || ""} будет сброшен на 123123.`}
            confirmLabel="Сбросить пароль"
            busy={isResetting}
            onConfirm={resetPassword}
            onClose={() => setResetTarget(undefined)} />
        <Toaster />
    </main>
}
