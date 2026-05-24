"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MapPin, 
  Briefcase, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  ChevronRight
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Destinasi", href: "/dashboard/destinasi", icon: MapPin },
  { label: "Paket", href: "/dashboard/paket", icon: Briefcase },
  { label: "Profil", href: "/dashboard/profil", icon: User },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
  { label: "Logout", href: "/dashboard/logout", icon: LogOut },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant entrance animations
    gsap.fromTo(
      sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );

    // Stagger menu items entry
    gsap.fromTo(
      ".nav-item-animate",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: "power2.out" }
    );
  }, { scope: containerRef });

  // Helper to check active state
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // Get current section label for breadcrumbs
  const currentSection = menuItems.find(item => isActive(item.href))?.label || "Overview";

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/15 flex text-primary-navy">
      {/* 1. Sidebar Panel (Desktop / Persistent) */}
      <aside 
        ref={sidebarRef} 
        className="hidden md:flex flex-col w-[280px] bg-[#181E4B] text-white fixed top-0 bottom-0 left-0 z-30 shadow-2xl overflow-y-auto border-r border-white/5"
      >
        {/* Brand/Logo Area */}
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-orange to-accent-yellow flex items-center justify-center font-bold text-white shadow-lg text-lg select-none">
            T
          </div>
          <span className="font-serif text-2xl font-black tracking-tight bg-gradient-to-r from-white via-white to-accent-yellow bg-clip-text text-transparent">
            Travello
          </span>
        </div>

        {/* User Card */}
        <div className="p-6 mx-4 my-6 rounded-2xl bg-white/5 border border-white/10 glass-dark flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-accent-orange to-accent-yellow flex items-center justify-center font-bold text-white shadow-md border border-white/20 select-none">
            SB
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#181E4B]"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide">Syhbandi</span>
            <span className="text-4xs font-bold text-white/50 tracking-widest uppercase">Premium Explorer</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 flex flex-col gap-1.5">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={idx}
                href={item.href}
                className={`nav-item-animate group flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 relative overflow-hidden select-none cursor-pointer ${
                  active 
                    ? "bg-gradient-to-r from-accent-orange to-accent-orange/90 text-white shadow-lg shadow-accent-orange/20" 
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`} />
                  <span>{item.label}</span>
                </div>
                {active && (
                  <div className="w-1.5 h-6 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-6 text-center text-4xs font-bold text-white/30 tracking-widest border-t border-white/5 uppercase select-none">
          Travello v1.0.0
        </div>
      </aside>

      {/* 2. Mobile Sidebar Overlay Drawer */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#181E4B]/40 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`md:hidden fixed top-0 bottom-0 left-0 w-[280px] bg-[#181E4B] text-white z-50 shadow-3xl flex flex-col transition-transform duration-300 ease-out border-r border-white/5 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header / Close Button */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-orange to-accent-yellow flex items-center justify-center font-bold text-white shadow-lg text-lg select-none">
              T
            </div>
            <span className="font-serif text-2xl font-black bg-gradient-to-r from-white via-white to-accent-yellow bg-clip-text text-transparent">
              Travello
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-white/75"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 mx-4 my-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-accent-orange to-accent-yellow flex items-center justify-center font-bold text-white border border-white/20 select-none">
            SB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Syhbandi</span>
            <span className="text-4xs font-bold text-white/50 tracking-widest uppercase">Premium Explorer</span>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex-1 px-4 flex flex-col gap-1.5">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  active 
                    ? "bg-gradient-to-r from-accent-orange to-accent-orange/90 text-white shadow-lg shadow-accent-orange/20" 
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 3. Main Content Container Panel */}
      <div className="flex-1 flex flex-col md:pl-[280px]">
        {/* Sticky Header */}
        <header 
          ref={headerRef} 
          className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 py-5 px-6 md:px-10 z-20 flex items-center justify-between shadow-sm"
        >
          {/* Breadcrumbs / Page Title */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-xl text-primary-navy hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-gray font-semibold select-none">
              <span>Explorer</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary-navy font-bold">{currentSection}</span>
            </div>
            
            <h1 className="sm:hidden font-serif text-lg font-bold">
              {currentSection}
            </h1>
          </div>

          {/* Right Header Utilities (Search, Notification, Profile) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Input Widget */}
            <div className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="Cari destinasi..."
                className="bg-slate-50 border border-gray-200 outline-none rounded-xl pl-10 pr-4 py-2 w-[180px] focus:w-[240px] focus:ring-4 focus:ring-accent-orange/10 focus:border-accent-orange focus:bg-white text-xs font-semibold placeholder-gray-400 transition-all duration-300"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            </div>

            {/* Notification Bell Icon */}
            <button className="p-2.5 rounded-xl bg-slate-50 border border-gray-100 hover:bg-gray-100 text-primary-navy relative transition-colors shadow-sm cursor-pointer group">
              <Bell className="w-4 h-4 group-hover:animate-swing" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent-orange rounded-full border border-white"></span>
            </button>

            {/* Profile Dropdown Indicator */}
            <div className="flex items-center gap-3.5 border-l border-gray-200 pl-4 sm:pl-6 select-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-orange to-accent-yellow flex items-center justify-center font-bold text-white shadow-md text-xs">
                SB
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-primary-navy leading-none mb-0.5">Syhbandi</span>
                <span className="text-4xs font-bold text-text-gray tracking-wider uppercase">Premium</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic page children rendering */}
        <main 
          ref={contentRef}
          className="flex-1 w-full p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
