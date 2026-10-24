import { FormEvent, useState } from "react"
import { Download } from "lucide-react"
import toast, {Toaster} from "react-hot-toast"
import { testApi } from "../../../services/api/testApi"
import { useAuth } from "../../../contexts/AuthContext"
import { getApiErrorMessage } from "../../../services/api/error"
import { PageHeader } from "../../ui/common/PageHeader"
import "../css/form.css"
import { getShortDate } from "../../../services/dates/formatDate"
import { vrTestApi } from "../../../services/api/vrTestsApi"
import { Button } from "../../ui/reusable/button"
import { exportData } from "../../../utils/convertData/exportData"
import { transformAccountsData } from "../../../utils/convertData/transformAccountData"
import { transformVrTests } from "../../../utils/convertData/transformVrTests"
import { AccountsTests } from "../../../types/account/account"
import { VRTest } from "../../../types/vrTests/VRTest"

type ExportFormat = "xlsx" | "json"
type UserType = "Pupil" | "Specialist" | "all"
const today = new Date().toISOString().slice(0, 10)
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
type TestType = "vrTests" | "psychTests"
const donwloadApis: Record<TestType, any> = {
    "psychTests": {"api": testApi.getCompletedTestsByDates, "converter": transformAccountsData},
    "vrTests": {"api": vrTestApi.getCompletedVRTestsBetweenDates, "converter": transformVrTests}
}
export const DownloadTestsResults = () => {
    const {getToken} = useAuth()
    const [settings, setSettings] = useState({type: "Pupil" as UserType, startDate: monthAgo, endDate: today, format: "xlsx" as ExportFormat})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [testType, setTestType] = useState<TestType>("psychTests")
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (isSubmitting) return
        if (settings.startDate > settings.endDate) {
            toast.error("Дата начала должна быть раньше даты окончания")
            return
        }
        try {
            setIsSubmitting(true)
            //apply different requrest
            const tests = await donwloadApis[testType].api(getToken(), settings.type, `${settings.startDate}T00:00:00`, `${settings.endDate}T23:59:59`)
            //const tests = await testApi.getCompletedTestsByDates(
            //    getToken(), settings.type, `${settings.startDate}T00:00:00`, `${settings.endDate}T23:59:59`)
            if (tests.length === 0) {
                toast.error("За выбранный период результатов нет")
                return
            }
            const filename = `tests_${settings.type.toLowerCase()}_${getShortDate(settings.startDate)}_${getShortDate(settings.endDate)}`
            exportData(tests, settings.format, filename, donwloadApis[testType].converter)

            //if (settings.format === "xlsx") exportToExcel(tests, filename)
            //else exportToJson(tests, filename)
            toast.success("Файл подготовлен")
        } catch (error) {
            console.log(error)
            toast.error(getApiErrorMessage(error, "Не удалось подготовить выгрузку"))
        } finally {
            setIsSubmitting(false)
        }
    }

    return <main className="admin-entity-page">
        <div>
            <Button 
                style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                variant={testType === "psychTests" ? "primary" : "tertiary"} 
                onClick={() => setTestType("psychTests")}>Психологические тесты</Button>
            <Button 
                style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                variant={testType === "vrTests" ? "primary" : "tertiary"} 
                onClick={() => setTestType("vrTests")}>VR тесты</Button>
        </div>
        <PageHeader title="Выгрузка результатов" description="Экспорт различных тестов в JSON или XLSX с данными, по выбранному типу пользователя." />
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
