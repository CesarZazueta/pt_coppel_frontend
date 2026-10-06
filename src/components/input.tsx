import clsx from 'clsx'
import type { ChangeEvent } from 'react'

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password'
  label?: string
  value?: string | number
  name: string
  placeholder: string
  error?: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
  [key: string]: any
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  disabled,
  placeholder,
  label,
  value,
  onChange,
  error,
  icon,
  ...props
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[#344054]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-[#667085]">{icon}</span>}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            'w-full rounded-lg border border-[#D0D5DD] px-4 py-2.5 text-gray-700 placeholder:text-[#667085] focus:border-blue-200 focus:ring-2 focus:ring-blue-200 focus:outline-hidden',
            { 'pl-10': icon, 'ring-2 ring-red-200': error },
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 ml-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input