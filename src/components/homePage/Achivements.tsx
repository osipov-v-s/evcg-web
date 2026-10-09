import { EmblaCarousel } from "../ui/reusable/EmblaCarousel"

const ACHIVEMETS_SLIDES = [
    {
        id: 1,
        title: "Победитель программы Фонда содействия инновациям",
        content: "Получили поддержку для развития проекта",
        imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        title: "Зарегистрированные разработки",
        content: "Программные решения и методики диагностики",
        imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        title: "Научные публикации и выступления",
        content: "Представляем результаты на конференциях",
        imgUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 4,
        title: "Внедрение в образовательных организациях",
        content: "Нашу систему используют в школах и учебных центрах",
        imgUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 5,
        title: "Абоба",
        content: "Абоба",
        imgUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 6,
        title: "Абоба",
        content: "Абоба",
        imgUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 7,
        title: "Абоба",
        content: "Абоба",
        imgUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 8,
        title: "Абоба",
        content: "Абоба",
        imgUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 9,
        title: "Абоба",
        content: "Абоба",
        imgUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    },
]

export const Achivements = () => {
    return (
        <section className="achivements">
            <div className="container">
                <header>
                    <strong>Доверие</strong>
                    <h1>Наши победы</h1>
                    <span>Наш проект получает признание и уже дает реальные результаты</span>
                </header>

                <EmblaCarousel slides={ACHIVEMETS_SLIDES} slidesToShow={4}/>
            </div>
        </section>
    )
}