import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content-server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const content = await getSiteContent();
  return {
    name: content.brand.name,
    short_name: content.brand.shortName,
    description: content.brand.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#fffefa",
    theme_color: "#0f4c3a",
    lang: "id",
    icons: content.brand.logoUrl ? [{ src: content.brand.logoUrl, sizes: "any", type: "image/png" }] : [],
  };
}
