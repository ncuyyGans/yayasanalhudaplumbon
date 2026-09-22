import type { MetadataRoute } from "next";

const baseUrl = "https://yayasanalhudaplumbon.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/profil", priority: .8, changeFrequency: "monthly" as const },
    { path: "/unit-pendidikan", priority: .8, changeFrequency: "monthly" as const },
    { path: "/program", priority: .8, changeFrequency: "monthly" as const },
    { path: "/berita", priority: .9, changeFrequency: "weekly" as const },
    { path: "/kontak", priority: .7, changeFrequency: "monthly" as const },
    { path: "/donasi", priority: .6, changeFrequency: "monthly" as const },
  ];
  return pages.map((page) => ({ url: `${baseUrl}${page.path}`, lastModified: new Date(), changeFrequency: page.changeFrequency, priority: page.priority }));
}
