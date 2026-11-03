import React from 'react';
import { Play, Sparkles, BookOpen, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../../components/cards/StatCard';

/**
 * Dashboard Header Component (Greeting + Quick Action Buttons + StatCards)
 * Layout:
 * - Title full-width across the main content area
 * - "Lanjutkan Belajar" & "Mulai Latihan Soal" placed underneath greeting
 * - Does not displace or squeeze the target harian sidebar
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
    <div className="flex flex-col gap-5 mb-4 w-full">
      {/* Top Greeting: Full width text */}
      <div className="w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black bg-accent/40 text-xs font-black uppercase text-ink shadow-neo-sm mb-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Persiapan SKD CPNS 2026
        </span>
        <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black text-ink leading-tight select-none w-full break-words">
          Selamat Datang, {userName}!
        </h1>
      </div>

      {/* Action Buttons: Ditaruh di bawah judul Selamat Datang */}
      <div className="flex items-center gap-3 flex-wrap">
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
            <span className="block font-black text-xs sm:text-sm text-ink truncate max-w-[200px] sm:max-w-[280px]">
              {continueLesson.subject} • {continueLesson.title}
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

      {/* Metrics Stat Cards Row - 3 balanced columns */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            value={stat.value}
            label={stat.label}
            sublabel={stat.sublabel}
            icon={stat.hasFlame ? <Flame className="w-5 h-5 text-orange-500 fill-orange-500 flex-shrink-0" /> : null}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHeader;
