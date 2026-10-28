import React from 'react';

/**
 * Neo-brutalist Progress Bar Component
 * @param {Object} props
 * @param {number} props.value
 * @param {number} [props.max=100]
 * @param {boolean} [props.showLabel=false]
 * @param {string} [props.label]
 * @param {'primary' | 'accent' | 'green' | 'amber' | 'red'} [props.color='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className='']
 */
export const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = false,
  label,
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    green: 'bg-emerald-500',
    amber: 'bg-amber-400',
    red: 'bg-red-500',
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
          <span>{label || 'Progres'}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div
        className={`w-full bg-surfacelight rounded-full overflow-hidden border border-black/15 ${sizeClasses[size] || sizeClasses.md}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorClasses[color] || colorClasses.primary}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
