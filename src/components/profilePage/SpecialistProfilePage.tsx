import { ChangeEvent, FC, useEffect, useMemo, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput"
import { UserPen, MailOpen, UserRound, Phone, CheckCheck } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { Radio, RadioGroup } from "../ui/reusable/radio"
import { Gender } from "../../types/pupil/gender"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { Specialist } from "../../types/specialist/specialist"
import { specialistsAPI } from "../../services/api/specialistApi"
import { companyApi } from "../../services/api/companyApi"
import { Company } from "../../types/company/Company"
import { PasswordReset } from "./PasswordReset"
import { PageHeader } from "../ui/common/PageHeader"
import { NoResults } from "../ui/noResultComponent/NoResult"
import { getApiErrorMessage } from "../../services/api/error"

export const SpecialistProfilePage: FC = () => {
    const { getToken } = useAuth()

    const [specialist, setSpecialist] = useState<Specialist>({
        email: '',
        name: '',
        surname: '',
        patronymic: '',
        contactEmail: '',
        contactPhone: '',
        experience: '',
        jobSatisfaction: '',
        profession: '',
        gender: Gender.MALE
    })

    const [professions, setProfessions] = useState<Array<{ value: string; label: string }>>([])
    const [company, setCompany] = useState<Company>()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            try {
                const [specialistData, professionsTemp] = await Promise.all([
                    specialistsAPI.getSpecialistData(getToken()),
                    specialistsAPI.getProfessions()
                ])
                setSpecialist(specialistData)
                setProfessions(professionsTemp.map(profession => ({ value: profession.name, label: profession.name })))
            } catch (err) {
                toast.error(getApiErrorMessage(err, "Ошибка при загрузке профиля"))
            } finally {
                setIsLoading(false)
            }
        }
        const loadCompany = async () => {
            try {
                const companyTemp = await companyApi.getCompanyBySpecialist(getToken())
                setCompany(companyTemp)
            } catch(err) {
                console.error(err)
            }
        }

        loadData()
        loadCompany()
    }, [])

    const jobExpirienceOptions = useMemo(() => [
        { value: "менее 1 года", label: "менее 1 года" },
        { value: "1 - 2 года", label: "1 - 2 года" },
        { value: "3 - 4 года", label: "3 - 4 года" },
        { value: "более 4 лет", label: "более 4 лет" }
    ], [])

    const jobSatisfactionOptions = useMemo(() => [
        { value: "Нравится", label: "Нравится" },
        { value: "Скорее нравится", label: "Скорее нравится" },
        { value: "Нейтрально", label: "Нейтрально" },
        { value: "Скорее не нравится", label: "Скорее не нравится" },
        { value: "Не нравится", label: "Не нравится" }
    ], [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setSpecialist(prev => ({ ...prev, [name]: value }))
    }

    const radioGroupHandleChange = (name: string, value: string) => {
        setSpecialist(prev => ({ ...prev, [name]: value }))
    }

    const updateData = async () => {
        if (isSaving) return
        try {
            setIsSaving(true)
            const updatedSpecialist = await specialistsAPI.updateSpecialist(getToken(), specialist)
            setSpecialist(updatedSpecialist)
            toast.success("Данные успешно обновлены")

        } catch (err) {
            toast.error(getApiErrorMessage(err, "Возникла ошибка при обновлении профиля"))
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <NoResults variant="loading" message="Загружаем профиль специалиста…" />

 return (
    <>
        <div className="profile-wrapper">
            <div className="profile-container">
                <PageHeader title="Профиль специалиста" description={company ? `Место работы: ${company.name}` : "Заполните сведения, используемые в референсной модели профессии."} />
                <div className="profile-grid flex-layout">
                    
                    {/* Row 1: Gender + Email */}
                    <div className="profile-row row-2">
                        <div className="profile-card">
                            <h4>Пол</h4>
                            <RadioGroup
                                name="gender"
                                value={specialist.gender}
                                onChange={(value) => radioGroupHandleChange("gender", value)}
                                direction="row">
                                <Radio radioLabel="Мужской" radioValue={Gender.MALE} />
                                <Radio radioLabel="Женский" radioValue={Gender.FEMALE} />
                            </RadioGroup>
                        </div>

                        <div className="profile-card">
                            <h4>Логин / Электронная почта</h4>
                            <FieldInput
                                name="email"
                                inputIcon={<UserRound size={20} />}
                                inputPlaceholder="example@mail.ru"
                                inputValue={specialist?.email}
                                isDisabled={true}
                            />
                        </div>
                    </div>

                    {/* Row 2: Full Name */}
                    <div className="profile-card row-full">
                        <div className="name-fields">
                            <div>
                                <h4>Фамилия</h4>
                                <FieldInput
                                    name="surname"
                                    inputIcon={<UserPen size={20} />}
                                    inputPlaceholder="Иванов"
                                    inputValue={specialist.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4>Имя</h4>
                                <FieldInput
                                    name="name"
                                    inputPlaceholder="Иван"
                                    inputValue={specialist.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4>Отчество</h4>
                                <FieldInput
                                    name="patronymic"
                                    inputPlaceholder="Иванович"
                                    inputValue={specialist.patronymic}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Contacts */}
                    <div className="profile-row row-2">
                        <div className="profile-card">
                            <h4>Почта для контакта</h4>
                            <FieldInput
                                name="contactEmail"
                                inputIcon={<MailOpen size={20} />}
                                inputPlaceholder="example@mail.ru"
                                inputValue={specialist.contactEmail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="profile-card">
                            <h4>Номер телефона</h4>
                            <FieldInput
                                name="contactPhone"
                                inputIcon={<Phone size={20} />}
                                inputPlaceholder="+7"
                                inputValue={specialist.contactPhone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Row 4: Experience, Satisfaction, Profession */}
                    <div className="profile-row row-3">
                        <div className="profile-card">
                            <h4>Опыт работы</h4>
                            <select 
                                name="experience"
                                onChange={handleChange}
                                value={specialist.experience || ""}
                            >
                                <option value="">Выберите...</option>
                                {jobExpirienceOptions?.map(exp => (
                                    <option key={exp.value} value={exp.value}>
                                        {exp.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="profile-card">
                            <h4>Насколько вы довольны работой</h4>
                            <select 
                                name="jobSatisfaction"
                                value={specialist.jobSatisfaction || ""}
                                onChange={handleChange}
                            >
                                <option value="">Выберите...</option>
                                {jobSatisfactionOptions?.map(s => (
                                    <option key={s.label} value={s.label}>
                                        {s.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="profile-card">
                            <h4>Ваша профессия</h4>
                            <select 
                                name="profession"
                                value={specialist.profession || ""}
                                onChange={handleChange}
                            >
                                <option value="">Ваша профессия</option>
                                {professions?.map(p => (
                                    <option key={p.value} value={p.value}>
                                        {p.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 5: Actions */}
                    <div className="profile-card">
                        <div className="flex flex-col gap-4">
                            <Button 
                                label={isSaving ? "Сохраняем…" : "Сохранить"}
                                icon={<CheckCheck />} 
                                onClick={updateData} 
                                disabled={isSaving}
                                className="w-full flex justify-center"
                            />
                        </div>
                        
                    </div>
                    <PasswordReset />
                </div>
            </div>
        </div>
        <Toaster />
    </>
)
}
