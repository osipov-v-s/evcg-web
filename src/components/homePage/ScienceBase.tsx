import { ArrowRight, FileText, Newspaper } from "lucide-react"
import { Button } from "../ui/reusable/button"

export const ScienceBase = () => {
    return (
        <section className="science-base">
            <div className="container">
                <header>
                    <strong>Больше информации</strong>
                    <h1>Научная и технологическая база</h1>
                </header>

                <div className="science-base-grid">
                    <div className="science-base-item">
                        <div className="science-base-content">
                            <h2 className="science-base-title">
                                <FileText />
                                Свидетельства о регистрации
                            </h2>

                            <p className="science-base-description">
                                Наши разработки официально зарегистрированы
                            </p>

                            <div className="science-base-docs-row">
                                <div className="docs-row-item">

                                </div>

                                <div className="docs-row-item">

                                </div>

                                <div className="docs-row-item">

                                </div>

                                <div className="docs-row-item">

                                </div>
                            </div>

                            <Button label="Посмотреть все документы" variant="tertiary" icon={<ArrowRight />} />
                        </div>
                    </div>

                    <div className="science-base-item">
                        <div className="science-base-content">
                            <h2 className="science-base-title">
                                <Newspaper />
                                Публикации
                            </h2>

                            <p className="science-base-description">
                                Результаты исследованиия представлены в научных изданиях
                            </p>

                            <div className="science-base-docs-row">
                                <div className="docs-row-item">

                                </div>

                                <div className="docs-row-item">

                                </div>

                                <div className="docs-row-item">

                                </div>

                                <div className="docs-row-item">

                                </div>
                            </div>

                            <Button label="Посмотреть все публикации" variant="tertiary" icon={<ArrowRight />} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}