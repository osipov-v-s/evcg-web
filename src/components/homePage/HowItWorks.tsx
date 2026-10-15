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
                        <div className="how-it-works-content">
                            <h2 className="how-it-works-title">
                                <UserRound />
                                Заполните профиль
                            </h2>

                            <p className="how-it-works-description">
                                Заполните профиль и пройдите тесты
                            </p>

                            <span className="how-it-works-order">
                                01
                            </span>
                        </div>
                    </div>

                    <div className="how-it-works-item">
                        <div className="how-it-works-content">
                            <h2 className="how-it-works-title">
                                <FileCheck />
                                Пройдите диагностику
                            </h2>

                            <p className="how-it-works-description">
                                Система соберет информацию о способностях, интересах и результатах заданий
                            </p>

                            <span className="how-it-works-order">
                                02
                            </span>
                        </div>
                    </div>

                    <div className="how-it-works-item">
                        <div className="how-it-works-content">
                            <h2 className="how-it-works-title">
                                <Share2 />
                                Система расчитает результат
                            </h2>

                            <p className="how-it-works-description">
                                Математическая модель сравнит ваши показатели с профилями специалистов
                            </p>

                            <span className="how-it-works-order">
                                03
                            </span>
                        </div>
                    </div>

                    <div className="how-it-works-item">
                        <div className="how-it-works-content">
                            <h2 className="how-it-works-title">
                                <Award />
                                Получите список подходящих профессий
                            </h2>
                            
                            <p className="how-it-works-description">
                                Вы увидите, какие профессии подходят вам больше всего
                            </p>

                            <span className="how-it-works-order">
                                04
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}