import { Award, BookOpenText, Boxes, GraduationCap, Trophy } from "lucide-react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { achievements, AchievementIcon } from "./data/achievements"
import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

const ICONS: Record<AchievementIcon, typeof Award> = {
    support: Award,
    science: BookOpenText,
    practice: GraduationCap,
    diagnostics: Boxes,
}

export const HomeAchievements = () => (
    <section id="achievements" className="home-section home-achievements-section" aria-labelledby="achievements-title">
        <div className="home-section-inner">
            <div className="home-section-heading home-achievements-heading">
                <div className="home-section-title-row">
                    <span className="home-section-title-icon"><Trophy size={24} /></span>
                    <div><h2 id="achievements-title">Наши победы</h2><p>Проект развивается, получает поддержку и проходит научную и практическую апробацию.</p></div>
                </div>
            </div>

            <Swiper
                className="home-achievements-slider"
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={18}
                slidesPerView={1}
                breakpoints={{
                    700: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                }}>
                {achievements.map((achievement, index) => {
                    const Icon = ICONS[achievement.icon]
                    return (
                        <SwiperSlide key={achievement.title}>
                            <article className="home-achievement-card">
                                <div className="home-achievement-visual" aria-hidden="true">
                                    <span className="home-achievement-index">0{index + 1}</span>
                                    {achievement.icon === "support"
                                        ? <img src={bannerLogoFasie} alt="" />
                                        : <Icon size={34} />}
                                </div>
                                <div>
                                    <h3>{achievement.title}</h3>
                                    <p>{achievement.description}</p>
                                </div>
                                {achievement.link && (
                                    <a href={achievement.link} target="_blank" rel="noreferrer">
                                        {achievement.linkLabel}
                                    </a>
                                )}
                            </article>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    </section>
)
