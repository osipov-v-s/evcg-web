export interface CareerAnchorOrientation {
    orientationId: number
    orientationName: string
}

export const careerAnchorsOrientations: CareerAnchorOrientation[] = [
    { orientationId: 1, orientationName: "professional_competence" },
    { orientationId: 2, orientationName: "management" },
    { orientationId: 3, orientationName: "autonomy" },
    { orientationId: 4, orientationName: "operational_stability" },
    { orientationId: 5, orientationName: "residence_stability" },
    { orientationId: 6, orientationName: "service" },
    { orientationId: 7, orientationName: "challenge" },
    { orientationId: 8, orientationName: "integration_of_lifestyles" },
    { orientationId: 9, orientationName: "enterprise" },
]

export const orientationsTranslate: Record<string, string> = {
    "professional_competence": "Профессиональная компетентность",
    "management": "Менеджмент",
    "autonomy": "Автономия (независимость)",
    "operational_stability": "Стабильность работы",
    "residence_stability": "Стабильность места жительства",
    "service": "Служение",
    "challenge": "Вызов",
    "integration_of_lifestyles": "Интеграция стилей жизни",
    "enterprise": "Предпринимательство"
}

export const orientationsDescriptions: Record<string, string> = {
    "professional_competence": "Стремление быть мастером своего дела, развивать навыки и применять знания.",
    "management": "Ориентация на управление людьми, интеграцию усилий других и ответственность за результат.",
    "autonomy": "Потребность делать всё по-своему, освобождение от организационных правил и ограничений.",
    "operational_stability": "Поиск стабильности, безопасности и предсказуемости в долгосрочной перспективе на работе.",
    "residence_stability": "Привязанность к определенному географическому месту, нежелание переезжать ради карьеры.",
    "service": "Стремление приносить пользу обществу, помогать людям и делать мир лучше.",
    "challenge": "Потребность решать сложные, почти неразрешимые задачи и соревноваться с сильными противниками.",
    "integration_of_lifestyles": "Стремление сбалансировать личную жизнь, семью и карьеру так, чтобы ничто не страдало.",
    "enterprise": "Желание создавать что-то новое, преодолевать препятствия, готовность к риску ради своего дела."
}