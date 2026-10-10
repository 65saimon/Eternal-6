"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw,
  Film,
  Sparkles
} from "lucide-react";
import { ProjectItem } from "@/lib/initial-data";

interface ProjectMediaHeroProps {
  project: ProjectItem;
}

export default function ProjectMediaHero({ project }: ProjectMediaHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoaded(true);
    };
    const handleEnded = () => {
      // Loop or pause
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // If no video is present, render standard image
  if (!project.video_url) {
    return (
      <div className="relative h-72 sm:h-[450px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  // Cinematic Video Player Component
  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="group relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-[0_10px_50px_rgba(0,240,255,0.15)] mb-12 select-none"
    >
      {/* Video Element */}
      <div className="relative aspect-video w-full max-h-[540px] bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={project.video_url}
          poster={project.cover_image}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover sm:object-contain bg-black cursor-pointer"
          onClick={togglePlay}
        />

        {/* Ambient Top Vignette */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Top Badges & Telemetry HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>THEME VIDEO STREAM</span>
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/60 border border-white/10 text-slate-300 backdrop-blur-md hidden sm:inline-block">
              1080P // 60FPS
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isMuted && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-md">
                <span className="w-1 h-2 bg-cyan-400 animate-pulse" />
                <span className="w-1 h-3 bg-cyan-400 animate-pulse delay-75" />
                <span className="w-1 h-2 bg-cyan-400 animate-pulse delay-150" />
                AUDIO ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* Big Center Play/Pause Overlay indicator when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all hover:scale-110 active:scale-95 z-20"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 fill-slate-950 ml-1" />
          </button>
        )}

        {/* Bottom Cyber HUD Control Bar */}
        <div 
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 sm:p-5 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress Timeline Slider */}
          <div className="relative flex items-center group/slider mb-3">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-cyan-400 transition-all"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white font-mono text-xs">
            <div className="flex items-center gap-4">
              {/* Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Mute / Unmute Button */}
              <button
                onClick={toggleMute}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isMuted 
                    ? "bg-white/10 hover:bg-white/20 text-slate-300" 
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                }`}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden md:inline text-[11px]">
                  {isMuted ? "UNMUTE" : "MUTED"}
                </span>
              </button>

              {/* Time Counter */}
              <div className="text-slate-400 text-[11px] tracking-wider">
                <span className="text-white font-bold">{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Replay */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                  }
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Restart Video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
