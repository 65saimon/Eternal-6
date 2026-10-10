import { NextRequest, NextResponse } from "next/server";
import { ProjectSchema } from "@/lib/validations";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/initial-data";

// In-memory fallback projects store for local previewing when Supabase keys are not yet configured
let memoryProjects: ProjectItem[] = [...INITIAL_PROJECTS];

export async function GET(request: NextRequest) {
  try {
    if (isSupabaseConfigured()) {
      const supabase = createAdminClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase fetch error, returning memory projects:", error.message);
          return NextResponse.json(memoryProjects);
        }

        if (data && data.length > 0) {
          return NextResponse.json(data);
        }
      }
    }

    return NextResponse.json(memoryProjects);
  } catch (err: unknown) {
    console.error("Failed to fetch projects:", err);
    return NextResponse.json(memoryProjects);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Zod schema validation
    const validation = ProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validation.data;
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      ...validatedData,
      tagline: validatedData.tagline || "",
      video_url: validatedData.video_url || undefined,
      client: validatedData.client || undefined,
      live_url: validatedData.live_url || undefined,
      github_url: validatedData.github_url || undefined,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const supabase = createAdminClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("projects")
          .insert([
            {
              slug: validatedData.slug,
              title: validatedData.title,
              tagline: validatedData.tagline,
              description: validatedData.description,
              category: validatedData.category,
              tech_stack: validatedData.tech_stack,
              cover_image: validatedData.cover_image,
              video_url: validatedData.video_url,
              featured: validatedData.featured,
              status: validatedData.status,
              metrics: validatedData.metrics,
              client: validatedData.client,
              live_url: validatedData.live_url,
              github_url: validatedData.github_url,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Supabase insert error:", error);
          return NextResponse.json(
            { error: error.message || "Failed to persist project in database." },
            { status: 500 }
          );
        }

        return NextResponse.json(data, { status: 201 });
      }
    }

    // In-memory fallback
    memoryProjects.unshift(newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (err: unknown) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
