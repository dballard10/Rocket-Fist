import { FastifyInstance } from 'fastify';
import { listMembers, getMember, getRevenueStats } from '../controllers/membersController';

export async function membersRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/gyms/:gymId/members - List all members for a gym
  app.get('/gyms/:gymId/members', listMembers);

  // GET /api/gyms/:gymId/members/:memberId - Get a single member
  app.get('/gyms/:gymId/members/:memberId', getMember);

  // GET /api/gyms/:gymId/stats/revenue?from=YYYY-MM-DD&to=YYYY-MM-DD
  app.get('/gyms/:gymId/stats/revenue', getRevenueStats);
}




