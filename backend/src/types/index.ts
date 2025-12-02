// Gym types
export interface Gym {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

// Class template types
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

// Class instance types (scheduled classes)
export interface ClassInstance {
  id: string;
  class_id: string;
  gym_id: string;
  instructor_id: string | null;
  start_time: string;
  end_time: string;
  capacity: number | null;
  status: 'scheduled' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  // Joined from classes table
  classes?: {
    name: string;
    discipline: string;
  };
}

// User profile types
export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Gym user (membership) types
export interface GymUser {
  id: string;
  user_id: string;
  gym_id: string;
  role: 'owner' | 'admin' | 'staff' | 'member';
  created_at: string;
  updated_at: string;
  // Joined from user_profiles
  user_profiles?: UserProfile;
}

// Member response type (flattened for API response)
export interface MemberResponse {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  created_at: string;
}

// Payment types
export interface Payment {
  id: string;
  gym_id: string;
  user_id: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

// Revenue stats response
export interface RevenueStats {
  totalRevenueCents: number;
  currency: string;
}

// API error response
export interface ApiError {
  error: string;
}




