# FightGym OS Frontend

A React + TypeScript frontend application for FightGym OS, a vertical SaaS platform for martial arts and fight gyms.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint

## Project Structure

```
frontend/
├── public/
│   └── logos/              # Brand assets
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx   # Main dashboard component
│   │   ├── Header.tsx      # App header/navigation
│   │   └── WidgetCard.tsx  # Reusable widget component
│   ├── api/                # API client (to be created)
│   │   ├── client.ts       # Fetch wrapper for backend
│   │   └── gyms.ts         # Gym-related API functions
│   ├── pages/              # Page components (to be created)
│   │   ├── Dashboard.tsx
│   │   ├── Classes.tsx
│   │   └── Members.tsx
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see [backend README](../backend/README.md))

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables** (if needed):
   
   Create a `.env.local` file in the `frontend` directory:
   ```bash
   VITE_API_URL=http://localhost:4000
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (Vite default port).

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Development

### Adding New Components

Create components in `src/components/` following the existing pattern:

```tsx
// src/components/MyComponent.tsx
export default function MyComponent() {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

### API Integration

The frontend will communicate with the backend API. Create API client functions in `src/api/`:

```typescript
// src/api/client.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}
```

### Styling

This project uses **Tailwind CSS 4** for styling. Use utility classes directly in your components:

```tsx
<div className="container mx-auto px-4 py-6 bg-black text-white">
  <h1 className="text-3xl font-bold">Title</h1>
</div>
```

### TypeScript

The project uses strict TypeScript. Define types for API responses and component props:

```typescript
interface Gym {
  id: string;
  name: string;
  slug: string;
  timezone: string;
}
```

## Features

### Current Features

- ✅ Dashboard with mock data
- ✅ Responsive design
- ✅ Header component with branding

### Planned Features

- 🔄 API integration with backend
- 🔄 Gym selection/switching
- 🔄 Classes management page
- 🔄 Members management page
- 🔄 Schedule calendar view
- 🔄 Authentication
- 🔄 Real-time data updates

## Building for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory, ready to be deployed to any static hosting service (Vercel, Netlify, etc.).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4000` |

Note: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

## Backend Integration

The frontend communicates with the FightGym OS backend API. Ensure the backend is running before starting the frontend:

1. Start the backend server (see [backend README](../backend/README.md))
2. Verify the backend is accessible at `http://localhost:4000`
3. Start the frontend development server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[Your License Here]
