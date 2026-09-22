import Link from "next/link";
import { Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { SiteContent } from "@/lib/content";

export function SiteFooter({ content }: { content: SiteContent }) {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><div className="footer-brand"><span className="brand-mark">AH</span><div><strong>{content.brand.name}</strong><span>{content.brand.tagline}</span></div></div><p className="footer-note">Pendidikan Islam yang menumbuhkan ilmu, akhlak, dan kemandirian.</p></div>
      <div><h4>Jelajahi</h4><Link href="/profil">Profil yayasan</Link><Link href="/unit-pendidikan">Unit pendidikan</Link><Link href="/program">Program</Link><Link href="/berita">Berita & kegiatan</Link></div>
      <div><h4>Terhubung</h4><a href={content.social.instagram || "#"} target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram</a><a href={content.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={16}/> Lihat lokasi</a><Link href="/kontak">Hubungi pengelola <ArrowUpRight size={15}/></Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {content.brand.name}</span><span>Desa Pamijahan · Plumbon · Cirebon</span></div>
  </footer>;
}
