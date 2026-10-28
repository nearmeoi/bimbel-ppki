import React, { forwardRef } from 'react';

/**
 * Neo-brutalist Input Component
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.fullWidth=true]
 * @param {string} [props.className='']
 * @param {string} [props.id]
 */
export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon = null,
      rightIcon = null,
      fullWidth = true,
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`${fullWidth ? 'w-full' : ''} flex flex-col gap-1.5`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-ink cursor-pointer select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 pointer-events-none text-gray-500 flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`
              w-full border-2 border-black rounded-full py-3 text-sm md:text-base font-medium text-ink bg-white
              transition-colors duration-150 min-h-[44px]
              placeholder:text-gray-400
              focus:outline-none focus:ring-3 focus:ring-accent focus:border-black
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-11' : 'pl-5'}
              ${rightIcon ? 'pr-11' : 'pr-5'}
              ${error ? 'border-red-500 bg-red-50/50' : 'border-black'}
              ${className}
            `}
            {...rest}
          />

          {rightIcon && (
            <div className="absolute right-4 text-gray-500 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs font-semibold text-red-600 mt-0.5">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
