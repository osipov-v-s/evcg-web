export interface Organization {
    name: string
    description: string
    shortName: string
}

export const organizations: Organization[] = [
    {
        name: "МБОУ «СОШ №33» города Абакана",
        description: "Профориентационная работа со школьниками.",
        shortName: "СОШ №33",
    },
    {
        name: "ЧОУ ДПО «Южно-сибирский учебный центр»",
        description: "Профориентация и профессиональные пробы.",
        shortName: "ЮСУЦ",
    },
]
