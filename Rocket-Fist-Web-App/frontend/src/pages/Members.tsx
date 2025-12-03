/**
 * @file Members.tsx
 * @description Member management page for the Staff Portal. Allows staff to view,
 * search, filter, and manage gym members. Coaches have read-only access while
 * owners and employees can add new members.
 *
 * @portal Staff
 * @roles owner (full access), employee (full access), coach (read-only)
 * @route /members
 *
 * @features
 * - KPI cards showing member statistics (total, active, delinquent, new this month)
 * - Search by name or email
 * - Filter by membership status (active, frozen, cancelled, etc.)
 * - Filter by membership plan
 * - Member list with click-to-view details
 * - Add new member modal (owner/employee only)
 * - Member details slide-over sheet
 *
 * @components
 * - MemberFilters: Search and filter controls
 * - MemberList: Responsive table/list of members
 * - MemberDetailsSheet: Slide-over panel showing member details
 * - AddMemberModal: Modal form for creating new members
 *
 * @data
 * - Fetches from Supabase 'members' table
 * - Falls back to mock data if Supabase unavailable
 */

import { useState, useMemo, useEffect } from "react";
import WidgetCard from "../components/WidgetCard";
import Button from "../components/ui/Button";
import MemberFilters from "../components/members/MemberFilters";
import MemberList from "../components/members/MemberList";
import MemberDetailsSheet from "../components/members/MemberDetailsSheet";
import AddMemberModal from "../components/members/AddMemberModal";
import type { Member, MemberFormData } from "../types/members";
import { supabase } from "../lib/supabase/client";
import { useDevRole } from "../lib/devRoleMode";

// Temporary mock data for development (remove when Supabase is connected)
const mockMembersData: Member[] = [
  {
    id: "1",
    first_name: "Chris",
    last_name: "Martinez",
    email: "chris.m@email.com",
    phone: "(555) 123-4567",
    status: "active",
    membership_plan: "Unlimited Training",
    next_billing_date: "2025-01-15",
    last_check_in_at: "2024-12-30",
    created_at: "2024-06-15T10:00:00Z",
  },
  {
    id: "2",
    first_name: "Jordan",
    last_name: "Lee",
    email: "jordan.lee@email.com",
    phone: "(555) 234-5678",
    status: "active",
    membership_plan: "Unlimited Training",
    next_billing_date: "2025-01-20",
    last_check_in_at: "2024-12-28",
    created_at: "2024-08-20T10:00:00Z",
  },
  {
    id: "3",
    first_name: "Morgan",
    last_name: "Chen",
    email: "morgan.c@email.com",
    phone: "(555) 345-6789",
    status: "frozen",
    membership_plan: "8 Classes / Month",
    next_billing_date: "2025-03-01",
    last_check_in_at: "2024-11-20",
    created_at: "2024-03-10T10:00:00Z",
  },
  {
    id: "4",
    first_name: "Robin",
    last_name: "Taylor",
    email: "robin.t@email.com",
    phone: "(555) 456-7890",
    status: "active",
    membership_plan: "8 Classes / Month",
    next_billing_date: "2025-01-28",
    last_check_in_at: "2024-12-29",
    created_at: "2024-11-01T10:00:00Z",
  },
  {
    id: "5",
    first_name: "Casey",
    last_name: "Williams",
    email: "casey.w@email.com",
    phone: "(555) 567-8901",
    status: "cancelled",
    membership_plan: "Unlimited Training",
    next_billing_date: null,
    last_check_in_at: "2024-10-30",
    created_at: "2023-05-15T10:00:00Z",
  },
  {
    id: "6",
    first_name: "Alex",
    last_name: "Rivera",
    email: "alex.r@email.com",
    phone: "(555) 678-9012",
    status: "delinquent",
    membership_plan: "Unlimited Training",
    next_billing_date: null,
    last_check_in_at: "2024-12-08",
    created_at: "2024-09-01T10:00:00Z",
  },
  {
    id: "7",
    first_name: "Chris",
    last_name: "Jones",
    email: "chris.j@email.com",
    phone: "(555) 789-0123",
    status: "new",
    membership_plan: "Unlimited Training",
    next_billing_date: "2025-12-30",
    last_check_in_at: "2025-11-30",
    created_at: "2023-05-15T10:00:00Z",
  },
  {
    id: "8",
    first_name: "Sam",
    last_name: "Johnson",
    email: "sam.j@email.com",
    phone: "(555) 789-0123",
    status: "active",
    membership_plan: "Drop-In",
    next_billing_date: "2025-12-23",
    last_check_in_at: "2024-12-31",
    created_at: "2024-12-01T10:00:00Z",
  },
  {
    id: "9",
    first_name: "Taylor",
    last_name: "Brown",
    email: "taylor.b@email.com",
    phone: null,
    status: "active",
    membership_plan: "Unlimited Training",
    next_billing_date: "2025-01-05",
    last_check_in_at: "2024-12-31",
    created_at: "2024-12-15T10:00:00Z",
  },
];

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: "default" | "green" | "red" | "blue";
}

function KPICard({ title, value, icon, color = "default" }: KPICardProps) {
  const colorClasses = {
    default: "text-gray-400",
    green: "text-emerald-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };

  const bgClasses = {
    default: "bg-gray-800/50",
    green: "bg-emerald-500/10",
    red: "bg-red-500/10",
    blue: "bg-blue-500/10",
  };

  return (
    <div className="bg-[--color-background-dark] rounded-lg p-4 border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        <div className={`p-2 rounded-lg ${bgClasses[color]}`}>
          <span className={colorClasses[color]}>{icon}</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function Members() {
  const { viewRole } = useDevRole();
  const isCoach = viewRole === "coach";
  const canManageMembers = viewRole === "owner" || viewRole === "employee";

  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  // UI state
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Fetch members from Supabase
  useEffect(() => {
    let isMounted = true;

    async function fetchMembers() {
      setIsLoading(true);
      setError(null);

      try {
        // Try to fetch from Supabase
        const { data, error: supabaseError } = await supabase
          .from("members")
          .select("*")
          .order("created_at", { ascending: false });

        if (!isMounted) return;

        if (supabaseError) {
          console.warn(
            "Supabase fetch failed, using mock data:",
            supabaseError
          );
          // Fall back to mock data if Supabase is not configured
          // Deduplicate by ID to prevent duplicates
          const uniqueMembers = Array.from(
            new Map(mockMembersData.map((m) => [m.id, m])).values()
          );
          setMembers(uniqueMembers);
        } else {
          // Deduplicate by ID to prevent duplicates
          const uniqueMembers = Array.from(
            new Map((data || []).map((m: Member) => [m.id, m])).values()
          );
          setMembers(uniqueMembers);
        }
      } catch (err) {
        if (!isMounted) return;
        console.warn("Failed to fetch members, using mock data:", err);
        // Fall back to mock data - deduplicate by ID
        const uniqueMembers = Array.from(
          new Map(mockMembersData.map((m) => [m.id, m])).values()
        );
        setMembers(uniqueMembers);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get unique plans from members
  const uniquePlans = useMemo(() => {
    const plans = new Set(
      members.map((m) => m.membership_plan).filter(Boolean) as string[]
    );
    return Array.from(plans).sort();
  }, [members]);

  // Filter members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
      const searchLower = search.toLowerCase();

      const matchesSearch =
        fullName.includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;

      const matchesPlan =
        planFilter === "all" || member.membership_plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [members, search, statusFilter, planFilter]);

  // KPI calculations
  const kpis = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.status === "active").length;
    const delinquentMembers = members.filter(
      (m) => m.status === "delinquent"
    ).length;
    const newThisMonth = members.filter((m) => {
      const createdAt = new Date(m.created_at);
      return (
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    }).length;

    return {
      totalMembers,
      activeMembers,
      delinquentMembers,
      newThisMonth,
    };
  }, [members]);

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setDetailsOpen(true);
  };

  const handleAddMember = (data: MemberFormData) => {
    // TODO: Integrate with Supabase insert
    console.log("Add member:", data);

    // For now, just add to local state with mock data
    const newMember: Member = {
      id: `temp-${Date.now()}`,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || null,
      status: "active",
      membership_plan: data.membership_plan || null,
      next_billing_date: null,
      last_check_in_at: null,
      created_at: new Date().toISOString(),
    };

    // Deduplicate by ID when adding new member
    setMembers((prev) => {
      const existing = new Map(prev.map((m) => [m.id, m]));
      existing.set(newMember.id, newMember);
      return Array.from(existing.values());
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Members</h1>
        {canManageMembers && (
          <Button
            onClick={() => setAddModalOpen(true)}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Add Member
          </Button>
        )}
      </div>

      {/* Subtitle */}
      <p className="text-gray-400 mb-6">
        {isCoach
          ? "View members who attend your classes."
          : "Manage all members, memberships, and attendance."}
      </p>

      {/* KPI Cards */}
      <div
        className={`grid grid-cols-2 ${
          isCoach ? "lg:grid-cols-2" : "lg:grid-cols-4"
        } gap-4 mb-6`}
      >
        <KPICard
          title="Total Members"
          value={kpis.totalMembers}
          color="default"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
        <KPICard
          title="Active"
          value={kpis.activeMembers}
          color="green"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        {/* Delinquent - hide from coaches (billing related) */}
        {!isCoach && (
          <KPICard
            title="Delinquent"
            value={kpis.delinquentMembers}
            color="red"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          />
        )}
        {!isCoach && (
          <KPICard
            title="New This Month"
            value={kpis.newThisMonth}
            color="blue"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            }
          />
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Members List Card */}
      <WidgetCard title="">
        {/* Filters */}
        <MemberFilters
          search={search}
          status={statusFilter}
          plan={planFilter}
          plans={uniquePlans}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPlanChange={setPlanFilter}
        />

        {/* Member List */}
        <MemberList
          members={filteredMembers}
          isLoading={isLoading}
          onSelect={handleSelectMember}
        />
      </WidgetCard>

      {/* Member Details Sheet */}
      <MemberDetailsSheet
        member={selectedMember}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      {/* Add Member Modal - only for users who can manage members */}
      {canManageMembers && (
        <AddMemberModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddMember}
        />
      )}
    </div>
  );
}
