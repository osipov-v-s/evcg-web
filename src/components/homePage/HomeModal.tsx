import { ReactNode, useEffect, useRef } from "react"
import { X } from "lucide-react"

interface HomeModalProps {
    open: boolean
    title: string
    children: ReactNode
    onClose: () => void
}

export const HomeModal = ({ open, title, children, onClose }: HomeModalProps) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!open) return

        closeButtonRef.current?.focus()
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }

        document.body.classList.add("home-modal-open")
        window.addEventListener("keydown", closeOnEscape)
        return () => {
            document.body.classList.remove("home-modal-open")
            window.removeEventListener("keydown", closeOnEscape)
        }
    }, [open, onClose])

    if (!open) return null

    return (
        <div className="home-modal-backdrop" role="presentation" onMouseDown={onClose}>
            <section
                className="home-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="home-modal-title"
                onMouseDown={(event) => event.stopPropagation()}>
                <div className="home-modal-header">
                    <h2 id="home-modal-title">{title}</h2>
                    <button ref={closeButtonRef} type="button" aria-label="Закрыть" onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>
                <div className="home-modal-content">{children}</div>
            </section>
        </div>
    )
}
