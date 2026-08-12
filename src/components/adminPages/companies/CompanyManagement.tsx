import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Plus } from "lucide-react"
import { companyApi } from "../../../services/api/companyApi"
import { useAuth } from "../../../contexts/AuthContext"
import { Company } from "../../../types/company/Company"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { CompanyCard } from "./CompanyCard"
import { CompanyDialog } from "./CompanyDialog"

export const CompanyManagement = () => {
    const { getToken } = useAuth()
    const [companies, setCompanies] = useState<Company[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showCompanyForm, setShowCompanyForm] = useState(false)

    const loadCompanies = async () => {
        try {
            setIsLoading(true)
            setCompanies(await companyApi.getCompanies(getToken()))
        } catch (error) {
            console.error(error)
            toast.error("Ошибка при загрузке компаний")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { loadCompanies() }, [])

    if (isLoading)
        return <div className="admin-list-wrapper center"><NoResults variant="loading" /></div>

    return (
        <div className="admin-list-wrapper scroll-y" style={{ padding: 20 }}>
            <div className="list-header">
                <div>
                    <h2>Организации специалистов</h2>
                    <p>Справочник мест работы для референсных профилей профессий.</p>
                </div>
                <button className="add-btn" onClick={() => setShowCompanyForm(true)}>
                    <Plus size={20} /> Добавить организацию
                </button>
            </div>
            {companies.length === 0
                ? <NoResults variant="empty" title="Нет организаций" message="Добавьте информационную карточку организации." />
                : <div className="cards-container">{companies.map(company => <CompanyCard key={company.id ?? company.name} company={company} />)}</div>}
            {showCompanyForm && <CompanyDialog onClose={() => setShowCompanyForm(false)} onSuccess={() => {
                setShowCompanyForm(false)
                loadCompanies()
            }} />}
            <Toaster />
        </div>
    )
}
