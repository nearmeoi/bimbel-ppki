import React from 'react';

/**
 * Neo-brutalist Badge Component
 * @param {Object} props
 * @param {'surface' | 'accent' | 'primary' | 'twk' | 'tiu' | 'tkp' | 'success' | 'warning' | 'danger' | 'pro'} [props.variant='surface']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {string} [props.customColor] - Direct Tailwind color classes if needed for backward compatibility
 */
export const Badge = ({
  children,
  variant = 'surface',
  className = '',
  customColor,
}) => {
  const variantStyles = {
    surface: 'bg-surfacelight text-black border border-black/15',
    accent: 'bg-accent text-black border border-black',
    primary: 'bg-blue-100 text-primary border border-primary/30',
    twk: 'bg-red-100 text-red-800 border border-red-300',
    tiu: 'bg-blue-100 text-blue-800 border border-blue-300',
    tkp: 'bg-green-100 text-green-800 border border-green-300',
    success: 'bg-green-100 text-green-700 border border-green-300',
    warning: 'bg-amber-100 text-amber-800 border border-amber-300',
    danger: 'bg-red-100 text-red-700 border border-red-300',
    pro: 'bg-white text-primary px-2 py-0.5 font-extrabold tracking-wide border border-black/20',
  };

  const styleClass = customColor || variantStyles[variant] || variantStyles.surface;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold leading-none select-none ${styleClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
