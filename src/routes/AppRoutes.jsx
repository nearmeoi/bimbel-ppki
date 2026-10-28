import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';

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

const RouteWrapper = ({ Component, ...rest }) => {
  const navigate = useNavigate();
  const params = useParams();
  return <Component onNavigate={navigate} params={params} {...rest} />;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        {/* Landing & Public */}
        <Route path="/" element={<RouteWrapper Component={LandingPage} />} />

        {/* Auth Routes */}
        <Route path="/masuk" element={<RouteWrapper Component={LoginPage} />} />
        <Route path="/daftar" element={<RouteWrapper Component={RegisterPage} />} />
        <Route path="/lupa-password" element={<RouteWrapper Component={ForgotPasswordPage} />} />
        <Route path="/onboarding" element={<RouteWrapper Component={OnboardingPage} />} />

        {/* Student App Portal */}
        <Route path="/dashboard" element={<RouteWrapper Component={DashboardPage} />} />
        <Route path="/materi" element={<RouteWrapper Component={MateriPage} />} />
        <Route path="/materi/:id" element={<RouteWrapper Component={MateriDetailPage} />} />
        <Route path="/latihan" element={<RouteWrapper Component={LatihanPage} />} />
        <Route path="/latihan/:id/kerjakan" element={<RouteWrapper Component={ExamPage} />} />
        <Route path="/tryout" element={<RouteWrapper Component={LatihanPage} />} />
        <Route path="/hasil/:id" element={<RouteWrapper Component={HasilPage} />} />
        <Route path="/hasil/:id/pembahasan" element={<RouteWrapper Component={PembahasanPage} />} />
        <Route path="/rangking" element={<RouteWrapper Component={RangkingPage} />} />
        <Route path="/jadwal" element={<RouteWrapper Component={JadwalPage} />} />
        <Route path="/analitik" element={<RouteWrapper Component={AnalitikPage} />} />
        <Route path="/paket" element={<RouteWrapper Component={PaketPage} />} />
        <Route path="/paket/checkout" element={<RouteWrapper Component={CheckoutPage} />} />
        <Route path="/sukses" element={<RouteWrapper Component={SuccessPaymentPage} />} />
        <Route path="/profil" element={<RouteWrapper Component={ProfilPage} />} />

        {/* Dev / Showcase */}
        <Route path="/komponen" element={<RouteWrapper Component={ComponentSheetPage} />} />

        {/* Admin Portal (Lazy Loaded) */}
        <Route path="/admin" element={<RouteWrapper Component={AdminDashboardPage} />} />
        <Route path="/admin/dashboard" element={<RouteWrapper Component={AdminDashboardPage} />} />
        <Route path="/admin/soal" element={<RouteWrapper Component={AdminSoalPage} />} />
        <Route path="/admin/materi" element={<RouteWrapper Component={AdminMateriPage} />} />
        <Route path="/admin/pengumuman" element={<RouteWrapper Component={AdminPengumumanPage} />} />
        <Route path="/admin/jadwal" element={<RouteWrapper Component={AdminJadwalPage} />} />
        <Route path="/admin/pengguna" element={<RouteWrapper Component={AdminPenggunaPage} />} />

        {/* 404 Wildcard Fallback */}
        <Route path="/404" element={<RouteWrapper Component={NotFoundPage} />} />
        <Route path="*" element={<RouteWrapper Component={NotFoundPage} />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
