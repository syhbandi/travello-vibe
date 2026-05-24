"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Image column entrance
    gsap.fromTo(
      imageColRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );

    // Form card entrance
    gsap.fromTo(
      formCardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    // Stagger form items
    gsap.fromTo(
      ".form-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsSubmitting(true);

    // Simulate login API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Redirect to dashboard after a short delay so the success animation is visible
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="w-full bg-white flex flex-col min-h-screen pt-24 pb-16">
      {/* Background soft blobs */}
      <div className="absolute right-[-10%] top-[10%] w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute left-[-5%] bottom-[10%] w-[350px] h-[350px] bg-blue-100/20 rounded-full blur-[70px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 flex-grow">

        {/* Left Column: Premium Image Visual */}
        <div ref={imageColRef} className="hidden lg:flex flex-col gap-6 relative h-[600px] w-full rounded-[32px] overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1516483638261-f40889c2e5c6?q=80&w=1000&auto=format&fit=crop"
            alt="Lombok Landscape"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/40 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col gap-3">
            <h2 className="text-white font-serif text-4xl font-bold leading-tight">
              Welcome Back to<br />Your Next Adventure
            </h2>
            <p className="text-white/80 font-medium text-sm max-w-sm">
              Discover exclusive travel packages, manage your bookings, and start planning your perfect getaway with Travello.
            </p>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div ref={formCardRef} className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-gray-100 shadow-xl sm:shadow-2xl relative overflow-hidden flex flex-col">

            {isSuccess ? (
              <div className="py-12 px-4 flex flex-col items-center text-center animate-float">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner border border-emerald-100 mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary-navy tracking-tight mb-2">
                  Login Successful!
                </h2>
                <p className="text-text-gray text-sm font-medium mb-8">
                  Redirecting to your dashboard...
                </p>
              </div>
            ) : (
              <>
                <div className="form-item mb-8">
                  <h1 className="font-serif text-3xl font-bold text-primary-navy tracking-tight mb-2">
                    Sign In
                  </h1>
                  <p className="text-text-gray text-sm font-medium">
                    Enter your email and password to access your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-12 pr-4 py-3.5 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="form-item flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="text-primary-navy font-bold text-xs uppercase tracking-wider">
                        Password
                      </label>
                      <a href="#" className="text-accent-orange font-bold text-xs hover:underline transition-all">
                        Forgot Password?
                      </a>
                    </div>
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
                        className="bg-gray-50/50 focus:bg-white border border-gray-200 focus:ring-4 focus:ring-accent-orange/15 focus:border-accent-orange outline-none rounded-xl pl-12 pr-4 py-3.5 w-full text-sm font-semibold text-primary-navy placeholder-gray-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-item mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary-navy hover:bg-accent-orange text-white font-bold rounded-xl shadow-lg shadow-primary-navy/20 hover:shadow-accent-orange/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <LogIn className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="form-item mt-8 text-center">
                  <p className="text-text-gray text-sm font-medium">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-accent-orange font-bold hover:underline transition-all">
                      Sign up now
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
