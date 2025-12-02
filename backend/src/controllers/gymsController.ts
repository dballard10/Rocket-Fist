import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { supabase } from '../config/supabase';
import type { Gym } from '../types';

const gymIdSchema = z.object({
  gymId: z.string().uuid(),
});

export async function listGyms(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const { data, error } = await supabase
    .from('gyms')
    .select('id, name, slug, timezone');

  if (error) {
    console.error('Error fetching gyms:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  return reply.send(data as Gym[]);
}

export async function getGym(
  request: FastifyRequest<{ Params: { gymId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const parseResult = gymIdSchema.safeParse(request.params);
  
  if (!parseResult.success) {
    return reply.status(400).send({ error: 'Invalid gym ID format' });
  }

  const { gymId } = parseResult.data;

  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .eq('id', gymId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return reply.status(404).send({ error: 'Gym not found' });
    }
    console.error('Error fetching gym:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  return reply.send(data as Gym);
}


