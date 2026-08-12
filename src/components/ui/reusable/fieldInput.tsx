import "./css/fieldInputStyles.css"

import { ChangeEvent, FC, KeyboardEvent, ReactNode, useId, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

interface FieldInputProps {
    inputLabel?: string
    inputIcon?: ReactNode
    inputPlaceholder?: string
    inputType?: string
    inputValue?: string
    inputOnChange?: (value: string) => void
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void//Легаси добавил функцию для полной обработки события
    isPassword?: boolean
    isRequired?: boolean
    isDisabled?: boolean
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
    name?: string
    autoComplete?: string
}

export const FieldInput: FC<FieldInputProps> = ({ inputLabel, inputIcon, inputPlaceholder, inputType = "text", inputValue, inputOnChange, onChange, isPassword, isRequired = true, isDisabled = false, onKeyDown, name, autoComplete }) => {
    const [isVisible, setIsVisible] = useState(false)
    const generatedId = useId()
    const inputId = name || generatedId

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return
        if (onChange) 
            onChange(e)
        else
            inputOnChange?.(e.target.value)
    }

    const toggleVisibility = () => {
        if (isDisabled) return
        setIsVisible(!isVisible)
    }

    const finalType = isPassword ? (isVisible ? "text" : "password") : inputType

    return (
        <div className={`custom-input-wrapper ${isDisabled ? "input-disabled" : ""}`}>

            {inputLabel && (

                <label htmlFor={inputId}>

                    {inputLabel}

                </label>

            )}

            <div className="custom-input-container field-input">

                <input
                    id={inputId}
                    name={name}
                    type={finalType}
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    required={isRequired}
                    disabled={isDisabled}
                    autoComplete={autoComplete}
                    //Легаси, пришлось добавить еще одну функцию потому что inputChange принимает только valye, но не name
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    style={{ paddingLeft: inputIcon ? "45px" : "20px", paddingRight: isPassword ? "45px" : "20px" }} />

                {inputIcon && (

                    <div className="custom-input-icon">

                        {inputIcon}

                    </div>

                )}

                {isPassword && (

                    <button
                        type="button"
                        className="custom-input-password-visibility"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}>

                        {isVisible ? <EyeClosed size={20} /> : <Eye size={20} />}

                    </button>

                )}

            </div>

        </div>
    )
}
