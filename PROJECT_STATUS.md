# Status Proyek — Yayasan Pondok Pesantren Al Huda Plumbon

**Terakhir diperbarui:** 24 September 2026  
**Status:** Pengembangan dihentikan sementara atas permintaan pemilik proyek  
**Repository:** https://github.com/ncuyyGans/yayasanalhudaplumbon  
**Production:** https://yayasanalhudaplumbon.vercel.app

Dokumen ini adalah catatan serah-terima untuk melanjutkan pengembangan pada waktu lain. Jangan menyimpan API key, password, token, atau data rahasia di dokumen ini.

---

## 1. Tujuan proyek

Website formal-modern islami untuk Yayasan Pondok Pesantren Al Huda di Desa Pamijahan, Kecamatan Plumbon, Kabupaten Cirebon. Website menggunakan Bahasa Indonesia, dideploy di Vercel, dan memiliki admin panel custom agar beberapa admin dapat mengelola konten.

Arah visual:

- Hijau tua, putih, dan aksen emas.
- Formal, modern, islami, dan responsif.
- Materi logo dan foto dapat dimasukkan belakangan melalui pengelola media.

---

## 2. Teknologi

- **Framework:** Next.js 14 App Router
- **Bahasa:** TypeScript
- **UI:** React + custom CSS
- **Ikon:** Lucide React
- **Database dan autentikasi:** Supabase
- **Penyimpanan gambar:** Supabase Storage
- **Hosting:** Vercel
- **Repository:** GitHub

---

## 3. URL penting

| Kebutuhan | URL |
|---|---|
| Website produksi | https://yayasanalhudaplumbon.vercel.app |
| Admin konten | https://yayasanalhudaplumbon.vercel.app/admin |
| Admin media | https://yayasanalhudaplumbon.vercel.app/admin/media |
| Repository | https://github.com/ncuyyGans/yayasanalhudaplumbon |
| Schema database | `supabase/schema.sql` |
| Setup Storage | `supabase/storage.sql` |

Dashboard Vercel dan Supabase hanya dapat diakses oleh pemilik akun terkait.

---

## 4. Environment variables

Website membaca dua environment variables berikut di Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Keduanya sudah pernah dikonfigurasi dan koneksi admin panel berhasil digunakan.

Catatan:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` dapat berisi legacy anon key atau publishable key Supabase.
- Jangan pernah menaruh `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, password database, atau key dengan awalan `sb_secret_` di kode browser.
- Jika environment variable diubah, lakukan redeploy Production agar nilainya masuk ke build baru.

---

## 5. Database Supabase

Konten disimpan pada tabel:

```text
public.site_content
```

Row utama menggunakan:

```text
slug = main
```

Kolom `payload` berisi seluruh konfigurasi website dalam JSONB.

Schema dan Row Level Security tersedia di:

```text
supabase/schema.sql
```

Kebijakan saat ini:

- Publik dapat membaca konten website.
- Pengguna Supabase Auth yang sudah login dapat membuat, mengubah, dan menghapus konten.
- Beberapa akun admin dapat dibuat melalui Supabase Authentication dan memiliki hak akses yang sama.

**Sudah terverifikasi:** login admin, penyimpanan konten, dan perubahan konten pada website berhasil.

---

## 6. Supabase Storage

Konfigurasi Storage tersedia di:

```text
supabase/storage.sql
```

Rencana bucket:

```text
site-media
```

Folder yang digunakan aplikasi:

```text
logo/
hero/
berita/
galeri/
```

Aturan yang disiapkan:

- Maksimal 5 MB per gambar.
- Format JPG, PNG, WebP, atau GIF.
- Gambar dapat dibaca publik agar tampil di website.
- Upload, perubahan, dan penghapusan hanya dapat dilakukan pengguna yang sudah login.

**Belum dikonfirmasi dalam percakapan:** apakah `supabase/storage.sql` sudah dijalankan dan apakah upload gambar sudah dites sampai berhasil. Saat melanjutkan, periksa ini terlebih dahulu.

---

## 7. Halaman publik yang tersedia

- `/` — Beranda
- `/profil` — Profil yayasan
- `/unit-pendidikan` — Unit pendidikan
- `/program` — Program dan kegiatan
- `/berita` — Berita dan galeri
- `/kontak` — Kontak dan lokasi
- `/donasi` — Dukungan/donasi

PPDB tidak memiliki halaman khusus. Tombol PPDB diarahkan ke Google Form atau kontak yang ditentukan admin.

---

## 8. Admin panel konten

Admin panel `/admin` sudah menggunakan editor visual dan tidak lagi memerlukan penyuntingan JSON manual.

Bagian yang dapat dikelola:

- Identitas dan nama yayasan.
- Tagline.
- Judul, deskripsi, dan tombol hero.
- Profil yayasan dan nilai utama.
- Statistik beranda.
- Unit pendidikan.
- Program dan kegiatan.
- Berita dan informasi.
- Alamat, telepon, email, WhatsApp, dan Google Maps.
- Instagram dan Facebook.
- Link PPDB.
- Judul, deskripsi, dan link donasi.

Daftar seperti statistik, unit, program, dan berita dapat ditambah, dihapus, serta diubah urutannya.

**Sudah terverifikasi:** editor visual dapat digunakan dan perubahan berhasil disimpan.

---

## 9. Pengelola media

Halaman `/admin/media` telah disiapkan untuk:

- Logo yayasan.
- Foto utama/hero.
- Thumbnail setiap berita.
- Galeri kegiatan.
- Judul dan keterangan foto galeri.
- Mengubah urutan galeri.
- Menghapus atau mengganti gambar.

Navigasi admin menyediakan pilihan **Konten** dan **Media & Galeri**.

**Perlu verifikasi saat melanjutkan:**

1. `supabase/storage.sql` telah dijalankan.
2. Bucket `site-media` terlihat di Supabase Storage.
3. Upload logo berhasil.
4. URL gambar tersimpan setelah menekan **Simpan semua**.
5. Logo tampil di header/footer.
6. Foto hero dan thumbnail berita tampil di website.
7. Galeri tampil di halaman `/berita`.

---

## 10. SEO dan kesiapan produksi

Kode berikut sudah ditambahkan:

- Metadata dinamis berdasarkan identitas website.
- Open Graph untuk preview WhatsApp/media sosial.
- Twitter card.
- Gambar Open Graph bawaan.
- Structured data `EducationalOrganization` dari Schema.org.
- `robots.txt` yang mencegah halaman admin diindeks.
- `sitemap.xml`.
- Web app manifest.
- Favicon dinamis dari logo yang diunggah.
- Halaman 404 custom.
- Skip link untuk aksesibilitas keyboard.
- Security headers dasar melalui `next.config.mjs`.
- Metadata `noindex` khusus area `/admin`.

**Belum dikonfirmasi dalam percakapan:** deployment dan build dari commit penyelesaian akhir belum diverifikasi setelah perubahan terakhir. Periksa deployment Vercel terbaru sebelum menambah fitur baru.

---

## 11. Data awal

Data awal memuat informasi yang diberikan pemilik proyek, termasuk:

- Yayasan Pondok Pesantren Al Huda.
- Lokasi di Desa Pamijahan, Kecamatan Plumbon, Kabupaten Cirebon.
- Pimpinan: Nashihin Maulani.
- NPYP: AX2573.
- SMP Boarding School Al Huda.
- MI Al Huda Pamijahan.

Sumber yang pernah diberikan:

- https://vervalyayasan.data.kemendikdasmen.go.id/index.php/Chome/profil?yayasan_id=6EB28EC8-8157-4B89-9544-145C5415EF1D
- https://sekolah.data.kemendikdasmen.go.id/profil-sekolah/042F9A2B-B53C-474C-BC40-D14FE4045131
- https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/69992888
- https://www.instagram.com/ponpes_alhudapamijahan/

### Data yang belum terverifikasi

Nilai berikut masih bersifat sementara dan harus diperiksa sebelum peluncuran resmi:

```text
1998 — Berdiri dan mengabdi
```

Tahun tersebut tidak berasal dari data resmi yang diberikan. Pemilik proyek sebelumnya meminta data dasar dibiarkan sementara.

Informasi lain yang masih perlu materi final:

- Nomor WhatsApp resmi.
- Email resmi.
- Link Google Maps yang tepat.
- Google Form PPDB.
- Informasi atau link donasi.
- Logo final.
- Foto bangunan dan kegiatan.

---

## 12. Commit penting

| Commit | Ringkasan |
|---|---|
| `8dd418d` | Struktur awal website dan admin panel |
| `8e799e4` | Konten Supabase dibuat selalu terbaru/tanpa cache statis |
| `89977fb` | Editor visual admin |
| `07915bf` | Tampilan responsif editor visual |
| `b2d885f` | Model media dan konfigurasi Storage |
| `43afc63` | Pengelola media admin |
| `7675a92` | Media ditampilkan di website publik |
| `b8642d9` | SEO, sitemap, manifest, noindex admin, dan security headers |
| `b5601e8` | Penyelesaian gaya aksesibilitas dan halaman 404 |

Gunakan riwayat Git jika perlu membandingkan atau mengembalikan perubahan.

---

## 13. Urutan aman untuk melanjutkan

Saat proyek dilanjutkan, lakukan urutan berikut:

### A. Verifikasi deployment

1. Buka Vercel → Deployments.
2. Pastikan deployment commit terbaru berstatus **Ready**.
3. Periksa Build Logs jika deployment gagal.
4. Uji halaman utama, `/admin`, dan `/admin/media`.

### B. Verifikasi Storage

1. Jalankan `supabase/storage.sql` jika belum pernah dijalankan.
2. Pastikan bucket `site-media` tersedia.
3. Login ke admin.
4. Upload satu logo percobaan.
5. Klik **Simpan semua**.
6. Pastikan logo tampil di website.

### C. Uji fungsi utama

- Login dan logout admin.
- Simpan perubahan teks.
- Tambah/edit/hapus berita.
- Tambah/edit/hapus unit pendidikan.
- Upload dan hapus gambar.
- Uji tampilan desktop dan ponsel.
- Uji semua link publik.
- Pastikan `/robots.txt`, `/sitemap.xml`, dan `/manifest.webmanifest` dapat dibuka.

### D. Lengkapi materi final

- Ganti data sementara.
- Upload logo resmi.
- Upload foto berkualitas.
- Isi kontak, PPDB, Google Maps, dan donasi.

### E. Domain khusus

Jika yayasan memiliki domain, hubungkan melalui Vercel. Setelah domain final aktif, ganti URL tetap berikut dari domain Vercel ke domain resmi:

- `SITE_URL` di `app/layout.tsx`.
- URL di `app/robots.ts`.
- `baseUrl` di `app/sitemap.ts`.

Lalu redeploy dan uji canonical URL serta preview WhatsApp.

---

## 14. Catatan teknis penting

- Fungsi `getSiteContent()` menggunakan `noStore()` agar perubahan admin langsung terlihat tanpa redeploy.
- `normalizeContent()` menjaga kompatibilitas data lama ketika properti media baru belum ada.
- Konten website disimpan sebagai satu payload JSON. Ini sederhana dan cocok untuk skala saat ini, tetapi untuk jumlah berita yang sangat banyak sebaiknya berita dipindahkan ke tabel terpisah.
- Gambar publik menggunakan URL Supabase Storage. Jangan menyimpan dokumen privat atau data sensitif di bucket `site-media`.
- Setelah upload, admin tetap harus menekan tombol **Simpan semua** agar URL gambar tercatat di payload website.
- Area admin tidak boleh dianggap aman hanya karena tidak terindeks. Keamanan sebenarnya berasal dari Supabase Auth dan Row Level Security.

---

## 15. Definisi selesai saat ini

Proyek dapat dianggap mencapai tahap fondasi lengkap apabila:

- Website publik dapat dibuka.
- Admin konten dapat login dan menyimpan perubahan.
- Supabase Storage telah dikonfigurasi dan upload media berhasil.
- Deployment terbaru tidak memiliki build error.
- Data sementara sudah diganti sebelum publikasi resmi.

Pada saat dokumen ini dibuat, admin konten telah terverifikasi berhasil. Storage media dan deployment perubahan SEO terakhir masih perlu dikonfirmasi ketika pengembangan dilanjutkan.
