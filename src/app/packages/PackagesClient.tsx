"use client";

import { useRef } from "react";
import Image from "next/image";
import { Calendar, Star, Check, ArrowRight, Home, Utensils, Car, Compass } from "lucide-react";
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
    facilities: [
      { icon: Home, label: "Resort" },
      { icon: Utensils, label: "Dinner" },
      { icon: Car, label: "Transfer" },
      { icon: Compass, label: "Guide" },
    ],
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
    facilities: [
      { icon: Home, label: "Camp" },
      { icon: Utensils, label: "All Meals" },
      { icon: Car, label: "Pickup" },
      { icon: Compass, label: "Porters" },
    ],
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
    facilities: [
      { icon: Home, label: "Hotel" },
      { icon: Utensils, label: "Breakfast" },
      { icon: Car, label: "AC Car" },
      { icon: Compass, label: "Guide" },
    ],
  },
  {
    title: "Lombok Ultimate Honeymoon & Spa Getaway",
    price: "$450",
    duration: "4 Days 3 Nights",
    rating: "5.0",
    reviews: "64 reviews",
    badge: "HONEYMOON",
    badgeColor: "bg-pink-500 text-white",
    imgUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop",
    features: ["Private Pool Luxury Villa", "Sunset Yacht Cruise", "Couples Massage & Spa", "Candlelight Seafood Dinner"],
    facilities: [
      { icon: Home, label: "Pool Villa" },
      { icon: Utensils, label: "Catering" },
      { icon: Car, label: "VIP Car" },
      { icon: Compass, label: "Host" },
    ],
  },
  {
    title: "Secret Gilis (Nanggu & Kedis) Island Escape",
    price: "$95",
    duration: "1 Day Tour",
    rating: "4.9",
    reviews: "112 reviews",
    badge: "POPULAR",
    badgeColor: "bg-violet-600 text-white",
    imgUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop",
    features: ["Private Outrigger Boat", "Uninhabited Island Hop", "Brilliant Reef Snorkeling", "Fresh Grilled Seafood Lunch"],
    facilities: [
      { icon: Home, label: "Day Trip" },
      { icon: Utensils, label: "Lunch" },
      { icon: Car, label: "Boat" },
      { icon: Compass, label: "Guide" },
    ],
  },
  {
    title: "Rinjani Short Trek to Senaru Crater Rim",
    price: "$210",
    duration: "2 Days 1 Night",
    rating: "4.7",
    reviews: "78 reviews",
    badge: "TREKKING",
    badgeColor: "bg-amber-600 text-white",
    imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    features: ["Senaru Crater Rim Camp", "Stunning Sunrise Views", "Senaru Waterfall Visit", "Professional Mountain Guide"],
    facilities: [
      { icon: Home, label: "Camp" },
      { icon: Utensils, label: "Meals" },
      { icon: Car, label: "Pickup" },
      { icon: Compass, label: "Porters" },
    ],
  },
];

export default function PackagesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance
    gsap.fromTo(
      ".pkg-hero-title",
      { opacity: 0, y: -45 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".pkg-hero-desc",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1, delay: 0.25, ease: "power3.out" }
    );

    // Scroll trigger entrance
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

    gsap.fromTo(
      ".pkg-card-item",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
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
    <div ref={containerRef} className="w-full bg-white flex flex-col min-h-screen">
      {/* 1. Hero Section Banner */}
      <section className="relative min-h-[72vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
          alt="Lombok Island Beach Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* Deeper, Richer, and more dramatic Dark-to-White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#102a43]/95 via-primary-navy/75 via-primary-navy/35 to-white" />
        
        {/* Plus pattern grid behind */}
        <div className="absolute right-[5%] top-[15%] w-[90px] h-[90px] opacity-15 pointer-events-none select-none">
          <Image
            src="/plus-grid.png"
            alt="Decor Grid"
            fill
            sizes="90px"
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-36 md:pt-48 pb-16 flex flex-col items-center">
          <span className="text-accent-orange uppercase font-black tracking-widest text-xs sm:text-sm mb-3">
            Premium Adventures
          </span>
          
          <h1 className="pkg-hero-title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4 relative">
            Our Premium Tour Packages
            <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-28 h-[4px] bg-accent-yellow rounded-full" />
          </h1>
          
          <p className="pkg-hero-desc text-white/90 text-sm sm:text-base md:text-lg max-w-2xl font-medium mt-6">
            Handpicked experiences designed to show you Lombok at its absolute best. All packages are fully inclusive with premium accommodation, expert guides, and private transport.
          </p>
        </div>
      </section>

      {/* 2. Packages Listing Grid */}
      <section className="py-16 md:py-24 bg-gray-50/30 relative overflow-hidden">
        {/* Blue/Cyan soft glow background top left */}
        <div className="absolute left-[-5%] top-[10%] w-[380px] h-[380px] bg-sky-200/20 rounded-full blur-[70px] pointer-events-none" />

        {/* Decorative Spiral in background bottom left */}
        <div className="absolute left-[-2%] bottom-[5%] w-[130px] h-[260px] pointer-events-none opacity-20 rotate-180 select-none">
          <Image
            src="/spiral.png"
            alt="Spiral Decor"
            fill
            sizes="130px"
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-16 flex flex-col items-center">
            <span className="text-text-gray uppercase font-extrabold tracking-widest text-2xs mb-3">
              Trending Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-navy tracking-tight">
              Best Lombok Holiday Deals
            </h2>
            <p className="text-text-gray text-xs sm:text-sm max-w-lg mt-3 font-medium">
              Choose your style of vacation, from adrenaline-fueled mountain treks to lazy beaches and historical cultural safaris.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch"
          >
            {packages.map((pkg, idx) => {
              return (
                <div
                  key={idx}
                  className="pkg-card-item group bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-gray-100/50"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badge */}
                    <span className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-3xs font-black tracking-wider ${pkg.badgeColor} shadow-md uppercase`}>
                      {pkg.badge}
                    </span>

                    {/* Duration Label */}
                    <span className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm text-primary-navy font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
                    {/* Title */}
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-primary-navy group-hover:text-accent-orange transition-colors duration-300 leading-snug mb-4 text-left">
                      {pkg.title}
                    </h3>

                    {/* Rating & Reviews row */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-accent-yellow stroke-accent-yellow" />
                        ))}
                      </div>
                      <span className="text-primary-navy font-bold text-xs">{pkg.rating}</span>
                      <span className="text-text-gray font-semibold text-3xs">({pkg.reviews})</span>
                    </div>

                    {/* Facilities Grid Icons */}
                    <div className="grid grid-cols-4 gap-2 py-3 px-4 bg-gray-50 rounded-2xl mb-6 text-center border border-gray-100">
                      {pkg.facilities.map((fac, fIdx) => {
                        const Icon = fac.icon;
                        return (
                          <div key={fIdx} className="flex flex-col items-center gap-1">
                            <Icon className="w-4 h-4 text-primary-navy/80" />
                            <span className="text-gray-400 font-bold text-4xs uppercase tracking-wider">{fac.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Highlighted Features list */}
                    <div className="flex flex-col gap-3 mb-8 text-left">
                      {pkg.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <div className="p-0.5 bg-orange-50 rounded-full text-accent-orange shrink-0 mt-0.5">
                            <Check className="w-3 h-3 animate-pulse" strokeWidth={3} />
                          </div>
                          <span className="text-text-gray font-medium text-xs leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer / CTA row */}
                    <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
                      <div className="flex flex-col text-left">
                        <span className="text-4xs font-bold text-text-gray uppercase tracking-wider mb-0.5">Price Starts From</span>
                        <span className="font-sans text-xl sm:text-2xl font-black text-accent-orange leading-none">
                          {pkg.price} <span className="text-3xs font-bold text-text-gray">/ pax</span>
                        </span>
                      </div>
                      
                      <button className="px-5 py-3 bg-primary-navy text-white text-xs font-bold rounded-2xl hover:bg-accent-orange shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 group/btn cursor-pointer">
                        Book Tour
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
