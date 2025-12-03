/**
 * Class and scheduling domain types
 */

export type ReservationStatus = "reserved" | "checked_in" | "cancelled";

/** Class template (definition) */
export interface ClassTemplate {
  id: string;
  gym_id: string;
  name: string;
  description: string | null;
  discipline: string;
  skill_level: string;
  default_duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Class instance (scheduled class) */
export interface ClassInstance {
  id: string;
  class_id: string;
  gym_id: string;
  instructor_id: string | null;
  start_time: string;
  end_time: string;
  capacity: number | null;
  status: "scheduled" | "cancelled" | "completed";
  created_at: string;
  updated_at: string;
  classes?: {
    name: string;
    discipline: string;
  };
}

/** Class summary for display */
export interface ClassSummary {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  location: string | null;
  reserved_count: number;
  checked_in_count: number;
}

/** Class roster entry */
export interface ClassRosterEntry {
  reservation_id: string;
  member_id: string;
  member_name: string;
  status: ReservationStatus;
}

/** Raw class database row */
export interface ClassRow {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  coach_id: string | null;
  location: string | null;
}

/** Raw class reservation database row */
export interface ClassReservationRow {
  id: string;
  class_id: string;
  member_id: string;
  status: ReservationStatus;
  created_at: string;
}

