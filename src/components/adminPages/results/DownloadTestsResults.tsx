import { FormEvent, useState } from "react"
import { Download } from "lucide-react"
import toast, {Toaster} from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { useAuth } from "../../../contexts/AuthContext"
import { getApiErrorMessage } from "../../../services/api/error"
import { exportToExcel } from "../../../utils/convertData/exportToExcel"
import { exportToJson } from "../../../utils/convertData/exportToJson"
import { PageHeader } from "../../ui/common/PageHeader"
import "../css/form.css"

type ExportFormat = "xlsx" | "json"
type UserType = "Pupil" | "Specialist" | "all"
const today = new Date().toISOString().slice(0, 10)
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

export const DownloadTestsResults = () => {
    const {getToken} = useAuth()
    const [settings, setSettings] = useState({type: "Pupil" as UserType, startDate: monthAgo, endDate: today, format: "xlsx" as ExportFormat})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (isSubmitting) return
        if (settings.startDate > settings.endDate) {
            toast.error("Дата начала должна быть раньше даты окончания")
            return
        }
        try {
            setIsSubmitting(true)
            const tests = await testApi.getCompletedTestsByDates(
                getToken(), settings.type, `${settings.startDate}T00:00:00`, `${settings.endDate}T23:59:59`)
            if (tests.length === 0) {
                toast.error("За выбранный период результатов нет")
                return
            }
            const filename = `test_results_${settings.type.toLowerCase()}_${settings.startDate}_${settings.endDate}`
            if (settings.format === "xlsx") exportToExcel(tests, filename)
            else exportToJson(tests, filename)
            toast.success("Файл подготовлен")
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Не удалось подготовить выгрузку"))
        } finally {
            setIsSubmitting(false)
        }
    }

    return <main className="admin-entity-page">
        <PageHeader title="Выгрузка результатов" description="Экспорт психологических тестов в JSON или XLSX с данными, релевантными выбранному типу пользователя." />
        <form className="entity-form export-form" onSubmit={handleSubmit}>
            <label>Пользователи<select value={settings.type} onChange={e => setSettings({...settings, type: e.target.value as UserType})}>
                <option value="Pupil">Ученики</option><option value="Specialist">Специалисты</option><option value="all">Все</option>
            </select></label>
            <label>Начало периода<input required type="date" value={settings.startDate} onChange={e => setSettings({...settings, startDate: e.target.value})} /></label>
            <label>Конец периода<input required type="date" value={settings.endDate} onChange={e => setSettings({...settings, endDate: e.target.value})} /></label>
            <label>Формат<select value={settings.format} onChange={e => setSettings({...settings, format: e.target.value as ExportFormat})}><option value="xlsx">XLSX</option><option value="json">JSON</option></select></label>
            <button className="primary-action" type="submit" disabled={isSubmitting}><Download size={18} /> {isSubmitting ? "Готовим файл…" : "Выгрузить"}</button>
        </form>
        <Toaster />
    </main>
}
