-- Monthly savings table - separate from investments
-- Stores amount saved and goal per user per month (one row per user per year-month)
-- investments = individual transactions; monthly_savings = per-user monthly tracking

DROP TABLE IF EXISTS public.monthly_savings;

CREATE TABLE public.monthly_savings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  year INTEGER NOT NULL CHECK (year >= 2020 AND year <= 2100),
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (amount >= 0),
  goal_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (goal_amount >= 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, year, month)
);

-- Index for lookups by year-month
CREATE INDEX idx_monthly_savings_year_month ON public.monthly_savings(year, month);

-- Index for lookups by user
CREATE INDEX idx_monthly_savings_user_id ON public.monthly_savings(user_id);

-- Enable RLS
ALTER TABLE public.monthly_savings ENABLE ROW LEVEL SECURITY;

-- Allow all operations (matches investments policy)
CREATE POLICY "Allow all operations" ON public.monthly_savings
  FOR ALL
  USING (true)
  WITH CHECK (true);
