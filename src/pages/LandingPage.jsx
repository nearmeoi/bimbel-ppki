import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { OutlineCard } from '../components/cards/OutlineCard';
import AssetPlaceholder from '../components/ui/AssetPlaceholder';
import {
  StickerStar,
  StickerLightning,
  StickerCheck,
  StickerMedal,
  StickerSparkle,
} from '../components/ui/StickerPack';
import {
  Trophy,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  Clock,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Check,
  Star,
  Smartphone,
  Award,
  Layers,
} from 'lucide-react';

/**
 * Bimbel Public Landing Page
 * Conforms to all revisions:
 * - NO "PRO" badge on logo (per brand rule)
 * - Date-driven badge "Pendaftaran s.d. 30 Nov"
 * - Trust line: "Gratis daftar · Tanpa kartu kredit · Akses langsung ke 1 paket try out"
 * - Hero mockup: browser frame (ASET: Mockup Dashboard 16:10) + mascot slot (ASET: Maskot 1:1)
 * - Hero overlapping cards: back card fully visible, front card offset down/right
 * - 10 New Ordered Sections:
 *   1. Strip Statistik + Marquee Strip
 *   2. Kenapa Pilih Bimbel ("mirip sistem CAT BKN")
 *   3. Fitur Simulasi CAT (bullet points + Mockup Ujian CAT 16:9 + Sticker slot)
 *   4. Cara Kerja (3 numbered step cards + dashed line)
 *   5. Papan Skor & Rangking (Preview)
 *   6. Paket Belajar (Pricing with Monthly/Yearly toggle)
 *   7. Testimoni Alumni (Data Sampel)
 *   8. FAQ (Interactive Accordion with yellow highlight)
 *   9. CTA Penutup (Royal Blue + Mascot Slot)
 *   10. Expanded 4-Column Footer with Area Admin link
 */
export const LandingPage = ({ onNavigate }) => {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);
  // Pricing billing toggle
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'yearly'

  const faqItems = [
    {
      q: 'Apakah simulasi ujian di Bimbel mirip dengan sistem CAT BKN?',
      a: 'Ya, simulasi try out kami dirancang mirip sistem CAT BKN terbaru, mencakup durasi waktu 100 menit, navigasi nomor 1-110, sistem penanda ragu-ragu, serta format pembobotan skor resmi (TWK, TIU, TKP).',
    },
    {
      q: 'Bagaimana sistem penilaian dan passing grade SKD CPNS?',
      a: 'Penilaian menggunakan standar resmi BKN: TWK skor 0-5 per soal (ambang batas 65), TIU skor 0-5 per soal (ambang batas 80), dan TKP berskala skor 1-5 tanpa nilai nol (ambang batas 156). Skor total maksimal adalah 550.',
    },
    {
      q: 'Apakah platform Bimbel bisa diakses lancar lewat HP / Smartphone?',
      a: 'Sangat bisa! Seluruh antarmuka Bimbel sudah fully-responsive dengan navigasi mobile bawah yang nyaman digunakan di perangkat Android maupun iOS kapan saja.',
    },
    {
      q: 'Apa perbedaan antara Akun Gratis dan Akun Pro?',
      a: 'Akun Gratis mendapatkan akses 1 paket Try Out Diagnostik dan materi dasar. Akun Pro membuka seluruh 30+ paket try out, bank soal ribuan pembobotan terbaru, analisis kelemahan cerdas, serta rekaman webinar mentoring.',
    },
    {
      q: 'Metode pembayaran apa saja yang didukung?',
      a: 'Kami menerima pembayaran instan via QRIS (semua e-wallet: GoPay, OVO, Dana, ShopeePay), Transfer Virtual Account Bank (BCA, Mandiri, BNI, BRI), serta gerai minimarket Alfamart/Indomaret.',
    },
    {
      q: 'Apakah ada garansi jika materi tidak sesuai?',
      a: 'Kami memberikan garansi akses pembaruan materi gratis selama 1 tahun penuh jika pemerintah mengeluarkan regulasi kisi-kisi atau PermenPANRB baru untuk seleksi CPNS.',
    },
  ];

  return (
    <div className="min-h-screen bg-bglight font-sans antialiased text-ink flex flex-col">
      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="bg-primary text-white px-4 md:px-8 lg:px-12 flex flex-col relative overflow-hidden">
        {/* Navigation Bar (NO PRO badge on public landing page) */}
        <header className="py-6 flex justify-between items-center relative z-20 max-w-[1440px] mx-auto w-full">
          <div
            className="text-white font-black text-2xl tracking-tight cursor-pointer select-none group"
            onClick={() => onNavigate && onNavigate('/')}
          >
            <span className="transition-transform group-hover:scale-105 inline-block">
              Bimbel
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-white font-bold text-sm">
            <a href="#statistik" className="hover:text-accent transition-colors">
              Statistik
            </a>
            <a href="#keunggulan" className="hover:text-accent transition-colors">
              Keunggulan
            </a>
            <a href="#fitur-cat" className="hover:text-accent transition-colors">
              Fitur CAT
            </a>
            <a href="#cara-kerja" className="hover:text-accent transition-colors">
              Cara Kerja
            </a>
            <a href="#paket-belajar" className="hover:text-accent transition-colors">
              Paket Belajar
            </a>
            <a href="#faq" className="hover:text-accent transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline-white"
              size="sm"
              onClick={() => onNavigate && onNavigate('/masuk')}
              className="px-5 font-black"
            >
              Masuk
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => onNavigate && onNavigate('/onboarding')}
              className="px-5 font-black shadow-neo-sm"
            >
              Daftar Gratis
            </Button>
          </div>
        </header>

        {/* Hero Pitch & Content */}
        <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col lg:flex-row items-center pt-8 md:pt-12 pb-24 md:pb-28 relative z-20 gap-12">
          {/* Left Hero Pitch */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Date-driven Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-accent px-4 py-1.5 shadow-neo-sm text-ink font-black text-xs md:text-sm">
              <Calendar className="w-4 h-4 text-ink" />
              <span>Pendaftaran s.d. 30 Nov 2024</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight">
              Lolos CPNS
              <br />
              Lebih Siap
              <br />
              Bareng{' '}
              <span className="text-accent underline decoration-4 underline-offset-8">
                Bimbel
              </span>
            </h1>

            <p className="text-base md:text-xl text-blue-100 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Platform belajar online persiapan SKD CPNS terlengkap (TWK, TIU, TKP) dengan simulasi mirip sistem CAT BKN dan analisis kelemahan otomatis.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="accent"
                size="lg"
                onClick={() => onNavigate && onNavigate('/onboarding')}
                className="text-base md:text-lg px-8 font-black shadow-neo hover:shadow-neo-hover"
                rightIcon={<ArrowRight size={20} />}
              >
                Mulai Belajar Sekarang — Gratis
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                onClick={() => onNavigate && onNavigate('/paket')}
                className="text-base md:text-lg px-8 font-black"
              >
                Lihat Paket Belajar
              </Button>
            </div>

            {/* Trust Line */}
            <p className="text-xs sm:text-sm text-blue-200 font-semibold pt-1">
              ✓ Gratis daftar · Tanpa kartu kredit · Akses langsung ke 1 paket try out
            </p>
          </div>

          {/* Right Hero: Browser Frame with Mockup & Offset Stacked Cards */}
          <div className="flex-1 relative w-full flex flex-col items-center justify-center">
            {/* Background Decorative Sticker Accents */}
            <div className="absolute -top-6 -right-2 z-30">
              <StickerStar size={48} color="#F9FF33" rotate={12} />
            </div>
            <div className="absolute -bottom-4 -left-4 z-30">
              <StickerLightning size={44} color="#F472B6" rotate={-10} />
            </div>

            {/* Browser Frame Mockup */}
            <div className="w-full max-w-lg rounded-2xl border-2 border-black bg-white shadow-neo-lg overflow-hidden relative z-10">
              {/* Traffic light window header */}
              <div className="bg-gray-100 border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-400 border border-black inline-block" />
                </div>
                <div className="text-[11px] font-mono font-bold text-gray-500 bg-white px-3 py-0.5 rounded-full border border-black/20">
                  bimbel.app/dashboard
                </div>
                <div className="w-12" />
              </div>

              {/* Inside Browser: Dashboard Mockup Asset Placeholder */}
              <div className="p-4 bg-surfacelight">
                <AssetPlaceholder
                  label="ASET: Mockup Dashboard 16:10"
                  aspect="16:10"
                  subtext="Tangkapan layar dashboard siswa Bimbel"
                  className="bg-white shadow-neo-sm min-h-[220px]"
                />
              </div>
            </div>

            {/* Mascot Slot Sitting beside the frame */}
            <div className="absolute -bottom-8 -right-4 z-30 hidden sm:block">
              <AssetPlaceholder
                label="ASET: Maskot 1:1"
                aspect="1:1"
                subtext="Maskot Semangat ASN"
                className="w-28 h-28 bg-accent shadow-neo rounded-2xl"
              />
            </div>

            {/* Fixed Overlapping Hero Cards: Both fully readable, front card offset down/right */}
            <div className="w-full max-w-md mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20">
              {/* Back Card (Now fully visible!) */}
              <OutlineCard className="p-4 bg-white border-2 border-black shadow-neo-sm transform -rotate-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full border-2 border-black bg-accent flex items-center justify-center flex-shrink-0">
                    <Trophy className="text-ink" size={18} />
                  </div>
                  <div>
                    <div className="font-black text-sm text-ink leading-tight">
                      Skor Try Out
                    </div>
                    <div className="text-[11px] text-emerald-700 font-extrabold">
                      Meningkat pesat! (+70 poin)
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-600">
                  Rata-rata: <span className="text-primary font-black">410 / 550</span>
                </div>
              </OutlineCard>

              {/* Front Card (Offset down/right) */}
              <OutlineCard className="p-4 bg-yellow-50 border-2 border-black shadow-neo-sm transform rotate-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full border border-black bg-accent text-[10px] font-black uppercase text-ink">
                    Soal Hari Ini
                  </span>
                  <span className="text-[11px] font-bold text-gray-600">TWK #14</span>
                </div>
                <p className="text-xs font-bold text-ink line-clamp-2">
                  Pilar integritas nasional & butir pengamalan sila ke-2
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[11px] font-black text-primary hover:underline cursor-pointer">
                    Bahas Soal →
                  </span>
                </div>
              </OutlineCard>
            </div>
          </div>
        </div>

        {/* Wave Divider to gray content area */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10 pointer-events-none">
          <svg
            className="relative block w-full h-[40px] md:h-[70px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#EEEEEE"
            />
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: STRIP STATISTIK + INFINITE MARQUEE STRIP                       */}
      {/* ========================================================================= */}
      <section id="statistik" className="pt-12 pb-8 max-w-[1440px] mx-auto w-full px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '10.000+', label: 'Pengguna Aktif', subtext: 'Calon ASN se-Indonesia' },
            { value: '50.000+', label: 'Soal Terbahas', subtext: 'TWK · TIU · TKP lengkap' },
            { value: '94%', label: 'Tingkat Kelulusan', subtext: 'Peserta lulus PG SKD' },
            { value: '4.9 / 5', label: 'Rating Pengguna', subtext: 'Dari 2.400+ ulasan siswa' },
          ].map((item, idx) => (
            <OutlineCard key={idx} className="p-5 text-center flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-ink">
                {item.value}
              </span>
              <span className="text-sm font-black text-primary uppercase tracking-wider mt-1">
                {item.label}
              </span>
              <span className="text-xs font-semibold text-gray-600 mt-0.5">
                {item.subtext}
              </span>
            </OutlineCard>
          ))}
        </div>
        <div className="text-center mt-2">
          <span className="text-[11px] font-bold text-gray-500">
            *data per Nov 2024 / sampel terverifikasi
          </span>
        </div>
      </section>

      {/* Marquee Strip (Yellow Background, black text, tilted 1 degree) */}
      <div className="w-full bg-accent border-y-2 border-black py-3 overflow-hidden select-none transform -rotate-1 my-4 shadow-neo-sm">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {[
            'TWK • TIU • TKP',
            'CAT BKN RESMI',
            'TRY OUT NASIONAL AKBAR',
            'PEMBAHASAN DETAIL & CEPAT',
            'PERINGKAT REAL-TIME',
            'PREDIKSI KELULUSAN SKD',
            'KISI-KISI TERBARU 2024/2025',
            'TWK • TIU • TKP',
            'CAT BKN RESMI',
            'TRY OUT NASIONAL AKBAR',
            'PEMBAHASAN DETAIL & CEPAT',
          ].map((text, idx) => (
            <span key={idx} className="font-black text-sm sm:text-base uppercase tracking-widest text-ink flex items-center gap-4">
              <span>★</span>
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: KENAPA PILIH BIMBEL?                                           */}
      {/* ========================================================================= */}
      <section id="keunggulan" className="py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="surface">Keunggulan Terbukti</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-ink">
            Kenapa Pilih Bimbel?
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700 leading-relaxed">
            Metode belajar terarah yang terbukti membantu ribuan peserta menembus passing grade dan mengamankan ranking 1 formasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OutlineCard shadow="md" className="space-y-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-accent border-2 border-black flex items-center justify-center font-bold shadow-neo-sm">
              <Zap size={24} className="text-ink" />
            </div>
            <h3 className="font-black text-xl text-ink">Soal Terupdate & Terarah</h3>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              Fokus 100% pada kisi-kisi resmi BKN dan PermenPANRB terbaru. Tidak membuang waktu menghafal materi usang yang tidak diujikan.
            </p>
          </OutlineCard>

          <OutlineCard shadow="md" className="space-y-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border-2 border-black flex items-center justify-center font-bold shadow-neo-sm">
              <ShieldCheck size={24} className="text-primary" />
            </div>
            <h3 className="font-black text-xl text-ink">Simulasi Mirip Sistem CAT BKN</h3>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              Mekanisme ujian dibuat mirip sistem CAT BKN, lengkap dengan timer mundur 100 menit, tombol ragu-ragu, dan pembobotan skor asli.
            </p>
          </OutlineCard>

          <OutlineCard shadow="md" className="space-y-4 p-6">
            <div className="w-12 h-12 rounded-2xl bg-green-100 border-2 border-black flex items-center justify-center font-bold shadow-neo-sm">
              <BarChart3 size={24} className="text-green-700" />
            </div>
            <h3 className="font-black text-xl text-ink">Analisis Kelemahan Pintar</h3>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              Ketahui performa per sub-materi (Pancasila, Silogisme, Pelayanan Publik) secara otomatis untuk meningkatkan skor di titik terlemah.
            </p>
          </OutlineCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FITUR SIMULASI CAT BKN                                         */}
      {/* ========================================================================= */}
      <section id="fitur-cat" className="py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full bg-white rounded-neo border-2 border-black shadow-neo my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Bullet Features */}
          <div className="space-y-6">
            <Badge variant="accent">Simulasi Berstandar Resmi</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-ink leading-tight">
              Fitur Simulasi CAT yang Mirip Ujian Asli
            </h2>
            <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
              Jangan kaget di hari ujian. Latih reflek mental dan strategi manajemen waktu kamu dengan fitur-fitur yang dirancang sesuai standar Computer Assisted Test (CAT).
            </p>

            <div className="space-y-3.5">
              {[
                { title: 'Timer Otomatis 100 Menit', desc: 'Penghitung mundur dengan peringatan waktu akurat saat ujian hampir berakhir.' },
                { title: 'Navigasi Nomor 1-110', desc: 'Bebas berpindah nomor soal kapan saja dengan status warna (hijau, kuning, abu).' },
                { title: 'Penanda Ragu-Ragu', desc: 'Tandai soal yang masih belum yakin untuk ditinjau ulang sebelum submit.' },
                { title: 'Scoring Real-Time TWK, TIU, TKP', desc: 'Penghitungan otomatis dengan batas maksimal 550 poin.' },
                { title: 'Passing Grade Indicator', desc: 'Evaluasi instan kelulusan batas nilai TWK (65), TIU (80), TKP (156).' },
                { title: 'Kunci Jawaban & Pembahasan Lengkap', desc: 'Trik cepat 30 detik untuk tipe-tipe soal berhitung dan silogisme.' },
              ].map((f, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 rounded-full bg-accent border-2 border-black items-center justify-center flex-shrink-0 mt-0.5 shadow-neo-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3] text-ink" />
                  </div>
                  <div>
                    <span className="font-black text-sm text-ink block">{f.title}</span>
                    <span className="text-xs text-gray-600 font-medium">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mockup Browser Frame + Sticker slot */}
          <div className="relative">
            <div className="w-full rounded-2xl border-2 border-black bg-surfacelight shadow-neo-lg overflow-hidden">
              <div className="bg-gray-200 border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-400 border border-black inline-block" />
                </div>
                <div className="text-xs font-mono font-bold text-gray-600">
                  simulasi.cat.bkn/skd-cpns
                </div>
                <div className="w-12" />
              </div>

              <div className="p-5">
                <AssetPlaceholder
                  label="ASET: Mockup Ujian CAT 16:9"
                  aspect="16:9"
                  subtext="Layar pengerjaan soal simulasi CAT dengan navigasi 1-110"
                  className="bg-white min-h-[260px]"
                />
              </div>
            </div>

            {/* Overlapping decorative sticker slot */}
            <div className="absolute -top-6 -right-6 z-20">
              <AssetPlaceholder
                label="ASET: Sticker CAT 1:1"
                aspect="1:1"
                subtext="Sticker Badge CAT"
                className="w-24 h-24 bg-accent shadow-neo rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CARA KERJA (3 LANGKAH)                                         */}
      {/* ========================================================================= */}
      <section id="cara-kerja" className="py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="surface">Langkah Mudah</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-ink">
            Cara Kerja Menuju Kelulusan SKD
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            3 tahapan sederhana yang dirancang sistematis untuk meningkatkan skor secara bertahap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Daftar Akun Gratis',
              desc: 'Hanya butuh 1 menit, langsung dapatkan akses latihan pertama dan silabus lengkap tanpa syarat kartu kredit.',
              badge: 'Akses Instan',
            },
            {
              step: '02',
              title: 'Kerjakan Try Out Diagnostik',
              desc: 'Ukur kemampuan awal kamu. Sistem akan memetakan kelemahan sub-bab TWK, TIU, dan TKP secara presisi.',
              badge: 'Analisis Kelemahan',
            },
            {
              step: '03',
              title: 'Ikuti Rencana Belajar Terarah',
              desc: 'Pelajari materi terstruktur, ikuti simulasi try out bertahap, dan pantau kenaikan peringkatmu hingga lolos formasi.',
              badge: 'Siap Lolos ASN',
            },
          ].map((item, idx) => (
            <OutlineCard key={idx} shadow="md" className="p-6 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black text-4xl text-primary font-mono">
                    {item.step}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border border-black bg-accent text-[11px] font-black uppercase text-ink shadow-neo-sm">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-black text-xl text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center font-black shadow-neo-sm">
                    →
                  </div>
                </div>
              )}
            </OutlineCard>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PAPAN SKOR & RANGKING (PREVIEW)                                */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="bg-white rounded-neo border-2 border-black p-6 md:p-10 shadow-neo">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Badge variant="accent">Papan Skor Nasional</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-ink mt-2">
                Bersaing Sehat dengan Ribuan Peserta se-Indonesia
              </h2>
              <p className="text-sm font-semibold text-gray-700 mt-1">
                Bandingkan skor kamu dengan pesaing di instansi dan formasi yang sama.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate && onNavigate('/rangking')}
              className="font-black px-6 shadow-neo-sm"
              rightIcon={<ArrowRight size={18} />}
            >
              Lihat Posisi Kamu
            </Button>
          </div>

          {/* Ranking Podium Top 3 + 2 Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {[
              { rank: 1, name: 'Aditya Pratama', score: 500, twk: 140, tiu: 155, tkp: 205, medal: 'gold' },
              { rank: 2, name: 'Nurul Hidayah', score: 485, twk: 135, tiu: 150, tkp: 200, medal: 'silver' },
              { rank: 3, name: 'Rian Kusuma', score: 475, twk: 135, tiu: 145, tkp: 195, medal: 'bronze' },
            ].map((p) => (
              <div
                key={p.rank}
                className={`p-5 rounded-2xl border-2 border-black flex flex-col justify-between ${
                  p.rank === 1 ? 'bg-yellow-50 shadow-neo' : 'bg-surfacelight shadow-neo-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-accent font-black text-xs">
                    #{p.rank}
                  </span>
                  <span className="text-xs font-bold uppercase text-gray-600">Top Nasional</span>
                </div>
                <div>
                  <div className="font-black text-lg text-ink">{p.name}</div>
                  <div className="flex gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded border border-black bg-white text-[11px] font-bold">TWK {p.twk}</span>
                    <span className="px-2 py-0.5 rounded border border-black bg-white text-[11px] font-bold">TIU {p.tiu}</span>
                    <span className="px-2 py-0.5 rounded border border-black bg-white text-[11px] font-bold">TKP {p.tkp}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-500">Skor SKD Total</span>
                  <span className="text-2xl font-black text-primary">{p.score}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl border border-black bg-accent/20 flex items-center justify-between text-xs font-bold text-ink">
            <span>🔥 Rata-rata skor peserta Bimbel: <strong>410/550</strong> (Di atas standar passing grade BKN)</span>
            <button
              onClick={() => onNavigate && onNavigate('/rangking')}
              className="text-primary font-black hover:underline"
            >
              Cek Leaderboard Lengkap →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PAKET BELAJAR (PRICING)                                        */}
      {/* ========================================================================= */}
      <section id="paket-belajar" className="py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <Badge variant="surface">Pilihan Paket Investasi Belajar</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-ink">
            Paket Belajar Sesuai Kebutuhanmu
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            Biaya terjangkau untuk mengamankan karir seumur hidup sebagai Aparatur Sipil Negara.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full border-2 border-black bg-white shadow-neo-sm mt-4">
            <button
              type="button"
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Langganan Bulanan
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod('yearly')}
              className={`px-5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-accent text-ink border border-black shadow-sm'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              <span>Sekali Bayar (Hemat 50%)</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </button>
          </div>
        </div>

        {/* 3 Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1: Gratis */}
          <OutlineCard shadow="md" className="p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                Tier Dasar
              </div>
              <h3 className="font-black text-2xl text-ink">Gratis</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-black text-ink">Rp 0</span>
                <span className="text-xs font-bold text-gray-600 block mt-1">Akses selamanya</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-gray-700 border-t border-gray-200 pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>1x Try Out Diagnostik SKD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Materi Pembuka TWK & TIU</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Kunci Jawaban Singkat</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span>✕ Tanpa analisis kelemahan mendalam</span>
                </li>
              </ul>
            </div>
            <Button
              variant="outline"
              fullWidth
              className="mt-8 font-black"
              onClick={() => onNavigate && onNavigate('/onboarding')}
            >
              Mulai Gratis
            </Button>
          </OutlineCard>

          {/* Tier 2: Pro Bulanan */}
          <OutlineCard shadow="md" className="p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-primary mb-2">
                Paling Fleksibel
              </div>
              <h3 className="font-black text-2xl text-ink">Pro Bulanan</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-black text-ink">
                  {billingPeriod === 'monthly' ? 'Rp 99.000' : 'Rp 79.000'}
                </span>
                <span className="text-xs font-bold text-gray-600 block mt-1">per bulan, batal kapan saja</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-gray-700 border-t border-gray-200 pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>15+ Paket Simulasi CAT BKN</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Akses Semua Modul TWK, TIU, TKP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Pembahasan Trik Cepat Soal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Analisis Grafik Kelemahan Pintar</span>
                </li>
              </ul>
            </div>
            <Button
              variant="primary"
              fullWidth
              className="mt-8 font-black shadow-neo-sm"
              onClick={() => onNavigate && onNavigate('/paket/checkout?plan=pro-monthly')}
            >
              Pilih Paket Bulanan
            </Button>
          </OutlineCard>

          {/* Tier 3: Pro Lulus CPNS (Recommended - with Yellow outline / strip) */}
          <OutlineCard
            shadow="lg"
            className="p-6 flex flex-col justify-between relative border-4 border-black bg-yellow-50/50"
          >
            {/* Top Recommended Yellow Strip */}
            <div className="absolute top-0 left-0 right-0 bg-accent border-b-2 border-black py-1.5 text-center font-black text-xs uppercase tracking-wider text-ink shadow-sm">
              ★ PALING POPULER & DIREKOMENDASIKAN ★
            </div>

            <div className="pt-5">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-2">
                Akses Penuh Sampai SKD Selesai
              </div>
              <h3 className="font-black text-2xl text-ink">Pro Lulus CPNS</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-black text-ink">Rp 249.000</span>
                <span className="text-xs font-bold text-gray-600 block mt-1">sekali bayar, aktif 12 bulan penuh</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-gray-700 border-t border-black/10 pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span><strong>35+ Paket Try Out Akbar & Spesifik Formasi</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Semua Video & Modul Belajar Silabus 2024/2025</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Grup Diskusi Mentoring Eksklusif</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Prediksi Kelulusan Rangking Formasi Nasional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Garansi Update Materi jika Kisi-kisi BKN Berubah</span>
                </li>
              </ul>
            </div>
            <Button
              variant="accent"
              fullWidth
              className="mt-8 font-black shadow-neo hover:shadow-neo-hover"
              onClick={() => onNavigate && onNavigate('/paket/checkout?plan=pro-ultimate')}
            >
              Daftar Pro Lulus Sekarang
            </Button>
          </OutlineCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: TESTIMONI ALUMNI (DATA SAMPEL)                                 */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="surface">Cerita Sukses Alumni (Data Sampel)</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-ink">
            Mereka Sudah Membuktikannya
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            Kisah nyata persiapan efektif bersama platform belajar Bimbel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Farhan Maulana',
              instansi: 'Kemenkeu RI (DJP)',
              skor: 486,
              quote: 'Try out di Bimbel benar-benar melatih mental. Sistem CAT-nya mirip banget, terutama pembagian waktu di TIU numerik. Alhamdulillah ranking 1 formasi!',
              avatarSlot: 'ASET: Avatar Alumni 1',
            },
            {
              name: 'Dinda Ayu Saraswati',
              instansi: 'Kemenkumham RI',
              skor: 472,
              quote: 'Kelemahan saya dulu di materi TKP selalu di bawah 150. Berkat fitur insight otomatis Bimbel, saya tahu pola jawaban berbobot 5 dan tembus 195 di ujian asli.',
              avatarSlot: 'ASET: Avatar Alumni 2',
            },
            {
              name: 'Rizky Kurniawan',
              instansi: 'Badan Kepegawaian Negara (BKN)',
              skor: 492,
              quote: 'Bank soalnya sangat up-to-date dengan permenpan terbaru. Penjelasan trik 30 detik untuk silogisme dan figural sangat menghemat waktu berharga!',
              avatarSlot: 'ASET: Avatar Alumni 3',
            },
          ].map((t, idx) => (
            <OutlineCard key={idx} shadow="md" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-accent mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-black" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-800 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <AssetPlaceholder
                  label={t.avatarSlot}
                  aspect="1:1"
                  className="w-12 h-12 rounded-full border-2 border-black flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-black text-sm text-ink truncate">{t.name}</div>
                  <div className="text-xs text-primary font-bold">{t.instansi}</div>
                  <div className="text-[11px] font-extrabold text-emerald-700">
                    Skor SKD: {t.skor} / 550
                  </div>
                </div>
              </div>
            </OutlineCard>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FAQ ACCORDION                                                  */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="surface">Tanya Jawab</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-ink">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            Segala informasi penting tentang pendaftaran, metode ujian, dan akun Bimbel.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 border-black transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-yellow-50/80 shadow-neo'
                    : 'bg-white shadow-neo-sm hover:border-black'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-3 focus-visible:ring-accent"
                  aria-expanded={isOpen}
                >
                  <span className="font-black text-base sm:text-lg text-ink">
                    {item.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-black bg-white flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-accent' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-ink" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base font-medium text-gray-700 leading-relaxed border-t border-black/10">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CTA PENUTUP (ROYAL BLUE + MASCOT SLOT)                         */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="rounded-neo-lg bg-primary border-4 border-black p-8 md:p-14 text-white relative overflow-hidden shadow-neo-lg">
          {/* Decorative geometric background elements */}
          <div className="absolute top-4 right-8 opacity-20 pointer-events-none">
            <StickerSparkle size={120} color="#FFFFFF" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black bg-accent text-xs font-black uppercase text-ink shadow-neo-sm">
                Mulai Sekarang Tanpa Biaya
              </span>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                Siap Wujudkan Impian Jadi Abdi Negara Tahun Ini?
              </h2>
              <p className="text-base sm:text-lg text-blue-100 font-medium leading-relaxed">
                Bergabunglah bersama ribuan pejuang NIP lainnya. Kerjakan try out pertama sekarang dan ketahui peta kemampuanmu hari ini juga.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => onNavigate && onNavigate('/onboarding')}
                  className="text-base font-black px-8 shadow-neo hover:shadow-neo-hover"
                  rightIcon={<ArrowRight size={20} />}
                >
                  Mulai Belajar Sekarang — Gratis
                </Button>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Bimbel,%20saya%20ingin%20konsultasi%20paket%20CPNS"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black bg-white text-ink font-black text-sm shadow-neo hover:shadow-neo-hover transition-all min-h-[44px]"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Mascot Slot Sitting in the Blue Box */}
            <div className="flex-shrink-0">
              <AssetPlaceholder
                label="ASET: Maskot 1:1"
                aspect="1:1"
                subtext="Maskot Penutup Sukses CPNS"
                className="w-40 h-40 sm:w-48 sm:h-48 bg-accent/90 shadow-neo rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: EXPANDED 4-COLUMN FOOTER                                      */}
      {/* ========================================================================= */}
      <footer className="mt-auto border-t-2 border-black bg-white pt-14 pb-8 px-4 md:px-8 lg:px-12 text-ink">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b-2 border-gray-100">
          {/* Column 1: Produk */}
          <div className="space-y-3">
            <h4 className="font-black text-base uppercase tracking-wider text-ink">
              Produk
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-gray-600">
              <li>
                <button onClick={() => onNavigate && onNavigate('/latihan')} className="hover:text-primary">
                  Simulasi CAT BKN
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('/tryout')} className="hover:text-primary">
                  Try Out Akbar Nasional
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('/paket')} className="hover:text-primary">
                  Paket Pro Lulus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('/rangking')} className="hover:text-primary">
                  Papan Skor Nasional
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Materi CPNS */}
          <div className="space-y-3">
            <h4 className="font-black text-base uppercase tracking-wider text-ink">
              Materi CPNS
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-gray-600">
              <li>
                <button onClick={() => onNavigate && onNavigate('/materi')} className="hover:text-primary">
                  Tes Wawasan Kebangsaan (TWK)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('/materi')} className="hover:text-primary">
                  Tes Intelegensia Umum (TIU)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('/materi')} className="hover:text-primary">
                  Tes Karakteristik Pribadi (TKP)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('/materi')} className="hover:text-primary">
                  Trik Cepat Soal Penalaran
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Perusahaan */}
          <div className="space-y-3">
            <h4 className="font-black text-base uppercase tracking-wider text-ink">
              Perusahaan
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-gray-600">
              <li>
                <span className="cursor-pointer hover:text-primary">Tentang Bimbel</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary">Karier & Pengajar</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary">Syarat & Ketentuan</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary">Kebijakan Privasi</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Bantuan & Kontak */}
          <div className="space-y-3">
            <h4 className="font-black text-base uppercase tracking-wider text-ink">
              Bantuan
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-gray-600">
              <li>
                <a href="#faq" className="hover:text-primary">FAQ & Pusat Bantuan</a>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary">Panduan Pendaftaran</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary">Hubungi Layanan Siswa</span>
              </li>
              <li>
                <span className="text-xs text-gray-500 block">Jam Operasional: 08:00 - 21:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="max-w-[1440px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-primary">Bimbel</span>
            <span>© 2026 Platform Belajar Online SKD CPNS Terpercaya.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate && onNavigate('/masuk')}
              className="hover:underline"
            >
              Masuk Siswa
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/komponen')}
              className="hover:underline text-gray-500"
            >
              Showcase Komponen
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/admin/dashboard')}
              className="text-[11px] text-gray-400 hover:text-ink hover:underline cursor-pointer"
            >
              Area Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
