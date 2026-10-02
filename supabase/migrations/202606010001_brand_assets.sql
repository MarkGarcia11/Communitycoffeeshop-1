create table if not exists public.brand_assets (
  id text primary key,
  bucket_id text not null,
  object_path text not null,
  public_url text not null,
  mime_type text not null default 'image/svg+xml',
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  colors jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.brand_assets enable row level security;

revoke all on public.brand_assets from anon, authenticated;
grant select on public.brand_assets to anon, authenticated;
grant all on public.brand_assets to service_role;

drop policy if exists "Public can read brand assets" on public.brand_assets;
create policy "Public can read brand assets"
  on public.brand_assets for select
  to anon, authenticated
  using (true);

-- Uploads are performed only by the private service-role script.
-- No public write policy is created on storage.objects or brand_assets.