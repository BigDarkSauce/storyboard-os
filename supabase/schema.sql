-- Storyboard OS private sync schema
-- Run in Supabase SQL Editor. Never put service_role keys in the browser or extension.
create extension if not exists pgcrypto;

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null default 'chatgpt-web',
  conversation_id text not null,
  message_id text not null,
  role text not null check (role in ('user','assistant','system','tool','unknown')),
  content text not null,
  source_url text,
  message_order integer,
  content_hash text,
  captured_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, source, conversation_id, message_id)
);
create index if not exists conversation_messages_user_time on public.conversation_messages(user_id, captured_at desc);
create index if not exists conversation_messages_conversation on public.conversation_messages(user_id, conversation_id, message_order);

create table if not exists public.learning_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{"branches":[],"active":null,"revealed":{}}'::jsonb,
  version bigint not null default 1,
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  version bigint not null default 1,
  updated_at timestamptz not null default now()
);

create table if not exists public.sync_audit (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists sync_audit_user_time on public.sync_audit(user_id, created_at desc);

alter table public.conversation_messages enable row level security;
alter table public.learning_workspaces enable row level security;
alter table public.learning_profiles enable row level security;
alter table public.sync_audit enable row level security;

drop policy if exists "own conversation messages" on public.conversation_messages;
create policy "own conversation messages" on public.conversation_messages for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own learning workspace" on public.learning_workspaces;
create policy "own learning workspace" on public.learning_workspaces for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own learning profile" on public.learning_profiles;
create policy "own learning profile" on public.learning_profiles for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "read own sync audit" on public.sync_audit;
create policy "read own sync audit" on public.sync_audit for select to authenticated using (auth.uid() = user_id);

-- Append-only audit records: clients may insert their own events, never update/delete them.
drop policy if exists "insert own sync audit" on public.sync_audit;
create policy "insert own sync audit" on public.sync_audit for insert to authenticated with check (auth.uid() = user_id);
