import React, { useState, useEffect } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { RankRow } from '../components/cards/RankRow';
import rangkingData from '../data/rangking.json';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Bimbel Papan Peringkat Nasional & Podium Top 3 Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const RangkingPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const [scope, setScope] = useState('nasional'); // 'nasional' | 'instansi'
  const { podium, nasional: defaultNasional, currentUser: defaultCurrentUser } = rangkingData;

  const [leaderboard, setLeaderboard] = useState(defaultNasional);
  const [userRankData, setUserRankData] = useState(defaultCurrentUser);

  // [BACKEND-DYNAMIC]: Papan peringkat nasional & instansi dari public.exam_attempts join public.profiles order by total_score desc
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchLeaderboard = async () => {
      try {
        // Ambil riwayat try out dengan skor tertinggi
        const { data: topAttempts, error } = await supabase
          .from('exam_attempts')
          .select('id, user_id, twk_score, tiu_score, tkp_score, total_score, profiles(name, target_instansi)')
          .order('total_score', { ascending: false })
          .limit(10);

        if (error) {
          console.warn('Gagal memuat papan peringkat:', error);
          return;
        }

        if (topAttempts && topAttempts.length > 0) {
          setLeaderboard(
            topAttempts.map((row, idx) => ({
              rank: idx + 1,
              name: row.profiles?.name || `Peserta #${idx + 1}`,
              twk: row.twk_score || 0,
              tiu: row.tiu_score || 0,
              tkp: row.tkp_score || 0,
              total: row.total_score || 0,
            }))
          );
        }

        // Ambil riwayat pengguna sendiri
        if (user?.id) {
          const { data: myAttempt } = await supabase
            .from('exam_attempts')
            .select('*')
            .eq('user_id', user.id)
            .order('total_score', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (myAttempt) {
            setUserRankData({
              rank: 42,
              name: user?.name || defaultCurrentUser.name,
              twk: myAttempt.twk_score || 0,
              tiu: myAttempt.tiu_score || 0,
              tkp: myAttempt.tkp_score || 0,
              total: myAttempt.total_score || 0,
            });
          }
        }
      } catch (err) {
        console.warn('Error load ranking:', err);
      }
    };

    fetchLeaderboard();
  }, [user?.id]);

  return (
    <PageShell currentPath="/rangking" onNavigate={onNavigate}>
      <div className="space-y-8">
        {/* Header & Filter Scope */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Papan Peringkat</h1>
          <p className="text-xs md:text-sm text-gray-600 font-medium">
            Pantau posisimu bersaing dengan puluhan ribu pejuang NIP seluruh Indonesia.
          </p>

          <div className="flex justify-center gap-2 pt-2">
            <Button
              variant={scope === 'nasional' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setScope('nasional')}
              className="px-6"
            >
              Nasional
            </Button>
            <Button
              variant={scope === 'instansi' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setScope('instansi')}
              className="px-6"
            >
              Per Instansi ({user?.targetInstansi || 'Kemenkumham'})
            </Button>
          </div>
        </div>

        {/* Podium Top 3 matching Stitch */}
        <div className="flex justify-center items-end gap-3 sm:gap-6 md:gap-8 pt-4 pb-8 select-none">
          {/* Rank 2 (Silver) */}
          <div className="flex flex-col items-center">
            <Avatar name={leaderboard[1]?.name || 'Budi Santoso'} medal="silver" size="lg" />
            <div className="mt-2 font-bold text-sm text-ink truncate max-w-[90px]">
              {leaderboard[1]?.name || 'Budi S.'}
            </div>
            <div className="text-primary font-extrabold text-base md:text-lg">
              {leaderboard[1]?.total || 480}
            </div>
            <div className="w-20 sm:w-24 md:w-28 h-20 bg-gray-200 border-2 border-black rounded-t-xl flex justify-center pt-2 font-extrabold text-2xl shadow-neo-sm">
              2
            </div>
          </div>

          {/* Rank 1 (Gold - Center & Tallest) */}
          <div className="flex flex-col items-center">
            <Avatar name={leaderboard[0]?.name || 'Agus Triyono'} medal="gold" size="xl" />
            <div className="mt-2 font-bold text-base text-ink truncate max-w-[100px]">
              {leaderboard[0]?.name || 'Agus T.'}
            </div>
            <div className="text-primary font-extrabold text-lg md:text-xl">
              {leaderboard[0]?.total || 495}
            </div>
            <div className="w-24 sm:w-28 md:w-32 h-28 bg-accent border-2 border-black rounded-t-xl flex justify-center pt-2 font-extrabold text-3xl shadow-neo">
              1
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="flex flex-col items-center">
            <Avatar name={leaderboard[2]?.name || 'Citra Wijaya'} medal="bronze" size="lg" />
            <div className="mt-2 font-bold text-sm text-ink truncate max-w-[90px]">
              {leaderboard[2]?.name || 'Citra W.'}
            </div>
            <div className="text-primary font-extrabold text-base md:text-lg">
              {leaderboard[2]?.total || 475}
            </div>
            <div className="w-20 sm:w-24 md:w-28 h-16 bg-orange-200 border-2 border-black rounded-t-xl flex justify-center pt-2 font-extrabold text-2xl shadow-neo-sm">
              3
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table with Pinned User Row */}
        <OutlineCard className="max-w-4xl mx-auto overflow-hidden p-0 shadow-neo">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surfacelight border-b-2 border-black select-none">
                  <th className="p-4 font-extrabold w-16 text-center text-xs md:text-sm text-ink">
                    No
                  </th>
                  <th className="p-4 font-extrabold text-xs md:text-sm text-ink">Peserta</th>
                  <th className="p-4 font-extrabold text-center text-xs md:text-sm text-ink">
                    TWK
                  </th>
                  <th className="p-4 font-extrabold text-center text-xs md:text-sm text-ink">
                    TIU
                  </th>
                  <th className="p-4 font-extrabold text-center text-xs md:text-sm text-ink">
                    TKP
                  </th>
                  <th className="p-4 font-extrabold text-center text-xs md:text-sm text-ink">
                    Total Skor
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item) => (
                  <RankRow
                    key={item.rank}
                    rank={item.rank}
                    name={item.name}
                    twk={item.twk}
                    tiu={item.tiu}
                    tkp={item.tkp}
                    totalScore={item.total}
                    variant="table"
                  />
                ))}

                {/* Pinned User Row */}
                <RankRow
                  rank={userRankData.rank || 42}
                  name={user?.name || userRankData.name || 'Anda'}
                  twk={userRankData.twk}
                  tiu={userRankData.tiu}
                  tkp={userRankData.tkp}
                  totalScore={userRankData.total}
                  isCurrentUser
                  variant="table"
                />
              </tbody>
            </table>
          </div>
        </OutlineCard>
      </div>
    </PageShell>
  );
};

export default RangkingPage;
