import { useNavigate } from "react-router-dom"
import { AuthCredentials } from "../../types/account/authCredentials"
import { buildCredentials, getRegistrationMode, hasErrors, LOGIN_HINT, PASSWORD_HINT, RegistrationField, RegistrationFormErrors, validateRegistrationForm } from "../../utils/authValidations"
import { FormEvent, useRef, useState } from "react"
import { parseApiError } from "../../utils/apiError"
import { notifyError, notifySuccess } from "../../utils/notify"
import { ArrowLeft, AtSign, CheckCheck, KeyRound, Repeat, UserRound } from "lucide-react"
import { FieldError, FormField } from "../ui/reusable/FormField"
import { Checkbox } from "../ui/reusable/checkbox"
import { Button } from "../ui/reusable/button"

type UserType = "schoolboy" | "specialist"

interface RegistrationProps {
    userType: UserType
    onSubmit: (credentials: AuthCredentials) => Promise<void>
    onSuccess?: () => void
}

type TextField = "identifier" | "password" | "repeatPassword"

const ERRORS_RESET_BY: Record<TextField, RegistrationField[]> = {
    identifier: ["email", "login", "identifier"],
    password: ["password", "repeatPassword"],
    repeatPassword: ["repeatPassword"]
}

// Единое поле «почта или логин»: если есть "@" — считаем почтой, иначе логином.
const splitIdentifier = (identifier: string) => {
    const value = identifier.trim()
    const isEmail = value.includes("@")
    return {
        email: isEmail ? value : "",
        login: isEmail ? "" : value,
    }
}

export const RegisterPage = ({ userType, onSubmit, onSuccess }: RegistrationProps) => {
    const navigate = useNavigate()
    const [values, setValues] = useState<Record<TextField, string>>({
        identifier: "",
        password: "",
        repeatPassword: "",
    })
    const [privacyAccepted, setPrivacyAccepted] = useState(false)
    const [agreementAccepted, setAgreementAccepted] = useState(false)
    const [errors, setErrors] = useState<RegistrationFormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submittingRef = useRef(false)

    const identifierIsEmail = values.identifier.includes("@")
    const identifierError = errors.email ?? errors.login ?? errors.identifier

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

        const formValues = {
            ...splitIdentifier(values.identifier),
            password: values.password,
            repeatPassword: values.repeatPassword,
        }

        const validationErrors = validateRegistrationForm({
            ...formValues,
            privacyAccepted,
            agreementAccepted,
        })

        const mode = getRegistrationMode(formValues)
        if (hasErrors(validationErrors) || !mode) {
            setErrors(validationErrors)
            return
        }

        const identifier = mode === "email" ? formValues.email : formValues.login
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
        <div className="auth">
            <div className="auth-container">
                <div className="auth-header">
                    <div onClick={() => navigate("/")}>
                        <h2>ПрофиВектор</h2>
                        <span>Твой вектор в инженерное будущее</span>
                    </div>
                    <h2>Создайте аккаунт</h2>
                </div>

                <form className="auth-form-cols" onSubmit={handleSubmit} noValidate>
                    <FormField inputLabel={"Электронная почта или Логин"}
                        inputIcon={<UserRound size={20} />}
                        inputPlaceholder={"example@mail.ru или Логин"}
                        inputValue={values.identifier}
                        name="identifier"
                        autoComplete="username"
                        error={identifierError}
                        inputOnChange={updateField("identifier")} />

                    <FormField inputLabel={"Пароль"}
                        inputIcon={<KeyRound size={20} />}
                        inputPlaceholder={"Пароль"}
                        inputType={"password"}
                        isPassword={true}
                        inputValue={values.password}
                        name="password"
                        autoComplete="new-password"
                        error={errors.password}
                        inputOnChange={updateField("password")} />

                    <FormField inputLabel={"Повторите пароль"}
                        inputIcon={<Repeat size={20} />}
                        inputPlaceholder={"Повторите пароль"}
                        inputType={"password"}
                        isPassword={true}
                        inputValue={values.repeatPassword}
                        name="repeatPassword"
                        autoComplete="new-password"
                        error={errors.repeatPassword}
                        inputOnChange={updateField("repeatPassword")} />


                    <Checkbox checked={privacyAccepted}
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

                    <Checkbox checked={agreementAccepted}
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

                    <div className="auth-actions">
                        <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Регистрируем…" : "Зарегистрироваться"} icon={<CheckCheck />} />
                        <div className="auth-regsiter"><span>Уже есть аккаунт?</span><Button type="button" disabled={isSubmitting} label="Войти" variant="tertiary" onClick={handleBackToLoginPage} /></div>
                    </div>
                </form>
            </div>
        </div>
    )
}
