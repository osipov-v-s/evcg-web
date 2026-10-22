import { useNavigate } from "react-router-dom"
import { AuthCredentials } from "../../types/account/authCredentials"
import { buildCredentials, getRegistrationMode, hasErrors, LOGIN_HINT, PASSWORD_HINT, RegistrationField, RegistrationFormErrors, validateRegistrationForm } from "../../utils/authValidations"
import { FormEvent, useRef, useState } from "react"
import { parseApiError } from "../../utils/apiError"
import { notifyError, notifySuccess } from "../../utils/notify"
import { ArrowLeft, CheckCheck, GraduationCap, KeyRound, MailOpen, Repeat, UserRound } from "lucide-react"
import { FieldError, FormField } from "../ui/reusable/FormField"
import { Checkbox } from "../ui/reusable/checkbox"
import { Button } from "../ui/reusable/button"

type UserType = "schoolboy" | "specialist"

interface RegistrationProps {
    userType: UserType
    onSubmit: (credentials: AuthCredentials) => Promise<void>
    onSuccess?: () => void
}

type TextField = "email" | "login" | "password" | "repeatPassword"

const ERRORS_RESET_BY: Record<TextField, RegistrationField[]> = {
    email: ["email", "identifier"],
    login: ["login", "identifier"],
    password: ["password", "repeatPassword"],
    repeatPassword: ["repeatPassword"]
}

export const RegisterPage = ({ userType, onSubmit, onSuccess }: RegistrationProps) => {
    const navigate = useNavigate()
    const [values, setValues] = useState<Record<TextField, string>>({
        email: "",
        login: "",
        password: "",
        repeatPassword: "",
    })
    const [privacyAccepted, setPrivacyAccepted] = useState(false)
    const [agreementAccepted, setAgreementAccepted] = useState(false)
    const [errors, setErrors] = useState<RegistrationFormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submittingRef = useRef(false)

    const emailFilled = values.email.trim() !== ""
    const loginFilled = values.login.trim() !== ""

    const clearErrors = (...fields: RegistrationField[]) => {
        setErrors(prev => {
            if (!fields.some(field => prev[field])) return prev
            const next = { ...prev }
            fields.forEach(field => delete next[field])
            return next
        })
    }

    const updateField = (field: TextField) => (value: string) => {
        setValues(prev => ({ ...prev, [field]: value }))
        clearErrors(...ERRORS_RESET_BY[field])
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (submittingRef.current) return

        const validationErrors = validateRegistrationForm({
            ...values,
            privacyAccepted,
            agreementAccepted,
        })

        const mode = getRegistrationMode(values)
        if (hasErrors(validationErrors) || !mode) {
            setErrors(validationErrors)
            return
        }

        const identifier = mode === "email" ? values.email : values.login
        let succeeded = false

        try {
            submittingRef.current = true
            setIsSubmitting(true)
            setErrors({})

            await onSubmit(buildCredentials(mode, identifier, values.password))
            succeeded = true

        } catch (error) {
            console.error("Registration failed:", error)
            const parsed = parseApiError(error, { action: "register", mode })
            notifyError(parsed.message)

            const serverErrors: RegistrationFormErrors = {}
            if (parsed.fieldErrors.identifier) serverErrors[mode] = parsed.fieldErrors.identifier
            if (parsed.fieldErrors.password) serverErrors.password = parsed.fieldErrors.password
            setErrors(serverErrors)

        } finally {
            submittingRef.current = false
            setIsSubmitting(false)
        }

        if (succeeded) {
            notifySuccess("Вы успешно зарегистрировались")
            onSuccess?.()
        }
    }

    const handleBackToLoginPage = () => {
        navigate("/login")
    }

    return (
        <form className="auth-container" onSubmit={handleSubmit} noValidate>
            <div className="registration-container">
                <div className="registration-header">
                    <div className="registration-icon"><GraduationCap size={34} /></div>
                    <h2>Регистрация</h2>
                    <span>{userType}</span>
                </div>

                <div className="registrarion-form-cols">
                    <div className="registration-form-row">
                        <p className="form-group-title">Регистрация по Логину или Почте</p>
                    </div>

                    <div className="registration-form-row">
                        <FormField inputLabel={"Логин"}
                            inputIcon={<UserRound size={20} />}
                            inputPlaceholder={"ivan_petrov"}
                            inputValue={values.login}
                            name="login"
                            autoComplete="off"
                            isDisabled={emailFilled}
                            error={errors.login}
                            hint={emailFilled ? "Недоступно, пока заполнена почта" : LOGIN_HINT}
                            inputOnChange={updateField("login")} />

                        <FormField inputLabel={"Электронная почта"}
                            inputIcon={<MailOpen size={20} />}
                            inputPlaceholder={"example@gmail.com"}
                            inputValue={values.email}
                            name="email"
                            autoComplete="email"
                            isDisabled={loginFilled}
                            error={errors.email}
                            hint={loginFilled ? "Недоступно, пока заполнен логин" : undefined}
                            inputOnChange={updateField("email")} />
                    </div>

                    <FieldError message={errors.identifier} />

                    <div className="registration-form-row">
                        <FormField inputLabel={"Пароль"}
                            inputIcon={<KeyRound size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={values.password}
                            name="password"
                            autoComplete="new-password"
                            error={errors.password}
                            hint={PASSWORD_HINT}
                            inputOnChange={updateField("password")} />

                        <FormField inputLabel={"Повторите пароль"}
                            inputIcon={<Repeat size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={values.repeatPassword}
                            name="repeatPassword"
                            autoComplete="new-password"
                            error={errors.repeatPassword}
                            inputOnChange={updateField("repeatPassword")} />
                    </div>

                    <div className="registration-form-row">
                        <div className="form-field">
                            <Checkbox
                                checked={privacyAccepted}
                                onChange={(e) => {
                                    setPrivacyAccepted(e.target.checked)
                                    clearErrors("privacyAccepted")
                                }}
                                label={<>
                                    Я согласен с{" "}
                                    <a
                                        href="/documents/privacy_profivector.docx"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}>
                                        политикой конфиденциальности
                                    </a>
                                </>} />
                            <FieldError message={errors.privacyAccepted} />
                        </div>

                        <div className="form-field">
                            <Checkbox
                                checked={agreementAccepted}
                                onChange={(e) => {
                                    setAgreementAccepted(e.target.checked)
                                    clearErrors("agreementAccepted")
                                }}
                                label={<>
                                    Я согласен с{" "}
                                    <a
                                        href="/documents/user_agreement_profivector.docx"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}>
                                        пользовательским соглашением
                                    </a>
                                </>} />
                            <FieldError message={errors.agreementAccepted} />
                        </div>
                    </div>

                    <div className="registration-form-row">
                        <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Регистрируем…" : "Зарегистрироваться"} icon={<CheckCheck />} />
                        <Button type="button" disabled={isSubmitting} label="Назад" variant="tertiary" onClick={handleBackToLoginPage} icon={<ArrowLeft />} />
                    </div>
                </div>
            </div>
        </form>
    )
}