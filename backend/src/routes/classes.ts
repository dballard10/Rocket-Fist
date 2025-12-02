import { FastifyInstance } from 'fastify';
import { listClasses } from '../controllers/classesController';

export async function classesRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/gyms/:gymId/classes - List all classes for a gym
  app.get('/gyms/:gymId/classes', listClasses);
}




