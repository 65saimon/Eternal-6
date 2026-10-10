"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LuxuryHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Tilt Coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for luxurious weight
  const mouseX = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;

    x.set(currentX);
    y.set(currentY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto max-w-md lg:max-w-none perspective-1000"
    >
      {/* Background decorative gold frames with subtle breathing float */}
      <motion.div
        animate={{ rotate: [1, 2.5, 1], scale: [1, 1.01, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-3 rounded-3xl border border-[#D6B878]/50 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [-2, -3.5, -2], scale: [1, 0.99, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-3 rounded-3xl border border-[#D6B878]/30 pointer-events-none"
      />

      {/* Main Campaign Editorial Image with 3D Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#342722] aspect-[4/5] border border-[#D6B878]/40 sheen-overlay group"
      >
        <img
          src="/images/eternal6/801035952_122115620427417938_1668672352969936787_n.jpg"
          alt="Eternal 6 Timeless Elegance Campaign"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#342722]/85 via-transparent to-transparent pointer-events-none" />

        {/* Floating Highlight Card */}
        <motion.div
          animate={{ y: [-2, 3, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 dark:bg-[#1A1310]/95 backdrop-blur-md border border-[#D6B878]/50 shadow-xl flex items-center justify-between"
          style={{ transform: "translateZ(30px)" }}
        >
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#B89A58] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              Official Campaign Release
            </div>
            <h4 className="font-serif-luxury text-sm font-semibold text-[#342722] dark:text-[#FAF5EE]">
              Zafran Heritage Block Prints
            </h4>
          </div>
          <Link
            href="/shop"
            className="px-3.5 py-1.5 rounded-full bg-[#342722] text-[#D6B878] text-xs font-semibold hover:bg-[#4A3932] transition-colors shadow-sm"
          >
            Shop Collection
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Pearl Emblem Badge with Gentle Orbit */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.15, rotate: 6 }}
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white dark:bg-[#1A1310] p-2 shadow-2xl border-2 border-[#D6B878] flex items-center justify-center cursor-pointer z-20 group"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF9F2] to-[#E7D8C5] dark:from-[#2A1F19] dark:to-[#140F0D] flex flex-col items-center justify-center text-center p-1 border border-[#D6B878]/40 shadow-inner">
          <span className="font-serif-luxury text-[13px] font-bold text-[#342722] dark:text-[#FAF5EE] leading-none group-hover:text-[#B89A58] transition-colors">
            ETERNAL
          </span>
          <span className="font-serif-luxury text-xs font-bold text-[#B89A58]">6</span>
        </div>
      </motion.div>
    </div>
  );
}
