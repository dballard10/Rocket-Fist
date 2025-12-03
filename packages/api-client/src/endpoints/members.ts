/**
 * Member-related API endpoints
 */

import { api } from "../client.js";
import type { MemberResponse, RevenueStats } from "@rocket-fist/domain";

/**
 * Get all members for a gym
 */
export async function getMembers(gymId: string): Promise<MemberResponse[]> {
  return api.get<MemberResponse[]>(`/gyms/${gymId}/members`);
}

/**
 * Get a single member by ID
 */
export async function getMember(
  gymId: string,
  memberId: string
): Promise<MemberResponse> {
  return api.get<MemberResponse>(`/gyms/${gymId}/members/${memberId}`);
}

/**
 * Get revenue stats for a gym
 */
export async function getRevenueStats(
  gymId: string,
  from: string,
  to: string
): Promise<RevenueStats> {
  return api.get<RevenueStats>(
    `/gyms/${gymId}/members/revenue?from=${from}&to=${to}`
  );
}

