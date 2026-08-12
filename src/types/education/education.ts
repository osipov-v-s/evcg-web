import { AccountRequest } from "../account/account"

export interface School {
    id?: number
    name: string
    address?: string
    email?: string
    phone?: string
}

export interface CuratorCreateRequest {
    account: AccountRequest
    name: string
    surname: string
    patronymic?: string
    schoolId?: number
}

export interface CuratorUpdateRequest {
    email: string
    name: string
    surname: string
    patronymic?: string
    schoolId: number
}

export interface Curator {
    id: number
    accountId: number
    email: string
    name: string
    surname: string
    patronymic?: string
    school: School
}
