"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Database, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Server, 
  Network,
  Code2,
  Lock,
  Layers
} from "lucide-react";

interface TechCapability {
  title: string;
  category: "Distributed" | "AI/Agentic" | "Crypto/R&D" | "Interface";
  leadTech: string;
  description: string;
  specs: string[];
  latency: string;
}

const TECH_CAPABILITIES: TechCapability[] = [
  {
    title: "High-Throughput Distributed Telemetry",
    category: "Distributed",
    leadTech: "Rust + Apache Kafka + ClickHouse",
    description: "In-memory circular ring buffers and zero-copy packet deserialization for 10M+ events/second per cluster.",
    specs: ["Zero-copy deserialization", "eBPF kernel probes", "Sub-2ms aggregation"],
    latency: "< 1.2ms",
  },
  {
    title: "Autonomous Multi-Agent Orchestration",
    category: "AI/Agentic",
    leadTech: "LangGraph + Python + vLLM",
    description: "Hierarchical cognitive agent networks with formal semantic routing and self-correcting execution branches.",
    specs: ["Dynamic DAG planning", "Deterministic guardrails", "State memory vector index"],
    latency: "< 180ms",
  },
  {
    title: "Post-Quantum Cryptographic Enclaves",
    category: "Crypto/R&D",
    leadTech: "CUDA + C++20 + Kyber Lattice",
    description: "NIST FIPS 203/204 compliant lattice-based key encapsulation mechanism accelerated with custom GPU kernels.",
    specs: ["Lattice encryption (ML-KEM)", "GPU SIMD acceleration", "Side-channel hardened"],
    latency: "< 0.4ms",
  },
  {
    title: "High-Fidelity Enterprise Control Planes",
    category: "Interface",
    leadTech: "Next.js App Router + TypeScript + Three.js",
    description: "Real-time reactive visual telemetry dashboards with 60fps WebGL visualizations and end-to-end type safety.",
    specs: ["Server Actions & SSR", "Streaming WebSockets", "Strict CSP & RLS"],
    latency: "< 16ms render",
  },
  {
    title: "Zero-Trust Mesh & Identity Isolation",
    category: "Distributed",
    leadTech: "Envoy + SPIFFE/SPIRE + Go",
    description: "Ephemeral cryptographic identity issuance and mutual TLS traffic enforcement for sovereign enterprise enclaves.",
    specs: ["Automated certificate rotation", "Zero hardcoded credentials", "Granular L7 policies"],
    latency: "< 0.05ms hop",
  },
  {
    title: "Edge Vision Transformer Inference",
    category: "AI/Agentic",
    leadTech: "TensorRT + PyTorch + WebRTC",
    description: "INT8-quantized visual inspection neural nets compiled directly for low-power edge accelerators.",
    specs: ["240 FPS continuous feed", "3.2W thermal envelope", "Micron-level defect recall"],
    latency: "< 4.1ms frame",
  },
];

export default function TechMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Distributed", "AI/Agentic", "Crypto/R&D", "Interface"];

  const filtered = TECH_CAPABILITIES.filter(
    (cap) => selectedCategory === "All" || cap.category === selectedCategory
  );

  return (
    <section id="tech" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/30 text-xs font-mono text-purple-700 dark:text-purple-300">
          <Terminal className="w-3.5 h-3.5" />
          <span>TECHNOLOGY CAPABILITY MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Battle-Tested Engineering Primitives
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We reject superficial wrappers. Every system we build is architected from deep low-level primitives to deliver deterministic performance.
        </p>
      </motion.div>

      {/* Category selector with Motion */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-purple-600 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                : "bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Matrix Grid with Motion */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((item, index) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#070d1d]/90 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/40 transition-colors flex flex-col justify-between space-y-4 group shadow-lg hover:shadow-xl dark:shadow-lg dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {item.latency}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                  &gt; {item.leadTech}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Spec pills */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-500">Benchmark Specs:</div>
                <div className="flex flex-wrap gap-1">
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
