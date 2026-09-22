-- Jalankan sekali melalui Supabase Dashboard > SQL Editor.
-- Bucket publik untuk logo, hero, berita, dan galeri.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Semua pengunjung boleh membaca gambar yang digunakan website.
drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media"
on storage.objects for select
using (bucket_id = 'site-media');

-- Hanya pengguna yang sudah login sebagai admin yang boleh mengelola file.
drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
on storage.objects for insert to authenticated
with check (bucket_id = 'site-media');

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
on storage.objects for update to authenticated
using (bucket_id = 'site-media')
with check (bucket_id = 'site-media');

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
on storage.objects for delete to authenticated
using (bucket_id = 'site-media');
