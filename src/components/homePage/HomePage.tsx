import "./css/homePageStyles.css"
import "./css/heroSection.css"
import "./css/howItsWorkingSection.css"
import "./css/professionsSection.css"
import "./css/footerInfoSection.css"

import { FC } from "react"
import { HomeHero } from "./HomeHero"
import { HomeHowItsWorking } from "./HomeHowItsWorking"
import { HomeProfessions } from "./HomeProfessions"
import { HomeFooterInfo } from "./HomeFooterInfo"

const SECTIONS = [
    HomeHero,
    HomeHowItsWorking,
    HomeProfessions,
    HomeFooterInfo,
]

export const HomePage: FC = ({ }) => {
    return (
        <div className="home-wrapper">
            <div className="home-grid">
                {SECTIONS.map((Component) => (
                    <Component key={Component.name} />
                ))}
            </div>
        </div>
    )
}
