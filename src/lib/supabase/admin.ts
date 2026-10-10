import { createClient, SupabaseClient } from "@supabase/supabase-js";

function isValidUrl(urlString?: string): boolean {
  if (!urlString) return false;
  const trimmed = urlString.trim();
  if (
    trimmed.includes("placeholder-project") ||
    trimmed.includes("YOUR_") ||
    trimmed === "YOUR_SUPABASE_URL"
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  const trimmedKey = key.trim();
  if (
    trimmedKey.includes("placeholder") ||
    trimmedKey.includes("YOUR_") ||
    trimmedKey === "YOUR_SUPABASE_ANON_KEY" ||
    trimmedKey === "YOUR_SUPABASE_SERVICE_ROLE_KEY"
  ) {
    return false;
  }

  return isValidUrl(url);
}

export function createAdminClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
  const key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ).trim();

  try {
    return createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (err) {
    console.warn("Failed to initialize Supabase admin client:", err);
    return null;
  }
}

