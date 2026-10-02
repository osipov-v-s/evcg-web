import { Home, GraduationCap, FileCheckIcon, Share2, Award, UserRound, ShieldCheck, School, DoorOpen } from "lucide-react"
import { ROLES } from "../../../types/account/role"
import { CAREER_TEST_ROLES, PROFILE_ROLES } from "../../../routing/roleAccess"

export interface MenuItemProps {
    id: string
    label?: string
    icon: React.ElementType
    path: string
    order?: number
    className?: string
    allowedRoles?: string[]
    isLogout?: boolean
}

export const menuButtons: MenuItemProps[] = [
    {
        id: "home",
        label: "Домой",
        icon: Home,
        path: "/",
        order: 1,
    },
    {
        id: "grades",
        label: "Учеба",
        icon: GraduationCap,
        path: "/my-grades",
        order: 2,
        allowedRoles: [ROLES.PUPIL],
    },
    {
        id: "tests",
        label: "Тесты",
        icon: FileCheckIcon,
        className: "test",
        path: "/tests",
        order: 3,
        allowedRoles: CAREER_TEST_ROLES
    },
    {
        id: "predictions",
        label: "Подбор профессии",
        icon: Share2,
        className: "predictions",
        path: "/predictions",
        order: 4,
        allowedRoles: [ROLES.PUPIL]
    },
    {
        id: "test-results",
        label: "Результаты",
        icon: Award,
        path: "/my-results",
        order: 5,
        allowedRoles: CAREER_TEST_ROLES
    },
    {
        id: "profile",
        label: "Профиль",
        icon: UserRound,
        path: "/profile",
        order: 6,
        allowedRoles: PROFILE_ROLES
    },

    {
        id: "admin-panel",
        label: "Адм",
        icon: ShieldCheck,
        className: "admin",
        path: "/admin",
        order: 7,
        allowedRoles: [ROLES.ADMIN],
    },
    {
        id: "curator-panel",
        label: "Моя школа",
        icon: School,
        path: "/curator",
        order: 8,
        allowedRoles: [ROLES.CURATOR]
    }
]

export const logoutButton: MenuItemProps = {
    id: "logout",
    label: "Выход",
    icon: DoorOpen,
    className: "logout",
    path: "/login",
    order: 99,
    isLogout: true,
}
