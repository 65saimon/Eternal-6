import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import BubbleMotion from "@/components/ui/BubbleMotion";
import { FolderKanban, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Engineering Index & Case Studies | Quantrix Intelligence",
  description:
    "Explore verified deployments across Autonomous Systems, Enterprise SaaS, and Post-Quantum R&D.",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 overflow-x-hidden">
      <BubbleMotion />
      <Navbar />

      <div className="pt-32 pb-12 cyber-grid relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-xs font-mono text-cyan-700 dark:text-cyan-300 mb-4">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>ENTERPRISE ENGINEERING INDEX</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deployed Architectures & Systems
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive index of mission-critical platforms, autonomous agent mesh networks, and patent-ready cryptographic engines developed by Quantrix.
          </p>
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <ProjectsGallery
          showFilters={true}
          showViewAll={false}
          sectionTitle="All Active & Published Deployments"
        />
      </div>

      <Footer />
    </main>
  );
}
