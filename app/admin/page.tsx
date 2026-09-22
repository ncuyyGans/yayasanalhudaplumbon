"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowUp, BookOpen, Building2, ExternalLink, FileText,
  Home, Link2, LogOut, Megaphone, Plus, Save, ShieldCheck,
  Sparkles, Trash2, Users,
} from "lucide-react";
import { defaultContent, NewsItem, Program, SiteContent, Unit } from "@/lib/content";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Tab = "home" | "profile" | "stats" | "units" | "programs" | "news" | "contact";

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Beranda", icon: <Home size={17} /> },
  { id: "profile", label: "Profil", icon: <Users size={17} /> },
  { id: "stats", label: "Statistik", icon: <Sparkles size={17} /> },
  { id: "units", label: "Unit pendidikan", icon: <Building2 size={17} /> },
  { id: "programs", label: "Program", icon: <BookOpen size={17} /> },
  { id: "news", label: "Berita", icon: <FileText size={17} /> },
  { id: "contact", label: "Kontak & tautan", icon: <Link2 size={17} /> },
];

export default function AdminPage() {
  const supabase = getSupabaseBrowser();
  const [user, setUser] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getUser().then(async ({ data }) => {
      const currentEmail = data.user?.email ?? null;
      setUser(currentEmail);
      if (currentEmail) await loadContent();
      setLoading(false);
    });
    // Supabase browser client is a singleton.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setMessage("Memproses login...");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMessage(error.message);
    setUser(data.user?.email ?? email);
    setMessage("");
    await loadContent();
  }

  async function loadContent() {
    if (!supabase) return;
    const { data, error } = await supabase.from("site_content").select("payload").eq("slug", "main").maybeSingle();
    if (error) setMessage(`Gagal memuat konten: ${error.message}`);
    if (data?.payload) setContent({ ...defaultContent, ...data.payload });
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("site_content").upsert({
      slug: "main",
      payload: content,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setMessage(error ? `Gagal menyimpan: ${error.message}` : "Konten berhasil disimpan dan sudah siap ditampilkan.");
  }

  function setObjectField(section: "brand" | "hero" | "about" | "contact" | "social" | "donation", field: string, value: string) {
    setContent((old) => ({ ...old, [section]: { ...old[section], [field]: value } }));
  }

  function updateStat(index: number, field: "value" | "label", value: string) {
    setContent((old) => ({ ...old, stats: old.stats.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }

  function updateUnit(index: number, field: keyof Unit, value: string) {
    setContent((old) => ({ ...old, units: old.units.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }

  function updateProgram(index: number, field: keyof Program, value: string) {
    setContent((old) => ({ ...old, programs: old.programs.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }

  function updateNews(index: number, field: keyof NewsItem, value: string) {
    setContent((old) => ({ ...old, news: old.news.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }

  function moveItem(list: "stats" | "units" | "programs" | "news", index: number, direction: -1 | 1) {
    setContent((old) => {
      const items = [...old[list]] as any[];
      const target = index + direction;
      if (target < 0 || target >= items.length) return old;
      [items[index], items[target]] = [items[target], items[index]];
      return { ...old, [list]: items };
    });
  }

  function removeItem(list: "stats" | "units" | "programs" | "news", index: number) {
    if (!window.confirm("Hapus item ini? Perubahan permanen setelah tombol Simpan ditekan.")) return;
    setContent((old) => ({ ...old, [list]: (old[list] as any[]).filter((_, i) => i !== index) }));
  }

  if (!supabase) return <AdminShell><SetupCard /></AdminShell>;
  if (loading) return <AdminShell><div className="admin-loading">Memuat admin panel...</div></AdminShell>;
  if (!user) return <AdminShell><form className="admin-login" onSubmit={login}><div className="admin-badge"><ShieldCheck size={22} /></div><span className="section-kicker">Area pengelola</span><h1>Masuk ke admin panel</h1><p>Kelola isi website Yayasan Pondok Pesantren Al Huda.</p><label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@contoh.com" /></label><label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></label><button className="button button-primary full" type="submit">Masuk</button>{message && <div className="admin-message">{message}</div>}</form></AdminShell>;

  return <AdminShell>
    <div className="admin-top">
      <div><span className="section-kicker">Dashboard</span><h1>Kelola konten website</h1><p>Login sebagai {user}. Pilih bagian, edit isinya, lalu simpan.</p></div>
      <div className="button-row">
        <Link className="button button-outline" href="/" target="_blank">Lihat website <ExternalLink size={16} /></Link>
        <button type="button" className="button button-primary" onClick={save} disabled={saving}><Save size={17} />{saving ? "Menyimpan..." : "Simpan perubahan"}</button>
        <button type="button" className="icon-button" aria-label="Keluar" title="Keluar" onClick={() => supabase.auth.signOut().then(() => setUser(null))}><LogOut size={18} /></button>
      </div>
    </div>

    {message && <div className={message.startsWith("Konten berhasil") ? "admin-message success saved" : "admin-message saved"}>{message}</div>}

    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <span className="admin-sidebar-label">Bagian website</span>
        {tabs.map((tab) => <button type="button" key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}>{tab.icon}<span>{tab.label}</span></button>)}
      </aside>

      <div className="admin-content-area">
        {activeTab === "home" && <EditorSection title="Beranda dan identitas" description="Teks utama yang pertama kali dilihat pengunjung.">
          <div className="admin-form-grid"><Field label="Nama yayasan" value={content.brand.name} onChange={(v) => setObjectField("brand", "name", v)} /><Field label="Nama pendek" value={content.brand.shortName} onChange={(v) => setObjectField("brand", "shortName", v)} /><Field label="Tagline" value={content.brand.tagline} onChange={(v) => setObjectField("brand", "tagline", v)} /><Field label="Label kecil di atas judul" value={content.hero.eyebrow} onChange={(v) => setObjectField("hero", "eyebrow", v)} /></div>
          <Field label="Judul utama" value={content.hero.title} onChange={(v) => setObjectField("hero", "title", v)} />
          <TextArea label="Deskripsi utama" value={content.hero.description} onChange={(v) => setObjectField("hero", "description", v)} />
          <h3 className="admin-subtitle">Tombol beranda</h3><div className="admin-form-grid"><Field label="Teks tombol utama" value={content.hero.primaryCtaLabel} onChange={(v) => setObjectField("hero", "primaryCtaLabel", v)} /><Field label="Tujuan tombol utama" value={content.hero.primaryCtaHref} onChange={(v) => setObjectField("hero", "primaryCtaHref", v)} /><Field label="Teks tombol kedua" value={content.hero.secondaryCtaLabel} onChange={(v) => setObjectField("hero", "secondaryCtaLabel", v)} /><Field label="Tujuan tombol kedua" value={content.hero.secondaryCtaHref} onChange={(v) => setObjectField("hero", "secondaryCtaHref", v)} /></div>
        </EditorSection>}

        {activeTab === "profile" && <EditorSection title="Profil yayasan" description="Perkenalan dan nilai utama yang tampil di website.">
          <Field label="Judul profil" value={content.about.title} onChange={(v) => setObjectField("about", "title", v)} />
          <TextArea label="Deskripsi profil" value={content.about.body} onChange={(v) => setObjectField("about", "body", v)} rows={6} />
          <h3 className="admin-subtitle">Nilai yang dijaga</h3>
          <div className="admin-form-grid">{content.about.values.map((value, index) => <Field key={index} label={`Nilai ${index + 1}`} value={value} onChange={(v) => setContent((old) => ({ ...old, about: { ...old.about, values: old.about.values.map((item, i) => i === index ? v : item) } }))} />)}</div>
          <button type="button" className="admin-add-button" onClick={() => setContent((old) => ({ ...old, about: { ...old.about, values: [...old.about.values, "Nilai baru"] } }))}><Plus size={16} /> Tambah nilai</button>
        </EditorSection>}

        {activeTab === "stats" && <EditorSection title="Statistik beranda" description="Angka singkat yang tampil pada bagian hijau di bawah hero.">
          <div className="visual-list">{content.stats.map((item, index) => <ItemCard key={index} index={index} total={content.stats.length} title={`Statistik ${index + 1}`} onUp={() => moveItem("stats", index, -1)} onDown={() => moveItem("stats", index, 1)} onDelete={() => removeItem("stats", index)}><div className="admin-form-grid"><Field label="Angka / nilai" value={item.value} onChange={(v) => updateStat(index, "value", v)} /><Field label="Keterangan" value={item.label} onChange={(v) => updateStat(index, "label", v)} /></div></ItemCard>)}</div>
          <button type="button" className="admin-add-button" onClick={() => setContent((old) => ({ ...old, stats: [...old.stats, { value: "0", label: "Keterangan baru" }] }))}><Plus size={16} /> Tambah statistik</button>
        </EditorSection>}

        {activeTab === "units" && <EditorSection title="Unit pendidikan" description="Tambah, ubah, hapus, atau atur urutan unit pendidikan.">
          <div className="visual-list">{content.units.map((unit, index) => <ItemCard key={index} index={index} total={content.units.length} title={unit.name || `Unit ${index + 1}`} onUp={() => moveItem("units", index, -1)} onDown={() => moveItem("units", index, 1)} onDelete={() => removeItem("units", index)}><div className="admin-form-grid"><Field label="Nama unit" value={unit.name} onChange={(v) => updateUnit(index, "name", v)} /><Field label="Jenjang / kategori" value={unit.level} onChange={(v) => updateUnit(index, "level", v)} /><Field label="Akreditasi / status" value={unit.accreditation || ""} onChange={(v) => updateUnit(index, "accreditation", v)} /></div><TextArea label="Deskripsi" value={unit.description} onChange={(v) => updateUnit(index, "description", v)} /></ItemCard>)}</div>
          <button type="button" className="admin-add-button" onClick={() => setContent((old) => ({ ...old, units: [...old.units, { name: "Unit pendidikan baru", level: "Jenjang pendidikan", description: "Tuliskan deskripsi unit pendidikan.", accreditation: "" }] }))}><Plus size={16} /> Tambah unit pendidikan</button>
        </EditorSection>}

        {activeTab === "programs" && <EditorSection title="Program dan kegiatan" description="Kelola program pembinaan yang ditampilkan kepada pengunjung.">
          <div className="visual-list">{content.programs.map((program, index) => <ItemCard key={index} index={index} total={content.programs.length} title={program.title || `Program ${index + 1}`} onUp={() => moveItem("programs", index, -1)} onDown={() => moveItem("programs", index, 1)} onDelete={() => removeItem("programs", index)}><div className="admin-form-grid"><Field label="Nama program" value={program.title} onChange={(v) => updateProgram(index, "title", v)} /><Field label="Nomor / ikon" value={program.icon} onChange={(v) => updateProgram(index, "icon", v)} /></div><TextArea label="Deskripsi" value={program.description} onChange={(v) => updateProgram(index, "description", v)} /></ItemCard>)}</div>
          <button type="button" className="admin-add-button" onClick={() => setContent((old) => ({ ...old, programs: [...old.programs, { title: "Program baru", description: "Tuliskan deskripsi program.", icon: String(old.programs.length + 1).padStart(2, "0") }] }))}><Plus size={16} /> Tambah program</button>
        </EditorSection>}

        {activeTab === "news" && <EditorSection title="Berita dan informasi" description="Kelola kartu informasi yang tampil di Beranda dan halaman Berita.">
          <div className="visual-list">{content.news.map((item, index) => <ItemCard key={index} index={index} total={content.news.length} title={item.title || `Berita ${index + 1}`} onUp={() => moveItem("news", index, -1)} onDown={() => moveItem("news", index, 1)} onDelete={() => removeItem("news", index)}><div className="admin-form-grid"><Field label="Judul" value={item.title} onChange={(v) => updateNews(index, "title", v)} /><Field label="Kategori" value={item.category} onChange={(v) => updateNews(index, "category", v)} /><Field label="Tanggal / label waktu" value={item.date} onChange={(v) => updateNews(index, "date", v)} /></div><TextArea label="Ringkasan" value={item.excerpt} onChange={(v) => updateNews(index, "excerpt", v)} /></ItemCard>)}</div>
          <button type="button" className="admin-add-button" onClick={() => setContent((old) => ({ ...old, news: [...old.news, { title: "Berita baru", date: new Date().toLocaleDateString("id-ID"), category: "Berita", excerpt: "Tuliskan ringkasan berita." }] }))}><Plus size={16} /> Tambah berita</button>
        </EditorSection>}

        {activeTab === "contact" && <EditorSection title="Kontak dan tautan" description="Pastikan menggunakan URL lengkap, termasuk https://.">
          <TextArea label="Alamat lengkap" value={content.contact.address} onChange={(v) => setObjectField("contact", "address", v)} />
          <div className="admin-form-grid"><Field label="Nomor / keterangan telepon" value={content.contact.phone} onChange={(v) => setObjectField("contact", "phone", v)} /><Field label="Email" value={content.contact.email} onChange={(v) => setObjectField("contact", "email", v)} /><Field label="WhatsApp URL" value={content.contact.whatsappUrl} onChange={(v) => setObjectField("contact", "whatsappUrl", v)} /><Field label="Google Maps URL" value={content.contact.mapUrl} onChange={(v) => setObjectField("contact", "mapUrl", v)} /><Field label="Instagram URL" value={content.social.instagram} onChange={(v) => setObjectField("social", "instagram", v)} /><Field label="Facebook URL" value={content.social.facebook} onChange={(v) => setObjectField("social", "facebook", v)} /><Field label="Google Form / kontak PPDB" value={content.ppdbUrl} onChange={(v) => setContent((old) => ({ ...old, ppdbUrl: v }))} /><Field label="Link donasi" value={content.donation.url} onChange={(v) => setObjectField("donation", "url", v)} /></div>
          <h3 className="admin-subtitle">Halaman donasi</h3><Field label="Judul donasi" value={content.donation.title} onChange={(v) => setObjectField("donation", "title", v)} /><TextArea label="Deskripsi donasi" value={content.donation.description} onChange={(v) => setObjectField("donation", "description", v)} />
        </EditorSection>}
      </div>
    </div>

    <div className="admin-save-bar"><span><Megaphone size={16} /> Perubahan belum tampil sampai disimpan.</span><button type="button" className="button button-primary" onClick={save} disabled={saving}><Save size={16} />{saving ? "Menyimpan..." : "Simpan perubahan"}</button></div>
  </AdminShell>;
}

function EditorSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="admin-panel admin-editor-panel"><div className="editor-heading"><div><span className="section-kicker">Editor visual</span><h2>{title}</h2><p>{description}</p></div></div>{children}</section>;
}

function ItemCard({ index, total, title, onUp, onDown, onDelete, children }: { index: number; total: number; title: string; onUp: () => void; onDown: () => void; onDelete: () => void; children: ReactNode }) {
  return <article className="visual-item"><div className="visual-item-head"><strong>{title}</strong><div className="item-actions"><button type="button" disabled={index === 0} onClick={onUp} title="Naikkan"><ArrowUp size={15} /></button><button type="button" disabled={index === total - 1} onClick={onDown} title="Turunkan"><ArrowDown size={15} /></button><button type="button" className="danger" onClick={onDelete} title="Hapus"><Trash2 size={15} /></button></div></div><div className="visual-item-body">{children}</div></article>;
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <label className="admin-field">{label}<input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></label>;
}

function TextArea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return <label className="admin-field">{label}<textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} /></label>;
}

function AdminShell({ children }: { children: ReactNode }) { return <main className="admin-page"><div className="container admin-container">{children}</div></main>; }

function SetupCard() { return <div className="setup-card"><div className="admin-badge"><ShieldCheck size={22} /></div><span className="section-kicker">Admin panel belum terhubung</span><h1>Tambahkan Supabase untuk mulai mengelola konten</h1><p>Website sudah memiliki dashboard admin. Ikuti panduan di README untuk membuat database, akun admin, dan menambahkan environment variables di Vercel.</p><Link className="button button-primary" href="https://supabase.com" target="_blank">Buka Supabase</Link></div>; }
