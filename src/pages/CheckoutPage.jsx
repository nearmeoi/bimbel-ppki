import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ArrowLeft, CheckCircle2, QrCode, CreditCard, ShieldCheck } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

/**
 * Bimbel Checkout & Pembayaran Paket Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const CheckoutPage = ({ onNavigate }) => {
  const toast = useToast();
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const basePrice = 199000;
  const adminFee = 2500;
  const totalPrice = basePrice - discount + adminFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ASN2026') {
      setDiscount(30000);
      toast.success('Kode promo ASN2026 berhasil digunakan! Hemat Rp 30.000');
    } else {
      toast.error('Kode promo tidak valid atau sudah kedaluwarsa.');
    }
  };

  const handlePay = () => {
    if (onNavigate) {
      onNavigate('/sukses');
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <PageShell currentPath="/paket" onNavigate={onNavigate}>
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate && onNavigate('/paket')}
          className="flex items-center gap-2 font-bold text-ink hover:underline cursor-pointer group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Pilihan Paket
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-ink">
          Penyelesaian Pembayaran
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Payment Method Selection */}
          <div className="md:col-span-2 space-y-6">
            <OutlineCard className="space-y-4">
              <h2 className="text-lg font-extrabold text-ink">Pilih Metode Pembayaran</h2>

              <div className="space-y-3">
                {[
                  {
                    id: 'qris',
                    name: 'QRIS (Semua E-Wallet & Mobile Banking)',
                    icon: <QrCode size={20} className="text-primary" />,
                    badge: 'Otomatis',
                  },
                  {
                    id: 'va_bca',
                    name: 'BCA Virtual Account',
                    icon: <CreditCard size={20} className="text-primary" />,
                  },
                  {
                    id: 'va_mandiri',
                    name: 'Mandiri Virtual Account',
                    icon: <CreditCard size={20} className="text-primary" />,
                  },
                  {
                    id: 'va_bri',
                    name: 'BRI Virtual Account (BRIVA)',
                    icon: <CreditCard size={20} className="text-primary" />,
                  },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`
                      border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all select-none
                      ${
                        paymentMethod === m.id
                          ? 'border-primary bg-blue-50/70 shadow-sm'
                          : 'border-gray-200 hover:border-black bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center bg-white">
                        {paymentMethod === m.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {m.icon}
                        <span className="text-xs md:text-sm font-bold text-ink">{m.name}</span>
                      </div>
                    </div>
                    {m.badge && <Badge variant="accent">{m.badge}</Badge>}
                  </div>
                ))}
              </div>
            </OutlineCard>

            {/* Promo Code Input */}
            <OutlineCard className="space-y-3">
              <h3 className="text-sm font-bold text-ink">Punya Kode Promo / Kupon?</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Ketik ASN2026..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="uppercase"
                />
                <Button variant="secondary" onClick={handleApplyPromo} className="whitespace-nowrap">
                  Gunakan
                </Button>
              </div>
            </OutlineCard>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <OutlineCard className="space-y-4">
              <h2 className="text-lg font-extrabold text-ink pb-2 border-b border-gray-100">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-extrabold text-ink">Paket Garuda PRO</div>
                    <div className="text-gray-500 text-xs">Akses 6 Bulan</div>
                  </div>
                  <div className="font-extrabold text-ink">Rp 199.000</div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Diskon Promo</span>
                    <span>- Rp 30.000</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Biaya Layanan</span>
                  <span>Rp 2.500</span>
                </div>

                <div className="pt-3 border-t-2 border-black flex justify-between items-center text-base font-extrabold text-ink">
                  <span>Total Bayar</span>
                  <span className="text-xl text-primary font-extrabold">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <Button variant="accent" fullWidth onClick={handlePay} className="py-3.5 text-base">
                Bayar Sekarang
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-500 pt-1">
                <ShieldCheck size={14} className="text-green-600" />
                <span>Transaksi Terenkripsi &amp; Aman</span>
              </div>
            </OutlineCard>
          </div>
        </div>
      </div>

      {/* Payment Success Confirmation Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Pembayaran Berhasil!"
        description="Akun Anda telah diaktifkan ke keanggotaan Bimbel PRO Batch 2026."
        footer={
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setIsSuccessModalOpen(false);
              if (onNavigate) onNavigate('/dashboard');
            }}
          >
            Mulai Belajar Sekarang
          </Button>
        }
      >
        <div className="text-center py-4 space-y-3">
          <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center mx-auto text-green-700">
            <CheckCircle2 size={36} />
          </div>
          <p className="text-sm font-medium text-gray-700">
            Terima kasih! Semua materi, video pembahasan, dan 35 paket try out CAT kini siap diakses tanpa batasan.
          </p>
        </div>
      </Modal>
    </PageShell>
  );
};

export default CheckoutPage;
