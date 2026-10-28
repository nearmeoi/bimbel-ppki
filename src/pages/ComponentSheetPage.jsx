import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Chip, ProgressChip } from '../components/ui/Chip';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Avatar } from '../components/ui/Avatar';
import { MedalBadge } from '../components/ui/MedalBadge';
import { OutlineCard } from '../components/cards/OutlineCard';
import { SubjectCard } from '../components/cards/SubjectCard';
import { StatCard } from '../components/cards/StatCard';
import { RankRow } from '../components/cards/RankRow';
import { InsightCard } from '../components/cards/InsightCard';
import { TabCutCard } from '../components/cards/TabCutCard';
import { TargetHarianWidget } from '../features/dashboard/TargetHarianWidget';
import AssetPlaceholder from '../components/ui/AssetPlaceholder';
import Sticker, {
  StickerStar,
  StickerLightning,
  StickerCheck,
  StickerMedal,
  StickerGraduation,
  StickerPencil,
  StickerSquiggle,
  StickerSparkle,
} from '../components/ui/StickerPack';
import { useToast } from '../components/ui/Toast';
import { ArrowLeft, ArrowRight, Play, Sparkles, Trophy, Flame } from 'lucide-react';

/**
 * Component Sheet / Showcase Page (/komponen)
 * Dev-friendly gallery demonstrating all Bimbel UI components in all states & tokens.
 */
export const ComponentSheetPage = ({ onNavigate }) => {
  const toast = useToast();
  const [selectedChip, setSelectedChip] = useState('Semua');
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('twk');

  return (
    <div className="min-h-screen bg-bglight font-sans text-ink p-4 sm:p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
        <div>
          <button
            onClick={() => onNavigate && onNavigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </button>
          <h1 className="text-3xl sm:text-4xl font-black text-ink">
            Bimbel Design System & Component Sheet
          </h1>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            Galeri komponen lengkap: neo-brutalist (2px border hitam, radius 28px, hard shadow 4px 4px 0 #000, font Poppins).
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="accent"
            size="sm"
            onClick={() => toast.success('Toast Sukses Berhasil Ditampilkan!')}
            className="shadow-neo-sm font-black"
          >
            Trigger Toast
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. STICKER PACK (8 GEOMETRIC STICKERS)                                    */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-ink flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          1. Geometric Sticker Pack (8 Reusable Decorative Stickers)
        </h2>
        <div className="rounded-neo border-2 border-black bg-white p-6 shadow-neo grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-items-center">
          <div className="flex flex-col items-center gap-2">
            <StickerStar size={50} color="#F9FF33" rotate={-8} />
            <span className="text-xs font-black">Star (Bintang)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerLightning size={50} color="#F9FF33" rotate={12} />
            <span className="text-xs font-black">Lightning (Petir)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerCheck size={50} color="#4ADE80" rotate={-4} />
            <span className="text-xs font-black">Check (Selesai)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerMedal size={50} color="#FACC15" rotate={6} />
            <span className="text-xs font-black">Medal (#1 Juara)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerGraduation size={50} color="#2239E5" rotate={-8} />
            <span className="text-xs font-black">Graduation (Toga)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerPencil size={50} color="#F9FF33" rotate={25} />
            <span className="text-xs font-black">Pencil (Latihan)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerSquiggle size={56} color="#000000" rotate={0} />
            <span className="text-xs font-black">Squiggle (Panah)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StickerSparkle size={46} color="#F472B6" rotate={15} />
            <span className="text-xs font-black">Sparkle (Kilau)</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ASSET PLACEHOLDERS                                                     */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-ink">
          2. Asset Placeholders (Dashed 2px Black, Yellow Fill, Centered Label)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AssetPlaceholder
            label="ASET: Maskot 1:1"
            aspect="1:1"
            subtext="Slot Maskot Persegi"
          />
          <AssetPlaceholder
            label="ASET: Mockup CAT 16:9"
            aspect="16:9"
            subtext="Slot Mockup Ujian CAT"
          />
          <AssetPlaceholder
            label="ASET: Mockup Dashboard 16:10"
            aspect="16:10"
            subtext="Slot Browser Layar Dashboard"
          />
          <AssetPlaceholder
            label="ASET: Avatar Alumni 1:1"
            aspect="1:1"
            subtext="Slot Foto Testimoni"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BUTTONS & CHIPS                                                        */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-ink">
          3. Buttons, Chips & Badges
        </h2>
        <div className="rounded-neo border-2 border-black bg-white p-6 shadow-neo space-y-6">
          {/* Button Variants */}
          <div>
            <h3 className="text-sm font-black uppercase text-gray-500 mb-3">
              Button Variants (Min 44px Touch Target)
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="md">Primary Blue</Button>
              <Button variant="accent" size="md">Accent Yellow</Button>
              <Button variant="secondary" size="md">Secondary Surface</Button>
              <Button variant="outline" size="md">Outline Card</Button>
              <Button variant="danger" size="md">Danger Red</Button>
              <Button variant="primary" size="md" disabled>Disabled State</Button>
              <Button variant="accent" size="md" rightIcon={<ArrowRight size={18} />}>
                With Icon
              </Button>
            </div>
          </div>

          {/* Chips */}
          <div>
            <h3 className="text-sm font-black uppercase text-gray-500 mb-3">
              Filter Chips
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Semua', 'TWK', 'TIU', 'TKP', 'Favorit'].map((c) => (
                <Chip
                  key={c}
                  label={c}
                  selected={selectedChip === c}
                  onClick={() => setSelectedChip(c)}
                />
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-sm font-black uppercase text-gray-500 mb-3">
              Badges
            </h3>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="pro">PRO</Badge>
              <Badge variant="accent">3 Hari Lagi</Badge>
              <Badge variant="twk">TWK (Wawasan Kebangsaan)</Badge>
              <Badge variant="tiu">TIU (Intelegensia)</Badge>
              <Badge variant="tkp">TKP (Karakteristik)</Badge>
              <MedalBadge medal="gold" size="md" />
              <MedalBadge medal="silver" size="md" />
              <MedalBadge medal="bronze" size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SUBJECT CARDS (TWK, TIU, TKP)                                          */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-ink">
          4. Subject Cards (TWK Yellow, TIU Pink, TKP Blue-tint, ~25% Shape Width)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <SubjectCard
            title="Tes Wawasan Kebangsaan"
            code="TWK"
            current={1}
            total={8}
            lastScore="118/150"
            time="1 jam yang lalu"
            onClick={() => toast.info('Klik Materi TWK')}
          />
          <SubjectCard
            title="Tes Intelegensia Umum"
            code="TIU"
            current={2}
            total={10}
            lastScore="135/175"
            time="3 jam yang lalu"
            onClick={() => toast.info('Klik Materi TIU')}
          />
          <SubjectCard
            title="Tes Karakteristik Pribadi"
            code="TKP"
            current={3}
            total={12}
            lastScore="180/225"
            time="Kemarin"
            onClick={() => toast.info('Klik Materi TKP')}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SIDEBAR WIDGETS & STAT CARDS                                           */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-ink">
          5. Sidebar Widgets, Stat Cards & Insight Card
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Target Harian */}
          <TargetHarianWidget
            completed={20}
            target={30}
            streakDays={5}
            onContinue={() => toast.info('Lanjut Target Harian')}
          />

          {/* Metric Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard value="240" label="Soal Dikerjakan" />
            <StatCard value="410" label="Rata-rata Skor" sublabel="dari 550" />
            <StatCard value="5" label="Streak Hari" icon={<Flame className="w-5 h-5 text-orange-500" />} />
            <StatCard value="94%" label="Akurasi Jawaban" />
          </div>

          {/* Pinned User Rank Row */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-500">
              Rank Row: Normal & Pinned User #42
            </h4>
            <RankRow
              rank={1}
              name="Aditya Pratama"
              twk={140}
              tiu={155}
              tkp={205}
              totalScore={500}
            />
            <RankRow
              rank={42}
              name="Budi Santoso"
              twk={110}
              tiu={125}
              tkp={175}
              totalScore={410}
              deltaText="▲ 3 minggu ini"
              isCurrentUser={true}
            />
          </div>
        </div>

        {/* Insight Card */}
        <div className="mt-4">
          <InsightCard
            title="Peningkatan pesat terlihat pada materi TKP Anda!"
            description="Untuk hasil yang lebih maksimal di ujian asli nanti, tingkatkan porsi latihan soal TWK (terutama penalaran sejarah & pilar negara) serta asah kecepatan hitung numerik pada modul TIU."
            onAction={() => toast.info('Mulai Latihan TKP')}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FORM INPUTS & PROGRESS                                                 */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-ink">
          6. Form Inputs & Progress Indicators
        </h2>
        <div className="rounded-neo border-2 border-black bg-white p-6 shadow-neo grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama Anda..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Gunakan nama sesuai KTP untuk sertifikat try out"
            />
            <Select
              label="Pilih Modul Soal"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'twk', label: 'TWK - Wawasan Kebangsaan' },
                { value: 'tiu', label: 'TIU - Intelegensia Umum' },
                { value: 'tkp', label: 'TKP - Karakteristik Pribadi' },
              ]}
            />
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-gray-600 block mb-1">
                Progress Bar TWK (75%)
              </span>
              <ProgressBar value={75} max={100} color="accent" height="h-3" />
            </div>

            <div>
              <span className="text-xs font-bold text-gray-600 block mb-1">
                Progress Bar TIU (50%)
              </span>
              <ProgressBar value={50} max={100} color="primary" height="h-3" />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-3">
                <ProgressRing progress={67} size={64} strokeWidth={6} strokeColor="#2239E5" />
                <span className="text-xs font-bold text-ink">Target 67%</span>
              </div>
              <div className="flex items-center gap-3">
                <ProgressRing progress={90} size={64} strokeWidth={6} strokeColor="#4ADE80" />
                <span className="text-xs font-bold text-ink">Akurasi 90%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentSheetPage;
