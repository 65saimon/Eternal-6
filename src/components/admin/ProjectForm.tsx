"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Loader2, 
  AlertCircle, 
  Check, 
  Sparkles 
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import { ProjectInput, ProjectSchema } from "@/lib/validations";
import { ProjectItem } from "@/lib/initial-data";

interface ProjectFormProps {
  initialData?: ProjectItem;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ProjectInput>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    tagline: initialData?.tagline || "",
    description: initialData?.description || "",
    category: (initialData?.category as "SaaS" | "Automation" | "R&D") || "SaaS",
    tech_stack: initialData?.tech_stack || ["Next.js", "TypeScript", "Tailwind CSS"],
    cover_image:
      initialData?.cover_image ||
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    featured: initialData?.featured || false,
    status: (initialData?.status as "published" | "draft" | "archived") || "published",
    client: initialData?.client || "",
    video_url: initialData?.video_url || "",
    live_url: initialData?.live_url || "",
    github_url: initialData?.github_url || "",
    metrics: (initialData?.metrics as Record<string, string | number>) || {
      Throughput: "10M ops/sec",
      Latency: "< 1.5ms",
    },
  });

  const [techInput, setTechInput] = useState("");
  const [metricKey, setMetricKey] = useState("");
  const [metricVal, setMetricVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isEdit
        ? prev.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
    }));
  };

  const addTechTag = () => {
    const trimmed = techInput.trim();
    if (trimmed && !formData.tech_stack.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tech_stack: [...prev.tech_stack, trimmed],
      }));
      setTechInput("");
    }
  };

  const removeTechTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.filter((t) => t !== tag),
    }));
  };

  const addMetric = () => {
    if (metricKey.trim() && metricVal.trim()) {
      setFormData((prev) => ({
        ...prev,
        metrics: {
          ...(prev.metrics || {}),
          [metricKey.trim()]: metricVal.trim(),
        },
      }));
      setMetricKey("");
      setMetricVal("");
    }
  };

  const removeMetric = (key: string) => {
    setFormData((prev) => {
      const updated = { ...(prev.metrics || {}) };
      delete updated[key];
      return { ...prev, metrics: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate with Zod
    const validation = ProjectSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = Object.values(
        validation.error.flatten().fieldErrors
      )[0]?.[0];
      setError(firstError || "Form validation standards not met.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isEdit && initialData?.id
        ? `/api/projects/${initialData.id}`
        : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to commit project changes.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save project.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto font-sans">
      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Info Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#070d1d] border border-white/10 space-y-6">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>PROJECT METADATA & CLASSIFICATION</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">TITLE *</label>
            <input
              type="text"
              required
              placeholder="e.g. AegisCore Distributed Telemetry"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">URL SLUG *</label>
            <input
              type="text"
              required
              placeholder="aegis-core-telemetry"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value.toLowerCase() })
              }
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category Pillar */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">STRATEGIC PILLAR *</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as "SaaS" | "Automation" | "R&D",
                })
              }
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="SaaS">SaaS (Enterprise Cloud Platforms)</option>
              <option value="Automation">Automation (Agent Swarms & Robotics)</option>
              <option value="R&D">R&D (Quantum Cryptography & Frontier)</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">STATUS *</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "published" | "draft" | "archived",
                })
              }
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="published">Published (Public Catalog)</option>
              <option value="draft">Draft (Restricted)</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300">TAGLINE / EXECUTIVE HOOK</label>
          <input
            type="text"
            placeholder="Sub-millisecond planetary observability engine for high-frequency trading infrastructure."
            value={formData.tagline || ""}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300">DETAILED SPECIFICATION *</label>
          <textarea
            required
            rows={4}
            placeholder="Deep technical breakdown of architectural design, throughput characteristics, algorithms utilized..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 leading-relaxed"
          />
        </div>

        {/* Client & Featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">CLIENT / ENTERPRISE ENTITY</label>
            <input
              type="text"
              placeholder="e.g. Global FinTech Consortium"
              value={formData.client || ""}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-6 flex items-center gap-3">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
            />
            <label
              htmlFor="featuredCheck"
              className="text-xs font-mono text-slate-300 cursor-pointer"
            >
              MARK AS FLAGSHIP DEPLOYMENT
            </label>
          </div>
        </div>
      </div>

      {/* Media & Cover Image Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#070d1d] border border-white/10 space-y-6">
        <ImageUpload
          value={formData.cover_image}
          onChange={(url) => setFormData({ ...formData, cover_image: url })}
        />

        <div className="pt-4 border-t border-white/10 space-y-2">
          <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
            <span>THEME / DEMO VIDEO URL (MP4 / WEBM)</span>
            <span className="text-slate-500">OPTIONAL</span>
          </label>
          <input
            type="text"
            placeholder="e.g. /videos/gym-management-theme.mp4 or https://..."
            value={formData.video_url || ""}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
          />
          <p className="text-[11px] text-slate-500 font-mono">
            Provide a local path or external stream URL to showcase an ambient looping preview and theater modal.
          </p>
        </div>
      </div>

      {/* Tech Stack & Metrics Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#070d1d] border border-white/10 space-y-6">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-3">
          <span>STACK SPECIFICATION & BENCHMARKS</span>
        </h3>

        {/* Tech Stack Tags Input */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-300">
            TECHNOLOGY STACK PREREQUISITES
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add technology (e.g. Rust, Kafka, PyTorch)..."
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTechTag();
                }
              }}
              className="flex-grow px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={addTechTag}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 flex items-center gap-1 border border-white/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.tech_stack.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-slate-300"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTechTag(tag)}
                  className="hover:text-red-400"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Key Metrics Editor */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <label className="text-xs font-mono text-slate-300">
            VERIFIED TELEMETRY METRICS
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Metric name (e.g. Throughput)"
              value={metricKey}
              onChange={(e) => setMetricKey(e.target.value)}
              className="w-1/2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
            <input
              type="text"
              placeholder="Metric value (e.g. 14.8M ops/sec)"
              value={metricVal}
              onChange={(e) => setMetricVal(e.target.value)}
              className="w-1/2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={addMetric}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 flex items-center gap-1 border border-white/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>SET</span>
            </button>
          </div>

          {formData.metrics && Object.keys(formData.metrics).length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {Object.entries(formData.metrics).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs font-mono"
                >
                  <span className="text-slate-400">{k}:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">{v}</span>
                    <button
                      type="button"
                      onClick={() => removeMetric(k)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live and GitHub Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">LIVE ENDPOINT URL</label>
            <input
              type="url"
              placeholder="https://quantrix.ai/solutions/..."
              value={formData.live_url || ""}
              onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">GITHUB SPECIFICATION URL</label>
            <input
              type="url"
              placeholder="https://github.com/quantrix-intel/..."
              value={formData.github_url || ""}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-300 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ABORT & RETURN</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SAVING RECORD...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? "COMMIT AMENDMENT" : "DEPLOY TO CATALOG"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
