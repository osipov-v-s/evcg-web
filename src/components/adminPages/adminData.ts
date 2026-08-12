import { ArrowLeft, CloudDownload, Download, UsersRound, Database, Coffee, School } from "lucide-react"

export interface AdminMenuItemProps {
    id: string
    label?: string
    icon: React.ElementType
    path: string
    group?: string
}

export const adminButtons: AdminMenuItemProps[] = [
    {
        id: "back",
        label: "На главную",
        icon: ArrowLeft,
        path: "/",
        group: "Назад",
    },
    {
        id: "companies",
        label: "Места работы",
        icon: Coffee,
        path: "/admin/companies",
        group: "Организации"
    },
    {
        id: "schools",
        label: "Школы и кураторы",
        icon: School,
        path: "/admin/schools",
        group: "Образование"
    },
    {
        id: "pupils-list",
        label: "Список",
        icon: UsersRound,
        path: "/admin/pupils",
        group: "Ученики",
    },
    {
        id: "specialists-list",
        label: "Список",
        icon: UsersRound,
        path: "/admin/specialists",
        group: "Специалисты",
    },
    {
        id: "simulations",
        label: "Симуляции",
        icon: CloudDownload,
        path: "/admin/simulations",
        group: "API",
    },
    {   id: "results",
        label: "Выгрузить",
        icon: Download,
        path: "/admin/results",
        group: "Результаты"
    },
    {
        id: "test-types",
        label: "Активность тестов",
        icon: Database,
        path: "/admin/test-types",
        group: "Тесты"
    },
    {
        id: "forms",
        label: "Формы",
        icon: Database,
        path: "/admin/forms",
        group: "Формы"
    }
]
