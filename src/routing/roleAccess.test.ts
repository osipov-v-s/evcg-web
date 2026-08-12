import { ROLES } from "../types/account/role"
import {
    ADMIN_ROLES,
    CAREER_TEST_ROLES,
    CURATOR_ROLES,
    PROFILE_ROLES,
    PUPIL_ONLY_ROLES,
    roleHasAccess
} from "./roleAccess"

describe("role-based route access", () => {
    it("keeps psychological and VR tests available only to pupils and specialists", () => {
        expect(roleHasAccess(ROLES.PUPIL, CAREER_TEST_ROLES)).toBe(true)
        expect(roleHasAccess(ROLES.SPECIALIST, CAREER_TEST_ROLES)).toBe(true)
        expect(roleHasAccess(ROLES.CURATOR, CAREER_TEST_ROLES)).toBe(false)
        expect(roleHasAccess(ROLES.ADMIN, CAREER_TEST_ROLES)).toBe(false)
    })

    it("isolates role-specific dashboards and pupil-only features", () => {
        expect(roleHasAccess(ROLES.ADMIN, ADMIN_ROLES)).toBe(true)
        expect(roleHasAccess(ROLES.CURATOR, CURATOR_ROLES)).toBe(true)
        expect(roleHasAccess(ROLES.SPECIALIST, PUPIL_ONLY_ROLES)).toBe(false)
        expect(roleHasAccess(ROLES.PUPIL, PUPIL_ONLY_ROLES)).toBe(true)
    })

    it("allows curator profile access without exposing admin access", () => {
        expect(roleHasAccess(ROLES.CURATOR, PROFILE_ROLES)).toBe(true)
        expect(roleHasAccess(ROLES.ADMIN, PROFILE_ROLES)).toBe(false)
    })
})
