export const Achivements = () => {
    return (
        <section className="achivements">
            <div className="container">
                <header>
                    <h3>Наши победы</h3>
                    <span>Наш проект получает признание и уже дает реальные результаты</span>
                </header>

                <div className="achivements-grid">
                    <div className="achivement-card">
                        <img></img>
                        <h4 className="achivement-title">Победитель программы <br /> Фонда содействия инновациям</h4>
                        <span className="achivement-subtitle">Получили поддержку для развития проекта</span>
                    </div>

                    <div className="achivement-card">
                        <img></img>
                        <h4 className="achivement-title">Зарегистрированные <br /> разработки</h4>
                        <span className="achivement-subtitle">Программные решения и методики диагностики</span>
                    </div>

                    <div className="achivement-card">
                        <img></img>
                        <h4 className="achivement-title">Научные публикации <br /> и выступления</h4>
                        <span className="achivement-subtitle">Представляем результаты на конференциях</span>
                    </div>

                    <div className="achivement-card">
                        <img></img>
                        <h4 className="achivement-title">Внедрение в <br /> образовательные организации</h4>
                        <span className="achivement-subtitle">Нашу систему используют в школах и учебных центрах</span>
                    </div>
                </div>
            </div>
        </section>
    )
}