-- Schema initialization for Oisans Sprint SAAS
-- Copy and run this script in your Supabase SQL Editor (https://supabase.com)

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_email TEXT NOT NULL,
  user_fullname TEXT NOT NULL,
  user_phone TEXT,
  title TEXT NOT NULL,
  sector TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  features TEXT,
  illustration_url TEXT,
  target_audience TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  signature_hash TEXT,
  ai_analyzed BOOLEAN NOT NULL DEFAULT false,
  score_feasibility INT NOT NULL DEFAULT 0,
  score_cost INT NOT NULL DEFAULT 0,
  score_roi INT NOT NULL DEFAULT 0,
  ai_verdict TEXT,
  is_finalist BOOLEAN NOT NULL DEFAULT false,
  votes_count INT NOT NULL DEFAULT 0
);

-- 2. Create the votes table
-- Note: unique constraint on user_email ensures one vote per user globally across the arena
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL UNIQUE
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for public access (since this is an open innovation dashboard with JWT / email verification)
-- Allow anyone to read projects
CREATE POLICY "Allow public read access on projects" ON public.projects
  FOR SELECT USING (true);

-- Allow anyone to insert projects (participants submit ideas)
CREATE POLICY "Allow public insert access on projects" ON public.projects
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update/delete projects (useful for simulation/admin dashboard tasks)
CREATE POLICY "Allow public update access on projects" ON public.projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on projects" ON public.projects
  FOR DELETE USING (true);

-- Allow anyone to read votes
CREATE POLICY "Allow public read access on votes" ON public.votes
  FOR SELECT USING (true);

-- Allow anyone to cast a vote
CREATE POLICY "Allow public insert access on votes" ON public.votes
  FOR INSERT WITH CHECK (true);

-- Allow anyone to delete a vote (useful for logout/reset operations if needed)
CREATE POLICY "Allow public delete access on votes" ON public.votes
  FOR DELETE USING (true);

-- 4. Create trigger to automatically maintain votes_count in projects table
CREATE OR REPLACE FUNCTION public.handle_new_vote()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.projects
  SET votes_count = votes_count + 1
  WHERE id = NEW.project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_vote_created
  AFTER INSERT ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_vote();

CREATE OR REPLACE FUNCTION public.handle_deleted_vote()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.projects
  SET votes_count = GREATEST(0, votes_count - 1)
  WHERE id = OLD.project_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_vote_deleted
  AFTER DELETE ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_deleted_vote();
