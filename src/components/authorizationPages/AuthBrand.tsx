import { useNavigate } from "react-router-dom"

export const AuthBrand = () => {
    const navigate = useNavigate()

    return (
        <button className="auth-brand" type="button" onClick={() => navigate("/")} aria-label="ПрофиВектор — на главную">
            <span className="auth-brand-mark" aria-hidden="true">ПВ</span>
            <span><strong>ПрофиВектор</strong><small>Твой вектор в инженерное будущее</small></span>
        </button>
    )
}
