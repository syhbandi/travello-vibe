"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Check, 
  X, 
  Eye, 
  FileText,
  AlertCircle,
  Clock,
  Compass,
  ArrowRight,
  TrendingUp,
  Download
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Mock bookings list
const initialBookings = [
  { 
    id: 101, 
    customer: "Rian Fikri", 
    email: "rian.fikri@mail.com",
    packageTitle: "Gili Trawangan Escape", 
    amount: 250, 
    date: "23 Mei 2026", 
    status: "Pending", 
    receiptUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop", // Simulated bank slip receipt
    bank: "Bank Mandiri Lombok"
  },
  { 
    id: 102, 
    customer: "Budi Santoso", 
    email: "budi.santoso@mail.com",
    packageTitle: "Rinjani Crater Expedition", 
    amount: 300, 
    date: "20 Mei 2026", 
    status: "Lunas", 
    receiptUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    bank: "Bank BCA KCP Senggigi"
  },
  { 
    id: 103, 
    customer: "Maria Shanti", 
    email: "maria.s@mail.com",
    packageTitle: "Mandalika VIP Coastal Tour", 
    amount: 200, 
    date: "18 Mei 2026", 
    status: "Dibatalkan", 
    receiptUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    bank: "Bank BNI Mataram"
  },
];

export default function BookingsVerificationPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<typeof initialBookings[0] | null>(null);
  const [isReceiptZoomed, setIsReceiptZoomed] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant entrance stagger
    gsap.fromTo(
      ".booking-row-animate",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, { dependencies: [searchQuery], scope: containerRef });

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

  // Confirm booking payment as Lunas
  const handleConfirmPayment = (bookingId: number) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        triggerNotification(`Pembayaran untuk order #${bookingId} (${booking.customer}) berhasil dikonfirmasi!`);
        return { ...booking, status: "Lunas" };
      }
      return booking;
    }));
    setSelectedBooking(null);
  };

  // Reject / Cancel booking
  const handleCancelBooking = (bookingId: number) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        triggerNotification(`Order #${bookingId} berhasil dibatalkan.`);
        return { ...booking, status: "Dibatalkan" };
      }
      return booking;
    }));
    setSelectedBooking(null);
  };

  // Filter based on search query
  const filteredBookings = bookings.filter(b => 
    b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.packageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toString().includes(searchQuery)
  );

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

      {/* Header section */}
      <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center justify-between">
        <div className="text-left">
          <h2 className="font-serif text-2xl font-bold text-white">Verifikasi Pemesanan</h2>
          <p className="text-white/50 text-xs font-medium mt-1">
            Validasi bukti transfer pemesanan tiket liburan Lombok dari pelanggan secara real-time.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[280px]">
          <input
            type="text"
            placeholder="Cari ID, nama, destinasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 outline-none rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-white focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 focus:bg-white/10 placeholder-white/30 transition-all duration-300"
          />
          <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-[10px] font-black tracking-widest uppercase">
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Pelanggan</th>
                <th className="px-6 py-5">Paket Wisata</th>
                <th className="px-6 py-5">Tanggal Order</th>
                <th className="px-6 py-5">Biaya</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="booking-row-animate hover:bg-white/[0.02] transition-colors">
                    {/* ID */}
                    <td className="px-6 py-4 font-extrabold text-indigo-400">
                      #{b.id}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-white leading-snug">{b.customer}</span>
                        <span className="text-[10px] text-white/50 font-medium leading-normal">{b.email}</span>
                      </div>
                    </td>

                    {/* Package Name */}
                    <td className="px-6 py-4 font-semibold text-white">
                      {b.packageTitle}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 font-semibold text-white/70">
                      {b.date}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-black text-emerald-400">
                      ${b.amount}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === "Lunas" ? "bg-emerald-500/15 text-emerald-400" : 
                        b.status === "Pending" ? "bg-amber-500/15 text-amber-400" :
                        "bg-red-500/15 text-red-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          b.status === "Lunas" ? "bg-emerald-400" : 
                          b.status === "Pending" ? "bg-amber-400" :
                          "bg-red-400"
                        }`} />
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {b.status === "Pending" ? (
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="inline-flex items-center justify-center gap-1 px-3.5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors cursor-pointer text-[10px] tracking-wide"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Verifikasi</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="inline-flex items-center justify-center p-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="Tinjau Detail"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-white/40 font-bold">
                    Pemesanan tidak ditemukan. Coba filter lain.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Receipt Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            ref={modalRef}
            className="bg-[#0d122b]/95 border border-white/20 rounded-[36px] max-w-xl w-full relative overflow-hidden shadow-2xl flex flex-col p-8 my-8 animate-float text-left"
          >
            {/* Close */}
            <button 
              onClick={() => { setSelectedBooking(null); setIsReceiptZoomed(false); }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-white mb-5 pr-8">
              Detail Verifikasi Pembayaran #{selectedBooking.id}
            </h3>

            {/* Modal Content split grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-xs">
              
              {/* Left Column: Details */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Nama Pelanggan</span>
                  <span className="font-black text-sm">{selectedBooking.customer}</span>
                  <span className="text-[10px] text-white/50">{selectedBooking.email}</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Paket Dipilih</span>
                  <span className="font-bold text-white">{selectedBooking.packageTitle}</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Jumlah Transfer</span>
                  <span className="font-extrabold text-emerald-400 text-sm">${selectedBooking.amount} USD</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Bank Pengirim</span>
                  <span className="font-semibold text-white/70">{selectedBooking.bank}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Status Order</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold self-start ${
                    selectedBooking.status === "Lunas" ? "bg-emerald-500/15 text-emerald-400" : 
                    selectedBooking.status === "Pending" ? "bg-amber-500/15 text-amber-400" :
                    "bg-red-500/15 text-red-400"
                  }`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              {/* Right Column: Receipt proof */}
              <div className="flex flex-col gap-2">
                <span className="text-white/40 font-bold uppercase text-[9px] tracking-wider">Bukti Transfer (Bank Slip)</span>
                
                {/* Simulated slip frame */}
                <div 
                  className={`relative bg-white rounded-2xl overflow-hidden border border-white/10 shadow-inner cursor-zoom-in transition-all duration-300 ${
                    isReceiptZoomed ? "h-[260px] border-indigo-500" : "h-[180px]"
                  }`}
                  onClick={() => setIsReceiptZoomed(!isReceiptZoomed)}
                  title="Klik untuk zoom"
                >
                  <Image 
                    src={selectedBooking.receiptUrl} 
                    alt="Receipt slip"
                    fill
                    className="object-cover"
                  />
                  
                  {/* Bank Receipt Text Simulator */}
                  <div className="absolute inset-0 bg-slate-950/70 p-4 flex flex-col justify-between text-[10px] text-white font-mono select-none">
                    <div className="flex justify-between border-b border-white/10 pb-1 font-bold">
                      <span>{selectedBooking.bank}</span>
                      <span className="text-emerald-400">BERHASIL</span>
                    </div>
                    <div className="flex flex-col gap-1 my-2 text-left">
                      <div>WAKTU: 23-05-2026 09:12</div>
                      <div>PENGIRIM: {selectedBooking.customer}</div>
                      <div>PENERIMA: Travello Vibe Corp.</div>
                      <div>NOMINAL: USD {selectedBooking.amount},00</div>
                    </div>
                    <div className="text-[8px] text-white/40 text-center font-sans tracking-wide">
                      - E-Slip Resmi Terverifikasi Sistem Bank -
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-white/50 font-bold px-1 mt-1">
                  <span>Klik gambar untuk zoom</span>
                  <button className="flex items-center gap-1 text-indigo-400 hover:text-white transition-colors cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> Unduh PDF
                  </button>
                </div>
              </div>

            </div>

            {/* CTA action buttons */}
            {selectedBooking.status === "Pending" && (
              <div className="flex justify-end gap-3 mt-8 border-t border-white/5 pt-5">
                <button
                  onClick={() => handleCancelBooking(selectedBooking.id)}
                  className="px-5 py-3.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold rounded-xl cursor-pointer text-xs flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Tolak Transaksi
                </button>
                <button
                  onClick={() => handleConfirmPayment(selectedBooking.id)}
                  className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold rounded-xl cursor-pointer text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/10"
                >
                  <Check className="w-4 h-4" /> Konfirmasi Lunas
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
