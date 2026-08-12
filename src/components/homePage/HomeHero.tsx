import { FC } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

export const HomeHero: FC = ({ }) => {
    const {getEmail} = useAuth()
    return (
        <div className="home-grid-item-1-grid">
            <div className="home-block item-1">
                <div className="home-block-header">
                    ПрофиВектор
                </div>

                <div className="home-block-subtitle">
                    Пройдите последовательную диагностику и узнайте, какие профессии горнодобывающей отрасли лучше соответствуют вашим интересам, способностям и учебному профилю.
                </div>

                <Link className="home-primary-action" to={getEmail() ? "/tests" : "/register"}>
                    {getEmail() ? "Продолжить диагностику" : "Начать профориентацию"}
                </Link>

                <a className="partner-badge"
                    href="https://fasie.ru/"
                    target="_blank"
                    rel="noopener noreferrer">

                    <div className="partner-badge-text">
                        Проект реализован при поддержке:
                    </div>

                    <div className="partner-logo-wrapper">
                        <img src={bannerLogoFasie} alt="Логотип Фонда содействия инновациям" />
                    </div>
                </a>
            </div>

            <div className="item-2-grid item-2">
                <div className="home-block stat-item">
                    <div className="home-block-header">
                        5
                    </div>

                    <div className="home-block-text">
                        Профессий в исследовательской модели
                    </div>
                </div>

                <div className="home-block stat-item">
                    <div className="home-block-header">
                        9
                    </div>

                    <div className="home-block-text">
                        Этапов психологической диагностики
                    </div>
                </div>

                <div className="home-block stat-item">
                    <div className="home-block-header">
                        VR
                    </div>


                    <div className="home-block-text">
                        Практические сценарии и поведенческие данные
                    </div>
                </div>
            </div>
        </div>
    )
}
