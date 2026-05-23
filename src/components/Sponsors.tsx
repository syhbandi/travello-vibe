"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance reveal
    gsap.fromTo(
      ".sponsor-logo",
      { opacity: 0, y: 30 },
      {
        opacity: 0.6, // Default opacity before hover
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center justify-around gap-12 md:gap-8">
          {/* Logo 1: Axon */}
          <div className="sponsor-logo group flex items-center gap-1.5 transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#0D1B2A] group-hover:fill-accent-orange transition-colors" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z"/>
            </svg>
            <span className="font-sans text-xl font-black text-[#0D1B2A] tracking-wider group-hover:text-primary-navy transition-colors">
              AXON
            </span>
          </div>

          {/* Logo 2: Jetstar */}
          <div className="sponsor-logo group flex items-center gap-1 transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer">
            <span className="font-sans text-2xl font-black text-primary-navy tracking-tighter">
              Jet
              <span className="text-[#FF5A00]">star</span>
            </span>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FF5A00]" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>

          {/* Logo 3: Expedia */}
          <div className="sponsor-logo group flex items-center gap-2 transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer">
            {/* Expedia Yellow Circle Plane Icon */}
            <div className="w-6 h-6 rounded-full bg-accent-yellow flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white rotate-45" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <span className="font-sans text-xl font-bold text-primary-navy tracking-tight group-hover:text-accent-yellow transition-colors">
              expedia
            </span>
          </div>

          {/* Logo 4: Qantas */}
          <div className="sponsor-logo group flex items-center gap-2 transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer">
            <span className="font-sans text-xl font-extrabold italic text-primary-navy tracking-tight">
              QANTAS
            </span>
            {/* Qantas Red Tail Wing */}
            <div className="w-7 h-5 bg-[#E11B22] rounded-tr-[16px] rounded-bl-[4px] -skew-x-12 flex items-center justify-center text-[10px] text-white font-bold select-none">
              ✈
            </div>
          </div>

          {/* Logo 5: Alitalia */}
          <div className="sponsor-logo group flex items-center transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer">
            <span className="font-sans text-2xl font-black italic tracking-tighter text-[#006643] group-hover:text-[#006643] transition-colors">
              A
              <span className="text-primary-navy font-semibold text-xl group-hover:text-primary-navy transition-colors">litalia</span>
            </span>
            <span className="text-[#E21836] font-black italic text-2xl ml-0.5 leading-none">A</span>
          </div>
        </div>
      </div>
    </section>
  );
}
