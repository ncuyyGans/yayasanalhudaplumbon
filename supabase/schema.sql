-- Jalankan di Supabase SQL Editor.
create table if not exists public.site_content (
  slug text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content" on public.site_content for select using (true);

drop policy if exists "Authenticated admins can insert site content" on public.site_content;
create policy "Authenticated admins can insert site content" on public.site_content for insert to authenticated with check (true);

drop policy if exists "Authenticated admins can update site content" on public.site_content;
create policy "Authenticated admins can update site content" on public.site_content for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated admins can delete site content" on public.site_content;
create policy "Authenticated admins can delete site content" on public.site_content for delete to authenticated using (true);

insert into public.site_content (slug, payload)
values ('main', '{}'::jsonb)
on conflict (slug) do nothing;

-- Buat beberapa akun admin melalui Supabase Dashboard > Authentication > Users.
-- Semua user yang berhasil login memiliki hak edit yang sama pada tahap awal.
