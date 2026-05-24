"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  X, 
  Calendar, 
  Compass, 
  DollarSign, 
  Check, 
  AlertCircle 
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const destinations = [
  {
    id: 1,
    title: "Gili Trawangan, Lombok",
    category: "Pantai & Gili",
    price: "$250",
    rating: "4.9",
    duration: "5 Days Trip",
    imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
    desc: "Gili Trawangan adalah gili terbesar dari tiga pulau kecil yang berdekatan di lepas pantai barat laut Lombok. Menawarkan pantai tropis berpasir putih bersih, perairan biru jernih tanpa polusi kendaraan bermotor, kehidupan bawah laut berumbu karang berpenyu yang menakjubkan, dan pesona matahari terbenam terbaik di Indonesia.",
    highlights: ["Bebas Polusi Kendaraan Bermotor", "Berenang Bersama Penyu Liar", "Resort Pantai Mewah Terbuka", "Sunset Swings Atas Air"],
  },
  {
    id: 2,
    title: "Mount Rinjani Crater Rim",
    category: "Gunung & Hiking",
    price: "$300",
    rating: "4.8",
    duration: "4 Days Trip",
    imgUrl: "https://images.unsplash.com/photo-1626082896492-766af4fc6595?q=80&w=600&auto=format&fit=crop",
    desc: "Gunung Rinjani adalah gunung berapi aktif kedua tertinggi di Indonesia yang disucikan. Menawarkan pendakian premium di atas awan, pemandangan matahari terbit kawah yang menakjubkan, Danau kawah biru Segara Anak yang megah, serta pemandian mata air panas belerang alami yang menenangkan setelah perjalanan panjang.",
    highlights: ["Certified Mountain Guides & Porters", "Camping Lengkap di Pelawangan Sembalun", "Mata Air Panas Belerang Alami", "Sunrise Danau Segara Anak"],
  },
  {
    id: 3,
    title: "Mandalika Coastline & Kuta",
    category: "Pantai & Gili",
    price: "$200",
    rating: "4.7",
    duration: "3 Days Trip",
    imgUrl: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?q=80&w=600&auto=format&fit=crop",
    desc: "Kawasan Ekonomi Khusus Mandalika menawarkan keindahan pantai pasir putih berbentuk bulat unik menyerupai merica. Kawasan ini merupakan pusat pariwisata berstandar internasional terintegrasi dengan sirkuit MotoGP Pertamina Mandalika serta dikelilingi oleh bukit-bukit hijau eksotis.",
    highlights: ["Kunjungan VIP Sirkuit MotoGP Mandalika", "Pantai Tanjung Aan Pasir Merica", "Selancar Kelas Dunia (Surf Session)", "Pemandangan Sunset Bukit Merese"],
  },
  {
    id: 4,
    title: "Desa Adat Sade Sasak",
    category: "Budaya & Sejarah",
    price: "$120",
    rating: "4.6",
    duration: "2 Days Trip",
    imgUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop",
    desc: "Dusun adat Sade di Lombok Tengah yang melestarikan arsitektur tradisional suku asli Sasak Lombok. Menyajikan keunikan rumah berbahan bambu beratap rumbia rumput ilalang kering, lantai tanah liat gosok abu jerami, serta keahlian wanita lokal menenun kain songket eksotis.",
    highlights: ["Arsitektur Rumah Tradisional Sasak", "Workshop Belajar Menenun Kain Songket", "Pertunjukan Tarian Perang Presean", "Pemandu Adat Lokal Sade"],
  },
];

const categories = ["Semua", "Pantai & Gili", "Gunung & Hiking", "Budaya & Sejarah"];

export default function DestinasiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".dest-card-animate",
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, { dependencies: [searchQuery, activeCategory], scope: containerRef });

  // Filter logic
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookSimulation = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedDest(null);
      }, 2500);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10">
      
      {/* Search and Category Filters Bar */}
      <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between">
        
        {/* Search Widget */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari nama tempat, atraksi, pantai..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 outline-none rounded-2xl pl-12 pr-4 py-3.5 text-xs font-semibold text-primary-navy focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange transition-all duration-300 shadow-sm"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Category Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-3xs font-extrabold tracking-wider uppercase shrink-0 transition-all select-none cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#181E4B] text-white shadow-md shadow-[#181E4B]/15"
                  : "bg-white border border-gray-100 text-text-gray hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Destinations Cards Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="dest-card-animate group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={dest.imgUrl}
                  alt={dest.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-primary-navy font-bold rounded-xl text-5xs tracking-wider uppercase shadow-sm">
                  {dest.category}
                </span>
                
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                  Lombok, Indonesia
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-6 text-left flex flex-col flex-grow">
                
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-lg font-bold text-primary-navy group-hover:text-accent-orange transition-colors">
                    {dest.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2.5 py-1 rounded-xl">
                    <Star className="w-3.5 h-3.5 fill-accent-yellow stroke-accent-yellow" />
                    <span className="text-primary-navy font-black text-xs">{dest.rating}</span>
                  </div>
                </div>

                <p className="text-text-gray text-xs font-medium leading-relaxed mb-6 line-clamp-3">
                  {dest.desc}
                </p>

                {/* Footer details & Action */}
                <div className="flex justify-between items-center mt-auto pt-5 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-5xs font-bold text-text-gray uppercase tracking-wider mb-0.5">Mulai Dari</span>
                    <span className="font-sans text-lg font-black text-accent-orange">
                      {dest.price} <span className="text-4xs font-bold text-text-gray">/ pax</span>
                    </span>
                  </div>

                  <button 
                    onClick={() => setSelectedDest(dest)}
                    className="px-4 py-2.5 bg-[#181E4B] text-white text-xs font-bold rounded-xl hover:bg-accent-orange transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Detail
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="font-serif text-xl font-bold text-primary-navy mb-1.5">Destinasi Tidak Ditemukan</h3>
          <p className="text-text-gray text-xs max-w-xs font-semibold">
            Coba masukkan kata kunci pencarian yang lain atau ganti filter kategori Anda.
          </p>
        </div>
      )}

      {/* 4. Details Glassmorphic Modal */}
      {selectedDest && (
        <div className="fixed inset-0 bg-[#181E4B]/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          
          <div className="bg-white rounded-[36px] border border-white/20 max-w-2xl w-full relative overflow-hidden shadow-2xl flex flex-col my-8 animate-float">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedDest(null)}
              className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/90 text-primary-navy hover:bg-white shadow-md border border-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center gap-5">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner">
                  <Check className="w-10 h-10" strokeWidth={3} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary-navy">
                  Booking Berhasil Diajukan!
                </h3>
                <p className="text-text-gray text-xs font-semibold max-w-sm">
                  Pemesanan Anda untuk {selectedDest.title} telah masuk sistem kami. Konsultan perjalanan kami akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <>
                {/* Modal Visual Banner */}
                <div className="relative h-[260px] w-full">
                  <Image
                    src={selectedDest.imgUrl}
                    alt={selectedDest.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 text-left flex flex-col gap-1.5 text-white">
                    <span className="text-5xs font-black px-2.5 py-1 bg-accent-orange text-white rounded-lg uppercase self-start">
                      {selectedDest.category}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold">
                      {selectedDest.title}
                    </h2>
                  </div>
                </div>

                {/* Modal Details Scroll Area */}
                <div className="p-6 sm:p-8 flex flex-col gap-6 text-left max-h-[60vh] overflow-y-auto">
                  
                  {/* Rating row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent-yellow stroke-accent-yellow" />
                      <span className="text-primary-navy font-bold text-xs">{selectedDest.rating} Review Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-accent-orange" />
                      <span className="text-primary-navy font-bold text-xs">{selectedDest.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Compass className="w-4 h-4 text-[#181E4B]" />
                      <span className="text-primary-navy font-bold text-xs">Fully Guided</span>
                    </div>
                  </div>

                  {/* Complete description */}
                  <div className="flex flex-col gap-2">
                    <span className="text-4xs font-bold text-primary-navy tracking-widest uppercase">Tentang Destinasi</span>
                    <p className="text-text-gray text-xs font-semibold leading-relaxed">
                      {selectedDest.desc}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="flex flex-col gap-3">
                    <span className="text-4xs font-bold text-primary-navy tracking-widest uppercase">Sorotan Utama Liburan</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDest.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="p-0.5 bg-orange-50 text-accent-orange rounded-full shrink-0 mt-0.5 border border-orange-100">
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                          <span className="text-text-gray font-bold text-xs leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Checkout simulator */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-2">
                    <div className="flex flex-col">
                      <span className="text-5xs font-bold text-text-gray uppercase tracking-wider mb-0.5">Biaya Liburan</span>
                      <span className="font-sans text-xl sm:text-2xl font-black text-accent-orange">
                        {selectedDest.price} <span className="text-3xs font-bold text-text-gray">/ pax</span>
                      </span>
                    </div>

                    <button
                      onClick={handleBookSimulation}
                      disabled={isBooking}
                      className="px-6 py-3.5 bg-gradient-to-r from-accent-orange to-accent-orange/95 text-white text-xs font-bold rounded-2xl hover:from-primary-navy hover:to-primary-navy shadow-lg disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isBooking ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Memesan...</span>
                        </>
                      ) : (
                        <>
                          <span>Pesan Petualangan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
