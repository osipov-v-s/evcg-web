import { ComponentType } from "react"

import { TemperamentTest } from "../../components/testsPage/temperament/TemperamentTest"
import { TemperamentResults } from "../../components/testsPage/temperament/TemperamentResults"

import { GroupRolesTest } from "../../components/testsPage/groupRoles/GroupRolesTest"
import { GroupRolesResults } from "../../components/testsPage/groupRoles/GroupRolesResults"

import { EngineeringThinkingTest } from "../../components/testsPage/engineeringThinking/EngineeringThinkingTest"
import { EngineeringThinkingResults } from "../../components/testsPage/engineeringThinking/EngineeringThinkingResults"

import { KlimovTest } from "../../components/testsPage/klimov/KlimovTest"
import { KlimovResults } from "../../components/testsPage/klimov/KlimovResults"

import { IqPotentialTest } from "../../components/testsPage/iqPotential/IqPotentialTest"
import { IqPotentialResults } from "../../components/testsPage/iqPotential/IqPotentialResults"

import { HollandTest } from "../../components/testsPage/holland/HollandTest"
import { HollandResults } from "../../components/testsPage/holland/HollandResults"

import { InterestsMapTest } from "../../components/testsPage/interestsMap/InterestsMapTest"
import { InterestsMapResults } from "../../components/testsPage/interestsMap/InterestsMapResults"

import { ProfessionalPreferencesTest } from "../../components/testsPage/professionalPreferences/ProfessionalPreferencesTest"
import { ProfessionalPreferencesResults } from "../../components/testsPage/professionalPreferences/ProfessionalPreferencesResults"

import { CareerAnchorsTest } from "../../components/testsPage/careerAnchors/CareerAnchorsTest"
import { CareerAnchorsResults } from "../../components/testsPage/careerAnchors/CareerAnchorsResults"


export interface TestConfig {
    id: string
    path: string
    name: string
    testComponent: ComponentType
    resultsComponent: ComponentType
    descriptionPath: string
}

export const TEST_CONFIGS: TestConfig[] = [
    {
        id: "temperament",
        path: "temperament",
        name: "Темперамент",
        testComponent: TemperamentTest,
        resultsComponent: TemperamentResults,
        descriptionPath: "public/temperament/data/description.json"
    },
    {
        id: "group-roles",
        path: "group-roles",
        name: "Групповые роли",
        testComponent: GroupRolesTest,
        resultsComponent: GroupRolesResults,
        descriptionPath: "public/group_roles/data/description.json"
    },
    {
        id: "engineering-thinking",
        path: "engineering-thinking",
        name: "Инженерное мышление",
        testComponent: EngineeringThinkingTest,
        resultsComponent: EngineeringThinkingResults,
        descriptionPath: "public/engineering_thinking/data/description.json"
    },
    {
        id: "professional-orientation-klimov",
        path: "professional-orientation-klimov",
        name: "Профориентация Климова",
        testComponent: KlimovTest,
        resultsComponent: KlimovResults,
        descriptionPath: "public/prof_klimov/data/description.json"
    },
    {
        id: "iq-potential",
        path: "iq-potential",
        name: "IQ Потенциал",
        testComponent: IqPotentialTest,
        resultsComponent: IqPotentialResults,
        descriptionPath: "public/iq_potential/data/description.json"
    },
    {
        id: "prof-holland",
        path: "prof-holland",
        name: "Профориентация Холланда",
        testComponent: HollandTest,
        resultsComponent: HollandResults,
        descriptionPath: "public/prof_holland/data/description.json"
    },
    {
        id: "interests-map",
        path: "interests-map",
        name: "Карта интересов",
        testComponent: InterestsMapTest,
        resultsComponent: InterestsMapResults,
        descriptionPath: "public/interests_map/data/description.json"
    },
    {
        id: "professional-preferences",
        path: "professional-preferences",
        name: "Профессиональные предпочтения",
        testComponent: ProfessionalPreferencesTest,
        resultsComponent: ProfessionalPreferencesResults,
        descriptionPath: "public/professional_preferences/data/description.json"
    },
    {
        id: "career-anchors",
        path: "career-anchors",
        name: "Якоря карьеры",
        testComponent: CareerAnchorsTest,
        resultsComponent: CareerAnchorsResults,
        descriptionPath: "public/career_anchors/data/description.json"
    },
]