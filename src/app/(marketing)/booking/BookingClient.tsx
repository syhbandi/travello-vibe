"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Calendar, Users, MapPin, CheckCircle, Navigation, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BookingClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedPackage: "",
    date: "",
    participants: "1",
    specialRequests: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animations
    gsap.fromTo(
      ".booking-hero-title",
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    gsap.fromTo(
      ".booking-hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    // Form Card Animation
    gsap.fromTo(
      formCardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
    );

    // Form Fields Stagger
    gsap.fromTo(
      ".form-field-stagger",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.6, ease: "power2.out" }
    );

  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.selectedPackage || !formData.date) return;
    
    setIsSubmitting(true);
    
    // Simulate booking API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="w-full bg-white flex flex-col min-h-screen">
      {/* 1. Hero Section (Banner ~80vh) */}
      <section className="relative min-h-[72vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop"
          alt="Lombok Travel Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* Dark-to-White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/75 via-primary-navy/35 to-white" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-36 md:pt-48 pb-16 flex flex-col items-center">
          <span className="text-accent-yellow uppercase font-black tracking-widest text-xs sm:text-sm mb-3">
            Secure Your Spot
          </span>
          <h1 className="booking-hero-title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            Book Your Adventure
          </h1>
          <p className="booking-hero-desc text-white/90 text-sm sm:text-base md:text-lg max-w-2xl font-medium mb-8">
            Start your journey with Travello today. Fill in your details below, choose your dream destination, and let us handle the rest.
          </p>
        </div>
      </section>

      {/* 2. Form Section */}
      <section className="relative z-20 -mt-12 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={formCardRef} 
            className="bg-white rounded-[32px] p-6 sm:p-10 border border-gray-100 shadow-[0_30px_60px_rgba(24,30,75,0.12)] relative overflow-hidden"
          >
            {isSuccess ? (
              <div className="py-16 px-4 flex flex-col items-center text-center animate-float">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner border border-emerald-100 mb-6">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary-navy tracking-tight mb-3">
                  Booking Confirmed!
                </h2>
                <p className="text-text-gray text-base font-semibold max-w-md leading-relaxed mb-8">
                  Thank you, {formData.name}. Your booking request for {formData.selectedPackage} has been received. Our team will contact you shortly to process your payment and finalize your itinerary.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      selectedPackage: "",
                      date: "",
                      participants: "1",
                      specialRequests: "",
                    });
                  }}
                  className="px-8 py-4 bg-primary-navy hover:bg-accent-orange text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                >
                  Book Another Trip
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-accent-orange shrink-0 border border-orange-100">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-sans text-xl font-bold text-primary-navy leading-snug">Trip Details</h2>
                    <p className="text-text-gray text-xs font-bold uppercase tracking-wider">Please fill all required fields</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="form-field-stagger flex flex-col gap-2">
                      <label htmlFor="name" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3.5 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="form-field-stagger flex flex-col gap-2">
                      <label htmlFor="email" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3.5 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>

                    {/* Phone */}
                    <div className="form-field-stagger flex flex-col gap-2">
                      <label htmlFor="phone" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="e.g. +62 812 3456 7890"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3.5 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>

                    {/* Package */}
                    <div className="form-field-stagger flex flex-col gap-2">
                      <label htmlFor="selectedPackage" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Select Package
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <select
                          id="selectedPackage"
                          name="selectedPackage"
                          required
                          value={formData.selectedPackage}
                          onChange={handleChange}
                          className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-10 pr-4 py-3.5 w-full text-sm font-semibold text-primary-navy appearance-none transition-all duration-300"
                        >
                          <option value="" disabled>Choose a package...</option>
                          <option value="Gili Trawangan, Lombok">Gili Trawangan, Lombok</option>
                          <option value="Mount Rinjani Trek">Mount Rinjani Trek</option>
                          <option value="Mandalika Beach">Mandalika Beach</option>
                          <option value="Pink Beach Tour">Pink Beach Tour</option>
                          <option value="Senggigi Relax Package">Senggigi Relax Package</option>
                          <option value="Custom Itinerary">Custom Itinerary (Discuss Later)</option>
                        </select>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="form-field-stagger flex flex-col gap-2">
                      <label htmlFor="date" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Travel Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-10 pr-4 py-3 w-full text-sm font-semibold text-primary-navy transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="form-field-stagger flex flex-col gap-2">
                      <label htmlFor="participants" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Number of People
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <Users className="w-4 h-4" />
                        </div>
                        <input
                          type="number"
                          id="participants"
                          name="participants"
                          min="1"
                          max="20"
                          required
                          value={formData.participants}
                          onChange={handleChange}
                          className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-10 pr-4 py-3 w-full text-sm font-semibold text-primary-navy transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="form-field-stagger flex flex-col gap-2 mt-2">
                    <label htmlFor="specialRequests" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Special Requests / Notes
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      placeholder="Any dietary requirements, flight arrival times, or special occasions?"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-2xl px-4 py-3.5 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-field-stagger mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-accent-orange hover:bg-accent-orange/95 text-white font-bold rounded-2xl shadow-lg shadow-accent-orange/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          <span>Request Booking</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-text-gray text-xs mt-3 font-medium">
                      No payment is required right now. Our team will contact you to confirm details.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
