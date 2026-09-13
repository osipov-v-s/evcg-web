import { BookOpen, FileCheck2 } from "lucide-react"

const scienceGroups = [
    {
        title: "Зарегистрированные разработки",
        description: "Подтверждённые названия и регистрационные номера будут добавлены после проверки материалов.",
        Icon: FileCheck2,
    },
    {
        title: "Научные публикации",
        description: "Сведения об авторах, изданиях, годах и идентификаторах публикаций будут добавлены после проверки.",
        Icon: BookOpen,
    },
]

export const HomeScience = () => (
    <section id="science" className="home-section home-science-section" aria-labelledby="science-title">
        <div className="home-section-inner">
            <div className="home-section-heading">
                <span className="home-section-kicker">Основа продукта</span>
                <h2 id="science-title">Научная и технологическая база</h2>
                <p>Здесь будут собраны проверенные сведения о разработках и публикациях команды.</p>
            </div>

            <div className="home-science-grid">
                {scienceGroups.map(({ title, description, Icon }, index) => (
                    <article className={`home-science-card home-science-card--${index + 1}`} key={title}>
                        <div className="home-science-icon"><Icon size={28} /></div>
                        <div>
                            <span className="home-science-status">TODO · требуются материалы</span>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <div className="home-science-documents" aria-hidden="true">
                                {[0, 1, 2, 3].map((item) => <span key={item}><i /><i /><i /></span>)}
                            </div>
                            <button type="button" disabled>{index === 0 ? "Посмотреть все документы →" : "Посмотреть публикации →"}</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
)
