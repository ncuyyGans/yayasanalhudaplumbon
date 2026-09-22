import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><div><span className="not-found-code">404</span><span className="section-kicker">Halaman tidak ditemukan</span><h1>Maaf, halaman yang Anda cari tidak tersedia.</h1><p>Alamat mungkin berubah atau halaman sudah dipindahkan. Silakan kembali ke halaman utama.</p><Link className="button button-primary" href="/"><ArrowLeft size={17}/> Kembali ke beranda</Link></div></main>;
}
