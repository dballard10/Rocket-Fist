/**
 * Member domain types
 */

export type MemberStatus =
  | "active"
  | "frozen"
  | "cancelled"
  | "delinquent"
  | "new";

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: MemberStatus;
  membership_plan: string | null;
  next_billing_date: string | null;
  last_check_in_at: string | null;
  created_at: string;
}

export interface MemberFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  membership_plan?: string;
}

/** User profile from auth system */
export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/** Gym user (membership/role) association */
export interface GymUser {
  id: string;
  user_id: string;
  gym_id: string;
  role: "owner" | "admin" | "staff" | "member";
  created_at: string;
  updated_at: string;
  user_profiles?: UserProfile;
}

/** Flattened member response for API */
export interface MemberResponse {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  created_at: string;
}

