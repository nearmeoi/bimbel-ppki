import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Bell, Trash2, RotateCcw } from 'lucide-react';
import dashboardData from '../../data/dashboard.json';
import { useToast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

const STORAGE_KEY = 'bimbel_pengumuman_list';

export const AdminPengumumanPage = ({ onNavigate }) => {
  const toast = useToast();

  const [list, setList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return dashboardData.pengumuman;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [month, setMonth] = useState('NOV');
  const [day, setDay] = useState('10');
  const [time, setTime] = useState('08:00 - 10:00 WIB');

  const persistList = (items) => {
    setList(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchFromSupabase = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase.from('pengumuman').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map((p) => ({
          id: p.id,
          badge: p.badge || 'Pengumuman Baru',
          date: { month: p.event_month || 'NOV', day: p.event_day || '10' },
          title: p.title,
          time: p.time,
          description: p.description,
        }));
        persistList(mapped);
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
        const { data, error } = await supabase.from('pengumuman').insert([
          {
            badge: 'Pengumuman Baru',
            event_month: month,
            event_day: day,
            title,
            time,
            description: desc,
          },
        ]).select();
        if (data && data[0]?.id) {
          newId = data[0].id;
        }
      } catch (err) {
        console.warn('Gagal insert pengumuman ke Supabase:', err);
      }
    }

    const item = {
      id: newId,
      badge: 'Pengumuman Baru',
      date: { month, day },
      title,
      time,
      description: desc,
    };

    const updated = [item, ...list];
    persistList(updated);
    setModalOpen(false);
    toast.success('Pengumuman baru berhasil disimpan secara permanen!');
    setTitle('');
    setDesc('');
  };

  const handleDelete = async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('pengumuman').delete().eq('id', id);
      } catch (err) {
        console.warn('Gagal delete pengumuman di Supabase:', err);
      }
    }

    const updated = list.filter((p) => p.id !== id);
    persistList(updated);
    toast.success('Pengumuman berhasil dihapus secara permanen.');
  };

  const handleReset = () => {
    if (window.confirm('Muat ulang daftar pengumuman ke default?')) {
      persistList(dashboardData.pengumuman);
      toast.info('Pengumuman telah direset ke data bawaan.');
    }
  };

  return (
    <AdminLayout currentPath="/admin/pengumuman" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink">Kelola Pengumuman</h1>
            <p className="text-sm font-medium text-gray-600">
              Siarkan jadwal try out, webinar, dan update penting kepada seluruh peserta.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReset}
              leftIcon={<RotateCcw size={14} />}
              title="Reset ke Pengumuman Default"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => setModalOpen(true)}
            >
              Buat Pengumuman
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {list.length === 0 ? (
            <OutlineCard className="p-8 text-center text-gray-500 font-bold">
              Belum ada siaran pengumuman aktif.
            </OutlineCard>
          ) : (
            list.map((item) => (
              <OutlineCard
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary text-white rounded-xl flex flex-col items-center justify-center font-bold flex-shrink-0">
                    <span className="text-xs uppercase">{item.date?.month || 'NOV'}</span>
                    <span className="text-xl leading-none">{item.date?.day || '10'}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base md:text-lg text-ink">{item.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{item.time}</p>
                    <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg border border-black hover:bg-red-50 text-red-600 self-end sm:self-center transition-colors cursor-pointer"
                  title="Hapus Pengumuman Permanen"
                >
                  <Trash2 size={16} />
                </button>
              </OutlineCard>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Buat Pengumuman Baru"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Judul Pengumuman"
            placeholder="Contoh: Try Out Akbar Nasional Batch 5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <Input label="Bulan (3 Huruf)" value={month} onChange={(e) => setMonth(e.target.value)} />
            <Input label="Tanggal" value={day} onChange={(e) => setDay(e.target.value)} />
            <Input label="Waktu" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-1">Keterangan Tambahan</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border-2 border-black rounded-xl p-3 text-xs font-medium focus:ring-3 focus:ring-accent focus:outline-none"
            />
          </div>
          <Button variant="primary" fullWidth type="submit" className="py-3">
            Siarkan Pengumuman
          </Button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminPengumumanPage;
