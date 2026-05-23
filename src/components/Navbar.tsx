"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-[114px] h-[34px] group">
            <Image
              src="/logo.png"
              alt="Travello Logo"
              fill
              sizes="114px"
              className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8 text-primary-navy font-medium text-sm">
            <Link
              href="#destinations"
              className="hover:text-accent-orange transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="#packages"
              className="hover:text-accent-orange transition-colors"
            >
              Packages
            </Link>
            <Link
              href="#bookings"
              className="hover:text-accent-orange transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="#contact"
              className="hover:text-accent-orange transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="#login"
              className="text-primary-navy font-medium text-sm hover:text-accent-orange transition-colors"
            >
              Login
            </Link>
            <Link
              href="#signup"
              className="px-5 py-2 text-sm font-medium border border-primary-navy text-primary-navy rounded-md hover:bg-primary-navy hover:text-white transition-all duration-300"
            >
              Sign up
            </Link>
            <button className="flex items-center gap-1 text-primary-navy text-xs font-semibold hover:text-accent-orange transition-colors">
              EN <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-primary-navy hover:text-accent-orange transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-100 py-6 px-6 shadow-xl flex flex-col gap-6 animate-float-delayed">
          <div className="flex flex-col gap-4 text-primary-navy font-semibold text-center">
            <Link
              href="#destinations"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="#packages"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              Packages
            </Link>
            <Link
              href="#bookings"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              Contact
            </Link>
          </div>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-4 text-center">
            <Link
              href="#login"
              onClick={() => setIsOpen(false)}
              className="py-2 text-primary-navy font-semibold hover:text-accent-orange transition-colors"
            >
              Login
            </Link>
            <Link
              href="#signup"
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 text-sm font-semibold border border-primary-navy text-primary-navy rounded-md hover:bg-primary-navy hover:text-white transition-all duration-300"
            >
              Sign up
            </Link>
            <button className="flex items-center justify-center gap-1 text-primary-navy text-xs font-semibold py-2">
              EN <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
