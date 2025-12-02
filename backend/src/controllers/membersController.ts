import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { supabase } from '../config/supabase';
import type { GymUser, MemberResponse, RevenueStats } from '../types';

const gymIdSchema = z.object({
  gymId: z.string().uuid(),
});

const memberIdSchema = z.object({
  gymId: z.string().uuid(),
  memberId: z.string().uuid(),
});

const revenueQuerySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export async function listMembers(
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
    .from('gym_users')
    .select(`
      id,
      user_id,
      role,
      created_at,
      user_profiles (
        id,
        full_name,
        email
      )
    `)
    .eq('gym_id', gymId)
    .eq('role', 'member');

  if (error) {
    console.error('Error fetching members:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  // Flatten the response for easier frontend consumption
  const members: MemberResponse[] = (data as GymUser[]).map((gymUser) => ({
    id: gymUser.user_profiles?.id || gymUser.user_id,
    full_name: gymUser.user_profiles?.full_name || null,
    email: gymUser.user_profiles?.email || '',
    role: gymUser.role,
    created_at: gymUser.created_at,
  }));

  return reply.send(members);
}

export async function getMember(
  request: FastifyRequest<{ Params: { gymId: string; memberId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const parseResult = memberIdSchema.safeParse(request.params);
  
  if (!parseResult.success) {
    return reply.status(400).send({ error: 'Invalid ID format' });
  }

  const { gymId, memberId } = parseResult.data;

  const { data, error } = await supabase
    .from('gym_users')
    .select(`
      id,
      user_id,
      role,
      created_at,
      user_profiles (
        id,
        full_name,
        email
      )
    `)
    .eq('gym_id', gymId)
    .eq('user_id', memberId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return reply.status(404).send({ error: 'Member not found' });
    }
    console.error('Error fetching member:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  const gymUser = data as GymUser;
  const member: MemberResponse = {
    id: gymUser.user_profiles?.id || gymUser.user_id,
    full_name: gymUser.user_profiles?.full_name || null,
    email: gymUser.user_profiles?.email || '',
    role: gymUser.role,
    created_at: gymUser.created_at,
  };

  return reply.send(member);
}

export async function getRevenueStats(
  request: FastifyRequest<{ 
    Params: { gymId: string };
    Querystring: { from: string; to: string };
  }>,
  reply: FastifyReply
): Promise<void> {
  const paramsResult = gymIdSchema.safeParse(request.params);
  
  if (!paramsResult.success) {
    return reply.status(400).send({ error: 'Invalid gym ID format' });
  }

  const queryResult = revenueQuerySchema.safeParse(request.query);
  
  if (!queryResult.success) {
    return reply.status(400).send({ 
      error: 'Invalid query parameters. Required: from and to dates in YYYY-MM-DD format' 
    });
  }

  const { gymId } = paramsResult.data;
  const { from, to } = queryResult.data;

  // Verify gym exists
  const { data: gym, error: gymError } = await supabase
    .from('gyms')
    .select('id')
    .eq('id', gymId)
    .single();

  if (gymError || !gym) {
    return reply.status(404).send({ error: 'Gym not found' });
  }

  const fromDate = `${from}T00:00:00`;
  const toDate = `${to}T23:59:59`;

  const { data, error } = await supabase
    .from('payments')
    .select('amount_cents, currency')
    .eq('gym_id', gymId)
    .eq('status', 'succeeded')
    .gte('paid_at', fromDate)
    .lte('paid_at', toDate);

  if (error) {
    console.error('Error fetching revenue stats:', error);
    return reply.status(500).send({ error: 'Something went wrong' });
  }

  const totalRevenueCents = data.reduce((sum, payment) => sum + payment.amount_cents, 0);
  // Default to USD if no payments found
  const currency = data.length > 0 ? data[0].currency : 'USD';

  const stats: RevenueStats = {
    totalRevenueCents,
    currency,
  };

  return reply.send(stats);
}


