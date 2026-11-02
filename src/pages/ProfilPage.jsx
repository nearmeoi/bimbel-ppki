import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { User, Target, Award, LogOut, CheckCircle, Shield, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * Bimbel Profil Pengguna Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const ProfilPage = ({ onNavigate }) => {
  const { user, updateProfile, promoteToAdmin, logout } = useAuth();
  const toast = useToast();
  const [upgrading, setUpgrading] = useState(false);

  const [targetInstansi, setTargetInstansi] = useState(user?.targetInstansi || 'Kemenkumham RI');
  const [targetScore, setTargetScore] = useState(user?.targetScore || 450);

  const handleSaveProfile = async () => {
    await updateProfile({ targetInstansi, targetScore });
    toast.success('Profil dan target kelulusan berhasil diperbarui!');
  };

  const handleLogout = async () => {
    await logout();
    toast.info('Anda telah keluar dari akun.');
    if (onNavigate) onNavigate('/masuk');
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
          <Avatar name={user?.name || 'Siswa'} size="xl" medal="gold" />
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold text-ink">{user?.name || 'Calon ASN'}</h2>
              {user?.role === 'admin' ? (
                <Badge variant="accent">🛡️ ADMINISTRATOR</Badge>
              ) : (
                <Badge variant="surface">SISWA</Badge>
              )}
              {user?.isPro && <Badge variant="accent">PRO MEMBER</Badge>}
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium">{user?.email || '-'}</p>
            <p className="text-xs font-semibold text-primary">
              Target Formasi: {targetInstansi}
            </p>
          </div>
        </OutlineCard>

        {/* Admin Access Panel Box */}
        <OutlineCard className="space-y-4 bg-gradient-to-br from-white to-blue-50/50">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={22} />
              <h2 className="text-lg md:text-xl font-extrabold text-ink">Hak Akses & Panel Admin</h2>
            </div>
            {user?.role === 'admin' ? (
              <Badge variant="accent">AKSES AKTIF</Badge>
            ) : (
              <Badge variant="surface">AKUN SISWA</Badge>
            )}
          </div>

          {user?.role === 'admin' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div>
                <p className="text-sm font-bold text-ink">Akun Anda terdaftar sebagai Administrator</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Anda memiliki wewenang mengelola bank soal, materi pembelajaran, jadwal try out, dan data pengguna.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => onNavigate && onNavigate('/admin/dashboard')}
                rightIcon={<ArrowRight size={16} />}
                className="whitespace-nowrap shadow-neo-sm"
              >
                Buka Panel Admin
              </Button>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              <p className="text-xs text-gray-600 font-medium">
                Akun ini saat ini memiliki peran sebagai <strong>Siswa</strong>. Sebagai pembuat / pemilik sistem bimbel ini, Anda dapat mengaktifkan hak akses Administrator langsung:
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  disabled={upgrading}
                  onClick={async () => {
                    setUpgrading(true);
                    try {
                      await promoteToAdmin();
                      toast.success('Selamat! Hak akses Administrator berhasil diaktifkan.');
                    } catch (e) {
                      toast.error('Gagal mengaktifkan role admin: ' + e.message);
                    } finally {
                      setUpgrading(false);
                    }
                  }}
                  leftIcon={<ShieldCheck size={18} />}
                  className="shadow-neo-sm"
                >
                  {upgrading ? 'Mengaktifkan...' : 'Aktifkan Hak Akses Admin Sekarang'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onNavigate && onNavigate('/admin/dashboard')}
                  className="text-xs"
                >
                  Tes Akses /admin
                </Button>
              </div>
            </div>
          )}
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
