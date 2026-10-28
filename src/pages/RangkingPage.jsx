import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { RankRow } from '../components/cards/RankRow';
import rangkingData from '../data/rangking.json';

/**
 * Bimbel Papan Peringkat Nasional & Podium Top 3 Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const RangkingPage = ({ onNavigate }) => {
  const [scope, setScope] = useState('nasional'); // 'nasional' | 'instansi'
  const { podium, nasional, currentUser } = rangkingData;

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
              Per Instansi (Kemenkumham)
            </Button>
          </div>
        </div>

        {/* Podium Top 3 matching Stitch */}
        <div className="flex justify-center items-end gap-3 sm:gap-6 md:gap-8 pt-4 pb-8 select-none">
          {/* Rank 2 (Silver) */}
          <div className="flex flex-col items-center">
            <Avatar name="Budi Santoso" medal="silver" size="lg" />
            <div className="mt-2 font-bold text-sm text-ink truncate max-w-[90px]">Budi S.</div>
            <div className="text-primary font-extrabold text-base md:text-lg">480</div>
            <div className="w-20 sm:w-24 md:w-28 h-20 bg-gray-200 border-2 border-black rounded-t-xl flex justify-center pt-2 font-extrabold text-2xl shadow-neo-sm">
              2
            </div>
          </div>

          {/* Rank 1 (Gold - Center & Tallest) */}
          <div className="flex flex-col items-center">
            <Avatar name="Agus Triyono" medal="gold" size="xl" />
            <div className="mt-2 font-bold text-base text-ink truncate max-w-[100px]">Agus T.</div>
            <div className="text-primary font-extrabold text-lg md:text-xl">495</div>
            <div className="w-24 sm:w-28 md:w-32 h-28 bg-accent border-2 border-black rounded-t-xl flex justify-center pt-2 font-extrabold text-3xl shadow-neo">
              1
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="flex flex-col items-center">
            <Avatar name="Citra Wijaya" medal="bronze" size="lg" />
            <div className="mt-2 font-bold text-sm text-ink truncate max-w-[90px]">Citra W.</div>
            <div className="text-primary font-extrabold text-base md:text-lg">475</div>
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
                {nasional.map((item) => (
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
                  rank={currentUser.rank}
                  name={currentUser.name}
                  twk={currentUser.twk}
                  tiu={currentUser.tiu}
                  tkp={currentUser.tkp}
                  totalScore={currentUser.total}
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
