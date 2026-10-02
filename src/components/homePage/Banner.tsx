import { Button } from "../ui/reusable/button"

export const Banner = () => {
    return (
        <section className="banner">
            <div className="banner-bg" />

            <div className="container banner-inner">
                <div className="container banner-content">
                    <h1 className="banner-title">
                        Пойми, какая <br />
                        <span className="banner-title-accent">
                            инженерная профессия
                        </span> <br />
                        тебе подходит
                    </h1>

                    <p className="banner-subtitle">
                        Мы сравниваем ваш профиль с профилями <br /> инженерных профессий и показываем, <br /> какая из них вам ближе
                    </p>

                    <div className="banner-stats">
                        <div className="banner-stat">
                            <strong>Бесплатная базовая диагностика</strong>
                            <span>Узнайте свои сильные стороны</span>
                        </div>

                        <div className="banner-stat">
                            <strong>Углубленная диагностика</strong>
                            <span>Более точный результат с современными технологиями</span>
                        </div>
                    </div>

                    <div className="banner-actions">
                        <Button label="Пройти бесплатно" />
                        <Button label="Углубленная диагностика" />
                    </div>
                </div>

                <div className="banner-tags">
                    <div className="banner-tag">
                        <span>Реальные инженерные профессии</span>
                    </div>

                    <div className="banner-tag">
                        <span>Современные технологии диагностики</span>
                    </div>

                    <div className="banner-tag">
                        <span>Помогаем сделать осознанный выбор</span>
                    </div>

                    <div className="banner-tag">
                        <span>Используется в школах и вузах</span>
                    </div>
                </div>
            </div>
        </section>
    )
}