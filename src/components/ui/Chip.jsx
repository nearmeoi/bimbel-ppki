import React from 'react';

/**
 * Neo-brutalist Progress Chip (matches Stitch prototype)
 * @param {Object} props
 * @param {number|string} props.current
 * @param {number|string} props.total
 * @param {string} props.time
 * @param {string} [props.className]
 */
export const ProgressChip = ({ current, total, time, className = '' }) => (
  <div
    className={`flex items-center gap-2 text-xs font-medium text-gray-600 bg-surfacelight px-3 py-1.5 rounded-full w-fit border border-black/10 select-none ${className}`}
  >
    <span>
      Progres : {current}/{total}
    </span>
    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
    <span>{time}</span>
  </div>
);

/**
 * Generic Interactive or Static Chip
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.active=false]
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export const Chip = ({
  children,
  active = false,
  onClick,
  icon = null,
  className = '',
}) => {
  const isClickable = typeof onClick === 'function';
  const Component = isClickable ? 'button' : 'div';

  return (
    <Component
      type={isClickable ? 'button' : undefined}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-chip text-xs md:text-sm font-semibold border-2 transition-all duration-150
        ${
          active
            ? 'bg-primary text-white border-black shadow-neo-sm'
            : 'bg-surfacelight text-black border-transparent hover:border-black'
        }
        ${isClickable ? 'cursor-pointer active:scale-95' : ''}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </Component>
  );
};

export default Chip;
