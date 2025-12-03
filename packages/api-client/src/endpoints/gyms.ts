/**
 * Gym-related API endpoints
 */

import { api, getApiConfig } from "../client.js";
import type { Gym } from "@rocket-fist/domain";

/**
 * Get all gyms
 */
export async function getGyms(): Promise<Gym[]> {
  return api.get<Gym[]>("/gyms");
}

/**
 * Get a single gym by ID
 */
export async function getGym(gymId: string): Promise<Gym> {
  return api.get<Gym>(`/gyms/${gymId}`);
}

/**
 * Get the default gym ID from config
 */
export function getDefaultGymId(): string {
  return getApiConfig().defaultGymId || "";
}

