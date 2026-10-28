import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Edit3,
  Trophy,
  Calendar,
  Package,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  ShieldCheck,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

/**
 * Bimbel AppHeader Component
 * Conforms to prompt:
 * - Brand rule: PRO badge ONLY shown for paid/premium users (user.isPro === true)
 * - Nav: Dashboard, Jenis Materi, Latihan Soal, Rangking, Jadwal, Paket Belajar
 * - Pill nav: generous padding, icon + label, active tab with downward notch
 * - Collapse into hamburger on widths < 1100px
 */
export const AppHeader = ({
  currentPath = '/dashboard',
  onNavigate,
  user = { name: 'Budi', email: 'budi@gmail.com', role: 'student', isPro: false },
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: '/dashboard', label: 'Dashboard', icon: Home },
    { id: '/materi', label: 'Jenis Materi', icon: BookOpen },
    { id: '/latihan', label: 'Latihan Soal', icon: Edit3 },
    { id: '/rangking', label: 'Rangking', icon: Trophy },
    { id: '/jadwal', label: 'Jadwal', icon: Calendar },
    { id: '/paket', label: 'Paket Belajar', icon: Package },
  ];

  const handleNavClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="bg-primary text-white px-4 md:px-8 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Brand Logo - PRO badge ONLY shown for paid users */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent rounded-full p-1 min-h-[44px]"
        onClick={() => handleNavClick('/dashboard')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleNavClick('/dashboard');
        }}
      >
        <span className="font-black text-2xl tracking-tight transition-transform group-hover:scale-105">
          Bimbel
        </span>
        {user?.isPro && <Badge variant="pro">PRO</Badge>}
      </div>

      {/* Desktop Pill Navigation with Downward Notch (Collapsed below 1100px) */}
      <nav
        aria-label="Navigasi Utama"
        className="hidden min-[1100px]:flex bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-white/20 shadow-inner gap-1"
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.id || currentPath.startsWith(`${item.id}/`);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                relative px-4 py-2.5 rounded-full font-bold text-xs xl:text-sm flex items-center gap-2 transition-all duration-150 select-none cursor-pointer min-h-[40px]
                ${
                  isActive
                    ? 'bg-white/25 text-white shadow-sm'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {isActive && <div className="nav-triangle" />}
            </button>
          );
        })}
      </nav>

      {/* User Profile Pill & Dropdown (Desktop) */}
      <div className="relative hidden md:block">
        <button
          onClick={() => setProfileDropdownOpen((prev) => !prev)}
          className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-white/10 transition-colors focus-visible:ring-3 focus-visible:ring-accent cursor-pointer min-h-[44px]"
          aria-expanded={profileDropdownOpen}
          aria-haspopup="true"
        >
          <Avatar name={user.name} size="sm" />
          <div className="text-left text-xs xl:text-sm">
            <div className="font-extrabold leading-tight">Hi, {user.name}!</div>
            <div className="text-blue-200 text-[11px] leading-tight truncate max-w-[120px]">
              {user.email}
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {profileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black rounded-neo shadow-neo p-2 text-ink z-50 animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-2 border-b border-gray-100 mb-1">
              <p className="font-black text-sm text-ink">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              {user?.isPro && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full border border-black bg-accent text-[10px] font-black uppercase text-ink">
                  Member Pro Aktif
                </span>
              )}
            </div>
            <button
              onClick={() => handleNavClick('/profil')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold rounded-xl hover:bg-surfacelight text-left transition-colors"
            >
              <User size={16} /> Profil Saya
            </button>
            <button
              onClick={() => handleNavClick('/analitik')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold rounded-xl hover:bg-surfacelight text-left transition-colors"
            >
              <Trophy size={16} /> Analitik Nilai
            </button>
            <button
              onClick={() => handleNavClick('/admin/dashboard')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold rounded-xl hover:bg-surfacelight text-left transition-colors"
            >
              <ShieldCheck size={16} /> Panel Admin
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => handleNavClick('/masuk')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-black text-red-600 rounded-xl hover:bg-red-50 text-left transition-colors"
            >
              <LogOut size={16} /> Keluar Akun
            </button>
          </div>
        )}
      </div>

      {/* Hamburger Toggle (Visible when width < 1100px) */}
      <button
        className="min-[1100px]:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors focus-visible:ring-3 focus-visible:ring-accent min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile / Compact Menu Drawer (< 1100px) */}
      {mobileMenuOpen && (
        <div className="min-[1100px]:hidden absolute top-full left-0 right-0 bg-primary border-b-2 border-black p-4 text-white shadow-2xl z-50 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-colors min-h-[44px]
                  ${isActive ? 'bg-white text-primary font-black shadow-neo-sm' : 'hover:bg-white/10 text-white'}
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="border-t border-white/20 pt-3 mt-2 flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <Avatar name={user.name} size="sm" />
              <div className="text-xs">
                <p className="font-black">{user.name}</p>
                <p className="text-blue-200">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('/masuk')}
              className="text-xs font-black bg-white text-primary px-4 py-2 rounded-full hover:bg-accent hover:text-ink transition-colors shadow-neo-sm min-h-[36px]"
            >
              Keluar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
