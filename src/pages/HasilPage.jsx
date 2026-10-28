import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Trophy, CheckCircle2, XCircle } from 'lucide-react';
import { useExam } from '../context/ExamContext';

/**
 * Bimbel Hasil Ujian & Evaluasi Passing Grade Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const HasilPage = ({ onNavigate }) => {
  const { examResult } = useExam();

  // Fallback realistic score if exam was visited directly
  const totalScore = examResult?.totalScore || 410;
  const isLulus = examResult?.isLulus ?? true;

  const subjectsData = [
    {
      title: 'TWK',
      name: 'Tes Wawasan Kebangsaan',
      score: examResult?.subjects?.TWK?.score ?? 100,
      pass: 65,
      isPass: (examResult?.subjects?.TWK?.score ?? 100) >= 65,
    },
    {
      title: 'TIU',
      name: 'Tes Intelegensia Umum',
      score: examResult?.subjects?.TIU?.score ?? 140,
      pass: 80,
      isPass: (examResult?.subjects?.TIU?.score ?? 140) >= 80,
    },
    {
      title: 'TKP',
      name: 'Tes Karakteristik Pribadi',
      score: examResult?.subjects?.TKP?.score ?? 170,
      pass: 166,
      isPass: (examResult?.subjects?.TKP?.score ?? 170) >= 166,
    },
  ];

  return (
    <PageShell currentPath="/latihan" onNavigate={onNavigate}>
      {/* Top Back Action */}
      <div className="mb-4">
        <button
          onClick={() => onNavigate && onNavigate('/latihan')}
          className="flex items-center gap-2 font-bold text-ink hover:underline cursor-pointer group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Daftar Latihan
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Score & Breakdown Column */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* Hero Score Card matching Stitch */}
          <OutlineCard className="text-center py-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-extrabold text-ink mb-1">
              Simulasi SKD Set 1 Selesai!
            </h2>
            <p className="text-gray-600 font-medium mb-8 text-sm md:text-base">
              {isLulus
                ? 'Selamat! Nilai Anda telah melampaui seluruh ambang batas (Passing Grade).'
                : 'Terus berlatih! Tingkatkan sub-materi yang belum memenuhi ambang batas.'}
            </p>

            {/* Total Score Badge Box */}
            <div className="inline-block border-4 border-black rounded-neo-lg px-10 md:px-14 py-6 bg-surfacelight relative shadow-neo-lg select-none">
              <div className="absolute -top-4 -left-4 text-4xl">🎉</div>
              <div className="text-xs md:text-sm font-extrabold text-gray-500 uppercase tracking-widest mb-1">
                Total Skor Akhir
              </div>
              <div className="text-6xl md:text-7xl font-extrabold text-primary">
                {totalScore}
              </div>
            </div>
          </OutlineCard>

          {/* Subject Passing Grade Breakdown */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-xl text-ink">Rincian Nilai per Modul</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subjectsData.map((s) => (
                <OutlineCard key={s.title} className="flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-extrabold text-xl text-ink">{s.title}</div>
                        <div className="text-[11px] font-medium text-gray-500 truncate max-w-[130px]">
                          {s.name}
                        </div>
                      </div>
                      <Badge variant={s.isPass ? 'success' : 'danger'}>
                        {s.isPass ? 'Lulus PG' : 'Gagal PG'}
                      </Badge>
                    </div>

                    <div className="text-4xl font-extrabold text-ink mb-1">
                      {s.score}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-gray-500 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span>Passing Grade</span>
                    <span className="font-extrabold text-ink">{s.pass}</span>
                  </div>
                </OutlineCard>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Rank & Actions */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="border-2 border-black rounded-neo p-6 bg-accent text-ink shadow-neo-sm">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={20} />
              <h3 className="font-extrabold text-xl">Peringkat Sementara</h3>
            </div>
            <div className="text-5xl md:text-6xl font-extrabold my-2 text-ink">
              #24
            </div>
            <p className="text-xs md:text-sm font-semibold text-ink/80">
              Dari 1.250 peserta simulasi batch nasional ini.
            </p>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => onNavigate && onNavigate('/hasil/1/pembahasan')}
            className="py-4 text-base md:text-lg"
          >
            Lihat Kunci &amp; Pembahasan
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => onNavigate && onNavigate('/dashboard')}
            className="py-4 text-base md:text-lg"
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    </PageShell>
  );
};

export default HasilPage;
