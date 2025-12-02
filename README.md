# FightGym OS

A vertical SaaS platform for martial arts and fight gyms. FightGym OS helps gym owners manage classes, members, schedules, memberships, and payments all in one place.

## 🥊 Overview

FightGym OS is a full-stack application designed specifically for martial arts gyms, boxing clubs, and fight training facilities. It provides:

- **Class Management** - Create and manage class templates, schedules, and instances
- **Member Management** - Track members, memberships, and attendance
- **Payment Processing** - Handle membership payments and revenue tracking
- **Analytics** - View revenue statistics and attendance metrics
- **Multi-Gym Support** - Manage multiple gym locations from one account

## 🏗️ Architecture

This is a monorepo containing two separate applications:

```
Rocket-Fist/
├── backend/          # Node.js + Fastify REST API
└── frontend/         # React + TypeScript web app
```

### Backend

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Port**: 4000

A RESTful API that handles all business logic and database operations. Uses Supabase with the service role key for secure server-side operations.

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Port**: 5173

A modern, responsive web application that consumes the backend API.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase project with the database schema set up
- Supabase Service Role Key

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Rocket-Fist
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=4000
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`

### 3. Seed the Database (Optional)

To populate the database with mock data for development:

```bash
cd backend
npm run seed
```

This creates:
- 1 mock gym (Nova Combat Academy)
- 12 users (owners, coaches, employees, members)
- 4 class templates
- Class instances for the next 2 weeks
- Membership plans and memberships
- Payment records
- Class registrations and attendance logs

### 4. Set Up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file (optional):

```bash
VITE_API_URL=http://localhost:4000
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
Rocket-Fist/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Supabase config
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── types/           # TypeScript type definitions
│   │   └── server.ts        # Fastify app entry point
│   ├── scripts/
│   │   └── seedMockData.ts  # Database seeding script
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── api/             # API client (to be created)
    │   ├── pages/           # Page components (to be created)
    │   ├── App.tsx          # Root component
    │   └── main.tsx         # Entry point
    └── package.json
```

## 🔌 API Endpoints

The backend exposes the following REST endpoints:

### Gyms
- `GET /api/gyms` - List all gyms
- `GET /api/gyms/:gymId` - Get a single gym

### Classes
- `GET /api/gyms/:gymId/classes` - List classes for a gym

### Schedule
- `GET /api/gyms/:gymId/schedule?start=YYYY-MM-DD&end=YYYY-MM-DD` - Get class schedule

### Members
- `GET /api/gyms/:gymId/members` - List members
- `GET /api/gyms/:gymId/members/:memberId` - Get a single member

### Analytics
- `GET /api/gyms/:gymId/stats/revenue?from=YYYY-MM-DD&to=YYYY-MM-DD` - Revenue statistics

See the [backend README](./backend/README.md) for detailed API documentation.

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

- `gyms` - Gym information
- `user_profiles` - User profile data
- `gym_users` - User-gym relationships with roles
- `classes` - Class templates
- `class_instances` - Scheduled class instances
- `class_registrations` - Member class registrations
- `attendance_logs` - Attendance tracking
- `membership_plans` - Available membership plans
- `memberships` - Active memberships
- `payments` - Payment records

## 🛠️ Development

### Running Both Services

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Making Changes

- **Backend**: Changes are automatically reloaded with `ts-node-dev`
- **Frontend**: Hot Module Replacement (HMR) is enabled by Vite

### Code Style

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint configured for both frontend and backend
- **Formatting**: Follow existing code style

## 📚 Documentation

- [Backend README](./backend/README.md) - Backend API documentation
- [Frontend README](./frontend/README.md) - Frontend development guide

## 🔐 Security Notes

- **Never commit** `.env` files or service role keys
- The backend uses the Supabase **Service Role Key** which bypasses RLS - keep it secure
- Frontend should use the **Anon Key** for client-side operations (when auth is implemented)
- CORS is configured for local development only

## 🧪 Testing

Currently, the project uses mock data for development. The seed script creates realistic test data for:

- Multiple user roles (owners, coaches, employees, members)
- Class schedules across multiple weeks
- Membership plans and active memberships
- Payment history
- Class registrations and attendance

## 🚧 Roadmap

### Current Status
- ✅ Backend REST API
- ✅ Database schema
- ✅ Seed script for mock data
- ✅ Basic frontend dashboard

### In Progress
- 🔄 Frontend API integration
- 🔄 Authentication
- 🔄 Gym selection/switching

### Planned
- 📋 Classes management UI
- 📋 Members management UI
- 📋 Schedule calendar view
- 📋 Real-time updates
- 📋 Payment processing integration
- 📋 Advanced analytics dashboard

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code follows existing patterns
4. Test your changes
5. Submit a pull request

## 📝 License

[Your License Here]

## 🆘 Troubleshooting

### Backend won't start
- Check that `.env` file exists with correct Supabase credentials
- Verify Supabase project is accessible
- Ensure port 4000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 4000
- Check `VITE_API_URL` in `.env.local` matches backend URL
- Check browser console for CORS errors

### Database seeding fails
- Ensure Supabase Service Role Key is correct
- Verify database schema matches expected structure
- Check Supabase logs for detailed error messages

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for martial arts gyms




