"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, ArrowRight, FolderKanban } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/initial-data";

interface ProjectsGalleryProps {
  limit?: number;
  showFilters?: boolean;
  sectionTitle?: string;
  showViewAll?: boolean;
}

export default function ProjectsGallery({
  limit,
  showFilters = true,
  sectionTitle = "Featured Deployments & Proofs",
  showViewAll = true,
}: ProjectsGalleryProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.warn("Using pre-seeded fallback project catalog", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const categories = ["All", "SaaS", "Automation", "R&D"];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech_stack.some((tech) => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const displayProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>OPERATIONAL SYSTEMS CATALOG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Real-world systems, autonomous agent mesh deployments, and post-quantum encryption engines deployed in high-consequence environments.
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold group"
          >
            <span>View Complete Engineering Index</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </motion.div>

      {/* Filter and Search Bar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 mb-10 shadow-sm">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                {cat === "All" ? "ALL ARCHITECTURES" : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      )}

      {/* Project Grid with Motion */}
      {displayProjects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {displayProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl border border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400 font-mono text-sm space-y-2">
          <div>NO DEPLOYMENTS MATCHING CRITERIA</div>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Reset query filters
          </button>
        </div>
      )}
    </section>
  );
}
