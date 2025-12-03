import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env';
import { gymsRoutes } from './routes/gyms';
import { classesRoutes } from './routes/classes';
import { scheduleRoutes } from './routes/schedule';
import { membersRoutes } from './routes/members';

const app = Fastify({
  logger: true,
});

async function start() {
  // Register CORS for frontend access
  await app.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  // Register routes
  await app.register(gymsRoutes, { prefix: '/api' });
  await app.register(classesRoutes, { prefix: '/api' });
  await app.register(scheduleRoutes, { prefix: '/api' });
  await app.register(membersRoutes, { prefix: '/api' });

  // Global error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    reply.status(500).send({ error: 'Something went wrong' });
  });

  // Health check
  app.get('/health', async () => {
    return { status: 'ok' };
  });

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();






