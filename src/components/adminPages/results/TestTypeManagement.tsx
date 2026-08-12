import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useAuth } from "../../../contexts/AuthContext"
import api from "../../../services/api/api"

interface TestTypeStatus {
    id: number
    name: string
    active: boolean
}

export const TestTypeManagement = () => {
    const { getToken } = useAuth()
    const [psychTypes, setPsychTypes] = useState<TestTypeStatus[]>([])
    const [vrTypes, setVrTypes] = useState<TestTypeStatus[]>([])

    const load = async () => {
        const headers = {Authorization: getToken()}
        try {
            const [psych, vr] = await Promise.all([
                api.get<TestTypeStatus[]>('/api/psych-tests/types', {headers}),
                api.get<TestTypeStatus[]>('/api/vr-tests/types', {headers})
            ])
            setPsychTypes(psych.data)
            setVrTypes(vr.data)
        } catch (error) {
            console.error(error)
            toast.error('Не удалось загрузить статусы тестов')
        }
    }
    useEffect(() => { load() }, [])

    const toggle = async (kind: 'psych-tests' | 'vr-tests', item: TestTypeStatus) => {
        try {
            await api.patch(`/api/${kind}/types/${item.id}/active?active=${!item.active}`, undefined, {
                headers: {Authorization: getToken()}
            })
            await load()
        } catch (error) {
            console.error(error)
            toast.error('Не удалось изменить статус теста')
        }
    }

    const section = (title: string, kind: 'psych-tests' | 'vr-tests', items: TestTypeStatus[]) => <section className="profile-card">
        <h3>{title}</h3>
        {items.map(item => <div className="info-row" key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => toggle(kind, item)}>{item.active ? 'Деактивировать' : 'Активировать'}</button>
        </div>)}
    </section>

    return <div className="admin-list-wrapper scroll-y" style={{padding: 20}}>
        <h2>Активность тестов</h2>
        {section('Психодиагностические тесты', 'psych-tests', psychTypes)}
        {section('VR-тесты', 'vr-tests', vrTypes)}
        <Toaster />
    </div>
}
