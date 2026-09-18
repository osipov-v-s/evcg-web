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
    id?: number
    pupilId: number
    predictionType: string
    createdAt: string
    percentage: number
    recommendation: string
    aizenNorm: number
    belbinNorm: number
    bennetNorm: number
    finalScore: number
    utility: number
    profession: string
    recommendationComplex: string
}
export interface PredictionResult {
    name: string
    distance: number
    cluster: number
}
