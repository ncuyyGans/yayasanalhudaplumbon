import { createClient } from "@supabase/supabase-js";
import { defaultContent, SiteContent } from "./content";

export async function getSiteContent(): Promise<SiteContent> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return defaultContent;

  try {
    const supabase = createClient(url, key);
    const { data } = await supabase.from("site_content").select("payload").eq("slug", "main").maybeSingle();
    if (!data?.payload) return defaultContent;
    return { ...defaultContent, ...data.payload } as SiteContent;
  } catch {
    return defaultContent;
  }
}
