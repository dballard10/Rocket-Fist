import { FastifyInstance } from 'fastify';
import { listGyms, getGym } from '../controllers/gymsController';

export async function gymsRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/gyms - List all gyms
  app.get('/gyms', listGyms);

  // GET /api/gyms/:gymId - Get a single gym by ID
  app.get('/gyms/:gymId', getGym);
}




