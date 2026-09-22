# Yayasan Pondok Pesantren Al Huda Plumbon

Website formal-modern islami untuk Yayasan Pondok Pesantren Al Huda Plumbon.

## Stack

- Next.js 14 + TypeScript
- CSS custom responsif
- Supabase untuk database konten dan autentikasi admin
- Siap dideploy ke Vercel

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Mengaktifkan admin panel

1. Buat project di [Supabase](https://supabase.com).
2. Buka **SQL Editor**, jalankan isi `supabase/schema.sql`.
3. Buat akun admin di **Authentication > Users**. Beberapa akun dapat dibuat dan semuanya memiliki hak akses sama.
4. Tambahkan environment variables di Vercel atau `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Deploy ulang. Buka `/admin` untuk login dan mengedit konten.

Tanpa environment variables, website tetap menampilkan data awal dan halaman `/admin` menampilkan petunjuk setup.

## Catatan konten

Data awal yayasan disusun dari informasi yang diberikan pemilik proyek dan dapat disesuaikan melalui dashboard. Logo, foto kegiatan, nomor WhatsApp, tautan Google Form PPDB, informasi donasi, dan rekening donasi dapat ditambahkan setelah materi final tersedia.

## Deploy ke Vercel

Import repository ini di Vercel, gunakan pengaturan default Next.js, lalu masukkan environment variables Supabase pada **Project Settings > Environment Variables**.
