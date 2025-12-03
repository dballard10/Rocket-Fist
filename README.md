# Rocket Fist

Gym Management Platform - Monorepo

## Structure

```
rocket-fist/
├── apps/
│   ├── web/          # Vite + React web application
│   ├── backend/      # Fastify + Supabase backend API
│   ├── desktop/      # Desktop app (coming soon)
│   └── mobile/       # Mobile app (coming soon)
├── packages/
│   ├── domain/       # Shared types and domain logic
│   ├── ui/           # Shared React UI components
│   ├── api-client/   # Typed API client for frontends
│   └── config/       # Shared ESLint/TS configurations
└── turbo.json        # Turborepo task orchestration
```

## Prerequisites

- Node.js >= 20.0.0
- npm (workspaces are used for package management)

## Getting Started

```bash
# Install all dependencies
npm install

# Run web and backend in development mode
npm run dev

# Run only the web app
npm run dev:web

# Run only the backend
npm run dev:backend
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run web and backend concurrently |
| `npm run dev:web` | Run web app in dev mode |
| `npm run dev:backend` | Run backend in dev mode |
| `npm run build` | Build all apps and packages |
| `npm run lint` | Lint all apps and packages |
| `npm run typecheck` | Type-check all apps and packages |
| `npm run test` | Run tests for all apps and packages |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run clean` | Remove node_modules and build artifacts |

## Working with Packages

### Using Shared Types (packages/domain)

```typescript
import type { Member, ClassSummary } from "@rocket-fist/domain";
```

### Using Shared UI Components (packages/ui)

```typescript
import { Button, Modal, Input } from "@rocket-fist/ui";
```

### Using the API Client (packages/api-client)

```typescript
import { api, getMembers, getSchedule } from "@rocket-fist/api-client";
```

## Adding a New Package

1. Create a new folder in `packages/`
2. Add `package.json` with name like `@rocket-fist/your-package`
3. Add `tsconfig.json` extending `../../tsconfig.base.json`
4. Run `npm install` from the root

## Architecture

- **npm workspaces**: Manages dependencies across all apps and packages
- **Turborepo**: Orchestrates builds and caching for faster CI/CD
- **TypeScript**: Shared base config with per-app overrides
- **ESLint/Prettier**: Consistent code style across the monorepo

## Tech Stack

### Apps

- **Web**: Vite, React 19, TypeScript, Tailwind CSS
- **Backend**: Fastify, Supabase, TypeScript

### Shared Packages

- **@rocket-fist/domain**: TypeScript types and business logic
- **@rocket-fist/ui**: React component library
- **@rocket-fist/api-client**: Typed HTTP client
- **@rocket-fist/config**: Shared ESLint/TS configurations

