# FightGym OS Backend

A TypeScript backend API for FightGym OS, a vertical SaaS platform for martial arts and fight gyms.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts           # Environment configuration
│   │   └── supabase.ts      # Supabase client setup
│   ├── controllers/
│   │   ├── gymsController.ts
│   │   ├── classesController.ts
│   │   ├── scheduleController.ts
│   │   └── membersController.ts
│   ├── routes/
│   │   ├── gyms.ts
│   │   ├── classes.ts
│   │   ├── schedule.ts
│   │   └── members.ts
│   ├── types/
│   │   └── index.ts         # Shared TypeScript types
│   └── server.ts            # Fastify app bootstrap
├── scripts/
│   └── seedMockData.ts      # Database seeding script
├── package.json
├── tsconfig.json
└── .env                     # Environment variables (not committed)
```

## Prerequisites

- Node.js 18+ and npm
- Supabase project with database schema set up
- Supabase Service Role Key (for backend operations)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   
   Create a `.env` file in the `backend` directory:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   PORT=4000
   ```

   ⚠️ **Important**: Never commit the `.env` file. The service role key has full database access.

3. **Seed the database** (optional, for development):
   ```bash
   npm run seed
   ```
   
   This will create:
   - 1 mock gym (Nova Combat Academy)
   - 12 users (2 owners, 2 coaches, 2 employees, 6 members)
   - 4 class templates
   - Class instances for the next 2 weeks
   - Membership plans and memberships
   - Payment records
   - Class registrations and attendance logs

## Running the Server

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:4000` (or the port specified in `.env`).

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

All endpoints are prefixed with `/api`.

### Gyms

- `GET /api/gyms` - List all gyms
- `GET /api/gyms/:gymId` - Get a single gym by ID

### Classes

- `GET /api/gyms/:gymId/classes` - List all class templates for a gym

### Schedule

- `GET /api/gyms/:gymId/schedule?start=YYYY-MM-DD&end=YYYY-MM-DD` - Get scheduled class instances for a date range

  Example:
  ```
  GET /api/gyms/{gymId}/schedule?start=2025-01-01&end=2025-01-07
  ```

### Members

- `GET /api/gyms/:gymId/members` - List all members for a gym
- `GET /api/gyms/:gymId/members/:memberId` - Get a single member

### Analytics

- `GET /api/gyms/:gymId/stats/revenue?from=YYYY-MM-DD&to=YYYY-MM-DD` - Get revenue statistics for a date range

  Example:
  ```
  GET /api/gyms/{gymId}/stats/revenue?from=2025-11-01&to=2025-11-30
  ```

  Response:
  ```json
  {
    "totalRevenueCents": 44700,
    "currency": "USD"
  }
  ```

### Health Check

- `GET /health` - Server health check

## Response Format

All endpoints return JSON. Error responses follow this format:

```json
{
  "error": "Error message"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## CORS

CORS is enabled for the following origins:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)

To add more origins, update `src/server.ts`.

## Database Schema

The backend expects the following Supabase tables:

- `gyms` - Gym information
- `user_profiles` - User profile data (linked to `auth.users`)
- `gym_users` - Many-to-many relationship between users and gyms with roles
- `classes` - Class templates
- `class_instances` - Scheduled class instances
- `class_registrations` - Member registrations for classes
- `attendance_logs` - Attendance tracking
- `membership_plans` - Available membership plans
- `memberships` - Active memberships
- `payments` - Payment records

## Development

### TypeScript

The project uses strict TypeScript. Type definitions are in `src/types/index.ts`.

### Adding New Endpoints

1. Create controller functions in `src/controllers/`
2. Create route definitions in `src/routes/`
3. Register routes in `src/server.ts`

### Error Handling

- Controllers use Zod for validation
- Errors are logged and return appropriate HTTP status codes
- Supabase errors are caught and converted to user-friendly messages

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run seed` - Seed database with mock data

## Authentication

Currently, authentication is stubbed. The backend assumes all requests are authorized. Supabase Auth integration will be added in a future update.

## License

[Your License Here]


