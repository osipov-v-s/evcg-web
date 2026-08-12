import { AccountsTests } from "../../types/account/account"
import { Curator, CuratorCreateRequest, CuratorUpdateRequest, School } from "../../types/education/education"
import api from "./api"

export const educationApi = {
    getSchools: async (token: string): Promise<School[]> => {
        const response = await api.get('/api/schools', {headers: {Authorization: token}})
        return response.data
    },
    createSchool: async (token: string, school: School): Promise<School> => {
        const response = await api.post('/api/schools', school, {headers: {Authorization: token}})
        return response.data
    },
    updateSchool: async (token: string, schoolId: number, school: School): Promise<School> => {
        const response = await api.put(`/api/schools/${schoolId}`, school, {headers: {Authorization: token}})
        return response.data
    },
    createCurator: async (token: string, schoolId: number, curator: CuratorCreateRequest): Promise<Curator> => {
        const response = await api.post(`/api/schools/${schoolId}/curators`, curator, {
            headers: {Authorization: token}
        })
        return response.data
    },
    getCuratorProfile: async (token: string): Promise<Curator> => {
        const response = await api.get('/api/curators/me', {headers: {Authorization: token}})
        return response.data
    },
    getSchoolCurators: async (token: string, schoolId: number): Promise<Curator[]> => {
        const response = await api.get(`/api/schools/${schoolId}/curators`, {headers: {Authorization: token}})
        return response.data
    },
    updateCurator: async (token: string, curatorId: number, curator: CuratorUpdateRequest): Promise<Curator> => {
        const response = await api.put(`/api/curators/${curatorId}`, curator, {headers: {Authorization: token}})
        return response.data
    },
    resetPupilPassword: async (token: string, pupilId: number): Promise<void> => {
        await api.patch(`/api/curators/pupils/${pupilId}/reset-password`, undefined, {
            headers: {Authorization: token}
        })
    },
    getCuratorPupilResults: async (
        token: string,
        startDate: string,
        endDate: string
    ): Promise<AccountsTests[]> => {
        const response = await api.get('/api/curators/pupil-results', {
            params: {startDate, endDate},
            headers: {Authorization: token}
        })
        return response.data
    }
}
