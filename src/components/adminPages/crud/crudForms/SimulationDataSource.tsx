import { ApiTemplate } from "../ApiTemplate"

export const SimulationDataSource = () => {

    return (<>
        <ApiTemplate
            getApiUrl="/api/simulations/simulation-data-sources"
            apiParams={["name"]}
            name="Источники данных для симуляций"/>
    </>)
}
