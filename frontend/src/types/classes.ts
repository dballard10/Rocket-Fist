export type ReservationStatus = 'reserved' | 'checked_in' | 'cancelled';

export interface ClassSummary {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  location: string | null;
  reserved_count: number;
  checked_in_count: number;
}

export interface ClassRosterEntry {
  reservation_id: string;
  member_id: string;
  member_name: string;
  status: ReservationStatus;
}

// Raw database types
export interface ClassRow {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  coach_id: string | null;
  location: string | null;
}

export interface ClassReservationRow {
  id: string;
  class_id: string;
  member_id: string;
  status: ReservationStatus;
  created_at: string;
}

