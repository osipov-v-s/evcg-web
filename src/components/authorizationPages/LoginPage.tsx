import "./css/authStyle.css"

import { FC, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, MailOpen } from "lucide-react"

import { Button } from "../ui/reusable/button";
import { authApi } from "../../services/api/authApi";
import { useAuth } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { FieldInput } from "../ui/reusable/fieldInput";
import { AuthBrand } from "./AuthBrand";
import { AuthSocialButtons } from "./AuthSocialButtons";

export const LoginPage: FC = () => {
    const navigate = useNavigate()
    const { login, setRoles } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const updateField = useCallback((field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (isSubmitting) return

        try {
            setIsSubmitting(true)
            const token = await authApi.login(formData.email, formData.password)
            const roles = await authApi.getRoles(token)

            login(token)
            setRoles(roles)

            navigate("/")

        } catch (error) {
            console.error("Login failed:", error)
            toast.error("Возникла ошибка при входе")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="login-container">
                <div className="login-header">
                    <AuthBrand />
                    <h2>С возвращением!</h2>
                    <span>Войдите в свой аккаунт, чтобы продолжить диагностику и посмотреть результаты.</span>
                </div>

                <form className="login-form-cols" onSubmit={handleSubmit}>
                    <div className="login-form-row">
                        <FieldInput inputLabel={"Электронная почта"}
                            inputIcon={<MailOpen size={20} />}
                            inputPlaceholder={"example@gmail.com"}
                            name="email"
                            autoComplete="email"
                            inputValue={formData.email}
                            inputOnChange={updateField("email")} />
                    </div>

                    <div className="login-form-row">
                        <FieldInput inputLabel={"Пароль"}
                            inputIcon={<KeyRound size={20} />}
                            inputType={"password"}
                            name="password"
                            autoComplete="current-password"
                            isPassword={true}
                            inputValue={formData.password}
                            inputOnChange={updateField("password")} />
                        <div className="auth-help-row"><button type="button" onClick={() => toast("Восстановление пароля будет подключено позже.")}>Забыли пароль?</button></div>
                    </div>

                    <div className="login-form-row">
                        <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Входим…" : "Войти"} icon={<ArrowRight size={18} />} />
                    </div>
                </form>

                <div className="auth-divider"><span>или войдите через</span></div>
                <AuthSocialButtons />
                <p className="auth-switch">Нет аккаунта? <button type="button" onClick={() => navigate("/register")}>Зарегистрироваться</button></p>
            </div>

            <Toaster />
        </div>
    )
}
