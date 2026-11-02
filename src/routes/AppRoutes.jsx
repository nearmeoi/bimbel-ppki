import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';
import { useAuth } from '../context/AuthContext';

// Core User Pages
import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MateriPage } from '../pages/MateriPage';
import { MateriDetailPage } from '../pages/MateriDetailPage';
import { LatihanPage } from '../pages/LatihanPage';
import { ExamPage } from '../pages/ExamPage';
import { HasilPage } from '../pages/HasilPage';
import { PembahasanPage } from '../pages/PembahasanPage';
import { RangkingPage } from '../pages/RangkingPage';
import { JadwalPage } from '../pages/JadwalPage';
import { PaketPage } from '../pages/PaketPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProfilPage } from '../pages/ProfilPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SuccessPaymentPage } from '../pages/SuccessPaymentPage';
import { ComponentSheetPage } from '../pages/ComponentSheetPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';

// Lazy-loaded heavy analytical & admin pages
const AnalitikPage = lazy(() => import('../pages/AnalitikPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminSoalPage = lazy(() => import('../pages/admin/AdminSoalPage'));
const AdminMateriPage = lazy(() => import('../pages/admin/AdminMateriPage'));
const AdminPengumumanPage = lazy(() => import('../pages/admin/AdminPengumumanPage'));
const AdminJadwalPage = lazy(() => import('../pages/admin/AdminJadwalPage'));
const AdminPenggunaPage = lazy(() => import('../pages/admin/AdminPenggunaPage'));

const PageLoadingFallback = () => (
  <div className="min-h-screen bg-bglight p-8 flex flex-col items-center justify-center">
    <div className="w-full max-w-4xl space-y-4">
      <Skeleton variant="text" width="40%" height={32} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={150} />
    </div>
  </div>
);

// Wrapper route biasa (publik)
const RouteWrapper = ({ Component, ...rest }) => {
  const navigate = useNavigate();
  const params = useParams();
  return <Component onNavigate={navigate} params={params} {...rest} />;
};

// Route khusus tamu (akan dialihkan ke /dashboard jika sudah login)
const GuestRoute = ({ Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  if (loading) return <PageLoadingFallback />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Component onNavigate={navigate} params={params} {...rest} />;
};

// Route terproteksi (harus sudah login, jika belum dialihkan ke /masuk)
const ProtectedRoute = ({ Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  if (loading) return <PageLoadingFallback />;
  if (!isAuthenticated) return <Navigate to="/masuk" state={{ from: location }} replace />;
  return <Component onNavigate={navigate} params={params} {...rest} />;
};

// Route khusus Administrator
const AdminRoute = ({ Component, ...rest }) => {
  const { user, isAuthenticated, loading, promoteToAdmin } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [upgrading, setUpgrading] = useState(false);

  if (loading) return <PageLoadingFallback />;
  if (!isAuthenticated) return <Navigate to="/masuk" replace />;

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-bglight flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-black rounded-neo p-6 text-center shadow-neo space-y-4">
          <div className="w-16 h-16 bg-accent rounded-full border-2 border-black flex items-center justify-center mx-auto shadow-neo-sm">
            <span className="text-3xl">🛡️</span>
          </div>
          <h2 className="text-2xl font-extrabold text-ink">Akses Panel Admin</h2>
          <p className="text-sm text-gray-600 font-medium">
            Akun Anda (<strong>{user?.email || 'User'}</strong>) saat ini masih berstatus <strong>Siswa (Student)</strong>.
          </p>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-xs text-amber-900 font-bold text-left">
            💡 Sebagai pemilik platform, Anda dapat mengaktifkan hak akses Administrator langsung dengan tombol di bawah:
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={async () => {
                setUpgrading(true);
                try {
                  await promoteToAdmin();
                } finally {
                  setUpgrading(false);
                }
              }}
              disabled={upgrading}
              className="w-full py-3 px-4 bg-primary text-white font-extrabold rounded-full border-2 border-black shadow-neo hover:shadow-neo-hover hover:bg-primary-hover transition-all cursor-pointer"
            >
              {upgrading ? 'Mengaktifkan...' : 'Aktifkan Hak Akses Admin Sekarang'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-2.5 px-4 bg-white text-ink font-bold rounded-full border-2 border-black shadow-neo-sm hover:bg-gray-100 transition-all cursor-pointer text-sm"
            >
              Kembali ke Dashboard Siswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Component onNavigate={navigate} params={params} {...rest} />;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        {/* Landing & Public */}
        <Route path="/" element={<RouteWrapper Component={LandingPage} />} />

        {/* Auth / Guest Routes */}
        <Route path="/masuk" element={<GuestRoute Component={LoginPage} />} />
        <Route path="/daftar" element={<GuestRoute Component={RegisterPage} />} />
        <Route path="/lupa-password" element={<GuestRoute Component={ForgotPasswordPage} />} />

        {/* Protected Student Portal Routes */}
        <Route path="/onboarding" element={<ProtectedRoute Component={OnboardingPage} />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={DashboardPage} />} />
        <Route path="/materi" element={<ProtectedRoute Component={MateriPage} />} />
        <Route path="/materi/:id" element={<ProtectedRoute Component={MateriDetailPage} />} />
        <Route path="/latihan" element={<ProtectedRoute Component={LatihanPage} />} />
        <Route path="/latihan/:id/kerjakan" element={<ProtectedRoute Component={ExamPage} />} />
        <Route path="/tryout" element={<ProtectedRoute Component={LatihanPage} />} />
        <Route path="/hasil/:id" element={<ProtectedRoute Component={HasilPage} />} />
        <Route path="/hasil/:id/pembahasan" element={<ProtectedRoute Component={PembahasanPage} />} />
        <Route path="/rangking" element={<ProtectedRoute Component={RangkingPage} />} />
        <Route path="/jadwal" element={<ProtectedRoute Component={JadwalPage} />} />
        <Route path="/analitik" element={<ProtectedRoute Component={AnalitikPage} />} />
        <Route path="/paket" element={<ProtectedRoute Component={PaketPage} />} />
        <Route path="/paket/checkout" element={<ProtectedRoute Component={CheckoutPage} />} />
        <Route path="/sukses" element={<ProtectedRoute Component={SuccessPaymentPage} />} />
        <Route path="/profil" element={<ProtectedRoute Component={ProfilPage} />} />

        {/* Dev / Component Showcase */}
        <Route path="/komponen" element={<RouteWrapper Component={ComponentSheetPage} />} />

        {/* Admin Portal (Admin Role Guard) */}
        <Route path="/admin" element={<AdminRoute Component={AdminDashboardPage} />} />
        <Route path="/admin/dashboard" element={<AdminRoute Component={AdminDashboardPage} />} />
        <Route path="/admin/soal" element={<AdminRoute Component={AdminSoalPage} />} />
        <Route path="/admin/materi" element={<AdminRoute Component={AdminMateriPage} />} />
        <Route path="/admin/pengumuman" element={<AdminRoute Component={AdminPengumumanPage} />} />
        <Route path="/admin/jadwal" element={<AdminRoute Component={AdminJadwalPage} />} />
        <Route path="/admin/pengguna" element={<AdminRoute Component={AdminPenggunaPage} />} />

        {/* 404 Wildcard Fallback */}
        <Route path="/404" element={<RouteWrapper Component={NotFoundPage} />} />
        <Route path="*" element={<RouteWrapper Component={NotFoundPage} />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
