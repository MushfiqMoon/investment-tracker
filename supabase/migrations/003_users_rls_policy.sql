-- Allow reading users table (needed for investment joins)
-- Run this if getUsers() returns empty and investments don't display

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read users"
  ON public.users FOR SELECT
  USING (true);
