-- =====================================================
-- IronPulse - Phase 1 Foundation Schema
-- =====================================================
-- Development bootstrap script.
-- This script resets the core public schema and recreates the
-- Section 3.2 data model (Set-and-Forget + PR Engine + Social 2.0).

begin;

create extension if not exists "uuid-ossp";

----------------------------------------------------------------
-- Cleanup old objects
----------------------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;

drop function if exists public.push_workout_finished_activity();
drop function if exists public.check_and_update_pr();
drop function if exists public.handle_new_user();
drop function if exists public.is_group_owner(uuid);
drop function if exists public.is_group_member(uuid);

drop table if exists public.group_activity cascade;
drop table if exists public.group_members cascade;
drop table if exists public.groups cascade;
drop table if exists public.personal_records cascade;
drop table if exists public.workout_logs cascade;
drop table if exists public.workouts cascade;
drop table if exists public.exercises cascade;
drop table if exists public.activity_log cascade;
drop table if exists public.profiles cascade;

-- Drop this after table cleanup so legacy triggers no longer depend on it.
drop function if exists public.update_updated_at();

----------------------------------------------------------------
-- 1) PROFILES
----------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  -- JSON shape example: {"1": "Push", "3": "Pull", "5": "Legs"}
  current_split jsonb not null default '{}'::jsonb check (jsonb_typeof(current_split) = 'object'),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

----------------------------------------------------------------
-- 2) EXERCISES
----------------------------------------------------------------
create table public.exercises (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  muscle_group text not null,
  equipment text,
  is_custom boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone not null default now()
);

create index idx_exercises_name on public.exercises(name);
create unique index idx_exercises_system_name_unique
  on public.exercises (lower(name))
  where created_by is null;

----------------------------------------------------------------
-- 3) WORKOUTS
----------------------------------------------------------------
create table public.workouts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text,
  routine_name text,
  started_at timestamp with time zone not null default now(),
  ended_at timestamp with time zone,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'cancelled')),
  volume_total numeric not null default 0,
  notes text
);

create index idx_workouts_user_started_at on public.workouts(user_id, started_at desc);
create index idx_workouts_status on public.workouts(status);

----------------------------------------------------------------
-- 4) WORKOUT LOGS
----------------------------------------------------------------
create table public.workout_logs (
  id uuid primary key default uuid_generate_v4(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id),
  user_id uuid not null references public.profiles(id) on delete cascade,
  set_number integer not null check (set_number > 0),
  weight numeric not null check (weight >= 0),
  reps integer not null check (reps > 0),
  rpe numeric check (rpe is null or (rpe >= 1 and rpe <= 10)),
  is_pr boolean not null default false,
  estimated_1rm numeric generated always as (weight * (1 + (reps::numeric / 30))) stored,
  created_at timestamp with time zone not null default now()
);

create index idx_workout_logs_workout_id on public.workout_logs(workout_id);
create index idx_workout_logs_user_id on public.workout_logs(user_id);
create index idx_workout_logs_user_exercise on public.workout_logs(user_id, exercise_id);

----------------------------------------------------------------
-- 5) PERSONAL RECORDS
----------------------------------------------------------------
create table public.personal_records (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id),
  one_rep_max numeric not null check (one_rep_max >= 0),
  actual_weight numeric not null check (actual_weight >= 0),
  actual_reps integer not null check (actual_reps > 0),
  achieved_at timestamp with time zone not null default now(),
  log_id uuid references public.workout_logs(id) on delete set null,
  unique (user_id, exercise_id)
);

create index idx_personal_records_user on public.personal_records(user_id);
create index idx_personal_records_exercise on public.personal_records(exercise_id);

----------------------------------------------------------------
-- 6) SOCIAL TABLES
----------------------------------------------------------------
create table public.groups (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  invite_code text unique,
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone not null default now()
);

create table public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamp with time zone not null default now(),
  primary key (group_id, user_id)
);

create index idx_group_members_user_id on public.group_members(user_id);

create table public.group_activity (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_type text not null check (activity_type in ('workout_finished', 'new_pr')),
  workout_id uuid references public.workouts(id) on delete set null,
  pr_exercise_id uuid references public.exercises(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now()
);

create index idx_group_activity_group_created_at
  on public.group_activity(group_id, created_at desc);

----------------------------------------------------------------
-- 7) RLS ENABLE
----------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.exercises enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_logs enable row level security;
alter table public.personal_records enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.group_activity enable row level security;

----------------------------------------------------------------
-- 8) HELPER FUNCTIONS FOR POLICIES
----------------------------------------------------------------
create or replace function public.is_group_member(target_group_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.group_members gm
    where gm.group_id = target_group_id
      and gm.user_id = auth.uid()
  );
$$;

create or replace function public.is_group_owner(target_group_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.groups g
    where g.id = target_group_id
      and g.created_by = auth.uid()
  );
$$;

----------------------------------------------------------------
-- 9) RLS POLICIES
----------------------------------------------------------------
-- Profiles: public read, owner write.
create policy profiles_select_public
  on public.profiles for select
  using (true);

create policy profiles_insert_own
  on public.profiles for insert
  with check (auth.uid() = id);

create policy profiles_update_own
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Exercises: everyone can read, users can manage their own custom exercises.
create policy exercises_select_public
  on public.exercises for select
  using (true);

create policy exercises_insert_custom_own
  on public.exercises for insert
  with check (auth.uid() = created_by and is_custom = true);

create policy exercises_update_custom_own
  on public.exercises for update
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

create policy exercises_delete_custom_own
  on public.exercises for delete
  using (auth.uid() = created_by);

-- Workouts: strict ownership.
create policy workouts_select_own
  on public.workouts for select
  using (auth.uid() = user_id);

create policy workouts_insert_own
  on public.workouts for insert
  with check (auth.uid() = user_id);

create policy workouts_update_own
  on public.workouts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy workouts_delete_own
  on public.workouts for delete
  using (auth.uid() = user_id);

-- Workout logs: strict ownership and workout ownership validation.
create policy workout_logs_select_own
  on public.workout_logs for select
  using (auth.uid() = user_id);

create policy workout_logs_insert_own
  on public.workout_logs for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.workouts w
      where w.id = workout_id
        and w.user_id = auth.uid()
    )
  );

create policy workout_logs_update_own
  on public.workout_logs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy workout_logs_delete_own
  on public.workout_logs for delete
  using (auth.uid() = user_id);

-- Personal records: private read (owner only).
create policy personal_records_select_own
  on public.personal_records for select
  using (auth.uid() = user_id);

-- Groups: only visible to owner/members.
create policy groups_select_member_or_owner
  on public.groups for select
  using (auth.uid() = created_by or public.is_group_member(id));

create policy groups_insert_own
  on public.groups for insert
  with check (auth.uid() = created_by);

create policy groups_update_owner
  on public.groups for update
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

create policy groups_delete_owner
  on public.groups for delete
  using (auth.uid() = created_by);

-- Group members.
create policy group_members_select_members
  on public.group_members for select
  using (public.is_group_member(group_id) or public.is_group_owner(group_id));

create policy group_members_insert_self
  on public.group_members for insert
  with check (auth.uid() = user_id);

create policy group_members_delete_self_or_owner
  on public.group_members for delete
  using (auth.uid() = user_id or public.is_group_owner(group_id));

-- Group activity visibility is restricted to group members.
create policy group_activity_select_members
  on public.group_activity for select
  using (public.is_group_member(group_id));

----------------------------------------------------------------
-- 10) UPDATED_AT TRIGGER
----------------------------------------------------------------
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at();

----------------------------------------------------------------
-- 11) AUTH -> PROFILE AUTO-CREATION
----------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    (
      coalesce(
        nullif(new.raw_user_meta_data ->> 'username', ''),
        split_part(coalesce(new.email, 'user'), '@', 1)
      )
      || '_' || substr(new.id::text, 1, 6)
    ),
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

----------------------------------------------------------------
-- 12) PR ENGINE TRIGGER
----------------------------------------------------------------
create or replace function public.check_and_update_pr()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_best numeric;
  new_1rm numeric;
begin
  new_1rm := new.estimated_1rm;

  select pr.one_rep_max
  into current_best
  from public.personal_records pr
  where pr.user_id = new.user_id
    and pr.exercise_id = new.exercise_id;

  if current_best is null or new_1rm > current_best then
    insert into public.personal_records (
      user_id,
      exercise_id,
      one_rep_max,
      actual_weight,
      actual_reps,
      achieved_at,
      log_id
    )
    values (
      new.user_id,
      new.exercise_id,
      new_1rm,
      new.weight,
      new.reps,
      now(),
      new.id
    )
    on conflict (user_id, exercise_id)
    do update set
      one_rep_max = excluded.one_rep_max,
      actual_weight = excluded.actual_weight,
      actual_reps = excluded.actual_reps,
      achieved_at = now(),
      log_id = excluded.log_id;

    update public.workout_logs
    set is_pr = true
    where id = new.id;

    -- Auto-push "new_pr" events to all groups where the athlete is a member.
    insert into public.group_activity (
      group_id,
      user_id,
      activity_type,
      workout_id,
      pr_exercise_id,
      metadata
    )
    select
      gm.group_id,
      new.user_id,
      'new_pr',
      new.workout_id,
      new.exercise_id,
      jsonb_build_object(
        'one_rep_max', new_1rm,
        'actual_weight', new.weight,
        'actual_reps', new.reps
      )
    from public.group_members gm
    where gm.user_id = new.user_id;
  end if;

  return new;
end;
$$;

create trigger trigger_check_pr
after insert on public.workout_logs
for each row
execute function public.check_and_update_pr();

----------------------------------------------------------------
-- 13) SOCIAL ACTIVITY: WORKOUT COMPLETION
----------------------------------------------------------------
create or replace function public.push_workout_finished_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed' then
    insert into public.group_activity (
      group_id,
      user_id,
      activity_type,
      workout_id,
      metadata
    )
    select
      gm.group_id,
      new.user_id,
      'workout_finished',
      new.id,
      jsonb_build_object(
        'routine_name', new.routine_name,
        'volume_total', new.volume_total,
        'ended_at', coalesce(new.ended_at, now())
      )
    from public.group_members gm
    where gm.user_id = new.user_id;
  end if;

  return new;
end;
$$;

create trigger trigger_workout_finished_activity
after update of status on public.workouts
for each row
execute function public.push_workout_finished_activity();

----------------------------------------------------------------
-- 14) EXERCISE CATALOG SEED (100 BASE MOVEMENTS)
----------------------------------------------------------------
with seed(name, muscle_group, equipment) as (
  values
    ('Barbell Bench Press', 'Chest', 'Barbell'),
    ('Incline Barbell Bench Press', 'Chest', 'Barbell'),
    ('Decline Barbell Bench Press', 'Chest', 'Barbell'),
    ('Dumbbell Bench Press', 'Chest', 'Dumbbell'),
    ('Incline Dumbbell Press', 'Chest', 'Dumbbell'),
    ('Dumbbell Fly', 'Chest', 'Dumbbell'),
    ('Cable Fly', 'Chest', 'Cable'),
    ('Push-Up', 'Chest', 'Bodyweight'),
    ('Weighted Push-Up', 'Chest', 'Bodyweight'),
    ('Dips (Chest)', 'Chest', 'Bodyweight'),
    ('Machine Chest Press', 'Chest', 'Machine'),
    ('Pec Deck Fly', 'Chest', 'Machine'),
    ('Barbell Row', 'Back', 'Barbell'),
    ('Pendlay Row', 'Back', 'Barbell'),
    ('Seated Cable Row', 'Back', 'Cable'),
    ('One-Arm Dumbbell Row', 'Back', 'Dumbbell'),
    ('Chest-Supported Row', 'Back', 'Dumbbell'),
    ('Lat Pulldown', 'Back', 'Cable'),
    ('Wide-Grip Lat Pulldown', 'Back', 'Cable'),
    ('Close-Grip Lat Pulldown', 'Back', 'Cable'),
    ('Pull-Up', 'Back', 'Bodyweight'),
    ('Chin-Up', 'Back', 'Bodyweight'),
    ('Assisted Pull-Up', 'Back', 'Machine'),
    ('Straight-Arm Pulldown', 'Back', 'Cable'),
    ('T-Bar Row', 'Back', 'Machine'),
    ('Rack Pull', 'Back', 'Barbell'),
    ('Barbell Overhead Press', 'Shoulders', 'Barbell'),
    ('Dumbbell Shoulder Press', 'Shoulders', 'Dumbbell'),
    ('Arnold Press', 'Shoulders', 'Dumbbell'),
    ('Push Press', 'Shoulders', 'Barbell'),
    ('Lateral Raise', 'Shoulders', 'Dumbbell'),
    ('Cable Lateral Raise', 'Shoulders', 'Cable'),
    ('Rear Delt Fly', 'Shoulders', 'Dumbbell'),
    ('Face Pull', 'Shoulders', 'Cable'),
    ('Upright Row', 'Shoulders', 'Barbell'),
    ('Front Raise', 'Shoulders', 'Dumbbell'),
    ('Barbell Curl', 'Biceps', 'Barbell'),
    ('EZ-Bar Curl', 'Biceps', 'Barbell'),
    ('Dumbbell Curl', 'Biceps', 'Dumbbell'),
    ('Hammer Curl', 'Biceps', 'Dumbbell'),
    ('Incline Dumbbell Curl', 'Biceps', 'Dumbbell'),
    ('Preacher Curl', 'Biceps', 'Machine'),
    ('Cable Curl', 'Biceps', 'Cable'),
    ('Concentration Curl', 'Biceps', 'Dumbbell'),
    ('Close-Grip Bench Press', 'Triceps', 'Barbell'),
    ('Skull Crusher', 'Triceps', 'Barbell'),
    ('Rope Triceps Pushdown', 'Triceps', 'Cable'),
    ('Straight-Bar Pushdown', 'Triceps', 'Cable'),
    ('Overhead Triceps Extension', 'Triceps', 'Cable'),
    ('Dumbbell Overhead Extension', 'Triceps', 'Dumbbell'),
    ('Triceps Dip', 'Triceps', 'Bodyweight'),
    ('Cable Kickback', 'Triceps', 'Cable'),
    ('Back Squat', 'Legs', 'Barbell'),
    ('Front Squat', 'Legs', 'Barbell'),
    ('Goblet Squat', 'Legs', 'Dumbbell'),
    ('Hack Squat', 'Legs', 'Machine'),
    ('Leg Press', 'Legs', 'Machine'),
    ('Bulgarian Split Squat', 'Legs', 'Dumbbell'),
    ('Walking Lunge', 'Legs', 'Dumbbell'),
    ('Reverse Lunge', 'Legs', 'Dumbbell'),
    ('Step-Up', 'Legs', 'Dumbbell'),
    ('Romanian Deadlift', 'Legs', 'Barbell'),
    ('Conventional Deadlift', 'Legs', 'Barbell'),
    ('Sumo Deadlift', 'Legs', 'Barbell'),
    ('Stiff-Leg Deadlift', 'Legs', 'Barbell'),
    ('Hip Thrust', 'Legs', 'Barbell'),
    ('Glute Bridge', 'Legs', 'Bodyweight'),
    ('Leg Extension', 'Legs', 'Machine'),
    ('Seated Leg Curl', 'Legs', 'Machine'),
    ('Lying Leg Curl', 'Legs', 'Machine'),
    ('Nordic Hamstring Curl', 'Legs', 'Bodyweight'),
    ('Good Morning', 'Legs', 'Barbell'),
    ('Calf Raise (Standing)', 'Legs', 'Machine'),
    ('Calf Raise (Seated)', 'Legs', 'Machine'),
    ('Smith Machine Squat', 'Legs', 'Machine'),
    ('Leg Press Calf Raise', 'Legs', 'Machine'),
    ('Single-Leg Romanian Deadlift', 'Legs', 'Dumbbell'),
    ('Curtsy Lunge', 'Legs', 'Dumbbell'),
    ('Plank', 'Core', 'Bodyweight'),
    ('Side Plank', 'Core', 'Bodyweight'),
    ('Hanging Leg Raise', 'Core', 'Bodyweight'),
    ('Cable Crunch', 'Core', 'Cable'),
    ('Ab Wheel Rollout', 'Core', 'Bodyweight'),
    ('Russian Twist', 'Core', 'Bodyweight'),
    ('Decline Sit-Up', 'Core', 'Bodyweight'),
    ('Bicycle Crunch', 'Core', 'Bodyweight'),
    ('Pallof Press', 'Core', 'Cable'),
    ('Dead Bug', 'Core', 'Bodyweight'),
    ('Clean', 'Full Body', 'Barbell'),
    ('Power Clean', 'Full Body', 'Barbell'),
    ('Clean and Jerk', 'Full Body', 'Barbell'),
    ('Snatch', 'Full Body', 'Barbell'),
    ('Kettlebell Swing', 'Full Body', 'Kettlebell'),
    ('Thruster', 'Full Body', 'Dumbbell'),
    ('Farmer Carry', 'Full Body', 'Dumbbell'),
    ('Sled Push', 'Full Body', 'Sled'),
    ('Battle Ropes', 'Full Body', 'Rope'),
    ('Burpee', 'Full Body', 'Bodyweight'),
    ('Rowing Ergometer', 'Full Body', 'Machine'),
    ('Air Bike', 'Full Body', 'Machine')
)
insert into public.exercises (name, muscle_group, equipment, is_custom, created_by)
select
  seed.name,
  seed.muscle_group,
  seed.equipment,
  false,
  null
from seed
on conflict do nothing;

commit;
