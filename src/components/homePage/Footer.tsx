import { ArrowRight, Cake } from "lucide-react"
import { Button } from "../ui/reusable/button"

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-bg" />

                <div className="footer-top-content">
                    <div className="footer-text">
                        <h2 className="footer-title">Сделай первый шаг <br /> к инженерной профессии</h2>
                        <p className="footer-description">Узнай свои возможности уже сегодня!</p>
                    </div>

                    <div className="footer-actions">
                        <Button label="Пройти бесплатно" icon={<ArrowRight />} />
                        <Button label="Углубленная диагностика" variant="ghost" icon={<ArrowRight />} />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <div className="footer-logo">
                        <h2>ПрофиВектор</h2>
                    </div>

                    <div className="footer-nav">
                        <ul>
                            <Button variant="tertiary">О проекте</Button>
                            <Button variant="tertiary">Наши победы</Button>
                            <Button variant="tertiary">Форматы</Button>
                            <Button variant="tertiary">Как это работает</Button>
                            <Button variant="tertiary">Профессии</Button>
                            <Button variant="tertiary">Где используется</Button>
                            <Button variant="tertiary">Команда</Button>
                            <Button variant="tertiary">Наука</Button>
                        </ul>
                    </div>

                    <div className="footer-org-data">
                        <p>
                            ООО "Цифровые образовательные решения" <br /> Абакан, Республика Хакасия
                        </p>

                        <div className="org-data-item">
                            <p>ИНН 1900012716</p>
                            <p>КПП 190001001</p>
                            <p>ОГРН 12411900000011</p>
                        </div>

                        <div className="org-data-item">
                            <p>р/c 40703810371000007103</p>
                            <p>к/c 3010181650000000000608</p>
                            <p>БИК 123456789</p>
                            <p>Абаканское отделение №8602 ПАО СБЕРБАНК</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}