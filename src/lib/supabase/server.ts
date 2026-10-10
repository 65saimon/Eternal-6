import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function createClient() {
  const cookieStore = await cookies();
  const url = isValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
    ? process.env.NEXT_PUBLIC_SUPABASE_URL!.trim()
    : "https://placeholder-project.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("YOUR_")
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignored in Server Components
        }
      },
    },
  });
}

