import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../ui/reusable/button"

export const Banner = () => {
    return (
        <section className="banner">
            <div className="banner-bg" />

            <div className="container banner-inner">
                <div className="container banner-content">
                    <div className="banner-badge">
                        <Sparkles />
                        <span>#1 в инженерной профориентации</span>
                    </div>

                    <h1 className="banner-title">
                        Пойми, какая <br />
                        <span>
                            инженерная профессия
                        </span> <br />
                        тебе подходит
                    </h1>

                    <p className="banner-subtitle">
                        Мы сравниваем ваш профиль с профилями инженерных профессий и <br /> показываем, какая из них вам ближе
                    </p>

                    <div className="banner-actions">
                        <Button label="Пройти бесплатно" icon={<ArrowRight />} />
                        <Button label="Углубленная диагностика" variant="ghost" icon={<ArrowRight />} />
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