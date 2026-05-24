"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  Check, 
  ArrowRight, 
  Download, 
  Phone, 
  Clock, 
  AlertCircle,
  Tag,
  Luggage
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const bookedPackages = [
  {
    id: "TRV-RNJ-8812",
    title: "Mount Rinjani Crater Summit Trekking",
    price: "$350",
    duration: "4 Days 3 Nights",
    imgUrl: "https://images.unsplash.com/photo-1626082896492-766af4fc6595?q=80&w=600&auto=format&fit=crop",
    dates: "15 Juni - 18 Juni 2026",
    status: "Confirmed",
    statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    statusDot: "bg-emerald-500",
    inclusions: ["Tenda & Peralatan Camping Premium", "Makan 3x Sehari oleh Porter", "Pemandu Berlisensi APGI", "Transport Penjemputan AC"],
    consultant: "Agus Pratama"
  },
  {
    id: "TRV-GIL-9041",
    title: "Gili Islands Luxury Snorkeling & Hopping",
    price: "$180",
    duration: "3 Days 2 Nights",
    imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
    dates: "20 Mei - 22 Mei 2026",
    status: "In Progress",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100",
    statusDot: "bg-blue-500",
    inclusions: ["Private Speedboat Transfer", "Premium Snorkeling Gear", "Sunset Sasak Seafood Dinner", "Beachfront Resort Stay"],
    consultant: "Sarah Wijaya"
  },
  {
    id: "TRV-SSK-7332",
    title: "Sasak Cultural Heritage & South Coast Tour",
    price: "$120",
    duration: "2 Days 1 Night",
    imgUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop",
    dates: "12 Juli - 13 Juli 2026",
    status: "Pending",
    statusColor: "bg-amber-50 text-accent-yellow border-amber-100",
    statusDot: "bg-accent-yellow",
    inclusions: ["Tiket Masuk Sade Village", "Belajar Menenun Kelas Privat", "Mandalika Surf Session", "Mobil Pribadi AC Comfort"],
    consultant: "Dewi Lestari"
  }
];

export default function PaketPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".paket-card-animate",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert("E-Tiket PDF berhasil diunduh ke perangkat Anda!");
    }, 1500);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10">
      
      {/* Page Header Intro */}
      <div className="flex flex-col items-start text-left max-w-xl">
        <span className="text-accent-orange uppercase font-extrabold tracking-widest text-3xs mb-2">
          Pusat Pemesanan
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight">
          Paket Liburan Anda
        </h2>
        <p className="text-text-gray text-xs sm:text-sm mt-2 font-medium">
          Daftar paket wisata Lombok premium yang sedang berjalan, terkonfirmasi, atau masih dalam antrean persetujuan.
        </p>
      </div>

      {/* Packages List */}
      <div className="flex flex-col gap-8">
        {bookedPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="paket-card-animate group bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* Visual Column */}
            <div className="relative h-[250px] lg:h-auto lg:col-span-4 min-h-[220px]">
              <Image
                src={pkg.imgUrl}
                alt={pkg.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/55 via-transparent to-transparent opacity-90" />
              
              <span className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm text-primary-navy font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                {pkg.dates}
              </span>
            </div>

            {/* Content Column */}
            <div className="p-6 sm:p-8 lg:col-span-8 flex flex-col text-left justify-between bg-white">
              
              {/* Header Info */}
              <div className="flex flex-col gap-3.5">
                
                {/* Meta details & status badge */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-5xs font-black text-text-gray tracking-wider uppercase flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1 rounded-xl">
                    <Tag className="w-3 h-3 text-text-gray" /> ID: {pkg.id}
                  </span>
                  
                  {/* Status */}
                  <span className={`text-5xs font-black border px-3.5 py-1 rounded-xl uppercase flex items-center gap-1.5 shadow-sm ${pkg.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${pkg.statusDot} animate-pulse`}></span>
                    {pkg.status}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-primary-navy">
                  {pkg.title}
                </h3>
              </div>

              {/* Inclusions grid */}
              <div className="my-6">
                <span className="text-5xs font-bold text-primary-navy tracking-widest uppercase block mb-3">Fasilitas & Inklusi Premium</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pkg.inclusions.map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2">
                      <div className="w-4.5 h-4.5 rounded-full bg-orange-50 text-accent-orange border border-orange-100 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                      <span className="text-text-gray font-bold text-xs whitespace-nowrap overflow-hidden text-ellipsis">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                {/* Price and duration */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-5xs font-bold text-text-gray uppercase tracking-wider mb-0.5">Biaya Liburan</span>
                    <span className="font-sans text-lg font-black text-accent-orange leading-none">
                      {pkg.price} <span className="text-4xs font-bold text-text-gray">/ pax</span>
                    </span>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="flex flex-col">
                    <span className="text-5xs font-bold text-text-gray uppercase tracking-wider mb-0.5">Durasi</span>
                    <span className="text-xs font-bold text-primary-navy leading-none">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Buttons utilities */}
                <div className="flex items-center gap-2.5">
                  
                  {/* Consultant Hotline */}
                  <a 
                    href={`tel:+628123456789`}
                    className="p-3 bg-gray-50 border border-gray-100 hover:bg-gray-100 rounded-xl text-primary-navy relative transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 cursor-pointer"
                    title={`Hubungi Konsultan: ${pkg.consultant}`}
                  >
                    <Phone className="w-4 h-4 text-text-gray" />
                    <span className="hidden sm:inline">Hubungi Agen</span>
                  </a>

                  {/* E-Ticket PDF Download */}
                  <button
                    onClick={() => handleDownload(pkg.id)}
                    disabled={downloadingId !== null}
                    className="px-4.5 py-3 bg-primary-navy hover:bg-accent-orange text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    {downloadingId === pkg.id ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengunduh...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Unduh E-Tiket</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
