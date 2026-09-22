import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AdminQuickNav } from "@/components/admin-quick-nav";
import { getSiteContent } from "@/lib/content-server";
import "./globals.css";
import "./admin/admin-visual.css";
import "./admin/media/media.css";

const SITE_URL = "https://yayasanalhudaplumbon.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const title = `${content.brand.name} | Plumbon, Cirebon`;
  const description = content.brand.tagline || "Website resmi Yayasan Pondok Pesantren Al Huda Plumbon, Cirebon.";
  const socialImage = content.hero.imageUrl || `${SITE_URL}/opengraph-image`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${content.brand.shortName}` },
    description,
    applicationName: content.brand.name,
    keywords: ["Pondok Pesantren Al Huda", "Al Huda Pamijahan", "Pesantren Plumbon", "Sekolah Islam Cirebon", "SMP Boarding School Al Huda", "MI Al Huda Pamijahan"],
    authors: [{ name: content.brand.name }],
    creator: content.brand.name,
    publisher: content.brand.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: SITE_URL,
      siteName: content.brand.name,
      title,
      description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: content.brand.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    icons: content.brand.logoUrl ? { icon: content.brand.logoUrl, apple: content.brand.logoUrl } : undefined,
    robots: { index: true, follow: true },
    category: "education",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: content.brand.name,
    alternateName: content.brand.shortName,
    url: SITE_URL,
    logo: content.brand.logoUrl || undefined,
    description: content.brand.tagline,
    address: { "@type": "PostalAddress", streetAddress: content.contact.address, addressLocality: "Plumbon", addressRegion: "Jawa Barat", addressCountry: "ID" },
    sameAs: [content.social.instagram, content.social.facebook].filter(Boolean),
  };
  const safeStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  return <html lang="id"><body><a className="skip-link" href="#main-content">Lewati ke konten utama</a><SiteHeader shortName={content.brand.shortName} logoUrl={content.brand.logoUrl}/><AdminQuickNav/><div id="main-content">{children}</div><SiteFooter content={content}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStructuredData }}/></body></html>;
}
