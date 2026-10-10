"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Loader2, Check } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds 5MB size ceiling.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const fileExt = file.name.split(".").pop();
        const fileName = `cover-${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        onChange(publicUrlData.publicUrl);
      } else {
        // Fallback demo local object URL or placeholder
        const objectUrl = URL.createObjectURL(file);
        onChange(objectUrl);
      }
    } catch (err: unknown) {
      console.error("Storage upload error:", err);
      if (err instanceof Error) {
        setError(err.message || "Failed to upload asset to storage bucket.");
      } else {
        setError("Failed to upload asset to storage bucket.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-300">
        <span>COVER ASSET / ARTIFACT *</span>
        {uploading && (
          <span className="text-cyan-400 flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            UPLOADING TO BUCKET...
          </span>
        )}
      </div>

      {value ? (
        <div className="relative h-48 w-full rounded-xl overflow-hidden border border-white/10 group bg-slate-950">
          <Image
            src={value}
            alt="Project Cover Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded bg-slate-900 border border-white/20 text-white text-[11px] hover:border-cyan-400 transition-colors"
            >
              REPLACE IMAGE
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded bg-red-950/80 border border-red-500 text-red-400 hover:bg-red-900 transition-colors"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="h-44 w-full rounded-xl border border-dashed border-white/20 hover:border-cyan-500/60 transition-colors cursor-pointer bg-slate-900/40 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-cyan-300 p-4 text-center"
        >
          <div className="p-3 rounded-full bg-slate-800 border border-white/10">
            <Upload className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="font-semibold text-slate-200">
            Drop asset here or click to browse
          </div>
          <div className="text-[10px] text-slate-500">
            Supabase Storage bucket `project-images` (PNG, JPG, WEBP &lt; 5MB)
          </div>
        </div>
      )}

      {/* Direct URL Fallback input */}
      <div className="pt-1">
        <input
          type="text"
          placeholder="Or paste public direct image URL (https://...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
        />
      </div>

      {error && <div className="text-red-400 text-[11px]">{error}</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
