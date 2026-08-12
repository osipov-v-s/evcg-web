import api from './api';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilCompletedTests, PupilDTO, PupilFilters, PupilListResponse, PupilResponse } from '../../types/pupil/pupil';
import { Prediction } from '../../types/prediction/prediction';

export const pupilApi = {
  
  getAllPupils: async (
    page: number,
    size: number,
    token: string,
    filters?: PupilFilters,
    signal?: AbortSignal
  ): Promise<PupilListResponse> => {
    const params = new URLSearchParams({page: page.toString(), size: size.toString()})
    if (filters?.school) params.set('school', filters.school)
    if (filters?.email) params.set('email', filters.email)
    if (filters?.name) params.set('name', filters.name)
    if (filters?.classNumber) params.set('classNumber', filters.classNumber.toString())
    if (filters?.gender) params.set('gender', filters.gender)
    const response = await api.get<PupilListResponse>(
      `/api/pupils?${params.toString()}`,
      {signal, headers: {Authorization: token}});
    return response.data;
  },
  updatePupilData: async (pupilDTO: Partial<PupilDTO>, token: string): Promise<PupilDTO> => {
    const res = await api.post("/api/pupils/update-pupil-data", pupilDTO, {
      headers: {Authorization: token}
    })

    return res.data
  },
  getPupilData: async (token: string) => {
    try {
      const response = await api.get<PupilResponse>('api/pupils/pupil-data', {
        headers: {
          Authorization: token
        }
      })
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  },
  getPupilPrediction: async (token: string) => {
    const response = await api.get<Prediction[]>("api/pupils/pupil/predictions", {
      headers: {
        Authorization: token
      }
    })
    return response.data
  },
  getCompletedTests: async (token: string, startDate: string, endDate: string) => {
    const response = await api.get<PupilCompletedTests[]>("/api/pupils/completed-tests", {
      params: {startDate, endDate},
      headers: {Authorization: token}
    })
    return response.data
  }
}
