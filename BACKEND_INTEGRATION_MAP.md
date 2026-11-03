# 🗺️ PANDUAN INTEGRASI BACKEND & FRONTEND (BACKEND INTEGRATION MAP)
> Dokumen referensi untuk Backend Developer / AI Engineer dalam menghubungkan database Supabase dan API ke Frontend Bimbel CPNS 2026.

---

## 📌 Standar Marker Kode
Semua titik integrasi dinamis pada kode Frontend telah ditandai dengan komentar khusus:
```javascript
// [BACKEND-DYNAMIC]: {keterangan tabel / endpoint yang dibutuhkan}
```

---

## 🗄️ Matriks Integrasi Tabel Supabase & Halaman Frontend

| Halaman FE | File Komponen | Marker Kode | Tabel Supabase Terkait | Kolom & Format Data yang Diharapkan |
|---|---|---|---|---|
| **Katalog Paket** | [`PaketPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/PaketPage.jsx) | `line 12` | `public.paket_langganan` | `id` (PK, text), `name`, `price`, `original_price`, `period`, `description`, `popular` (bool), `features` (JSONB array) |
| **Penyelesaian Transaksi** | [`CheckoutPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/CheckoutPage.jsx) | `line 21, line 37` | `public.transaksi` | **INSERT**: `user_id` (UUID), `paket_id` (text), `amount` (numeric), `payment_method` (text), `promo_code` (text, opsional), `status` ('pending'\|'success') |
| **Dashboard Siswa** | [`DashboardPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/DashboardPage.jsx) | `line 48` | `public.pengumuman`<br>`public.exam_attempts` | **Pengumuman**: `badge`, `event_month`, `event_day`, `title`, `time`, `description`<br>**Attempts**: `total_score`, `answers`, `submitted_at` where `user_id = auth.uid()` |
| **Katalog Latihan** | [`LatihanPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/LatihanPage.jsx) | `line 70` | `public.simulasi_sets` | `id` (int), `title`, `category`, `question_count`, `duration_seconds`, `is_active` (bool) |
| **Pengerjaan Soal CAT** | [`ExamPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/ExamPage.jsx) | `line 44, line 65` | `public.soal`<br>`public.exam_attempts` | **SELECT Soal**: `id`, `set_id`, `subject` ('TWK'\|'TIU'\|'TKP'), `topic`, `question`, `options` (JSONB array 5 opsi), `correct_answer` (0-4), `explanation`<br>**INSERT Attempt**: `user_id`, `set_id`, `answers` (JSONB), `flagged` (JSONB), `twk_score`, `tiu_score`, `tkp_score`, `total_score`, `is_lulus` |
| **Hasil & Evaluasi** | [`HasilPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/HasilPage.jsx) | `line 21` | `public.exam_attempts` | `twk_score`, `tiu_score`, `tkp_score`, `total_score`, `is_lulus` |
| **Kunci & Pembahasan** | [`PembahasanPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/PembahasanPage.jsx) | `line 20` | `public.soal` | `question`, `options`, `correct_answer`, `explanation`, `subject` |
| **Kalender Jadwal** | [`JadwalPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/JadwalPage.jsx) | `line 23` | `public.jadwal`<br>`public.jadwal_registrations` | **Jadwal**: `id`, `title`, `category`, `date`, `time`, `duration`, `quota`, `registered_count`, `status`<br>**Registrasi**: `jadwal_id`, `user_id` |
| **Modul & Bab Materi** | [`MateriPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/MateriPage.jsx)<br>[`MateriDetailPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/MateriDetailPage.jsx) | `line 23, line 33` | `public.materi`<br>`public.materi_chapters`<br>`public.user_materi_progress` | **Materi**: `id` ('twk-1'), `title`, `type`, `summary`, `estimated_time`, `video_url`, `key_points` (JSONB)<br>**Chapters**: `materi_id`, `title`, `type` ('video'\|'article'\|'quiz'), `duration`, `order_num` |
| **Papan Peringkat** | [`RangkingPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/RangkingPage.jsx) | `line 24` | `public.exam_attempts`<br>`public.profiles` | Leaderboard gabungan (Join `user_id = profiles.id`): `profiles.name`, `target_instansi`, `twk_score`, `tiu_score`, `tkp_score`, `total_score` |
| **Analitik & Diagnosa** | [`AnalitikPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/AnalitikPage.jsx) | `line 37` | `public.exam_attempts` | Riwayat seluruh attempt user: `twk_score`, `tiu_score`, `tkp_score`, `total_score`, `is_lulus`, `submitted_at` |
| **Profil Siswa** | [`ProfilPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/ProfilPage.jsx) | `line 24` | `public.profiles` | `name`, `target_instansi`, `target_score`, `role`, `is_pro` where `id = auth.uid()` |
| **Onboarding Baru** | [`OnboardingPage.jsx`](file:///C:/Users/Akmal/bimbel/src/pages/OnboardingPage.jsx) | `line 30` | `public.profiles` | Update awal setelah registrasi: `target_instansi`, `target_score` |

---

## 🔒 Kebijakan Keamanan & RLS (Row Level Security)
Skema lengkap di [`supabase_schema.sql`](file:///C:/Users/Akmal/bimbel/supabase_schema.sql) telah mengatur:
1. `profiles`: Siswa hanya dapat membaca/mengubah profil mereka sendiri (`auth.uid() = id`), kecuali role `'admin'` yang dapat mengelola semua data pengguna.
2. `exam_attempts`: Siswa hanya dapat memasukkan (`INSERT`) hasil ujian untuk `user_id` mereka sendiri.
3. `soal`, `materi`, `jadwal`, `pengumuman`: Dapat dibaca (`SELECT`) oleh semua pengguna yang telah terautentikasi (`authenticated`), namun hanya dapat dimodifikasi (`INSERT`/`UPDATE`/`DELETE`) oleh pengguna dengan fungsi `public.is_admin() = true`.
4. `transaksi`: Siswa dapat membaca dan membuat transaksi milik mereka sendiri.

---

## 💳 Rekomendasi Alur Payment Gateway (Midtrans / Xendit / Tripay)
1. Siswa memilih paket di `/paket` dan diarahkan ke `/paket/checkout?id=paket-garuda-pro`.
2. Saat tombol **"Bayar Sekarang"** diklik, FE membuat baris baru di tabel `transaksi` dengan status `'pending'`.
3. Backend memanggil API payment gateway untuk membuat Snap Token / URL Pembayaran QRIS.
4. Setelah pembayaran terverifikasi oleh gateway, webhook backend menerima callback dan menjalankan:
   ```sql
   UPDATE public.transaksi SET status = 'success' WHERE id = :transaction_id;
   UPDATE public.profiles SET is_pro = TRUE WHERE id = :user_id;
   ```
5. Frontend langsung mengenali status `is_pro = true` dan membuka akses 35+ paket try out lengkap.
