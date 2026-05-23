"use client";

import { useRef } from "react";
import Image from "next/image";
import { Calendar, Star, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    title: "Gili Islands Luxury Snorkeling & Hopping",
    price: "$180",
    duration: "3 Days 2 Nights",
    rating: "4.9",
    reviews: "240 reviews",
    badge: "BEST SELLER",
    badgeColor: "bg-emerald-500 text-white",
    imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
    features: ["Private Speedboat Transfer", "Premium Snorkeling Gear", "Beachfront Resort Stay", "Sunset Sasak Seafood Dinner"],
  },
  {
    title: "Mount Rinjani Crater Summit Trekking",
    price: "$350",
    duration: "4 Days 3 Nights",
    rating: "4.8",
    reviews: "185 reviews",
    badge: "ADVENTURE",
    badgeColor: "bg-accent-orange text-white",
    imgUrl: "https://images.unsplash.com/photo-1626082896492-766af4fc6595?q=80&w=600&auto=format&fit=crop",
    features: ["Certified Mountain Guides", "All Inclusive Camping Gear", "Sembalun & Senaru Routes", "Hot Springs Relaxation"],
  },
  {
    title: "Sasak Cultural Heritage & South Coast Tour",
    price: "$120",
    duration: "2 Days 1 Night",
    rating: "4.7",
    reviews: "95 reviews",
    badge: "CULTURAL",
    badgeColor: "bg-blue-600 text-white",
    imgUrl: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?q=80&w=600&auto=format&fit=crop",
    features: ["Sade Sasak Village Entry", "Traditional Weaving Class", "Mandalika Surf Session", "Private Comfort AC Car"],
  },
];

export default function Packages() {
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

    // Stagger reveal for package cards
    gsap.fromTo(
      ".package-card",
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
      id="packages"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gray-50/50"
    >
      {/* Background decoration - soft blue blob top left */}
      <div className="absolute left-[-10%] top-[10%] w-[350px] h-[350px] bg-sky-200/20 rounded-full blur-[60px] pointer-events-none" />

      {/* Decorative Spiral in background bottom left */}
      <div className="absolute left-[-2%] bottom-[5%] w-[120px] h-[250px] pointer-events-none opacity-30 rotate-180 select-none">
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
            Trending Packages
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy tracking-tight">
            Our Best Travel Packages
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="grid lg:grid-cols-3 gap-10 items-stretch"
        >
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="package-card group bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-gray-100/50"
            >
              {/* Image Frame */}
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src={pkg.imgUrl}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                <span className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-2xs font-extrabold tracking-wider ${pkg.badgeColor} shadow-md uppercase`}>
                  {pkg.badge}
                </span>

                {/* Duration */}
                <span className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm text-primary-navy font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                  {pkg.duration}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
                {/* Title & Rating */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-primary-navy group-hover:text-accent-orange transition-colors duration-300 leading-tight">
                    {pkg.title}
                  </h3>
                </div>

                {/* Rating & Reviews row */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent-yellow stroke-accent-yellow" />
                    ))}
                  </div>
                  <span className="text-primary-navy font-bold text-xs">{pkg.rating}</span>
                  <span className="text-text-gray font-semibold text-2xs">({pkg.reviews})</span>
                </div>

                {/* Highlighted Features list */}
                <div className="flex flex-col gap-3 mb-8 text-left">
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <div className="p-0.5 bg-orange-50 rounded-full text-accent-orange shrink-0 mt-0.5">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-text-gray font-medium text-xs leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer / CTA row */}
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-50">
                  <div className="flex flex-col text-left">
                    <span className="text-2xs font-semibold text-text-gray uppercase tracking-wider mb-0.5">Price Starts From</span>
                    <span className="font-sans text-xl sm:text-2xl font-black text-accent-orange">
                      {pkg.price} <span className="text-2xs font-bold text-text-gray">/ pax</span>
                    </span>
                  </div>
                  
                  <button className="px-5 py-3 bg-primary-navy text-white text-xs font-bold rounded-2xl hover:bg-accent-orange shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 group/btn cursor-pointer">
                    Book Tour
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
