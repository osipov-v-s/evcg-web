import { ComponentProps, FC } from "react"
import { FieldInput } from "./fieldInput"

type FieldInputProps = ComponentProps<typeof FieldInput>

export const FieldError: FC<{ message?: string }> = ({ message }) =>
    message ? <p className="field-error" role="alert">{message}</p> : null

type FormFieldProps = FieldInputProps & {
    error?: string
    hint?: string
}

export const FormField: FC<FormFieldProps> = ({ error, hint, ...inputProps }) => (
    <div className="form-field">
        <FieldInput {...(inputProps as FieldInputProps)} />
        {error
            ? <FieldError message={error} />
            : hint && <p className="field-hint">{hint}</p>}
    </div>
)
