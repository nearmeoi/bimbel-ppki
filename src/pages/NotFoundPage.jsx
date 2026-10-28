import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import AssetPlaceholder from '../components/ui/AssetPlaceholder';
import { OutlineCard } from '../components/cards/OutlineCard';

/**
 * Bimbel 404 Not Found Page
 * Conforms to prompt:
 * - Themed error page with mascot slot (ASET: Maskot 1:1)
 * - Playful copy ("Halaman tersesat di SKD CPNS")
 * - Buttons back to Dashboard and Home
 */
export const NotFoundPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-bglight flex flex-col justify-between p-4 sm:p-8 font-sans antialiased text-ink">
      {/* Mini Brand Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4">
        <div
          onClick={() => onNavigate && onNavigate('/')}
          className="text-primary font-black text-2xl cursor-pointer"
        >
          Bimbel
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigate && onNavigate('/dashboard')}
        >
          Dashboard Siswa
        </Button>
      </header>

      {/* Main Error Box */}
      <main className="max-w-xl mx-auto w-full my-auto text-center py-12">
        <OutlineCard className="p-8 sm:p-12 shadow-neo-lg bg-white border-2 border-black flex flex-col items-center">
          {/* Mascot Slot */}
          <AssetPlaceholder
            label="ASET: Maskot 1:1"
            aspect="1:1"
            subtext="Maskot Bingung Tersesat"
            className="w-36 h-36 sm:w-44 sm:h-44 bg-accent/30 shadow-neo mb-6"
          />

          <span className="inline-block px-3 py-1 rounded-full border border-black bg-accent text-xs font-black uppercase tracking-wider mb-2">
            Error 404
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-ink mb-3 leading-tight">
            Halaman Tersesat di SKD CPNS!
          </h1>

          <p className="text-sm sm:text-base font-semibold text-gray-700 leading-relaxed max-w-md mb-8">
            Waduh, sepertinya halaman yang kamu tuju salah nomor kisi-kisi atau sudah dipindahkan. Yuk kembali ke jalur persiapan ujian yang benar!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <Button
              variant="accent"
              size="md"
              fullWidth
              className="sm:w-auto px-6 font-black shadow-neo hover:shadow-neo-hover"
              onClick={() => onNavigate && onNavigate('/dashboard')}
              leftIcon={<Home size={18} />}
            >
              Kembali ke Dashboard
            </Button>
            <Button
              variant="outline"
              size="md"
              fullWidth
              className="sm:w-auto px-6 font-black"
              onClick={() => onNavigate && onNavigate('/')}
              leftIcon={<ArrowLeft size={18} />}
            >
              Halaman Utama
            </Button>
          </div>
        </OutlineCard>
      </main>

      {/* Footer copyright */}
      <footer className="text-center text-xs font-bold text-gray-500 py-4">
        © 2026 Bimbel CPNS · Pelayanan Belajar Terbaik
      </footer>
    </div>
  );
};

export default NotFoundPage;
