# Quick Start Guide

Get your Investment Tracker up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free at [supabase.com](https://supabase.com))

## Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run this query:

```sql
CREATE TABLE IF NOT EXISTS investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investor TEXT NOT NULL CHECK (investor IN ('Husband', 'Wife')),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_investments_date ON investments(date DESC);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON investments
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Go to Settings → API and copy:
   - Project URL
   - anon/public key

### 3. Create Environment File

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_USER1_PASSWORD="your-password"
NEXT_PUBLIC_USER2_PASSWORD="her-password"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Replace with your actual values.

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Login

Enter one of your passwords and start tracking investments!

## Next Steps

- See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel
- See [README.md](./README.md) for full documentation
