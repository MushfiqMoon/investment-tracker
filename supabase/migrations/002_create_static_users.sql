-- Static users table with two predefined records
-- Used as a reference for Husband and Wife

CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('Husband', 'Wife')),
  name TEXT NOT NULL
);

-- Insert the two static users
INSERT INTO public.users (id, role, name) VALUES
  ('a368bfb0-4bdc-4d68-a16b-f4568c0c3cd0', 'Husband', 'Mushfiqur Rahman'),
  ('50b1bf72-6241-43b0-88d0-b67562639ee3', 'Wife', 'Margena Akther')
ON CONFLICT (id) DO NOTHING;
