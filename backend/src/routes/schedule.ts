import { FastifyInstance } from 'fastify';
import { getSchedule } from '../controllers/scheduleController';

export async function scheduleRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/gyms/:gymId/schedule?start=YYYY-MM-DD&end=YYYY-MM-DD
  app.get('/gyms/:gymId/schedule', getSchedule);
}

