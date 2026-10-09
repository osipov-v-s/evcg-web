import { EmblaCarousel } from "../ui/reusable/EmblaCarousel"

const PRACTICE_SLIDES = [
    {
        id: 1,
        title: 'МБОУ "СОШ №33" города Абакана',
        content: "Профориентация для школьников. Помогаем ребятам узнать больше об инженерных профессиях",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        title: 'ЧОУ ДПО "Южно-Сибирский учебный центр"',
        content: "Профессиональное обучение и дополнительное образование с использованием нашей системы",
        imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        title: 'ЧОУ ДПО "Южно-Сибирский учебный центр"',
        content: "Профессиональное обучение и дополнительное образование с использованием нашей системы",
        imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    },
]


export const Practice = () => {
    return (
        <section>
            <div className="container">
                <header>
                    <strong>Практика</strong>
                    <h1>Где уже используется</h1>
                    <span>Нашей системой пользуеются в образовательных организациях</span>
                </header>

                <EmblaCarousel slides={PRACTICE_SLIDES} slidesToShow={3} />
            </div>
        </section>
    )
}