/**
 * Payment domain types
 */

export interface Payment {
  id: string;
  gym_id: string;
  user_id: string;
  amount_cents: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RevenueStats {
  totalRevenueCents: number;
  currency: string;
}

