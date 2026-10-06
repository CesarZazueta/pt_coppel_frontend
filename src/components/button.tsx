import React, { type MouseEventHandler, type ReactNode } from 'react'

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
}) => {
  const baseStyles =
    'h-9 rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out inline-flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-300'

  const variantStyles: Record<string, string> = {
    primary: 'bg-[#00AAFF] text-black hover:bg-sky-600 border border-transparent',
    secondary: 'bg-[#EBEEF7] text-[#191F33] hover:bg-violet-200 border border-transparent',
    outline: 'bg-transparent text-[#7D8592] border border-[#D8E0F0] hover:bg-[#D8E0F0]',
  }

  return (
    <button
      className={cn(baseStyles, !disabled && variantStyles[variant], className)}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button