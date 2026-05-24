"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Award, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Compass
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DashboardClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simulated countdown for next trip
  const [timeLeft, setTimeLeft] = useState({
    days: 21,
    hours: 8,
    minutes: 44,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // Stagger slide-up entry for cards
    gsap.fromTo(
      ".dash-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10">
      
      {/* 1. Dynamic Welcome Card Banner */}
      <div className="dash-card relative bg-[#181E4B] rounded-[32px] p-8 md:p-12 overflow-hidden shadow-xl text-white select-none">
        {/* Soft background visual gradients */}
        <div className="absolute right-0 top-0 w-[45%] h-full opacity-20 pointer-events-none select-none">
          <Image
            src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?q=80&w=600&auto=format&fit=crop"
            alt="Welcome Background"
            fill
            className="object-cover object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-transparent z-0" />

        <div className="relative z-10 max-w-xl flex flex-col items-start gap-4">
          <span className="text-accent-yellow font-black tracking-widest text-3xs uppercase">
            Explorer Status: Gold Level
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Selamat Datang Kembali, Syhbandi! 🌟
          </h2>
          <p className="text-white/80 font-medium text-xs sm:text-sm leading-relaxed">
            Petualangan premium berikutnya di Pulau Lombok sedang menunggu Anda. Semua persiapan untuk ekspedisi Rinjani Anda berjalan sesuai jadwal!
          </p>
          <Link
            href="/dashboard/destinasi"
            className="mt-2 px-6 py-3 bg-gradient-to-r from-accent-orange to-accent-orange/95 hover:from-accent-yellow hover:to-accent-yellow text-white text-xs font-bold rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2 group/btn"
          >
            Jelajahi Destinasi Lain
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 2. Top Level Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1: Total Bookings */}
        <div className="dash-card bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex items-center gap-5 sm:gap-6 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-accent-orange flex items-center justify-center shrink-0 shadow-inner">
            <Compass className="w-7 h-7" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-4xs font-bold text-text-gray tracking-wider uppercase mb-1">Total Pemesanan</span>
            <span className="text-2xl font-black text-primary-navy leading-none mb-1.5">3 Aktif</span>
            <span className="text-4xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full self-start">
              1 Selesai
            </span>
          </div>
        </div>

        {/* Stat 2: Loyalty Points */}
        <div className="dash-card bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex items-center gap-5 sm:gap-6 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-accent-yellow flex items-center justify-center shrink-0 shadow-inner">
            <Award className="w-7 h-7" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-4xs font-bold text-text-gray tracking-wider uppercase mb-1">XP Explorer</span>
            <span className="text-2xl font-black text-primary-navy leading-none mb-1.5">1,250 XP</span>
            <span className="text-4xs font-bold text-accent-yellow bg-yellow-50 px-2 py-0.5 rounded-full self-start">
              Level 3 Gold
            </span>
          </div>
        </div>

        {/* Stat 3: Spent */}
        <div className="dash-card bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex items-center gap-5 sm:gap-6 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
            <DollarSign className="w-7 h-7" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-4xs font-bold text-text-gray tracking-wider uppercase mb-1">Total Anggaran</span>
            <span className="text-2xl font-black text-primary-navy leading-none mb-1.5">$820.00</span>
            <span className="text-4xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full self-start flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Hemat 15%
            </span>
          </div>
        </div>

      </div>

      {/* 3. Bottom Grid: Countdown & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Countdown / Next Trip Card */}
        <div className="dash-card lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          
          {/* Card Header */}
          <div className="p-6 sm:p-8 border-b border-gray-50 flex items-center justify-between flex-wrap gap-4 text-left">
            <div className="flex flex-col">
              <span className="text-4xs font-bold text-accent-orange tracking-widest uppercase mb-1">Perjalanan Terdekat</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-primary-navy">
                Mount Rinjani Crater Summit Trekking
              </h3>
            </div>
            <span className="text-3xs font-extrabold px-3 py-1 bg-amber-50 text-accent-yellow border border-amber-200/50 rounded-xl uppercase">
              Persiapan 80%
            </span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6 flex-grow">
            
            {/* Split Visual & Countdown row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* Trip visual card details */}
              <div className="relative h-[150px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1626082896492-766af4fc6595?q=80&w=600&auto=format&fit=crop"
                  alt="Rinjani Summit"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                  Sembalun, Lombok Utara
                </span>
              </div>

              {/* Countdown Digits */}
              <div className="flex flex-col items-center sm:items-start gap-3">
                <span className="text-4xs font-bold text-text-gray tracking-wider uppercase flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-text-gray" /> Waktu Mundur Keberangkatan
                </span>
                
                <div className="flex gap-2">
                  {/* Days */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 min-w-[50px]">
                    <span className="text-base font-black text-primary-navy leading-none mb-0.5">{String(timeLeft.days).padStart(2, "0")}</span>
                    <span className="text-5xs font-bold text-text-gray uppercase tracking-widest">Hari</span>
                  </div>
                  {/* Hours */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 min-w-[50px]">
                    <span className="text-base font-black text-primary-navy leading-none mb-0.5">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-5xs font-bold text-text-gray uppercase tracking-widest">Jam</span>
                  </div>
                  {/* Min */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 min-w-[50px]">
                    <span className="text-base font-black text-primary-navy leading-none mb-0.5">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-5xs font-bold text-text-gray uppercase tracking-widest">Mnt</span>
                  </div>
                  {/* Sec */}
                  <div className="flex flex-col items-center bg-orange-50 border border-orange-100/50 rounded-xl px-3 py-2 min-w-[50px] animate-pulse">
                    <span className="text-base font-black text-accent-orange leading-none mb-0.5">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-5xs font-bold text-accent-orange uppercase tracking-widest">Dtk</span>
                  </div>
                </div>

                <span className="text-5xs font-bold text-text-gray tracking-wider flex items-center gap-1 mt-1 text-left">
                  <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                  Jadwal: 15 Juni 2026 (4 Hari 3 Malam)
                </span>
              </div>

            </div>

            {/* Preparation Steps checklist progressive bar */}
            <div className="flex flex-col gap-3.5 text-left bg-gray-50/50 border border-gray-100/50 p-5 rounded-2xl">
              <span className="text-4xs font-bold text-primary-navy tracking-widest uppercase">
                Status Checklist Persiapan
              </span>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-primary-navy">Tiket & Administrasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-primary-navy">Pembayaran Lunas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-300 shrink-0" />
                  <span className="text-xs font-medium text-text-gray">Packing Perlengkapan Mendaki</span>
                </div>
              </div>

              {/* Progress bar line visual */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
                <div className="bg-gradient-to-r from-accent-orange to-accent-yellow h-full rounded-full w-[80%]"></div>
              </div>
            </div>

          </div>

        </div>

        {/* Recent Activities Timeline card */}
        <div className="dash-card bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col">
          <div className="border-b border-gray-50 pb-4 mb-5 text-left">
            <h3 className="font-serif text-lg font-bold text-primary-navy">Aktivitas Terakhir</h3>
          </div>

          {/* Timeline points */}
          <div className="flex flex-col gap-5 flex-grow text-left relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            
            {/* Item 1 */}
            <div className="flex gap-4 relative z-10 group cursor-default">
              <div className="w-5.5 h-5.5 rounded-full bg-emerald-500 border-4 border-white shadow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"></div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-primary-navy leading-tight">
                  Pemesanan Rinjani Terkonfirmasi
                </span>
                <span className="text-4xs font-bold text-text-gray tracking-wider uppercase">Hari Ini, 10:24 AM</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 relative z-10 group cursor-default">
              <div className="w-5.5 h-5.5 rounded-full bg-orange-500 border-4 border-white shadow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"></div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-primary-navy leading-tight">
                  Profil Explorer Diperbarui
                </span>
                <span className="text-4xs font-bold text-text-gray tracking-wider uppercase">Kemarin, 04:15 PM</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4 relative z-10 group cursor-default">
              <div className="w-5.5 h-5.5 rounded-full bg-blue-500 border-4 border-white shadow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"></div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-primary-navy leading-tight">
                  Koin Explorer +150 XP Ditambahkan
                </span>
                <span className="text-4xs font-bold text-text-gray tracking-wider uppercase">24 Mei 2026, 09:00 AM</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex gap-4 relative z-10 group cursor-default">
              <div className="w-5.5 h-5.5 rounded-full bg-gray-400 border-4 border-white shadow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"></div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-primary-navy leading-tight">
                  Login dari Browser Baru (Windows)
                </span>
                <span className="text-4xs font-bold text-text-gray tracking-wider uppercase">23 Mei 2026, 02:30 PM</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
