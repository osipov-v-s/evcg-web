import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/reusable/button"

export const HomeFinalCta = () => {
    const navigate = useNavigate()

    return (
        <section className="home-section home-final-cta-section" aria-labelledby="final-cta-title">
            <div className="home-section-inner">
                <div className="home-final-cta-card">
                    <div>
                        <span>Сделайте первый шаг</span>
                        <h2 id="final-cta-title">Сделайте первый шаг<br />к инженерной профессии</h2>
                        <p>Пройдите бесплатную диагностику и узнайте степень соответствия пяти профессиям горнодобывающей отрасли.</p>
                    </div>
                    <div className="home-final-cta-actions">
                        <Button label="Пройти бесплатно" icon={<ArrowRight size={18} />} onClick={() => navigate("/register")} />
                        <a href="#diagnostics">Узнать про углублённую диагностику</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
