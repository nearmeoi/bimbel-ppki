import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Neo-brutalist Select Component
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {Array<{value: string|number, label: string}>} [props.options=[]]
 * @param {React.ReactNode} [props.children]
 * @param {boolean} [props.fullWidth=true]
 * @param {string} [props.className='']
 * @param {string} [props.id]
 */
export const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      children,
      fullWidth = true,
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`${fullWidth ? 'w-full' : ''} flex flex-col gap-1.5`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-bold text-ink cursor-pointer select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={`
              w-full appearance-none border-2 border-black rounded-full pl-5 pr-11 py-3 text-sm md:text-base
              font-medium text-ink bg-white transition-colors duration-150 min-h-[44px] cursor-pointer
              focus:outline-none focus:ring-3 focus:ring-accent focus:border-black
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
              ${error ? 'border-red-500 bg-red-50/50' : 'border-black'}
              ${className}
            `}
            {...rest}
          >
            {options.length > 0
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-4 pointer-events-none text-black flex items-center justify-center">
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>

        {error && (
          <p id={`${selectId}-error`} className="text-xs font-semibold text-red-600 mt-0.5">
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

Select.displayName = 'Select';

export default Select;
