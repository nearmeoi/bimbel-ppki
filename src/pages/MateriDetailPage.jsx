import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { ArrowLeft, Play, BookOpen, Check, MessageSquare, FileText } from 'lucide-react';
import materiList from '../data/materi.json';
import { useToast } from '../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Bimbel Detail Materi Screen (Video Player, Summary, Sub-chapters)
 * @param {Object} props
 * @param {string} [props.materiId]
 * @param {Object} [props.params]
 * @param {Function} props.onNavigate
 */
export const MateriDetailPage = ({ materiId, params, onNavigate }) => {
  const toast = useToast();
  const urlParams = useParams();
  const actualId = params?.id || urlParams?.id || materiId || 'twk-2';

  const [activeTab, setActiveTab] = useState('ringkasan');
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback awal dari JSON lokal
  const fallbackMateri =
    materiList.find((m) => m.id === actualId) || materiList[1];
  const [materi, setMateri] = useState(fallbackMateri);

  // [BACKEND-DYNAMIC]: Detail modul materi & sub-bab video dari public.materi & public.materi_chapters
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchMateriDetail = async () => {
      try {
        const { data: dbMateri, error } = await supabase
          .from('materi')
          .select('*, chapters:materi_chapters(*)')
          .eq('id', actualId)
          .maybeSingle();

        if (error) {
          console.warn('Gagal memuat detail materi:', error);
          return;
        }

        if (dbMateri) {
          const chapters = (dbMateri.chapters || []).sort(
            (a, b) => (a.order_num || 0) - (b.order_num || 0)
          );

          setMateri({
            id: dbMateri.id,
            type: dbMateri.type,
            title: dbMateri.title,
            summary: dbMateri.summary,
            videoUrl: dbMateri.video_url || fallbackMateri.videoUrl,
            keyPoints: Array.isArray(dbMateri.key_points)
              ? dbMateri.key_points
              : JSON.parse(dbMateri.key_points || '[]'),
            chapters:
              chapters.length > 0
                ? chapters.map((ch, idx) => ({
                    id: ch.id,
                    title: ch.title,
                    type: ch.type,
                    duration: ch.duration,
                    completed: false,
                    active: idx === 0,
                  }))
                : fallbackMateri.chapters,
          });
        }
      } catch (err) {
        console.warn('Error load detail materi:', err);
      }
    };

    fetchMateriDetail();
  }, [actualId]);

  const detailTabs = [
    { id: 'ringkasan', label: 'Ringkasan Materi', icon: <FileText size={16} /> },
    { id: 'catatan', label: 'Catatan Saya', icon: <BookOpen size={16} /> },
    { id: 'diskusi', label: 'Diskusi Komunitas', icon: <MessageSquare size={16} /> },
  ];

  return (
    <PageShell currentPath="/materi" onNavigate={onNavigate}>
      {/* Header & Back Action */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate && onNavigate('/materi')}
          className="flex items-center gap-2 font-bold text-ink mb-3 hover:underline cursor-pointer group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Katalog Materi
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink">
            {materi.title}
          </h1>
          <Badge variant={(materi.type || 'twk').toLowerCase()}>{materi.type}</Badge>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area (Player + Text Summary) */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* Video Player Card */}
          <OutlineCard className="p-2 sm:p-3 overflow-hidden">
            <div
              onClick={() => {
                setIsPlaying(!isPlaying);
                toast.info(isPlaying ? 'Video dijeda' : 'Memutar materi video pembelajaran');
              }}
              className="bg-black w-full aspect-video rounded-xl flex items-center justify-center text-white relative group cursor-pointer overflow-hidden shadow-inner"
            >
              {materi.videoUrl && (
                <img
                  src={materi.videoUrl}
                  alt={materi.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
              )}

              <div className="absolute w-16 h-16 rounded-full bg-accent text-ink border-2 border-black flex items-center justify-center shadow-neo group-hover:scale-110 transition-transform">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-bold drop-shadow">
                <span>Modul Video Pembelajaran Terpadu</span>
                <span>45:00</span>
              </div>
            </div>
          </OutlineCard>

          {/* Sub-tabs: Ringkasan, Catatan, Diskusi */}
          <Tabs
            items={detailTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="default"
          />

          {/* Tab Content */}
          {activeTab === 'ringkasan' && (
            <OutlineCard className="space-y-4">
              <h2 className="font-extrabold text-xl text-ink">Poin-Poin Kunci Kisi-Kisi BKN</h2>
              <ul className="space-y-2.5">
                {(materi.keyPoints || []).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-medium text-gray-800">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-primary border border-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-sm text-ink mb-1">Rangkuman Naratif</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                  {materi.summary}
                </p>
              </div>
            </OutlineCard>
          )}

          {activeTab === 'catatan' && (
            <OutlineCard className="space-y-4">
              <h2 className="font-extrabold text-lg text-ink">Catatan Pribadi Siswa</h2>
              <textarea
                rows={5}
                placeholder="Tuliskan catatan penting Anda untuk materi ini..."
                className="w-full border-2 border-black rounded-xl p-3 text-sm font-medium focus:ring-3 focus:ring-accent focus:outline-none"
              />
              <Button variant="primary" size="sm" onClick={() => toast.success('Catatan disimpan!')}>
                Simpan Catatan
              </Button>
            </OutlineCard>
          )}

          {activeTab === 'diskusi' && (
            <OutlineCard className="space-y-4">
              <h2 className="font-extrabold text-lg text-ink">Ruang Diskusi &amp; Tanya Mentor</h2>
              <p className="text-xs text-gray-600 font-medium">
                Ada pertanyaan mengenai butir materi ini? Tanyakan langsung ke mentor ASN.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tulis tanggapan atau pertanyaan..."
                  className="flex-1 border-2 border-black rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button variant="primary" onClick={() => toast.success('Pertanyaan terkirim!')}>
                  Kirim
                </Button>
              </div>
            </OutlineCard>
          )}
        </div>

        {/* Sidebar: Chapters & Next Step */}
        <div className="flex-1">
          <OutlineCard className="space-y-4 sticky top-24">
            <h3 className="font-extrabold text-xl text-ink">Daftar Bab Pembelajaran</h3>
            <div className="space-y-2.5">
              {(materi.chapters || []).map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => toast.info(`Membuka bab: ${ch.title}`)}
                  className={`
                    flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-150
                    ${
                      ch.active
                        ? 'bg-blue-50 border-primary text-primary shadow-sm'
                        : 'bg-white border-gray-200 hover:border-black hover:bg-surfacelight'
                    }
                  `}
                >
                  <div className="mt-0.5">
                    {ch.completed ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Play size={18} className={ch.active ? 'text-primary' : 'text-gray-400'} />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-ink leading-snug">{ch.title}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                      {ch.type === 'video' ? `Video • ${ch.duration || '15 min'}` : ch.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => toast.success('Melanjutkan ke bab berikutnya!')}
            >
              Lanjutkan Belajar
            </Button>
          </OutlineCard>
        </div>
      </div>
    </PageShell>
  );
};

export default MateriDetailPage;
