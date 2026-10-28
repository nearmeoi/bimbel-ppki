import React from 'react';

/**
 * Neo-brutalist Progress Ring Component (Circular Progress)
 * @param {Object} props
 * @param {number} props.progress - 0 to 100
 * @param {number} [props.size=72] - diameter in pixels
 * @param {number} [props.strokeWidth=8] - stroke width in pixels
 * @param {string} [props.strokeColor='#2239E5']
 * @param {string} [props.trackColor='#EEEEEE']
 * @param {React.ReactNode} [props.children] - inner content
 * @param {string} [props.className='']
 */
export const ProgressRing = ({
  progress = 0,
  size = 72,
  strokeWidth = 8,
  strokeColor = '#2239E5',
  trackColor = '#EEEEEE',
  children,
  className = '',
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-extrabold text-sm text-ink">
        {children !== undefined ? children : `${Math.round(normalizedProgress)}%`}
      </div>
    </div>
  );
};

export default ProgressRing;
