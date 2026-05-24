"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Check, 
  X,
  Compass,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Mock packages data
const initialPackages = [
  {
    id: 1,
    title: "Gili Trawangan Escape",
    category: "Pantai & Gili",
    price: "250",
    duration: "5 Hari 4 Malam",
    imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
    desc: "Petualangan bahari premium di gili terbesar Lombok dengan pantai pasir putih bersih dan perairan biru tanpa polusi kendaraan.",
    highlights: "Bebas Polusi Kendaraan, Berenang Bersama Penyu, Resort Pantai Mewah",
  },
  {
    id: 2,
    title: "Rinjani Crater Expedition",
    category: "Gunung & Hiking",
    price: "300",
    duration: "4 Hari 3 Malam",
    imgUrl: "https://images.unsplash.com/photo-1626082896492-766af4fc6595?q=80&w=600&auto=format&fit=crop",
    desc: "Pendakian premium menantang ke puncak kawah aktif Gunung Rinjani dengan pemandangan danau Segara Anak yang luar biasa.",
    highlights: "Pemandu Berlisensi, Camping Mewah, Kolam Air Panas Belerang",
  },
  {
    id: 3,
    title: "Mandalika VIP Coastal Tour",
    category: "Pantai & Gili",
    price: "200",
    duration: "3 Hari 2 Malam",
    imgUrl: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?q=80&w=600&auto=format&fit=crop",
    desc: "Eksplorasi garis pantai eksotis pasir merica Mandalika lengkap dengan sesi kunjungan eksklusif VIP Sirkuit MotoGP.",
    highlights: "VIP Sirkuit MotoGP, Sunset Bukit Merese, Belajar Surfing",
  },
];

export default function PackagesCRUDPage() {
  const [packages, setPackages] = useState(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof initialPackages[0] | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  
  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Pantai & Gili");
  const [formPrice, setFormPrice] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formHighlights, setFormHighlights] = useState("");
  const [formImgUrl, setFormImgUrl] = useState("https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop");

  const [notification, setNotification] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant entrance stagger
    gsap.fromTo(
      ".package-card-animate",
      { opacity: 0, scale: 0.95, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
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

  // Open Modal for Create or Edit
  const openFormModal = (pkg: typeof initialPackages[0] | null = null) => {
    if (pkg) {
      setSelectedPackage(pkg);
      setFormTitle(pkg.title);
      setFormCategory(pkg.category);
      setFormPrice(pkg.price);
      setFormDuration(pkg.duration);
      setFormDesc(pkg.desc);
      setFormHighlights(pkg.highlights);
      setFormImgUrl(pkg.imgUrl);
    } else {
      setSelectedPackage(null);
      setFormTitle("");
      setFormCategory("Pantai & Gili");
      setFormPrice("");
      setFormDuration("");
      setFormDesc("");
      setFormHighlights("");
      setFormImgUrl("https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop");
    }
    setIsModalOpen(true);
  };

  // Close Modal
  const closeFormModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // Submit Handler for Form (Create/Update)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice || !formDuration || !formDesc) {
      alert("Harap lengkapi semua field utama.");
      return;
    }

    if (selectedPackage) {
      // Edit mode
      setPackages(prev => prev.map(p => {
        if (p.id === selectedPackage.id) {
          return {
            ...p,
            title: formTitle,
            category: formCategory,
            price: formPrice,
            duration: formDuration,
            desc: formDesc,
            highlights: formHighlights,
            imgUrl: formImgUrl
          };
        }
        return p;
      }));
      triggerNotification(`Paket "${formTitle}" berhasil diperbarui!`);
    } else {
      // Create mode
      const newPkg = {
        id: Date.now(),
        title: formTitle,
        category: formCategory,
        price: formPrice,
        duration: formDuration,
        desc: formDesc,
        highlights: formHighlights || "Panduan Wisata, Akomodasi Mewah, Tiket Masuk",
        imgUrl: formImgUrl
      };
      setPackages(prev => [...prev, newPkg]);
      triggerNotification(`Paket Baru "${formTitle}" berhasil ditambahkan!`);
    }
    closeFormModal();
  };

  // Open Delete Confirmation Modal
  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  // Execute deletion
  const handleDelete = () => {
    if (deleteTargetId !== null) {
      const target = packages.find(p => p.id === deleteTargetId);
      setPackages(prev => prev.filter(p => p.id !== deleteTargetId));
      triggerNotification(`Paket "${target?.title}" berhasil dihapus.`);
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
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

      {/* Page Title & Add Button Row */}
      <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center justify-between">
        <div className="text-left">
          <h2 className="font-serif text-2xl font-bold text-white">Manajemen Destinasi & Paket</h2>
          <p className="text-white/50 text-xs font-medium mt-1">
            Tambah paket wisata baru, perbarui rincian biaya, atau hapus destinasi yang sudah nonaktif.
          </p>
        </div>

        <button
          onClick={() => openFormModal()}
          className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Wisata</span>
        </button>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className="package-card-animate group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1"
          >
            {/* Image banner */}
            <div className="relative h-[200px] w-full overflow-hidden border-b border-white/5">
              <Image 
                src={pkg.imgUrl} 
                alt={pkg.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <span className="absolute top-4 right-4 px-3 py-1 bg-indigo-600/90 text-white font-bold rounded-xl text-[9px] tracking-wide uppercase shadow-sm">
                {pkg.category}
              </span>
              
              <span className="absolute bottom-4 left-4 text-white text-xs font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                Lombok, Indonesia
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 text-left flex flex-col flex-grow">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-accent-yellow transition-colors mb-2">
                {pkg.title}
              </h3>
              
              <p className="text-white/60 text-xs font-medium leading-relaxed mb-4 flex-grow line-clamp-3">
                {pkg.desc}
              </p>

              <div className="flex items-center gap-3.5 text-white/55 text-[10px] font-bold mb-5 border-t border-white/5 pt-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent-orange" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mulai dari <strong className="text-emerald-400 font-extrabold">${pkg.price}</strong></span>
                </div>
              </div>

              {/* Action buttons (Edit & Delete) */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => openFormModal(pkg)}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Ubah</span>
                </button>
                <button
                  onClick={() => confirmDelete(pkg.id)}
                  className="px-3.5 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                  title="Hapus Paket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD Modal Form Glassmorphism */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            ref={modalRef}
            className="bg-[#0d122b]/95 border border-white/20 rounded-[36px] max-w-xl w-full relative overflow-hidden shadow-2xl flex flex-col p-8 my-8 animate-float text-left"
          >
            {/* Close */}
            <button 
              onClick={closeFormModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-white mb-6 pr-8">
              {selectedPackage ? "Ubah Rincian Paket Wisata" : "Tambah Paket Wisata Baru"}
            </h3>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-xs text-white">
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-white/70">Nama Paket / Destinasi</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: Rinjani Summit Climbing"
                    className="bg-white/5 border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white placeholder-white/20"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-white/70">Kategori</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="bg-[#0d122b] border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white cursor-pointer"
                  >
                    <option value="Pantai & Gili">Pantai & Gili</option>
                    <option value="Gunung & Hiking">Gunung & Hiking</option>
                    <option value="Budaya & Sejarah">Budaya & Sejarah</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Price & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-white/70">Biaya Paket ($ USD)</label>
                  <input 
                    type="number" 
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="Contoh: 250"
                    className="bg-white/5 border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white placeholder-white/20"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-white/70">Durasi Perjalanan</label>
                  <input 
                    type="text" 
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="Contoh: 3 Hari 2 Malam"
                    className="bg-white/5 border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white placeholder-white/20"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-white/70">URL Gambar Banner</label>
                <input 
                  type="text" 
                  value={formImgUrl}
                  onChange={(e) => setFormImgUrl(e.target.value)}
                  className="bg-white/5 border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white"
                />
              </div>

              {/* Row 4: Description */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-white/70">Deskripsi Lengkap Paket</label>
                <textarea 
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Jelaskan secara singkat penawaran, rute, atau akomodasi..."
                  className="bg-white/5 border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white placeholder-white/20 resize-none"
                  required
                />
              </div>

              {/* Row 5: Highlights */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-white/70">Highlight Utama (Pisahkan dengan koma)</label>
                <input 
                  type="text" 
                  value={formHighlights}
                  onChange={(e) => setFormHighlights(e.target.value)}
                  placeholder="Contoh: Hotel Bintang 5, Sarapan Gratis, Pemandu Gunung"
                  className="bg-white/5 border border-white/10 outline-none rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all text-white placeholder-white/20"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex justify-end gap-3.5 mt-4 border-t border-white/5 pt-5">
                <button 
                  type="button" 
                  onClick={closeFormModal}
                  className="px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10"
                >
                  <span>Simpan Perubahan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d122b]/95 border border-white/20 p-8 sm:p-10 rounded-[32px] max-w-md w-full text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
            
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-5 animate-pulse shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white mb-2">Hapus Paket Ini?</h3>
            <p className="text-white/60 text-xs font-semibold leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus paket wisata ini? Tindakan ini akan menghapus data paket dari panel admin secara permanen.
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Hapus Permanen
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
