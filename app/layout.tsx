import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/content-server";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yayasan Pondok Pesantren Al Huda Plumbon",
  description: "Website resmi Yayasan Pondok Pesantren Al Huda Plumbon, Cirebon.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return <html lang="id"><body><SiteHeader shortName={content.brand.shortName} />{children}<SiteFooter content={content} /></body></html>;
}
