"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/profil", label: "Profil" },
  { href: "/unit-pendidikan", label: "Pendidikan" },
  { href: "/program", label: "Program" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader({ shortName }: { shortName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">AH</span>
          <span><strong>Yayasan</strong><small>Pondok Pesantren {shortName}</small></span>
        </Link>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link className="nav-cta" href="/donasi" onClick={() => setOpen(false)}>Dukung kami <ArrowUpRight size={15} /></Link>
        </nav>
        <button className="menu-button" aria-label="Buka menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
