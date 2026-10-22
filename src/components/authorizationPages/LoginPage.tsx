import { FC, FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { buildCredentials, detectAuthMode, hasErrors, LoginFormErrors, validateLoginForm } from "../../utils/authValidations"
import { authApi } from "../../services/api/authApi"
import { parseApiError } from "../../utils/apiError"
import { notifyError } from "../../utils/notify"
import { Button } from "../ui/reusable/button"
import { DoorOpen, GraduationCap, KeyRound, UserRound, UserRoundPlus } from "lucide-react"
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
        <div className="auth-container">
            <div className="login-container">
                <div className="login-header">
                    <Button label="На главную" onClick={() => { navigate("/") }} className="back-btn" />
                    <div className="login-icon"><GraduationCap size={34} /></div>
                    <h2>Вход в систему</h2>
                    <span>Система профориентации для школьников, студентов и специалистов</span>
                </div>

                <form className="login-form-cols" onSubmit={handleSubmit} noValidate>
                    <div className="login-form-row">
                        <FormField inputLabel={"Почта или логин"}
                            inputIcon={<UserRound size={20} />}
                            inputPlaceholder={"example@gmail.com или логин"}
                            name="identifier"
                            autoComplete="username"
                            inputValue={formData.identifier}
                            error={errors.identifier}
                            inputOnChange={updateField("identifier")} />
                    </div>

                    <div className="login-form-row">
                        <FormField inputLabel={"Пароль"}
                            inputIcon={<KeyRound size={20} />}
                            inputType={"password"}
                            name="password"
                            autoComplete="current-password"
                            isPassword={true}
                            inputValue={formData.password}
                            error={errors.password}
                            inputOnChange={updateField("password")} />
                    </div>

                    <div className="login-form-row">
                        <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Входим…" : "Войти"} icon={<DoorOpen />} />
                        <Button type="button" variant="tertiary" label="Создать аккаунт" disabled={isSubmitting} onClick={handleBackToRegisterPage} icon={<UserRoundPlus />} />
                    </div>
                </form>
            </div>
        </div>
    )
}