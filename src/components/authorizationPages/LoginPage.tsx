import "./css/auth.css"

import { FC, FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { buildCredentials, detectAuthMode, hasErrors, LoginFormErrors, validateLoginForm } from "../../utils/authValidations"
import { authApi } from "../../services/api/authApi"
import { parseApiError } from "../../utils/apiError"
import { notifyError } from "../../utils/notify"
import { Button } from "../ui/reusable/button"
import { ChevronLeft, DoorOpen, GraduationCap, KeyRound, UserRound, UserRoundPlus } from "lucide-react"
import { FormField } from "../ui/reusable/FormField"

type LoginField = "identifier" | "password"

export const LoginPage: FC = () => {
    const navigate = useNavigate()
    const { login, setRoles } = useAuth()
    const [formData, setFormData] = useState<Record<LoginField, string>>({
        identifier: "",
        password: "",
    })
    const [errors, setErrors] = useState<LoginFormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submittingRef = useRef(false)

    const updateField = (field: LoginField) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setErrors(prev => {
            if (!prev[field]) return prev
            const next = { ...prev }
            delete next[field]
            return next
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (submittingRef.current) return

        const validationsErrors = validateLoginForm(formData)
        if (hasErrors(validationsErrors)) {
            setErrors(validationsErrors)
            return
        }

        const identifier = formData.identifier.trim()
        const mode = detectAuthMode(identifier)

        try {
            submittingRef.current = true
            setIsSubmitting(true)
            setErrors({})

            const token = await authApi.login(buildCredentials(mode, identifier, formData.password))
            const roles = await authApi.getRoles(token)

            login(token)
            setRoles(roles)

            navigate("/")

        } catch (error) {
            console.error("Login failed:", error)
            const parsed = parseApiError(error, { action: "login", mode })
            notifyError(parsed.message)
            setErrors(parsed.fieldErrors)

        } finally {
            submittingRef.current = false
            setIsSubmitting(false)
        }
    }

    const handleBackToRegisterPage = () => {
        navigate("/register")
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-header">
                    <div onClick={() => navigate("/")}>
                        <h2>ПрофиВектор</h2>
                        <span>Твой вектор в инженерное будущее</span>
                    </div>
                    <h2>Добро пожаловать!</h2>
                </div>

                <form className="auth-form-cols" onSubmit={handleSubmit} noValidate>
                    <FormField inputLabel={"Электронная почта или Логин"}
                        inputIcon={<UserRound size={20} />}
                        inputPlaceholder={"example@mail.ru или Логин"}
                        name="identifier"
                        autoComplete="username"
                        inputValue={formData.identifier}
                        error={errors.identifier}
                        inputOnChange={updateField("identifier")} />

                    <FormField inputLabel={"Пароль"}
                        inputIcon={<KeyRound size={20} />}
                        inputPlaceholder={"Пароль"}
                        inputType={"password"}
                        name="password"
                        autoComplete="current-password"
                        isPassword={true}
                        inputValue={formData.password}
                        error={errors.password}
                        inputOnChange={updateField("password")} />

                    <div className="auth-actions">
                        <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Входим…" : "Войти"} icon={<DoorOpen />} />
                        <div className="auth-regsiter"><span>Нет аккаунта?</span><Button type="button" variant="tertiary" label="Создать аккаунт" disabled={isSubmitting} onClick={handleBackToRegisterPage} icon={<UserRoundPlus />} /></div>
                    </div>
                </form>
            </div>
        </div>
    )
}