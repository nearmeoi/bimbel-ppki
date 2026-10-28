import React from 'react';
import { Home, BookOpen, Edit3, Trophy, User } from 'lucide-react';

/**
 * Bimbel MobileBottomNav Component
 * Mobile bottom nav bar: Dashboard, Materi, Latihan, Rangking, Profil
 */
export const MobileBottomNav = ({ currentPath = '/dashboard', onNavigate }) => {
  const navItems = [
    { id: '/dashboard', label: 'Dashboard', icon: Home },
    { id: '/materi', label: 'Materi', icon: BookOpen },
    { id: '/latihan', label: 'Latihan', icon: Edit3 },
    { id: '/rangking', label: 'Rangking', icon: Trophy },
    { id: '/profil', label: 'Profil', icon: User },
  ];

  return (
    <nav
      aria-label="Navigasi Bawah Seluler"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black px-3 py-2 flex justify-around items-center z-50 pb-safe shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
    >
      {navItems.map((item) => {
        const isActive = currentPath === item.id || currentPath.startsWith(`${item.id}/`);
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate && onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] py-1 transition-all select-none cursor-pointer ${
              isActive ? 'text-primary font-black' : 'text-gray-600 font-bold hover:text-black'
            }`}
          >
            <div
              className={`p-1.5 rounded-full transition-transform ${
                isActive ? 'bg-primary/10 text-primary scale-110' : 'bg-transparent'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[11px] leading-tight font-bold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
