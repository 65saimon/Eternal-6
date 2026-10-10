"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "horizontal" | "emblem" | "full-photo" | "monochrome";
  height?: number;
  className?: string;
  withLink?: boolean;
}

export function EternalLogo({
  variant = "horizontal",
  height = 44,
  className = "",
  withLink = true,
}: LogoProps) {
  const content = (
    <div className={`flex items-center select-none group cursor-pointer ${className}`}>
      {variant === "full-photo" ? (
        <motion.div
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative rounded-2xl overflow-hidden border border-[#D6B878]/50 shadow-md bg-[#14100E] flex-shrink-0 sheen-overlay group-hover:shadow-[0_0_20px_rgba(214,184,120,0.35)] transition-all duration-300"
          style={{ width: height, height: height }}
        >
          <Image
            src="/images/logo/eternal6-logo.png"
            alt="Eternal 6 - Timeless Elegance"
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes={`${height}px`}
            priority
          />
        </motion.div>
      ) : variant === "emblem" ? (
        <motion.div
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative rounded-full overflow-hidden border border-[#D6B878]/60 shadow-sm bg-[#14100E] flex-shrink-0 ring-2 ring-[#D6B878]/30 group-hover:ring-[#D6B878]/70 group-hover:shadow-[0_0_18px_rgba(214,184,120,0.45)] transition-all duration-300"
          style={{ width: height, height: height }}
        >
          {/* Ambient Rotating Gold Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D6B878]/20 via-transparent to-[#FFF9F2]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <Image
            src="/images/logo/eternal6-logo.png"
            alt="Eternal 6 Emblem"
            fill
            className="object-cover scale-110 transition-transform duration-500 group-hover:scale-115"
            sizes={`${height}px`}
            priority
          />
        </motion.div>
      ) : variant === "monochrome" ? (
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative rounded-lg overflow-hidden border border-[#342722]/30 flex-shrink-0 bg-black"
            style={{ width: height * 0.9, height: height * 0.9 }}
          >
            <Image
              src="/images/logo/eternal6-logo.png"
              alt="Eternal 6"
              fill
              className="object-cover grayscale contrast-125 transition-all duration-300 group-hover:contrast-150"
              sizes={`${height}px`}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#1A110D]">
              ETERNAL - 6
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#342722]/80 font-medium -mt-0.5">
              TIMELESS ELEGANCE
            </span>
          </div>
        </div>
      ) : (
        /* Default Horizontal Luxury Lockup */
        <div className="flex items-center gap-3.5">
          {/* Authentic Gold Photo Emblem with Micro-Interactions */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 1.5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="relative rounded-xl overflow-hidden border border-[#D6B878]/60 shadow-sm flex-shrink-0 bg-[#14100E] ring-1 ring-[#D6B878]/30 group-hover:ring-[#D6B878]/80 group-hover:shadow-[0_0_20px_rgba(214,184,120,0.35)] transition-all duration-300 sheen-overlay"
            style={{ width: height, height: height }}
          >
            {/* Subtle soft shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
            <Image
              src="/images/logo/eternal6-logo.png"
              alt="Eternal 6 - Timeless Elegance"
              fill
              className="object-cover scale-105 transition-transform duration-500 group-hover:scale-112"
              sizes={`${height}px`}
              priority
            />
          </motion.div>

          {/* Luxury Typography */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#342722] dark:text-[#FAF5EE] transition-colors duration-200">
                ETERNAL
              </span>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text luster-animated transition-all">
                - 6
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <motion.span
                animate={{ scaleX: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-[0.5px] w-2.5 bg-[#D6B878]/70 origin-left"
              />
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-[#8C7654] dark:text-[#D6B878] font-medium leading-none group-hover:tracking-[0.36em] transition-all duration-300">
                TIMELESS ELEGANCE
              </span>
              <motion.span
                animate={{ scaleX: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-[0.5px] w-2.5 bg-[#D6B878]/70 origin-right"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-block transition-transform duration-200">
        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
          {content}
        </motion.div>
      </Link>
    );
  }

  return content;
}
