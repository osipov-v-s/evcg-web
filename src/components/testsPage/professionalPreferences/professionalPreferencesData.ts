export interface ProfPreferencesInterpretation {
    interpretationId: number
    interpretationName: string
}

export const profPreferencesInterpretations: ProfPreferencesInterpretation[] = [
    { interpretationId: 1, interpretationName: "working_with_people" },
    { interpretationId: 2, interpretationName: "research_work" },
    { interpretationId: 3, interpretationName: "practical_activity" },
    { interpretationId: 4, interpretationName: "aesthetic_activity" },
    { interpretationId: 5, interpretationName: "extreme_activity" },
    { interpretationId: 6, interpretationName: "economic_planning" },
]

export const interpretationsTranslate: Record<string, string> = {
    "working_with_people": "Склонность к работе с людьми",
    "research_work": "Склонность к исследовательской (интеллектуальной) работе",
    "practical_activity": "Склонность к практической деятельности",
    "aesthetic_activity": "Склонность к эстетическим видам деятельности",
    "extreme_activity": "Склонность к экстремальным видам деятельности",
    "economic_planning": "Склонность к планово-экономической деятельности",
}

export const interpretationsDescriptions: Record<string, string> = {
    "working_with_people": "Профессии, связанные с обучением, воспитанием, обслуживанием, консультированием и оказанием помощи людям.",
    "research_work": "Профессии, связанные с научными исследованиями, анализом данных, решением сложных логических задач и открытием новых знаний.",
    "practical_activity": "Профессии, связанные с техникой, производством, конструированием, ручным трудом и работой с материалами.",
    "aesthetic_activity": "Профессии, связанные с творчеством, искусством, дизайном, музыкой, литературой и актерским мастерством.",
    "extreme_activity": "Профессии, связанные с риском, спортом, работой в экстремальных условиях, активными физическими нагрузками и туризмом.",
    "economic_planning": "Профессии, связанные с расчетами, бухгалтерией, документооборотом, экономикой и систематизацией данных.",
}