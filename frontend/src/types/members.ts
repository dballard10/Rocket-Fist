export type MemberStatus = 'active' | 'frozen' | 'cancelled' | 'delinquent';

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

