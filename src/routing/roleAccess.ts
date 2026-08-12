import { ROLES } from "../types/account/role"

export const ADMIN_ROLES = [ROLES.ADMIN]
export const CURATOR_ROLES = [ROLES.CURATOR]
export const CAREER_TEST_ROLES = [ROLES.PUPIL, ROLES.SPECIALIST]
export const PUPIL_ONLY_ROLES = [ROLES.PUPIL]
export const PROFILE_ROLES = [ROLES.PUPIL, ROLES.SPECIALIST, ROLES.CURATOR]

export const roleHasAccess = (role: string, approvedRoles: readonly string[]): boolean =>
    approvedRoles.includes(role)
