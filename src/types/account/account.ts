import { TestResultResponse } from "../testTypes"

export interface AccountRequest {
    email: string
    password: string
}
export interface AccountForm {
    email: string
    password: string
    repeatPassword: string
}
export interface AccountsTests {
    accountId: number,
    email: string,
    fullName: string,
    name: string,
    surname: string,
    patronymic: string,
    school?: string,
    classNumber?: number,
    classLabel?: string,
    gender?: string,
    birthday?: string,
    profession?: string,
    company?: string,
    roles: string[],
    psychTests: TestResultResponse[]
}
