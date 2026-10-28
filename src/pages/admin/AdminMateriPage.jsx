import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Plus, Search, Trash2, BookOpen } from 'lucide-react';
import materiList from '../../data/materi.json';
import { useToast } from '../../components/ui/Toast';

export const AdminMateriPage = ({ onNavigate }) => {
  const toast = useToast();
  const [materis, setMateris] = useState(materiList);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('TWK');
  const [newSummary, setNewSummary] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem = {
      id: `modul-${Date.now()}`,
      title: newTitle,
      type: newType,
      progress: 0,
      status: 'Belum Mulai',
      estimatedTime: '45 Menit',
      summary: newSummary || 'Rangkuman materi pembelajaran SKD terbaru.',
      chapters: [],
    };
    setMateris([...materis, newItem]);
    setModalOpen(false);
    toast.success('Modul materi baru berhasil ditambahkan!');
    setNewTitle('');
    setNewSummary('');
  };

  const handleDelete = (id) => {
    setMateris(materis.filter((m) => m.id !== id));
    toast.info('Modul materi berhasil dihapus.');
  };

  const filtered = materis.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout currentPath="/admin/materi" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink">Kelola Materi</h1>
            <p className="text-sm font-medium text-gray-600">
              Daftar modul pembelajaran video, artikel kisi-kisi, dan ringkasan.
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => setModalOpen(true)}
          >
            Upload Modul Baru
          </Button>
        </div>

        <Input
          placeholder="Cari modul materi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={18} />}
        />

        <OutlineCard className="p-0 overflow-hidden shadow-neo-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-surfacelight border-b-2 border-black font-extrabold text-gray-700">
                  <th className="p-4 w-12 text-center">No</th>
                  <th className="p-4 w-28">Kategori</th>
                  <th className="p-4">Judul Modul</th>
                  <th className="p-4 w-32 text-center">Estimasi</th>
                  <th className="p-4 w-24 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filtered.map((m, idx) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                    <td className="p-4">
                      <Badge variant={m.type.toLowerCase()}>{m.type}</Badge>
                    </td>
                    <td className="p-4 font-bold text-ink">{m.title}</td>
                    <td className="p-4 text-center text-gray-500">{m.estimatedTime}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg border border-black hover:bg-red-50 text-red-600 transition-colors"
                        title="Hapus Modul"
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Tambah Modul Materi Baru"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Select
            label="Kategori Materi"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            options={[
              { value: 'TWK', label: 'TWK (Wawasan Kebangsaan)' },
              { value: 'TIU', label: 'TIU (Intelegensia Umum)' },
              { value: 'TKP', label: 'TKP (Karakteristik Pribadi)' },
            ]}
          />
          <Input
            label="Judul Modul"
            placeholder="Contoh: Integritas & Anti Korupsi"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-bold text-ink mb-1">Ringkasan Materi</label>
            <textarea
              rows={3}
              placeholder="Deskripsi singkat konten yang diajarkan..."
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              className="w-full border-2 border-black rounded-xl p-3 text-xs font-medium focus:ring-3 focus:ring-accent focus:outline-none"
            />
          </div>
          <Button variant="primary" fullWidth type="submit" className="py-3">
            Simpan Modul
          </Button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminMateriPage;
