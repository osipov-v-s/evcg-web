export interface InterestsMapDirection {
    directionId: number
    directionName: string
}

export const interestsMapDirections: InterestsMapDirection[] = [
    { directionId: 1, directionName: "new_materials_nanotech" },
    { directionId: 2, directionName: "biotech" },
    { directionId: 3, directionName: "medicine" },
    { directionId: 4, directionName: "agriculture" },
    { directionId: 5, directionName: "light_industry" },
    { directionId: 6, directionName: "energy_generation_storage" },
    { directionId: 7, directionName: "energy_networks_management" },
    { directionId: 8, directionName: "metallurgy" },
    { directionId: 9, directionName: "mining_mineral_processing" },
    { directionId: 10, directionName: "construction" },
    { directionId: 11, directionName: "robotics_machine_engineering" },
    { directionId: 12, directionName: "space" },
    { directionId: 13, directionName: "ground_transport" },
    { directionId: 14, directionName: "aviation" },
    { directionId: 15, directionName: "water_transport" },
    { directionId: 16, directionName: "it_sector" },
    { directionId: 17, directionName: "finance_sector" },
    { directionId: 18, directionName: "military_specialties" },
    { directionId: 19, directionName: "safety_security" },
    { directionId: 20, directionName: "culture_art" },
    { directionId: 21, directionName: "media_entertainment" },
    { directionId: 22, directionName: "children_products_services" },
    { directionId: 23, directionName: "education" },
    { directionId: 24, directionName: "tourism_hospitality" },
    { directionId: 25, directionName: "social_sphere" }
]

export const directionsTranslate: Record<string, string> = {
    "new_materials_nanotech": "Новые материалы и нанотехнологии",
    "biotech": "Биотехнологии",
    "medicine": "Медицина",
    "agriculture": "Сельское хозяйство",
    "light_industry": "Лёгкая промышленность",
    "energy_generation_storage": "Энергогенерация и накопление энергии",
    "energy_networks_management": "Энергосети и управление",
    "metallurgy": "Металлургия",
    "mining_mineral_processing": "Добыча и переработка полезных ископаемых",
    "construction": "Строительство",
    "robotics_machine_engineering": "Робототехника и машиностроение",
    "space": "Космос",
    "ground_transport": "Наземный транспорт",
    "aviation": "Авиация",
    "water_transport": "Водный транспорт",
    "it_sector": "ИТ-сектор",
    "finance_sector": "Финансовый сектор",
    "military_specialties": "Военные специальности",
    "safety_security": "Безопасность",
    "culture_art": "Культура и искусство",
    "media_entertainment": "Медиа и развлечения",
    "children_products_services": "Индустрия детских товаров и сервисов",
    "education": "Образование",
    "tourism_hospitality": "Туризм и гостеприимство",
    "social_sphere": "Социальная сфера"
}