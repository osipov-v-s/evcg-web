import { ReactNode } from "react"
import "./common.css"

interface PageHeaderProps {
    title: string
    description?: string
    actions?: ReactNode
}

export const PageHeader = ({title, description, actions}: PageHeaderProps) => (
    <header className="page-heading">
        <div>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </div>
        {actions && <div className="page-heading__actions">{actions}</div>}
    </header>
)
