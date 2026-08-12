export interface Role {
    name: string
}
export const ROLES = {
    PUPIL: "PUPIL",
    ADMIN: "ADMIN",
    SPECIALIST: "SPECIALIST",
    CURATOR: "CURATOR"
}
export const getRoleDisplayName = (role: string): string => {
    const map: Record<string, string> = {
        'SPECIALIST': 'Специалист',
        'PUPIL': 'Школьник',
        'CURATOR': 'Куратор',
        'ADMIN': 'Администратор'
    }
    return map[role] || role
}
export const getPrimaryRole = (roles: string[]): string => {
    if (!roles || roles.length === 0) return 'PUPIL'
    if (roles.includes('ADMIN')) return 'ADMIN'
    if (roles.includes('CURATOR')) return 'CURATOR'
    if (roles.includes('PUPIL')) return 'PUPIL'
    return 'SPECIALIST'
}
