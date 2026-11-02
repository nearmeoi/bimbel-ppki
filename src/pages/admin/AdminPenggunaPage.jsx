import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Search, UserCheck, Shield, RefreshCw, Star, ShieldAlert } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

export const AdminPenggunaPage = ({ onNavigate }) => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const defaultUsers = [
    { id: 'usr-1', name: 'Agus Triyono', email: 'agus.t@gmail.com', role: 'student', instansi: 'Kemenkumham', score: 495, isPro: true },
    { id: 'usr-2', name: 'Budi Santoso', email: 'budi.s@gmail.com', role: 'student', instansi: 'Kejaksaan Agung', score: 480, isPro: true },
    { id: 'usr-3', name: 'Citra Wijaya', email: 'citra.w@gmail.com', role: 'student', instansi: 'Kemenkeu', score: 475, isPro: false },
    { id: 'usr-4', name: 'Dewi Anjani', email: 'dewi.a@gmail.com', role: 'student', instansi: 'Pemprov DKI', score: 440, isPro: false },
    { id: 'usr-5', name: 'Admin Bimbel', email: 'admin@bimbel.id', role: 'admin', instansi: 'Pusat BKN', score: '-', isPro: true },
  ];

  const [users, setUsers] = useState(defaultUsers);

  const fetchUsers = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Gagal memuat profil Supabase:', error);
      } else if (data && data.length > 0) {
        setUsers(
          data.map((u) => ({
            id: u.id,
            name: u.name || 'Pengguna',
            email: u.email || '-',
            role: u.role || 'student',
            instansi: u.target_instansi || 'Kemenkumham RI',
            score: u.target_score || 450,
            isPro: u.is_pro || false,
          }))
        );
      }
    } catch (err) {
      console.warn('Error saat fetch profil:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (targetUser) => {
    const newRole = targetUser.role === 'admin' ? 'student' : 'admin';
    setUpdatingId(targetUser.id);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('profiles')
          .update({ role: newRole })
          .eq('id', targetUser.id);

        if (error) throw error;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === targetUser.id ? { ...u, role: newRole } : u))
      );
      toast.success(
        `Peran ${targetUser.name} berhasil diubah menjadi ${newRole === 'admin' ? 'Administrator' : 'Siswa'}!`
      );
    } catch (err) {
      toast.error('Gagal memperbarui peran pengguna: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTogglePro = async (targetUser) => {
    const newPro = !targetUser.isPro;
    setUpdatingId(targetUser.id);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('profiles')
          .update({ is_pro: newPro })
          .eq('id', targetUser.id);

        if (error) throw error;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === targetUser.id ? { ...u, isPro: newPro } : u))
      );
      toast.success(
        `Status ${targetUser.name} diubah menjadi ${newPro ? 'PRO Member' : 'Member Biasa'}!`
      );
    } catch (err) {
      toast.error('Gagal memperbarui status Pro: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.instansi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout currentPath="/admin/pengguna" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink">Data Pengguna & Hak Akses</h1>
            <p className="text-sm font-medium text-gray-600">
              Kelola data seluruh siswa terdaftar, perbarui role Administrator, dan aktivasi paket Pro.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchUsers}
            leftIcon={<RefreshCw size={14} className={loading ? 'animate-spin' : ''} />}
          >
            Segarkan
          </Button>
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
                  <th className="p-4 text-center">Peran (Role)</th>
                  <th className="p-4">Target Instansi</th>
                  <th className="p-4 text-center">Status Akses</th>
                  <th className="p-4 text-right">Tindakan Admin</th>
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
                    <td className="p-4 text-center">
                      {u.role === 'admin' ? (
                        <Badge variant="accent">🛡️ ADMIN</Badge>
                      ) : (
                        <Badge variant="surface">SISWA</Badge>
                      )}
                    </td>
                    <td className="p-4 font-bold text-ink">{u.instansi}</td>
                    <td className="p-4 text-center">
                      <Badge variant={u.isPro ? 'accent' : 'surface'}>
                        {u.isPro ? 'GARUDA PRO' : 'GRATIS'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={updatingId === u.id}
                          onClick={() => handleTogglePro(u)}
                          className="text-xs py-1 px-2.5"
                          title="Ubah status Pro"
                        >
                          <Star size={13} className={u.isPro ? 'text-amber-500 fill-amber-500' : ''} />
                          {u.isPro ? 'Cabut Pro' : 'Beri Pro'}
                        </Button>
                        <Button
                          size="sm"
                          variant={u.role === 'admin' ? 'secondary' : 'primary'}
                          disabled={updatingId === u.id}
                          onClick={() => handleToggleRole(u)}
                          className="text-xs py-1 px-2.5"
                          title="Ubah peran admin/siswa"
                        >
                          <Shield size={13} />
                          {u.role === 'admin' ? 'Jadikan Siswa' : 'Jadikan Admin'}
                        </Button>
                      </div>
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
