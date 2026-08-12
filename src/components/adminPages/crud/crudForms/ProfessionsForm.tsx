import { ApiTemplate } from "../ApiTemplate"

export const ProfessionsForm = () => {
    return (
        <>
            <ApiTemplate  
                postApiUrl="/api/specialists/professions"
                getApiUrl="/api/specialists/professions"
                deleteApiUrl="/api/specialists/professions"
                apiParams={["name"]}
                name="Профессии"
            />
        </>
    )
}
