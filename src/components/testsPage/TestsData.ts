import React from "react"
import {
    Palette,
    UsersRound,
    Settings,
    BriefcaseBusiness,
    Brain,
    Compass,
    Map,
    Target,
    Anchor,
    Glasses
} from "lucide-react"

export interface TestItem {
    id: string
    author?: string
    label: string
    time: number
    questionscount: number
    icon: React.ElementType
    path?: string
    pathResults?: string
    isAvailable?: boolean
    isVr?: boolean
}

export const testsList: TestItem[] = [
    // Профориентационные тесты
    {
        id: "test-temperament",
        author: "Ганс Юрген Айзенк",
        label: "Темперамент",
        time: 10,
        questionscount: 57,
        icon: Palette,
        path: "/tests/temperament/intro",
        pathResults: "/tests/temperament/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-group-roles",
        author: "Реймонд Мередит Белбин",
        label: "Групповые роли",
        time: 10,
        questionscount: 7,
        icon: UsersRound,
        path: "/tests/group-roles/intro",
        pathResults: "/tests/group-roles/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-engineering-thinking",
        author: "Джордж Кеттнер Беннет",
        label: "Инженерное мышление",
        time: 25,
        questionscount: 70,
        icon: Settings,
        path: "/tests/engineering-thinking/intro",
        pathResults: "/tests/engineering-thinking/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-professional-orientation-klimov",
        author: "Евгений Александрович Климов",
        label: "Профориентация",
        time: 20,
        questionscount: 20,
        icon: BriefcaseBusiness,
        path: "/tests/professional-orientation-klimov/intro",
        pathResults: "/tests/professional-orientation-klimov/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-intellectual-potential",
        author: "Диагностический центр",
        label: "Интеллектуальный потенциал",
        time: 12,
        questionscount: 29,
        icon: Brain,
        path: "/tests/iq-potential/intro",
        pathResults: "/tests/iq-potential/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-professional-orientation-holland",
        author: "Джон Льюис Холланд",
        label: "Тип личности",
        time: 15,
        questionscount: 42,
        icon: Compass,
        path: "/tests/prof-holland/intro",
        pathResults: "/tests/prof-holland/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-professional-orientation-glomshtok",
        author: "Александр Ефимович Голомшток",
        label: "Карта интересов",
        time: 15,
        questionscount: 50,
        icon: Map,
        path: "/tests/interests-map/intro",
        pathResults: "/tests/interests-map/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-professional-orientation-yovayshi",
        author: "Леонардас Адамович Йовайша",
        label: "Профессиональные предпочтения",
        time: 15,
        questionscount: 24,
        icon: Target,
        path: "/tests/professional-preferences/intro",
        pathResults: "/tests/professional-preferences/results",
        isAvailable: true,
        isVr: false
    },
    {
        id: "test-professional-orientation-sheyn",
        author: "Эдгар Генри Шейн",
        label: "Якоря карьеры",
        time: 5,
        questionscount: 41,
        icon: Anchor,
        path: "/tests/career-anchors/intro",
        pathResults: "/tests/career-anchors/results",
        isAvailable: true,
        isVr: false
    },



    // VR Тесты
    {
        id: "vr-mine-foreman",
        label: "VR Горный мастер",
        time: 3,
        questionscount: 6,
        icon: Glasses,
        path: "/tests/vr-mine-foreman/intro",
        pathResults: "/tests/vr-mine-foreman/results",
        isAvailable: true,
        isVr: true
    },
    {
        id: "vr-mining-process-engineer",
        label: "VR Горный инженер-технолог",
        time: 3,
        questionscount: 6,
        icon: Glasses,
        path: "/tests/vr-mining-process-engineer/intro",
        pathResults: "/tests/vr-mining-process-engineer/results",
        isAvailable: true,
        isVr: true
    },
    {
        id: "vr-drilling-and-blasting-specialist",
        label: "VR Специалист буровзрывных работ",
        time: 3,
        questionscount: 6,
        icon: Glasses,
        path: "/tests/vr-drilling-and-blasting-specialist/intro",
        pathResults: "/tests/vr-drilling-and-blasting-specialist/results",
        isAvailable: true,
        isVr: true
    },
    {
        id: "vr-mine-rescuer",
        label: "VR Горноспасатель",
        time: 3,
        questionscount: 6,
        icon: Glasses,
        path: "/tests/vr-mine-rescuer/intro",
        pathResults: "/tests/vr-mine-rescuer/results",
        isAvailable: true,
        isVr: true
    },
    {
        id: "vr-haul-truck-driver",
        label: "VR Водитель карьерного самосвала",
        time: 3,
        questionscount: 6,
        icon: Glasses,
        path: "/tests/vr-haul-truck-driver/intro",
        pathResults: "/tests/vr-haul-truck-driver/results",
        isAvailable: true,
        isVr: true
    }
]