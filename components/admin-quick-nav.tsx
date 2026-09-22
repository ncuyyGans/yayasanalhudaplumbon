"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePenLine, Images } from "lucide-react";

export function AdminQuickNav() {
  const pathname = usePathname();
  if (!pathname.startsWith("/admin")) return null;
  return <div className="admin-quick-nav"><div className="container admin-container"><span>Panel Admin</span><nav><Link className={pathname === "/admin" ? "active" : ""} href="/admin"><FilePenLine size={15}/> Konten</Link><Link className={pathname.startsWith("/admin/media") ? "active" : ""} href="/admin/media"><Images size={15}/> Media & Galeri</Link></nav></div></div>;
}
