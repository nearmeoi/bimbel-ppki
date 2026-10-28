import React, { useState } from 'react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

/**
 * Bimbel Forgot Password Screen (/lupa-password)
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const ForgotPasswordPage = ({ onNavigate }) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success('Tautan pemulihan kata sandi telah dikirim ke email Anda!');
  };

  return (
    <AuthLayout
      onNavigate={onNavigate}
      heroTitle="Pemulihan Akun&#10;Aman &amp; Cepat."
      heroSubtitle="Kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda."
    >
      <OutlineCard shadow="md" className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-ink">Lupa Password?</h2>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Masukkan email terdaftar untuk menerima tautan pemulihan kata sandi.
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-green-50 border-2 border-green-300 text-center space-y-3">
            <CheckCircle2 size={36} className="text-green-600 mx-auto" />
            <p className="text-sm font-bold text-green-900">
              Tautan reset telah dikirim ke {email}. Silakan periksa kotak masuk atau spam Anda.
            </p>
            <Button variant="secondary" fullWidth onClick={() => onNavigate && onNavigate('/masuk')}>
              Kembali ke Halaman Masuk
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Alamat Email Terdaftar"
              type="email"
              placeholder="contoh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />

            <Button variant="primary" fullWidth type="submit" className="py-3.5">
              Kirim Tautan Pemulihan
            </Button>
          </form>
        )}

        <p className="text-center text-sm font-medium text-gray-700">
          Ingat password Anda?{' '}
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

export default ForgotPasswordPage;
