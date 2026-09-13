import { team } from "./data/team"

export const HomeTeam = () => (
    <section id="team" className="home-section home-team-section" aria-labelledby="team-title">
        <div className="home-section-inner">
            <div className="home-section-heading-row">
                <div className="home-section-heading">
                    <span className="home-section-kicker">Люди проекта</span>
                    <h2 id="team-title">Команда проекта</h2>
                    <p>Исследователи, математики и разработчики, которые создают и развивают ПрофиВектор.</p>
                </div>
                <span className="home-section-more">Вся команда →</span>
            </div>

            <div className="home-team-grid">
                {team.map((member, index) => (
                    <article className="home-team-card" key={member.name}>
                        <span className="home-team-index">0{index + 1}</span>
                        <div className="home-team-avatar" aria-hidden="true">{member.initials}</div>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
)
