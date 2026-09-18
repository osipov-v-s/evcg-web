import { MathPrediction, Prediction } from "../../types/prediction/prediction"
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
    },
    getLatestMathPrediction: async(token: string): Promise<MathPrediction[]> => {
        const response = await api.get<MathPrediction[]>("/api/predictions/math/latest", {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    },
    mathPredict: async (token: string):Promise<MathPrediction[]> => {
        const response = await api.post("/api/predictions/math", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }

}
