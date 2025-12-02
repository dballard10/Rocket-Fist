import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { supabase } from '../config/supabase';
import type { ClassInstance } from '../types';

const paramsSchema = z.object({
  gymId: z.string().uuid(),
});

const querySchema = z.object({
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export async function getSchedule(
  request: FastifyRequest<{ 
    Params: { gymId: string };
    Querystring: { start: string; end: string };
  }>,
  reply: FastifyReply
): Promise<void> {
  const paramsResult = paramsSchema.safeParse(request.params);
  
  if (!paramsResult.success) {
    return reply.status(400).send({ error: 'Invalid gym ID format' });
  }

  const queryResult = querySchema.safeParse(request.query);
  
  if (!queryResult.success) {
    return reply.status(400).send({ 
      error: 'Invalid query parameters. Required: start and end dates in YYYY-MM-DD format' 
    });
  }

  const { gymId } = paramsResult.data;
  const { start, end } = queryResult.data;

  // Verify gym exists
  const { data: gym, error: gymError } = await supabase
    .from('gyms')
    .select('id')
    .eq('id', gymId)
    .single();

  if (gymError || !gym) {
    return reply.status(404).send({ error: 'Gym not found' });
  }

  // Convert dates to timestamps for range query
  const startDate = `${start}T00:00:00`;
  const endDate = `${end}T23:59:59`;

  const { data, error } = await supabase
    .from('class_instances')
    .select(`
      id,
      class_id,
      gym_id,
      instructor_id,
      start_time,
      end_time,
      capacity,
      status,
      created_at,
      classes (
        name,
        discipline
      )
    `)
    .eq('gym_id', gymId)
    .gte('start_time', startDate)
    .lte('start_time', endDate)
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching schedule:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  return reply.send(data as ClassInstance[]);
}


