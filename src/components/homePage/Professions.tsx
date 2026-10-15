import masterImage from "../../res/home-imgs/master-image.webp"
import engineerImage from "../../res/home-imgs/engineer-image.webp"
import explosivesImage from "../../res/home-imgs/explosives-image.webp"
import rescuerImage from "../../res/home-imgs/rescuer-image.webp"
import driverImage from "../../res/home-imgs/driver-image.webp"

const PROFESSIONS_ITEMS = [
    {
        id: 1,
        title: "Горный мастер",
        description: "Организует работы смены и отвечает за безопасность команды",
        imgUrl: masterImage,
    },
    {
        id: 2,
        title: "Горный инженер",
        description: "Проектирует процессы добычи и управляет технологиями производства",
        imgUrl: engineerImage,
    },
    {
        id: 3,
        title: "Специалист буровзрывных работ",
        description: "Рассчитывает и организует безопасное проведение взрывных работ",
        imgUrl: explosivesImage,
    },
    {
        id: 4,
        title: "Горноспасатель",
        description: "Предотвращает последствия аварий и помогает людям в сложных условиях",
        imgUrl: rescuerImage,
    },
    {
        id: 5,
        title: "Водитель карьерного самосвала",
        description: "Управляет крупной техникой в условиях горного производства",
        imgUrl: driverImage,
    },
]

export const Professions = () => {
    return (
        <section className="professions">
            <div className="container">
                <header>
                    <strong>Профессиональный вектор</strong>
                    <h1>Инженерные профессии</h1>
                    <span>Показываем, какая инженерная профессия вам ближе. Мы анализируем ваш профиль и сравниваем его с реальными профессиями</span>
                </header>

                <div className="professions-grid">
                    {PROFESSIONS_ITEMS.map((item, index) => (
                        <div key={item.id} className="profession-item">
                            <div className="profession-item-inner">
                                {item.imgUrl && (
                                    <div className="profession-item-img">
                                        <img
                                            src={item.imgUrl}
                                            alt={item.title}
                                            draggable={false} />
                                        <div className="profession-item-img-fade" />
                                    </div>
                                )}
                                <div className="profession-item-content-wrap">
                                    <h2 className="profession-item-title">{item.title}</h2>
                                    {item.description && (
                                        <span className="profession-item-description">{item.description}</span>
                                    )}
                                </div>

                                <span className="profession-item-order">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}