create extension if not exists "pgcrypto";

create table applications (
  id uuid primary key default gen_random_uuid(),

  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  university text not null,
  semester text not null,

  domain text not null,
  duration text not null,

  github text,
  linkedin text,
  portfolio text,

  skills text,
  goals text,
  experience text,

  cv_path text,

  status text not null default 'Received',
  reviewer_notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index applications_email_idx
on applications(email);

create index applications_status_idx
on applications(status);

create index applications_domain_idx
on applications(domain);

create index applications_created_at_idx
on applications(created_at desc);

alter table applications enable row level security;

create policy "Public applications insert"
on applications
for insert
to anon
with check (true);

create policy "No public application reads"
on applications
for select
to anon
using (false);