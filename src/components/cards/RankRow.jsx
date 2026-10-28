import React from 'react';
import { Avatar } from '../ui/Avatar';
import { ArrowUp } from 'lucide-react';

/**
 * Bimbel Rank Row Component
 * Conforms to revisions:
 * - Breakdown text: 12px, shown as three small labeled chips ([TWK 140] [TIU 155] [TKP 205])
 * - Pinned user row support: "Peringkat kamu: #42", yellow highlight (#F9FF33), delta indicator ("▲ 3 minggu ini")
 * - WCAG AA text contrast
 */
export const RankRow = ({
  rank,
  name,
  avatarSrc,
  twk = 100,
  tiu = 120,
  tkp = 150,
  totalScore = 410,
  isCurrentUser = false,
  deltaText = '▲ 3 minggu ini',
  variant = 'compact',
  className = '',
}) => {
  const medal = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : null;

  if (variant === 'table') {
    return (
      <tr
        className={`
          transition-colors duration-150 select-none
          ${
            isCurrentUser
              ? 'bg-accent/40 border-y-2 border-black font-extrabold shadow-inner'
              : 'border-b-2 border-gray-100 hover:bg-gray-50'
          }
          ${className}
        `}
      >
        <td className="p-4 font-extrabold text-center text-sm md:text-base">
          {rank ? `#${rank}` : '-'}
        </td>
        <td className="p-4 flex items-center gap-3">
          <Avatar src={avatarSrc} name={name} medal={medal} size="sm" />
          <div>
            <span className={`text-sm md:text-base ${isCurrentUser ? 'font-black text-ink' : 'font-bold'}`}>
              {name} {isCurrentUser && <span className="text-primary font-bold">(Anda)</span>}
            </span>
            {isCurrentUser && deltaText && (
              <span className="block text-[11px] font-bold text-emerald-700">
                {deltaText}
              </span>
            )}
          </div>
        </td>
        <td className="p-4 text-center">
          <span className="inline-block px-2 py-0.5 rounded-full border border-black bg-rose-50 text-[12px] font-bold text-ink">
            TWK {twk}
          </span>
        </td>
        <td className="p-4 text-center">
          <span className="inline-block px-2 py-0.5 rounded-full border border-black bg-pink/20 text-[12px] font-bold text-ink">
            TIU {tiu}
          </span>
        </td>
        <td className="p-4 text-center">
          <span className="inline-block px-2 py-0.5 rounded-full border border-black bg-blue-100 text-[12px] font-bold text-ink">
            TKP {tkp}
          </span>
        </td>
        <td className="p-4 text-center text-base md:text-lg font-black text-primary">
          {totalScore}
        </td>
      </tr>
    );
  }

  // Compact variant for Dashboard & widgets
  return (
    <div
      className={`
        rounded-2xl p-3 flex items-center justify-between border-2 transition-all duration-150 select-none
        ${
          isCurrentUser
            ? 'bg-accent border-black shadow-neo-sm font-bold'
            : 'bg-surfacelight border-black/10 hover:border-black'
        }
        ${className}
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative">
          <Avatar src={avatarSrc} name={name} medal={medal} size="md" />
          {rank && rank > 3 && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-[10px] font-extrabold text-ink">
              {rank}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[14px] truncate leading-tight ${isCurrentUser ? 'font-black text-ink' : 'font-bold text-ink'}`}>
              {isCurrentUser ? `Peringkat kamu: #${rank || 42}` : name}
            </span>
            {isCurrentUser && (
              <span className="inline-flex items-center gap-0.5 rounded-full border border-black bg-white px-1.5 py-0.2 text-[11px] font-black text-emerald-700 shadow-neo-sm">
                {deltaText}
              </span>
            )}
          </div>

          {/* Three small labeled chips at 12px text */}
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-black bg-white text-[12px] font-bold text-ink shadow-neo-sm">
              TWK {twk}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-black bg-white text-[12px] font-bold text-ink shadow-neo-sm">
              TIU {tiu}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-black bg-white text-[12px] font-bold text-ink shadow-neo-sm">
              TKP {tkp}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end flex-shrink-0 ml-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Total</span>
        <span className={`text-xl font-black ${isCurrentUser ? 'text-ink' : 'text-primary'}`}>
          {totalScore}
        </span>
      </div>
    </div>
  );
};

export default RankRow;
