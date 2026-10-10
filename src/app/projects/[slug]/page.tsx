import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { 
  ArrowLeft, 
  ExternalLink, 
  GitBranch, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Terminal, 
  Layers,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import ProjectMediaHero from "@/components/projects/ProjectMediaHero";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/initial-data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Case Study | Quantrix Intelligence" };
  }

  return {
    title: `${project.title} | Quantrix Intelligence Case Study`,
    description: project.tagline || project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  let categoryBadgeClass = "bg-cyan-950/80 text-cyan-300 border-cyan-500/40";
  if (project.category === "Automation") {
    categoryBadgeClass = "bg-purple-950/80 text-purple-300 border-purple-500/40";
  } else if (project.category === "R&D") {
    categoryBadgeClass = "bg-emerald-950/80 text-emerald-300 border-emerald-500/40";
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <Navbar />

      <article className="flex-grow pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO ENGINEERING INDEX</span>
          </Link>
        </div>

        {/* Hero Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded text-xs font-mono uppercase font-semibold border ${categoryBadgeClass}`}
            >
              {project.category}
            </span>
            {project.client && (
              <span className="px-3 py-1 rounded text-xs font-mono bg-slate-900 border border-white/10 text-slate-300">
                CLIENT: {project.client}
              </span>
            )}
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: {project.status.toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            {project.tagline}
          </p>
        </header>

        {/* Academic Thesis Advisory Banner if applicable */}
        {project.client?.includes("Thesis Consultancy") && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  Academic Thesis Consultancy // Applied Frontier R&D
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Supervised research in collaboration with BGC Trust University Bangladesh • Dept. of Computer Science & Engineering
                </div>
              </div>
            </div>
            <a
              href={project.cover_image}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-emerald-900/30"
            >
              <span>Inspect Full Poster</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Hero Media: Interactive Theme Video or High-Res Cover */}
        <ProjectMediaHero project={project} />

        {/* Telemetry Metrics HUD if present */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-xl bg-[#070d1d] border border-cyan-500/20 mb-12 shadow-xl">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">{key}</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Two-Column Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Editorial Content */}
          <div className="lg:col-span-8 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>ARCHITECTURAL SPECIFICATION</span>
              </h2>
              <p>{project.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>CORE ENGINEERING CHALLENGES</span>
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <span>
                    Mitigating extreme concurrency race conditions under sub-millisecond execution deadlines.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <span>
                    Enforcing zero-trust network packet inspection without imposing CPU serialization penalties.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <span>
                    Providing verifiable cryptographic auditability for all automated state changes.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl bg-[#070d1d] border border-white/10 space-y-6 font-mono text-xs">
              <div className="space-y-3">
                <div className="text-slate-400 uppercase tracking-wider font-semibold">
                  STACK PREREQUISITES
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Endpoints */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <span>EXPLORE DEPLOYMENT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>VIEW SPECIFICATION</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
