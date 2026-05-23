"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Quote } from "lucide-react";
import gsap from "gsap";

const testimonials = [
  {
    quote: "On our Lombok trip, the white sand beaches of Gili Trawangan and the trek to Rinjani crater lake were beyond words. Our guides were warm, helpful, and very informative. Best travel service ever!",
    name: "Mike Taylor",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Booking via Travello was seamless. The custom itinerary for Mandalika Circuit, Sade traditional Sasak village, and southern Kuta beaches was fantastic. Fully recommended for anyone going to Lombok!",
    name: "Sarah Jenkins",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Kearifan lokal suku Sasak sangat menakjubkan. Menginap di desa adat Sade, belajar menenun kain Songket, dan menjelajahi pantai berpasir merica. Semuanya terencana matang berkat tim Travello.",
    name: "Alif Pratama",
    location: "Jakarta, Indonesia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const dragStartRef = useRef(0);
  const isDraggingRef = useRef(false);

  const nextTestimonial = () => {
    animateCardChange("next", () => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    });
  };

  const prevTestimonial = () => {
    animateCardChange("prev", () => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  };

  const animateCardChange = (direction: "next" | "prev", updateState: () => void) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);

    const total = testimonials.length;
    const topCardEl = containerRef.current?.querySelector(`.testimonial-card-${activeIndex}`);
    const middleCardEl = containerRef.current?.querySelector(`.testimonial-card-${(activeIndex + 1) % total}`);
    const bottomCardEl = containerRef.current?.querySelector(`.testimonial-card-${(activeIndex + 2) % total}`);

    if (!topCardEl || !middleCardEl || !bottomCardEl) {
      updateState();
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        updateState();
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }
    });

    if (direction === "next") {
      // --- NEXT ANIMATION (Swiper-like throw to the right, then loop back under) ---
      // 1. Throw top card to the right
      tl.to(topCardEl, {
        x: 380,
        y: 25,
        rotation: 15,
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        ease: "power2.inOut",
      });

      // 2. Scale up middle card to the top
      tl.to(middleCardEl, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.inOut",
      }, 0);

      // 3. Scale up bottom card to the middle position
      tl.to(bottomCardEl, {
        x: 0,
        y: 16,
        scale: 0.94,
        rotation: 3,
        opacity: 0.9,
        duration: 0.45,
        ease: "power2.inOut",
      }, 0);

      // 4. Send old top card to bottom z-index and slide it back in from behind
      tl.set(topCardEl, { zIndex: 10 }, 0.25);
      tl.to(topCardEl, {
        x: 0,
        y: 32,
        scale: 0.88,
        rotation: -3,
        opacity: 0.6,
        duration: 0.35,
        ease: "power2.out",
      }, 0.25);

    } else {
      // --- PREV ANIMATION (Swiper-like slide bottom card out to the left, then fly to the top) ---
      // 1. Pull the bottom card out to the left
      tl.to(bottomCardEl, {
        x: -380,
        y: 25,
        rotation: -15,
        opacity: 0.5,
        scale: 0.9,
        duration: 0.35,
        ease: "power2.inOut",
      });

      // 2. Current top card moves to middle
      tl.to(topCardEl, {
        x: 0,
        y: 16,
        scale: 0.94,
        rotation: 3,
        opacity: 0.9,
        duration: 0.45,
        ease: "power2.inOut",
      }, 0);

      // 3. Current middle card moves to bottom
      tl.to(middleCardEl, {
        x: 0,
        y: 32,
        scale: 0.88,
        rotation: -3,
        opacity: 0.6,
        duration: 0.45,
        ease: "power2.inOut",
      }, 0);

      // 4. Move bottom card to top z-index and slide it into the top position
      tl.set(bottomCardEl, { zIndex: 30 }, 0.22);
      tl.to(bottomCardEl, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      }, 0.22);
    }
  };

  // --- DRAG / SWIPE HANDLERS ---
  const handleDragStart = (clientX: number) => {
    if (isAnimatingRef.current) return;
    dragStartRef.current = clientX;
    isDraggingRef.current = true;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current || isAnimatingRef.current) return;
    const diffX = clientX - dragStartRef.current;
    const total = testimonials.length;

    const topCardEl = containerRef.current?.querySelector(`.testimonial-card-${activeIndex}`) as HTMLElement;
    const middleCardEl = containerRef.current?.querySelector(`.testimonial-card-${(activeIndex + 1) % total}`) as HTMLElement;
    const bottomCardEl = containerRef.current?.querySelector(`.testimonial-card-${(activeIndex + 2) % total}`) as HTMLElement;

    if (!topCardEl) return;

    // Track the horizontal movement of the top card
    const rotate = (diffX / 300) * 15;
    gsap.set(topCardEl, {
      x: diffX,
      rotation: rotate,
      y: Math.abs(diffX) * 0.05,
    });

    // Interpolate the next cards' scale, position, and opacity as the top card is dragged
    const progress = Math.min(Math.abs(diffX) / 300, 1);

    if (middleCardEl) {
      gsap.set(middleCardEl, {
        y: 16 - progress * 16,
        scale: 0.94 + progress * 0.06,
        rotation: 3 - progress * 3,
        opacity: 0.9 + progress * 0.1,
      });
    }

    if (bottomCardEl) {
      gsap.set(bottomCardEl, {
        y: 32 - progress * 16,
        scale: 0.88 + progress * 0.06,
        rotation: -3 + progress * 6,
        opacity: 0.6 + progress * 0.3,
      });
    }
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diffX = clientX - dragStartRef.current;
    const total = testimonials.length;

    const topCardEl = containerRef.current?.querySelector(`.testimonial-card-${activeIndex}`) as HTMLElement;
    const middleCardEl = containerRef.current?.querySelector(`.testimonial-card-${(activeIndex + 1) % total}`) as HTMLElement;
    const bottomCardEl = containerRef.current?.querySelector(`.testimonial-card-${(activeIndex + 2) % total}`) as HTMLElement;

    if (!topCardEl) return;

    // Threshold for a successful swipe is 100px
    if (diffX < -100) {
      // Swipe left -> Throw left and move to next
      isAnimatingRef.current = true;
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % total);
          isAnimatingRef.current = false;
          setIsAnimating(false);
        }
      });

      tl.to(topCardEl, {
        x: -380,
        y: 25,
        rotation: -15,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out",
      });

      tl.to(middleCardEl, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }, 0);

      tl.to(bottomCardEl, {
        x: 0,
        y: 16,
        scale: 0.94,
        rotation: 3,
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out",
      }, 0);

      tl.set(topCardEl, { zIndex: 10 }, 0.15);
      tl.to(topCardEl, {
        x: 0,
        y: 32,
        scale: 0.88,
        rotation: -3,
        opacity: 0.6,
        duration: 0.25,
        ease: "power2.out",
      }, 0.15);

    } else if (diffX > 100) {
      // Swipe right -> Throw right and move to next
      isAnimatingRef.current = true;
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % total);
          isAnimatingRef.current = false;
          setIsAnimating(false);
        }
      });

      tl.to(topCardEl, {
        x: 380,
        y: 25,
        rotation: 15,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out",
      });

      tl.to(middleCardEl, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }, 0);

      tl.to(bottomCardEl, {
        x: 0,
        y: 16,
        scale: 0.94,
        rotation: 3,
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out",
      }, 0);

      tl.set(topCardEl, { zIndex: 10 }, 0.15);
      tl.to(topCardEl, {
        x: 0,
        y: 32,
        scale: 0.88,
        rotation: -3,
        opacity: 0.6,
        duration: 0.25,
        ease: "power2.out",
      }, 0.15);

    } else {
      // Drag distance too small -> Snap back to initial positions
      isAnimatingRef.current = true;
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        }
      });

      tl.to(topCardEl, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.45,
        ease: "back.out(1.4)",
      });

      if (middleCardEl) {
        tl.to(middleCardEl, {
          x: 0,
          y: 16,
          scale: 0.94,
          rotation: 3,
          opacity: 0.9,
          duration: 0.45,
          ease: "power2.out",
        }, 0);
      }

      if (bottomCardEl) {
        tl.to(bottomCardEl, {
          x: 0,
          y: 32,
          scale: 0.88,
          rotation: -3,
          opacity: 0.6,
          duration: 0.45,
          ease: "power2.out",
        }, 0);
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUpOrLeave = (e: React.MouseEvent) => {
    handleDragEnd(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientX);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-light-bg/30"
    >
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary-navy/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Heading and dots */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <span className="text-accent-orange uppercase font-bold tracking-widest text-xs sm:text-sm mb-3">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy tracking-tight mb-6 max-w-sm leading-tight">
            What People Say About Us.
          </h2>
          <p className="text-text-gray text-sm sm:text-base mb-12 max-w-md">
            Read authentic reviews from travelers who explored the breathtaking beaches, rich culture, and adventures of Lombok with Travello.
          </p>

          {/* Dots Indicator */}
          <div className="flex gap-4">
            {testimonials.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx !== activeIndex && !isAnimatingRef.current) {
                      const isNext = idx === (activeIndex + 1) % testimonials.length;
                      animateCardChange(isNext ? "next" : "prev", () => setActiveIndex(idx));
                    }
                  }}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent-orange w-8"
                      : "bg-gray-200 hover:bg-gray-300 w-3"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right Column: Stacked Cards & Controls */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-8 relative select-none">
          {/* Card Stack Container */}
          <div
            ref={cardContainerRef}
            className="relative w-full h-[380px] sm:h-[310px] flex items-center justify-start cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {testimonials.map((test, idx) => {
              const diff = (idx - activeIndex + testimonials.length) % testimonials.length;
              
              // Dynamic stacked styles
              const zIndex = diff === 0 ? 30 : diff === 1 ? 20 : 10;
              const transform = `translateY(${diff * 16}px) scale(${1 - diff * 0.06}) rotate(${
                diff === 0 ? 0 : diff === 1 ? 3 : -3
              }deg)`;
              const opacity = diff === 0 ? 1 : diff === 1 ? 0.9 : 0.6;
              const isTop = diff === 0;

              return (
                <div
                  key={idx}
                  className={`testimonial-card-${idx} testimonial-card absolute top-0 left-0 w-[94%] sm:w-[96%] h-[330px] sm:h-[260px] bg-white rounded-3xl p-6 sm:p-8 border border-gray-100/80 shadow-2xl flex flex-col justify-between select-none ${
                    isTop ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  style={{
                    zIndex,
                    transform,
                    opacity,
                  }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-8 text-accent-orange/10">
                    <Quote className="w-12 h-12 fill-current" />
                  </div>

                  {/* Floating Avatar */}
                  <div className="absolute top-[-24px] left-8 w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                    <Image
                      src={test.avatar}
                      alt={test.name}
                      fill
                      sizes="60px"
                      className="object-cover pointer-events-none"
                      draggable={false}
                    />
                  </div>

                  {/* Quote Text */}
                  <p className="text-text-gray font-medium text-sm sm:text-base leading-relaxed mt-4 mb-4 italic select-none">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  {/* Identity */}
                  <div className="flex flex-col border-t border-gray-50 pt-3 select-none">
                    <span className="font-sans text-base font-bold text-primary-navy">
                      {test.name}
                    </span>
                    <span className="text-text-gray text-xs sm:text-sm font-medium">
                      {test.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toggle Control Arrows */}
          <div className="flex sm:flex-col gap-4 z-20">
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="p-4 rounded-full bg-white hover:bg-accent-orange/15 hover:text-accent-orange text-primary-navy shadow-lg border border-gray-100/50 transition-all focus:outline-none cursor-pointer duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ChevronUp className="w-5 h-5 hidden sm:block" />
              <ChevronDown className="w-5 h-5 block sm:hidden rotate-90" />
            </button>
            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="p-4 rounded-full bg-white hover:bg-accent-orange/15 hover:text-accent-orange text-primary-navy shadow-lg border border-gray-100/50 transition-all focus:outline-none cursor-pointer duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ChevronDown className="w-5 h-5 hidden sm:block" />
              <ChevronDown className="w-5 h-5 block sm:hidden -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
