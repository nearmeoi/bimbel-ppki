import React from 'react';
import { SubjectCard } from '../../components/cards/SubjectCard';
import { Button } from '../../components/ui/Button';
import { BookOpen } from 'lucide-react';

/**
 * Dashboard Jenis Materi Section Component
 * Displays 3 subjects (TWK, TIU, TKP) in a responsive 3-column grid.
 */
export const MateriSection = ({
  subjects = [],
  onSelectSubject,
  onViewAllMateri,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3 select-none">
        <h2 className="text-xl font-bold text-ink">Jenis Materi</h2>
        <span className="text-xs font-bold text-gray-500">
          3 Modul Utama SKD
        </span>
      </div>

      {/* 3-Column Grid for TWK, TIU, TKP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((sub) => (
          <SubjectCard
            key={sub.id}
            title={sub.title}
            code={sub.code}
            current={sub.current}
            total={sub.total}
            lastScore={sub.lastScore}
            time={sub.time}
            onClick={() => onSelectSubject && onSelectSubject(sub)}
          />
        ))}
      </div>

      {/* View All Button */}
      <Button
        variant="secondary"
        fullWidth
        className="mt-5 text-sm font-black"
        onClick={onViewAllMateri}
      >
        <BookOpen className="w-4 h-4 mr-1 text-primary" />
        Lihat Silabus & Semua Materi
      </Button>
    </div>
  );
};

export default MateriSection;
