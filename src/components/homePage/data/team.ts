export interface TeamMember {
    name: string
    role: string
    initials: string
}

export const team: TeamMember[] = [
    { name: "В.С. Осипов", role: "Руководитель проекта", initials: "ВО" },
    { name: "А.А. Ступина", role: "Научный руководитель", initials: "АС" },
    { name: "И.С. Замулин", role: "Инженер-математик", initials: "ИЗ" },
    { name: "О.В. Бобылева", role: "Инженер-математик", initials: "ОБ" },
    { name: "А.В. Печенкина", role: "Инженер-исследователь", initials: "АП" },
    { name: "П.Д. Большаков", role: "Инженер-программист", initials: "ПБ" },
    { name: "Т.А. Ершов", role: "Инженер-программист", initials: "ТЕ" },
    { name: "Е.М. Кузьмин", role: "Соисполнитель", initials: "ЕК" },
]
