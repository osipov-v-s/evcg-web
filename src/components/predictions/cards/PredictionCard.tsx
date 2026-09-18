import { Prediction } from "../../../types/prediction/prediction"
import { Button } from "../../ui/reusable/button"
import { formatDateTime } from "../../../services/dates/formatDate"
import {
    getCategoryLabel,
    getCompatibilityColor,
    getCompatibilityFromDistance,
} from "../../../utils/distanceCategory"

interface Props {
    prediction: Prediction
    isPredicting: boolean
    onRefresh: () => void
}

export const PredictionCard = ({ prediction, isPredicting, onRefresh }: Props) => {
    const distance = prediction.distance
    const compatibility = getCompatibilityFromDistance(distance)
    const categoryLabel = getCategoryLabel(distance)
    const color = getCompatibilityColor(distance)

    const description =
        distance <= 0.7 ? "Отличный результат! Профессия идеально подходит." :
        distance <= 1.5 ? "Хороший результат. Профессия очень подходит." :
        distance <= 2.2 ? "Средний результат. Профессия подходит." :
        distance <= 3.0 ? "Ниже среднего. Есть более подходящие профессии." :
        distance <= 4.0 ? "Низкая совместимость. Рекомендуется рассмотреть другие варианты." :
                          "Очень низкая совместимость. Профессия не рекомендуется."

    return (
        <div className="prediction-card">
            <div className="card-header">
                <Button
                    disabled={isPredicting}
                    label={isPredicting ? "Вычисляем…" : "Обновить результат"}
                    onClick={onRefresh}
                />
            </div>

            <div className="card-body">
                <div className="profession-section">
                    <div className="label">Профессия с наилучшим текущим соответствием</div>
                    <h2 className="profession-name">{prediction.predictedProfession}</h2>
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <label className="label">Кластер</label>
                        <div className="stat-value">K{prediction.cluster}</div>
                    </div>
                    <div className="stat-item">
                        <label className="label">Категория дистанции</label>
                        <div className="stat-value" style={{ color }}>{categoryLabel}</div>
                    </div>
                    <div className="stat-item">
                        <label className="label">Дистанция</label>
                        <div className="stat-value">{distance.toFixed(3)}</div>
                    </div>
                    <div className="stat-item">
                        <label className="label">Совместимость</label>
                        <div className="stat-value" style={{ color }}>{compatibility}%</div>
                    </div>
                </div>

                <div className="compatibility-section">
                    <div className="compat-label">
                        <span>Уровень совместимости</span>
                        <span style={{ color }}>{compatibility}%</span>
                    </div>
                    <div className="compat-bar">
                        <div className="compat-fill" style={{ width: `${compatibility}%`, background: color }} />
                    </div>
                </div>

                <div className="category-info">
                    <div className="info-badge" style={{ background: color }}>{categoryLabel}</div>
                    <span className="info-text">{description}</span>
                </div>

                <div className="distance-scale">
                    <div className="scale-labels">
                        <span>Идеально</span>
                        <span>Средне</span>
                        <span>Экстремально</span>
                    </div>
                    <div className="scale-bar">
                        <div className="scale-marker" style={{ left: `${Math.min(100, (distance / 5) * 100)}%` }}>●</div>
                        <div className="scale-gradient">
                            <div className="gradient-section" style={{ background: '#10b981' }} />
                            <div className="gradient-section" style={{ background: '#fbbf24' }} />
                            <div className="gradient-section" style={{ background: '#f59e0b' }} />
                            <div className="gradient-section" style={{ background: '#ef4444' }} />
                            <div className="gradient-section" style={{ background: '#991b1b' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <span className="date">{formatDateTime(prediction.createdAt)}</span>
                <span className="id">ID: {prediction.pupilId}</span>
            </div>
        </div>
    )
}