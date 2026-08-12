import { useCallback, useEffect, useState } from "react"
import { SimulationsList } from "./SimulationsList"
import { simulationAPI } from "../../../services/api/simulationApi"
import { useAuth } from "../../../contexts/AuthContext"
import { PaginatedSimulationResponse, SimulationRequest, SimulationResponse } from "../../../types/simulation/simulation"
import { SimulationFilerBar } from "./SimulationFilterBar"
import toast, { Toaster } from "react-hot-toast"
import { Pagination } from "../../ui/reusable/Pagination"
import { PageHeader } from "../../ui/common/PageHeader"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { getApiErrorMessage } from "../../../services/api/error"

//TODO добавить фильтрацию, сделать страницы
export const SimulationPage = () => {
    const { getToken } = useAuth()
    const [simulations, setSimulations] = useState<SimulationResponse[]>([])
    const [simulationRequest, setSimulationsRequest] = useState<SimulationRequest>({
        email: undefined,
        startSimulation: undefined,
        endSimulation: undefined,
        profession: undefined,
        simulationType: undefined,
        scenario: undefined,
        simulationDataSource: undefined
    })
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const loadSimulations = useCallback(async (signal: AbortSignal) => {
        try {
            setIsLoading(true)
            const token = getToken()
            //TODO can use metadata from page
            const page = await simulationAPI.getSimulationsPageable(simulationRequest, currentPage, size, token, signal)
            setSimulations(page.content)
            setTotalPages(page.totalPages)
        } catch (err) {
            console.error(err)
            toast.error(getApiErrorMessage(err, "Не удалось загрузить симуляции. Проверьте даты."))
        } finally {
            setIsLoading(false)
        }
    }, [simulationRequest, currentPage, size])
    useEffect(() => {
        //if (!simulationRequest) return
        const controller = new AbortController()
        loadSimulations(controller.signal)
        return () => {
            controller.abort()
        }
    }, [simulationRequest, currentPage, size])

    return (<>
        <div className="simulations-page">

            <PageHeader title="Симуляции и внешние данные" description="Файлы и метаданные, поступившие из VR-приложений и внешних систем." />

            <SimulationFilerBar
                simulationsRequest={simulationRequest}
                onApply={request => { setCurrentPage(0); setSimulationsRequest(request) }} />
            {isLoading && simulations.length === 0
                ? <NoResults variant="loading" message="Загружаем симуляции…" />
                : simulations.length === 0
                    ? <NoResults variant="empty" title="Симуляции не найдены" message="Измените фильтры или период." />
                    : <SimulationsList simulations={simulations} />}


            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={totalPages} />
            <Toaster />
        </div>
    </>)
}
