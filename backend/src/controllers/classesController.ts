import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { supabase } from '../config/supabase';
import type { ClassTemplate } from '../types';

const gymIdSchema = z.object({
  gymId: z.string().uuid(),
});

export async function listClasses(
  request: FastifyRequest<{ Params: { gymId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const parseResult = gymIdSchema.safeParse(request.params);
  
  if (!parseResult.success) {
    return reply.status(400).send({ error: 'Invalid gym ID format' });
  }

  const { gymId } = parseResult.data;

  // Verify gym exists
  const { data: gym, error: gymError } = await supabase
    .from('gyms')
    .select('id')
    .eq('id', gymId)
    .single();

  if (gymError || !gym) {
    return reply.status(404).send({ error: 'Gym not found' });
  }

  const { data, error } = await supabase
    .from('classes')
    .select('id, name, description, discipline, skill_level, default_duration_minutes, is_active')
    .eq('gym_id', gymId);

  if (error) {
    console.error('Error fetching classes:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  return reply.send(data as ClassTemplate[]);
}




