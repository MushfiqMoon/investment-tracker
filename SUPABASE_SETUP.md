# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `investment-tracker` (or any name you prefer)
   - Database Password: Choose a strong password (save it!)
   - Region: Choose the closest region to you
5. Click "Create new project"
6. Wait for the project to be created (takes 1-2 minutes)

## 2. Create the Database Table

1. In your Supabase project dashboard, go to the "SQL Editor" (left sidebar)
2. Click "New query"
3. Copy and paste the following SQL:

```sql
-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investor TEXT NOT NULL CHECK (investor IN ('Husband', 'Wife')),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_investments_date ON investments(date DESC);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (since we're using password auth)
-- For production, you might want to add more restrictive policies
CREATE POLICY "Allow all operations" ON investments
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run" to execute the query
5. You should see a success message

### Adding Notes Column (If Table Already Exists)

If you already created the table without the `notes` column, run this migration:

```sql
ALTER TABLE investments ADD COLUMN IF NOT EXISTS notes TEXT;
```

## 3. Get Your API Keys

1. In your Supabase project dashboard, go to "Settings" (gear icon in left sidebar)
2. Click on "API" in the settings menu
3. You'll find:
   - **Project URL**: Copy this value
   - **anon/public key**: Copy this value (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 4. Set Up Environment Variables

1. In your project root, create a `.env.local` file (if it doesn't exist)
2. Add the following variables:

```env
NEXT_PUBLIC_USER1_PASSWORD="your-password-here"
NEXT_PUBLIC_USER2_PASSWORD="her-password-here"
NEXT_PUBLIC_SUPABASE_URL="your-project-url-from-step-3"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-from-step-3"
```

3. Replace the placeholder values with your actual passwords and Supabase credentials

## 5. Test the Connection

1. Run `npm run dev` in your project
2. The app should connect to Supabase successfully
3. Try adding an investment entry to verify everything works

## Troubleshooting

- **Connection errors**: Make sure your `.env.local` file has the correct Supabase URL and key
- **Table not found**: Make sure you ran the SQL query to create the table
- **Permission errors**: Check that RLS policies are set up correctly (the policy in step 2 allows all operations)
