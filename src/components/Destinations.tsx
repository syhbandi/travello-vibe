"use client";

import { useRef } from "react";
import Image from "next/image";
import { Navigation } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Gili Trawangan, Lombok",
    price: "$250",
    duration: "5 Days Trip",
    imgUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mount Rinjani, Lombok",
    price: "$300",
    duration: "4 Days Trek",
    imgUrl: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mandalika Beach, Lombok",
    price: "$200",
    duration: "3 Days Trip",
    imgUrl: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stagger reveal for destination cards
    gsap.fromTo(
      ".dest-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="destinations"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Decorative Spiral in background bottom right */}
      <div className="absolute right-[-3%] bottom-[10%] w-[120px] h-[250px] pointer-events-none opacity-40 select-none">
        <Image
          src="/spiral.png"
          alt="Spiral Decor"
          fill
          sizes="120px"
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 flex flex-col items-center">
          <span className="text-text-gray uppercase font-bold tracking-widest text-xs sm:text-sm mb-3">
            Top Selling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy tracking-tight">
            Top Destinations
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-10 items-stretch"
        >
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="dest-card group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative h-[340px] w-full overflow-hidden">
                <Image
                  src={dest.imgUrl}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow bg-white border border-gray-100 rounded-b-3xl">
                {/* Location & Price */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-primary-navy group-hover:text-accent-orange transition-colors">
                    {dest.name}
                  </h3>
                  <span className="font-sans text-base sm:text-lg font-bold text-text-gray">
                    {dest.price}
                  </span>
                </div>

                {/* Duration & Navigation Icon */}
                <div className="flex items-center gap-3 text-text-gray text-sm font-semibold mt-auto">
                  <Navigation className="w-4 h-4 fill-primary-navy stroke-primary-navy -rotate-45" />
                  <span>{dest.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
