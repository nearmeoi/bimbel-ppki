import React from 'react';
import { ArrowRight, Sparkles, Brain } from 'lucide-react';

/**
 * Bimbel Signature Gradient Insight Card Component
 * Conforms to revisions:
 * - Gradient darkened to #6D7CF5 -> #4A5CE8 for WCAG AA text contrast
 * - CTA button: "Latihan TKP Sekarang"
 * - Neo-brutalist border-2 border-black & shadow-neo
 */
export const InsightCard = ({
  title = 'Peningkatan pesat terlihat pada materi TKP Anda!',
  description = 'Untuk hasil yang lebih maksimal di ujian asli nanti, tingkatkan porsi latihan soal TWK (terutama penalaran sejarah & pilar negara) serta asah kecepatan hitung pada modul TIU.',
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`
        border-2 border-black rounded-neo p-6 text-white relative overflow-hidden shadow-neo
        transition-all duration-150 hover:-translate-y-0.5 hover:shadow-neo-hover
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, #6D7CF5 0%, #4A5CE8 100%)',
      }}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 relative z-10">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-black bg-accent text-[11px] font-black uppercase text-ink shadow-neo-sm mb-2.5">
            <Sparkles className="w-3 h-3 text-ink" />
            Rekomendasi Pintar
          </div>

          <h3 className="text-lg md:text-xl font-black mb-2 leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            {title}
          </h3>

          <p className="text-xs md:text-sm leading-relaxed font-medium text-white/95">
            {description}
          </p>

          <div className="mt-4">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-accent text-ink text-xs md:text-sm font-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all focus-visible:ring-3 focus-visible:ring-accent min-h-[44px] cursor-pointer"
            >
              <span>Tingkatkan Kemampuan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Insight Vector Badge */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-black bg-accent p-2.5 text-ink shadow-neo flex flex-col items-center justify-center select-none rotate-2">
            <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-neo-sm mb-1.5">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-center leading-tight">
              AI PREDIKSI
            </div>
            <div className="text-[9px] font-bold text-gray-700 text-center">
              Akurasi 98%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
