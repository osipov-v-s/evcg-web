import "./css/homePageStyles.css"
import "./css/heroSection.css"
import "./css/achievementsSection.css"
import "./css/diagnosticsSection.css"
import "./css/howItsWorkingSection.css"
import "./css/professionsSection.css"
import "./css/organizationsSection.css"
import "./css/teamSection.css"
import "./css/scienceSection.css"
import "./css/footerInfoSection.css"

import { HomeHero } from "./HomeHero"
import { HomeAchievements } from "./HomeAchievements"
import { HomeDiagnostics } from "./HomeDiagnostics"
import { HomeHowItsWorking } from "./HomeHowItsWorking"
import { HomeProfessions } from "./HomeProfessions"
import { HomeOrganizations } from "./HomeOrganizations"
import { HomeTeam } from "./HomeTeam"
import { HomeScience } from "./HomeScience"
import { HomeFoundation } from "./HomeFoundation"
import { HomeFinalCta } from "./HomeFinalCta"
import { HomeFooterInfo } from "./HomeFooterInfo"

export const HomePage = () => (
    <div className="home-wrapper">
        <main className="home-page-content">
            <HomeHero />
            <HomeAchievements />
            <HomeDiagnostics />
            <HomeHowItsWorking />
            <HomeProfessions />
            <HomeOrganizations />
            <HomeTeam />
            <HomeScience />
            <HomeFoundation />
            <HomeFinalCta />
            <HomeFooterInfo />
        </main>
    </div>
)
