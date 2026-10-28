import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { User, Target, Award, LogOut, CheckCircle } from 'lucide-react';

/**
 * Bimbel Profil Pengguna Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const ProfilPage = ({ onNavigate }) => {
  const { user, updateProfile, logout } = useAuth();
  const toast = useToast();

  const [targetInstansi, setTargetInstansi] = useState(user.targetInstansi || 'Kemenkumham RI');
  const [targetScore, setTargetScore] = useState(user.targetScore || 450);

  const handleSaveProfile = () => {
    updateProfile({ targetInstansi, targetScore });
    toast.success('Profil dan target kelulusan berhasil diperbarui!');
  };

  const handleLogout = () => {
    logout();
    toast.info('Anda telah keluar dari akun.');
    if (onNavigate) onNavigate('/dashboard');
  };

  return (
    <PageShell currentPath="/profil" onNavigate={onNavigate} user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Profil Siswa</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Kelola data akun, instansi impian, serta ambang batas target skor SKD Anda.
          </p>
        </div>

        {/* User Card */}
        <OutlineCard className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar name={user.name} size="xl" medal="gold" />
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold text-ink">{user.name}</h2>
              <Badge variant="accent">PRO MEMBER</Badge>
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium">{user.email}</p>
            <p className="text-xs font-semibold text-primary">
              Target Formasi: {targetInstansi}
            </p>
          </div>
        </OutlineCard>

        {/* Target Settings */}
        <OutlineCard className="space-y-6">
          <h2 className="text-xl font-extrabold text-ink flex items-center gap-2">
            <Target size={20} className="text-primary" />
            Target Kelulusan CPNS 2026
          </h2>

          <Select
            label="Pilih Instansi / Kementerian Tujuan"
            value={targetInstansi}
            onChange={(e) => setTargetInstansi(e.target.value)}
            options={[
              { value: 'Kemenkumham RI', label: 'Kementerian Hukum & HAM' },
              { value: 'Kejaksaan Agung RI', label: 'Kejaksaan Agung RI' },
              { value: 'Kementerian Keuangan RI', label: 'Kementerian Keuangan' },
              { value: 'Pemerintah Provinsi DKI Jakarta', label: 'Pemerintah Provinsi DKI Jakarta' },
              { value: 'Kementerian Luar Negeri', label: 'Kementerian Luar Negeri' },
            ]}
          />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-ink">Target Total Skor SKD</label>
              <span className="text-2xl font-extrabold text-primary">{targetScore}</span>
            </div>
            <input
              type="range"
              min="311"
              max="550"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[11px] font-bold text-gray-400">
              <span>Ambang Batas Minimum: 311</span>
              <span>Skor Sempurna: 550</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button variant="primary" onClick={handleSaveProfile} className="flex-1">
              Simpan Perubahan
            </Button>
            <Button variant="secondary" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
              <LogOut size={16} /> Keluar Akun
            </Button>
          </div>
        </OutlineCard>
      </div>
    </PageShell>
  );
};

export default ProfilPage;
