"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

// Main Hero Component
export const Component = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#021114]/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-cyan-400 tracking-wide">
            campasso
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="/colleges" className="hover:text-cyan-400 transition-colors">
              Colleges
            </Link>
            <Link href="/compare" className="hover:text-cyan-400 transition-colors">
              Compare
            </Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/auth/login" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#021114] transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen !bg-[#021114] flex flex-col items-center pt-[120px] pb-10 px-6 text-white overflow-hidden">
        
        {/* Core content wrapper */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl flex-grow">
          
          {/* Accent Subheading */}
          <div className="inline-block border border-cyan-400 rounded-full px-[20px] py-[6px] text-[13px] text-cyan-400 tracking-[0.15em] uppercase mb-[20px] text-center bg-transparent">
            Discover • Compare • Decide
          </div>

          {/* Main Heading */}
          <h1 className="text-white font-[800] text-[clamp(32px,4vw,56px)] leading-tight mb-[20px] text-center whitespace-nowrap" style={{ animation: "aurora-glow 3s infinite" }}>
            Find Your Dream College <span className="font-[400] text-white/90">in India</span>
          </h1>

          {/* Body Text */}
          <p className="text-[18px] text-white/60 max-w-[560px] text-center mb-[36px] leading-relaxed">
            Search 5,000+ colleges across India. Filter by fees, location, stream and placement rate — all in one place.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-[600px] mb-[24px] flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md shadow-xl focus-within:border-cyan-400/50 focus-within:ring-1 focus-within:ring-cyan-400/50 transition-all">
            <div className="pl-4 pr-3 text-gray-400 flex items-center justify-center">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search colleges, cities or streams..."
              className="flex-grow h-11 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="h-11 px-6 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#021114] font-semibold transition-colors shadow-lg shrink-0">
              Search
            </button>
          </div>

          {/* Primary and Secondary Buttons */}
          <div className="flex flex-wrap justify-center gap-[16px] mb-[32px]">
            <Link href="/colleges" className="flex items-center justify-center px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#021114] font-semibold transition-colors shadow-lg">
              Explore Colleges
            </Link>
            <button className="flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/5 text-white font-semibold transition-colors">
              How it works
            </button>
          </div>
          
          {/* Flexible space to push scroll indicator to bottom if screen is tall */}
          <div className="flex-grow min-h-[40px]"></div>

          {/* Scroll indicator - text elements without absolute positioning */}
          <div className="mt-0 flex flex-col items-center gap-1 opacity-60">
            <span className="text-[13px] font-medium tracking-wide text-gray-300 text-center animate-pulse">
              Scroll to explore ↓
            </span>
          </div>
          
        </div>
      </div>
    </>
  );
};