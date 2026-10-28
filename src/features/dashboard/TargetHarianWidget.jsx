import React from 'react';
import { Flame, ArrowRight, Target } from 'lucide-react';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { OutlineCard } from '../../components/cards/OutlineCard';

/**
 * Target Harian Widget for Dashboard Right Column
 * Conforms to prompt:
 * - "small outlined card with a progress ring '20/30 soal hari ini', streak flame, and a 'Selesaikan 10 soal lagi' hint."
 */
export const TargetHarianWidget = ({
  completed = 20,
  target = 30,
  streakDays = 5,
  onContinue,
  className = '',
}) => {
  const remaining = Math.max(0, target - completed);
  const percentage = Math.min(100, Math.round((completed / target) * 100));

  return (
    <OutlineCard className={`p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-accent shadow-neo-sm">
            <Target className="h-4 w-4 text-ink" />
          </div>
          <span className="font-extrabold text-sm md:text-base text-ink">
            Target Harian
          </span>
        </div>

        {/* Streak Flame Badge */}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 border-black bg-orange-100 text-xs font-black text-orange-600 shadow-neo-sm">
          <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-600 animate-pulse" />
          <span>{streakDays} Hari Streak</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        {/* Progress Ring */}
        <div className="flex-shrink-0">
          <ProgressRing
            progress={percentage}
            size={76}
            strokeWidth={7}
            strokeColor="#2239E5"
            trackColor="#E5E7EB"
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-ink">{percentage}%</span>
            </div>
          </ProgressRing>
        </div>

        {/* Details & Hint */}
        <div className="flex-1 min-w-0">
          <div className="font-black text-base text-ink">
            {completed}/{target} <span className="text-xs font-bold text-gray-500">soal hari ini</span>
          </div>

          <p className="text-xs font-bold text-emerald-700 mt-0.5">
            {remaining > 0
              ? `🔥 Selesaikan ${remaining} soal lagi untuk penuhi target!`
              : '🎉 Target harian kamu sudah tercapai! Luar biasa!'}
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black bg-accent text-[12px] font-black text-ink shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer min-h-[36px]"
          >
            <span>Kerjakan Sekarang</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </OutlineCard>
  );
};

export default TargetHarianWidget;
