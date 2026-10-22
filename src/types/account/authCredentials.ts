export type AuthMode = "email" | "login"

export interface AuthCredentials {
    email?: string
    login?: string
    password: string
}

export const toAccountPayload = (credentials: AuthCredentials): { email: string; password: string } => ({
    email: credentials.email ?? credentials.login ?? "",
    password: credentials.password,
})