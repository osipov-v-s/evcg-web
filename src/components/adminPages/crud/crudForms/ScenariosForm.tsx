import { ApiTemplate } from "../ApiTemplate"

export const ScenariosForm = () => {
    return (<>
        <ApiTemplate
            getApiUrl="/api/simulations/scenarios"
            apiParams={["name"]}
            name="Сценарии симуляций"/>
    </>)
}
