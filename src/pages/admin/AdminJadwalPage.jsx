import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Calendar, Trash2, RotateCcw } from 'lucide-react';
import jadwalList from '../../data/jadwal.json';
import { useToast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

const STORAGE_KEY = 'bimbel_jadwal_list';

export const AdminJadwalPage = ({ onNavigate }) => {
  const toast = useToast();

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return jadwalList;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Try Out Akbar');
  const [date, setDate] = useState('2026-11-10');
  const [time, setTime] = useState('08:00 - 10:00 WIB');
  const [quota, setQuota] = useState(1500);

  const persistEvents = (list) => {
    setEvents(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchFromSupabase = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase.from('jadwal').select('*').order('date', { ascending: true });
      if (!error && data && data.length > 0) {
        const mapped = data.map((j) => ({
          id: j.id,
          title: j.title,
          category: j.category || 'Try Out Akbar',
          date: j.date,
          time: j.time,
          duration: j.duration || '100 Menit',
          quota: j.quota || 1000,
          registeredCount: j.registered_count || 0,
          isRegistered: false,
          status: j.status || 'upcoming',
        }));
        persistEvents(mapped);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchFromSupabase();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let newId = Date.now();

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('jadwal').insert([
          {
            title,
            category,
            date,
            time,
            duration: '100 Menit',
            quota: Number(quota),
            status: 'upcoming',
          },
        ]).select();
        if (data && data[0]?.id) {
          newId = data[0].id;
        }
      } catch (err) {
        console.warn('Gagal insert jadwal ke Supabase:', err);
      }
    }

    const item = {
      id: newId,
      title,
      category,
      date,
      time,
      duration: '100 Menit',
      quota: Number(quota),
      registeredCount: 0,
      isRegistered: false,
      status: 'upcoming',
    };

    const updated = [item, ...events];
    persistEvents(updated);
    setModalOpen(false);
    toast.success('Jadwal try out baru berhasil disimpan permanen!');
    setTitle('');
  };

  const handleDelete = async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('jadwal').delete().eq('id', id);
      } catch (err) {
        console.warn('Gagal delete jadwal di Supabase:', err);
      }
    }

    const updated = events.filter((e) => e.id !== id);
    persistEvents(updated);
    toast.success('Jadwal berhasil dihapus secara permanen.');
  };

  const handleReset = () => {
    if (window.confirm('Muat ulang daftar jadwal ke default?')) {
      persistEvents(jadwalList);
      toast.info('Jadwal telah direset ke data bawaan.');
    }
  };

  return (
    <AdminLayout currentPath="/admin/jadwal" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink">Jadwal Try Out</h1>
            <p className="text-sm font-medium text-gray-600">
              Atur tanggal pelaksanaan simulasi CAT dan kuota peserta.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReset}
              leftIcon={<RotateCcw size={14} />}
              title="Reset ke Jadwal Default"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => setModalOpen(true)}
            >
              Tambah Jadwal
            </Button>
          </div>
        </div>

        <OutlineCard className="p-0 overflow-hidden shadow-neo-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-surfacelight border-b-2 border-black font-extrabold text-gray-700">
                  <th className="p-4 w-12 text-center">No</th>
                  <th className="p-4">Nama Sesi Try Out</th>
                  <th className="p-4 w-32">Kategori</th>
                  <th className="p-4 w-40">Tanggal &amp; Jam</th>
                  <th className="p-4 w-28 text-center">Kuota</th>
                  <th className="p-4 w-24 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-bold">
                      Belum ada agenda jadwal simulasi try out.
                    </td>
                  </tr>
                ) : (
                  events.map((e, idx) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                      <td className="p-4 font-bold text-ink">{e.title}</td>
                      <td className="p-4">
                        <Badge variant="surface">{e.category}</Badge>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div>{e.date}</div>
                        <div className="text-[11px] text-gray-400">{e.time}</div>
                      </td>
                      <td className="p-4 text-center font-bold">{e.quota}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="p-1.5 rounded-lg border border-black hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                          title="Hapus Jadwal Permanen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </OutlineCard>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Jadwal Try Out">
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Nama Sesi Simulasi"
            placeholder="Contoh: Try Out Akbar Batch 5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Tanggal (YYYY-MM-DD)" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input label="Waktu" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <Input label="Target Kuota Peserta" type="number" value={quota} onChange={(e) => setQuota(e.target.value)} />
          <Button variant="primary" fullWidth type="submit" className="py-3">
            Simpan Jadwal
          </Button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminJadwalPage;
