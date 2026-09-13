import { ArrowRight, ClipboardCheck, Glasses, GraduationCap, School, Target } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/reusable/button"
import { HomeHeroScene } from "./HomeHeroScene"

export const HomeHero = () => {
    const navigate = useNavigate()

    return (
        <section id="about" className="home-section home-hero-section" aria-labelledby="home-hero-title">
            <div className="home-section-inner home-hero-inner">
                <div className="home-hero-content">
                    <span className="home-hero-eyebrow">ПрофиВектор · инженерная профориентация</span>
                    <h1 id="home-hero-title">Пойми, какая <strong>инженерная профессия</strong> тебе подходит</h1>
                    <p className="home-hero-lead">Пройдите диагностику, а ПрофиВектор с помощью математического расчёта покажет, какие инженерные профессии подходят вам больше всего.</p>
                    <p className="home-hero-note">Не просто тест. Расчёт степени соответствия инженерным профессиям.</p>

                    <div className="home-hero-formats">
                        <div><ClipboardCheck size={18} /><span><strong>Бесплатная диагностика</strong><small>Узнайте свои сильные стороны</small></span></div>
                        <div><Glasses size={18} /><span><strong>Углублённая диагностика</strong><small>Более точный результат с современными технологиями</small></span></div>
                    </div>

                    <div className="home-hero-actions">
                        <Button label="Пройти бесплатно" icon={<ArrowRight size={18} />} onClick={() => navigate("/register")} />
                        <a className="home-secondary-action" href="#diagnostics"><Glasses size={19} />Узнать про углублённую диагностику</a>
                    </div>
                </div>
                <HomeHeroScene />
            </div>

            <div className="home-hero-benefits">
                <div><GraduationCap size={21} /><span>Реальные инженерные профессии</span></div>
                <div><ClipboardCheck size={21} /><span>Современные технологии диагностики</span></div>
                <div><Target size={21} /><span>Помогаем сделать осознанный выбор</span></div>
                <div><School size={21} /><span>Используется в школах и учебных центрах</span></div>
            </div>
        </section>
    )
}
