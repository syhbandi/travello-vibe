"use client";

import { useRef, useState } from "react";
import { 
  DollarSign, 
  Calendar, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  ChevronRight,
  TrendingDown,
  ArrowRight,
  MapPin,
  Clock,
  Compass
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// Mock weekly revenue data for interactive SVG chart
const weeklyData = [
  { day: "Sen", revenue: 4200, label: "$4,200" },
  { day: "Sel", revenue: 5800, label: "$5,800" },
  { day: "Rab", revenue: 4900, label: "$4,900" },
  { day: "Kam", revenue: 7200, label: "$7,200" },
  { day: "Jum", revenue: 6100, label: "$6,100" },
  { day: "Sab", revenue: 8900, label: "$8,900" },
  { day: "Min", revenue: 9500, label: "$9,500" },
];

// Mock activity logs
const activityLogs = [
  { id: 1, action: "Pembayaran terkonfirmasi", user: "Syhbandi", detail: "Mount Rinjani Summit Trekking", time: "10 menit yang lalu", type: "success" },
  { id: 2, action: "Pengguna baru terdaftar", user: "Ahmad Dani", detail: "ahmaddani@mail.com", time: "45 menit yang lalu", type: "info" },
  { id: 3, action: "Paket baru ditambahkan", user: "Admin Chief", detail: "Eksplorasi Pantai Senggigi", time: "2 jam yang lalu", type: "warning" },
  { id: 4, action: "Pemesanan dibatalkan", user: "Riana Putri", detail: "Gili Trawangan Day Pass", time: "5 jam yang lalu", type: "error" },
];

export default function AdminDashboardClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  useGSAP(() => {
    // Stagger entry animations
    gsap.fromTo(
      ".admin-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  // Math variables for SVG Spline Chart
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = 30;
  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;
  
  const maxRevenue = 10000;
  
  // Convert weekly data points to SVG X, Y coordinates
  const points = weeklyData.map((d, index) => {
    const x = padding + (index * (chartWidth / (weeklyData.length - 1)));
    const y = padding + chartHeight - (d.revenue / maxRevenue) * chartHeight;
    return { x, y, ...d };
  });

  // Construct standard SVG path string for bezier curves (splines)
  let dPath = "";
  if (points.length > 0) {
    dPath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      dPath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
  }

  // Construct closed path for smooth area gradient filling below curve
  const areaPath = points.length > 0 
    ? `${dPath} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`
    : "";

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10">
      {/* 1. Header Welcome Bar */}
      <div className="admin-card bg-[#0d122b] rounded-[32px] p-8 md:p-10 border border-white/5 shadow-xl relative overflow-hidden text-left select-none flex justify-between items-center">
        {/* Soft background glow circles */}
        <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-[30%] bottom-[-50%] w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-xl">
          <span className="text-accent-yellow font-black tracking-widest text-[9px] uppercase">
            Platform Command Center
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mt-1">
            Selamat Datang, Admin Chief! 🛠️
          </h2>
          <p className="text-white/60 font-medium text-xs leading-relaxed mt-2">
            Travello berjalan dengan optimal hari ini. Semua visualisasi data, verifikasi transaksi pembayaran, dan manajemen pengguna terintegrasi penuh.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0 bg-white/5 border border-white/10 glass-dark px-5 py-4 rounded-2xl relative z-10">
          <Activity className="w-8 h-8 text-emerald-400 shrink-0 animate-pulse" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black text-white/50 tracking-wider uppercase">System Status</span>
            <span className="text-xs font-bold text-emerald-400">100% ONLINE</span>
          </div>
        </div>
      </div>

      {/* 2. Top-Level Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Revenue */}
        <div className="admin-card bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-4 hover:border-indigo-500/30 transition-all select-none">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase mb-0.5">Total Pendapatan</span>
            <span className="text-xl font-black text-white">$45,280.00</span>
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% bln ini
            </span>
          </div>
        </div>

        {/* Metric 2: Bookings */}
        <div className="admin-card bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-4 hover:border-indigo-500/30 transition-all select-none">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/20">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase mb-0.5">Pemesanan</span>
            <span className="text-xl font-black text-white">42 Aktif</span>
            <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-0.5 mt-1">
              <Compass className="w-3.5 h-3.5" /> 188 Total Selesai
            </span>
          </div>
        </div>

        {/* Metric 3: Users */}
        <div className="admin-card bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-4 hover:border-indigo-500/30 transition-all select-none">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase mb-0.5">Total Pengguna</span>
            <span className="text-xl font-black text-white">1,248 User</span>
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8% Minggu Ini
            </span>
          </div>
        </div>

        {/* Metric 4: Platform Conversion */}
        <div className="admin-card bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-4 hover:border-indigo-500/30 transition-all select-none">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase mb-0.5">Tingkat Konversi</span>
            <span className="text-xl font-black text-white">3.8%</span>
            <span className="text-[10px] font-bold text-white/40 flex items-center gap-0.5 mt-1">
              Stabil dari kemarin
            </span>
          </div>
        </div>
      </div>

      {/* 3. Spline Analytics Graph & Popular Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Revenue spline chart */}
        <div className="admin-card lg:col-span-2 bg-[#0d122b]/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 text-left">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-accent-yellow tracking-widest uppercase mb-0.5">Ringkasan Finansial</span>
              <h3 className="font-serif text-lg font-bold text-white">Pendapatan Mingguan</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Minggu Ini</span>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative flex-1 w-full h-[220px] flex items-center justify-center">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-full select-none"
            >
              <defs>
                {/* Visual Glow Gradient for Line */}
                <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid guide lines */}
              {[0, 25, 50, 75, 100].map((percent, idx) => {
                const y = padding + (chartHeight * (100 - percent)) / 100;
                return (
                  <line 
                    key={idx} 
                    x1={padding} 
                    y1={y} 
                    x2={svgWidth - padding} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="1"
                    strokeDasharray="4 4" 
                  />
                );
              })}

              {/* Area under curve fill */}
              {areaPath && (
                <path d={areaPath} fill="url(#lineGlow)" />
              )}

              {/* Weekly curve stroke spline path */}
              {dPath && (
                <path 
                  d={dPath} 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              )}

              {/* Hover indicator lines and circles */}
              {points.map((p, idx) => (
                <g key={idx}>
                  {/* Vertical dotted guide line on hover */}
                  {hoveredDot === idx && (
                    <line 
                      x1={p.x} 
                      y1={padding} 
                      x2={p.x} 
                      y2={svgHeight - padding} 
                      stroke="rgba(99,102,241,0.3)" 
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Outer pulsating dot indicator */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r={hoveredDot === idx ? "7" : "4"} 
                    fill={hoveredDot === idx ? "#f1a501" : "#6366f1"}
                    stroke="#0d122b"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredDot(idx)}
                    onMouseLeave={() => setHoveredDot(null)}
                  />
                </g>
              ))}

              {/* Weekly bottom Labels */}
              {points.map((p, idx) => (
                <text 
                  key={idx} 
                  x={p.x} 
                  y={svgHeight - 10} 
                  fill="rgba(255,255,255,0.4)" 
                  fontSize="10" 
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {p.day}
                </text>
              ))}
            </svg>

            {/* Premium Absolute HTML Tooltip overlay */}
            {hoveredDot !== null && (
              <div 
                className="absolute bg-[#181E4B] border border-white/20 px-3 py-2 rounded-xl text-3xs font-extrabold shadow-2xl pointer-events-none flex flex-col items-center gap-0.5 animate-float"
                style={{ 
                  left: `${((points[hoveredDot].x - padding) / chartWidth) * 85 + 5}%`, 
                  top: `${((points[hoveredDot].y - padding) / chartHeight) * 55 + 5}%` 
                }}
              >
                <span className="text-white/50 uppercase tracking-widest">Pendapatan</span>
                <span className="text-accent-yellow text-xs font-black">{points[hoveredDot].label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Popular Packages Progress bars */}
        <div className="admin-card bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
          <div className="border-b border-white/5 pb-4 mb-5 text-left">
            <h3 className="font-serif text-lg font-bold text-white">Paket Terpopuler</h3>
          </div>

          <div className="flex flex-col gap-6 flex-grow justify-center text-left">
            {/* Package 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" /> Gili Trawangan
                </span>
                <span className="text-accent-yellow">78 Pesanan</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-full w-[85%]"></div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" /> Mount Rinjani Trek
                </span>
                <span className="text-accent-yellow">64 Pesanan</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-full w-[72%]"></div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" /> Sade Village
                </span>
                <span className="text-accent-yellow">45 Pesanan</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-full w-[54%]"></div>
              </div>
            </div>

            {/* Package 4 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" /> Pink Beach Lombok
                </span>
                <span className="text-accent-yellow">38 Pesanan</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-full w-[42%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Bottom Grid: Transaction logs and statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Admin Activity Log */}
        <div className="admin-card lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col">
          <div className="border-b border-white/5 pb-4 mb-5 flex items-center justify-between text-left">
            <h3 className="font-serif text-lg font-bold text-white">Log Aktivitas Terbaru</h3>
            <Link 
              href="/admin/bookings" 
              className="text-[10px] font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Lihat Pemesanan <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-left">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                    log.type === "success" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                    log.type === "info" ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" :
                    log.type === "warning" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
                    "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  }`} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{log.action}</span>
                    <span className="text-[10px] font-medium text-white/50">{log.user} &bull; {log.detail}</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-white/40 uppercase whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live system usage details */}
        <div className="admin-card bg-[#0d122b]/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="border-b border-white/5 pb-4 mb-5 text-left">
            <h3 className="font-serif text-lg font-bold text-white">Metrik Server & DB</h3>
          </div>

          <div className="flex flex-col gap-6 text-left flex-grow justify-center">
            {/* Database slots */}
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-xs font-bold text-white/60">Tabel DB Pengguna</span>
              <span className="text-xs font-black text-emerald-400">1,248 Baris</span>
            </div>
            
            {/* API calls count */}
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-xs font-bold text-white/60">Request API / Menit</span>
              <span className="text-xs font-black text-emerald-400">142 Req</span>
            </div>

            {/* Storage status */}
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-xs font-bold text-white/60">Penyimpanan Aset</span>
              <span className="text-xs font-black text-white">4.8 GB / 10 GB</span>
            </div>

            {/* Load average */}
            <div className="flex justify-between items-center py-3">
              <span className="text-xs font-bold text-white/60">Load Average CPU</span>
              <span className="text-xs font-black text-emerald-400">0.24 (Optimal)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
