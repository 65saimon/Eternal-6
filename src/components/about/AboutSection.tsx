"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Lock, 
  CheckCircle, 
  Award, 
  Network, 
  Globe2 
} from "lucide-react";

export default function AboutSection() {
  const compliancePoints = [
    { title: "SOC-2 Type II Certified", desc: "Rigorous annual 3rd-party trust services audit." },
    { title: "ISO/IEC 27001 Standard", desc: "Formalized global information security governance." },
    { title: "Zero-Trust Mesh Model", desc: "Mutual TLS cryptographic enforcement on every packet." },
    { title: "Sovereign Cloud Enclaves", desc: "Air-gapped deployment capability across on-prem & sovereign VPCs." },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#070d1d]/80 border border-slate-200 dark:border-white/10 relative overflow-hidden backdrop-blur-xl shadow-xl dark:shadow-2xl"
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE QUANTRIX DOCTRINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Engineering Sovereign Advantage for High-Consequence Operations.
            </h2>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Quantrix Intelligence was founded on a singular premise: the next decade of enterprise supremacy will not be won with off-the-shelf wrappers or brittle prototypes, but with mathematically rigorous, autonomous systems that operate without failure.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We deploy elite cross-functional squads spanning distributed systems architects, neural research scientists, and security engineers directly into defense contractors, sovereign wealth entities, and Fortune 50 platforms.
            </p>

            {/* Compliance Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {compliancePoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 space-y-1"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{pt.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 pl-5">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Blueprint Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900 dark:bg-[#030712] border border-slate-700 dark:border-cyan-500/30 shadow-2xl space-y-6 font-mono relative text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 dark:border-white/10 pb-4">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                SYSTEM STACK HIERARCHY
              </span>
              <span className="text-[10px] text-slate-500">REV 4.2 // CLASSIFIED</span>
            </div>

            {/* Layer 3 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-slate-800 dark:bg-slate-900/90 border border-purple-500/40 space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-purple-300 font-bold">
                <span>LAYER 03: FRONTIER R&D</span>
                <span className="text-[10px] text-slate-500">EXEC</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Post-quantum lattice ciphers, neuromorphic edge compilation, causal physics engines.
              </p>
            </motion.div>

            {/* Connecting line */}
            <div className="flex justify-center -my-2 text-slate-600">│</div>

            {/* Layer 2 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-slate-800 dark:bg-slate-900/90 border border-cyan-500/40 space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                <span>LAYER 02: AUTONOMOUS MESH</span>
                <span className="text-[10px] text-slate-500">AGENTIC</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cognitive agent swarms, deterministic semantic guardrails, self-healing data pipelines.
              </p>
            </motion.div>

            {/* Connecting line */}
            <div className="flex justify-center -my-2 text-slate-600">│</div>

            {/* Layer 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-slate-800 dark:bg-slate-900/90 border border-emerald-500/40 space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                <span>LAYER 01: SOVEREIGN SAAS CORE</span>
                <span className="text-[10px] text-slate-500">INFRA</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Zero-trust mTLS isolation, eBPF telemetry bus, sub-millisecond distributed state.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
