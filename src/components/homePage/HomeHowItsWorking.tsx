import { BarChart3, ClipboardList, ScanSearch, UserRound } from "lucide-react"

const steps = [
    {
        title: "Заполните данные",
        description: "Заполните профиль и пройдите тесты.",
        Icon: UserRound,
    },
    {
        title: "Пройдите диагностику",
        description: "Система соберёт информацию об интересах, способностях и результатах заданий.",
        Icon: ClipboardList,
    },
    {
        title: "Система рассчитает результат",
        description: "Математическая модель сравнит ваши показатели с профилями специалистов.",
        Icon: ScanSearch,
    },
    {
        title: "Получите список подходящих профессий",
        description: "Вы увидите, какие профессии подходят вам больше всего.",
        Icon: BarChart3,
    },
]

export const HomeHowItsWorking = () => (
    <section id="how-it-works" className="home-section home-how-section" aria-labelledby="how-title">
        <div className="home-section-inner">
            <div className="home-section-heading home-how-heading">
                <span className="home-section-title-icon home-section-title-icon--blue">04</span>
                <div><h2 id="how-title">Как это работает</h2><p>От знакомства с вашими интересами — до списка подходящих инженерных профессий.</p></div>
            </div>

            <div className="home-how-layout">
                <ol className="home-how-steps">
                    {steps.map(({ title, description, Icon }, index) => (
                        <li className="home-how-step" key={title}>
                            <span className="home-how-number">0{index + 1}</span>
                            <div className="home-how-icon"><Icon size={23} /></div>
                            <div><h3>{title}</h3><p>{description}</p></div>
                        </li>
                    ))}
                </ol>

                <aside className="home-how-result" aria-label="Пример отображения результата">
                    <span>Пример отображения результата</span>
                    <h3>Результат математического расчёта</h3>
                    <div className="home-how-score">
                        <div><strong>Горный инженер</strong><span>84%</span></div>
                        <div className="home-how-score-bar"><span style={{ width: "84%" }} /></div>
                    </div>
                    <div className="home-how-score">
                        <div><strong>Горный мастер</strong><span>76%</span></div>
                        <div className="home-how-score-bar"><span style={{ width: "76%" }} /></div>
                    </div>
                    <small>Это mock-интерфейс, а не реальный расчёт.</small>
                </aside>
            </div>
        </div>
    </section>
)
