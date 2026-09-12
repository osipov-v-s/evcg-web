export interface Prediction {
    id?: number;
    pupilId: number;
    cluster: number;
    predictedProfession: string;
    nearestSpecialistId: number;
    distance: number;
    confidenceCategory: string;
    createdAt: string;
}
export interface MathPrediction {
    
}
export interface PredictionResult {
    name: string
    distance: number
    cluster: number
}
