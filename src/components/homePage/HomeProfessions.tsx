import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { HomeModal } from "./HomeModal"

import masterImage from "../../res/home-imgs/master-image.webp"
import engineerImage from "../../res/home-imgs/engineer-image.webp"
import explosivesImage from "../../res/home-imgs/explosives-image.webp"
import rescuerImage from "../../res/home-imgs/rescuer-image.webp"
import driverImage from "../../res/home-imgs/driver-image.webp"

interface Profession {
    title: string
    description: string
    details: string
    image: string
}

const professions: Profession[] = [
    {
        title: "Горный мастер",
        description: "Организует работу смены и отвечает за безопасность команды.",
        details: "Руководит сменой в шахте или карьере, распределяет задачи между бригадами, контролирует работу техники и соблюдение требований безопасности.",
        image: masterImage,
    },
    {
        title: "Горный инженер-технолог",
        description: "Проектирует процессы добычи и управляет технологиями производства.",
        details: "Проектирует карьеры и подземные сооружения, разрабатывает безопасные способы добычи и управляет сложными производственными системами.",
        image: engineerImage,
    },
    {
        title: "Специалист буровзрывных работ",
        description: "Рассчитывает и организует безопасное проведение взрывных работ.",
        details: "Планирует буровзрывные работы, рассчитывает параметры зарядов и контролирует точность и безопасность выполнения производственных операций.",
        image: explosivesImage,
    },
    {
        title: "Горноспасатель",
        description: "Предотвращает последствия аварий и помогает людям в сложных условиях.",
        details: "Участвует в ликвидации аварий, проверяет системы жизнеобеспечения шахт и проводит спасательные работы с использованием специального оборудования.",
        image: rescuerImage,
    },
    {
        title: "Водитель карьерного самосвала",
        description: "Управляет крупной техникой в условиях горного производства.",
        details: "Управляет карьерным самосвалом, контролирует показания систем машины и безопасно перевозит горную массу по технологическим маршрутам.",
        image: driverImage,
    },
]

export const HomeProfessions = () => {
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null)

    return (
        <section id="professions" className="home-section home-professions-section" aria-labelledby="professions-title">
            <div className="home-section-inner">
                <div className="home-section-heading-row">
                    <div className="home-section-heading">
                        <span className="home-section-kicker">Пять направлений</span>
                        <h2 id="professions-title">Инженерные профессии</h2>
                        <p>Сейчас ПрофиВектор рассчитывает соответствие пяти профессиям горнодобывающей отрасли.</p>
                    </div>
                    <a className="home-section-more" href="#professions">Все профессии <ArrowRight size={16} /></a>
                </div>

                <div className="home-professions-grid">
                    {professions.map((profession, index) => (
                        <article className={`home-profession-card ${index === 0 ? "home-profession-card--featured" : ""}`} key={profession.title}>
                            <div className="home-profession-image">
                                <img src={profession.image} alt="" />
                                <span>0{index + 1}</span>
                            </div>
                            <div className="home-profession-content">
                                <h3>{profession.title}</h3>
                                <p>{profession.description}</p>
                                <button type="button" onClick={() => setSelectedProfession(profession)}>
                                    Подробнее <ArrowRight size={17} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <HomeModal
                open={Boolean(selectedProfession)}
                title={selectedProfession?.title ?? "Профессия"}
                onClose={() => setSelectedProfession(null)}>
                {selectedProfession && (
                    <>
                        <img className="home-profession-modal-image" src={selectedProfession.image} alt="" />
                        <p>{selectedProfession.details}</p>
                        <p>ПрофиВектор сравнивает профиль пользователя с профилем этой профессии и показывает степень соответствия.</p>
                        <Button label="Закрыть" onClick={() => setSelectedProfession(null)} />
                    </>
                )}
            </HomeModal>
        </section>
    )
}
