import React, { Suspense, lazy } from 'react';
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

// Route khusus Administrator (hanya dapat diakses jika user.role === 'admin')
const AdminRoute = ({ Component, ...rest }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  if (loading) return <PageLoadingFallback />;
  if (!isAuthenticated) return <Navigate to="/masuk" replace />;

  // Jika bukan admin, tolak akses dan arahkan kembali ke dashboard
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
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
        {/* Dev / Component Showcase (Hanya aktif pada mode development) */}
        {import.meta.env.DEV && (
          <Route path="/komponen" element={<RouteWrapper Component={ComponentSheetPage} />} />
        )}

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
