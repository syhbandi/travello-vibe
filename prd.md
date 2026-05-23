# Product Requirements Document (PRD): Travello Landing Page

## 1. Ikhtisar Proyek (Project Overview)
**Nama Proyek:** Travello Landing Page
**Deskripsi:** Membangun sebuah landing page modern, dinamis, dan responsif untuk platform travel bernama "Travello". Desain akan mengacu pada referensi gambar yang diberikan, dengan penyesuaian khusus untuk menampilkan destinasi wisata unggulan di Pulau Lombok, Indonesia.

## 2. Tech Stack
- **Framework:** Next.js (disarankan menggunakan App Router untuk performa dan struktur modern).
- **Styling:** Tailwind CSS (untuk styling utility-first yang cepat dan responsif).
- **Animasi:** GSAP (GreenSock Animation Platform) untuk animasi yang halus, kompleks, dan interaktif (scroll animations, hover effects, parallax).

## 3. Struktur Halaman & Fitur (Section by Section)

### 3.1. Navbar (Header)
- **Logo:** Teks "Travello" di sebelah kiri (dengan styling tebal/logo khusus).
- **Menu Navigasi:** 
  - Destinations
  - Hotels
  - Flights
  - Bookings
- **Aksi Pengguna (User Actions):**
  - Login
  - Tombol "Sign up" (berbingkai/outlined).
  - Dropdown Bahasa (Contoh: EN).
- **Perilaku:** Navbar harus responsif (hamburger menu di perangkat mobile) dan mengimplementasikan efek animasi GSAP saat di-scroll (misal: *sticky header* dengan transisi bayangan/background).

### 3.2. Hero Section
- **Tagline:** "BEST DESTINATIONS AROUND THE WORLD" (teks kecil dengan warna aksen oranye/merah bata).
- **Headline (H1):** "Travel, enjoy and live a new and full life" (Teks tebal, ukuran besar, dengan elemen garis bawah dekoratif melengkung pada kata "enjoy").
- **Deskripsi:** Teks paragraf pendukung tentang layanan penawaran Travello.
- **Tombol CTA (Call to Action):**
  - Tombol Utama: "Find out more" (Warna latar kuning keemasan/oranye).
  - Tombol Sekunder: "Play Demo" (Teks dengan ikon play di dalam lingkaran oranye muda di sebelah kirinya).
- **Visual:** Gambar ilustrasi/foto utama seorang traveler (wanita duduk santai di atas koper dengan latar belakang elemen grafis pesawat terbang).
- **Animasi GSAP:** Elemen teks dan tombol masuk dengan efek *fade-in* dan *slide-up* secara bergantian (*stagger*) saat halaman dimuat. Elemen pesawat atau gambar wanita bisa diberi efek melayang tipis (*floating animation*).

### 3.3. Services Section
- **Konteks:** "CATEGORY"
- **Judul Utama:** "We Offer Best Services"
- **Konten:** 4 Kartu layanan (Service Cards) yang berjejer (grid 4 kolom di desktop, 1 atau 2 kolom di mobile):
  1. **Calculated Weather:** Ikon radar cuaca.
  2. **Best Flights:** Ikon pesawat kertas.
  3. **Local Events:** Ikon mikrofon klasik.
  4. **Customization:** Ikon gir/pengaturan.
- **Interaksi & Animasi:** Efek *hover* pada kartu yang membuat kartu sedikit terangkat, menampilkan bayangan halus, dan memunculkan kotak dekoratif lengkung berwarna di kiri/kanan bawah kartu. Gunakan GSAP ScrollTrigger untuk memunculkan kartu satu per satu.

### 3.4. Top Destinations Section (Kustomisasi LOMBOK)
- **Konteks:** "Top Selling"
- **Judul:** "Top Destinations"
- **Konten:** 3 Kartu destinasi wisata. **[PENTING: Bagian ini harus diganti dengan destinasi Lombok]**
  1. **Destinasi 1: Gili Trawangan** (Gambar referensi: Pantai tropis, sepeda, atau ayunan di atas air).
     - Detail: "Gili Trawangan, Lombok" | Harga (misal: $250) | Durasi: 5 Days Trip (Ikon navigasi/pesawat kertas).
  2. **Destinasi 2: Gunung Rinjani** (Gambar referensi: Pemandangan puncak gunung atau Danau Segara Anak).
     - Detail: "Mount Rinjani, Lombok" | Harga (misal: $300) | Durasi: 4 Days Trip.
  3. **Destinasi 3: Mandalika / Pantai Kuta Lombok** (Gambar referensi: Pantai berpasir putih atau sirkuit).
     - Detail: "Mandalika, Lombok" | Harga (misal: $200) | Durasi: 3 Days Trip.
- **Animasi GSAP:** Kartu muncul berurutan dari bawah ke atas saat bagian ini masuk ke dalam viewport (*staggered scroll entrance*).

### 3.5. Booking Steps Section
- **Konteks:** "Easy and Fast"
- **Judul:** "Book Your Next Trip In 3 Easy Steps"
- **Sisi Kiri (Daftar Langkah):**
  1. **Choose Destination:** Ikon dalam kotak kuning. Deskripsi tentang memilih destinasi impian.
  2. **Make Payment:** Ikon dalam kotak oranye/merah. Deskripsi tentang proses pembayaran yang cepat dan aman.
  3. **Reach Airport on Selected Date:** Ikon dalam kotak hijau kebiruan. Deskripsi tentang bersiap menuju bandara.
- **Sisi Kanan (Visualisasi / Trip Card):** 
  - Kartu "Trip To Lombok" (Sesuaikan dari referensi yang bertuliskan Yunani/Greece). Menampilkan thumbnail gambar Lombok, judul trip, rentang tanggal, nama agen, jumlah peserta, dan ikon aksi (daun, peta, kirim).
  - Kartu Progres Mengambang (Floating Card): Berada di atas/sebelah kartu utama dengan desain elips/lingkaran menampilkan progres perjalanan (Misal: "Ongoing", "Rinjani Trekking", bar progres 40%).
- **Animasi GSAP:** Animasi *parallax* halus pada kartu utama dan animasi *floating* melayang naik-turun secara terus-menerus pada kartu progres kecil.

### 3.6. Testimonials Section
- **Konteks:** "TESTIMONIALS"
- **Judul:** "What People Say About Us."
- **Konten:** Sistem Slider/Carousel unik.
  - Sisi Kiri: Judul dan *dot pagination* (indikator halaman).
  - Sisi Kanan: Kartu ulasan bergaya tumpuk (*stacked cards*). Kartu paling depan menampilkan foto profil, ulasan teks penuh, nama ("Mike taylor"), dan asal ("Lahore, Pakistan"). Kartu di belakangnya terlihat transparan sebagian. Terdapat tombol kontrol panah atas-bawah di sebelahnya.
- **Animasi GSAP:** Animasi transisi yang halus saat mengganti ulasan, kartu depan bergeser keluar dan kartu belakang maju ke depan.

### 3.7. Partners / Sponsors Section
- **Konten:** Satu baris horizontal berisi logo perusahaan partner maskapai atau OTA (Axon, Jetstar, Expedia, Qantas, Alitalia).
- **Efek:** Secara default berwarna *grayscale* (abu-abu) dan perlahan bertransisi menjadi berwarna (*full color*) serta sedikit membesar ketika kursor di-hover di atasnya (bisa dicapai dengan Tailwind `hover:grayscale-0`).

### 3.8. Newsletter / Subscribe Section
- **Desain Utama:** Kontainer besar dengan sudut membulat, latar belakang warna gradien ungu-biru yang sangat tipis/lembut, serta ornamen garis spiral dekoratif. Terdapat elemen ikon pesawat kertas bulat (ikon kirim pesan) mengambang di pojok kanan atas.
- **Judul:** "Subscribe to get information, latest news and other interesting offers about Travello"
- **Formulir (Input):** Kotak input email dengan ikon amplop di sebelah kiri, dipadukan dengan tombol submit bertuliskan "Subscribe" dengan gradien oranye/merah.
- **Animasi GSAP:** Elemen kotak form ini muncul dengan efek *scale-up* atau *reveal* saat ditarik ke dalam viewport.

### 3.9. Footer
- **Kolom 1:** Teks Logo "Travello" dan paragraf deskripsi singkat.
- **Kolom 2 (Company):** Link ke About, Careers, Mobile.
- **Kolom 3 (Contact):** Link ke Help/FAQ, Press, Affiliates.
- **Kolom 4 (More):** Link ke Airlinefees, Airline, Low fare tips.
- **Kolom 5 (Social & Apps):** Ikon bulat untuk Facebook, Instagram, Twitter. Di bawahnya terdapat tombol lencana untuk download di Google Play & Apple App Store.
- **Bagian Bawah:** Teks hak cipta (Copyright).

## 4. Panduan Eksekusi (Untuk Model AI Berikutnya)
1. **Inisialisasi:** Gunakan perintah `npx create-next-app@latest ./ --typescript --tailwind --eslint --app` untuk membuat proyek dasar jika belum ada.
2. **Setup Dependencies:** Install GSAP untuk animasi (`npm install gsap @gsap/react`). Gunakan `lucide-react` atau `react-icons` untuk ikon-ikon pendukung.
3. **Sistem Desain (CSS/Tailwind):**
   - Tentukan variabel warna kustom di `tailwind.config.ts` untuk konsistensi (misal: warna primer kuning/oranye, warna sekunder biru gelap untuk teks).
   - Gunakan font modern (misal: Poppins atau Volkhov untuk judul, Montserrat/Inter untuk body) melalui `next/font/google`.
4. **Komponen Modular:** Bangun secara modular per-bagian, mulai dari Navbar hingga Footer, pastikan desain *pixel-perfect* semirip mungkin dengan referensi gambar (dengan penyesuaian teks Lombok).
5. **Implementasi Animasi:** Bungkus setiap animasi GSAP di dalam komponen klien (`"use client"`) menggunakan hook `useGSAP`. Prioritaskan transisi yang elegan dan tidak berlebihan.
6. **Aset:** Karena gambar asli tidak disertakan, manfaatkan *placeholder* yang indah atau URL gambar wisata Lombok yang relevan dari *image placeholder services* (seperti Unsplash) pada komponen destinasi.
