import { MathPrediction } from "../../../types/prediction/prediction"
import { formatDateTime } from "../../../services/dates/formatDate"

interface Props {
    math: MathPrediction
}

const colorFor = (p: number) =>
    p >= 70 ? "#10b981" :
    p >= 40 ? "#fbbf24" :
              "#ef4444"

export const MathPredictionCard = ({ math }: Props) => {
    const percent = Math.min(100, Math.max(0, math.percentage))
    const color = colorFor(percent)
    const label = math.recommendationComplex || math.recommendation

    return (
        <div className="prediction-card">
            <div className="card-header">
                <span className="card-badge">Математический подбор</span>
            </div>

            <div className="card-body">
                <div className="profession-section">
                    <div className="label">Наиболее подходящая профессия</div>
                    <h2 className="profession-name">{String(math.profession)}</h2>
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <label className="label">Айзенк</label>
                        <div className="stat-value">{math.aizenNorm ? math.aizenNorm.toFixed(2): 0}</div>
                    </div>
                    <div className="stat-item">
                        <label className="label">Белбин</label>
                        <div className="stat-value">{math.belbinNorm ? math.belbinNorm.toFixed(2): 0}</div>
                    </div>
                    <div className="stat-item">
                        <label className="label">Беннет</label>
                        <div className="stat-value">{math.bennetNorm ? math.bennetNorm.toFixed(2) : 0}</div>
                    </div>
                    <div className="stat-item">
                        <label className="label">Итоговый балл</label>
                        <div className="stat-value">{math.finalScore ? math.finalScore.toFixed(2) : 0}</div>
                    </div>
                </div>

                <div className="compatibility-section">
                    <div className="compat-label">
                        <span>Процент соответствия</span>
                        <span style={{ color }}>{percent.toFixed(1)}%</span>
                    </div>
                    <div className="compat-bar">
                        <div className="compat-fill" style={{ width: `${percent}%`, background: color }} />
                    </div>
                </div>

                <div className="category-info">
                    <div className="info-badge" style={{ background: color }}>{label}</div>
                    <span className="info-text">Полезность: {math.utility ? math.utility.toFixed(4) : 0}</span>
                </div>
            </div>

            <div className="card-footer">
                <span className="date">{formatDateTime(math.createdAt)}</span>
                <span className="id">ID: {math.pupilId}</span>
            </div>
        </div>
    )
}