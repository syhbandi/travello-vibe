"use client";

import { useRef } from "react";
import { Mail, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Floating animation for the top right paper plane badge
    gsap.to(".paper-plane-badge", {
      y: -10,
      x: 8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Anda berhasil berlangganan berita promo Travello Lombok.");
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 relative overflow-visible bg-white"
    >
      {/* Decorative dots in bottom right */}
      <div className="absolute right-[4%] bottom-[10%] w-24 h-24 opacity-25 grid grid-cols-5 gap-2 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#59B2E6]" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Main Subscribe Card */}
        <div
          ref={cardRef}
          className="relative bg-[#DFD7F9]/20 rounded-[30px] rounded-tl-[120px] px-8 py-16 sm:py-20 md:px-16 flex flex-col items-center justify-center overflow-hidden border border-[#DFD7F9]/30"
        >
          {/* Ornamen spiral melingkar di pojok kiri bawah */}
          <div className="absolute left-[-50px] bottom-[-50px] w-64 h-64 border border-[#DFD7F9] rounded-full opacity-60 pointer-events-none" />
          <div className="absolute left-[-20px] bottom-[-20px] w-48 h-48 border border-[#DFD7F9] rounded-full opacity-60 pointer-events-none" />

          {/* Ornamen spiral melingkar di pojok kanan atas */}
          <div className="absolute right-[-40px] top-[-40px] w-64 h-64 border border-[#DFD7F9] rounded-full opacity-60 pointer-events-none" />
          <div className="absolute right-[-10px] top-[-10px] w-48 h-48 border border-[#DFD7F9] rounded-full opacity-60 pointer-events-none" />

          {/* Flying Paper Plane Badge in Top Right */}
          <div className="paper-plane-badge absolute top-[-24px] right-[-24px] w-14 h-14 rounded-full bg-gradient-to-tr from-[#7B61FF] to-[#9747FF] flex items-center justify-center text-white shadow-lg shadow-[#7B61FF]/45 z-20">
            <Send className="w-5 h-5 fill-none -rotate-12 translate-x-[-1px] translate-y-[1px]" strokeWidth={2.2} />
          </div>

          {/* Content Headline */}
          <h2 className="font-sans text-2xl sm:text-3xl md:text-[36px] md:leading-[54px] font-bold text-text-gray max-w-3xl text-center mb-12 relative z-10">
            Subscribe to get information, latest news and other interesting offers about Travello Lombok
          </h2>

          {/* Email Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 items-stretch relative z-10"
          >
            {/* Input Wrapper */}
            <div className="relative flex-grow">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full pl-14 pr-6 py-4.5 bg-white text-primary-navy font-semibold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-orange/30 shadow-md placeholder-gray-400 border border-gray-100"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="px-8 py-4.5 bg-gradient-to-r from-[#FF7A50] to-accent-orange text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer min-w-[140px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
