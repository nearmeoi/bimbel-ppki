import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

/**
 * Bimbel Subject Card Component
 * Conforms to revisions:
 * - 3 subjects (TWK, TIU, TKP)
 * - Title + real progress bar + "Progres: 1/8 bab" + "Skor terakhir: 118/150" + "1 jam yang lalu"
 * - Clickable "Lanjut" arrow button
 * - Decorative geometric shape reduced to ~25% card width with distinct accents:
 *     TWK: neon yellow (#F9FF33)
 *     TIU: pink (#F472B6)
 *     TKP: blue-tint (#93C5FD)
 * - Whole card is clickable with hover lift
 */
export const SubjectCard = ({
  title = 'Tes Wawasan Kebangsaan',
  code = 'TWK',
  current = 1,
  total = 8,
  lastScore = '118/150',
  time = '1 jam yang lalu',
  onClick,
  className = '',
}) => {
  const percent = Math.min(100, Math.round((current / (total || 1)) * 100));

  // Shape configs per subject
  const shapeConfig = {
    TWK: {
      color: '#F9FF33',
      badgeBg: 'bg-accent',
      path: 'M 35 0 L 100 0 L 100 220 L 15 220 C 45 160 10 110 50 65 C 65 40 50 15 35 0 Z',
      accentColor: 'accent',
    },
    TIU: {
      color: '#F472B6',
      badgeBg: 'bg-pink',
      path: 'M 25 0 L 100 0 L 100 220 L 40 220 Q 5 150 45 110 Q 75 70 25 0 Z',
      accentColor: 'pink',
    },
    TKP: {
      color: '#93C5FD',
      badgeBg: 'bg-blue-300',
      path: 'M 40 0 L 100 0 L 100 220 L 10 220 C 50 160 5 120 40 60 Z',
      accentColor: 'blue',
    },
  }[code] || {
    color: '#F9FF33',
    badgeBg: 'bg-accent',
    path: 'M 35 0 L 100 0 L 100 220 L 15 220 C 45 160 10 110 50 65 Z',
    accentColor: 'accent',
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className={`
        border-2 border-black bg-white rounded-neo p-6 relative overflow-hidden
        cursor-pointer group select-none flex flex-col justify-between min-h-[220px]
        shadow-neo transition-all duration-150 hover:-translate-y-0.5 hover:shadow-neo-hover active:translate-y-0 active:shadow-none
        focus-visible:ring-3 focus-visible:ring-accent
        ${className}
      `}
    >
      {/* Decorative Geometric Accent (~25% width on the right) */}
      <svg
        className="absolute right-0 top-0 bottom-0 h-full w-[26%] pointer-events-none z-0"
        viewBox="0 0 100 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={shapeConfig.path}
          fill={shapeConfig.color}
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      {/* Top section: Subject badge & Title */}
      <div className="relative z-10 pr-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border-2 border-black text-xs font-black uppercase text-black ${shapeConfig.badgeBg} shadow-neo-sm`}>
            {code}
          </span>
          <span className="flex items-center text-[12px] font-medium text-gray-600 gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            {time}
          </span>
        </div>

        <h3 className="text-[19px] sm:text-[20px] font-extrabold leading-tight text-ink group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>

      {/* Middle & Bottom section: Progress bar, stats, Lanjut button */}
      <div className="relative z-10 mt-4 space-y-3">
        {/* Real Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[12px] font-bold text-ink">
            <span>Progres: {current}/{total} bab</span>
            <span>{percent}%</span>
          </div>
          <ProgressBar
            value={current}
            max={total}
            color={code === 'TWK' ? 'accent' : code === 'TIU' ? 'primary' : 'primary'}
            height="h-2.5"
            className="w-[85%]"
          />
        </div>

        {/* Footer row: last score and clickable arrow button */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-200">
          <div className="text-[12px]">
            <span className="text-gray-500 font-medium">Skor terakhir: </span>
            <span className="font-extrabold text-ink">{lastScore}</span>
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black bg-white shadow-neo-sm group-hover:bg-accent group-hover:translate-x-0.5 transition-all text-xs font-bold text-ink"
            aria-label={`Lanjutkan materi ${title}`}
          >
            <span>Lanjut</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
