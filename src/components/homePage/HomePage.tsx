import "./css/homePageStyles.css"
import "./css/banner.css"
import "./css/achivements.css"
import "./css/diagnostics.css"
import "./css/howItWorks.css"
import "./css/professions.css"
import "./css/practice.css"
import "./css/crew.css"
import "./css/scienceBase.css"
import "./css/footer.css"

import { FC } from "react"

import { Banner } from "./Banner"
import { Achivements } from "./Achivements"
import { Diagnostics } from "./Diagnostics"
import { HowItWorks } from "./HowItWorks"
import { Professions } from "./Professions"
import { Practice } from "./Practice"
import { Crew } from "./Crew"
import { ScienceBase } from "./ScienceBase"
import { Footer } from "./Footer"

export const HomePage: FC = ({ }) => {
    return (
        <main>
            <Banner />
            <Achivements />
            <Diagnostics />
            <HowItWorks />
            <Professions />
            <Practice />
            <Crew />
            <ScienceBase />
            <Footer />
        </main>
    )
}
