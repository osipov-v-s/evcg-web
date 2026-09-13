import { MailOpen, KeyRound, Repeat, CheckCheck, ArrowLeft } from "lucide-react"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { FieldInput } from "../../ui/reusable/fieldInput";
import { Button } from "../../ui/reusable/button"
import toast, { Toaster } from "react-hot-toast"
import { AccountForm } from "../../../types/account/account";
import { Checkbox } from "../../ui/reusable/checkbox";
import { useNavigate } from "react-router-dom";
import { AuthBrand } from "../AuthBrand";
import { AuthSocialButtons } from "../AuthSocialButtons";

type UserType = "Школьник" | "Специалист" | "Эксперт"
interface RegistrationFormProps {
    userType: UserType
    account: AccountForm
    setAccount: Dispatch<SetStateAction<AccountForm>>
    handleRegistration: () => void
    handleBack: () => void
    isSubmitting?: boolean
}
export const RegistrationForm = ({ userType, account, setAccount, handleRegistration, handleBack, isSubmitting = false }: RegistrationFormProps) => {
    const navigate = useNavigate()
    const [privacyPoliceChecked, setPrivacyPoliceChecked] = useState(false)
    const [userAgreementChecked, setUserAgreementChecked] = useState(false)

    const updateField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAccount(prev => ({ ...prev, [name]: value }))
    }
    const startRegistration = (event: FormEvent) => {
        event.preventDefault()
        if (isSubmitting) return
        if (account.email === "" || account.password === "" || account.repeatPassword == "") {
            toast.error("Заполните все поля")
            return
        }
        if (account.password !== account.repeatPassword) {
            toast.error("Пароли не совпадают")
            return
        }
        if (!privacyPoliceChecked || !userAgreementChecked) {
            toast.error("Пожалуйста подтвердите согласие")
            return
        }
        handleRegistration()
    }
    return (<>
        <form className="auth-container" onSubmit={startRegistration}>
            <div className="registration-container">
                <div className="registration-header">
                    <AuthBrand />
                    <span className="auth-role-badge">{userType}</span>
                    <h2>Создайте аккаунт</h2>
                    <span>Заполните электронную почту и придумайте пароль.</span>
                </div>

                <div className="registrarion-form-cols">
                    <div className="registration-form-row">
                        <FieldInput inputLabel={"Электронная почта"}
                            inputIcon={<MailOpen size={20} />}
                            inputPlaceholder={"example@gmail.com"}
                            inputValue={account.email}
                            name="email"
                            autoComplete="email"
                            onChange={(e) => updateField(e)} />
                    </div>

                    <div className="registration-form-row">
                        <FieldInput inputLabel={"Пароль"}
                            inputIcon={<KeyRound size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={account.password}
                            name="password"
                            autoComplete="new-password"
                            onChange={(e) => updateField(e)} />

                        <FieldInput inputLabel={"Повторите пароль"}
                            inputIcon={<Repeat size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={account.repeatPassword}
                            name="repeatPassword"
                            autoComplete="new-password"
                            onChange={(e) => updateField(e)} />
                    </div>

                    <div className="registration-form-row">
                        <Checkbox
                            checked={privacyPoliceChecked}
                            onChange={(e) => setPrivacyPoliceChecked(e.target.checked)}
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

                        <Checkbox
                            checked={userAgreementChecked}
                            onChange={(e) => setUserAgreementChecked(e.target.checked)}
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
                    </div>

                    <div className="registration-form-row">
                        <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Регистрируем…" : "Зарегистрироваться"} icon={<CheckCheck />} />
                        <Button type="button" disabled={isSubmitting} label="Назад" variant="tertiary" onClick={handleBack} icon={<ArrowLeft />} />
                    </div>
                </div>
                <div className="auth-divider"><span>или зарегистрируйтесь через</span></div>
                <AuthSocialButtons />
                <p className="auth-switch">Уже есть аккаунт? <button type="button" onClick={() => navigate("/login")}>Войти</button></p>
            </div>
        </form>
        <Toaster />
    </>)
}
