import React from 'react';

/**
 * Neo-brutalist Outline Card Component
 * Default: 2px black border, 28px radius (rounded-neo), hard shadow 4px 4px 0 #000 (shadow-neo)
 * Hover lift: translateY(-2px), shadow expands to 6px 6px 0 #000 (shadow-neo-hover)
 * Active: translateY(0), shadow shrinks to 0
 */
export const OutlineCard = ({
  children,
  className = '',
  hoverable = false,
  shadow = true, // default true: 4px 4px 0 #000
  onClick,
  as: Component = 'div',
  ...rest
}) => {
  const isClickable = Boolean(onClick);

  const shadowClasses = {
    true: 'shadow-neo',
    sm: 'shadow-neo-sm',
    md: 'shadow-neo',
    lg: 'shadow-neo-lg',
    false: '',
  };

  const shadowClass = shadowClasses[shadow] ?? (shadow ? 'shadow-neo' : '');

  return (
    <Component
      onClick={onClick}
      className={`
        border-2 border-black bg-white rounded-neo p-6 relative overflow-hidden text-ink
        ${shadowClass}
        ${
          hoverable || isClickable
            ? 'cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-neo-hover active:translate-y-0 active:shadow-none'
            : ''
        }
        ${className}
      `}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const Card = OutlineCard;
export default OutlineCard;
