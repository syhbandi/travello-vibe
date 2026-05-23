"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        imageWrapperRef.current,
        { opacity: 0, scale: 0.9, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "back.out(1.2)" },
        "-=1"
      );

    // Dynamic floating & swaying animations for the commercial planes
    gsap.to(".plane-1", {
      y: -25,
      x: 18,
      rotation: 6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".plane-2", {
      y: 20,
      x: -15,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });

    gsap.to(".bg-blob-orange", {
      scale: 1.1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-light-bg/40 via-white to-transparent"
    >
      {/* Decorative Blob in Background Top Right */}
      <div className="absolute top-0 right-0 w-[48%] h-full -z-10 pointer-events-none">
        <Image
          src="/hero-blob.png"
          alt="Hero Blob BG"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top-right select-none"
          priority
        />
      </div>
      
      {/* Dynamic Animated Orange Blob behind the traveler */}
      <div className="bg-blob-orange absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-[#FFF2DE] rounded-full blur-[80px] -z-20 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Copywriting */}
        <div className="flex flex-col text-left max-w-xl">
          <span
            ref={subtitleRef}
            className="text-accent-orange uppercase font-bold tracking-wider text-xs md:text-sm mb-4 block"
          >
            Best Destinations around Lombok
          </span>
          <h1
            ref={titleRef}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-navy leading-[1.1] mb-6 relative"
          >
            Travel,{" "}
            <span className="relative inline-block text-primary-navy">
              enjoy
              {/* Decorative Brush Underline */}
              <div className="absolute left-0 bottom-[-10px] w-full h-[12px]">
                <Image
                  src="/decore-underline.png"
                  alt="Decore Underline"
                  fill
                  sizes="200px"
                  className="object-contain object-left select-none"
                />
              </div>
            </span>{" "}
            and live a new and full life
          </h1>
          <p
            ref={descRef}
            className="text-text-gray text-base md:text-lg leading-relaxed mb-8 font-medium"
          >
            Savor the raw, untouched beauty of Lombok. From the crystal waters of Gili Islands to the majestic peaks of Mount Rinjani, we provide curated tours to make your vacation unforgettable.
          </p>

          <div ref={ctaRef} className="flex items-center gap-6 sm:gap-8">
            <Link
              href="#destinations"
              className="px-6 py-4 bg-accent-yellow hover:bg-accent-yellow/90 text-white font-semibold rounded-xl shadow-lg shadow-accent-yellow/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base text-center min-w-[140px]"
            >
              Find out more
            </Link>
            <button className="flex items-center gap-4 group cursor-pointer focus:outline-none">
              <span className="w-12 h-12 rounded-full bg-accent-orange/95 hover:bg-accent-orange flex items-center justify-center text-white shadow-lg shadow-accent-orange/30 group-hover:scale-105 transition-all duration-300">
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              </span>
              <span className="text-text-gray font-semibold group-hover:text-primary-navy transition-colors text-sm sm:text-base">
                Play Demo
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visuals */}
        <div
          ref={imageWrapperRef}
          className="relative flex justify-center items-center lg:h-[650px] w-full mt-8 lg:mt-0"
        >
          {/* Main Visual Image - Transparent PNG overlaying directly without circle */}
          <div className="hero-traveler-image relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[540px] lg:h-[540px] overflow-visible z-10 select-none pointer-events-none">
            <Image
              src="/hero-image-v2.png"
              alt="Travello Lombok Traveler"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain"
            />
          </div>

          {/* Floating Commercial Airplane 1 (Left, flying up-right) */}
          <div className="plane-1 absolute top-[15%] left-[-5%] w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none select-none">
            <Image
              src="/plane-model.png"
              alt="Flying Airplane Left"
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>

          {/* Floating Commercial Airplane 2 (Right, flying up-left, mirrored) */}
          <div className="plane-2 absolute bottom-[22%] right-[-10%] w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none select-none scale-x-[-1]">
            <Image
              src="/plane-model.png"
              alt="Flying Airplane Right"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>

          {/* Decorative Plus Grid pattern floating behind */}
          <div className="absolute right-[2%] top-[10%] w-[120px] h-[120px] opacity-60 pointer-events-none z-0">
            <Image
              src="/plus-grid.png"
              alt="Plus Grid Decor"
              fill
              sizes="120px"
              className="object-contain select-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
