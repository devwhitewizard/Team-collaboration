# Nexus Team Hub 🚀

Modern Multi-Organization SaaS Project Management Platform Monorepo.

## 🏗️ Architecture Overview

```
nexus-team/
├── apps/
│   ├── web/        # Next.js 14+ App Router, React, TypeScript, Tailwind CSS
│   └── api/        # NestJS REST API Backend
├── packages/
│   ├── types/      # Shared TypeScript Domain Interfaces
│   ├── ui/         # Shared UI tokens & baseline utilities
│   └── config/     # Base TypeScript & Tooling configurations
├── supabase/
│   ├── migrations/ # PostgreSQL schema migrations
│   ├── functions/  # Edge functions scaffolding
│   └── seed/       # SQL seed data scripts
├── package.json
└── README.md
```

### 🔒 Core Architectural Constraint
Frontend applications (`apps/web` and future `apps/mobile`) **never** talk directly to the database for business operations. All data mutations and business rules flow strictly through the NestJS central backend API layer (`apps/api`).

```
Web (Next.js) ───────────┐
                         │
                         ▼
                    NestJS API ──► Supabase / PostgreSQL
                         ▲
                         │
React Native (Future) ───┘
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Running the Web Application
```bash
# Start Next.js Web App (http://localhost:3000)
npm run dev:web
```

### Running the Backend API
```bash
# Start NestJS API (http://localhost:3001)
npm run dev:api
```

---

## 🌐 Routes Overview

- `/login`, `/register`, `/forgot-password`
- `/dashboard` - Overview KPIs, recent activity, active org metrics
- `/dashboard/projects` - Project grid, status filters, project details
- `/dashboard/tasks` - Task management kanban & list views
- `/dashboard/milestones` - Project milestone progress timeline
- `/dashboard/updates` - Member weekly progress updates feed & submission form
- `/dashboard/team` - Member directory, contract stage progression, contribution scores
- `/dashboard/rankings` - Contributor leaderboard & gamification
- `/dashboard/challenges` - Vibe Coding, Traditional, and Team Coding Challenges
- `/dashboard/documents` - PDF & project document repository
- `/dashboard/communication` - Channels, DMs & announcements
- `/dashboard/contracts` - Stage progression, contract statuses & performance reviews
- `/dashboard/performance` - Analytics & team productivity metrics
- `/dashboard/settings` - Organization settings & preferences

---

## 🔮 Next Roadmap Steps
1. Connect NestJS API modules to Supabase client using `@supabase/supabase-js`.
2. Implement Supabase Auth JWT validation middleware in `apps/api`.
3. Add real-time Supabase WebSockets subscriptions for live communication channels.
