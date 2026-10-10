import { createBrowserClient } from "@supabase/ssr";

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

export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  const trimmedKey = key.trim();
  if (
    trimmedKey.includes("placeholder") ||
    trimmedKey.includes("YOUR_") ||
    trimmedKey === "YOUR_SUPABASE_ANON_KEY"
  ) {
    return false;
  }
  return isValidUrl(url);
};

export function createClient() {
  const url = isValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
    ? process.env.NEXT_PUBLIC_SUPABASE_URL!.trim()
    : "https://placeholder-project.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("YOUR_")
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

  return createBrowserClient(url, key);
}

