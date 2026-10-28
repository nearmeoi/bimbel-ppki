import React, { useState } from 'react';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

/**
 * Bimbel 3-Step Onboarding Screen
 * Matches Stitch HTML pixel-faithfully with interactive target selection & score slider
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const OnboardingPage = ({ onNavigate }) => {
  const { updateProfile } = useAuth();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [selectedInstansi, setSelectedInstansi] = useState('Kemenkumham');
  const [targetScore, setTargetScore] = useState(450);

  const instansiOptions = [
    'Kemenkumham',
    'Kejaksaan Agung',
    'Kemenkeu',
    'Pemprov DKI',
    'Kementerian Luar Negeri',
    'Mahkamah Agung RI',
  ];

  const handleFinish = () => {
    updateProfile({
      targetInstansi: selectedInstansi,
      targetScore: targetScore,
    });
    toast.success('Profil belajar siap! Selamat datang di Bimbel CPNS.');
    if (onNavigate) onNavigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bglight flex flex-col items-center justify-center p-4 font-sans text-ink">
      <OutlineCard shadow="lg" className="w-full max-w-2xl p-6 md:p-10">
        {/* Step Indicator Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-100">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Langkah {step} dari 3
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink">
              Mulai Perjalananmu
            </h2>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-colors ${
                  i === step ? 'bg-accent' : i < step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Target Instansi */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-ink">Pilih Target Instansi Impianmu</h3>
              <p className="text-xs text-gray-600 mt-1">
                Kami akan menyesuaikan bobot latihan dan passing grade formasi ini.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {instansiOptions.map((inst) => {
                const isSelected = selectedInstansi === inst;
                return (
                  <div
                    key={inst}
                    onClick={() => setSelectedInstansi(inst)}
                    className={`
                      border-2 rounded-neo p-4 cursor-pointer transition-all duration-150 font-bold text-sm md:text-base flex items-center justify-between select-none
                      ${
                        isSelected
                          ? 'border-black bg-accent text-ink shadow-neo-sm'
                          : 'border-gray-300 hover:border-black bg-white hover:bg-surfacelight'
                      }
                    `}
                  >
                    <span>{inst}</span>
                    {isSelected && <Check size={18} strokeWidth={3} />}
                  </div>
                );
              })}
            </div>

            <Button variant="primary" fullWidth onClick={() => setStep(2)} className="py-3.5">
              Selanjutnya
            </Button>
          </div>
        )}

        {/* Step 2: Target Score */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-ink">Berapa skor targetmu di ujian SKD?</h3>
              <p className="text-xs text-gray-600 mt-1">
                Rata-rata formasi aman berkisar antara 400 hingga 460 poin.
              </p>
            </div>

            <div className="py-6 space-y-4">
              <input
                type="range"
                min="311"
                max="550"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="text-center text-5xl md:text-6xl font-extrabold text-primary">
                {targetScore}
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Passing Grade: 311</span>
                <span>Nilai Sempurna: 550</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1 py-3.5">
                Kembali
              </Button>
              <Button variant="primary" onClick={() => setStep(3)} className="flex-1 py-3.5">
                Selanjutnya
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: All Ready */}
        {step === 3 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black rotate-12 shadow-neo">
              <Check size={48} strokeWidth={3} className="text-ink" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-extrabold text-ink">Semua Siap!</h3>
              <p className="text-sm md:text-base font-medium text-gray-600 max-w-md mx-auto">
                Profil belajarmu untuk target{' '}
                <strong className="text-ink">{selectedInstansi}</strong> dengan target skor{' '}
                <strong className="text-primary">{targetScore}</strong> telah siap. Mari mulai simulasi pertamamu!
              </p>
            </div>

            <Button variant="primary" fullWidth onClick={handleFinish} className="py-4 text-lg">
              Masuk ke Dashboard
            </Button>
          </div>
        )}
      </OutlineCard>
    </div>
  );
};

export default OnboardingPage;
