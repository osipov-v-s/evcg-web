export type AchievementIcon = "support" | "science" | "practice" | "diagnostics"

export interface Achievement {
    title: string
    description: string
    icon: AchievementIcon
    link?: string
    linkLabel?: string
}

export const achievements: Achievement[] = [
    {
        title: "Поддержка развития проекта",
        description: "Проект реализуется при поддержке Фонда содействия инновациям.",
        icon: "support",
        link: "https://fasie.ru/",
        linkLabel: "О фонде",
    },
    {
        title: "Научная проработка",
        description: "Методика объединяет данные об интересах, способностях и образовательном профиле пользователя.",
        icon: "science",
    },
    {
        title: "Практическое применение",
        description: "ПрофиВектор используется в профориентационной работе образовательных организаций.",
        icon: "practice",
    },
    {
        title: "Два формата диагностики",
        description: "Базовый онлайн-маршрут дополняется углублённой диагностикой с профессиональными VR-сценариями.",
        icon: "diagnostics",
    },
]
