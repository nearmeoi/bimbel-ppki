import React from 'react';

/**
 * Neo-brutalist Button Component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline-white'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {Function} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const baseStyle =
    'font-bold rounded-full border-2 border-black transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:ring-3 focus-visible:ring-accent focus-visible:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 min-h-[36px]',
    md: 'text-sm px-6 py-3 min-h-[44px]',
    lg: 'text-base md:text-lg px-8 py-3.5 min-h-[48px]',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-neo-sm active:shadow-none',
    secondary: 'bg-white text-black hover:bg-gray-50 shadow-neo-sm active:shadow-none',
    accent: 'bg-accent text-black hover:bg-accent-hover shadow-neo-sm active:shadow-none',
    ghost: 'bg-transparent text-black border-transparent hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-neo-sm active:shadow-none',
    'outline-white': 'bg-transparent text-white border-2 border-white hover:bg-white/10',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${sizeStyles[size] || sizeStyles.md}
        ${variants[variant] || variants.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
