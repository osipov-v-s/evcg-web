import "./css/emblaCarousel.css"

import React, { useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
    id: string | number
    title: string
    content?: React.ReactNode
    imgUrl?: string
}

interface EmblaCarouselProps {
    slides: Slide[]
    options?: EmblaCarouselType
    slidesToShow?: number
}

export const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides, options, slidesToShow = 4 }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps",
        align: "start",
        ...options
    })

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    const onInit = useCallback((api: EmblaCarouselType) => {
        setScrollSnaps(api.scrollSnapList())
    }, [])

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap())
        setPrevBtnDisabled(!api.canScrollPrev())
        setNextBtnDisabled(!api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on("reInit", onInit)
        emblaApi.on("reInit", onSelect)
        emblaApi.on("select", onSelect)
        emblaApi.on("scroll", onSelect)
    }, [emblaApi, onInit, onSelect])

    const slideFlex = `0 0 ${100 / slidesToShow}%`

    return (
        <div className="embla-wrapper">
            <div className="embla-viewport" ref={emblaRef}>
                <div className="embla-container">
                    {slides.map((slide) => (
                        <div key={slide.id} className="embla-slide" style={{ flex: slideFlex }}>
                            <div className="embla-slide-inner">
                                {slide.imgUrl && (
                                    <img
                                        src={slide.imgUrl}
                                        alt={slide.title}
                                        className="embla-slide-img"
                                        draggable={false} />
                                )}
                                <div className="embla-slide-overlay" />
                                <div className="embla-slide-content-wrap">
                                    <h3 className="embla-slide-title">{slide.title}</h3>
                                    {slide.content && (
                                        <div className="embla-slide-content">{slide.content}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla-dots">
                <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={prevBtnDisabled}
                    aria-label="Предыдущий слайд"
                    className="embla-btn embla-btn--prev" >
                    <ChevronLeft />
                </button>

                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => scrollTo(index)}
                        aria-label={`Перейти к позиции ${index + 1}`}
                        className={`embla-dot ${index === selectedIndex ? "embla-dot--active" : ""}`} />
                ))}

                <button
                    type="button"
                    onClick={scrollNext}
                    disabled={nextBtnDisabled}
                    aria-label="Следующий слайд"
                    className="embla-btn embla-btn--next">
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}