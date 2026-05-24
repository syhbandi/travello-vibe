"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Navigation, Search, Star, MapPin, Filter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Gili Trawangan, Lombok",
    price: "$250",
    duration: "5 Days Trip",
    rating: "4.9",
    category: "Beach",
    imgUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600&auto=format&fit=crop",
    desc: "A tropical paradise featuring turquoise waters, vibrant coral reefs, and vibrant beachfront nightlife with zero motorized vehicles.",
  },
  {
    name: "Mount Rinjani, Lombok",
    price: "$300",
    duration: "4 Days Trek",
    rating: "4.8",
    category: "Mountain",
    imgUrl: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=600&auto=format&fit=crop",
    desc: "Embark on an unforgettable challenge trekking up Indonesia's second highest volcanic peak with breathtaking views of the crater lake.",
  },
  {
    name: "Mandalika Beach, Lombok",
    price: "$200",
    duration: "3 Days Trip",
    rating: "4.7",
    category: "Beach",
    imgUrl: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=600&auto=format&fit=crop",
    desc: "A massive, gorgeous resort area facing the Indian Ocean, famous for pristine white sand coasts and the world-class MotoGP Circuit.",
  },
  {
    name: "Pink Beach, Lombok",
    price: "$150",
    duration: "2 Days Trip",
    rating: "4.8",
    category: "Beach",
    imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    desc: "One of only a few pink sand beaches in the world, colored by microscopic organisms. Peaceful waters and brilliant snorkeling await.",
  },
  {
    name: "Senggigi Beach, Lombok",
    price: "$180",
    duration: "3 Days Trip",
    rating: "4.6",
    category: "Beach",
    imgUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    desc: "Lombok's traditional tourist hub, showcasing beautiful sweeping bays, stunning sunset views of Mount Agung, and fine restaurants.",
  },
  {
    name: "Benang Kelambu Waterfall",
    price: "$120",
    duration: "1 Day Trip",
    rating: "4.9",
    category: "Waterfall",
    imgUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
    desc: "A spectacular waterfall flowing gently through thick, lush vines, creating a unique curtain-like effect resembling fine nets.",
  },
  {
    name: "Tetebatu Green Village",
    price: "$140",
    duration: "2 Days Trip",
    rating: "4.7",
    category: "Village",
    imgUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600&auto=format&fit=crop",
    desc: "Experience rural Lombok at the foot of Mount Rinjani, featuring verdant terraced rice fields, spice orchards, and local monkey forests.",
  },
  {
    name: "Sembalun Valley Peak",
    price: "$220",
    duration: "3 Days Trek",
    rating: "4.9",
    category: "Mountain",
    imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    desc: "A scenic mountain valley surrounded by towering ridges, offering cool refreshing air, lush strawberry farms, and epic viewpoints.",
  },
];

const categories = ["All", "Beach", "Mountain", "Waterfall", "Village"];

export default function DestinationsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Stagger entry animation
  useGSAP(() => {
    // Hero Entrance
    gsap.fromTo(
      ".dest-hero-title",
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    gsap.fromTo(
      ".dest-hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(
      ".dest-search-bar",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.4, ease: "back.out(1.2)" }
    );

    // Cards Scroll Trigger (First load)
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
      ".dest-card-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  // Re-run animation for cards whenever activeCategory or searchQuery changes
  useGSAP(() => {
    if (gridRef.current) {
      gsap.fromTo(
        ".dest-card-item",
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [activeCategory, searchQuery]);

  // Filtering Logic
  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = activeCategory === "All" || dest.category === activeCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={containerRef} className="w-full bg-white flex flex-col min-h-screen">
      {/* 1. Hero Section (Banner ~78vh) */}
      <section className="relative min-h-[72vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop"
          alt="Lombok Sunset Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* Deeper, Richer, and more dramatic Dark-to-White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/75 via-primary-navy/35 to-white" />
        
        {/* Decorative Grid Pattern */}
        <div className="absolute left-[3%] bottom-[15%] w-[100px] h-[100px] opacity-20 pointer-events-none select-none">
          <Image
            src="/plus-grid.png"
            alt="Decor Grid"
            fill
            sizes="100px"
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-36 md:pt-48 pb-16 flex flex-col items-center">
          <span className="text-accent-yellow uppercase font-black tracking-widest text-xs sm:text-sm mb-3">
            Your Premium Getaway
          </span>
          <h1 className="dest-hero-title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            Explore Our Destinations
          </h1>
          <p className="dest-hero-desc text-white/90 text-sm sm:text-base md:text-lg max-w-2xl font-medium mb-8">
            Immerse yourself in the authentic, spectacular beauty of Lombok. From azure beach borders to majestic volcano peaks, find your next sanctuary.
          </p>

          {/* Search Bar Floating - Extra Shadow for visibility on light overlay */}
          <div className="dest-search-bar w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-[0_25px_60px_rgba(24,30,75,0.18)] flex items-center border border-white/50 glass">
            <div className="flex items-center flex-1 px-3 gap-2">
              <Search className="w-5 h-5 text-text-gray" />
              <input
                type="text"
                placeholder="Search beach, mountains, waterfalls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-primary-navy font-semibold text-sm sm:text-base focus:outline-none placeholder-text-gray/70"
              />
            </div>
            <button className="px-5 py-3 bg-accent-orange hover:bg-accent-orange/90 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
              <span>Find</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Listing Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-white">
        {/* Decorative Spiral in background */}
        <div className="absolute right-[-4%] bottom-[5%] w-[150px] h-[300px] pointer-events-none opacity-20 select-none">
          <Image
            src="/spiral.png"
            alt="Spiral Decor"
            fill
            sizes="150px"
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Categories Tab Header */}
          <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8 mb-12">
            <div>
              <span className="text-accent-orange uppercase font-extrabold tracking-widest text-2xs mb-2 block">
                Top Selections
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-navy tracking-tight">
                Curated Travel Spots
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-text-gray text-xs font-bold mr-2 hidden sm:inline-flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === category
                      ? "bg-primary-navy text-white shadow-md shadow-primary-navy/20"
                      : "bg-gray-50 text-text-gray hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Listing Grid */}
          {filteredDestinations.length > 0 ? (
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch"
            >
              {filteredDestinations.map((dest, idx) => (
                <div
                  key={idx}
                  className="dest-card-item group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-gray-100"
                >
                  {/* Image Frame */}
                  <div className="relative h-[250px] w-full overflow-hidden">
                    <Image
                      src={dest.imgUrl}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Price Tag Overlay */}
                    <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-primary-navy font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-sm">
                      {dest.price} <span className="text-3xs font-semibold text-text-gray">/ trip</span>
                    </span>

                    {/* Category Tag Overlay */}
                    <span className="absolute top-4 right-4 bg-primary-navy/85 backdrop-blur-xs text-white font-extrabold text-3xs tracking-wider px-3 py-1 rounded-full uppercase">
                      {dest.category}
                    </span>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
                    {/* Location Name & Rating */}
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="font-sans text-base sm:text-lg font-bold text-primary-navy group-hover:text-accent-orange transition-colors duration-300 leading-snug">
                        {dest.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-accent-yellow shrink-0">
                        <Star className="w-3.5 h-3.5 fill-accent-yellow" />
                        <span className="text-primary-navy font-bold text-xs">{dest.rating}</span>
                      </div>
                    </div>

                    {/* Brief description */}
                    <p className="text-text-gray text-2xs leading-relaxed mb-6 font-medium text-left flex-grow">
                      {dest.desc}
                    </p>

                    {/* Card Footer: Duration & Navigation */}
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50 text-text-gray text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                        <span className="text-2xs font-semibold tracking-wide">Lombok, ID</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-primary-navy">
                        <Navigation className="w-3.5 h-3.5 fill-primary-navy stroke-primary-navy -rotate-45" />
                        <span>{dest.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-text-gray font-bold mb-2">No destinations match your search</p>
              <p className="text-text-gray/70 text-xs">Try selecting another category or typing another keywords.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 bg-primary-navy text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
