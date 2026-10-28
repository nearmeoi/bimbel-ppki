import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import jadwalList from '../../data/jadwal.json';
import { useToast } from '../../components/ui/Toast';

export const AdminJadwalPage = ({ onNavigate }) => {
  const toast = useToast();
  const [events, setEvents] = useState(jadwalList);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Try Out Akbar');
  const [date, setDate] = useState('2026-11-10');
  const [time, setTime] = useState('08:00 - 10:00 WIB');
  const [quota, setQuota] = useState(1500);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const item = {
      id: Date.now(),
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
    setEvents([item, ...events]);
    setModalOpen(false);
    toast.success('Jadwal try out baru berhasil ditambahkan!');
    setTitle('');
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.info('Jadwal dihapus.');
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
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => setModalOpen(true)}
          >
            Tambah Jadwal
          </Button>
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
                {events.map((e, idx) => (
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
                        className="p-1.5 rounded-lg border border-black hover:bg-red-50 text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
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
