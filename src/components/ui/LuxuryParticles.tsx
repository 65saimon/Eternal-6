"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export function LuxuryParticles({ count = 28 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(214, 184, 120, 0.45)", // Champagne Gold
      "rgba(184, 154, 88, 0.35)",  // Metallic Gold
      "rgba(255, 249, 242, 0.7)",   // Pearl Ivory
      "rgba(244, 235, 221, 0.5)",   // Warm Ivory
    ];

    const items: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 3.7) % 100,
      y: (i * 7.3) % 100,
      size: 2.5 + ((i * 1.8) % 4.5),
      duration: 6 + ((i * 2.3) % 8),
      delay: (i * 0.4) % 4,
      opacity: 0.3 + ((i * 0.1) % 0.5),
      color: colors[i % colors.length],
    }));

    setParticles(items);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-8, 8, -8],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
