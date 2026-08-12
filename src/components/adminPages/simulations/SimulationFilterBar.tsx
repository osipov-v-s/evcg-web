import { FormEvent, useEffect, useState } from "react"
import { SimulationRequest } from "../../../types/simulation/simulation"
import { simulationAPI } from "../../../services/api/simulationApi"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { DataFilterBar } from "../../ui/common/DataFilterBar"

interface SimulationFilterBarProps {
    simulationsRequest: SimulationRequest
    onApply: (request: SimulationRequest) => void
}
interface Data { id?: string | number; name: string }

const emptyRequest: SimulationRequest = {}

export const SimulationFilerBar = ({simulationsRequest, onApply}: SimulationFilterBarProps) => {
    const [draft, setDraft] = useState<SimulationRequest>(simulationsRequest)
    const [simulationTypes, setSimulationTypes] = useState<Data[]>([])
    const [professions, setProfessions] = useState<Data[]>([])
    const [scenarios, setScenarios] = useState<Data[]>([])
    const [sources, setSources] = useState<Data[]>([])

    useEffect(() => {
        Promise.all([
            simulationAPI.getSimulationsTypes(),
            specialistsAPI.getProfessions(),
            simulationAPI.getSimulationsScenarios(),
            simulationAPI.getSimulationsDataSource()
        ]).then(([types, professionList, scenarioList, sourceList]) => {
            setSimulationTypes(types)
            setProfessions(professionList)
            setScenarios(scenarioList)
            setSources(sourceList)
        })
    }, [])

    const submit = (event: FormEvent) => {
        event.preventDefault()
        onApply(draft)
    }

    const reset = () => {
        setDraft(emptyRequest)
        onApply(emptyRequest)
    }

    return <form onSubmit={submit}>
        <DataFilterBar onReset={reset}>
            <input type="email" aria-label="Email ученика" placeholder="Email ученика" value={draft.email || ""} onChange={e => setDraft({...draft, email: e.target.value})} />
            <select aria-label="Профессия" value={draft.profession || ""} onChange={e => setDraft({...draft, profession: e.target.value})}><option value="">Все профессии</option>{professions.map(item => <option key={item.id ?? item.name} value={item.name}>{item.name}</option>)}</select>
            <select aria-label="Тип симуляции" value={draft.simulationType || ""} onChange={e => setDraft({...draft, simulationType: e.target.value})}><option value="">Все типы</option>{simulationTypes.map(item => <option key={item.id ?? item.name} value={item.name}>{item.name}</option>)}</select>
            <select aria-label="Сценарий" value={draft.scenario || ""} onChange={e => setDraft({...draft, scenario: e.target.value})}><option value="">Все сценарии</option>{scenarios.map(item => <option key={item.id ?? item.name} value={item.name}>{item.name}</option>)}</select>
            <select aria-label="Источник данных" value={draft.simulationDataSource || ""} onChange={e => setDraft({...draft, simulationDataSource: e.target.value})}><option value="">Все источники</option>{sources.map(item => <option key={item.id ?? item.name} value={item.name}>{item.name}</option>)}</select>
            <input type="datetime-local" aria-label="Начало периода" value={draft.startSimulation || ""} onChange={e => setDraft({...draft, startSimulation: e.target.value})} />
            <input type="datetime-local" aria-label="Конец периода" value={draft.endSimulation || ""} onChange={e => setDraft({...draft, endSimulation: e.target.value})} />
            <button className="primary-action" type="submit">Применить</button>
        </DataFilterBar>
    </form>
}
