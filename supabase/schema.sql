-- Run this in Supabase: SQL Editor → New query → Run.

-- 1. Enquiries table
create table if not exists public.custom_enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  created_at timestamptz not null default now(),
  customer_name text not null check (char_length(customer_name) between 2 and 120),
  mobile text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  furniture_category text not null,
  preferred_design text,
  wood_type text,
  length_cm numeric,
  width_cm numeric,
  height_cm numeric,
  preferred_colour text,
  finishing_type text,
  estimated_budget numeric,
  delivery_village text not null,
  additional_requirements text check (char_length(additional_requirements) <= 2000),
  reference_image_path text,
  status text not null default 'New Enquiry' check (
    status in ('New Enquiry','Quotation Sent','Order Confirmed','Manufacturing Started','Quality Check','Ready for Delivery','Delivered')
  )
);

alter table public.custom_enquiries enable row level security;

-- Visitors can SUBMIT enquiries but cannot read them.
create policy "Anyone can submit a custom enquiry"
  on public.custom_enquiries for insert
  to anon, authenticated
  with check (true);

-- Admin read/update policies are added in the admin-dashboard step, after Supabase Auth is set up.

-- 2. Private storage bucket for reference photos (5 MB, images only)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('reference-designs', 'reference-designs', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "Anyone can upload reference designs"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'reference-designs');
