"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  colorClass: string;
}

export default function BubbleMotion() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Mouse parallax motion for large ambient bubbles
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Generate deterministic floating micro-bubbles once mounted on client
    const colorClasses = [
      "from-cyan-400/25 to-blue-500/10 border-cyan-400/30",
      "from-purple-400/25 to-violet-600/10 border-purple-400/30",
      "from-teal-300/20 to-emerald-500/10 border-teal-300/30",
      "from-indigo-400/25 to-cyan-500/10 border-indigo-400/30",
    ];

    const generated: Bubble[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      size: 14 + ((i * 17) % 36), // sizes between 14px and 50px
      left: 3 + ((i * 23) % 94), // distributed horizontally 3% to 97%
      duration: 12 + ((i * 7) % 16), // duration between 12s and 28s
      delay: (i * 1.3) % 10,
      drift: ((i % 2 === 0 ? 1 : -1) * (20 + ((i * 13) % 40))),
      colorClass: colorClasses[i % colorClasses.length],
    }));

    setBubbles(generated);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 60;
      const y = (e.clientY / innerHeight - 0.5) * 60;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Large Ambient Floating Gradient Orbs (Organic Bubble Physics) */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0"
      >
        {/* Big Bubble 1 (Cyan/Teal) */}
        <motion.div
          animate={{
            x: [0, 70, -40, 0],
            y: [0, -90, 50, 0],
            scale: [1, 1.22, 0.92, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[12%] left-[10%] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-400/15 to-transparent blur-[80px] dark:blur-[100px] opacity-75"
        />

        {/* Big Bubble 2 (Purple/Violet) */}
        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.25, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] right-[8%] w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full bg-gradient-to-bl from-purple-600/20 via-violet-500/15 to-transparent blur-[90px] dark:blur-[110px] opacity-70"
        />

        {/* Big Bubble 3 (Emerald/Cyan) */}
        <motion.div
          animate={{
            x: [0, 60, -50, 0],
            y: [0, -70, 40, 0],
            scale: [1, 1.18, 0.94, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[65%] left-[20%] w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] rounded-full bg-gradient-to-r from-emerald-500/15 via-cyan-400/15 to-transparent blur-[85px] dark:blur-[100px] opacity-65"
        />

        {/* Big Bubble 4 (Indigo/Electric Pink) */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 60, -50, 0],
            scale: [1, 1.15, 0.88, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[82%] right-[18%] w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-gradient-to-tl from-indigo-500/20 via-purple-500/15 to-transparent blur-[85px] dark:blur-[100px] opacity-60"
        />
      </motion.div>

      {/* 2. Rising Translucent Glass Micro-Bubbles Stream */}
      <div className="absolute inset-0">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              y: "105vh",
              x: 0,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              y: "-10vh",
              x: [0, b.drift, -b.drift * 0.7, 0],
              opacity: [0, 0.65, 0.8, 0.3, 0],
              scale: [0.6, 1, 1.08, 0.95, 0.5],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "linear",
            }}
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
            className={`absolute rounded-full border bg-gradient-to-tr shadow-sm backdrop-blur-[2px] ${b.colorClass} shadow-cyan-500/10`}
          >
            {/* Specular glass reflection highlight */}
            <div className="absolute top-[18%] left-[22%] w-[28%] h-[28%] rounded-full bg-white/70 blur-[0.5px]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
