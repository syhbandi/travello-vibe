"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-gray-100">
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col text-left">
            <Link href="/" className="flex items-center group mb-6 w-fit">
              <div className="relative w-[130px] h-[39px]">
                <Image
                  src="/logo.png"
                  alt="Travello Logo"
                  fill
                  sizes="130px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-text-gray font-medium text-sm leading-relaxed max-w-sm mb-4">
              Book your trip in minutes, get full control for much longer. Enjoy unforgettable holidays in Lombok.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="col-span-1 lg:col-span-2 flex flex-col text-left">
            <h4 className="font-sans text-base sm:text-lg font-bold text-[#080809] mb-6">
              Company
            </h4>
            <div className="flex flex-col gap-4 text-text-gray font-medium text-sm">
              <Link href="#about" className="hover:text-accent-orange transition-colors">About</Link>
              <Link href="#careers" className="hover:text-accent-orange transition-colors">Careers</Link>
              <Link href="#mobile" className="hover:text-accent-orange transition-colors">Mobile</Link>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="col-span-1 lg:col-span-2 flex flex-col text-left">
            <h4 className="font-sans text-base sm:text-lg font-bold text-[#080809] mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4 text-text-gray font-medium text-sm">
              <Link href="#help" className="hover:text-accent-orange transition-colors">Help/FAQ</Link>
              <Link href="#press" className="hover:text-accent-orange transition-colors">Press</Link>
              <Link href="#affiliates" className="hover:text-accent-orange transition-colors">Affiliates</Link>
            </div>
          </div>

          {/* Column 4: More */}
          <div className="col-span-1 lg:col-span-2 flex flex-col text-left">
            <h4 className="font-sans text-base sm:text-lg font-bold text-[#080809] mb-6">
              More
            </h4>
            <div className="flex flex-col gap-4 text-text-gray font-medium text-sm">
              <Link href="#fees" className="hover:text-accent-orange transition-colors">Airlinefees</Link>
              <Link href="#airlines" className="hover:text-accent-orange transition-colors">Airlines</Link>
              <Link href="#tips" className="hover:text-accent-orange transition-colors">Low fare tips</Link>
            </div>
          </div>

          {/* Column 5: Social Media & Download badgess */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col text-left items-start">
            {/* Social Icons Row */}
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white hover:bg-accent-orange/10 text-primary-navy hover:text-accent-orange flex items-center justify-center shadow-md border border-gray-50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 hover:text-white text-primary-navy flex items-center justify-center shadow-md border border-gray-50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white hover:bg-accent-orange/10 text-primary-navy hover:text-accent-orange flex items-center justify-center shadow-md border border-gray-50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
            </div>

            <span className="text-text-gray font-semibold text-sm mb-4">
              Discover our app
            </span>

            {/* App Store / Google Play buttons */}
            <div className="flex flex-col gap-3 w-full">
              {/* Google Play */}
              <Link
                href="#googleplay"
                className="flex items-center gap-2.5 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-full transition-colors border border-gray-800 w-[150px] select-none cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.27v13.46c0 .88.98 1.41 1.71.91l10.15-6.73c.61-.41.61-1.31 0-1.72L4.71 4.36C3.98 3.86 3 4.39 3 5.27z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-medium leading-none uppercase text-gray-400">GET IT ON</span>
                  <span className="text-xs font-bold leading-none mt-1">Google Play</span>
                </div>
              </Link>

              {/* Apple Store */}
              <Link
                href="#appstore"
                className="flex items-center gap-2.5 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-full transition-colors border border-gray-800 w-[150px] select-none cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.15.67-2.87 1.51-.62.71-1.16 1.86-1.02 2.97 1.1.09 2.19-.57 2.9-1.42z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-medium leading-none uppercase text-gray-400">Download on the</span>
                  <span className="text-xs font-bold leading-none mt-1">App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <span className="text-text-gray font-semibold text-xs sm:text-sm">
            All rights reserved @ Travello.co
          </span>
          <div className="flex gap-6 text-text-gray text-xs sm:text-sm font-semibold">
            <Link href="#terms" className="hover:text-accent-orange transition-colors">Terms of Service</Link>
            <Link href="#privacy" className="hover:text-accent-orange transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
