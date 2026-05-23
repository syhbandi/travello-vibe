"use client";

import { useRef } from "react";
import Image from "next/image";
import { CloudSun, Plane, Music, Settings } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: CloudSun,
    iconColor: "text-blue-400 bg-blue-50",
    title: "Calculated Weather",
    desc: "Get the most accurate weather updates to plan your Lombok excursions without interruptions.",
  },
  {
    icon: Plane,
    iconColor: "text-accent-orange bg-orange-50",
    title: "Best Flights",
    desc: "Find and book flights to Lombok's new international airport at the lowest rates available.",
    highlighted: true, // Special visual element in the referential design
  },
  {
    icon: Music,
    iconColor: "text-red-400 bg-red-50",
    title: "Local Events",
    desc: "Experience rich Sasak culture, music festivals, and international racing events at Mandalika.",
  },
  {
    icon: Settings,
    iconColor: "text-yellow-500 bg-yellow-50",
    title: "Customization",
    desc: "Tailor your itinerary to your own tastes for a perfectly unique and personalized trip.",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Staggered reveal for cards
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Fade-in for header
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
  }, { scope: containerRef });

  return (
    <section
      id="hotels"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Decorative Plus Grid pattern */}
      <div className="absolute right-4 top-12 w-28 h-28 opacity-30 pointer-events-none">
        <Image
          src="/plus-grid.png"
          alt="Plus Grid Decor"
          fill
          sizes="112px"
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 flex flex-col items-center">
          <span className="text-text-gray uppercase font-bold tracking-widest text-xs sm:text-sm mb-3">
            Category
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy tracking-tight">
            We Offer Best Services
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 items-stretch"
        >
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className="service-card group relative p-8 bg-white rounded-[36px] transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/80 hover:-translate-y-2 flex flex-col items-center text-center select-none"
              >
                {/* Icon Wrapper */}
                <div className={`p-5 rounded-2xl mb-6 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg font-bold text-primary-navy mb-4 group-hover:text-accent-orange transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-gray font-medium text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
