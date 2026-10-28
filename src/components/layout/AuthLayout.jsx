import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

/**
 * Bimbel Auth Layout Component
 * Split screen layout: Left Hero Card (Desktop) + Right Form Container
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.heroTitle='Mulai Langkah\nAbdi Negaramu.']
 * @param {string} [props.heroSubtitle='Bergabung dengan ribuan pejuang NIP lainnya menuju kelulusan SKD CPNS 2026.']
 * @param {string} [props.heroBadge='Batch CPNS 2026']
 * @param {Function} [props.onNavigate]
 */
export const AuthLayout = ({
  children,
  heroTitle = 'Mulai Langkah\nAbdi Negaramu.',
  heroSubtitle = 'Bergabung dengan ribuan pejuang NIP lainnya menuju kelulusan SKD CPNS 2026.',
  heroBadge = 'Batch CPNS 2026',
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-bglight flex flex-col md:flex-row p-4 md:p-8 font-sans antialiased text-ink">
      {/* Mobile Top Navigation back */}
      <div className="md:hidden flex justify-between items-center mb-4 px-2">
        <button
          onClick={() => onNavigate && onNavigate('/')}
          className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black cursor-pointer"
        >
          <ArrowLeft size={18} /> Beranda
        </button>
        <span className="font-extrabold text-xl text-primary">Bimbel</span>
      </div>

      {/* Left Column: Visual Branding Hero Card */}
      <div className="flex-1 bg-primary rounded-neo-lg flex flex-col justify-between text-white p-8 lg:p-14 hidden md:flex relative overflow-hidden border-2 border-black shadow-neo">
        {/* Glow blobs */}
        <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex justify-between items-center relative z-10">
          <button
            onClick={() => onNavigate && onNavigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
          </button>
          <Badge variant="pro">CPNS 2026</Badge>
        </div>

        {/* Center Hero Copy */}
        <div className="my-auto relative z-10 space-y-6 max-w-lg">
          <Badge variant="accent" className="font-extrabold">
            <Sparkles size={14} className="inline mr-1" /> {heroBadge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight whitespace-pre-line tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-base lg:text-lg text-blue-100 font-medium leading-relaxed">
            {heroSubtitle}
          </p>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 border-t border-white/20 pt-6 flex items-center justify-between text-xs text-blue-100">
          <span>🛡️ Teruji Sesuai Kisi-Kisi PermenPANRB</span>
          <span className="font-bold text-white">45.000+ Alumni</span>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
