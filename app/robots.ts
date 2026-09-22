import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] }],
    sitemap: "https://yayasanalhudaplumbon.vercel.app/sitemap.xml",
    host: "https://yayasanalhudaplumbon.vercel.app",
  };
}
