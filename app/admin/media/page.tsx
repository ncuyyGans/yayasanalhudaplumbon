"use client";

import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ImagePlus, Images, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { GalleryItem, normalizeContent, SiteContent } from "@/lib/content";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

const BUCKET = "site-media";

export default function MediaAdminPage() {
  const supabase = getSupabaseBrowser();
  const [user, setUser] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(async ({ data }) => {
      const email = data.user?.email || null;
      setUser(email);
      if (!email) return;
      const result = await supabase.from("site_content").select("payload").eq("slug", "main").maybeSingle();
      if (result.error) setMessage(`Gagal memuat data: ${result.error.message}`);
      setContent(normalizeContent(result.data?.payload));
    });
  }, [supabase]);

  async function save() {
    if (!supabase || !content) return;
    setSaving(true); setMessage("");
    const { error } = await supabase.from("site_content").upsert({ slug: "main", payload: content, updated_at: new Date().toISOString() });
    setSaving(false);
    setMessage(error ? `Gagal menyimpan: ${error.message}` : "Media dan galeri berhasil disimpan.");
  }

  function updateGallery(index: number, patch: Partial<GalleryItem>) {
    setContent((old) => old ? { ...old, gallery: old.gallery.map((item, i) => i === index ? { ...item, ...patch } : item) } : old);
  }

  function moveGallery(index: number, direction: -1 | 1) {
    setContent((old) => {
      if (!old) return old;
      const gallery = [...old.gallery];
      const target = index + direction;
      if (target < 0 || target >= gallery.length) return old;
      [gallery[index], gallery[target]] = [gallery[target], gallery[index]];
      return { ...old, gallery };
    });
  }

  if (!supabase) return <MediaShell><Status title="Supabase belum terhubung" text="Periksa environment variables pada Vercel." /></MediaShell>;
  if (!user) return <MediaShell><Status title="Login diperlukan" text="Silakan masuk melalui halaman admin konten terlebih dahulu."><Link className="button button-primary" href="/admin">Buka login admin</Link></Status></MediaShell>;
  if (!content) return <MediaShell><div className="media-loading"><Loader2 className="spin"/> Memuat media...</div></MediaShell>;

  return <MediaShell>
    <div className="admin-top media-admin-top"><div><span className="section-kicker">Supabase Storage</span><h1>Media dan galeri</h1><p>Unggah gambar maksimal 5 MB dalam format JPG, PNG, WebP, atau GIF.</p></div><button className="button button-primary" type="button" onClick={save} disabled={saving}><Save size={17}/>{saving ? "Menyimpan..." : "Simpan semua"}</button></div>
    {message && <div className={message.startsWith("Media") ? "admin-message success saved" : "admin-message saved"}>{message}</div>}

    <div className="media-sections">
      <MediaSection title="Logo yayasan" description="Ditampilkan pada header dan footer. Gunakan PNG transparan atau WebP berbentuk persegi.">
        <ImageUploader supabase={supabase} folder="logo" value={content.brand.logoUrl} onChange={(logoUrl) => setContent({ ...content, brand: { ...content.brand, logoUrl } })}/>
      </MediaSection>

      <MediaSection title="Foto utama beranda" description="Foto bangunan, lingkungan pesantren, atau kegiatan utama. Rasio vertikal atau 4:5 disarankan.">
        <ImageUploader supabase={supabase} folder="hero" value={content.hero.imageUrl} onChange={(imageUrl) => setContent({ ...content, hero: { ...content.hero, imageUrl } })}/>
      </MediaSection>

      <MediaSection title="Thumbnail berita" description="Setiap berita dapat menggunakan gambar yang berbeda.">
        <div className="media-news-list">{content.news.map((item, index) => <article className="media-news-item" key={`${item.title}-${index}`}><div><span>Berita {index + 1}</span><strong>{item.title}</strong></div><ImageUploader compact supabase={supabase} folder="berita" value={item.imageUrl || ""} onChange={(imageUrl) => setContent({ ...content, news: content.news.map((news, i) => i === index ? { ...news, imageUrl } : news) })}/></article>)}</div>
      </MediaSection>

      <MediaSection title="Galeri kegiatan" description="Tambahkan foto, judul, dan keterangan. Urutan di sini sama dengan urutan di website.">
        <div className="gallery-editor-list">{content.gallery.map((item, index) => <article className="gallery-editor-card" key={item.id}><div className="gallery-editor-actions"><strong>Foto {index + 1}</strong><div><button type="button" disabled={index === 0} onClick={() => moveGallery(index, -1)} title="Naikkan"><ArrowUp size={15}/></button><button type="button" disabled={index === content.gallery.length - 1} onClick={() => moveGallery(index, 1)} title="Turunkan"><ArrowDown size={15}/></button><button type="button" className="danger" onClick={() => setContent({ ...content, gallery: content.gallery.filter((_, i) => i !== index) })} title="Hapus"><Trash2 size={15}/></button></div></div><div className="gallery-editor-grid"><ImageUploader compact supabase={supabase} folder="galeri" value={item.imageUrl} onChange={(imageUrl) => updateGallery(index, { imageUrl })}/><div><Field label="Judul foto" value={item.title} onChange={(title) => updateGallery(index, { title })}/><Field label="Keterangan" value={item.caption} onChange={(caption) => updateGallery(index, { caption })}/></div></div></article>)}</div>
        <button type="button" className="admin-add-button" onClick={() => setContent({ ...content, gallery: [...content.gallery, { id: crypto.randomUUID(), title: "Kegiatan Al Huda", caption: "", imageUrl: "" }] })}><Plus size={16}/> Tambah foto galeri</button>
      </MediaSection>
    </div>

    <div className="admin-save-bar media-save-bar"><span><Images size={16}/> Klik Simpan setelah selesai mengunggah dan mengatur gambar.</span><button className="button button-primary" type="button" onClick={save} disabled={saving}><Save size={16}/>{saving ? "Menyimpan..." : "Simpan semua"}</button></div>
  </MediaShell>;
}

function ImageUploader({ supabase, folder, value, onChange, compact = false }: { supabase: SupabaseClient; folder: string; value: string; onChange: (url: string) => void; compact?: boolean }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("File harus berupa gambar.");
    if (file.size > 5 * 1024 * 1024) return setError("Ukuran gambar maksimal 5 MB.");
    setUploading(true); setError("");
    const extension = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (uploadError) { setError(uploadError.message); setUploading(false); return; }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  async function remove() {
    if (value.includes(`/storage/v1/object/public/${BUCKET}/`)) {
      const path = decodeURIComponent(value.split(`/storage/v1/object/public/${BUCKET}/`)[1].split("?")[0]);
      await supabase.storage.from(BUCKET).remove([path]);
    }
    onChange("");
  }

  return <div className={compact ? "image-uploader compact" : "image-uploader"}>
    {value ? <div className="image-preview"><img src={value} alt="Pratinjau media"/><button type="button" onClick={remove}><Trash2 size={15}/> Hapus</button></div> : <div className="image-empty"><ImagePlus size={compact ? 25 : 34}/><span>Belum ada gambar</span></div>}
    <label className="upload-button">{uploading ? <Loader2 className="spin" size={16}/> : <Upload size={16}/>} {uploading ? "Mengunggah..." : value ? "Ganti gambar" : "Pilih gambar"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} onChange={upload}/></label>
    {error && <small className="upload-error">{error}</small>}
  </div>;
}

function MediaSection({ title, description, children }: { title: string; description: string; children: ReactNode }) { return <section className="admin-panel media-panel"><div className="editor-heading"><span className="section-kicker">Pengelola media</span><h2>{title}</h2><p>{description}</p></div>{children}</section>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="admin-field">{label}<input value={value} onChange={(e) => onChange(e.target.value)}/></label>; }
function MediaShell({ children }: { children: ReactNode }) { return <main className="admin-page"><div className="container admin-container">{children}</div></main>; }
function Status({ title, text, children }: { title: string; text: string; children?: ReactNode }) { return <div className="setup-card"><ImagePlus className="status-icon"/><h1>{title}</h1><p>{text}</p>{children}</div>; }
