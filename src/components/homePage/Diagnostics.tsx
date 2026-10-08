export const Diagnostics = () => {
    return (
        <section className="diagnostics">
            <div className="container">
                <header>
                    <span>Форматы</span>
                    <h3>Два формата диагностики</h3>
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
                                <span>Психологическая тесты</span>
                                <span>Первичная рекомендация</span>
                                <span>Подходит школьникам и студентам</span>
                            </div>

                            <span className="diagnostic-cost">
                                Бесплатно
                            </span>
                        </div>
                    </div>

                    <div className="diagnostic-card">
                        <div className="diagnostic-bg" />
                        
                        <div className="diagnostic-content">
                            <h2 className="diagnostic-title">
                                Углубленная диагностика
                            </h2>

                            <div className="diagnositc-tags">
                                <span>VR-сценарии (погружение в профессии)</span>
                                <span>Фейстрекинг (анализ эмоций)</span>
                                <span>Айтрекинг (анализ внимания)</span>
                                <span>ЭЭГ (оценка когнитивных реакций)</span>
                                <span>Подробный разбор и рекомендации</span>
                            </div>

                            <span className="diagnostic-cost">
                                Платно
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}