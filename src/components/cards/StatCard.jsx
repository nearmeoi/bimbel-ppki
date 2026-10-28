import React from 'react';

/**
 * Bimbel Metric Stat Card Component
 * Conforms to revisions:
 * - Neo-brutalist border-2 border-black, rounded-neo, shadow-neo-sm
 * - WCAG AA compliant text colors (min 12px captions)
 * - Supports sublabel (e.g. "dari 550") and flame icon
 */
export const StatCard = ({
  value,
  label,
  sublabel,
  icon = null,
  className = '',
}) => {
  return (
    <div
      className={`
        border-2 border-black bg-white rounded-neo min-w-[130px] sm:min-w-[140px] px-4 py-3 flex-1 md:flex-none
        flex flex-col justify-center items-center select-none shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 transition-all
        ${className}
      `}
    >
      <div className="text-2xl sm:text-3xl font-black text-ink flex items-center gap-1 leading-none">
        {icon}
        <span>{value}</span>
        {sublabel && (
          <span className="text-xs font-bold text-gray-500 self-end mb-0.5">
            {sublabel}
          </span>
        )}
      </div>
      <div className="text-[12px] text-gray-700 font-bold text-center leading-tight mt-1.5 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
