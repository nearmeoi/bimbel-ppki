import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Bimbel Focus Layout Component (Distraction-Free Exam Mode)
 * @param {Object} props
 * @param {string} props.title - Exam title e.g. "Simulasi SKD Campuran Set 1"
 * @param {string} props.formattedTime - Time string e.g. "44:59"
 * @param {boolean} [props.isTimeWarning=false]
 * @param {Function} props.onFinishExam - Callback when user clicks "Akhiri Ujian"
 * @param {React.ReactNode} props.children - Question area + navigation grid
 */
export const FocusLayout = ({
  title = 'Simulasi SKD CPNS',
  formattedTime = '45:00',
  isTimeWarning = false,
  onFinishExam,
  children,
}) => {
  return (
    <div className="min-h-screen bg-bglight flex flex-col font-sans antialiased text-ink">
      {/* Minimal Sticky Header for Exam */}
      <header className="bg-white border-b-2 border-black px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-lg md:text-xl text-ink truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {title}
          </span>
        </div>

        {/* Live Timer with accessible role="timer" & aria-live */}
        <div
          role="timer"
          aria-live="polite"
          aria-label={`Sisa waktu pengerjaan: ${formattedTime}`}
          className={`
            border-2 border-black rounded-full px-4 md:px-5 py-1.5 font-mono font-bold text-base md:text-lg flex items-center gap-2 select-none transition-colors
            ${isTimeWarning ? 'bg-red-400 text-white animate-pulse' : 'bg-accent text-ink'}
          `}
        >
          <Clock size={18} className="flex-shrink-0" />
          <span>{formattedTime}</span>
        </div>

        {/* Akhiri Ujian Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onFinishExam}
          className="text-xs md:text-sm px-4 md:px-5 hover:bg-red-50 hover:border-red-500 hover:text-red-700 transition-colors"
        >
          Akhiri Ujian
        </Button>
      </header>

      {/* Main Focus Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6 lg:p-8 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default FocusLayout;
