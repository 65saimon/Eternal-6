"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  GitBranch, 
  ArrowUpRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Sparkles,
  RotateCcw
} from "lucide-react";
import { ProjectItem } from "@/lib/initial-data";

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isCardMuted, setIsCardMuted] = useState(true);
  const [isCardPlaying, setIsCardPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [modalMuted, setModalMuted] = useState(false);
  const [modalTime, setModalTime] = useState(0);
  const [modalDuration, setModalDuration] = useState(0);

  let categoryBadgeClass = "bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40";
  if (project.category === "Automation") {
    categoryBadgeClass = "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40";
  } else if (project.category === "R&D") {
    categoryBadgeClass = "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40";
  }

  // Handle card sound toggle
  const toggleCardMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsCardMuted(nextMuted);
  };

  // Handle card play/pause toggle
  const toggleCardPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    if (isCardPlaying) {
      videoRef.current.pause();
      setIsCardPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsCardPlaying(true)).catch(() => {});
    }
  };

  // Open modal
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // Pause card video while modal is active
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsModalOpen(true);
    setModalPlaying(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (videoRef.current && isCardPlaying) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isCardPlaying]);

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="group relative rounded-2xl bg-white dark:bg-[#070d1d]/80 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-xl dark:shadow-xl dark:hover:shadow-[0_10px_35px_rgba(0,240,255,0.1)]"
      >
        {/* Cover Media Container (Video or Image) */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-950">
          {project.video_url ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={project.video_url}
                poster={project.cover_image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Ambient cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/30 pointer-events-none" />

              {/* Video Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold uppercase border backdrop-blur-md ${categoryBadgeClass}`}
                >
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-red-950/70 border border-red-500/40 text-red-300 backdrop-blur-md shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  THEME VIDEO
                </span>
              </div>

              {/* Video Quick Controls (Sound & Expand Modal) */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
                {/* Audio Toggle */}
                <button
                  onClick={toggleCardMute}
                  className={`p-1.5 rounded-lg border backdrop-blur-md transition-all ${
                    !isCardMuted
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.5)]"
                      : "bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border-white/10"
                  }`}
                  title={isCardMuted ? "Unmute Theme Audio" : "Mute Audio"}
                >
                  {isCardMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                {/* Theater Mode Button */}
                <button
                  onClick={handleOpenModal}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-cyan-500/90 hover:text-slate-950 text-white/80 border border-white/10 backdrop-blur-md transition-all group/btn"
                  title="Expand to Fullscreen Theater"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Center Play Button Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                  onClick={handleOpenModal}
                  className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-cyan-500 hover:text-slate-950 text-white border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 text-xs font-mono transition-all transform hover:scale-105 shadow-xl"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>WATCH THEME</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#070d1d] via-slate-950/30 dark:via-[#070d1d]/40 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold uppercase border backdrop-blur-md ${categoryBadgeClass}`}
                >
                  {project.category}
                </span>
                {project.client?.includes("Thesis Consultancy") ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 backdrop-blur-md font-semibold">
                    THESIS CONSULTANCY
                  </span>
                ) : project.featured ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    FLAGSHIP
                  </span>
                ) : null}
              </div>
            </div>
          )}

          {/* Client Attribution */}
          {project.client && (
            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-300 z-10 pointer-events-none">
              CLIENT: <span className="text-white font-medium">{project.client}</span>
            </div>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/projects/${project.slug}`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-cyan-600 dark:text-cyan-400" />
                </h3>
              </Link>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {project.tagline || project.description}
            </p>
          </div>

          {/* Metric Badges if present */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/5 font-mono text-center">
              {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                <div key={key} className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 truncate uppercase">{key}</div>
                  <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-500">
                +{project.tech_stack.length - 5}
              </span>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-mono font-medium flex items-center gap-1 group-hover:underline"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {project.video_url && (
                <button
                  onClick={handleOpenModal}
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Theme Video</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="View Technical Specification"
                >
                  <GitBranch className="w-4 h-4" />
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  title="Live Deployment Endpoint"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Theater Modal */}
      <AnimatePresence>
        {isModalOpen && project.video_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-xl"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#070d1d]">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {project.category}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                      <span>{project.title}</span>
                      <span className="text-xs text-red-400 font-normal hidden sm:inline">
                        // THEME VIDEO
                      </span>
                    </h3>
                    {project.client && (
                      <p className="text-xs font-mono text-slate-400">
                        CLIENT: {project.client}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Video Player */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  src={project.video_url}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-[#070d1d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-400 max-w-xl font-sans">
                  {project.tagline || project.description}
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-1.5"
                  >
                    <span>Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
