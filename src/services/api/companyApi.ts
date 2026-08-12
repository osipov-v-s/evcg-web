import { Company } from "../../types/company/Company"
import api from "./api"

export const companyApi = {
    getCompanies: async (token: string): Promise<Company[]> => {
        const response = await api.get("/api/company", {
            headers: {Authorization: token}
        })
        return response.data
    },
    getCompanyBySpecialist: async (token: string): Promise<Company> => {
        const response = await api.get("/api/company/me", {
            headers: {Authorization: token}
        })
        return response.data
    },
    createCompany: async (token: string, company: Company): Promise<Company> => {
        const response = await api.post("/api/company", company, {
            headers: {Authorization: token}
        })
        return response.data
    }
}
