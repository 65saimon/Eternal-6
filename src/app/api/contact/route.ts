import { NextRequest, NextResponse } from "next/server";
import { ContactSubmissionSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check (Identifier: IP or header)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { success, remaining, reset } = await rateLimit(`contact:${ip}`, {
      maxRequests: 5,
      windowSeconds: 60,
    });

    if (!success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Transmission throttled to prevent network flooding.",
          resetSeconds: reset,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(reset),
            "X-RateLimit-Remaining": String(remaining),
          },
        }
      );
    }

    // 2. Body parsing and Zod validation
    const body = await request.json();
    const validation = ContactSubmissionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Transmission payload failed validation standards.",
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, service_interest, budget_range, message } =
      validation.data;

    // 3. Supabase persistence
    if (isSupabaseConfigured()) {
      const supabase = createAdminClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("contact_submissions")
          .insert([
            {
              name,
              email,
              company,
              service_interest,
              budget_range,
              message,
              status: "new",
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Supabase contact insertion error:", error);
          return NextResponse.json(
            { error: "Failed to persist transmission." },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { success: true, message: "Transmission received and logged.", data },
          { status: 201 }
        );
      }
    }

    // Fallback response for unconfigured local demo environment
    return NextResponse.json(
      {
        success: true,
        message: "Transmission verified (Demo Mode Sandbox).",
        data: { id: `mock-${Date.now()}`, ...validation.data },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { error: "Internal transmission fault." },
      { status: 500 }
    );
  }
}
