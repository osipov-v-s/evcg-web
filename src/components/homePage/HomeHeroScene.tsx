import bannerImage from "../../res/home-imgs/banner-image.webp"
import engineerImage from "../../res/home-imgs/engineer-image.webp"
import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

export const HomeHeroScene = () => (
    <div className="home-hero-scene" role="img" aria-label="Инженерная среда, профиль пользователя и пример расчёта соответствия профессии">
        <img className="home-hero-scene-background" src={bannerImage} alt="" />
        <div className="home-hero-scene-fade" />
        <div className="home-hero-scene-grid" aria-hidden="true" />

        <div className="home-hero-person" data-asset-slot="hero-vr-person.webp">
            <img src={engineerImage} alt="" />
            <span className="home-hero-person-tag">Профиль пользователя</span>
            <span className="home-hero-scan-line" aria-hidden="true" />
        </div>

        <svg className="home-hero-data-route" viewBox="0 0 680 470" aria-hidden="true">
            <path d="M76 126 C 178 76, 238 108, 294 178 S 424 286, 584 218" />
            <path d="M84 344 C 204 382, 260 320, 332 270 S 470 154, 608 112" />
            <circle cx="76" cy="126" r="5" />
            <circle cx="294" cy="178" r="6" />
            <circle cx="332" cy="270" r="6" />
            <circle cx="584" cy="218" r="5" />
            <circle cx="608" cy="112" r="5" />
        </svg>

        <div className="home-hero-signal home-hero-signal--interests"><span>01</span>Интересы<strong>78</strong></div>
        <div className="home-hero-signal home-hero-signal--skills"><span>02</span>Способности<strong>86</strong></div>
        <div className="home-hero-signal home-hero-signal--profile"><span>03</span>Профиль<strong>собран</strong></div>

        <div className="home-hero-match">
            <span className="home-hero-match-label">Степень соответствия</span>
            <div><strong>84</strong><sup>%</sup></div>
            <p>Горный инженер-технолог</p>
            <span className="home-hero-match-scale"><i /></span>
            <small>Пример результата</small>
        </div>

        <div className="home-hero-scene-caption">Данные → математический расчёт → профессия</div>

        <div className="home-hero-fasie">
            <span>Проект создан при поддержке</span>
            <img src={bannerLogoFasie} alt="Фонд содействия инновациям" />
        </div>
    </div>
)
