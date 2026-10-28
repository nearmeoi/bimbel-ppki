import React, { useState } from 'react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';

/**
 * Bimbel Register Screen (/daftar)
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const RegisterPage = ({ onNavigate }) => {
  const { register } = useAuth();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register({ name, email });
      setLoading(false);
      toast.success('Pendaftaran akun berhasil! Silakan atur target belajarmu.');
      if (onNavigate) onNavigate('/onboarding');
    }, 400);
  };

  return (
    <AuthLayout
      onNavigate={onNavigate}
      heroTitle="Wujudkan Cita&#10;Menjadi ASN."
      heroSubtitle="Mulai langkahmu sekarang dengan materi terlengkap dan try out berstandar CAT BKN."
    >
      <OutlineCard shadow="md" className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-ink">Daftar Akun</h2>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Bergabung gratis untuk persiapan seleksi CPNS 2026.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User size={18} />}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="contoh@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={18} />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={18} />}
            required
          />

          <Button variant="primary" fullWidth type="submit" loading={loading} className="py-3.5">
            Daftar Sekarang
          </Button>
        </form>

        <p className="text-center text-sm font-medium text-gray-700">
          Sudah punya akun?{' '}
          <button
            onClick={() => onNavigate && onNavigate('/masuk')}
            className="text-primary font-bold hover:underline cursor-pointer"
          >
            Masuk
          </button>
        </p>
      </OutlineCard>
    </AuthLayout>
  );
};

export default RegisterPage;
