import { ArrowRight, Check } from "lucide-react"
import { Button } from "../ui/reusable/button"

export const Diagnostics = () => {
    return (
        <section className="diagnostics">
            <div className="container">
                <header>
                    <strong>Форматы</strong>
                    <h1>Два формата диагностики</h1>
                    <span>Выберите подходящий уровень - начните бесплатно или получите более точный результат</span>
                </header>

                <div className="diagnostics-grid">
                    <div className="diagnostic-card">
                        <div className="diagnostic-bg" />

                        <div className="diagnostic-content">
                            <h2 className="diagnostic-title">
                                Бесплатная диагностика
                            </h2>

                            <div className="diagnositc-tags">
                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>Психологическая тесты</span>
                                </div>

                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>Первичная рекомендация</span>
                                </div>

                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>Подходит школьникам и студентам</span>
                                </div>
                            </div>

                            <span className="diagnostic-cost cost-free">
                                Бесплатно
                            </span>

                            <div className="diagnostic-action">
                                <Button label="Пройти бесплатно" icon={<ArrowRight />} />
                            </div>
                        </div>
                    </div>

                    <div className="diagnostic-card">
                        <div className="diagnostic-bg" />

                        <div className="diagnostic-content">
                            <h2 className="diagnostic-title">
                                Углубленная диагностика
                            </h2>

                            <div className="diagnositc-tags">
                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>VR-сценарии (погружение в профессии)</span>
                                </div>

                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>Фейстрекинг (анализ эмоций)</span>
                                </div>

                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>Айтрекинг (анализ внимания)</span>
                                </div>

                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>ЭЭГ (оценка когнитивных реакций)</span>
                                </div>

                                <div className="diagnostic-tag-item">
                                    <Check />
                                    <span>Подробный разбор и рекомендации</span>
                                </div>
                            </div>

                            <span className="diagnostic-cost cost-buy">
                                Платно
                            </span>

                            <div className="diagnostic-action">
                                <Button label="Подробнее" icon={<ArrowRight />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}