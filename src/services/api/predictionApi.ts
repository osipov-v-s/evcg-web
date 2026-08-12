import { Prediction } from "../../types/prediction/prediction"
import api from "./api"

export const predictionAPI = {
    getLatestPrediction: async (token: string): Promise<Prediction> => {
        const response = await api.get<Prediction>("/api/predictions/latest", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    predict: async (token: string): Promise<Prediction> => {
        const response = await api.post<Prediction>("/api/predictions/predict", null, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    }

}
