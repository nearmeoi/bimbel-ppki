import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import {
  DashboardHeader,
  PengumumanCarousel,
  MateriSection,
  LeaderboardSidebar,
} from '../features/dashboard';
import dashboardData from '../data/dashboard.json';
import { useToast } from '../components/ui/Toast';
import { Skeleton } from '../components/ui/Skeleton';
import AssetPlaceholder from '../components/ui/AssetPlaceholder';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Play, Sparkles, BookOpen, Layers } from 'lucide-react';

/**
 * Bimbel Dashboard Page
 * Features 3 selectable states (conforming to prompt):
 * 1. 'active' - Logged-in student with progress, realistic scores, target widget
 * 2. 'empty' - Brand-new user: friendly mascot placeholder, "Mulai dari Try Out Diagnostik" CTA
 * 3. 'loading' - Loading skeleton state with pixel-faithful placeholders
 */
export const DashboardPage = ({ onNavigate }) => {
  const toast = useToast();
  const [viewState, setViewState] = useState('active'); // 'active' | 'empty' | 'loading'

  const {
    user,
    stats,
    continueLesson,
    passingGrade,
    targetHarian,
    pengumuman,
    subjects,
    rangkingTop5,
    currentUserRank,
    insight,
  } = dashboardData;

  const handleSelectAnnouncement = (item) => {
    toast.info(`Membuka pengumuman: ${item.title}`);
  };

  const handleSelectSubject = (subject) => {
    toast.info(`Membuka materi ${subject.code}: ${subject.title}`);
    if (onNavigate) onNavigate(subject.route || '/materi');
  };

  const handleViewAllMateri = () => {
    if (onNavigate) onNavigate('/materi');
  };

  const handleViewLeaderboard = () => {
    if (onNavigate) onNavigate('/rangking');
  };

  return (
    <PageShell currentPath="/dashboard" onNavigate={onNavigate} user={user}>
      {/* Dev / Preview State Switcher Bar */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 shadow-neo-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-xs font-black uppercase text-ink tracking-wider">
            Dashboard State Preview:
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewState('active')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              viewState === 'active'
                ? 'bg-primary text-white border-black shadow-neo-sm'
                : 'bg-surfacelight text-ink border-transparent hover:border-black'
            }`}
          >
            Aktif (Normal)
          </button>
          <button
            type="button"
            onClick={() => setViewState('empty')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              viewState === 'empty'
                ? 'bg-accent text-ink border-black shadow-neo-sm'
                : 'bg-surfacelight text-ink border-transparent hover:border-black'
            }`}
          >
            Pengguna Baru (Empty)
          </button>
          <button
            type="button"
            onClick={() => setViewState('loading')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              viewState === 'loading'
                ? 'bg-gray-800 text-white border-black shadow-neo-sm'
                : 'bg-surfacelight text-ink border-transparent hover:border-black'
            }`}
          >
            Loading Skeleton
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STATE 1: LOADING SKELETON                                     */}
      {/* ============================================================== */}
      {viewState === 'loading' && (
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
          <div className="flex-1 flex flex-col gap-6">
            {/* Header skeleton */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-2/3 rounded-xl" />
              <div className="grid grid-cols-3 gap-3">
                <Skeleton className="h-20 rounded-neo" />
                <Skeleton className="h-20 rounded-neo" />
                <Skeleton className="h-20 rounded-neo" />
              </div>
            </div>

            {/* Announcement skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-36 rounded-lg" />
              <Skeleton className="h-48 rounded-neo" />
            </div>

            {/* Subjects 3-col skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-36 rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-44 rounded-neo" />
                <Skeleton className="h-44 rounded-neo" />
                <Skeleton className="h-44 rounded-neo" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-6">
            <Skeleton className="h-32 rounded-neo" />
            <Skeleton className="h-80 rounded-neo" />
            <Skeleton className="h-44 rounded-neo" />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STATE 2: EMPTY STATE FOR BRAND-NEW USER                       */}
      {/* ============================================================== */}
      {viewState === 'empty' && (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            {/* Greeting with 0 stats */}
            <DashboardHeader
              userName="Budi"
              stats={[
                { id: 'soal', value: '0', label: 'Soal Dikerjakan' },
                { id: 'skor', value: '-', label: 'Rata-rata Skor', sublabel: 'belum ada tes' },
                { id: 'streak', value: '0', label: 'Streak Hari', hasFlame: false },
              ]}
              continueLesson={{
                subject: 'DIAGNOSTIK',
                title: 'Try Out Pemetaan Awal',
                route: '/latihan',
              }}
            />

            {/* Prominent Friendly Mascot Hero Box */}
            <OutlineCard className="p-8 bg-gradient-to-br from-yellow-50 via-white to-blue-50 border-2 border-black">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <AssetPlaceholder
                    label="ASET: Maskot 1:1"
                    aspect="1:1"
                    subtext="Maskot Sambutan Ramah Calon ASN"
                    className="w-36 h-36 sm:w-44 sm:h-44 bg-accent/40 shadow-neo"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black bg-accent text-xs font-black uppercase text-ink shadow-neo-sm mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Langkah Pertama Kamu
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
                    Belum ada riwayat belajar
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mt-2 leading-relaxed">
                    Ayo mulai dengan mengikuti <strong>Try Out Diagnostik</strong> untuk mengetahui peta kekuatan materi TWK, TIU, dan TKP kamu saat ini.
                  </p>

                  <div className="mt-5 flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('/latihan')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black bg-accent text-ink font-black text-sm shadow-neo hover:shadow-neo-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer min-h-[44px]"
                    >
                      <Play className="w-4 h-4 fill-ink" />
                      <span>Mulai dari Try Out Diagnostik</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('/materi')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-black bg-white text-ink font-bold text-sm shadow-neo hover:shadow-neo-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer min-h-[44px]"
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>Eksplor Silabus Materi</span>
                    </button>
                  </div>
                </div>
              </div>
            </OutlineCard>

            {/* Announcements */}
            <PengumumanCarousel
              pengumuman={pengumuman}
              onSelectAnnouncement={handleSelectAnnouncement}
            />

            {/* Subject cards with 0 progress */}
            <MateriSection
              subjects={subjects.map((s) => ({
                ...s,
                current: 0,
                lastScore: 'Belum ada',
                time: 'Baru ditambahkan',
              }))}
              onSelectSubject={handleSelectSubject}
              onViewAllMateri={handleViewAllMateri}
            />
          </div>

          {/* Sidebar */}
          <LeaderboardSidebar
            topUsers={rangkingTop5}
            passingGrade={passingGrade}
            targetHarian={{
              completed: 0,
              target: 30,
              streakDays: 0,
            }}
            currentUserRank={{
              rank: null,
              name: 'Budi Santoso',
              avatarSrc: null,
              twk: 0,
              tiu: 0,
              tkp: 0,
              totalScore: 0,
              deltaText: 'Belum ada peringkat',
              isCurrentUser: true,
            }}
            insight={{
              title: 'Selamat bergabung di Bimbel CPNS!',
              description:
                'Kerjakan minimal 1 set soal diagnostik agar algoritma pintar kami dapat menganalisis kelemahan sub-materi kamu secara akurat.',
            }}
            onViewLeaderboard={handleViewLeaderboard}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* STATE 3: ACTIVE LOGGED-IN STUDENT (DEFAULT)                   */}
      {/* ============================================================== */}
      {viewState === 'active' && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column (Main Content) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header row: Welcome + Continue action + Realistic Stats */}
            <DashboardHeader
              userName={user.name}
              stats={stats}
              continueLesson={continueLesson}
            />

            {/* Pengumuman Carousel */}
            <PengumumanCarousel
              pengumuman={pengumuman}
              onSelectAnnouncement={handleSelectAnnouncement}
            />

            {/* 3-Column Jenis Materi Section */}
            <MateriSection
              subjects={subjects}
              onSelectSubject={handleSelectSubject}
              onViewAllMateri={handleViewAllMateri}
            />
          </div>

          {/* Right Column: Target Harian + Rangking Card (Passing Grade + Top 5 + Pinned #42) + Darkened Insight */}
          <LeaderboardSidebar
            topUsers={rangkingTop5}
            passingGrade={passingGrade}
            targetHarian={targetHarian}
            currentUserRank={currentUserRank}
            insight={insight}
            onViewLeaderboard={handleViewLeaderboard}
          />
        </div>
      )}
    </PageShell>
  );
};

export default DashboardPage;
