import React, { useState, useEffect } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { TryOutItem } from '../components/cards/TryOutItem';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useExam } from '../context/ExamContext';
import { Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const DEFAULT_SIMULATION_SETS = [
  {
    setNumber: 1,
    title: 'Simulasi SKD Campuran Set 1',
    category: 'Try Out Mini',
    questionCount: 30,
    duration: '45 Menit',
  },
  {
    setNumber: 2,
    title: 'Simulasi SKD Campuran Set 2',
    category: 'Try Out Mini',
    questionCount: 30,
    duration: '45 Menit',
  },
  {
    setNumber: 3,
    title: 'Fokus TWK: Sejarah & Pilar Negara',
    category: 'Pendalaman Khusus',
    questionCount: 30,
    duration: '40 Menit',
  },
  {
    setNumber: 4,
    title: 'Fokus TIU: Silogisme & Berhitung Cepat',
    category: 'Pendalaman Khusus',
    questionCount: 30,
    duration: '45 Menit',
  },
  {
    setNumber: 5,
    title: 'Fokus TKP: Pelayanan & Jejaring Kerja',
    category: 'Pendalaman Khusus',
    questionCount: 30,
    duration: '35 Menit',
  },
  {
    setNumber: 6,
    title: 'Simulasi Akbar CAT BKN Terpadu',
    category: 'Simulasi Lengkap',
    questionCount: 110,
    duration: '100 Menit',
  },
];

/**
 * Bimbel Latihan Soal Catalog Screen with Pre-Start Rules Modal
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const LatihanPage = ({ onNavigate }) => {
  const { resetExam, loadQuestionsForSet } = useExam();
  const [simulationSets, setSimulationSets] = useState(DEFAULT_SIMULATION_SETS);
  const [selectedSet, setSelectedSet] = useState(null);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // [BACKEND-DYNAMIC]: Ambil paket simulasi aktif dari tabel public.simulasi_sets
    const fetchSimulasiSets = async () => {
      try {
        const { data, error } = await supabase
          .from('simulasi_sets')
          .select('*')
          .eq('is_active', true)
          .order('id', { ascending: true });

        if (error) {
          console.warn('Gagal memuat simulasi sets dari Supabase:', error);
        } else if (data && data.length > 0) {
          setSimulationSets(
            data.map((row) => ({
              setNumber: row.id,
              title: row.title,
              category: row.category || 'Try Out Mini',
              questionCount: row.question_count || 30,
              duration: `${Math.round((row.duration_seconds || 2700) / 60)} Menit`,
            }))
          );
        }
      } catch (err) {
        console.warn('Error load simulasi sets:', err);
      }
    };

    fetchSimulasiSets();
  }, []);

  const handleOpenRules = (set) => {
    setSelectedSet(set);
    setRulesModalOpen(true);
  };

  const handleStartExam = async () => {
    const targetSetId = selectedSet?.setNumber || 1;
    const targetTitle = selectedSet?.title || 'Simulasi SKD Campuran Set 1';
    
    resetExam(targetSetId, targetTitle);
    await loadQuestionsForSet(targetSetId, targetTitle);
    setRulesModalOpen(false);
    
    if (onNavigate) {
      onNavigate(`/latihan/${targetSetId}/kerjakan`);
    }
  };

  return (
    <PageShell currentPath="/latihan" onNavigate={onNavigate}>
      <div className="mb-8 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Latihan Soal</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Asah kemampuanmu dengan ribuan kombinasi soal CAT sebelum menghadapi ujian sesungguhnya.
          </p>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
          {simulationSets.map((item) => (
            <TryOutItem
              key={item.setNumber}
              setNumber={item.setNumber}
              title={item.title}
              category={item.category}
              questionCount={item.questionCount}
              duration={item.duration}
              onStart={() => handleOpenRules(item)}
            />
          ))}
        </div>
      </div>

      {/* Pre-start Rules Modal */}
      <Modal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
        title={selectedSet?.title || 'Petunjuk Pengerjaan Ujian'}
        description="Bacalah aturan dan tata tertib ujian berikut dengan saksama."
        footer={
          <>
            <Button variant="secondary" onClick={() => setRulesModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleStartExam}>
              Mulai Ujian Sekarang
            </Button>
          </>
        }
      >
        <div className="space-y-4 py-2 text-sm text-gray-800">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50 border border-primary/20">
            <Clock size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-ink">Batas Waktu Pengerjaan ({selectedSet?.duration || '45 Menit'})</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Waktu akan berjalan mundur otomatis. Ujian otomatis dikumpulkan saat waktu habis.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-300">
            <ShieldCheck size={20} className="text-amber-700 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-ink">Sistem Penilaian Resmi BKN</p>
              <p className="text-xs text-gray-600 mt-0.5">
                TWK &amp; TIU: Benar bernilai 5, Salah/Kosong 0. TKP bernilai skala 1 hingga 5.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surfacelight border border-black/10">
            <HelpCircle size={20} className="text-ink mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-ink">Fitur Ragu-Ragu &amp; Navigasi</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Gunakan tombol "Tandai Ragu" untuk meninjau kembali jawaban sebelum mengakhiri sesi.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
};

export default LatihanPage;
