export interface InterestsMapDirection {
    directionId: number
    directionName: string
}

export const interestsMapDirections: InterestsMapDirection[] = [
    { directionId: 1, directionName: "newMaterials_nanotech" },
    { directionId: 2, directionName: "biotech" },
    { directionId: 3, directionName: "medicine" },
    { directionId: 4, directionName: "agriculture" },
    { directionId: 5, directionName: "lightIndustry" },
    { directionId: 6, directionName: "energyGeneration_storage" },
    { directionId: 7, directionName: "energyNetworks_management" },
    { directionId: 8, directionName: "metallurgy" },
    { directionId: 9, directionName: "mining_mineralProcessing" },
    { directionId: 10, directionName: "construction" },
    { directionId: 11, directionName: "robotics_machineEngineering" },
    { directionId: 12, directionName: "space" },
    { directionId: 13, directionName: "groundTransport" },
    { directionId: 14, directionName: "aviation" },
    { directionId: 15, directionName: "waterTransport" },
    { directionId: 16, directionName: "itSector" },
    { directionId: 17, directionName: "financeSector" },
    { directionId: 18, directionName: "militarySpecialties" },
    { directionId: 19, directionName: "safety_security" },
    { directionId: 20, directionName: "culture_art" },
    { directionId: 21, directionName: "media_entertainment" },
    { directionId: 22, directionName: "childrenProducts_services" },
    { directionId: 23, directionName: "education" },
    { directionId: 24, directionName: "tourism_hospitality" },
    { directionId: 25, directionName: "socialSphere" }
]

export const directionsTranslate: Record<string, string> = {
    "newMaterials_nanotech": "Новые материалы и нанотехнологии",
    "biotech": "Биотехнологии",
    "medicine": "Медицина",
    "agriculture": "Сельское хозяйство",
    "lightIndustry": "Лёгкая промышленность",
    "energyGeneration_storage": "Энергогенерация и накопление энергии",
    "energyNetworks_management": "Энергосети и управление",
    "metallurgy": "Металлургия",
    "mining_mineralProcessing": "Добыча и переработка полезных ископаемых",
    "construction": "Строительство",
    "robotics_machineEngineering": "Робототехника и машиностроение",
    "space": "Космос",
    "groundTransport": "Наземный транспорт",
    "aviation": "Авиация",
    "waterTransport": "Водный транспорт",
    "itSector": "ИТ-сектор",
    "financeSector": "Финансовый сектор",
    "militarySpecialties": "Военные специальности",
    "safety_security": "Безопасность",
    "culture_art": "Культура и искусство",
    "media_entertainment": "Медиа и развлечения",
    "childrenProducts_services": "Индустрия детских товаров и сервисов",
    "education": "Образование",
    "tourism_hospitality": "Туризм и гостеприимство",
    "socialSphere": "Социальная сфера"
}