import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  Compass,
  Star,
  Brain,
  Check,
} from 'lucide-react';

/**
 * Production-Ready Vector Asset Renderer
 * Replaces wireframe placeholders with polished, theme-faithful neo-brutalist graphics.
 */
export default function AssetPlaceholder({
  label = '',
  aspect = '1:1',
  subtext = '',
  className = '',
  style = {},
  children,
}) {
  const normalizedLabel = (label || '').toLowerCase();
  const normalizedSubtext = (subtext || '').toLowerCase();

  // 1. MOCKUP DASHBOARD
  if (normalizedLabel.includes('mockup dashboard')) {
    return (
      <div
        style={style}
        className={`w-full rounded-2xl border-2 border-black bg-white p-4 shadow-neo-sm overflow-hidden text-ink flex flex-col justify-between ${className}`}
      >
        {/* Top Mini Bar */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-black text-xs border border-black">
              B
            </div>
            <div>
              <div className="text-xs font-black text-ink">Bimbel CPNS Portal</div>
              <div className="text-[10px] text-gray-500 font-bold">Try Out Mandiri BKN</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-black bg-accent text-[10px] font-black text-ink">
            <Sparkles size={11} /> Target: 450+
          </span>
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="p-2 rounded-xl bg-blue-50 border border-primary/30 text-center">
            <div className="text-[10px] font-bold text-gray-500">TWK</div>
            <div className="text-sm font-black text-primary">100 / 150</div>
          </div>
          <div className="p-2 rounded-xl bg-yellow-50 border border-yellow-300 text-center">
            <div className="text-[10px] font-bold text-gray-500">TIU</div>
            <div className="text-sm font-black text-ink">140 / 175</div>
          </div>
          <div className="p-2 rounded-xl bg-green-50 border border-green-300 text-center">
            <div className="text-[10px] font-bold text-gray-500">TKP</div>
            <div className="text-sm font-black text-green-700">175 / 225</div>
          </div>
        </div>

        {/* Mini Chart Simulation */}
        <div className="p-2.5 rounded-xl bg-surfacelight border border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            <span className="text-xs font-bold text-ink">Tren Skor 5 Simulasi:</span>
          </div>
          <div className="flex items-end gap-1.5 h-6">
            <div className="w-3 bg-primary/40 rounded-t h-3" />
            <div className="w-3 bg-primary/60 rounded-t h-4" />
            <div className="w-3 bg-primary/80 rounded-t h-5" />
            <div className="w-3 bg-primary rounded-t h-6" />
            <div className="w-3 bg-accent border border-black rounded-t h-6" />
          </div>
        </div>
      </div>
    );
  }

  // 2. MOCKUP UJIAN CAT
  if (normalizedLabel.includes('mockup ujian') || (normalizedLabel.includes('cat') && !normalizedLabel.includes('sticker'))) {
    return (
      <div
        style={style}
        className={`w-full rounded-2xl border-2 border-black bg-white p-4 shadow-neo-sm overflow-hidden text-ink flex flex-col justify-between ${className}`}
      >
        {/* CAT Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-gray-100">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-black border border-black">
              CAT BKN
            </span>
            <span className="text-xs font-black text-ink">Simulasi SKD Mandiri #1</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-black bg-red-100 text-red-700 text-xs font-black">
            <Clock size={12} /> 38:42
          </span>
        </div>

        {/* Question Mock Content */}
        <div className="my-3 space-y-2">
          <div className="text-xs font-black text-gray-500 uppercase">
            Soal No. 14 dari 110 (TIU - Silogisme)
          </div>
          <div className="text-xs font-bold text-ink leading-relaxed line-clamp-2">
            Semua ASN profesional berintegritas tinggi. Sebagian peserta bimbel lulus seleksi ASN. Kesimpulan yang sah adalah...
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="p-1.5 rounded-lg border border-primary bg-blue-50 text-[11px] font-bold text-primary flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-black">B</span>
              <span>Sebagian peserta bimbel berintegritas tinggi</span>
            </div>
            <div className="p-1.5 rounded-lg border border-gray-200 bg-white text-[11px] font-medium text-gray-700 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-black text-[9px] flex items-center justify-center font-bold">C</span>
              <span>Semua peserta bimbel berintegritas tinggi</span>
            </div>
          </div>
        </div>

        {/* Mini Grid Navigation */}
        <div className="flex items-center gap-1 pt-2 border-t border-gray-100 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <div
              key={n}
              className={`w-6 h-6 rounded border border-black text-[10px] font-black flex items-center justify-center flex-shrink-0 ${
                n === 4
                  ? 'bg-primary text-white'
                  : n < 4
                  ? 'bg-blue-100 text-primary'
                  : n === 7
                  ? 'bg-accent text-ink'
                  : 'bg-white text-gray-600'
              }`}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. STICKER CAT / STICKER INSIGHT
  if (normalizedLabel.includes('sticker')) {
    return (
      <div
        style={style}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-accent p-3 text-ink shadow-neo transition-all ${className}`}
      >
        <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-neo-sm mb-1.5">
          {normalizedLabel.includes('insight') ? (
            <TrendingUp className="w-5 h-5 text-primary" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-ink" />
          )}
        </div>
        <div className="text-[10px] font-black uppercase tracking-wider text-center">
          {normalizedLabel.includes('insight') ? 'ANALISIS SKOR' : 'SISTEM CAT'}
        </div>
        <div className="text-[9px] font-bold text-gray-700 text-center">
          {normalizedLabel.includes('insight') ? 'Berdasarkan Try Out' : 'Resmi BKN 2026'}
        </div>
      </div>
    );
  }

  // 4. MASKOT / KARAKTER PEJUANG ASN
  if (
    normalizedLabel.includes('maskot') ||
    normalizedLabel.includes('mascot') ||
    normalizedSubtext.includes('maskot')
  ) {
    const isSuccess = normalizedSubtext.includes('lulus') || normalizedSubtext.includes('sukses');
    const isPuzzled = normalizedSubtext.includes('bingung') || normalizedSubtext.includes('tersesat');

    return (
      <div
        style={style}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-accent p-4 text-ink shadow-neo select-none overflow-hidden ${className}`}
      >
        {/* Decorative corner stars */}
        <div className="absolute top-2 left-2 text-primary opacity-60">
          <Star size={12} fill="currentColor" />
        </div>
        <div className="absolute top-2 right-2 text-primary opacity-60">
          <Star size={12} fill="currentColor" />
        </div>

        {/* Mascot Avatar Illustration */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-neo-sm relative mb-2">
          {isSuccess ? (
            <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-amber-500 fill-amber-300" />
          ) : isPuzzled ? (
            <Compass className="w-9 h-9 sm:w-11 sm:h-11 text-primary animate-spin" />
          ) : (
            <Award className="w-9 h-9 sm:w-11 sm:h-11 text-primary fill-accent" />
          )}

          {/* Small badge overlay */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border border-black bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-neo-sm">
            {isSuccess ? <Check size={12} strokeWidth={3} /> : 'ASN'}
          </div>
        </div>

        {/* Mascot Name Badge (clean without AI pulsing green dot) */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-black bg-white px-3 py-0.5 shadow-neo-sm text-center">
          <span className="font-sans text-[11px] font-black uppercase text-ink">
            {isSuccess ? 'Siap Lulus NIP' : isPuzzled ? 'Peta Belajar' : 'Pejuang NIP 2026'}
          </span>
        </div>

        {subtext && !subtext.includes('ASET:') && (
          <span className="text-[10px] font-bold text-gray-700 text-center mt-1 max-w-[140px] truncate">
            {subtext}
          </span>
        )}
      </div>
    );
  }

  // 5. DEFAULT CLEAN EMBLEM FALLBACK
  return (
    <div
      style={style}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-white p-4 shadow-neo-sm text-ink ${className}`}
    >
      <div className="w-12 h-12 rounded-full border-2 border-black bg-accent flex items-center justify-center shadow-neo-sm mb-2">
        <Sparkles className="w-6 h-6 text-ink" />
      </div>
      <div className="font-bold text-xs text-ink text-center">
        {subtext || label || 'Bimbel CPNS'}
      </div>
      {children}
    </div>
  );
}
