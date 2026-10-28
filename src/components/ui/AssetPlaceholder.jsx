import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

/**
 * Neo-brutalist Asset Placeholder Component
 * Used for mascots, mockups, illustrations, stickers, screenshots.
 * Style: dashed 2px black outline, light yellow fill, prominent centered label badge.
 */
export default function AssetPlaceholder({
  label = 'ASET: Placeholder 1:1',
  aspect = '1:1', // '1:1' | '16:9' | '16:10' | '4:3' | 'auto'
  subtext,
  icon: Icon = ImageIcon,
  className = '',
  style = {},
  children,
}) {
  const aspectClasses = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-[16/9]',
    '16:10': 'aspect-[16/10]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    'auto': '',
  }[aspect] || '';

  return (
    <div
      style={style}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black bg-accent/20 p-4 transition-all hover:bg-accent/30 ${aspectClasses} ${className}`}
      role="img"
      aria-label={label}
    >
      {/* Corner brackets for architectural neo-brutalist mockup feel */}
      <div className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2 border-black" />
      <div className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2 border-black" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-black" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-black" />

      {/* Center content */}
      <div className="z-10 flex flex-col items-center justify-center gap-1.5 text-center">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white shadow-neo-sm">
            <Icon className="h-5 w-5 text-black" />
          </div>
        )}
        <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 shadow-neo-sm">
          <span className="h-2 w-2 rounded-full bg-accent border border-black animate-pulse" />
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-black">
            {label}
          </span>
        </div>
        {subtext && (
          <span className="text-[11px] font-medium text-gray-700 max-w-[200px]">
            {subtext}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
