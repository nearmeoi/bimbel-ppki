-- ==============================================================================
-- SKEMA BACKEND SUPABASE LENGKAP: BIMBEL PERSIAPAN SKD CPNS 2026
-- ==============================================================================
-- Jalankan skrip ini langsung di SQL Editor Supabase Project Anda.
-- Skrip ini mencakup:
-- 1. Ekstensi & Fungsi Utilitas
-- 2. DDL Tabel Lengkap (Profiles, Soal, Simulasi, Ujian, Materi, Jadwal, Pengumuman, Paket)
-- 3. Row Level Security (RLS) & Akses Kontrol Siswa vs Admin
-- 4. Trigger Otomatis Pembuatan Profil saat Registrasi Akun
-- 5. Seed Data Awal dari Bank Soal, Materi, Jadwal, dan Paket
-- ==============================================================================

-- 1. AKTIFKAN EKSTENSI
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABEL PROFIL PENGGUNA (PROFILES)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'User',
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    target_instansi TEXT DEFAULT 'Kemenkumham RI',
    target_score INTEGER DEFAULT 450,
    is_pro BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 3. TABEL SIMULASI & BANK SOAL CAT (SIMULASI_SETS & SOAL)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.simulasi_sets (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Try Out Mini',
    question_count INTEGER NOT NULL DEFAULT 30,
    duration_seconds INTEGER NOT NULL DEFAULT 2700, -- 45 menit
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.soal (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    set_id INTEGER REFERENCES public.simulasi_sets(id) ON DELETE SET NULL,
    subject TEXT NOT NULL CHECK (subject IN ('TWK', 'TIU', 'TKP')),
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array 5 teks opsi jawaban: ["A. ...", "B. ..."]
    correct_answer INTEGER NOT NULL DEFAULT 0, -- Indeks 0-4
    option_points JSONB DEFAULT NULL, -- Khusus TKP: [2, 3, 5, 1, 0]
    explanation TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 4. TABEL RIWAYAT UJIAN & HASIL EVALUASI (EXAM_ATTEMPTS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    set_id INTEGER REFERENCES public.simulasi_sets(id) ON DELETE SET NULL,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb, -- { questionId: selectedIndex }
    flagged JSONB DEFAULT '{}'::jsonb,
    twk_score INTEGER NOT NULL DEFAULT 0,
    tiu_score INTEGER NOT NULL DEFAULT 0,
    tkp_score INTEGER NOT NULL DEFAULT 0,
    total_score INTEGER NOT NULL DEFAULT 0,
    is_lulus BOOLEAN NOT NULL DEFAULT FALSE,
    time_spent_seconds INTEGER DEFAULT 0,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 5. TABEL MODUL MATERI & BAB PEMBELAJARAN (MATERI & MATERI_CHAPTERS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.materi (
    id TEXT PRIMARY KEY, -- e.g. 'twk-1', 'tiu-1'
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('TWK', 'TIU', 'TKP')),
    summary TEXT NOT NULL,
    estimated_time TEXT DEFAULT '45 Menit',
    video_url TEXT,
    key_points JSONB DEFAULT '[]'::jsonb,
    order_num INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.materi_chapters (
    id SERIAL PRIMARY KEY,
    materi_id TEXT NOT NULL REFERENCES public.materi(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('video', 'article', 'quiz')),
    duration TEXT,
    score INTEGER DEFAULT NULL,
    order_num INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.user_materi_progress (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    chapter_id INTEGER NOT NULL REFERENCES public.materi_chapters(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (user_id, chapter_id)
);

-- ==============================================================================
-- 6. TABEL KALENDER JADWAL TRY OUT & REGISTRASI (JADWAL & REGISTRASI)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.jadwal (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Try Out Akbar',
    date DATE NOT NULL,
    time TEXT NOT NULL,
    duration TEXT DEFAULT '100 Menit',
    quota INTEGER DEFAULT 1000,
    registered_count INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.jadwal_registrations (
    jadwal_id INTEGER NOT NULL REFERENCES public.jadwal(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (jadwal_id, user_id)
);

-- ==============================================================================
-- 7. TABEL PENGUMUMAN (PENGUMUMAN DASHBOARD)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.pengumuman (
    id SERIAL PRIMARY KEY,
    badge TEXT NOT NULL DEFAULT 'Pengumuman Baru',
    event_month TEXT NOT NULL DEFAULT 'NOV',
    event_day TEXT NOT NULL DEFAULT '10',
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 8. TABEL PAKET LANGGANAN & TRANSAKSI PEMBAYARAN
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.paket_langganan (
    id TEXT PRIMARY KEY, -- e.g. 'paket-garuda-pro'
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    price_number NUMERIC NOT NULL,
    original_price TEXT,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    popular BOOLEAN DEFAULT FALSE,
    features JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS public.transaksi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    paket_id TEXT NOT NULL REFERENCES public.paket_langganan(id),
    amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'qris',
    promo_code TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 9. HELPER ROLE & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Fungsi helper untuk memeriksa apakah pemanggil adalah Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aktifkan RLS di semua tabel
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulasi_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materi_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_materi_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paket_langganan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaksi ENABLE ROW LEVEL SECURITY;

-- POLICIES: PROFILES
CREATE POLICY "Profiles can be viewed by owner or admin"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- POLICIES: SOAL & SIMULASI
CREATE POLICY "Anyone authenticated can view active simulasi sets"
    ON public.simulasi_sets FOR SELECT
    TO authenticated
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage simulasi sets"
    ON public.simulasi_sets FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Anyone authenticated can read soal for practice"
    ON public.soal FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Admins can manage soal"
    ON public.soal FOR ALL
    TO authenticated
    USING (public.is_admin());

-- POLICIES: EXAM ATTEMPTS
CREATE POLICY "Users can view their own exam attempts or admins can view all"
    ON public.exam_attempts FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert their own exam attempts"
    ON public.exam_attempts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- POLICIES: MATERI & CHAPTERS
CREATE POLICY "Anyone authenticated can view materi and chapters"
    ON public.materi FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Admins can manage materi"
    ON public.materi FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Anyone authenticated can view chapters"
    ON public.materi_chapters FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Admins can manage chapters"
    ON public.materi_chapters FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Users can track their own chapter progress"
    ON public.user_materi_progress FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

-- POLICIES: JADWAL & REGISTRASI
CREATE POLICY "Anyone authenticated can view jadwal"
    ON public.jadwal FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Admins can manage jadwal"
    ON public.jadwal FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Users can manage their own jadwal registrations"
    ON public.jadwal_registrations FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

-- POLICIES: PENGUMUMAN
CREATE POLICY "Anyone can view pengumuman"
    ON public.pengumuman FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Admins can manage pengumuman"
    ON public.pengumuman FOR ALL
    TO authenticated
    USING (public.is_admin());

-- POLICIES: PAKET & TRANSAKSI
CREATE POLICY "Anyone can view paket langganan"
    ON public.paket_langganan FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Users can view and create their own transactions"
    ON public.transaksi FOR ALL
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin());

-- ==============================================================================
-- 10. TRIGGER OTOMATIS: BUAT PROFIL SAAT USER MENDAFTAR (AUTH.USERS)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, target_instansi, target_score)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        'student',
        'Kemenkumham RI',
        450
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang trigger ke auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 11. SEED DATA AWAL (BERDASARKAN DATA CODEBASE SAAT INI)
-- ==============================================================================

-- Seed: Simulasi Sets
INSERT INTO public.simulasi_sets (id, title, category, question_count, duration_seconds) VALUES
(1, 'Simulasi SKD Campuran Set 1', 'Try Out Mini', 30, 2700),
(2, 'Simulasi SKD Campuran Set 2', 'Try Out Mini', 30, 2700),
(3, 'Fokus TWK: Sejarah & Pilar Negara', 'Pendalaman Khusus', 30, 2400),
(4, 'Fokus TIU: Silogisme & Berhitung Cepat', 'Pendalaman Khusus', 30, 2700),
(5, 'Fokus TKP: Pelayanan & Jejaring Kerja', 'Pendalaman Khusus', 30, 2100),
(6, 'Simulasi Akbar CAT BKN Terpadu', 'Simulasi Lengkap', 110, 6000)
ON CONFLICT (id) DO NOTHING;

-- Seed: Bank Soal
INSERT INTO public.soal (set_id, subject, topic, question, options, correct_answer, option_points, explanation) VALUES
(1, 'TWK', 'Pancasila & Pilar Negara', 'Pancasila sebagai ideologi terbuka memiliki nilai-nilai yang bersifat tetap namun dapat dikembangkan secara kontekstual. Nilai dasar Pancasila yang tidak boleh diubah adalah...', '["A. Nilai instrumental yang tertuang dalam undang-undang", "B. Nilai praktis yang diterapkan dalam kehidupan bermasyarakat", "C. Nilai ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan sosial", "D. Ketetapan MPR dan peraturan pemerintah pengganti undang-undang", "E. Kebijakan strategis presiden dalam pembangunan nasional"]'::jsonb, 2, NULL, 'Nilai dasar Pancasila adalah asas-asas yang diterima sebagai dalil mutlak dan tidak dapat diubah (Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, Keadilan). Yang dapat disesuaikan adalah nilai instrumental dan nilai praktis.'),
(1, 'TWK', 'UUD 1945 & Konstitusi', 'Berdasarkan Pasal 1 ayat (2) UUD NRI Tahun 1945 setelah amandemen, kedaulatan berada di tangan rakyat dan dilaksanakan menurut...', '["A. Majelis Permusyawaratan Rakyat", "B. Undang-Undang Dasar", "C. Presiden bersama Dewan Perwakilan Rakyat", "D. Dewan Perwakilan Daerah dan Mahkamah Konstitusi", "E. Hukum yang berlaku di seluruh wilayah NKRI"]'::jsonb, 1, NULL, 'Pasal 1 ayat (2) UUD 1945 berbunyi: ''Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar''.'),
(1, 'TWK', 'Nasionalisme & Bela Negara', 'Sikap mengutamakan produk dalam negeri di tengah gempuran produk impor merupakan wujud pengamalan nilai bela negara dalam aspek...', '["A. Cinta tanah air", "B. Kesadaran berbangsa dan bernegara", "C. Rela berkorban untuk bangsa dan negara", "D. Kemampuan awal bela negara", "E. Setia pada Pancasila sebagai ideologi negara"]'::jsonb, 0, NULL, 'Mencintai, menjaga, dan melestarikan produk karya anak bangsa merupakan indikator utama dari nilai ''Cinta Tanah Air''.'),
(1, 'TWK', 'Bhinneka Tunggal Ika', 'Prinsip Bhinneka Tunggal Ika mengajarkan bahwa persatuan bangsa Indonesia tidak menghilangkan keberagaman suku, ras, dan agama. Sikap yang mencerminkan integrasi nasional adalah...', '["A. Etnosentrisme yang membanggakan budaya sendiri secara berlebihan", "B. Primordialisme dalam memilih pemimpin organisasi kemasyarakatan", "C. Toleransi aktif dan gotong royong antar pemeluk keyakinan berbeda", "D. Asimilasi paksa kebudayaan minoritas ke dalam budaya mayoritas", "E. Eksklusivisme kelompok dalam kegiatan sosial kemasyarakatan"]'::jsonb, 2, NULL, 'Toleransi aktif dan gotong royong tanpa membedakan latar belakang adalah landasan Bhinneka Tunggal Ika demi menjaga keutuhan NKRI.'),
(1, 'TWK', 'Bahasa Indonesia', 'Penulisan kata serapan yang baku menurut PUEBI di bawah ini adalah...', '["A. Frekwensi, analisa, praktek", "B. Frekuensi, analisis, praktik", "C. Frekwensi, analisis, praktek", "D. Frekuensi, analisa, praktik", "E. Frekwensi, analisir, praktis"]'::jsonb, 1, NULL, 'Bentuk baku menurut KBBI dan PUEBI adalah ''frekuensi'' (frequency), ''analisis'' (analysis), dan ''praktik'' (practice).'),
(1, 'TIU', 'Analogi Kata', 'MOBIL : BENSIN = PELARI : ....', '["A. Makanan", "B. Sepatu", "C. Lintasan", "D. Istirahat", "E. Keringat"]'::jsonb, 0, NULL, 'Hubungan analogi fungsi sumber energi: Mobil membutuhkan bensin sebagai sumber energi untuk bergerak, sebagaimana pelari membutuhkan makanan sebagai sumber energi untuk berlari.'),
(1, 'TIU', 'Silogisme Logika', 'Semua calon ASN yang lulus SKD rajin berlatih soal CAT. Sebagian peserta Bimbel tidak rajin berlatih soal CAT. Kesimpulan yang sah adalah...', '["A. Sebagian peserta Bimbel tidak lulus SKD", "B. Semua peserta Bimbel pasti lulus SKD", "C. Semua yang rajin berlatih soal adalah peserta Bimbel", "D. Sebagian peserta Bimbel rajin tetapi tidak lulus", "E. Tidak ada peserta Bimbel yang lulus SKD"]'::jsonb, 0, NULL, 'Jika semua yang lulus SKD harus rajin berlatih, dan ada peserta Bimbel yang tidak rajin berlatih, maka peserta tersebut tidak akan lulus SKD. Kesimpulan: Sebagian peserta Bimbel tidak lulus SKD.'),
(1, 'TIU', 'Deret Angka', 'Perhatikan deret berikut: 3, 7, 15, 31, 63, ... Angka berikutnya adalah...', '["A. 120", "B. 126", "C. 127", "D. 128", "E. 131"]'::jsonb, 2, NULL, 'Pola deret: x 2 + 1. (3x2+1=7), (7x2+1=15), (15x2+1=31), (31x2+1=63), maka berikutnya: (63 x 2) + 1 = 126 + 1 = 127.'),
(1, 'TIU', 'Aritmetika Sosial', 'Sebuah laptop dibeli seharga Rp 8.000.000 dan dijual kembali dengan keuntungan 15%. Berapakah harga jual laptop tersebut?', '["A. Rp 8.800.000", "B. Rp 9.000.000", "C. Rp 9.200.000", "D. Rp 9.400.000", "E. Rp 9.600.000"]'::jsonb, 2, NULL, 'Untung = 15% x Rp 8.000.000 = Rp 1.200.000. Harga jual = Rp 8.000.000 + Rp 1.200.000 = Rp 9.200.000.'),
(1, 'TIU', 'Kecepatan & Waktu', 'Jarak kota A ke kota B adalah 180 km. Sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam dan beristirahat selama 30 menit. Berapa lama total waktu perjalanan?', '["A. 3 jam", "B. 3 jam 30 menit", "C. 4 jam", "D. 4 jam 15 menit", "E. 4 jam 30 menit"]'::jsonb, 1, NULL, 'Waktu tempuh = Jarak / Kecepatan = 180 / 60 = 3 jam. Ditambah istirahat 30 menit = 3 jam 30 menit.'),
(1, 'TKP', 'Pelayanan Publik', 'Saat jam pelayanan hampir selesai, seorang kakek lanjut usia datang dari desa terpencil dengan berkas yang belum lengkap. Sikap Anda sebagai petugas loket adalah...', '["A. Memintanya pulang dan kembali besok dengan berkas lengkap", "B. Menerima berkas seadanya dan memprosesnya secara parsial", "C. Membantu memeriksa kekurangan berkas, memandu solusinya, dan menyelesaikan pelayanan dengan ramah", "D. Menolak berkas secara tegas sesuai SOP jam pelayanan", "E. Memberikan nomor kontak calo agar urusan kakek lebih cepat selesai"]'::jsonb, 2, '[2, 3, 5, 1, 0]'::jsonb, 'Pilihan C mencerminkan integritas orientasi pelayanan prima (skor 5): melayani sepenuh hati, solutif, dan ramah tanpa melanggar ketentuan pokok.'),
(1, 'TKP', 'Profesionalisme', 'Anda ditugaskan memimpin proyek yang anggotanya memiliki latar belakang pendidikan dan gaya kerja sangat berbeda. Langkah awal yang paling tepat adalah...', '["A. Membuat aturan sepihak dan mewajibkan semua anggota patuh", "B. Mengadakan musyawarah untuk menyamakan visi, membagi peran sesuai keahlian, dan menyusun target bersama", "C. Mengabaikan perbedaan dan membiarkan mereka bekerja sendiri-sendiri", "D. Mengganti anggota tim yang tidak sesuai dengan selera kerja Anda", "E. Mengerjakan sendiri sebagian besar tugas agar hasilnya sempurna"]'::jsonb, 1, '[2, 5, 2, 1, 3]'::jsonb, 'Pilihan B (skor 5) menunjukkan kompetensi kepemimpinan dan jejaring kerja: merangkul keberagaman tim dan menyelaraskan potensi menjadi sinergi kinerja.');

-- Seed: Modul Materi
INSERT INTO public.materi (id, title, type, estimated_time, video_url, summary, key_points, order_num) VALUES
('twk-1', 'Pancasila & UUD 1945', 'TWK', '45 Menit', NULL, 'Pemahaman komprehensif mengenai sejarah perumusan Pancasila, pembukaan UUD 1945, serta kedudukan hukum tertinggi konstitusi negara.', '["Sejarah perumusan Pancasila oleh BPUPKI & PPKI", "Hierarki tata perundang-undangan di Indonesia", "Pengamalan 45 butir Pancasila dalam ASN"]'::jsonb, 1),
('twk-2', 'Nasionalisme dalam Bingkai NKRI', 'TWK', '60 Menit', 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Nasionalisme adalah paham yang menciptakan dan mempertahankan kedaulatan sebuah negara dengan mewujudkan satu konsep identitas bersama.', '["Pilar Kebangsaan: Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika.", "Penerapan nasionalisme dalam kehidupan bernegara dan pencegahan radikalisme.", "Tantangan integritas nasional di era globalisasi dan revolusi digital."]'::jsonb, 2),
('tiu-1', 'Deret Angka & Huruf', 'TIU', '50 Menit', NULL, 'Metode praktis mendeteksi pola lompatan bertingkat, deret fibonacci, dan pola selang-seling dalam hitungan detik.', '["Pola deret aritmetika bertingkat", "Deret geometri dan selang-seling", "Pola alfabet bertingkat"]'::jsonb, 3),
('tiu-2', 'Silogisme & Logika Analitis', 'TIU', '55 Menit', NULL, 'Kaidah penarikan kesimpulan modus ponens, tollens, silogisme disjungtif, dan analisis diagram venn.', '["Kaidah penarikan kesimpulan valid", "Jebakan kata semua vs sebagian", "Posisi dan urutan penalaran analitis"]'::jsonb, 4),
('tkp-1', 'Pelayanan Publik & Jejaring Kerja', 'TKP', '40 Menit', NULL, 'Strategi memilih opsi jawaban bernilai 5 pada indikator orientasi pelayanan, integritas kerja, dan kolaborasi.', '["Identifikasi indikator soal dengan cepat", "Karakteristik pilihan jawaban skor 5", "Manajemen empati dalam pelayanan ASN"]'::jsonb, 5)
ON CONFLICT (id) DO NOTHING;

-- Seed: Materi Chapters
INSERT INTO public.materi_chapters (materi_id, title, type, duration, score, order_num) VALUES
('twk-1', 'Sejarah BPUPKI & PPKI', 'video', '14:20', NULL, 1),
('twk-1', 'Butir-Butir Pengamalan Pancasila', 'article', '8 min', NULL, 2),
('twk-1', 'Kuis Pemahaman Pancasila', 'quiz', '15 min', 100, 3),
('twk-2', '1. Konsep Dasar Nasionalisme', 'video', '12:40', NULL, 1),
('twk-2', '2. Sejarah Pergerakan Nasional', 'article', '5 min baca', NULL, 2),
('twk-2', '3. Kuis Mini TWK Penalaran', 'quiz', '10 min', 100, 3),
('tiu-1', 'Pola Deret Aritmetika Dasar', 'video', '10:15', NULL, 1),
('tiu-1', 'Deret Fibonacci & Campuran', 'video', '16:00', NULL, 2),
('tiu-1', 'Latihan 20 Soal Deret Cepat', 'quiz', '10 min', NULL, 3),
('tiu-2', 'Kaidah Dasar Silogisme', 'video', '15:20', NULL, 1),
('tiu-2', 'Jebakan Kata ''Semua'' vs ''Sebagian''', 'article', '6 min baca', NULL, 2),
('tiu-2', 'Simulasi Silogisme Analitis', 'quiz', '15 min', NULL, 3),
('tkp-1', 'Karakteristik Opsi Nilai 5', 'video', '11:30', NULL, 1),
('tkp-1', 'Studi Kasus Pelayanan Publik', 'article', '8 min', NULL, 2),
('tkp-1', 'Simulasi Mini Kasus TKP', 'quiz', '10 min', NULL, 3)
ON CONFLICT DO NOTHING;

-- Seed: Jadwal
INSERT INTO public.jadwal (id, title, category, date, time, duration, quota, registered_count, status) VALUES
(1, 'Try Out Akbar Nasional Batch 4', 'Try Out Akbar', '2026-10-28', '08:00 - 10:00 WIB', '100 Menit', 2500, 2180, 'upcoming'),
(2, 'Simulasi CAT Khusus Kemenkumham & Kejagung', 'Try Out Instansi', '2026-11-02', '13:00 - 15:00 WIB', '100 Menit', 1000, 840, 'upcoming'),
(3, 'Try Out Mini Maraton: 45 Menit Kilat', 'Latihan Cepat', '2026-11-05', '19:30 - 20:30 WIB', '45 Menit', 500, 310, 'upcoming'),
(4, 'Try Out Akbar Nasional Batch 3 (Selesai)', 'Try Out Akbar', '2026-10-15', '08:00 - 10:00 WIB', '100 Menit', 2000, 2000, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Seed: Pengumuman
INSERT INTO public.pengumuman (id, badge, event_month, event_day, title, time, description) VALUES
(1, 'Jadwal Try Out Akbar', 'NOV', '30', 'Try Out Nasional Batch 5', '08:00 - 10:00 WIB', 'Simulasi serentak mirip sistem CAT BKN se-Indonesia dengan pembobotan nilai SKD terbaru.'),
(2, 'Try Out Spesial Formasi', 'DES', '05', 'Try Out Khusus Formasi Kemenkeu & Kemenkumham', '13:00 - 15:00 WIB', 'Simulasi pendalaman soal TWK pilar negara dan tes logika penalaran analitis TIU tingkat lanjut.'),
(3, 'Webinar Mentoring', 'DES', '09', 'Bedah Soal Silogisme & Berhitung Cepat', '19:30 - 21:00 WIB', 'Tips dan trik 30 detik menyelesaikan soal TIU bersama alumni CPNS ranking 1 nasional.')
ON CONFLICT (id) DO NOTHING;

-- Seed: Paket Langganan
INSERT INTO public.paket_langganan (id, name, price, price_number, original_price, period, description, popular, features) VALUES
('paket-pejuang', 'Paket Pejuang SKD', 'Rp 99.000', 99000, 'Rp 199.000', 'Akses 3 Bulan', 'Paket hemat untuk pemula yang ingin memulai persiapan ujian SKD.', FALSE, '["10x Simulasi Try Out CAT Mandiri", "Rangkuman PDF Kisi-Kisi BKN 2026", "Kunci Jawaban & Pembahasan Lengkap", "Grafik Peringkat Nasional"]'::jsonb),
('paket-garuda-pro', 'Paket Garuda PRO', 'Rp 199.000', 199000, 'Rp 399.000', 'Akses 6 Bulan', 'Pilihan terfavorit dengan ribuan bank soal dan analisa pintar kelulusan.', TRUE, '["35x Simulasi Try Out Sistem CAT BKN", "Akses 150+ Video Pembahasan Mentor", "Analitik AI Pemetaan Kelemahan Sub-bab", "Grup Diskusi Pejuang NIP & Mentor ASN", "Garansi Soal Terupdate Sesuai PermenPANRB"]'::jsonb),
('paket-intensif-asn', 'Paket Intensif Bimbingan', 'Rp 349.000', 349000, 'Rp 599.000', 'Akses 12 Bulan', 'Program karantina belajar intensif dengan live zoom bersama praktisi.', FALSE, '["Semua fitur Paket Garuda PRO", "12x Live Zoom Mentoring Eksklusif", "Review Portofolio & Konsultasi Formasi", "Simulasi Ujian Akbar Berhadiah Nasional", "Akses Materi SKB (Seleksi Kompetensi Bidang)"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
