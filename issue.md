# Issue: Pembuatan Halaman Destinasi, Paket Wisata, dan Kontak

## Deskripsi
Proyek ini membutuhkan penambahan tiga halaman utama baru: **Destinasi**, **Paket Wisata**, dan **Kontak**. Halaman-halaman ini harus responsif, menggunakan desain premium yang konsisten dengan halaman beranda, dan mengimplementasikan animasi ringan untuk meningkatkan *user experience* (UX). 

Dokumen ini berisi panduan teknis langkah demi langkah agar dapat diimplementasikan dengan mudah.

---

## Task 1: Membuat Halaman Destinasi (Destinations Page)
**Target Lokasi File:** `src/app/destinations/page.tsx`

### Instruksi Implementasi:
1. **Buat File Routing:** Buat folder `destinations` di dalam `src/app/`, lalu buat file `page.tsx` di dalamnya.
2. **Struktur Dasar Halaman:**
   - Halaman harus diekspor sebagai komponen default (`export default function DestinationsPage`).
3. **Hero Section Destinasi:**
   - Tambahkan *banner* atau *hero section* di bagian atas (tinggi sekitar `40vh`).
   - Tampilkan judul besar "Explore Our Destinations" dan deskripsi singkat di bawahnya.
   - Berikan *background* warna solid halus atau gradien, atau gunakan gambar placeholder dengan *overlay* gelap transparan agar teks mudah dibaca.
4. **Grid Destinasi:**
   - Di bawah hero section, buat layout *grid* responsif:
     - Mobile: 1 kolom (`grid-cols-1`)
     - Tablet: 2 kolom (`md:grid-cols-2`)
     - Desktop: 3 atau 4 kolom (`lg:grid-cols-3` atau `lg:grid-cols-4`)
   - Ekstrak atau salin mock data dari `src/components/Destinations.tsx` dan tambahkan lebih banyak item (6-8 item) agar halaman terlihat penuh.
   - Gunakan atau replikasi desain "Destination Card" dari halaman utama (berisi gambar, nama tempat, rating, dan harga mulai dari).
5. **SEO & Metadata (Opsional tapi direkomendasikan):** Tambahkan `export const metadata = { title: "Destinations - Travello" };`.

---

## Task 2: Membuat Halaman Paket Wisata (Packages Page)
**Target Lokasi File:** `src/app/packages/page.tsx`

### Instruksi Implementasi:
1. **Buat File Routing:** Buat folder `packages` di dalam `src/app/`, lalu buat file `page.tsx` di dalamnya.
2. **Hero Section Paket Wisata:**
   - Buat judul utama yang menarik, seperti "Our Premium Tour Packages".
3. **Daftar Paket:**
   - Ambil inspirasi desain atau komponen dari `src/components/Packages.tsx`.
   - Gunakan mock data yang lebih detail (setidaknya 4-6 paket wisata).
   - Setiap kartu paket wisata harus memuat informasi detail berikut:
     - Gambar representatif menggunakan `<Image>` dari `next/image` dengan properti `fill` dan `object-cover`.
     - Nama paket (misal: "Bali 3 Days 2 Nights").
     - Ikon fasilitas (Gunakan `lucide-react`, misalnya ikon Hotel, Makan, Transportasi).
     - Harga paket.
     - Tombol *Call to Action* (CTA) seperti "Book Now" atau "View Details".
4. **Interaksi:** Pastikan ada efek *hover* pada setiap kartu (misal: gambar sedikit membesar/zoom-in atau bayangan kartu menjadi lebih tegas `hover:shadow-xl`).

---

## Task 3: Membuat Halaman Kontak (Contact Page)
**Target Lokasi File:** `src/app/contact/page.tsx`

### Instruksi Implementasi:
1. **Buat File Routing:** Buat folder `contact` di dalam `src/app/`, lalu buat file `page.tsx` di dalamnya.
2. **Struktur Layout (Split Screen di Desktop):**
   - Buat kontainer utama dengan maksimal lebar `max-w-7xl` dan beri padding.
   - Layout harus berupa *grid* 2 kolom di mode desktop (`md:grid-cols-2`) dan 1 kolom bertumpuk di mode mobile.
3. **Kolom Kiri (Informasi Kontak):**
   - Tampilkan teks "Get in Touch" atau "Contact Us".
   - Buat daftar informasi kontak dengan ikon (`lucide-react`):
     - **Alamat:** Jalan contoh nomor sekian, Kota, Negara.
     - **Telepon:** +62 812 3456 7890.
     - **Email:** hello@travello.com.
   - (Opsional) Tambahkan *placeholder iframe* Google Maps jika memungkinkan.
4. **Kolom Kanan (Formulir Kontak):**
   - Buat form yang berisi input field berikut:
     - **Full Name** (Input tipe teks)
     - **Email Address** (Input tipe email)
     - **Subject** (Input tipe teks)
     - **Message** (Textarea dengan minimal 4 baris)
   - Terapkan *styling* premium pada *input field*: `bg-gray-50`, `border`, `rounded-lg`, `focus:ring-2`, `focus:border-accent-orange` (atau warna brand).
   - Tambahkan tombol "Send Message" lebar penuh (`w-full`) dengan efek transisi warna saat di-hover.

---

## 🛠️ Catatan Implementasi Penting (Panduan Developer)

- **Komponen Gambar:** Selalu gunakan komponen `<Image />` dari `next/image` untuk gambar, dan jangan lupa berikan atribut `sizes="(max-width: 768px) 100vw, 50vw"` pada gambar dinamis untuk mencegah *warning* performa di console browser.
- **Konsistensi Desain:** Komponen Navigation Bar (Navbar) dan Footer sudah diletakkan pada layout utama (biasanya `src/app/layout.tsx`), jadi tidak perlu mengimpornya kembali di setiap `page.tsx` kecuali aplikasi ini memiliki struktur yang berbeda. Anda hanya fokus mendesain isi utamanya saja (isi dalam `<main>`).
- **Warna & Font:** Pastikan memanggil variabel Tailwind yang sesuai dengan *brand book* aplikasi yang sudah didefinisikan sebelumnya (cek `tailwind.config.ts` untuk warna kustom seperti oranye aksen, dll).
- **Animasi:** Jika menggunakan GSAP untuk animasi halaman masuk, pastikan mendefinisikan komponen sebagai `"use client"` di baris paling atas agar fungsi browser-side berjalan lancar.
