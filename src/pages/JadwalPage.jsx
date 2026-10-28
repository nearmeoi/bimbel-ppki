import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2 } from 'lucide-react';
import jadwalList from '../data/jadwal.json';
import { formatTanggalIndonesia } from '../utils/formatters';
import { useToast } from '../components/ui/Toast';

/**
 * Bimbel Jadwal Try Out & Kalender Simulasi Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const JadwalPage = ({ onNavigate }) => {
  const toast = useToast();
  const [events, setEvents] = useState(jadwalList);

  const toggleRegister = (id) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const nextState = !ev.isRegistered;
          if (nextState) {
            toast.success(`Berhasil mendaftar di ${ev.title}! Tiket simulasi telah aktif.`);
          } else {
            toast.info(`Pendaftaran ${ev.title} dibatalkan.`);
          }
          return {
            ...ev,
            isRegistered: nextState,
            registeredCount: nextState ? ev.registeredCount + 1 : ev.registeredCount - 1,
          };
        }
        return ev;
      })
    );
  };

  return (
    <PageShell currentPath="/jadwal" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Jadwal Try Out</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Agenda try out akbar berkala dan simulasi terjadwal dengan sistem perangkingan serentak.
          </p>
        </div>

        <div className="space-y-4">
          {events.map((ev) => {
            const isDone = ev.status === 'completed';

            return (
              <OutlineCard
                key={ev.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  {/* Date square */}
                  <div className="w-16 h-16 rounded-xl bg-primary text-white flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-sm">
                    <CalendarIcon size={18} className="mb-0.5 opacity-80" />
                    <span className="text-xs font-extrabold">
                      {formatTanggalIndonesia(ev.date).split(' ')[0]} {formatTanggalIndonesia(ev.date).split(' ')[1].slice(0, 3)}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="surface">{ev.category}</Badge>
                      {ev.isRegistered && (
                        <Badge variant="success">
                          <CheckCircle2 size={12} className="inline mr-1" /> Terdaftar
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-ink leading-snug">
                      {ev.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {ev.time} ({ev.duration})
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {ev.registeredCount} / {ev.quota} Peserta
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                  {isDone ? (
                    <Button
                      variant="secondary"
                      onClick={() => onNavigate && onNavigate('/hasil/1')}
                      className="w-full md:w-auto"
                    >
                      Lihat Hasil ({ev.userScore})
                    </Button>
                  ) : ev.isRegistered ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => onNavigate && onNavigate('/latihan/1/kerjakan')}
                        className="w-full md:w-auto"
                      >
                        Masuk Ruang Ujian
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => toggleRegister(ev.id)}
                        className="w-full md:w-auto text-xs"
                      >
                        Batal
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="accent"
                      onClick={() => toggleRegister(ev.id)}
                      className="w-full md:w-auto"
                    >
                      Daftar Sekarang
                    </Button>
                  )}
                </div>
              </OutlineCard>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
};

export default JadwalPage;
