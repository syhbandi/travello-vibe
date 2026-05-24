"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AdminLogoutPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useGSAP(() => {
    // Elegant scale-up modal entrance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }
    );
  }, { scope: containerRef });

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate logging out session and redirect to landing page
    setTimeout(() => {
      // Fade out screen
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          router.push("/");
        }
      });
    }, 1500);
  };

  const handleCancel = () => {
    // Smooth transition back to admin overview
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: -10,
      duration: 0.4,
      onComplete: () => {
        router.push("/admin");
      }
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-6"
    >
      <div 
        ref={modalRef}
        className="bg-[#0d122b]/95 border border-white/20 p-8 sm:p-12 max-w-md w-full shadow-2xl relative text-center overflow-hidden flex flex-col items-center"
      >
        {/* Glowing visual effect circle */}
        <div className="absolute left-1/2 top-[-20%] transform -translate-x-1/2 w-[220px] h-[220px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {isLoggingOut ? (
          <div className="py-8 flex flex-col items-center gap-5">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="font-serif text-xl font-bold text-white">
              Mengakhiri Sesi Admin...
            </h3>
            <p className="text-white/60 text-xs font-semibold">
              Menghapus data token sesi admin Anda. Mengarahkan kembali ke Beranda...
            </p>
          </div>
        ) : (
          <>
            {/* Warning / Logout Icon */}
            <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center shadow-inner border border-indigo-500/20 mb-6 animate-float">
              <LogOut className="w-9 h-9" />
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight mb-3">
              Keluar dari Sesi Admin?
            </h3>
            
            {/* Subtext */}
            <p className="text-white/60 text-xs sm:text-sm font-semibold leading-relaxed mb-8">
              Apakah Anda yakin ingin keluar dari konsol kontrol admin? Riwayat perubahan, status backup harian, dan metrik finansial platform tetap tersimpan dengan aman di server utama.
            </p>

            {/* Button Actions Row */}
            <div className="grid grid-cols-2 gap-4 w-full">
              
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-white/50" />
                <span>Batal</span>
              </button>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmLogout}
                className="py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-xs font-bold rounded-2xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Keluar</span>
                <LogOut className="w-4 h-4" />
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
