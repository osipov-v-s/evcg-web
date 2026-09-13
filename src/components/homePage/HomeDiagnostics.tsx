import { useState } from "react"
import { Check, Glasses, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/reusable/button"
import { HomeModal } from "./HomeModal"
import basicImage from "../../res/home-imgs/engineer-image.webp"
import vrImage from "../../res/home-imgs/rescuer-image.webp"

const freeFeatures = [
    "Психологические тесты",
    "Данные об интересах и способностях",
    "Базовый профиль пользователя",
    "Расчёт соответствия инженерным профессиям",
    "Базовые рекомендации",
]

const extendedFeatures = [
    "Всё из бесплатной диагностики",
    "VR-профессиональные сценарии",
    "Eye-tracking и face-tracking",
    "ЭЭГ и дополнительные показатели",
    "Более подробный результат",
]

export const HomeDiagnostics = () => {
    const navigate = useNavigate()
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <section id="diagnostics" className="home-section home-diagnostics-section" aria-labelledby="diagnostics-title">
            <div className="home-section-inner">
                <div className="home-section-heading home-diagnostics-heading">
                    <span className="home-section-title-icon home-section-title-icon--blue"><Glasses size={24} /></span>
                    <div><h2 id="diagnostics-title">Два формата диагностики</h2><p>Начните бесплатно или получите более подробный результат с дополнительными технологиями.</p></div>
                </div>

                <div className="home-diagnostics-grid">
                    <article className="home-diagnostics-card home-diagnostics-card--free">
                        <div className="home-diagnostics-media" data-asset-slot="diagnostics-basic.webp" aria-hidden="true"><img src={basicImage} alt="" /></div>
                        <div className="home-diagnostics-card-head">
                            <div className="home-diagnostics-icon"><Sparkles size={22} /></div>
                            <span className="home-diagnostics-badge home-diagnostics-badge--free">Бесплатно</span>
                        </div>
                        <h3>Бесплатная диагностика</h3>
                        <p>Доступный первый шаг к осознанному выбору инженерной профессии.</p>
                        <ul>
                            {freeFeatures.map((feature) => <li key={feature}><Check size={18} />{feature}</li>)}
                        </ul>
                        <Button label="Пройти бесплатно" onClick={() => navigate("/register")} />
                    </article>

                    <article className="home-diagnostics-card home-diagnostics-card--extended">
                        <div className="home-diagnostics-media" data-asset-slot="diagnostics-vr.webp" aria-hidden="true"><img src={vrImage} alt="" /></div>
                        <div className="home-diagnostics-card-head">
                            <div className="home-diagnostics-icon"><Glasses size={22} /></div>
                            <span className="home-diagnostics-badge home-diagnostics-badge--paid">Платно</span>
                        </div>
                        <h3>Углублённая диагностика</h3>
                        <p>Дополнительные данные из профессиональных сценариев для более подробного результата.</p>
                        <ul>
                            {extendedFeatures.map((feature) => <li key={feature}><Check size={18} />{feature}</li>)}
                        </ul>
                        <Button variant="ghost" label="Подробнее" onClick={() => setIsDetailsOpen(true)} />
                    </article>
                </div>
            </div>

            <HomeModal open={isDetailsOpen} title="Углублённая диагностика" onClose={() => setIsDetailsOpen(false)}>
                <p>Этот формат дополняет базовую диагностику данными из профессиональных VR-сценариев и подключаемого исследовательского оборудования.</p>
                <p>В публичном прототипе показано описание формата. Запись и оплата пока не подключены.</p>
                <Button label="Понятно" onClick={() => setIsDetailsOpen(false)} />
            </HomeModal>
        </section>
    )
}
