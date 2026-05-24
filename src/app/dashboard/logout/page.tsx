"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowRight, ShieldAlert, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LogoutPage() {
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
    // Smooth transition back to main dashboard
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: -10,
      duration: 0.4,
      onComplete: () => {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 bg-[#181E4B]/50 backdrop-blur-md z-50 flex items-center justify-center p-6"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-[36px] border border-white/20 p-8 sm:p-12 max-w-md w-full shadow-2xl relative text-center overflow-hidden flex flex-col items-center"
      >
        {/* Glowing visual effect circle */}
        <div className="absolute left-1/2 top-[-20%] transform -translate-x-1/2 w-[220px] h-[220px] bg-orange-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

        {isLoggingOut ? (
          <div className="py-8 flex flex-col items-center gap-5">
            <div className="w-16 h-16 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
            <h3 className="font-serif text-xl font-bold text-primary-navy">
              Mengakhiri Sesi Explorer...
            </h3>
            <p className="text-text-gray text-xs font-semibold">
              Menghapus data sesi aktif Anda. Mengarahkan kembali ke Beranda...
            </p>
          </div>
        ) : (
          <>
            {/* Warning / Logout Icon */}
            <div className="w-20 h-20 bg-orange-50 text-accent-orange rounded-full flex items-center justify-center shadow-inner border border-orange-100 mb-6 animate-float">
              <LogOut className="w-9 h-9" />
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-primary-navy tracking-tight mb-3">
              Keluar dari Sesi?
            </h3>
            
            {/* Subtext */}
            <p className="text-text-gray text-xs sm:text-sm font-semibold leading-relaxed mb-8">
              Apakah Anda yakin ingin mengakhiri sesi aktif saat ini? Semua informasi persiapan dan pemesanan tiket Anda tetap tersimpan dengan aman di database kami.
            </p>

            {/* Button Actions Row */}
            <div className="grid grid-cols-2 gap-4 w-full">
              
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl text-primary-navy text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-text-gray" />
                <span>Batal</span>
              </button>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmLogout}
                className="py-3.5 bg-gradient-to-r from-accent-orange to-accent-orange/95 text-white text-xs font-bold rounded-2xl shadow-md hover:shadow-lg hover:from-primary-navy hover:to-primary-navy transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
