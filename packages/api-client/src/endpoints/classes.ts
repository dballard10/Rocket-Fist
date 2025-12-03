/**
 * Class-related API endpoints
 */

import { api } from "../client.js";
import type { ClassTemplate } from "@rocket-fist/domain";

/**
 * Get all class templates for a gym
 */
export async function getClasses(gymId: string): Promise<ClassTemplate[]> {
  return api.get<ClassTemplate[]>(`/gyms/${gymId}/classes`);
}

