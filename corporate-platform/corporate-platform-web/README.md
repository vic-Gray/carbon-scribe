# CarbonScribe Corporate Platform

A modern Next.js web application for corporate buyers to purchase, manage, and retire carbon credits with transparent, on-chain verification.

## Features

- **Dashboard Overview**: Real-time portfolio metrics and performance analytics
- **Credit Marketplace**: Browse and purchase verified carbon credits
- **Instant Retirement**: Retire credits with on-chain verification
- **Portfolio Analytics**: Visual breakdown by methodology and region
- **Live Retirement Feed**: Real-time updates on corporate retirements
- **Compliance Reporting**: Generate ESG and sustainability reports
- **Dark/Light Mode**: Full theme support
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Next Themes** - Dark/light mode
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Project Structure

```
    src/
    ├── app/                    # App router pages
    ├── components/            # Reusable components
    │   ├── layout/           # Layout components (Navbar, Sidebar)
    │   ├── dashboard/        # Dashboard components
    │   ├── marketplace/      # Credit marketplace components
    │   ├── retirement/       # Retirement components
    │   ├── analytics/        # Analytics components
    │   └── theme/           # Theme provider
    ├── contexts/             # React contexts
    ├── lib/                  # Utilities and mock data
    ├── types/               # TypeScript definitions
    └── utils/               # Helper functions
```

---