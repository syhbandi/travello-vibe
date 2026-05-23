# Feature: Booking, Login, and Sign Up Pages

## Deskripsi
Issue ini dibuat untuk melacak pengembangan halaman **Booking**, **Login**, dan **Sign Up** untuk aplikasi Travello. Halaman-halaman ini harus mengikuti standar desain visual premium yang sudah ada, menggunakan GSAP untuk animasi, serta memastikan desain responsif dan memiliki kontras (aksesibilitas) yang baik.

## Checklist Tugas

### 1. Login Page (`/login`)
- [ ] Implementasi form untuk autentikasi pengguna (Email & Password).
- [ ] Tambahkan tautan "Lupa Kata Sandi" (Forgot Password).
- [ ] Tambahkan tautan untuk menuju ke halaman pendaftaran (Sign Up).
- [ ] Terapkan desain UI premium dengan transisi dan animasi menggunakan GSAP.

### 2. Sign Up Page (`/signup` atau `/register`)
- [ ] Implementasi form pendaftaran pengguna baru (Nama, Email, Kata Sandi, Konfirmasi Kata Sandi).
- [ ] Tambahkan opsi pendaftaran menggunakan pihak ketiga (opsional: Google/Facebook).
- [ ] Tambahkan tautan untuk menuju ke halaman Login jika sudah punya akun.
- [ ] Terapkan animasi masuk (entrance animations) dengan GSAP.

### 3. Booking Page (`/booking`)
- [ ] Buat antarmuka form pemesanan (Booking form/flow).
- [ ] Integrasikan dengan detail destinasi atau paket wisata yang dipilih.
- [ ] Pastikan jarak antara header dan konten utama diatur dengan baik (menyesuaikan gaya transparan/gradient pada navbar).
- [ ] Validasi form pemesanan dengan baik sebelum data dikirim.

### 4. Integrasi Navigasi & Navbar
- [ ] Pastikan tombol login/sign up di Navbar mengarah ke rute yang benar.
- [ ] Sesuaikan logika warna teks navbar jika halaman ini menggunakan background terang atau gelap pada area Hero/Header.

## Catatan Tambahan
- Pertahankan penggunaan Tailwind CSS dan konsistensi warna (primary-navy, gradient, dll).
- Pastikan form tidak tertutup oleh navbar pada perangkat mobile.
