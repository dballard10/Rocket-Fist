// Types
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "frozen" | "cancelled";
  plan: string;
  nextBillingDate: string;
  lastCheckIn: string;
  joinDate: string;
  notes: string;
  emergencyContact: string;
  stripeCustomerId: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | "all-levels";
  discipline: string;
  duration: number;
  defaultCoach: string;
  defaultCoachId: string;
  isActive: boolean;
}

export interface ClassInstance {
  id: string;
  classId: string;
  className: string;
  coach: string;
  coachId: string;
  startTime: Date;
  endTime: Date;
  maxCapacity: number;
  registeredCount: number;
  attendedCount: number;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  status: "succeeded" | "failed" | "refunded";
  date: string;
  description: string;
}

export interface AttendanceRecord {
  id: string;
  className: string;
  date: string;
  status: "attended" | "registered" | "no-show";
}

export interface Coach {
  id: string;
  name: string;
}

// Mock Members
export const mockMembers: Member[] = [
  {
    id: "1",
    name: "Chris Martinez",
    email: "chris.m@email.com",
    phone: "(555) 123-4567",
    status: "active",
    plan: "Unlimited Training",
    nextBillingDate: "2024-02-01",
    lastCheckIn: "2024-01-15",
    joinDate: "2023-06-15",
    notes:
      "Competing in local tournament March 2024. Focus on takedown defense.",
    emergencyContact: "Maria Martinez - (555) 987-6543",
    stripeCustomerId: "cus_abc123",
  },
  {
    id: "2",
    name: "Jordan Lee",
    email: "jordan.lee@email.com",
    phone: "(555) 234-5678",
    status: "active",
    plan: "Unlimited Training",
    nextBillingDate: "2024-02-05",
    lastCheckIn: "2024-01-14",
    joinDate: "2023-08-20",
    notes: "Recovering from knee injury. Light training only.",
    emergencyContact: "Sam Lee - (555) 876-5432",
    stripeCustomerId: "cus_def456",
  },
  {
    id: "3",
    name: "Morgan Chen",
    email: "morgan.c@email.com",
    phone: "(555) 345-6789",
    status: "frozen",
    plan: "8 Classes / Month",
    nextBillingDate: "2024-03-01",
    lastCheckIn: "2023-12-20",
    joinDate: "2023-03-10",
    notes: "Membership frozen until March due to travel.",
    emergencyContact: "Alex Chen - (555) 765-4321",
    stripeCustomerId: "cus_ghi789",
  },
  {
    id: "4",
    name: "Robin Taylor",
    email: "robin.t@email.com",
    phone: "(555) 456-7890",
    status: "active",
    plan: "8 Classes / Month",
    nextBillingDate: "2024-01-28",
    lastCheckIn: "2024-01-13",
    joinDate: "2023-11-01",
    notes: "",
    emergencyContact: "Casey Taylor - (555) 654-3210",
    stripeCustomerId: "cus_jkl012",
  },
  {
    id: "5",
    name: "Casey Williams",
    email: "casey.w@email.com",
    phone: "(555) 567-8901",
    status: "cancelled",
    plan: "Unlimited Training",
    nextBillingDate: "-",
    lastCheckIn: "2023-11-30",
    joinDate: "2022-05-15",
    notes: "Cancelled due to relocation. May return in 6 months.",
    emergencyContact: "Pat Williams - (555) 543-2109",
    stripeCustomerId: "cus_mno345",
  },
  {
    id: "6",
    name: "Alex Rivera",
    email: "alex.r@email.com",
    phone: "(555) 678-9012",
    status: "active",
    plan: "Unlimited Training",
    nextBillingDate: "2024-02-10",
    lastCheckIn: "2024-01-15",
    joinDate: "2023-09-01",
    notes: "Interested in private lessons.",
    emergencyContact: "Jamie Rivera - (555) 432-1098",
    stripeCustomerId: "cus_pqr678",
  },
];

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: "1",
    name: "Beginner BJJ",
    description:
      "Introduction to Brazilian Jiu-Jitsu fundamentals for beginners.",
    skillLevel: "beginner",
    discipline: "BJJ",
    duration: 60,
    defaultCoach: "Maria Coach",
    defaultCoachId: "coach1",
    isActive: true,
  },
  {
    id: "2",
    name: "All-Levels BJJ",
    description: "BJJ training for all skill levels with rolling sessions.",
    skillLevel: "all-levels",
    discipline: "BJJ",
    duration: 90,
    defaultCoach: "Maria Coach",
    defaultCoachId: "coach1",
    isActive: true,
  },
  {
    id: "3",
    name: "Muay Thai Fundamentals",
    description:
      "Learn the art of eight limbs - punches, kicks, elbows, and knees.",
    skillLevel: "beginner",
    discipline: "Muay Thai",
    duration: 60,
    defaultCoach: "Jake Coach",
    defaultCoachId: "coach2",
    isActive: true,
  },
  {
    id: "4",
    name: "Striking Conditioning",
    description:
      "High-intensity conditioning focused on striking cardio and technique.",
    skillLevel: "all-levels",
    discipline: "Striking",
    duration: 45,
    defaultCoach: "Jake Coach",
    defaultCoachId: "coach2",
    isActive: true,
  },
  {
    id: "5",
    name: "Advanced MMA",
    description:
      "Advanced techniques combining wrestling, striking, and submissions.",
    skillLevel: "advanced",
    discipline: "MMA",
    duration: 90,
    defaultCoach: "Maria Coach",
    defaultCoachId: "coach1",
    isActive: false,
  },
];

// Mock Coaches
export const mockCoaches: Coach[] = [
  { id: "coach1", name: "Maria Coach" },
  { id: "coach2", name: "Jake Coach" },
];

// Generate class instances for the week
function generateClassInstances(): ClassInstance[] {
  const instances: ClassInstance[] = [];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday

  const schedule = [
    {
      classId: "1",
      dayOffset: 0,
      hour: 18,
      coach: "Maria Coach",
      coachId: "coach1",
    }, // Mon 6pm
    {
      classId: "3",
      dayOffset: 0,
      hour: 19,
      coach: "Jake Coach",
      coachId: "coach2",
    }, // Mon 7pm
    {
      classId: "2",
      dayOffset: 1,
      hour: 19,
      coach: "Maria Coach",
      coachId: "coach1",
    }, // Tue 7pm
    {
      classId: "1",
      dayOffset: 2,
      hour: 18,
      coach: "Maria Coach",
      coachId: "coach1",
    }, // Wed 6pm
    {
      classId: "3",
      dayOffset: 2,
      hour: 19,
      coach: "Jake Coach",
      coachId: "coach2",
    }, // Wed 7pm
    {
      classId: "2",
      dayOffset: 3,
      hour: 19,
      coach: "Maria Coach",
      coachId: "coach1",
    }, // Thu 7pm
    {
      classId: "1",
      dayOffset: 4,
      hour: 18,
      coach: "Maria Coach",
      coachId: "coach1",
    }, // Fri 6pm
    {
      classId: "4",
      dayOffset: 5,
      hour: 11,
      coach: "Jake Coach",
      coachId: "coach2",
    }, // Sat 11am
  ];

  schedule.forEach((item, index) => {
    const classData = mockClasses.find((c) => c.id === item.classId);
    if (!classData) return;

    const startTime = new Date(startOfWeek);
    startTime.setDate(startOfWeek.getDate() + item.dayOffset);
    startTime.setHours(item.hour, 0, 0, 0);

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + classData.duration);

    const registered = Math.floor(Math.random() * 15) + 5;
    const attended = startTime < now ? Math.floor(registered * 0.8) : 0;

    instances.push({
      id: `inst-${index + 1}`,
      classId: item.classId,
      className: classData.name,
      coach: item.coach,
      coachId: item.coachId,
      startTime,
      endTime,
      maxCapacity: classData.discipline === "BJJ" ? 30 : 20,
      registeredCount: registered,
      attendedCount: attended,
    });
  });

  return instances;
}

export const mockClassInstances: ClassInstance[] = generateClassInstances();

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "pay1",
    memberId: "1",
    memberName: "Chris Martinez",
    amount: 14900,
    status: "succeeded",
    date: "2024-01-15",
    description: "Unlimited Training - Monthly",
  },
  {
    id: "pay2",
    memberId: "2",
    memberName: "Jordan Lee",
    amount: 14900,
    status: "succeeded",
    date: "2024-01-14",
    description: "Unlimited Training - Monthly",
  },
  {
    id: "pay3",
    memberId: "4",
    memberName: "Robin Taylor",
    amount: 9900,
    status: "succeeded",
    date: "2024-01-13",
    description: "8 Classes / Month",
  },
  {
    id: "pay4",
    memberId: "6",
    memberName: "Alex Rivera",
    amount: 14900,
    status: "failed",
    date: "2024-01-12",
    description: "Unlimited Training - Monthly",
  },
  {
    id: "pay5",
    memberId: "6",
    memberName: "Alex Rivera",
    amount: 14900,
    status: "succeeded",
    date: "2024-01-12",
    description: "Unlimited Training - Monthly (retry)",
  },
  {
    id: "pay6",
    memberId: "5",
    memberName: "Casey Williams",
    amount: 7500,
    status: "refunded",
    date: "2024-01-10",
    description: "Partial refund - early cancellation",
  },
  {
    id: "pay7",
    memberId: "1",
    memberName: "Chris Martinez",
    amount: 14900,
    status: "succeeded",
    date: "2023-12-15",
    description: "Unlimited Training - Monthly",
  },
  {
    id: "pay8",
    memberId: "2",
    memberName: "Jordan Lee",
    amount: 14900,
    status: "succeeded",
    date: "2023-12-14",
    description: "Unlimited Training - Monthly",
  },
];

// Mock Attendance for a specific member
export function getMemberAttendance(memberId: string): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const now = new Date();

  for (let i = 0; i < 10; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * 2 + Math.floor(Math.random() * 3)));

    const classOptions = [
      "Beginner BJJ",
      "All-Levels BJJ",
      "Muay Thai Fundamentals",
      "Striking Conditioning",
    ];
    const statusOptions: ("attended" | "no-show")[] = [
      "attended",
      "attended",
      "attended",
      "no-show",
    ];

    records.push({
      id: `att-${memberId}-${i}`,
      className: classOptions[Math.floor(Math.random() * classOptions.length)],
      date: date.toISOString().split("T")[0],
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    });
  }

  return records.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Mock Payments for a specific member
export function getMemberPayments(memberId: string): Payment[] {
  return mockPayments.filter((p) => p.memberId === memberId);
}



