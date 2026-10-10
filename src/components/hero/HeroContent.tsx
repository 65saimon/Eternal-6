"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Activity,
  Zap,
  Lock
} from "lucide-react";
import OrbitalHeroCanvas from "./OrbitalHeroCanvas";

export default function HeroContent() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 cyber-grid">
      {/* 3D Three.js Orbital Hero Canvas in Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-85 dark:opacity-85">
        <OrbitalHeroCanvas className="w-full h-full max-w-[1400px]" particleCount={800} />
      </div>

      {/* Gradient Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/80 dark:from-[#030712]/70 via-transparent to-[#f8fafc] dark:to-[#030712] pointer-events-none z-1" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Central Content with Motion */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Operational Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] animate-pulse"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
          <span className="text-slate-500 dark:text-slate-400">CORE ARCHITECTURE:</span>
          <span className="font-semibold text-slate-900 dark:text-white">QUANTRIX INTELLIGENCE MESH v2.4</span>
        </motion.div>

        {/* Hero Title with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.08]">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 dark:from-cyan-400 dark:via-teal-300 dark:to-purple-400">Autonomous SaaS</span>, Intelligent Swarms & Frontier R&D.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Quantrix designs zero-latency cloud platforms, self-orchestrating multi-agent networks, and quantum-resistant algorithms for enterprises operating at planetary scale.
          </p>
        </motion.div>

        {/* Action Buttons with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 group"
            >
              <span>Explore Deployed Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#services"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-sm"
            >
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Discover Strategic Pillars</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Live Operational Metrics HUD with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-10 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/85 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl">
            <div className="text-left p-3 border-r border-slate-200 dark:border-white/5 last:border-0">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono mb-1">
                <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>THROUGHPUT</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">14.8M</div>
              <div className="text-[11px] text-slate-500">ops/sec distributed</div>
            </div>

            <div className="text-left p-3 border-r border-slate-200 dark:border-white/5 last:border-0">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>P99 LATENCY</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">&lt; 1.2ms</div>
              <div className="text-[11px] text-slate-500">edge execution</div>
            </div>

            <div className="text-left p-3 border-r border-slate-200 dark:border-white/5 last:border-0">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono mb-1">
                <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>AGENT SWARMS</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-purple-600 dark:text-purple-300">24 Nodes</div>
              <div className="text-[11px] text-slate-500">active reasoning mesh</div>
            </div>

            <div className="text-left p-3">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>VERIFICATION</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">SOC-2 / ISO</div>
              <div className="text-[11px] text-slate-500">zero-trust isolation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
