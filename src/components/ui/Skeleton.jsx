import React from 'react';

/**
 * Neo-brutalist Skeleton Component with Shimmer Animation
 * @param {Object} props
 * @param {'text' | 'circular' | 'rectangular' | 'card'} [props.variant='rectangular']
 * @param {number|string} [props.width]
 * @param {number|string} [props.height]
 * @param {string} [props.className='']
 */
export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
}) => {
  const baseClasses =
    'animate-pulse bg-gray-200/90 relative overflow-hidden border border-black/10';

  const variantClasses = {
    text: 'h-4 rounded-full',
    circular: 'rounded-full',
    rectangular: 'rounded-neo',
    card: 'rounded-neo border-2 border-black bg-white p-6 shadow-neo-sm',
  };

  const style = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.rectangular} ${className}`}
      style={style}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
};

export default Skeleton;
