"use client";

import { useRef, useState } from "react";
import { 
  Settings, 
  ShieldAlert, 
  Save, 
  Check, 
  X,
  ToggleLeft,
  Percent,
  RefreshCw
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [commissionRate, setCommissionRate] = useState("10");
  const [systemCurrency, setSystemCurrency] = useState("USD");
  
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".settings-card-animate",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      if (notifRef.current) {
        gsap.to(notifRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          onComplete: () => setNotification(null)
        });
      }
    }, 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      triggerNotification("Semua pengaturan sistem berhasil disimpan dan diterapkan!");
    }, 1500);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10 relative">
      
      {/* Floating Notification */}
      {notification && (
        <div 
          ref={notifRef}
          className="fixed top-24 right-6 sm:right-10 z-50 px-5 py-4 bg-[#0d122b]/95 border border-emerald-500/30 text-emerald-400 rounded-2xl backdrop-blur-md flex items-center gap-3 shadow-2xl animate-float max-w-sm text-left"
        >
          <Check className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold text-white">{notification}</span>
          <button 
            onClick={() => setNotification(null)}
            className="p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-left">
        <h2 className="font-serif text-2xl font-bold text-white">Pengaturan Sistem</h2>
        <p className="text-white/50 text-xs font-medium mt-1">
          Konfigurasi status operasional platform, persentase komisi, dan parameter global Travello.
        </p>
      </div>

      {/* Settings Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Core Settings Form */}
        <form 
          onSubmit={handleSaveSettings}
          className="settings-card-animate lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Section 1: Server Controls */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Kontrol Operasional Server
            </h3>

            {/* Toggle 1: Maintenance Mode */}
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-xs font-bold text-white">Mode Pemeliharaan (Maintenance)</span>
                <span className="text-[10px] text-white/50 leading-relaxed">
                  Aktifkan ini untuk menghentikan akses publik ke situs dan menampilkan layar pemeliharaan sistem.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                  maintenanceMode ? "bg-red-500" : "bg-white/10"
                }`}
              >
                <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-300 ${
                  maintenanceMode ? "translate-x-5.5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 2: User Registration */}
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-xs font-bold text-white">Pendaftaran Pengguna Baru</span>
                <span className="text-[10px] text-white/50 leading-relaxed">
                  Matikan fitur ini untuk mencegah pengunjung melakukan registrasi akun baru untuk sementara waktu.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAllowRegistration(!allowRegistration)}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                  allowRegistration ? "bg-emerald-500" : "bg-white/10"
                }`}
              >
                <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-300 ${
                  allowRegistration ? "translate-x-5.5" : "translate-x-0"
                }`} />
              </button>
            </div>
          </div>

          {/* Section 2: Finansial parameters */}
          <div className="flex flex-col gap-4 text-left mt-4">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Parameter Finansial & Harga
            </h3>

            {/* Input 1: Markup Commission Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-3 border-b border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white">Persentase Markup Biaya Paket</span>
                <span className="text-[10px] text-white/50 leading-relaxed">
                  Berapa persen komisi markup yang ditambahkan otomatis pada harga beli dasar paket.
                </span>
              </div>
              <div className="relative w-full sm:w-[150px] self-center sm:justify-self-end">
                <input 
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 outline-none rounded-xl pl-4 pr-10 py-2.5 font-bold text-xs text-white text-right focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500"
                  required
                />
                <Percent className="w-4 h-4 text-white/40 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Input 2: System Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white">Mata Uang Utama Sistem</span>
                <span className="text-[10px] text-white/50 leading-relaxed">
                  Mata uang utama yang digunakan dalam pencatatan laporan transaksi dan nominal biaya dashboard.
                </span>
              </div>
              <select 
                value={systemCurrency}
                onChange={(e) => setSystemCurrency(e.target.value)}
                className="w-full sm:w-[150px] bg-[#0d122b] border border-white/10 outline-none rounded-xl px-4 py-2.5 font-bold text-xs text-white text-right focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 cursor-pointer self-center sm:justify-self-end"
              >
                <option value="USD">USD ($)</option>
                <option value="IDR">IDR (Rp)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4 border-t border-white/5 pt-5">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 disabled:opacity-75 disabled:cursor-not-allowed text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Side Panel Info (Platform Health) */}
        <div className="settings-card-animate bg-[#0d122b]/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col gap-6 text-left text-white">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-accent-orange shrink-0" />
            <span>Pemberitahuan Sistem</span>
          </h3>

          <div className="flex flex-col gap-4 text-xs">
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
              <span className="font-bold text-accent-yellow">Sinkronisasi Database</span>
              <p className="text-white/60 text-[10px] leading-relaxed">
                Platform terhubung penuh dengan cluster database utama di Asia Pasifik. Waktu replikasi aman pada rata-rata 14ms.
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
              <span className="font-bold text-emerald-400">Verifikasi Backup Otomatis</span>
              <p className="text-white/60 text-[10px] leading-relaxed">
                Pencadangan file sistem dan database dilakukan harian secara otomatis. Backup terakhir sukses disinkronkan pada pukul 03:00 AM tadi.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
