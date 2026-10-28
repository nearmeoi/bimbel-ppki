import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Search, UserCheck, Shield } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export const AdminPenggunaPage = ({ onNavigate }) => {
  const toast = useToast();
  const [search, setSearch] = useState('');

  const users = [
    { id: 1, name: 'Agus Triyono', email: 'agus.t@gmail.com', role: 'student', instansi: 'Kemenkumham', score: 495, paket: 'Garuda PRO' },
    { id: 2, name: 'Budi Santoso', email: 'budi.s@gmail.com', role: 'student', instansi: 'Kejaksaan Agung', score: 480, paket: 'Garuda PRO' },
    { id: 3, name: 'Citra Wijaya', email: 'citra.w@gmail.com', role: 'student', instansi: 'Kemenkeu', score: 475, paket: 'Pejuang SKD' },
    { id: 4, name: 'Dewi Anjani', email: 'dewi.a@gmail.com', role: 'student', instansi: 'Pemprov DKI', score: 440, paket: 'Gratis' },
    { id: 5, name: 'Admin Bimbel', email: 'admin@bimbel.id', role: 'admin', instansi: 'Pusat', score: '-', paket: 'Super Admin' },
  ];

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.instansi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout currentPath="/admin/pengguna" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink">Data Pengguna</h1>
          <p className="text-sm font-medium text-gray-600">
            Daftar seluruh siswa terdaftar, status keanggotaan paket, dan target instansi.
          </p>
        </div>

        <Input
          placeholder="Cari berdasarkan nama, email, atau instansi..."
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
                  <th className="p-4">Pengguna</th>
                  <th className="p-4">Target Instansi</th>
                  <th className="p-4 text-center">Skor Tertinggi</th>
                  <th className="p-4 text-center">Paket</th>
                  <th className="p-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filtered.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <div className="font-bold text-ink">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-ink">{u.instansi}</td>
                    <td className="p-4 text-center font-extrabold text-primary">{u.score}</td>
                    <td className="p-4 text-center">
                      <Badge variant={u.paket === 'Garuda PRO' ? 'accent' : 'surface'}>
                        {u.paket}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toast.info(`Akses detail profil ${u.name}`)}
                        className="text-xs py-1 px-3"
                      >
                        Kelola
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OutlineCard>
      </div>
    </AdminLayout>
  );
};

export default AdminPenggunaPage;
