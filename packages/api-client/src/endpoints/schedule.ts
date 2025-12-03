/**
 * Schedule-related API endpoints
 */

import { api } from "../client.js";
import type { ClassInstance } from "@rocket-fist/domain";

/**
 * Get scheduled class instances for a gym within a date range
 */
export async function getSchedule(
  gymId: string,
  start: string,
  end: string
): Promise<ClassInstance[]> {
  return api.get<ClassInstance[]>(
    `/gyms/${gymId}/schedule?start=${start}&end=${end}`
  );
}

