import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AdminQuickNav } from "@/components/admin-quick-nav";
import { getSiteContent } from "@/lib/content-server";
import "./globals.css";
import "./admin/admin-visual.css";
import "./admin/media/media.css";

export const metadata: Metadata = {
  title: "Yayasan Pondok Pesantren Al Huda Plumbon",
  description: "Website resmi Yayasan Pondok Pesantren Al Huda Plumbon, Cirebon.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return <html lang="id"><body><SiteHeader shortName={content.brand.shortName} logoUrl={content.brand.logoUrl}/><AdminQuickNav/>{children}<SiteFooter content={content}/></body></html>;
}
