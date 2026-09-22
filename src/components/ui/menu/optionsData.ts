import { Home, FileCheck, Book, UserRound, ShieldUser, DoorOpen, Brain, Glasses, School } from "lucide-react"
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
    // пункты меню доступные всем
    {
        id: "home",
        label: "Домой",
        icon: Home,
        path: "/",
        order: 1,
    },
    {
        id: "tests",
        label: "Тесты",
        icon: FileCheck,
        path: "/tests",
        order: 2,
        allowedRoles: CAREER_TEST_ROLES
    },
    {
        id: "grades",
        label: "Учеба",
        icon: Book,
        path: "/my-grades",
        order: 4,
        allowedRoles: [ROLES.PUPIL],
    },
    {
        id: "predictions",
        label: "Подбор профессии",
        icon: Brain,
        path: "/predictions",
        order: 5,
        allowedRoles: [ROLES.PUPIL]
    },
    {
        id: "test-results",
        label: "Результаты тестов",
        icon: FileCheck,
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
        icon: ShieldUser,
        path: "/admin",
        order: 7,
        className: "spec",
        allowedRoles: [ROLES.ADMIN],
    },
    {
        id: "curator-panel",
        label: "Моя школа",
        icon: School,
        path: "/curator",
        order: 7,
        allowedRoles: [ROLES.CURATOR]
    }
]

export const logoutButton: MenuItemProps = {
    id: "logout",
    label: "Выход",
    icon: DoorOpen,
    path: "/login",
    order: 99,
    isLogout: true,
}
