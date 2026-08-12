import { ReactNode } from "react"
import { RotateCcw } from "lucide-react"
import "./common.css"

interface DataFilterBarProps {
    children: ReactNode
    onReset: () => void
    label?: string
}

export const DataFilterBar = ({children, onReset, label = "Фильтры"}: DataFilterBarProps) => (
    <section className="data-filter" aria-label={label}>
        <div className="data-filter__fields">{children}</div>
        <button className="data-filter__reset" type="button" onClick={onReset}>
            <RotateCcw size={17} aria-hidden="true" /> Сбросить
        </button>
    </section>
)
