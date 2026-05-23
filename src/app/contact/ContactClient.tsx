"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Staggered entry for left column info
    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".info-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.2, ease: "power2.out" }
    );

    // Fade-in map
    gsap.fromTo(
      ".contact-map-placeholder",
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(1.1)" }
    );

    // Staggered entry for right column form
    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <div ref={containerRef} className="w-full bg-white flex flex-col min-h-screen pt-24 pb-16">
      {/* Background soft blob */}
      <div className="absolute right-[-10%] top-[10%] w-[380px] h-[380px] bg-orange-100/30 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute left-[-5%] bottom-[10%] w-[350px] h-[350px] bg-amber-100/20 rounded-full blur-[70px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10 flex-grow">
        
        {/* Left Column: Contact info & Map (md:col-span-5) */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-8 text-left">
          <div>
            <span className="text-accent-orange uppercase font-extrabold tracking-widest text-xs mb-3 block">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy tracking-tight mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-text-gray text-sm md:text-base leading-relaxed font-medium">
              Have questions about our custom tours, private speedboats, or trekking packages? Get in touch with our local Lombok experts. We are here to help make your dream holiday come true.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="flex flex-col gap-6">
            {/* Address */}
            <div className="info-item flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100 text-accent-orange">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-primary-navy font-bold text-sm mb-1 uppercase tracking-wider">Main HQ Office</h3>
                <p className="text-text-gray text-xs sm:text-sm font-semibold leading-relaxed">
                  Jl. Raya Senggigi No. 12, Senggigi, Batu Layar,<br />
                  Lombok Barat, Nusa Tenggara Barat, 83355
                </p>
              </div>
            </div>

            {/* Telephone */}
            <div className="info-item flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100 text-accent-orange">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-primary-navy font-bold text-sm mb-1 uppercase tracking-wider">Call or WhatsApp</h3>
                <p className="text-text-gray text-xs sm:text-sm font-semibold leading-relaxed">
                  <a href="tel:+6281234567890" className="hover:text-accent-orange transition-colors">+62 812 3456 7890</a> (Local / WhatsApp)<br />
                  <a href="tel:+62370693000" className="hover:text-accent-orange transition-colors">+62 370 693 000</a> (Office Phone)
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="info-item flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100 text-accent-orange">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-primary-navy font-bold text-sm mb-1 uppercase tracking-wider">Direct Email</h3>
                <p className="text-text-gray text-xs sm:text-sm font-semibold leading-relaxed">
                  <a href="mailto:hello@travello.com" className="hover:text-accent-orange transition-colors">hello@travello.com</a><br />
                  <a href="mailto:booking@travello.com" className="hover:text-accent-orange transition-colors">booking@travello.com</a>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="info-item flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100 text-accent-orange">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-primary-navy font-bold text-sm mb-1 uppercase tracking-wider">Business Hours</h3>
                <p className="text-text-gray text-xs sm:text-sm font-semibold leading-relaxed">
                  Daily: 08:00 AM – 09:00 PM (GMT+8)<br />
                  Emergency Support: 24/7 Available via WhatsApp
                </p>
              </div>
            </div>
          </div>

          {/* Premium Map Placeholder Canvas */}
          <div className="contact-map-placeholder relative w-full h-[240px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-[#E8ECEF] flex items-center justify-center group">
            {/* Topographic/Scenic Map Visual Design */}
            <div className="absolute inset-0 opacity-80 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center select-none" />
            {/* Soft overlay to match brand colors */}
            <div className="absolute inset-0 bg-[#e3eafd]/70 mix-blend-color" />
            <div className="absolute inset-0 bg-primary-navy/5" />
            
            {/* Pulsing Locator Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-accent-orange opacity-40"></span>
                <div className="relative w-10 h-10 rounded-full bg-accent-orange flex items-center justify-center text-white shadow-lg shadow-accent-orange/40">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <span className="mt-2.5 px-3.5 py-1 bg-primary-navy text-white text-3xs font-extrabold tracking-wider rounded-xl shadow-md uppercase">
                Travello Lombok HQ
              </span>
            </div>

            {/* Map Interaction Hover Overlay */}
            <div className="absolute inset-0 bg-primary-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <a 
                href="https://maps.google.com/?q=Senggigi+Beach+Lombok" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-3 bg-accent-yellow hover:bg-accent-yellow/90 text-white font-bold text-xs rounded-xl shadow-md transition-transform duration-300 transform scale-95 group-hover:scale-100 uppercase tracking-wider"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Contact Form Card (md:col-span-7) */}
        <div ref={rightColRef} className="lg:col-span-7 w-full">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-gray-100 shadow-xl sm:shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Decorative Spiral inside card corner */}
            <div className="absolute left-[-8%] bottom-[-8%] w-[100px] h-[200px] pointer-events-none opacity-5 rotate-45 select-none">
              <Image
                src="/spiral.png"
                alt="Decor"
                fill
                sizes="100px"
                className="object-contain"
              />
            </div>

            {isSubmitted ? (
              // Beautiful simulated success message
              <div className="py-16 px-4 flex flex-col items-center text-center animate-float">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner border border-emerald-100 mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight mb-3">
                  Message Sent Successfully!
                </h2>
                <p className="text-text-gray text-xs sm:text-sm font-semibold max-w-sm leading-relaxed mb-8">
                  Thank you for reaching out to Travello. One of our Lombok trip consultants will review your inquiry and reply via email within 2 to 4 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-primary-navy hover:bg-accent-orange text-white text-xs font-bold rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              // Regular Contact Form
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-accent-orange shrink-0 border border-orange-100">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-sans text-xl font-bold text-primary-navy leading-snug">Send Us a Message</h2>
                    <p className="text-text-gray text-3xs font-bold uppercase tracking-wider">Usually replies in under 2 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
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
                      disabled={isSubmitting}
                      className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3.5 w-full text-xs sm:text-sm font-semibold text-primary-navy placeholder-gray-400/80 transition-all duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
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
                      disabled={isSubmitting}
                      className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3.5 w-full text-xs sm:text-sm font-semibold text-primary-navy placeholder-gray-400/80 transition-all duration-300"
                    />
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="e.g. Booking Gili Trawangan Tour"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl px-4 py-3.5 w-full text-xs sm:text-sm font-semibold text-primary-navy placeholder-gray-400/80 transition-all duration-300"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Type your message here, including dates and participant counts if planning a tour..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-2xl px-4 py-3.5 w-full text-xs sm:text-sm font-semibold text-primary-navy placeholder-gray-400/80 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 bg-accent-orange hover:bg-accent-orange/95 text-white font-bold rounded-2xl shadow-lg shadow-accent-orange/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
