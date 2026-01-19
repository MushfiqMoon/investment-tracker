# Investment Tracker

A shared investment tracking dashboard built with Next.js, Tailwind CSS, Recharts, and Supabase. Track investments between two users (Husband/Wife) with visual charts and statistics.

## Features

- 🔐 Password-only authentication (no registration needed)
- 📊 Real-time investment tracking with visualizations
- 📈 Interactive charts (Pie chart for split, Bar chart for growth)
- 📝 Add and delete investment entries
- 💰 Automatic calculation of totals and percentages
- 📱 Responsive design for mobile and desktop
- ☁️ Cloud storage with Supabase (access from anywhere)

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### Installation

1. Clone or navigate to the project directory:
```bash
cd investment-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Create your Supabase project and database table
   - Get your API keys

4. Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_USER1_PASSWORD="your-password-here"
NEXT_PUBLIC_USER2_PASSWORD="her-password-here"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
investment-tracker/
├── app/
│   ├── login/          # Login page
│   ├── dashboard/      # Main dashboard page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page (redirects)
├── components/
│   ├── StatsCards.tsx      # Statistics cards
│   ├── Charts.tsx          # Pie and bar charts
│   ├── InvestmentForm.tsx  # Add investment form
│   └── HistoryTable.tsx    # Investment history table
├── lib/
│   ├── supabase.ts     # Supabase client
│   ├── auth.ts         # Authentication utilities
│   └── investments.ts  # Investment CRUD operations
└── .env.local          # Environment variables (not in git)
```

## Deployment to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project" and import your GitHub repository

4. Add environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all four variables from your `.env.local`:
     - `NEXT_PUBLIC_USER1_PASSWORD`
     - `NEXT_PUBLIC_USER2_PASSWORD`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Click "Deploy"

6. Your app will be live on a Vercel URL!

## Usage

1. **Login**: Enter one of the two passwords on the login page
2. **View Dashboard**: See total investments, individual totals, and percentages
3. **Add Investment**: Fill out the form to add a new investment entry
4. **View Charts**: See visual breakdown of investments
5. **View History**: See all past entries in the history table
6. **Delete Entry**: Click delete on any entry to remove it

## Database Schema

The `investments` table has the following structure:

- `id` (UUID): Primary key
- `investor` (TEXT): Either "Husband" or "Wife"
- `amount` (NUMERIC): Investment amount
- `date` (DATE): Date of investment
- `created_at` (TIMESTAMP): Auto-generated timestamp

## Security Notes

- Passwords are stored in environment variables (not in the database)
- Supabase Row Level Security (RLS) is enabled
- For production, consider adding more restrictive RLS policies
- Never commit `.env.local` to version control

## License

Private project - for personal use only.
