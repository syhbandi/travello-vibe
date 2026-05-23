# Travello - Premium Travel Booking Platform

Welcome to **Travello**, a state-of-the-art, premium travel booking platform designed with a modern aesthetic, smooth animations, and high-performance server-side rendering. This project provides a seamless user experience for exploring destinations, finding custom vacation packages, and initiating bookings with an interface that feels alive and premium.

---

## 🌟 Fitur Utama

- **Modern Hero Section**: Tampilan beranda interaktif dengan efek mengambang (*floating elements*) dan navigasi transparan yang elegan.
- **Dynamic Destinations & Packages**: Jelajahi berbagai destinasi eksotis dan paket liburan menarik dengan tata letak grid responsif.
- **Premium Multi-Step Booking**: Halaman reservasi perjalanan dengan formulir terstruktur, validasi yang aman, dan visual premium.
- **Split-Screen Authentication**: Halaman Login & Sign Up yang memanfaatkan tata letak layar terbelah (*split-screen*) modern demi memaksimalkan fokus pengguna.
- **Polished Animations**: Transisi antarmuka yang sangat halus menggunakan kombinasi GSAP, ScrollTrigger, dan CSS Keyframes.
- **Glassmorphism UI**: Desain bergaya kaca transparan transparan yang trendi untuk kartu informasi dan navigasi mengambang.

---

## 🛠️ Tech Stack

Travello dikembangkan menggunakan teknologi web modern untuk performa dan skalabilitas maksimal:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) dengan dukungan React 19.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan arsitektur utility-first yang sangat cepat.
- **Animation**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) & [@gsap/react](https://greensock.com/react/) untuk orkestrasi animasi berbasis timeline dan interaksi scroll yang halus.
- **Icons**: [Lucide React](https://lucide.dev/) untuk pustaka ikon vektor modern yang konsisten.
- **Language**: [TypeScript](https://www.typescriptlang.org/) untuk pengetikan statis yang kuat, meminimalkan error runtime.

---

## 🚀 Panduan Instalasi & Penggunaan

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek Travello di lingkungan lokal Anda:

### 1. Kloning Repositori
```bash
git clone https://github.com/syhbandi/travello-vibe.git
cd travello-antigravity
```

### 2. Instal Dependensi
Gunakan Node.js versi LTS terbaru untuk hasil terbaik:
```bash
npm install
```

### 3. Jalankan Server Pengembangan
Jalankan dev server secara lokal:
```bash
npm run dev
```
Setelah berjalan, buka [http://localhost:3000](http://localhost:3000) pada peramban Anda untuk melihat hasilnya.

### 4. Build untuk Produksi
Untuk melakukan kompilasi proyek dengan optimasi produksi penuh:
```bash
npm run build
```
Untuk menjalankan hasil build produksi tersebut secara lokal:
```bash
npm run start
```

---

## 📂 Struktur Direktori & Arsitektur

Berikut adalah struktur folder utama dari proyek Travello:

```text
travello-antigravity/
├── public/                 # Aset statis seperti gambar, ikon, dan logo
├── src/
│   ├── app/                # Next.js App Router (Halaman dan Rute)
│   │   ├── booking/        # Halaman Booking
│   │   ├── contact/        # Halaman Contact
│   │   ├── destinations/   # Halaman Destinations
│   │   ├── login/          # Halaman Login
│   │   ├── signup/         # Halaman Sign Up
│   │   ├── packages/       # Halaman Packages
│   │   ├── globals.css     # Styling global & konfigurasi tema Tailwind CSS
│   │   ├── layout.tsx      # Entry layout global (HTML, Font, Navbar, Footer)
│   │   └── page.tsx        # Halaman Beranda (Home)
│   └── components/         # Komponen UI modular & reusable
│       ├── Navbar.tsx      # Header Navigasi responsif
│       ├── Footer.tsx      # Footer premium
│       ├── Hero.tsx        # Banner beranda interaktif
│       ├── Destinations.tsx# Grid destinasi di beranda
│       ├── Packages.tsx    # Grid paket liburan di beranda
│       └── ...             # Komponen pendukung lainnya
├── package.json            # Daftar dependensi & script proyek
└── tsconfig.json           # Konfigurasi TypeScript
```

### 🏛️ Komponen Client-Side vs Server-Side

Proyek ini menerapkan paradigma Next.js App Router secara ketat untuk performa optimal:

1. **Server Components (Default)**
   - Digunakan untuk komponen tingkat halaman (`page.tsx`) di setiap folder rute `src/app/*`.
   - Mengatur metadata SEO secara statis/dinamis untuk pengindeksan mesin pencari yang optimal.
   - Mengirimkan HTML awal yang ringan tanpa membebani berkas JavaScript utama di peramban.

2. **Client Components (`"use client"`)**
   - Digunakan untuk komponen interaktif di bawah `src/components/*` dan form wrapper.
   - Dibutuhkan ketika menggunakan React State/Effects (`useState`, `useEffect`), penanganan event, atau rendering animasi interaktif (GSAP).

---

## 🎨 Panduan Desain & Estetika Premium

Travello dirancang dengan estetika mewah, bersih, dan kontras yang seimbang.

### 🔴 Skema Warna (Theme Colors)
Sistem warna dikonfigurasi melalui `@theme inline` di `src/app/globals.css`:
* **Primary Navy** (`--color-primary-navy` / `#181E4B`): Digunakan untuk teks judul utama, teks tebal, dan elemen background gelap yang menawan.
* **Accent Orange** (`--color-accent-orange` / `#DF6951`): Digunakan untuk tombol panggilan aksi (CTA), teks highlight sekunder, dan badge diskon.
* **Accent Yellow** (`--color-accent-yellow` / `#F1A501`): Digunakan untuk aksen bintang rating dan elemen dekoratif halus.
* **Text Gray** (`--color-text-gray` / `#5E6282`): Digunakan untuk paragraf deskripsi dan teks pendukung agar kontras tetap nyaman dibaca.
* **Light Background** (`--color-light-bg` / `#FFF9F6`): Latar belakang alternatif super lembut untuk bagian seksi atau kartu informasi.

### 🪄 Utility Kelas Kustom (CSS Utilities)
Kami menyediakan kelas utilitas kustom di `globals.css` untuk mempercepat pemformatan UI premium:
- **Floating Effect** (`.animate-float` & `.animate-float-delayed`): Membuat elemen melayang perlahan ke atas-bawah secara bergantian (ideal untuk ilustrasi dekoratif).
- **Glassmorphism** (`.glass` & `.glass-dark`): Memberikan efek kaca buram transparan dengan filter blur 12px dan border tipis mengilap, memberikan kesan kedalaman 3D yang modern.

---

## ⚡ Panduan Animasi GSAP

Kami menggunakan **GSAP** untuk membuat animasi transisi berkualitas tinggi. Untuk menjaga performa dan menghindari kebocoran memori (*memory leaks*), selalu patuhi panduan berikut:

### 1. Gunakan `@gsap/react`
Jangan gunakan vanilla GSAP `useEffect` secara mentah. Selalu bungkus kode animasi Anda di dalam hook `useGSAP` untuk pembersihan siklus hidup komponen otomatis:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animasi masuk untuk elemen di dalam container
    gsap.from(".animate-item", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    });
  }, { scope: containerRef }); // Membatasi target selector agar aman hanya di dalam containerRef

  return (
    <div ref={containerRef}>
      <h2 className="animate-item">Destinasi Populer</h2>
      <p className="animate-item">Jelajahi dunia dengan gaya premium.</p>
    </div>
  );
}
```

### 2. Animasi Berbasis Scroll (ScrollTrigger)
Untuk memicu animasi saat pengguna menggulir halaman, daftarkan modul `ScrollTrigger` terlebih dahulu:

```tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Daftarkan plugin di tingkat file
gsap.registerPlugin(ScrollTrigger);
```

Gunakan `scrollTrigger` di dalam konfigurasi GSAP:
```tsx
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".card-container",
    start: "top 80%", // Animasi terpicu saat bagian atas kontainer menyentuh 80% tinggi layar
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  scale: 0.95,
  duration: 0.6
});
```

---

## 📄 Kontribusi

1. Buat branch fitur baru Anda (`git checkout -b feature/nama-fitur`).
2. Terapkan perubahan dan pastikan kode lolos validasi tipe TypeScript (`npm run build`).
3. Commit kontribusi Anda (`git commit -m 'feat: menambahkan fitur baru'`).
4. Push ke repositori asal (`git push origin feature/nama-fitur`).
5. Buat Pull Request di GitHub.

Selamat berkarya! Kembangkan Travello dengan getaran kode terbaik Anda! ✨
