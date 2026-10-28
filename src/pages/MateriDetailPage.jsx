import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { ArrowLeft, Play, BookOpen, Check, MessageSquare, FileText } from 'lucide-react';
import materiList from '../data/materi.json';
import { useToast } from '../components/ui/Toast';

/**
 * Bimbel Detail Materi Screen (Video Player, Summary, Sub-chapters)
 * @param {Object} props
 * @param {string} [props.materiId='twk-2']
 * @param {Function} props.onNavigate
 */
export const MateriDetailPage = ({ materiId = 'twk-2', onNavigate }) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('ringkasan');
  const [isPlaying, setIsPlaying] = useState(false);

  const materi =
    materiList.find((m) => m.id === materiId) || materiList[1]; // fallback to Nasionalisme

  const detailTabs = [
    { id: 'ringkasan', label: 'Ringkasan Materi', icon: <FileText size={16} /> },
    { id: 'catatan', label: 'Catatan Saya', icon: <BookOpen size={16} /> },
    { id: 'diskusi', label: 'Diskusi (12)', icon: <MessageSquare size={16} /> },
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
          <Badge variant={materi.type.toLowerCase()}>{materi.type}</Badge>
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
              <img
                src={materi.videoUrl || 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={materi.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-300"
              />
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform z-10 shadow-lg">
                <Play size={32} className="fill-white ml-1 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-bold bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                <span>Modul Video Interaktif</span>
                <span>12:40</span>
              </div>
            </div>
          </OutlineCard>

          {/* Underline Tabs */}
          <Tabs
            items={detailTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />

          {/* Tab Content Display */}
          {activeTab === 'ringkasan' && (
            <div className="bg-white border-2 border-black rounded-neo p-6 md:p-8 space-y-4 shadow-neo-sm">
              <h2 className="text-xl font-extrabold text-ink">Intisari Modul Pembelajaran</h2>
              <p className="font-medium text-base text-gray-800 leading-relaxed">
                {materi.summary}
              </p>
              {materi.keyPoints && (
                <ul className="list-disc pl-5 mt-4 space-y-2 font-medium text-gray-700">
                  {materi.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'catatan' && (
            <div className="bg-white border-2 border-black rounded-neo p-6 space-y-4 shadow-neo-sm">
              <h2 className="text-lg font-bold text-ink">Catatan Pribadi</h2>
              <textarea
                placeholder="Tuliskan catatan penting Anda untuk modul ini..."
                rows={5}
                className="w-full border-2 border-black rounded-xl p-4 font-medium text-sm focus:ring-3 focus:ring-accent focus:outline-none"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={() => toast.success('Catatan berhasil disimpan!')}
              >
                Simpan Catatan
              </Button>
            </div>
          )}

          {activeTab === 'diskusi' && (
            <div className="bg-white border-2 border-black rounded-neo p-6 space-y-4 shadow-neo-sm">
              <h2 className="text-lg font-bold text-ink">Forum Diskusi Soal</h2>
              <div className="space-y-3">
                <div className="p-3 bg-surfacelight rounded-xl border border-black/10">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span className="font-bold text-ink">Rian Pratama</span>
                    <span>10 menit yang lalu</span>
                  </div>
                  <p className="text-xs md:text-sm font-medium">
                    Apakah ada trik cepat membedakan soal bela negara vs nasionalisme jika ada opsi yang mirip?
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Chapter List */}
        <div className="flex-1">
          <OutlineCard className="sticky top-24 space-y-6">
            <h3 className="font-extrabold text-xl text-ink">Daftar Bab</h3>
            <div className="space-y-2.5">
              {materi.chapters.map((ch, idx) => (
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
                      {ch.type === 'video' ? `Video • ${ch.duration}` : ch.duration}
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
