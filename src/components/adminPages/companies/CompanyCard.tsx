import { Company } from "../../../types/company/Company"

export const CompanyCard = ({ company }: { company: Company }) => (
    <div className="base-card">
        <div className="card-title">{company.name}</div>
        <div className="info-row"><span className="info-label">ИНН:</span><span>{company.inn || '—'}</span></div>
        <div className="info-row"><span className="info-label">ОГРН:</span><span>{company.ogrn || '—'}</span></div>
        <div className="info-row"><span className="info-label">Адрес:</span><span>{company.address || '—'}</span></div>
        <div className="info-row"><span className="info-label">Контакты:</span><span>{company.phone || company.email || '—'}</span></div>
    </div>
)
