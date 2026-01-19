# Changelog

All notable changes to the Investment Tracker project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Enhanced authentication system
- Investment categories and tags
- Data export functionality
- Advanced analytics and trends

## [0.1.0] - Initial Release

### Added
- **Authentication System**
  - Password-based authentication for two users (Husband/Wife)
  - Session management using localStorage
  - Protected routes with automatic redirects
  - Login page with dual password input fields

- **Investment Management**
  - Create new investment entries with investor, amount, and date
  - View all investments in a sortable history table
  - Delete investment entries with confirmation dialog
  - Automatic calculation of totals and percentages

- **Data Visualization**
  - Interactive pie chart showing investment split between Husband and Wife
  - Bar chart displaying individual contributions over time
  - Statistics cards showing total investments and individual totals
  - Responsive chart design for mobile and desktop

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Dark mode support
  - Loading states and error handling
  - Clean, intuitive dashboard layout

- **Database Integration**
  - Supabase PostgreSQL database setup
  - Row Level Security (RLS) enabled
  - Optimized queries with date indexing
  - Real-time data synchronization

- **Deployment**
  - Vercel deployment configuration
  - Environment variable management
  - Production-ready build setup

- **Documentation**
  - README.md with setup instructions
  - DEPLOYMENT.md with deployment guide
  - SUPABASE_SETUP.md with database setup instructions
  - PROJECT_OVERVIEW.md with comprehensive project documentation

### Technical Details
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3.6.0
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

### Project Structure
```
investment-tracker/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Main dashboard page
│   ├── login/            # Authentication page
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── StatsCards.tsx
│   ├── Charts.tsx
│   ├── InvestmentForm.tsx
│   └── HistoryTable.tsx
└── lib/                  # Core utilities
    ├── supabase.ts
    ├── auth.ts
    └── investments.ts
```

---

## Version History

### [0.1.0] - YYYY-MM-DD
- Initial release
- Core features implemented
- Basic authentication and investment tracking
- Data visualization with charts
- Supabase integration
- Vercel deployment ready

---

## How to Update This Changelog

When making changes to the project, update this file following this format:

```markdown
## [Version] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

### Example Entry

```markdown
## [0.2.0] - 2024-01-15

### Added
- Investment categories feature
- Export to CSV functionality
- Search and filter options in history table

### Changed
- Improved chart responsiveness on mobile devices
- Updated authentication flow for better security

### Fixed
- Fixed date picker not working on Safari
- Resolved issue with percentage calculation rounding
```

---

*Remember to update the version in `package.json` when releasing a new version.*
