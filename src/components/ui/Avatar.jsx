import React from 'react';
import { MedalBadge } from './MedalBadge';

/**
 * Neo-brutalist Avatar Component with Medal Badge Support
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.name='User']
 * @param {'gold' | 'silver' | 'bronze' | 1 | 2 | 3 | null} [props.medal=null]
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {string} [props.className='']
 */
export const Avatar = ({
  src,
  name = 'User',
  medal = null,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
  };

  const initial = name ? name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <div
        className={`
          ${sizes[size] || sizes.md}
          rounded-full border-2 border-black overflow-hidden bg-white flex items-center justify-center font-extrabold shadow-neo-sm
        `}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide broken image and fall back to initial
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100 text-primary">
            {initial}
          </div>
        )}
      </div>

      {medal && (
        <div className="absolute -bottom-1 -right-1 z-10">
          <MedalBadge
            rank={medal}
            size={size === 'lg' || size === 'xl' ? 'md' : 'sm'}
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
