"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  CloudLightning, 
  Cpu, 
  Atom, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Zap, 
  Terminal,
  Activity,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { INITIAL_SERVICES, ServiceItem } from "@/lib/initial-data";
import ThesisConsultancySection from "./ThesisConsultancySection";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string>("SaaS");
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#thesis-consultancy") {
      setActiveTab("R&D");
    }
  }, []);

  const activeService = services.find((s) => s.pillar === activeTab) || services[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 24 },
    },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.35,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 mb-16 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-400 shadow-sm"
        >
          <Layers className="w-3.5 h-3.5 animate-pulse" />
          <span>THREE FOUNDATIONAL CAPABILITIES</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineered for Extreme Reliability & Complexity
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We combine distributed cloud mechanics, multi-agent cognitive autonomy, and frontier mathematical R&D to solve previously intractable problems.
        </p>
      </motion.div>

      {/* 3 Pillar Selectors with Staggered Motion and Gliding layoutId */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10"
      >
        {services.map((service) => {
          const isSelected = activeTab === service.pillar;
          let iconComponent = <CloudLightning className="w-6 h-6" />;
          let accentColor = "from-cyan-500/20 to-cyan-500/5 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30";
          let activeBorder = "border-cyan-500 shadow-cyan-500/20";

          if (service.pillar === "Automation") {
            iconComponent = <Cpu className="w-6 h-6" />;
            accentColor = "from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/30";
            activeBorder = "border-purple-500 shadow-purple-500/20";
          } else if (service.pillar === "R&D") {
            iconComponent = <Atom className="w-6 h-6" />;
            accentColor = "from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30";
            activeBorder = "border-emerald-500 shadow-emerald-500/20";
          }

          return (
            <motion.button
              key={service.id}
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(service.pillar)}
              className={`text-left p-6 sm:p-7 rounded-2xl transition-colors duration-200 relative overflow-hidden group border cursor-pointer ${
                isSelected
                  ? "bg-white dark:bg-slate-900/95 border-transparent shadow-xl dark:shadow-[0_0_35px_rgba(0,240,255,0.18)]"
                  : "bg-white/80 dark:bg-slate-950/60 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-900/50 shadow-sm dark:shadow-none"
              }`}
            >
              {/* Animated Gliding Active Indicator */}
              {isSelected && (
                <motion.div
                  layoutId="activePillarGlow"
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none z-10"
                  style={{
                    borderColor:
                      service.pillar === "SaaS"
                        ? "rgb(6, 182, 212)"
                        : service.pillar === "Automation"
                        ? "rgb(168, 85, 247)"
                        : "rgb(16, 185, 129)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-gradient-to-br ${accentColor} transition-transform`}
                >
                  {iconComponent}
                </motion.div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  PILLAR // 0{service.order_index}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {service.tagline}
              </p>

              {service.pillar === "R&D" && (
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Thesis Consultancy • 3 Defended Papers</span>
                </div>
              )}

              {/* Bottom active accent bar */}
              {isSelected && (
                <motion.div
                  layoutId="activePillarBar"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Active Pillar Deep Dive Display with Smooth Tab Transitions */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100/80 dark:from-[#0a1128]/80 dark:to-[#050814]/90 border border-slate-200 dark:border-cyan-500/20 backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 rounded text-xs font-mono bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-semibold"
                  >
                    DEEP DIVE: {activeService.pillar.toUpperCase()}
                  </motion.span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {activeService.pillar === "R&D" ? "PEER REVIEWED & EMPIRICALLY VALIDATED" : "ISO-27001 & SOC-2 COMPLIANT"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {activeService.title}
                </h3>

                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                  {activeService.description}
                </p>

                {/* Core Feature List with Animated Stagger */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    {activeService.pillar === "R&D" ? "Research Thrusts & Thesis Deliverables:" : "Architectural Deliverables & Core Capabilities:"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        custom={idx}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                          x: 4,
                          transition: { duration: 0.15 },
                        }}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200 shadow-sm dark:shadow-none"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {activeService.pillar === "R&D" ? (
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="#thesis-consultancy"
                      className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Explore Thesis Consultancy Posters</span>
                    </motion.a>
                  ) : (
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="#contact"
                      className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
                    >
                      <span>Request Engineering Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  )}

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="/projects"
                    className="px-5 py-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-300 transition-colors shadow-sm"
                  >
                    View Verified Deployments
                  </motion.a>
                </div>
              </div>

              {/* Right Architecture Terminal HUD */}
              <div className="lg:col-span-5 p-6 rounded-xl bg-slate-900 dark:bg-[#030712] border border-slate-700 dark:border-white/10 font-mono text-xs space-y-4 shadow-2xl text-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 dark:border-white/10 text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400">quantrix-kernel.telemetry</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    STATUS: LIVE
                  </span>
                </div>

                <div className="space-y-2 text-slate-300 text-[11px]">
                  <div className="text-slate-500">
                    # Executing operational runtime telemetry check...
                  </div>
                  <motion.div
                    key={activeService.pillar}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-cyan-300 flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>TARGET_PILLAR: {activeService.pillar.toUpperCase()}</span>
                  </motion.div>

                  {activeService.pillar === "R&D" ? (
                    <>
                      <div className="text-emerald-400 font-semibold">
                        &gt; Track: Thesis Consultancy & Frontier Neural Systems
                      </div>
                      <div className="text-slate-400">
                        &gt; Institution Partner: BGC Trust University Bangladesh
                      </div>
                      <div className="text-slate-400">
                        &gt; DRL Frequency Engine: Soft Actor-Critic (~5.48s settle)
                      </div>
                      <div className="text-slate-400">
                        &gt; Clinical Health ML: SMOTETomek + Stacking (24.2% recall)
                      </div>
                      <div className="text-slate-400">
                        &gt; Medical Vision: VGG16 + Multi-Head Self-Attention (95.71%)
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>&gt; Validation: 3 Defended Posters & Peer Benchmarks</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-slate-400">
                        &gt; Ingestion Engine: Kafka Event Streaming Mesh [READY]
                      </div>
                      <div className="text-slate-400">
                        &gt; Consensus Layer: Byzantine Fault Tolerant Raft [SYNCED]
                      </div>
                      <div className="text-slate-400">
                        &gt; Crypto Guard: Post-Quantum Lattice Encapsulation [ACTIVE]
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>&gt; Verification: Zero Critical CVEs / 100% Policy Pass</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{activeService.pillar === "R&D" ? "ACADEMIC ADVISORY: ACTIVE" : "BUFFER: 0.04ms"}</span>
                  <span>{activeService.pillar === "R&D" ? "PEER REVIEW: BGC TRUST UNIV" : "CIPHER: AES-256-GCM / KYBER-1024"}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thesis Consultancy Showcase when R&D is active */}
      {activeTab === "R&D" && <ThesisConsultancySection />}

      {/* Cross-pillar navigation banner when on SaaS or Automation */}
      {activeTab !== "R&D" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>R&D Track: Thesis Consultancy</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono">
                  3 Defended Papers
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Explore student & faculty research in DRL microgrids, diabetes prediction, and retinopathy vision.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTab("R&D");
              setTimeout(() => {
                const el = document.getElementById("thesis-consultancy");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-lg shadow-emerald-600/20"
          >
            <span>Explore Thesis Consultancy in R&D</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
