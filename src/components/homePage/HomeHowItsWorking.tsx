import { FC } from "react"

export const HomeHowItsWorking: FC = ({ }) => {
    return (
        <div className="home-grid-item-2-grid">

            <div className="item-1-grid">
                <div className="home-block">
                    <div className="home-block-header">
                        Ключевые тесты
                    </div>

                    <div className="home-block-text">
                        Формируют профиль мышления, темперамента, интересов и командных ролей.
                    </div>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Темперамент</div>
                        <div className="widget-tag">Групповые роли</div>
                        <div className="widget-tag">Инженерное мышление</div>
                        <div className="widget-tag">Профориентационное тестирование</div>
                    </div>
                </div>

                <div className="home-block">
                    <div className="home-block-header">
                        Практические VR-сценарии
                    </div>

                    <div className="home-block-text">
                        Помогают оценить действия и мотивацию в условиях, близких к профессиональным задачам.
                    </div>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Интерактивные задачи</div>
                        <div className="widget-tag">Симуляция работы в карьере</div>
                        <div className="widget-tag">Eye-tracking</div>
                        <div className="widget-tag">Face-tracking</div>
                    </div>
                </div>

                <div className="home-block">
                    <div className="home-block-header">
                        Биологическая обратная связь
                    </div>

                    <div className="home-block-text">
                        Если оборудование доступно, система может учитывать ЭЭГ и другие исследовательские каналы во время симуляции.
                    </div>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Фиксация пиков концентрации</div>
                        <div className="widget-tag">Уровень стресса и вовлеченности</div>
                        <div className="widget-tag">Объективные показатели</div>
                    </div>
                </div>
            </div>

            <div className="home-block item-2">
                <div className="home-block-header">
                    Как формируется результат
                </div>

                <div className="home-block-text">
                    Система объединяет доступные результаты психологических тестов, учебный профиль и данные практических сценариев, затем сопоставляет их с референсными профилями профессий. Вы получаете понятный результат соответствия, который помогает обсудить дальнейший образовательный маршрут со специалистом или куратором.
                </div>
            </div>
        </div>
    )
}
