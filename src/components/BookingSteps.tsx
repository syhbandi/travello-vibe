"use client";

import { useRef } from "react";
import Image from "next/image";
import { MapPin, Heart, Leaf, Map, Send, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Compass,
    color: "bg-[#F0BB1F]",
    title: "Choose Destination",
    desc: "Select your dream destination in Lombok—whether it's the peaceful beaches or Mount Rinjani's caldera.",
  },
  {
    icon: Leaf,
    color: "bg-[#DF6951]",
    title: "Make Payment",
    desc: "Complete your booking through our highly secure and flexible local & international gateways.",
  },
  {
    icon: Send,
    color: "bg-[#08606E]",
    title: "Reach Airport on Selected Date",
    desc: "Fly straight to Lombok International Airport where our local Sasak guides will be waiting to welcome you.",
  },
];

export default function BookingSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left column staggered entrance
    gsap.fromTo(
      ".step-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Right column cards wrapper entrance
    gsap.fromTo(
      ".main-trip-card-wrapper",
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Entrance for floating progress card wrapper
    gsap.fromTo(
      ".floating-progress-card-wrapper",
      { opacity: 0, scale: 0.8, x: 40, y: 30 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Continuous slow & steady floating animation for the main trip card
    gsap.to(".main-trip-card", {
      y: 6,
      x: 2,
      rotation: -0.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Continuous gentle floating and swaying for the ongoing progress card
    gsap.to(".floating-progress-card", {
      y: -10,
      x: -4,
      rotation: 1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <section
      id="bookings"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Decorative Blob in background */}
      <div className="absolute right-[-10%] top-[20%] w-[400px] h-[400px] bg-[#59B2E6]/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left Column: Instructions */}
        <div ref={leftColRef} className="flex flex-col text-left">
          <span className="text-text-gray uppercase font-bold tracking-widest text-xs sm:text-sm mb-3">
            Easy and Fast
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy tracking-tight mb-12 max-w-lg leading-tight">
            Book Your Next Trip In 3 Easy Steps
          </h2>

          <div className="flex flex-col gap-8">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="step-item flex gap-6 items-start">
                  <div className={`p-4 rounded-xl text-white ${step.color} shadow-lg shrink-0`}>
                    <IconComponent className="w-5 h-5 fill-none" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-primary-navy mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-text-gray font-medium text-sm leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Mockup */}
        <div
          ref={rightColRef}
          className="relative flex justify-center items-center h-[550px] w-full"
        >
          {/* Main Visual "Trip To Lombok" Card Wrapper */}
          <div className="main-trip-card-wrapper z-10">
            {/* Main Visual "Trip To Lombok" Card */}
            <div className="main-trip-card relative w-[320px] sm:w-[370px] bg-white rounded-3xl p-6 shadow-2xl shadow-gray-200 border border-gray-100 flex flex-col select-none">
              {/* Card Thumbnail */}
              <div className="relative h-[200px] w-full rounded-2xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600&auto=format&fit=crop"
                  alt="Trip to Lombok"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              {/* Content Details */}
              <h3 className="font-sans text-lg font-bold text-primary-navy mb-2">
                Trip To Lombok
              </h3>
              <span className="text-text-gray font-semibold text-sm mb-5">
                14-29 June | by Sasak Tour
              </span>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-gray-50 rounded-full text-text-gray hover:bg-accent-orange/10 hover:text-accent-orange transition-colors cursor-pointer">
                  <Leaf className="w-4 h-4 fill-none" />
                </span>
                <span className="p-3 bg-gray-50 rounded-full text-text-gray hover:bg-accent-orange/10 hover:text-accent-orange transition-colors cursor-pointer">
                  <Map className="w-4 h-4 fill-none" />
                </span>
                <span className="p-3 bg-gray-50 rounded-full text-text-gray hover:bg-accent-orange/10 hover:text-accent-orange transition-colors cursor-pointer">
                  <Send className="w-4 h-4 fill-none" />
                </span>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center mt-auto border-t border-gray-50 pt-4">
                <div className="flex items-center gap-2.5 text-text-gray text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>24 people going</span>
                </div>
                <button className="text-text-gray hover:text-red-500 transition-colors focus:outline-none">
                  <Heart className="w-5 h-5 fill-none" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Small Card: "Ongoing progress" Wrapper */}
          <div className="floating-progress-card-wrapper absolute bottom-[10%] right-[5%] sm:right-[10%] z-20">
            {/* Floating Small Card */}
            <div className="floating-progress-card bg-white rounded-2xl p-5 shadow-2xl shadow-gray-300 border border-gray-100 flex gap-4 w-[240px] sm:w-[260px] select-none">
              {/* Round Mini Pic */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=150&auto=format&fit=crop"
                  alt="Rinjani Mini Pic"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              
              {/* Progress Details */}
              <div className="flex flex-col w-full">
                <span className="text-text-gray text-xs font-bold uppercase tracking-wider mb-1">
                  Ongoing
                </span>
                <h4 className="font-sans text-sm font-bold text-primary-navy mb-2">
                  Rinjani Trekking
                </h4>
                <div className="flex flex-col gap-1.5">
                  <span className="text-accent-orange text-xs font-bold">40% completed</span>
                  {/* Custom Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[40%] h-full bg-accent-orange rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
