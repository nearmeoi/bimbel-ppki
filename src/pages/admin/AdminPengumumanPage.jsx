import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Bell, Trash2 } from 'lucide-react';
import dashboardData from '../../data/dashboard.json';
import { useToast } from '../../components/ui/Toast';

export const AdminPengumumanPage = ({ onNavigate }) => {
  const toast = useToast();
  const [list, setList] = useState(dashboardData.pengumuman);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [month, setMonth] = useState('NOV');
  const [day, setDay] = useState('10');
  const [time, setTime] = useState('08:00 - 10:00 WIB');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const item = {
      id: Date.now(),
      badge: 'Pengumuman Baru',
      date: { month, day },
      title,
      time,
      description: desc,
    };
    setList([item, ...list]);
    setModalOpen(false);
    toast.success('Pengumuman baru berhasil disiarkan ke dashboard siswa!');
    setTitle('');
    setDesc('');
  };

  const handleDelete = (id) => {
    setList(list.filter((p) => p.id !== id));
    toast.info('Pengumuman dihapus.');
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
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => setModalOpen(true)}
          >
            Buat Pengumuman
          </Button>
        </div>

        <div className="space-y-4">
          {list.map((item) => (
            <OutlineCard
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary text-white rounded-xl flex flex-col items-center justify-center font-bold flex-shrink-0">
                  <span className="text-xs uppercase">{item.date.month}</span>
                  <span className="text-xl leading-none">{item.date.day}</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base md:text-lg text-ink">{item.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{item.time}</p>
                  <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg border border-black hover:bg-red-50 text-red-600 self-end sm:self-center"
                title="Hapus"
              >
                <Trash2 size={16} />
              </button>
            </OutlineCard>
          ))}
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
