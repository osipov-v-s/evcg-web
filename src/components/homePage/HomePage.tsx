import { Banner } from "./Banner"
import "./css/homePageStyles.css"
import "./css/banner.css"
import "./css/achivements.css"
import "./css/diagnostics.css"

import React, { FC, useRef } from "react"
import { Achivements } from "./Achivements"
import { Diagnostics } from "./Diagnostics"

export const HomePage: FC = ({ }) => {
    const AnimatedSection: FC<{ id?: string, className?: string, children: React.ReactNode }> = ({ id, className = "", children }) => {
        return (
            <section id={id} className={`section ${className}`}>
                {children}
            </section>
        )
    }

    return (
        <main>
            <Banner />
            <Achivements />
            <Diagnostics />
        </main>
    )
}
