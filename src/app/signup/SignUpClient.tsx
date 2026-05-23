"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, UserPlus, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SignUpClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Form card entrance (slides from right this time)
    gsap.fromTo(
      formCardRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );

    // Image column entrance (slides from left)
    gsap.fromTo(
      imageColRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    // Stagger form items
    gsap.fromTo(
      ".form-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || formData.password !== formData.confirmPassword) return;
    
    setIsSubmitting(true);
    
    // Simulate signup API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <div ref={containerRef} className="w-full bg-white flex flex-col min-h-screen pt-24 pb-16">
      {/* Background soft blobs */}
      <div className="absolute left-[-10%] top-[20%] w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute right-[-5%] bottom-[10%] w-[350px] h-[350px] bg-blue-100/20 rounded-full blur-[70px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 flex-grow">
        
        {/* Left Column: Form Card */}
        <div ref={formCardRef} className="w-full max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
          <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-gray-100 shadow-xl sm:shadow-2xl relative overflow-hidden flex flex-col">
            
            {isSuccess ? (
              <div className="py-12 px-4 flex flex-col items-center text-center animate-float">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner border border-emerald-100 mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary-navy tracking-tight mb-2">
                  Account Created!
                </h2>
                <p className="text-text-gray text-sm font-medium mb-8">
                  Welcome to Travello, {formData.name}. Get ready for your next adventure.
                </p>
                <Link
                  href="/login"
                  className="px-6 py-3 bg-primary-navy hover:bg-accent-orange text-white text-xs font-bold rounded-xl shadow-md transition-all duration-300"
                >
                  Proceed to Login
                </Link>
              </div>
            ) : (
              <>
                <div className="form-item mb-8">
                  <h1 className="font-serif text-3xl font-bold text-primary-navy tracking-tight mb-2">
                    Create Account
                  </h1>
                  <p className="text-text-gray text-sm font-medium">
                    Join Travello and start planning your dream vacation today.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name field */}
                  <div className="form-item flex flex-col gap-2">
                    <label htmlFor="name" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-12 pr-4 py-3 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="form-item flex flex-col gap-2">
                    <label htmlFor="email" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-12 pr-4 py-3 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="form-item flex flex-col gap-2">
                    <label htmlFor="password" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-12 pr-4 py-3 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Confirm Password field */}
                  <div className="form-item flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`bg-gray-50/50 focus:bg-white border ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500 focus:ring-red-500/15 focus:border-red-500' : 'border-gray-200 focus:ring-accent-orange/15 focus:border-accent-orange'} outline-none rounded-xl pl-12 pr-4 py-3 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300`}
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <span className="text-red-500 text-xs font-semibold">Passwords do not match</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-item mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || (!!formData.confirmPassword && formData.password !== formData.confirmPassword)}
                      className="w-full py-4 bg-primary-navy hover:bg-accent-orange text-white font-bold rounded-xl shadow-lg shadow-primary-navy/20 hover:shadow-accent-orange/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign Up</span>
                          <UserPlus className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="form-item mt-6 text-center">
                  <p className="text-text-gray text-sm font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-accent-orange font-bold hover:underline transition-all">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Premium Image Visual */}
        <div ref={imageColRef} className="hidden lg:flex flex-col gap-6 relative h-[650px] w-full rounded-[32px] overflow-hidden shadow-2xl order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1000&auto=format&fit=crop"
            alt="Bali Travel"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/30 to-transparent" />
          
          <div className="absolute bottom-0 right-0 w-full p-10 flex flex-col gap-3 text-right items-end">
            <div className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider mb-2 border border-white/30">
              JOIN TRAVELLO
            </div>
            <h2 className="text-white font-serif text-4xl font-bold leading-tight">
              Unlock Exclusive<br />Travel Experiences
            </h2>
            <p className="text-white/80 font-medium text-sm max-w-sm">
              Members get access to secret deals, personalized itineraries, and priority support for all destinations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
