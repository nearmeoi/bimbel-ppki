import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { RankRow } from '../../components/cards/RankRow';
import { InsightCard } from '../../components/cards/InsightCard';
import { TargetHarianWidget } from './TargetHarianWidget';
import { Info, Trophy } from 'lucide-react';

/**
 * Dashboard Leaderboard & Insight Sidebar Component
 * Conforms to revisions:
 * - Passing-grade legend & markers (TWK 65, TIU 80, TKP 156) "Passing grade, sesuai ketentuan BKN terbaru"
 * - Top 5 users with 12px chips
 * - Pinned user row at bottom: "Peringkat kamu: #42", yellow highlight, delta indicator ("▲ 3 minggu ini")
 * - Target Harian widget
 * - Darkened InsightCard with AA contrast & CTA button
 */
export const LeaderboardSidebar = ({
  topUsers = [],
  currentUserRank = {
    rank: 42,
    name: 'Budi Santoso',
    avatarSrc: null,
    twk: 110,
    tiu: 125,
    tkp: 175,
    totalScore: 410,
    deltaText: '▲ 3 minggu ini',
  },
  passingGrade = {
    label: 'Passing grade, sesuai ketentuan BKN terbaru',
    subjects: [
      { code: 'TWK', threshold: 65, max: 150 },
      { code: 'TIU', threshold: 80, max: 175 },
      { code: 'TKP', threshold: 156, max: 225 },
    ],
  },
  targetHarian = {
    completed: 20,
    target: 30,
    streakDays: 5,
  },
  insight = {
    title: 'Peningkatan pesat terlihat pada materi TKP Anda!',
    description:
      'Untuk hasil yang lebih maksimal di ujian asli nanti, tingkatkan porsi latihan soal TWK (terutama penalaran sejarah & pilar negara) serta asah kecepatan hitung pada modul TIU.',
  },
  onViewLeaderboard,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-6 lg:pt-0">
      {/* Target Harian Widget */}
      <TargetHarianWidget
        completed={targetHarian.completed}
        target={targetHarian.target}
        streakDays={targetHarian.streakDays}
        onContinue={() => navigate('/latihan')}
      />

      {/* Rangking Card */}
      <OutlineCard className="flex flex-col justify-between p-5">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-accent shadow-neo-sm">
                <Trophy className="h-4 w-4 text-ink" />
              </div>
              <h2 className="text-xl font-black text-ink select-none">
                Rangking
              </h2>
            </div>

            <button
              type="button"
              onClick={onViewLeaderboard || (() => navigate('/rangking'))}
              className="text-xs font-black text-primary hover:underline cursor-pointer px-2 py-1"
            >
              Lihat Semua →
            </button>
          </div>

          {/* Passing Grade Indicator Banner */}
          <div className="mb-4 rounded-xl border border-black/15 bg-yellow-50/80 p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 mb-1">
              <Info className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{passingGrade.label}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {passingGrade.subjects.map((sub) => (
                <span
                  key={sub.code}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-black bg-white text-[11px] font-extrabold text-ink shadow-neo-sm"
                >
                  <span className="text-primary">{sub.code}</span>
                  <span className="text-gray-500 font-medium">min</span>
                  <span>{sub.threshold}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Top 5 rows */}
          <div className="space-y-2.5">
            {topUsers.map((user) => (
              <RankRow
                key={user.rank}
                rank={user.rank}
                name={user.name}
                avatarSrc={user.avatarSrc}
                twk={user.twk}
                tiu={user.tiu}
                tkp={user.tkp}
                totalScore={user.totalScore}
                variant="compact"
              />
            ))}
          </div>
        </div>

        {/* Pinned User Row at the bottom */}
        {currentUserRank && (
          <div className="mt-4 pt-3 border-t-2 border-black border-dashed">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Posisi Kamu Saat Ini
            </div>
            <RankRow
              rank={currentUserRank.rank}
              name={currentUserRank.name}
              avatarSrc={currentUserRank.avatarSrc}
              twk={currentUserRank.twk}
              tiu={currentUserRank.tiu}
              tkp={currentUserRank.tkp}
              totalScore={currentUserRank.totalScore}
              deltaText={currentUserRank.deltaText}
              isCurrentUser={true}
              variant="compact"
            />
          </div>
        )}
      </OutlineCard>

      {/* Signature Insight Gradient Card */}
      <InsightCard
        title={insight.title}
        description={insight.description}
        onAction={() => navigate('/latihan')}
      />
    </div>
  );
};

export default LeaderboardSidebar;
