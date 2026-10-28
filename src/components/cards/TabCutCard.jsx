import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Bimbel Signature Tab-Cut Card Component
 * Features an inverted corner notch at top-right housing circular controls with seamless, mathematically precise borders.
 */
export const TabCutCard = ({
  children,
  tabContent = null,
  onPrev,
  onNext,
  className = '',
  bgColor = '#EEEEEE',
}) => {
  const defaultTabContent = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Pengumuman Sebelumnya"
        className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center bg-white hover:bg-accent active:scale-95 transition-all focus-visible:ring-3 focus-visible:ring-accent cursor-pointer shadow-neo-sm"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Pengumuman Berikutnya"
        className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center bg-white hover:bg-accent active:scale-95 transition-all focus-visible:ring-3 focus-visible:ring-accent cursor-pointer shadow-neo-sm"
      >
        <ArrowRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {/* 
        Mathematically seamless SVG tab-cut corner
        Masks the old top-right corner with the background color and renders a continuous 2px solid black border
      */}
      <svg
        className="absolute top-0 right-0 pointer-events-none z-10 overflow-visible"
        width="134"
        height="62"
        viewBox="0 0 134 62"
        fill="none"
      >
        {/* Background mask covering the underlying white card & old borders */}
        <path
          d="M -1 -1 L 135 -1 L 135 60 L 21 60 A 20 20 0 0 1 1 40 L 1 -1 Z"
          fill={bgColor}
        />
        {/* Continuous 2px solid black border tracing the notch */}
        <path
          d="M 1 0 L 1 39 A 20 20 0 0 0 21 59 L 134 59"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
        />
      </svg>

      {/* Circular controls placed inside the notch */}
      <div className="absolute top-0 right-0 w-32 h-[58px] z-20 flex items-center justify-end pr-2">
        {tabContent || defaultTabContent}
      </div>

      {/* Main White Card Container */}
      <div className="border-2 border-black bg-white rounded-neo p-6 relative overflow-hidden h-full shadow-neo">
        {children}
      </div>
    </div>
  );
};

export default TabCutCard;
