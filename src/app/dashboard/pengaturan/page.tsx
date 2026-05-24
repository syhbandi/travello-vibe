"use client";

import { useRef, useState } from "react";
import { 
  Bell, 
  ShieldCheck, 
  Eye, 
  Languages, 
  Lock, 
  Mail, 
  HelpCircle,
  Smartphone,
  Check
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PengaturanPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom switch states
  const [switches, setSwitches] = useState({
    emailAlerts: true,
    bookingUpdates: true,
    promoEmails: false,
    twoFactor: false,
    saveHistory: true,
    darkMode: false,
  });

  const [language, setLanguage] = useState("id");
  const [successMsg, setSuccessMsg] = useState("");

  useGSAP(() => {
    gsap.fromTo(
      ".sett-card-animate",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const toggleSwitch = (key: keyof typeof switches) => {
    setSwitches(prev => {
      const next = { ...prev, [key]: !prev[key] };
      
      // Visual feedback
      setSuccessMsg("Pengaturan berhasil disimpan!");
      setTimeout(() => setSuccessMsg(""), 2000);
      
      return next;
    });
  };

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    setSuccessMsg("Bahasa berhasil diubah!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10">
      
      {/* Page Header Intro */}
      <div className="flex flex-col items-start text-left max-w-xl">
        <span className="text-accent-orange uppercase font-extrabold tracking-widest text-3xs mb-2">
          Preferensi
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight">
          Pengaturan Akun
        </h2>
        <p className="text-text-gray text-xs sm:text-sm mt-2 font-medium">
          Sesuaikan notifikasi perjalanan, tingkatkan keamanan akun, dan pilih preferensi tampilan Anda.
        </p>
      </div>

      {/* Floating Success Alert Toast */}
      {successMsg && (
        <div className="fixed bottom-8 right-8 bg-primary-navy text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/10 z-40 animate-bounce">
          <Check className="w-4 h-4 text-accent-yellow" strokeWidth={3} />
          {successMsg}
        </div>
      )}

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Section 1: Notifications */}
        <div className="sett-card-animate bg-white rounded-[32px] border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left">
          
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-accent-orange flex items-center justify-center shrink-0 border border-orange-100">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-sm font-bold text-primary-navy">Notifikasi Aplikasi</h3>
              <span className="text-5xs font-bold text-text-gray uppercase tracking-widest">Kapan kami memberi info</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Email Penawaran Paket</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Terima rekomendasi eksklusif destinasi & promo voucher Lombok</span>
              </div>
              
              <button 
                onClick={() => toggleSwitch("promoEmails")}
                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                  switches.promoEmails ? "bg-accent-orange" : "bg-gray-200"
                }`}
              >
                <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-sm ${
                  switches.promoEmails ? "left-5.75" : "left-0.75"
                }`} />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Notifikasi Status Pemesanan</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Terima update langsung terkait status pembayaran, tiket, & guide</span>
              </div>
              
              <button 
                onClick={() => toggleSwitch("bookingUpdates")}
                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                  switches.bookingUpdates ? "bg-accent-orange" : "bg-gray-200"
                }`}
              >
                <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-sm ${
                  switches.bookingUpdates ? "left-5.75" : "left-0.75"
                }`} />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Peringatan Keamanan</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Kirim email jika terdeteksi aktivitas mencurigakan pada akun</span>
              </div>
              
              <button 
                onClick={() => toggleSwitch("emailAlerts")}
                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                  switches.emailAlerts ? "bg-accent-orange" : "bg-gray-200"
                }`}
              >
                <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-sm ${
                  switches.emailAlerts ? "left-5.75" : "left-0.75"
                }`} />
              </button>
            </div>
          </div>

        </div>

        {/* Section 2: Account Security */}
        <div className="sett-card-animate bg-white rounded-[32px] border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left">
          
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-sm font-bold text-primary-navy">Keamanan & Privasi</h3>
              <span className="text-5xs font-bold text-text-gray uppercase tracking-widest">Tingkatkan Proteksi Data</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Otentikasi Dua Faktor (2FA)</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Amankan login Anda dengan verifikasi kode OTP ponsel tambahan</span>
              </div>
              
              <button 
                onClick={() => toggleSwitch("twoFactor")}
                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                  switches.twoFactor ? "bg-accent-orange" : "bg-gray-200"
                }`}
              >
                <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-sm ${
                  switches.twoFactor ? "left-5.75" : "left-0.75"
                }`} />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Simpan Riwayat Session</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Simpan log alamat IP perangkat login Anda untuk audit keamanan</span>
              </div>
              
              <button 
                onClick={() => toggleSwitch("saveHistory")}
                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                  switches.saveHistory ? "bg-accent-orange" : "bg-gray-200"
                }`}
              >
                <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-sm ${
                  switches.saveHistory ? "left-5.75" : "left-0.75"
                }`} />
              </button>
            </div>

            {/* Button Option Password */}
            <div className="flex items-center justify-between gap-4 border-t border-gray-50 pt-5 mt-1">
              <div className="flex flex-col max-w-[70%] text-left">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Ubah Sandi Akun</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Disarankan memperbarui kata sandi Anda secara berkala</span>
              </div>
              <button 
                onClick={() => alert("Form ubah kata sandi dikirim ke email Anda!")}
                className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-primary-navy text-4xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Atur Ulang
              </button>
            </div>
          </div>

        </div>

        {/* Section 3: Display and Languages */}
        <div className="sett-card-animate md:col-span-2 bg-white rounded-[32px] border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left">
          
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-accent-yellow flex items-center justify-center shrink-0 border border-amber-100">
              <Languages className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-sm font-bold text-primary-navy">Tampilan & Regional</h3>
              <span className="text-5xs font-bold text-text-gray uppercase tracking-widest">Sesuaikan Bahasa & Tema</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            
            {/* Language Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Bahasa Aplikasi</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Ganti opsi bahasa teks antarmuka Travello Anda</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleLangChange("id")}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    language === "id"
                      ? "bg-[#181E4B] text-white border-[#181E4B] shadow-md shadow-[#181E4B]/15"
                      : "bg-white border-gray-100 text-text-gray hover:bg-gray-50"
                  }`}
                >
                  Bahasa Indonesia
                </button>
                <button
                  onClick={() => handleLangChange("en")}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    language === "en"
                      ? "bg-[#181E4B] text-white border-[#181E4B] shadow-md shadow-[#181E4B]/15"
                      : "bg-white border-gray-100 text-text-gray hover:bg-gray-50"
                  }`}
                >
                  English (US)
                </button>
              </div>
            </div>

            {/* Dark Mode Toggle Mockup */}
            <div className="flex items-center justify-between gap-4 bg-gray-50/50 border border-gray-100 p-5 rounded-2xl">
              <div className="flex flex-col max-w-[70%] text-left">
                <span className="text-xs font-bold text-primary-navy mb-0.5">Mode Gelap (Malam)</span>
                <span className="text-4xs font-bold text-text-gray leading-tight">Ubah latar belakang visual ke tema gelap yang nyaman di mata</span>
              </div>
              
              <button 
                onClick={() => toggleSwitch("darkMode")}
                className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                  switches.darkMode ? "bg-accent-orange" : "bg-gray-300"
                }`}
              >
                <span className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-sm ${
                  switches.darkMode ? "left-5.75" : "left-0.75"
                }`} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
