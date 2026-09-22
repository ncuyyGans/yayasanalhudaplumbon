import { createClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";
import { defaultContent, SiteContent } from "./content";

export async function getSiteContent(): Promise<SiteContent> {
  // Konten dikelola lewat admin panel, jadi jangan simpan hasil Supabase
  // sebagai halaman statis pada waktu build.
  noStore();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return defaultContent;

  try {
    const supabase = createClient(url, key, {
      global: {
        fetch: (input, init = {}) =>
          fetch(input, { ...init, cache: "no-store" }),
      },
    });
    const { data, error } = await supabase
      .from("site_content")
      .select("payload")
      .eq("slug", "main")
      .maybeSingle();

    if (error || !data?.payload) return defaultContent;
    return { ...defaultContent, ...data.payload } as SiteContent;
  } catch {
    return defaultContent;
  }
}
