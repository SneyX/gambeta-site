import { ButtonHTMLAttributes } from 'react'
import Image from 'next/image'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  title: string
  icon?: string
  variant: string
  onClick?: () => void
  full?: boolean
  disabled?: boolean
}

const Button = ({
  type = 'button',
  title,
  icon,
  variant,
  onClick,
  full,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant} ${
        full && 'w-full'
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">
        {title}
      </label>
    </button>
  )
}

export default Button