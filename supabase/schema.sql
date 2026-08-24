create extension if not exists "pgcrypto";

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  creator_name text not null check (char_length(creator_name) between 1 and 20),
  manage_token text not null,
  bank_type text not null default 'standard' check (bank_type in ('standard', 'vtuber', 'vtuber4', 'private', 'ultimate', 'otaku_oshikatsu', 'oshikatsu', 'moshimo', 'renai', 'ura', 'food', 'school', 'work', 'smartphone', 'money')),
  created_at timestamptz not null default now()
);

alter table public.quizzes
  add column if not exists bank_type text not null default 'standard';

do $$
begin
  alter table public.quizzes
    drop constraint if exists quizzes_bank_type_check;
  alter table public.quizzes
    add constraint quizzes_bank_type_check check (bank_type in ('standard', 'vtuber', 'vtuber4', 'private', 'ultimate', 'otaku_oshikatsu', 'oshikatsu', 'moshimo', 'renai', 'ura', 'food', 'school', 'work', 'smartphone', 'money'));
exception
  when duplicate_object then null;
end $$;

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text,
  option_d text,
  correct_answer text not null check (correct_answer in ('a', 'b', 'c', 'd')),
  sort_order integer not null,
  created_at timestamptz not null default now(),
  unique (quiz_id, sort_order)
);

alter table public.questions
  add column if not exists option_c text,
  add column if not exists option_d text;

do $$
begin
  alter table public.questions
    drop constraint if exists questions_correct_answer_check;
  alter table public.questions
    add constraint questions_correct_answer_check check (correct_answer in ('a', 'b', 'c', 'd'));
exception
  when duplicate_object then null;
end $$;

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  challenger_name text not null check (char_length(challenger_name) between 1 and 20),
  score integer not null check (score >= 0),
  percentage integer not null check (percentage between 0 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  selected_answer text not null check (selected_answer in ('a', 'b', 'c', 'd')),
  is_correct boolean not null,
  created_at timestamptz not null default now(),
  unique (attempt_id, question_id)
);

do $$
begin
  alter table public.attempt_answers
    drop constraint if exists attempt_answers_selected_answer_check;
  alter table public.attempt_answers
    add constraint attempt_answers_selected_answer_check check (selected_answer in ('a', 'b', 'c', 'd'));
exception
  when duplicate_object then null;
end $$;

create index if not exists quizzes_slug_idx on public.quizzes(slug);
create index if not exists questions_quiz_sort_idx on public.questions(quiz_id, sort_order);
create index if not exists attempts_quiz_score_idx on public.attempts(quiz_id, percentage desc, created_at asc);
create index if not exists attempt_answers_attempt_idx on public.attempt_answers(attempt_id);
create index if not exists attempt_answers_question_idx on public.attempt_answers(question_id);

alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;

-- MVPではNext.jsのServer Actionsからservice role keyで操作します。
-- ブラウザへservice role keyは絶対に渡さないでください。
