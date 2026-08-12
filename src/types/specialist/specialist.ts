import { AccountRequest } from "../account/account"

export interface Specialist {
    id?: number,
    email: string,
    name: string
    surname: string
    patronymic: string
    contactEmail: string
    contactPhone: string
    experience: string
    jobSatisfaction: string
    profession: string
    gender: string
    companyId?: number
    companyName?: string
}
export interface SpecialistRegisterRequest {
    specialist: Specialist
    account: AccountRequest
}
export interface SpecialistsPage {
    content: Specialist[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
}
export interface SpecialistsFilter {
    name?: string
    profession?: string
    company?: string
}
export interface profession {
    id: number
    name: string
}
export const SpecialistKeys = ["email", "password", "name", "surname", "patronymic", "contactEmail", "contactPhone", 
    "experience", "jobSatisfaction", "profession", "gender"]
