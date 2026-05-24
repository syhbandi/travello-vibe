"use client";

import { useRef, useState } from "react";
import { 
  Search, 
  UserCheck, 
  UserMinus, 
  UserCog, 
  Check, 
  AlertCircle,
  X,
  ChevronDown
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Mock user list
const initialUsers = [
  { id: 1, name: "Syhbandi", email: "syhbandi@mail.com", role: "Admin", dateJoined: "12 Apr 2026", status: "Aktif", initials: "SB" },
  { id: 2, name: "Rian Fikri", email: "rian.fikri@mail.com", role: "User", dateJoined: "15 Mei 2026", status: "Aktif", initials: "RF" },
  { id: 3, name: "Laili Safitri", email: "laili.s@mail.com", role: "Editor", dateJoined: "20 Apr 2026", status: "Aktif", initials: "LS" },
  { id: 4, name: "Budi Santoso", email: "budi.santoso@mail.com", role: "User", dateJoined: "02 Mei 2026", status: "Aktif", initials: "BS" },
  { id: 5, name: "Maria Shanti", email: "maria.s@mail.com", role: "User", dateJoined: "28 Apr 2026", status: "Ditangguhkan", initials: "MS" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "warning" } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // GSAP animation triggers for tables
  useGSAP(() => {
    gsap.fromTo(
      ".user-row-animate",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, { dependencies: [searchQuery], scope: containerRef });

  // Show a premium sliding success notification
  const triggerNotification = (message: string, type: "success" | "warning") => {
    setNotification({ message, type });
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

  // Toggle user status between Aktif and Ditangguhkan
  const handleToggleStatus = (userId: number) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const nextStatus = user.status === "Aktif" ? "Ditangguhkan" : "Aktif";
        triggerNotification(`Status ${user.name} berhasil diubah menjadi ${nextStatus}!`, nextStatus === "Aktif" ? "success" : "warning");
        return { ...user, status: nextStatus };
      }
      return user;
    }));
  };

  // Cycle user role between User -> Editor -> Admin
  const handleCycleRole = (userId: number) => {
    const roles: ("User" | "Editor" | "Admin")[] = ["User", "Editor", "Admin"];
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const currentIdx = roles.indexOf(user.role as any);
        const nextIdx = (currentIdx + 1) % roles.length;
        const nextRole = roles[nextIdx];
        triggerNotification(`Role ${user.name} berhasil diubah menjadi ${nextRole}!`, "success");
        return { ...user, role: nextRole };
      }
      return user;
    }));
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10 relative">
      
      {/* Dynamic Floating Notification */}
      {notification && (
        <div 
          ref={notifRef}
          className={`fixed top-24 right-6 sm:right-10 z-50 px-5 py-4 rounded-2xl border backdrop-blur-md flex items-center gap-3 shadow-2xl animate-float max-w-sm text-left ${
            notification.type === "success" 
              ? "bg-[#0d122b]/95 border-emerald-500/30 text-emerald-400" 
              : "bg-[#0d122b]/95 border-amber-500/30 text-amber-400"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="text-xs font-bold text-white">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Overview/Title Banner */}
      <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center justify-between">
        <div className="text-left">
          <h2 className="font-serif text-2xl font-bold text-white">Manajemen Pengguna</h2>
          <p className="text-white/50 text-xs font-medium mt-1">
            Kelola peran akses anggota, tinjau riwayat join, serta nonaktifkan akun pengguna bermasalah.
          </p>
        </div>

        {/* Search box widget */}
        <div className="relative w-full sm:w-[280px]">
          <input
            type="text"
            placeholder="Cari nama, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 outline-none rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-white focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 focus:bg-white/10 placeholder-white/30 transition-all duration-300"
          />
          <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Users table card */}
      <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-[10px] font-black tracking-widest uppercase">
                <th className="px-6 py-5">Pengguna</th>
                <th className="px-6 py-5">Role / Peran</th>
                <th className="px-6 py-5">Tanggal Join</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="user-row-animate hover:bg-white/[0.02] transition-colors">
                    {/* User profile details column */}
                    <td className="px-6 py-4 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-inner shrink-0 text-xs border border-white/20 select-none">
                        {user.initials}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-white leading-snug">{user.name}</span>
                        <span className="text-[10px] text-white/50 font-medium leading-normal">{user.email}</span>
                      </div>
                    </td>

                    {/* Role selector badge */}
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleCycleRole(user.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-[10px] tracking-wide cursor-pointer transition-colors ${
                          user.role === "Admin" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          user.role === "Editor" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" :
                          "bg-slate-500/10 text-slate-300 border border-slate-500/20"
                        }`}
                      >
                        <UserCog className="w-3.5 h-3.5 text-current shrink-0" />
                        <span>{user.role}</span>
                        <ChevronDown className="w-3 h-3 opacity-55 text-current shrink-0" />
                      </button>
                    </td>

                    {/* Date joined */}
                    <td className="px-6 py-4 font-semibold text-white/70">
                      {user.dateJoined}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        user.status === "Aktif" 
                          ? "bg-emerald-500/15 text-emerald-400" 
                          : "bg-red-500/15 text-red-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Aktif" ? "bg-emerald-400" : "bg-red-400"}`} />
                        {user.status}
                      </span>
                    </td>

                    {/* Action buttons (Activate / Block) */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`inline-flex items-center justify-center p-2 rounded-xl border transition-colors cursor-pointer ${
                          user.status === "Aktif"
                            ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                        title={user.status === "Aktif" ? "Tangguhkan Pengguna" : "Aktifkan Pengguna"}
                      >
                        {user.status === "Aktif" ? (
                          <UserMinus className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40 font-bold">
                    Pengguna tidak ditemukan. Coba pencarian lain.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
