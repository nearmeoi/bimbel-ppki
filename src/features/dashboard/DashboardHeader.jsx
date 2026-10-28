import React from 'react';
import { Play, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../../components/cards/StatCard';

/**
 * Dashboard Header Component (Greeting + Quick Action Buttons + StatCards)
 * Conforms to prompt:
 * - Prominent yellow pill button "Lanjutkan Belajar" with continue info e.g. "TWK · Pancasila, bab 2"
 * - Secondary "Mulai Latihan Soal" button
 * - Stat cards: 240 Soal Dikerjakan, 410 Rata-rata Skor (/550), 5 Streak Hari
 */
export const DashboardHeader = ({
  userName = 'Budi',
  stats = [],
  continueLesson = {
    subject: 'TWK',
    title: 'Pancasila, bab 2',
    route: '/materi/twk-1',
  },
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 mb-4">
      {/* Top Bar: Title & Primary/Secondary Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black bg-accent/40 text-xs font-black uppercase text-ink shadow-neo-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Persiapan SKD CPNS 2024/2025
          </span>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-black text-ink leading-tight select-none">
            Selamat Datang, {userName}!
          </h1>
        </div>

        {/* Action Buttons: Prominent Yellow Pill & Secondary Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Prominent Yellow Pill: Lanjutkan Belajar */}
          <button
            type="button"
            onClick={() => navigate(continueLesson.route || '/materi')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black bg-accent text-ink font-black text-xs sm:text-sm shadow-neo hover:shadow-neo-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all focus-visible:ring-3 focus-visible:ring-accent min-h-[44px] cursor-pointer"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-accent flex-shrink-0">
              <Play className="w-3 h-3 fill-accent ml-0.5" />
            </div>
            <div className="text-left leading-tight">
              <span className="block text-[10px] uppercase font-bold text-gray-800">
                Lanjutkan Belajar
              </span>
              <span className="block font-black text-xs sm:text-sm text-ink truncate max-w-[200px] sm:max-w-[240px]">
                {continueLesson.subject} · {continueLesson.title}
              </span>
            </div>
          </button>

          {/* Secondary Button: Mulai Latihan Soal */}
          <button
            type="button"
            onClick={() => navigate('/latihan')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black bg-white text-ink font-black text-xs sm:text-sm shadow-neo hover:shadow-neo-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all focus-visible:ring-3 focus-visible:ring-accent min-h-[44px] cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Mulai Latihan Soal</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            value={stat.value}
            label={stat.label}
            sublabel={stat.sublabel}
            icon={stat.hasFlame ? <span className="text-orange-500 animate-bounce">🔥</span> : null}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHeader;
