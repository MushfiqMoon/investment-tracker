-- Quote message table - tracks likes for daily motivation quotes
-- message_id 1-30 maps to data/motivation.json; one row per (message_id, quote_date)

CREATE TABLE IF NOT EXISTS public.quote_message (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id INTEGER NOT NULL CHECK (message_id >= 1 AND message_id <= 30),
  quote_date DATE NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0 CHECK (likes >= 0),
  UNIQUE(message_id, quote_date)
);

-- Index for lookups by date
CREATE INDEX IF NOT EXISTS idx_quote_message_date ON public.quote_message(quote_date);

-- Enable RLS
ALTER TABLE public.quote_message ENABLE ROW LEVEL SECURITY;

-- Allow all operations (matches other tables)
CREATE POLICY "Allow all operations" ON public.quote_message
  FOR ALL
  USING (true)
  WITH CHECK (true);
