import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

export const HomeFoundation = () => (
    <section className="home-section home-foundation-section" aria-labelledby="foundation-title">
        <div className="home-section-inner">
            <a className="home-foundation-card" href="https://fasie.ru/" target="_blank" rel="noreferrer">
                <span className="home-foundation-line" aria-hidden="true" />
                <div>
                    <span className="home-section-kicker">Поддержка проекта</span>
                    <h2 id="foundation-title">Проект реализуется при поддержке Фонда содействия инновациям</h2>
                    <p>Открыть официальный сайт фонда</p>
                </div>
                <img src={bannerLogoFasie} alt="Фонд содействия инновациям" />
            </a>
        </div>
    </section>
)
