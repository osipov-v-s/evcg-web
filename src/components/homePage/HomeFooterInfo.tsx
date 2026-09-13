import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

export const HomeFooterInfo = () => (
    <footer id="contacts" className="home-footer">
        <div className="home-section-inner">
            <div className="home-footer-top">
                <div className="home-footer-brand">
                    <strong>ПрофиВектор</strong>
                    <span>Твой путь в инженерное будущее</span>
                </div>
                <nav aria-label="Документы и контакты">
                    <a href="/documents/privacy_profivector.docx" target="_blank" rel="noreferrer">Политика конфиденциальности</a>
                    <a href="/documents/user_agreement_profivector.docx" target="_blank" rel="noreferrer">Пользовательское соглашение</a>
                    <a href="#contacts">Контакты</a>
                </nav>
                <img className="home-footer-foundation-logo" src={bannerLogoFasie} alt="Фонд содействия инновациям" />
            </div>

            <div className="home-footer-details">
                <div>
                    <strong>ООО «Цифровые образовательные решения»</strong>
                    <p>ИНН 1900012716 · ОГРН 1241900000011 · г. Абакан</p>
                    <p>655017, Республика Хакасия, г. Абакан,<br />ул. Богдана Хмельницкого, д. 155, кв. 159</p>
                </div>
                <div>
                    <p>ИНН 1900012716 · КПП 190001001</p>
                    <p>Р/с 40702810371000007103</p>
                    <p>К/с 30101810500000000608 · БИК 049514608</p>
                    <p>Абаканское отделение №8602 ПАО Сбербанк</p>
                </div>
            </div>

            <div className="home-footer-bottom">© 2026 ПрофиВектор</div>
        </div>
    </footer>
)
