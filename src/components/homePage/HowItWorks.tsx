import { Award, FileCheck, Share2, UserRound } from "lucide-react"

export const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <div className="container">
                <header>
                    <strong>Маршрут</strong>
                    <h1>Как это работает?</h1>
                    <span>Всего несколько простых шагов - и вы получите персональные рекомендации</span>
                </header>

                <div className="how-it-works-grid">
                    <div className="how-it-works-item">
                        <span>01</span>
                        <div className="how-it-works-icon">
                            <UserRound />
                        </div>
                        <div className="how-it-works-content">
                            <h1>Заполните профиль</h1>
                            <span>Заполните профиль и пройдите тесты</span>
                        </div>
                    </div>

                    <div className="how-it-works-item">
                        <span>02</span>
                        <div className="how-it-works-icon">
                            <FileCheck />
                        </div>
                        <div className="how-it-works-content">
                            <h1>Пройдите диагностику</h1>
                            <span>Система соберет информацию о способностях, интересах и результатах заданий</span>
                        </div>
                    </div>

                    <div className="how-it-works-item">
                        <span>03</span>
                        <div className="how-it-works-icon">
                            <Share2 />
                        </div>
                        <div className="how-it-works-content">
                            <h1>Система расчитает результат</h1>
                            <span>Математическая модель сравнит ваши показатели с профилями специалистов</span>
                        </div>
                    </div>

                    <div className="how-it-works-item">
                        <span>04</span>
                        <div className="how-it-works-icon">
                            <Award />
                        </div>
                        <div className="how-it-works-content">
                            <h1>Получите список подходящих профессий</h1>
                            <span>Вы увидите, какие профессии подходят вам больше всего</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}