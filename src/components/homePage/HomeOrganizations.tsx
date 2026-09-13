import { Building2 } from "lucide-react"
import { organizations } from "./data/organizations"

export const HomeOrganizations = () => (
    <section id="organizations" className="home-section home-organizations-section" aria-labelledby="organizations-title">
        <div className="home-section-inner">
            <div className="home-organizations-intro">
                <div className="home-section-heading">
                    <span className="home-section-kicker">Практическое применение</span>
                    <h2 id="organizations-title">Где уже используется</h2>
                    <p>ПрофиВектор применяется в профориентационной работе образовательных организаций.</p>
                </div>
                <div className="home-organizations-count" aria-hidden="true"><strong>02</strong><span>образовательные<br />организации</span></div>
            </div>

            <div className="home-organizations-grid">
                {organizations.map((organization) => (
                    <article className="home-organization-card" key={organization.name}>
                        <div className="home-organization-placeholder" aria-label={`Текстовый знак ${organization.shortName}`}>
                            <Building2 size={24} />
                            <span>{organization.shortName}</span>
                        </div>
                        <div>
                            <h3>{organization.name}</h3>
                            <p>{organization.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
)
