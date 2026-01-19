# Investment Tracker - Project Overview

## 📋 Project Summary

**Investment Tracker** is a modern, full-stack web application designed for two users (Husband/Wife) to collaboratively track and visualize their shared investments. The application provides real-time data visualization, secure authentication, and cloud-based storage for easy access from anywhere.

## 🎯 Project Purpose

This application serves as a personal finance management tool that allows two partners to:
- Track individual and combined investment amounts
- Visualize investment distribution through interactive charts
- Maintain a historical record of all investments
- Access data securely from any device via cloud storage

## 🏗️ Architecture Overview

### Technology Stack

- **Frontend Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts Library**: Recharts 3.6.0
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

### Project Structure

```
investment-tracker/
├── app/                          # Next.js App Router directory
│   ├── dashboard/               # Main dashboard page
│   │   └── page.tsx            # Dashboard component with state management
│   ├── login/                   # Authentication page
│   │   └── page.tsx            # Login form component
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page (redirects to login)
│   └── globals.css             # Global styles
│
├── components/                  # Reusable React components
│   ├── StatsCards.tsx          # Statistics display cards (Total, Husband, Wife)
│   ├── Charts.tsx               # Pie chart and bar chart visualizations
│   ├── InvestmentForm.tsx      # Form to add new investments
│   └── HistoryTable.tsx        # Table displaying investment history
│
├── lib/                         # Core business logic and utilities
│   ├── supabase.ts             # Supabase client configuration
│   ├── auth.ts                 # Authentication utilities (password validation, session management)
│   └── investments.ts          # Investment CRUD operations and statistics calculation
│
├── public/                      # Static assets
│
├── .env.local                   # Environment variables (not in git)
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
│
└── Documentation/
    ├── README.md               # Quick start guide
    ├── PROJECT_OVERVIEW.md     # This file - comprehensive project overview
    ├── CHANGELOG.md            # Version history and changes
    ├── DEPLOYMENT.md           # Deployment instructions for Vercel
    └── SUPABASE_SETUP.md       # Supabase database setup guide
```

## 🔑 Core Features

### 1. Authentication System
- **Password-based authentication** (no user registration required)
- Two predefined passwords for two users (Husband/Wife)
- Session management using browser localStorage
- Automatic session persistence across page refreshes
- Protected routes (dashboard requires authentication)

**Implementation**: `lib/auth.ts`
- `authenticate()`: Validates password against environment variables
- `setUserSession()`: Stores user role in localStorage
- `getUserSession()`: Retrieves current user session
- `clearUserSession()`: Logs out user

### 2. Investment Management
- **Create**: Add new investment entries with investor, amount, and date
- **Read**: Fetch all investments from Supabase database
- **Delete**: Remove investment entries with confirmation
- **Calculate**: Automatic calculation of totals and percentages

**Implementation**: `lib/investments.ts`
- `getInvestments()`: Fetches all investments, ordered by date (descending)
- `addInvestment()`: Inserts new investment into database
- `deleteInvestment()`: Removes investment by ID
- `calculateStats()`: Computes totals and percentages for both investors

### 3. Data Visualization
- **Pie Chart**: Visual representation of investment split between Husband and Wife
- **Bar Chart**: Growth visualization showing individual contributions over time
- **Statistics Cards**: Quick overview of total investments and individual contributions

**Implementation**: `components/Charts.tsx` and `components/StatsCards.tsx`
- Uses Recharts library for interactive charts
- Responsive design that adapts to screen size
- Dark mode support

### 4. User Interface
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Automatic dark mode support via Tailwind CSS
- **Real-time Updates**: Dashboard refreshes automatically after data changes
- **Loading States**: Visual feedback during data operations
- **Error Handling**: User-friendly error messages

## 🗄️ Database Schema

### Supabase Table: `investments`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| `investor` | TEXT | NOT NULL, CHECK IN ('Husband', 'Wife') | Investor name |
| `amount` | NUMERIC(12, 2) | NOT NULL, CHECK (amount > 0) | Investment amount |
| `date` | DATE | NOT NULL | Date of investment |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-generated timestamp |

### Security
- **Row Level Security (RLS)**: Enabled on the investments table
- **Policy**: Currently allows all operations (can be restricted for production)
- **Index**: Created on `date` column for optimized queries

## 🔐 Security Features

1. **Environment Variables**: Sensitive data (passwords, API keys) stored in `.env.local`
2. **Password Authentication**: Simple password-based auth (suitable for personal use)
3. **Session Management**: Client-side session storage (localStorage)
4. **Protected Routes**: Dashboard requires authentication
5. **Supabase RLS**: Database-level security policies

**Note**: For production use, consider implementing:
- More robust authentication (JWT tokens, OAuth)
- Server-side session validation
- More restrictive RLS policies
- Rate limiting
- Input validation and sanitization

## 📊 Data Flow

### Authentication Flow
```
User → Login Page → Password Input → authenticate() → setUserSession() → Redirect to Dashboard
```

### Investment Creation Flow
```
User Input → InvestmentForm → handleAddInvestment() → addInvestment() → Supabase Insert → Refresh Data → Update UI
```

### Data Fetching Flow
```
Dashboard Load → getUserSession() → Check Auth → getInvestments() → Supabase Query → calculateStats() → Render Components
```

## 🎨 UI Components Breakdown

### StatsCards Component
- Displays three key metrics:
  - Total Investment Amount
  - Husband's Total Contribution
  - Wife's Total Contribution
- Shows percentages for each investor
- Responsive grid layout

### Charts Component
- **Pie Chart**: Shows investment split percentage
- **Bar Chart**: Shows individual contributions over time
- Responsive design with proper aspect ratios
- Dark mode compatible

### InvestmentForm Component
- Form fields:
  - Investor selection (Husband/Wife)
  - Amount input (numeric)
  - Date picker
- Form validation
- Loading state during submission
- Success/error feedback

### HistoryTable Component
- Displays all investment entries in chronological order
- Shows: Date, Investor, Amount
- Delete functionality with confirmation
- Responsive table design

## 🚀 Deployment Architecture

### Development
- Local development server: `npm run dev`
- Runs on `http://localhost:3000`
- Hot module replacement enabled
- Environment variables from `.env.local`

### Production (Vercel)
- Automatic deployments from GitHub
- Environment variables configured in Vercel dashboard
- Global CDN distribution
- Automatic SSL certificates
- Preview deployments for pull requests

## 📦 Dependencies

### Production Dependencies
- `next`: 16.1.3 - React framework with SSR/SSG
- `react`: 19.2.3 - UI library
- `react-dom`: 19.2.3 - React DOM renderer
- `@supabase/supabase-js`: 2.90.1 - Supabase client library
- `recharts`: 3.6.0 - Charting library
- `lucide-react`: 0.562.0 - Icon library

### Development Dependencies
- `typescript`: 5.x - Type safety
- `tailwindcss`: 4.x - Utility-first CSS framework
- `eslint`: 9.x - Code linting
- `@types/*`: Type definitions

## 🔄 State Management

The application uses React's built-in state management:
- **Local State**: `useState` hooks for component-level state
- **Session State**: localStorage for authentication persistence
- **Server State**: Supabase for persistent data storage
- **No Global State Library**: No Redux/Zustand needed for current scope

## 🧪 Testing Strategy

Currently, the project does not include automated tests. Recommended additions:
- Unit tests for utility functions (`calculateStats`, `authenticate`)
- Integration tests for API operations
- E2E tests for critical user flows
- Component tests for UI components

## 🛠️ Development Workflow

1. **Setup**: Follow README.md for initial setup
2. **Development**: Make changes, test locally with `npm run dev`
3. **Database Changes**: Update Supabase schema if needed (document in CHANGELOG.md)
4. **Deployment**: Push to GitHub, Vercel auto-deploys
5. **Documentation**: Update CHANGELOG.md with new features/changes

## 📝 Environment Variables

Required environment variables (set in `.env.local` for development, Vercel for production):

```env
NEXT_PUBLIC_USER1_PASSWORD="password-for-husband"
NEXT_PUBLIC_USER2_PASSWORD="password-for-wife"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Note**: All variables are prefixed with `NEXT_PUBLIC_` because they're used in client-side code.

## 🎯 Future Enhancement Ideas

1. **Enhanced Authentication**
   - JWT token-based authentication
   - OAuth integration (Google, GitHub)
   - Multi-factor authentication

2. **Advanced Features**
   - Investment categories/tags
   - Investment notes/descriptions
   - Export data to CSV/PDF
   - Investment goals and tracking
   - Historical trends and analytics
   - Email notifications for new entries

3. **UI/UX Improvements**
   - Advanced filtering and sorting
   - Search functionality
   - Bulk operations
   - Data import from spreadsheets
   - Mobile app (React Native)

4. **Technical Improvements**
   - Unit and integration tests
   - Error boundary components
   - Optimistic UI updates
   - Data caching and offline support
   - Performance monitoring

## 📚 Related Documentation

- [README.md](./README.md) - Quick start guide and basic usage
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment instructions
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup guide

## 👥 Project Status

**Current Version**: 0.1.0  
**Status**: Active Development  
**License**: Private project - for personal use only

---

*Last Updated: See CHANGELOG.md for latest updates*
