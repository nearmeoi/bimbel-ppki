import React from 'react';
import { Check, ArrowRight, ShieldCheck, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import AssetPlaceholder from '../components/ui/AssetPlaceholder';
import { OutlineCard } from '../components/cards/OutlineCard';

/**
 * Bimbel Success / Payment Received Page (/sukses)
 * Conforms to prompt:
 * - Congratulations state after checkout
 * - Order summary with invoice details
 * - Next steps ("Mulai Try Out Sekarang")
 * - Prominent mascot slot (ASET: Maskot 1:1)
 */
export const SuccessPaymentPage = ({ onNavigate }) => {
  const orderDetails = {
    orderId: 'INV-20241130-9842',
    packageTitle: 'Paket Pro Lulus CPNS 2024/2025',
    amount: 'Rp 249.000',
    method: 'QRIS Instan (GoPay / ShopeePay)',
    date: '30 November 2024, 14:22 WIB',
    status: 'Pembayaran Berhasil',
  };

  return (
    <div className="min-h-screen bg-bglight flex flex-col justify-between p-4 sm:p-8 font-sans antialiased text-ink">
      {/* Brand Header */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-4">
        <div
          onClick={() => onNavigate && onNavigate('/dashboard')}
          className="text-primary font-black text-2xl cursor-pointer"
        >
          Bimbel
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-black shadow-neo-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Status: Terverifikasi Otomatis</span>
        </div>
      </header>

      {/* Main Success Card */}
      <main className="max-w-2xl mx-auto w-full my-auto py-8">
        <OutlineCard className="p-6 sm:p-10 shadow-neo-lg bg-white border-2 border-black">
          {/* Header with Mascot & Celebration */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b-2 border-gray-100">
            <div className="flex-shrink-0">
              <AssetPlaceholder
                label="ASET: Maskot 1:1"
                aspect="1:1"
                subtext="Maskot Bersorak Gembira Lulus"
                className="w-28 h-28 sm:w-36 sm:h-36 bg-accent shadow-neo rounded-2xl"
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black bg-emerald-200 text-xs font-black uppercase text-ink shadow-neo-sm mb-2">
                <Check className="w-3.5 h-3.5 text-emerald-800 stroke-[3]" />
                Pembayaran Berhasil
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
                Selamat! Akun Pro Kamu Telah Aktif
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1 leading-relaxed">
                Seluruh 35+ paket try out, bank materi, dan analisis kelemahan kini sudah terbuka penuh untukmu.
              </p>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="my-6 rounded-2xl border-2 border-black bg-surfacelight p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
              <span>Ringkasan Transaksi</span>
              <span className="font-mono text-ink font-black">{orderDetails.orderId}</span>
            </div>

            <div className="flex items-center justify-between text-sm sm:text-base font-black text-ink border-t border-black/10 pt-2">
              <span>{orderDetails.packageTitle}</span>
              <span className="text-primary">{orderDetails.amount}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-gray-600 pt-1">
              <div>
                Metode:{' '}
                <span className="text-ink font-extrabold">{orderDetails.method}</span>
              </div>
              <div className="sm:text-right">
                Waktu:{' '}
                <span className="text-ink font-extrabold">{orderDetails.date}</span>
              </div>
            </div>
          </div>

          {/* Next Steps Guide */}
          <div className="space-y-3 mb-8">
            <h4 className="font-black text-sm uppercase tracking-wider text-ink">
              Langkah Berikutnya:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-black bg-white shadow-neo-sm text-xs">
                <span className="font-black text-primary block mb-0.5">1. Mulai Try Out</span>
                <span className="text-gray-600 font-medium">Uji simulasi CAT perdanamu dengan durasi 100 menit.</span>
              </div>
              <div className="p-3 rounded-xl border border-black bg-white shadow-neo-sm text-xs">
                <span className="font-black text-primary block mb-0.5">2. Cek Passing Grade</span>
                <span className="text-gray-600 font-medium">Lihat apakah kamu sudah melampaui PG TWK, TIU, TKP.</span>
              </div>
              <div className="p-3 rounded-xl border border-black bg-white shadow-neo-sm text-xs">
                <span className="font-black text-primary block mb-0.5">3. Pantau Posisi</span>
                <span className="text-gray-600 font-medium">Bandingkan nilaimu di papan peringkat nasional.</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate && onNavigate('/dashboard')}
              className="w-full sm:w-auto font-black"
            >
              Ke Dashboard
            </Button>
            <Button
              variant="accent"
              size="md"
              onClick={() => onNavigate && onNavigate('/latihan')}
              className="w-full sm:w-auto font-black shadow-neo hover:shadow-neo-hover"
              rightIcon={<ArrowRight size={18} />}
            >
              Mulai Try Out Sekarang
            </Button>
          </div>
        </OutlineCard>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs font-bold text-gray-500 py-4">
        Butuh bantuan transaksi? Hubungi Layanan Siswa Bimbel di support@bimbel.app
      </footer>
    </div>
  );
};

export default SuccessPaymentPage;
