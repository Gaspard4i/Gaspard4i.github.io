import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type InputProps = { as?: 'input' } & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = { as: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>
type FormFieldProps = (InputProps | TextareaProps) & {
  label: string
  error?: string
}

export default function FormField({ label, error, ...props }: FormFieldProps) {
  const inputClass = `input input-bordered w-full ${error ? 'input-error' : ''}`
  const textareaClass = `textarea textarea-bordered w-full ${error ? 'textarea-error' : ''}`
  const { as: fieldType, ...rest } = props as { as?: string } & Record<string, unknown>

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      {fieldType === 'textarea' ? (
        <textarea
          className={textareaClass}
          rows={5}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input className={inputClass} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
}
