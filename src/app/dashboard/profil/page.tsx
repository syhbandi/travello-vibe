"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  Check, 
  Camera, 
  Award,
  Sparkles
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProfilPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Syhbandi",
    email: "syhbandi@explorer.com",
    phone: "+62 812-3456-7890",
    nationality: "Indonesia",
    bio: "Pencinta alam sejati dan petualang pantai tropis. Memiliki target menaklukkan 7 puncak tertinggi Indonesia, dimulai dari indahnya Gunung Rinjani di Lombok!",
  });

  useGSAP(() => {
    // Entrances
    gsap.fromTo(
      ".profile-col-animate",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".form-col-animate",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 pb-10">
      
      {/* Page Header Intro */}
      <div className="flex flex-col items-start text-left max-w-xl">
        <span className="text-accent-orange uppercase font-extrabold tracking-widest text-3xs mb-2">
          Manajemen Akun
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight">
          Profil Explorer Anda
        </h2>
        <p className="text-text-gray text-xs sm:text-sm mt-2 font-medium">
          Perbarui informasi pribadi Anda, kelola preferensi explorer, dan bagikan bio petualangan Anda.
        </p>
      </div>

      {/* Profile Main Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Avatar & Loyalty card */}
        <div className="profile-col-animate lg:col-span-4 bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm flex flex-col items-center text-center justify-between relative overflow-hidden">
          {/* Accent light yellow background circle in card */}
          <div className="absolute right-[-10%] top-[-5%] w-[180px] h-[180px] bg-yellow-50 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Top Info */}
          <div className="flex flex-col items-center w-full">
            
            {/* Avatar Frame */}
            <div className="relative group mb-6 select-none cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-tr from-accent-orange via-accent-orange to-accent-yellow flex items-center justify-center font-serif text-3xl font-black text-white shadow-lg border-4 border-white group-hover:shadow-xl transition-all duration-300">
                SB
              </div>
              <div className="absolute inset-0 bg-[#181E4B]/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            {/* Name */}
            <h3 className="font-serif text-xl font-bold text-primary-navy mb-1.5 flex items-center gap-1.5 justify-center">
              {profileData.fullName}
              <Sparkles className="w-4 h-4 text-accent-yellow animate-float" />
            </h3>
            
            {/* Tier Badge */}
            <span className="text-5xs font-black px-3.5 py-1 bg-yellow-50 text-accent-yellow border border-amber-200/50 rounded-xl uppercase flex items-center gap-1.5 shadow-sm mb-6">
              <Award className="w-3.5 h-3.5 fill-accent-yellow stroke-accent-yellow" />
              Gold Level Explorer
            </span>

            <p className="text-text-gray text-xs font-semibold leading-relaxed border-t border-gray-50 pt-5 w-full">
              &ldquo;{profileData.bio}&rdquo;
            </p>

          </div>

          {/* Stats boxes */}
          <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t border-gray-50 pt-6">
            <div className="bg-gray-50/50 border border-gray-100 p-3.5 rounded-2xl flex flex-col">
              <span className="text-5xs font-bold text-text-gray tracking-wider uppercase mb-1">Trips Aktif</span>
              <span className="text-base font-black text-primary-navy">3 Paket</span>
            </div>
            <div className="bg-gray-50/50 border border-gray-100 p-3.5 rounded-2xl flex flex-col">
              <span className="text-5xs font-bold text-text-gray tracking-wider uppercase mb-1">XP Points</span>
              <span className="text-base font-black text-accent-orange">1,250 XP</span>
            </div>
          </div>

        </div>

        {/* Right Column: Information form fields */}
        <div className="form-col-animate lg:col-span-8 bg-white rounded-[32px] border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            
            <div className="border-b border-gray-50 pb-3.5 text-left">
              <h3 className="font-serif text-base font-bold text-primary-navy">Pengaturan Detail Pribadi</h3>
            </div>

            {/* Input grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-primary-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-text-gray" /> Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap"
                  className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3 text-xs font-semibold text-primary-navy transition-all duration-300"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-primary-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-text-gray" /> Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3 text-xs font-semibold text-primary-navy transition-all duration-300"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-primary-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-text-gray" /> Nomor Telepon
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+62 812-xxxx-xxxx"
                  className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3 text-xs font-semibold text-primary-navy transition-all duration-300"
                />
              </div>

              {/* Nationality */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-primary-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-text-gray" /> Kebangsaan
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={profileData.nationality}
                  onChange={handleChange}
                  required
                  placeholder="Kebangsaan"
                  className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3 text-xs font-semibold text-primary-navy transition-all duration-300"
                />
              </div>

            </div>

            {/* Bio field */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-primary-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-text-gray" /> Bio Singkat Petualang
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Bagikan sepatah kata mengenai target petualangan Anda..."
                className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3 text-xs font-semibold text-primary-navy transition-all duration-300 resize-none leading-relaxed"
              />
            </div>

            {/* Save Buttons & States */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-6 border-t border-gray-50">
              
              <div className="text-left w-full sm:w-auto">
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse">
                    <Check className="w-4.5 h-4.5" strokeWidth={3} /> Profil berhasil disimpan!
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#181E4B] hover:bg-accent-orange text-white text-xs font-bold rounded-2xl shadow-md disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
