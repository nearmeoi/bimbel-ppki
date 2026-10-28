import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileQuestion,
  BookOpen,
  Bell,
  Calendar,
  Users,
  ArrowLeft,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

/**
 * Bimbel Admin Layout Component
 * @param {Object} props
 * @param {string} props.currentPath
 * @param {Function} props.onNavigate
 * @param {React.ReactNode} props.children
 */
export const AdminLayout = ({ currentPath = '/admin/dashboard', onNavigate, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavItems = [
    { id: '/admin/dashboard', label: 'Dashboard Admin', icon: LayoutDashboard },
    { id: '/admin/soal', label: 'Bank Soal SKD', icon: FileQuestion },
    { id: '/admin/materi', label: 'Kelola Materi', icon: BookOpen },
    { id: '/admin/pengumuman', label: 'Pengumuman', icon: Bell },
    { id: '/admin/jadwal', label: 'Jadwal Try Out', icon: Calendar },
    { id: '/admin/pengguna', label: 'Data Pengguna', icon: Users },
  ];

  const handleNavClick = (path) => {
    if (onNavigate) onNavigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-bglight flex flex-col font-sans text-ink">
      {/* Top Navbar */}
      <header className="bg-white border-b-2 border-black px-4 md:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-lg border-2 border-black bg-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu admin"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl text-primary">Bimbel</span>
            <Badge variant="accent">PANEL ADMIN</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('/dashboard')}
            className="flex items-center gap-2 text-xs md:text-sm font-bold bg-surfacelight hover:bg-gray-200 border-2 border-black rounded-full px-4 py-2 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} /> Ke Area Siswa
          </button>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1440px] w-full mx-auto p-4 md:p-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-2 border-black rounded-neo p-4 shadow-neo flex-shrink-0 self-start sticky top-24">
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-primary/20 rounded-xl mb-4">
            <Shield size={18} className="text-primary" />
            <span className="text-xs font-bold text-primary">Akses Administrator</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {adminNavItems.map((item) => {
              const isActive = currentPath === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-left transition-all duration-150 cursor-pointer
                    ${
                      isActive
                        ? 'bg-primary text-white shadow-neo-sm border-2 border-black'
                        : 'text-gray-700 hover:bg-surfacelight border-2 border-transparent hover:border-black/20'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Modal */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSidebarOpen(false);
            }}
          >
            <div className="bg-white border-2 border-black rounded-neo-lg p-5 max-w-xs w-full shadow-neo-lg space-y-3">
              <div className="flex justify-between items-center pb-2 border-b-2 border-gray-100">
                <span className="font-extrabold text-lg">Menu Admin</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {adminNavItems.map((item) => {
                  const isActive = currentPath === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-left transition-colors
                        ${isActive ? 'bg-primary text-white' : 'hover:bg-surfacelight text-ink'}
                      `}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
