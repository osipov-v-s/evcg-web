import { ReactNode } from "react"
/**
 * Отображает основной UI результатов
 * + кастомный UI каждого отдельного результата
 */
interface ResultCardProps {
    title?: string
    children: ReactNode
    highlight?: boolean
}

export const ResultCard = ({title, children, highlight}: ResultCardProps) => (
    <div className={`result-card ${highlight ? highlight : ""}`}>
        {title && <h4>{title}</h4>}
        {children}
    </div>
)
