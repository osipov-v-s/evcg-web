import { useEffect, useRef } from "react"
import "./common.css"

interface ConfirmDialogProps {
    open: boolean
    title: string
    message: string
    confirmLabel?: string
    busy?: boolean
    onConfirm: () => void
    onClose: () => void
}

export const ConfirmDialog = ({
    open,
    title,
    message,
    confirmLabel = "Подтвердить",
    busy = false,
    onConfirm,
    onClose
}: ConfirmDialogProps) => {
    const cancelRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!open) return
        cancelRef.current?.focus()
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !busy) onClose()
        }
        window.addEventListener("keydown", closeOnEscape)
        return () => window.removeEventListener("keydown", closeOnEscape)
    }, [open, busy, onClose])

    if (!open) return null

    return <div className="dialog-backdrop" role="presentation" onMouseDown={() => !busy && onClose()}>
        <section
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            onMouseDown={event => event.stopPropagation()}>
            <h2 id="confirm-title">{title}</h2>
            <p>{message}</p>
            <div className="confirm-dialog__actions">
                <button ref={cancelRef} type="button" className="secondary-action" onClick={onClose} disabled={busy}>
                    Отмена
                </button>
                <button type="button" className="danger-action" onClick={onConfirm} disabled={busy}>
                    {busy ? "Выполняется…" : confirmLabel}
                </button>
            </div>
        </section>
    </div>
}
