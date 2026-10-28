import React from 'react';

/**
 * Neo-brutalist Medal Badge Component
 * @param {Object} props
 * @param {'gold' | 'silver' | 'bronze' | 1 | 2 | 3 | number} props.rank
 * @param {'sm' | 'md' | 'lg'} [props.size='sm']
 * @param {string} [props.className='']
 */
export const MedalBadge = ({ rank, size = 'sm', className = '' }) => {
  const getMedalType = () => {
    if (rank === 1 || rank === 'gold') return { color: 'bg-yellow-400 text-black', label: '1' };
    if (rank === 2 || rank === 'silver') return { color: 'bg-gray-300 text-black', label: '2' };
    if (rank === 3 || rank === 'bronze') return { color: 'bg-orange-400 text-black', label: '3' };
    return { color: 'bg-white text-black', label: String(rank) };
  };

  const { color, label } = getMedalType();

  const sizeClasses = {
    sm: 'w-5 h-5 text-[10px]',
    md: 'w-7 h-7 text-xs',
    lg: 'w-9 h-9 text-sm',
  };

  return (
    <div
      className={`
        rounded-full border-2 border-black flex items-center justify-center font-extrabold select-none shadow-neo-sm
        ${color}
        ${sizeClasses[size] || sizeClasses.sm}
        ${className}
      `}
      aria-label={`Peringkat ${label}`}
    >
      {label}
    </div>
  );
};

export default MedalBadge;
