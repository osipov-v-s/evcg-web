import { ApiTemplate } from "../ApiTemplate"

export const ProfessionSphereForm = () => {
    return (<>
        <>
            <ApiTemplate  
                getApiUrl="/api/specialists/professions-spheres"
                postApiUrl="/api/specialists/professions-spheres"
                deleteApiUrl="/api/specialists/professions-spheres"
                apiParams={["name"]}
                name="Сферы профессий"
            />
        </>
    </>)
}
