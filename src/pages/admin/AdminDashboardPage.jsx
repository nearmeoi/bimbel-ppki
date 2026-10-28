import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { StatCard } from '../../components/cards/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Upload, Bell, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

/**
 * Bimbel Admin Dashboard Overview Screen (/admin/dashboard)
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const AdminDashboardPage = ({ onNavigate }) => {
  const toast = useToast();

  return (
    <AdminLayout currentPath="/admin/dashboard" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink">
            Ringkasan Administrator
          </h1>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Pantau status operasional platform, bank soal CAT, dan partisipasi siswa aktif.
          </p>
        </div>

        {/* Admin KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="1.450" label="Total Soal CAT" />
          <StatCard value="48" label="Paket Try Out" />
          <StatCard value="12.890" label="Siswa Terdaftar" />
          <StatCard value="94.2%" label="Server Uptime" />
        </div>

        {/* Quick Actions Grid */}
        <OutlineCard className="space-y-4">
          <h2 className="text-lg font-extrabold text-ink">Tindakan Cepat Admin</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={() => onNavigate && onNavigate('/admin/soal')}
            >
              Tambah Soal Baru
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Upload size={16} />}
              onClick={() => onNavigate && onNavigate('/admin/materi')}
            >
              Kelola Modul Materi
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Bell size={16} />}
              onClick={() => onNavigate && onNavigate('/admin/pengumuman')}
            >
              Buat Pengumuman Baru
            </Button>
          </div>
        </OutlineCard>

        {/* Recent Registrations Table */}
        <OutlineCard className="p-0 overflow-hidden space-y-0">
          <div className="p-5 border-b-2 border-black flex justify-between items-center bg-surfacelight">
            <h2 className="font-extrabold text-lg text-ink">Aktivitas Siswa Terbaru</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate && onNavigate('/admin/pengguna')}
              className="text-xs"
            >
              Lihat Semua Siswa <ArrowRight size={14} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b-2 border-black/10 bg-white font-extrabold text-gray-600">
                  <th className="p-4">Nama Siswa</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Target Formasi</th>
                  <th className="p-4 text-center">Status Paket</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    name: 'Agus Triyono',
                    email: 'agus.t@gmail.com',
                    instansi: 'Kemenkumham',
                    paket: 'Garuda PRO',
                  },
                  {
                    name: 'Budi Santoso',
                    email: 'budi.s@gmail.com',
                    instansi: 'Kejaksaan Agung',
                    paket: 'Garuda PRO',
                  },
                  {
                    name: 'Citra Wijaya',
                    email: 'citra.w@gmail.com',
                    instansi: 'Kemenkeu',
                    paket: 'Pejuang SKD',
                  },
                  {
                    name: 'Dewi Anjani',
                    email: 'dewi.a@gmail.com',
                    instansi: 'Pemprov DKI',
                    paket: 'Gratis',
                  },
                ].map((s, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 font-medium">
                    <td className="p-4 font-bold text-ink">{s.name}</td>
                    <td className="p-4 text-gray-500">{s.email}</td>
                    <td className="p-4">{s.instansi}</td>
                    <td className="p-4 text-center">
                      <Badge
                        variant={s.paket === 'Garuda PRO' ? 'accent' : 'surface'}
                      >
                        {s.paket}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toast.info(`Detail siswa ${s.name}`)}
                        className="text-xs py-1 px-3"
                      >
                        Detail
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

export default AdminDashboardPage;
