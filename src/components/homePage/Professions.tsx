const PROFESSIONS_ITEMS = [
    {
        id: 1,
        title: "Горный мастер",
        description: "Организует работы в карьере",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        title: "Горный инженер",
        description: "Проектирует и планирует разработку месторождений",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        title: "Специалист буровзрывных работ",
        description: "Обеспечивает безопасное и эффективное профедение взрывных работ",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 4,
        title: "Горноспасатель",
        description: "Работает в сложных и опасных условиях",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 5,
        title: "Водитель карьерного самосвала",
        description: "Управляет мощной техникой в карьере",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
]

export const Professions = () => {
    return (
        <section className="professions">
            <div className="container">
                <header>
                    <span>Профессиональный вектор</span>
                    <h3>Инженерные профессии</h3>
                    <span>Показываем, какая инженерная профессия вам ближе. Мы анализируем ваш профиль и сравниваем его с реальными профессиями</span>
                </header>

                <div className="professions-grid">
                    {PROFESSIONS_ITEMS.map((item) => (
                        <div key={item.id} className="profession-item">
                            <div className="profession-item-inner">
                                {item.imgUrl && (
                                    <img
                                        src={item.imgUrl}
                                        alt={item.title}
                                        className="profession-item-img"
                                        draggable={false} />
                                )}
                                <div className="profession-item-overlay" />
                                <div className="profession-item-content-wrap">
                                    <h3 className="profession-item-title">{item.title}</h3>
                                    {item.description && (
                                        <span className="profession-item-description">{item.description}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}