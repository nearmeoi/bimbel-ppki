import React from 'react';

/**
 * Bimbel Global Footer Component
 * @param {Object} props
 * @param {Function} [props.onNavigate]
 */
export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t-2 border-black py-8 px-4 md:px-8 mt-auto">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base text-primary">Bimbel</span>
          <span>© 2026 Platform Persiapan SKD CPNS Terpadu</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => onNavigate && onNavigate('/materi')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Materi Ujian
          </button>
          <button
            onClick={() => onNavigate && onNavigate('/latihan')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Simulasi CAT
          </button>
          <button
            onClick={() => onNavigate && onNavigate('/paket')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Paket Belajar
          </button>
          <button
            onClick={() => onNavigate && onNavigate('/jadwal')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Jadwal Try Out
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
