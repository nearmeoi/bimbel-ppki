import React, { useState } from 'react';
import { TabCutCard } from '../../components/cards/TabCutCard';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

/**
 * Pengumuman Announcement Carousel Component
 * Conforms to revisions:
 * - Countdown chip: "3 hari lagi"
 * - Yellow pill "Daftar" button
 * - Carousel dots indicator + "1/3" counter
 * - Circular prev/next buttons housed inside the tab-cut notch
 */
export const PengumumanCarousel = ({ pengumuman = [], onSelectAnnouncement }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!pengumuman || pengumuman.length === 0) return null;

  const current = pengumuman[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pengumuman.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pengumuman.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 select-none">
        <h2 className="text-xl font-bold text-ink">Pengumuman</h2>
      </div>

      <TabCutCard
        onPrev={handlePrev}
        onNext={handleNext}
        className="min-h-[220px]"
      >
        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            {/* Header row with Title & Countdown chip */}
            <div className="flex items-center gap-3 pr-28 flex-wrap">
              <h3 className="text-2xl font-black text-ink leading-tight">
                {current.badge || 'Jadwal Try Out Akbar'}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black bg-accent text-xs font-black text-ink shadow-neo-sm">
                <Clock className="w-3.5 h-3.5" />
                3 hari lagi
              </span>
            </div>

            {/* Event Details Card Box & Daftar Button */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div
                onClick={() => onSelectAnnouncement && onSelectAnnouncement(current)}
                className="flex items-center gap-3 bg-surfacelight p-3 rounded-2xl border-2 border-black/10 hover:border-black cursor-pointer transition-colors max-w-xl"
              >
                {/* Date Square Badge */}
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex flex-col items-center justify-center font-bold flex-shrink-0 border-2 border-black shadow-neo-sm">
                  <span className="text-[10px] uppercase leading-tight font-black tracking-wider">
                    {current.date?.month || 'NOV'}
                  </span>
                  <span className="text-lg leading-none font-black">
                    {current.date?.day || '30'}
                  </span>
                </div>

                {/* Event text */}
                <div className="min-w-0">
                  <div className="font-extrabold text-sm md:text-base text-ink leading-snug truncate">
                    {current.title}
                  </div>
                  <div className="text-xs text-gray-600 font-medium mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {current.time}
                  </div>
                </div>
              </div>

              {/* Yellow Pill "Daftar" Button */}
              <button
                type="button"
                onClick={() => onSelectAnnouncement && onSelectAnnouncement(current)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border-2 border-black bg-accent text-ink font-black text-sm shadow-neo hover:shadow-neo-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all focus-visible:ring-3 focus-visible:ring-accent min-h-[44px] cursor-pointer"
              >
                <span>Daftar</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Description & Pagination row (Dots + 1/3) */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-600 font-medium line-clamp-1 max-w-md">
              {current.description}
            </span>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Carousel Dots */}
              <div className="flex items-center gap-1.5" aria-label="Navigasi Pengumuman">
                {pengumuman.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full border border-black transition-all ${
                      idx === currentIndex
                        ? 'w-6 bg-primary'
                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Text indicator */}
              <span className="font-mono font-bold text-xs text-ink bg-gray-100 px-2 py-0.5 rounded-md border border-black/20">
                {currentIndex + 1}/{pengumuman.length}
              </span>
            </div>
          </div>
        </div>
      </TabCutCard>
    </div>
  );
};

export default PengumumanCarousel;
