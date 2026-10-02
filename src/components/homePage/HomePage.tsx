import { Banner } from "./Banner"
import "./css/homePageStyles.css"

import { FC } from "react"

export const HomePage: FC = ({ }) => {
    return (
        <div className="home-wrapper">
            <Banner />
        </div>
    )
}
