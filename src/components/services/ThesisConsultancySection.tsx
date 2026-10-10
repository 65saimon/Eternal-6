"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  User, 
  Award, 
  Building2, 
  Calendar, 
  ExternalLink, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  BarChart3, 
  Sparkles, 
  FileText,
  Layers,
  ChevronRight,
  Eye,
  Sliders
} from "lucide-react";

export interface ThesisPaper {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorId: string;
  authorBatch?: string;
  supervisor: string;
  supervisorTitle: string;
  department: string;
  institution: string;
  date: string;
  categoryBadge: string;
  primaryImage: string;
  secondaryImage?: string;
  abstract: string;
  problemStatement: string;
  methodology: string[];
  keyFindings: string[];
  metrics: { label: string; value: string; detail: string }[];
  tags: string[];
}

export const THESIS_PAPERS: ThesisPaper[] = [
  {
    id: "microgrid-drl",
    slug: "microgrid-autonomous-frequency-control",
    title: "Deep Reinforcement Learning for Autonomous Frequency Control in Multi-Source Microgrids",
    subtitle: "Real-time Soft Actor-Critic (SAC) & AutoEncoder state compression for frequency stabilization under high renewable penetration.",
    author: "Sardnnus Mahabub",
    authorId: "2220203083",
    supervisor: "Sumiya Tas Noor",
    supervisorTitle: "Lecturer",
    department: "Department of Computer Science and Engineering",
    institution: "BGC Trust University Bangladesh",
    date: "June 2025",
    categoryBadge: "Reinforcement Learning & Power Systems",
    primaryImage: "/images/thesis/microgrid-drl-frequency-control.jpg",
    abstract:
      "Frequency stability is vital for reliable operation of microgrids with renewable and conventional sources. This research develops a Deep Reinforcement Learning (DRL) framework for autonomous frequency control in multi-source microgrids. Using a Soft Actor-Critic (SAC) agent, the system learns optimal control actions from real-time states to minimize frequency deviations. Simulation results demonstrate significant improvement in frequency regulation, reduced overshoot, and faster stability compared to conventional controllers (PID, Droop).",
    problemStatement:
      "Increasing penetration of renewable energy causes high variability and frequency instability. Conventional controllers (PID, Droop) have limitations in adaptability and performance. An intelligent learning-based approach ensures faster response and robust stability in complex, nonlinear microgrid environments.",
    methodology: [
      "Simulated environment with solar, wind, battery, and load models generated in MATLAB/Simulink (2,591,674 simulation data points).",
      "Soft Actor-Critic (SAC) reinforcement learning agent with Experience Replay Buffer, Actor-Critic networks (Q1, Q2), and policy update.",
      "AutoEncoder-augmented SAC (AE-SAC) for state space dimensionality reduction (9-D state space mapped to compressed representations).",
      "Benchmark evaluation against standard industrial PID and Droop controllers under dynamic load disturbance scenarios.",
    ],
    keyFindings: [
      "AE-SAC achieved the fastest settling time (~5.48s) with minimal overshoot, compared to 12.37s for PID and 22.82s for Droop.",
      "Frequency deviation maintained within tight ±0.15 Hz tolerance bounds across all disturbance scenarios.",
      "Pos. RMSE reduced to 0.0492 Hz and Neg. RMSE to 0.0231 Hz (best among all controllers).",
      "Integral Absolute Error (IAE) dropped to 0.136, showing superior transient and steady-state stability.",
    ],
    metrics: [
      { label: "Simulation Points", value: "2,591,674", detail: "MATLAB/Simulink" },
      { label: "Settling Time", value: "~5.48 s", detail: "vs 12.37s PID / 22.82s Droop" },
      { label: "IAE Score", value: "0.136", detail: "Lowest Error Index" },
      { label: "Freq Deviation", value: "±0.15 Hz", detail: "Optimal Regulation" },
    ],
    tags: ["Deep Reinforcement Learning", "Soft Actor-Critic", "MATLAB / Simulink", "AutoEncoder-SAC", "Microgrid Stability"],
  },
  {
    id: "diabetes-prediction",
    slug: "type2-diabetes-early-prediction-ml",
    title: "Early Prediction of Type-2 Diabetes Using Machine Learning Techniques on CDC Diabetes Health Indicators",
    subtitle: "Clinical ensemble pipeline utilizing SMOTETomek resampling and Stacking Ensemble to overcome severe class imbalance.",
    author: "Shahidul Hoque",
    authorId: "22023907",
    supervisor: "Rezuana Haque Megha",
    supervisorTitle: "Lecturer, Dept. of CSE",
    department: "Department of Computer Science and Engineering",
    institution: "BGC Trust University Bangladesh",
    date: "July 2026",
    categoryBadge: "Clinical Health Informatics & Ensemble ML",
    primaryImage: "/images/thesis/type2-diabetes-prediction-dark.png",
    secondaryImage: "/images/thesis/type2-diabetes-prediction-light.jpg",
    abstract:
      "This study develops a machine learning pipeline for early prediction of Type-2 diabetes using the CDC Behavioral Risk Factor Surveillance System (BRFSS 2015) dataset across 229,781 records (No Diabetes 82.7%, Pre-diabetes 2.0%, Diabetes 15.3%). Severe class imbalance is resolved using SMOTETomek before comparing Random Forest, Multi-Layer Perceptron (MLP), Weighted Voting, and Stacking Ensemble models. The Stacking Ensemble achieves the best minority-class sensitivity with 24.2% Pre-diabetes recall and Macro-F1 of 0.437.",
    problemStatement:
      "Type-2 diabetes affects 537 million adults globally. Pre-diabetes is severely underrepresented (2.0%), causing traditional machine learning models to falsely report high accuracy (>83%) by simply predicting majority classes while failing 100% of pre-diabetes cases (0% recall). Clinically meaningful evaluation requires balanced sensitivity.",
    methodology: [
      "Analyzed 229,781 survey responses from CDC BRFSS 2015 with 21 core features.",
      "Engineered 6 novel risk features: risk_score, age_bmi_interaction, healthy_score, total_poor_health_days, BMI_category, and healthcare_barrier.",
      "Applied SMOTETomek hybrid resampling to training data only (preserving natural class distribution in test splits).",
      "Trained and evaluated Random Forest (200 trees), Multi-Layer Perceptron (256->128->64 neurons), Weighted Voting Ensemble, and Stacking Ensemble.",
    ],
    keyFindings: [
      "Standard accuracy alone proved misleading: baseline models achieved 83.3% accuracy but 0% Pre-diabetes recall.",
      "MLP completely collapsed to majority prediction when unassisted by ensemble meta-learning.",
      "Stacking Ensemble emerged as the top clinical model, achieving 24.2% Pre-diabetes recall and 57.9% Diabetes recall.",
      "Feature engineering demonstrated that age-BMI synergy and engineered risk scores are top-ranked predictors.",
    ],
    metrics: [
      { label: "CDC Records", value: "229,781", detail: "BRFSS 2015 Dataset" },
      { label: "Pre-DM Recall", value: "24.2%", detail: "Best in class (vs 0% baseline)" },
      { label: "Diabetes Recall", value: "57.9%", detail: "Clinical Sensitivity" },
      { label: "Macro-F1 Score", value: "0.437", detail: "Balanced Metric" },
    ],
    tags: ["Ensemble Learning", "SMOTETomek", "CDC BRFSS", "Feature Engineering", "Clinical Diagnostics"],
  },
  {
    id: "diabetic-retinopathy",
    slug: "diabetic-retinopathy-multihead-attention",
    title: "Deep Learning Model for Diabetic Retinopathy Disease Classification",
    subtitle: "Attention-augmented transfer learning pipeline combining frozen CNN backbones with Multi-Head Self-Attention.",
    author: "Md. Towhidul Islam",
    authorId: "220239088",
    authorBatch: "Batch 39th",
    supervisor: "Md. Abdul Wahab",
    supervisorTitle: "Lecturer",
    department: "Department of Computer Science and Engineering",
    institution: "BGC Trust University Bangladesh",
    date: "Academic Session 2025",
    categoryBadge: "Medical Computer Vision & Attention CNNs",
    primaryImage: "/images/thesis/diabetic-retinopathy-classification.jpg",
    abstract:
      "Diabetic Retinopathy (DR) is a progressive complication of diabetes damaging retinal blood vessels and leading to blindness. This research proposes an attention-augmented transfer-learning framework: frozen ImageNet-pretrained backbones (VGG16, MobileNetV2, ResNet50, DenseNet121, EfficientNetB0) are enhanced with Multi-Head Self-Attention, allowing the network to weigh diagnostically important regions (microaneurysms, hemorrhages, exudates). VGG16 + Attention achieves 95.71% test accuracy and QWK of 0.9143.",
    problemStatement:
      "A global shortage of ophthalmologists combined with rising diabetes incidence creates an urgent need for automated first-line screening. Manual grading is labor-intensive and subject to inter-observer variability. Highly sensitive, lesion-aware neural vision models are essential for accessible point-of-care diagnostics.",
    methodology: [
      "Curated 2,076 Kaggle retinal fundus images (1,050 DR / 1,026 No-DR) with random oversampling to 2,100 balanced images.",
      "Stratified split into 80% train (1,680), 10% validation (210), and 10% test (210) sets.",
      "Multi-Head Attention layers coupled to VGG16 / MobileNetV2 feature maps followed by Global Average Pooling, Dropout, and Sigmoid classification.",
      "Trained with Adam optimizer (lr=0.0001) and binary cross-entropy loss over 20 epochs with early stopping.",
    ],
    keyFindings: [
      "Attention-augmented VGG16 achieved 95.71% test accuracy, outperforming standard ResNet50 (90.95%) with fewer parameters.",
      "Quadratic Weighted Kappa (QWK) reached 0.9143, indicating near-perfect agreement with clinical ophthalmologists.",
      "Test confusion matrix demonstrated 96 DR and 105 No-DR correctly identified out of 210 test samples.",
      "MobileNetV2 + Attention attained 98.10% accuracy, demonstrating suitability for lightweight edge deployment.",
    ],
    metrics: [
      { label: "Test Accuracy", value: "95.71%", detail: "VGG16 + Multi-Head Attention" },
      { label: "Kappa Score (QWK)", value: "0.9143", detail: "Near-Perfect Clinical Agreement" },
      { label: "Macro F1-Score", value: "0.96", detail: "High Precision & Recall" },
      { label: "Fundus Dataset", value: "2,076", detail: "Retinal Clinical Images" },
    ],
    tags: ["Multi-Head Attention", "VGG16 / MobileNetV2", "Transfer Learning", "Retinal Fundus Vision", "Quadratic Weighted Kappa"],
  },
];

export default function ThesisConsultancySection() {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(THESIS_PAPERS[0].id);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [activeVariant, setActiveVariant] = useState<"primary" | "secondary">("primary");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedPaper = THESIS_PAPERS.find((p) => p.id === selectedPaperId) || THESIS_PAPERS[0];

  const currentPosterImage =
    activeVariant === "secondary" && selectedPaper.secondaryImage
      ? selectedPaper.secondaryImage
      : selectedPaper.primaryImage;

  const openLightbox = (src: string, title: string) => {
    setLightboxImage({ src, title });
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setZoomLevel(1);
  };

  return (
    <div id="thesis-consultancy" className="mt-14 pt-12 border-t border-emerald-500/20 relative">
      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 mb-10 text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/30 text-xs font-mono text-emerald-800 dark:text-emerald-400 font-semibold shadow-sm"
        >
          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span>APPLIED R&D // THESIS CONSULTANCY DIVISION</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Thesis Consultancy: Frontier AI, Microgrid Control & Clinical Diagnostics
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          In collaboration with researchers and faculty at{" "}
          <strong className="text-slate-800 dark:text-slate-200 font-semibold">
            BGC Trust University Bangladesh
          </strong>
          , our R&D consultancy mentors and engineers state-of-the-art neural architectures, simulation models, and publication-ready defense telemetry.
        </motion.p>
      </div>

      {/* Paper Selector Tabs */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {THESIS_PAPERS.map((paper, idx) => {
          const isSelected = paper.id === selectedPaperId;
          return (
            <button
              key={paper.id}
              onClick={() => {
                setSelectedPaperId(paper.id);
                setActiveVariant("primary");
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2.5 cursor-pointer border ${
                isSelected
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20 scale-[1.02]"
                  : "bg-white/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-900"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                0{idx + 1}
              </span>
              <span className="truncate max-w-[200px] sm:max-w-[260px] text-left">
                {paper.title.split("for")[0].split("Using")[0].split("with")[0].trim()}
              </span>
              {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Active Paper Interactive Showcase Card */}
      <motion.div
        key={selectedPaper.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 rounded-3xl bg-white/90 dark:bg-slate-950/80 border border-emerald-500/20 backdrop-blur-xl shadow-2xl p-6 sm:p-10 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Research Poster Visual & Lightbox Launcher */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative group rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-950 shadow-xl dark:shadow-emerald-950/30">
              
              {/* Poster Image Container */}
              <div 
                onClick={() => openLightbox(currentPosterImage, selectedPaper.title)}
                className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden cursor-zoom-in bg-slate-950"
              >
                <Image
                  src={currentPosterImage}
                  alt={selectedPaper.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white pointer-events-none p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider uppercase bg-black/70 px-3 py-1 rounded-full">
                    Click to inspect full defense poster
                  </span>
                </div>
              </div>

              {/* Poster Controls Bar */}
              <div className="p-3 bg-slate-900/95 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-slate-400">RESEARCH POSTER SPEC</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* If secondary image available (e.g. Diabetes poster has dark and light versions) */}
                  {selectedPaper.secondaryImage && (
                    <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-white/10">
                      <button
                        onClick={() => setActiveVariant("primary")}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          activeVariant === "primary"
                            ? "bg-emerald-500 text-slate-950"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Cyber Dark
                      </button>
                      <button
                        onClick={() => setActiveVariant("secondary")}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          activeVariant === "secondary"
                            ? "bg-emerald-500 text-slate-950"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Clean Light
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => openLightbox(currentPosterImage, selectedPaper.title)}
                    className="px-2.5 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Enlarge</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedPaper.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-center space-y-1"
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {m.label}
                  </div>
                  <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Research Dossier & Academic Credentials */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Badges & Publication Meta */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
                {selectedPaper.categoryBadge}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {selectedPaper.date}
              </span>
            </div>

            {/* Title */}
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {selectedPaper.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {selectedPaper.subtitle}
              </p>
            </div>

            {/* Academic Authorship & Institution Card */}
            <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Author / Researcher
                    </div>
                    <div className="text-slate-900 dark:text-slate-200 font-bold">
                      {selectedPaper.author}
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      ID: {selectedPaper.authorId} {selectedPaper.authorBatch ? `• ${selectedPaper.authorBatch}` : ""}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Thesis Supervisor
                    </div>
                    <div className="text-slate-900 dark:text-slate-200 font-bold">
                      {selectedPaper.supervisor}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {selectedPaper.supervisorTitle}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-500/10 flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                <Building2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {selectedPaper.department} • <strong className="text-slate-800 dark:text-slate-200">{selectedPaper.institution}</strong>
                </span>
              </div>
            </div>

            {/* Problem & Findings Accordion-like cards */}
            <div className="space-y-3">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Abstract & Problem Statement</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                  {selectedPaper.abstract}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Empirical Findings & Breakthroughs</span>
                </div>
                <div className="space-y-2">
                  {selectedPaper.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/15"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-2">
                Applied Technologies & Frameworks:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedPaper.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openLightbox(currentPosterImage, selectedPaper.title)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Full Poster</span>
              </button>

              <Link
                href={`/projects/${selectedPaper.slug}`}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 font-mono text-xs font-medium transition-colors flex items-center gap-2"
              >
                <span>View Full Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox / High-Resolution Poster Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-4 sm:p-6"
          >
            {/* Modal Top Control Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                  HIGH-RES DEFENSE POSTER
                </span>
                <h5 className="text-sm font-semibold truncate max-w-[280px] sm:max-w-[500px]">
                  {lightboxImage.title}
                </h5>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.25))}
                    className="p-1.5 hover:bg-white/10 rounded text-slate-300 hover:text-white transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-mono text-xs text-slate-400">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                    className="p-1.5 hover:bg-white/10 rounded text-slate-300 hover:text-white transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 hover:bg-white/10 rounded text-slate-300 hover:text-white transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct File Link */}
                <a
                  href={lightboxImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Raw File</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Poster Canvas Viewport */}
            <div 
              className="flex-grow overflow-auto flex items-center justify-center p-2 sm:p-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out",
                }}
                className="max-w-full max-h-[86vh] relative flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="max-h-[84vh] w-auto object-contain rounded-lg shadow-2xl border border-white/20"
                />
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>BGC Trust University Bangladesh • Dept. of Computer Science & Engineering</span>
              <span>Use mouse wheel or zoom buttons to inspect diagrams and formulas</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
