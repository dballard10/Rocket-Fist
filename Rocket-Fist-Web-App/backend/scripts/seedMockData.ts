import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ============================================================================
// Types
// ============================================================================

type GymRole = 'owner' | 'employee' | 'coach' | 'member';

interface MockUserInput {
  email: string;
  full_name: string;
  role: GymRole;
}

interface MockUser extends MockUserInput {
  id: string;
}

interface MockClass {
  id: string;
  name: string;
  description: string;
  discipline: string;
  skill_level: string;
  default_duration_minutes: number;
  default_coach_user_id: string;
  schedule: { dayOfWeek: number; hour: number; minute: number }[];
}

interface MockMembershipPlan {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  billing_interval: string;
  max_classes_per_interval: number | null;
}

// ============================================================================
// Helper Functions
// ============================================================================

async function handleError(
  error: { message: string; code?: string } | null,
  context: string
): Promise<void> {
  if (error) {
    console.error(`Error in ${context}:`, error.message);
    throw new Error(`Failed at ${context}: ${error.message}`);
  }
}

function getDateForDayOfWeek(dayOfWeek: number, hour: number, minute: number, weeksFromNow = 0): Date {
  const today = new Date();
  const currentDay = today.getDay();
  let daysUntilTarget = dayOfWeek - currentDay;
  
  // If the day has passed this week and we want this week, move to next week
  if (daysUntilTarget < 0) {
    daysUntilTarget += 7;
  }
  
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysUntilTarget + (weeksFromNow * 7));
  targetDate.setHours(hour, minute, 0, 0);
  
  return targetDate;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function getFirstDayOfMonth(monthsAgo = 0): Date {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getRandomPastDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(12, 0, 0, 0);
  return date;
}

// ============================================================================
// Seed Data Definitions
// ============================================================================

// Main gym
const NOVA_GYM = {
  id: randomUUID(),
  name: 'Nova Combat Academy',
  slug: 'nova-combat-academy',
  timezone: 'America/New_York',
};

// Users with roles (IDs will be assigned after auth user creation)
const MOCK_USER_INPUTS: MockUserInput[] = [
  // Owners
  { email: 'dylan.owner@example.com', full_name: 'Dylan Owner', role: 'owner' },
  { email: 'alex.owner@example.com', full_name: 'Alex Owner', role: 'owner' },
  // Coaches
  { email: 'maria.coach@example.com', full_name: 'Maria Coach', role: 'coach' },
  { email: 'jake.coach@example.com', full_name: 'Jake Coach', role: 'coach' },
  // Employees
  { email: 'sam.employee@example.com', full_name: 'Sam Employee', role: 'employee' },
  { email: 'taylor.employee@example.com', full_name: 'Taylor Employee', role: 'employee' },
  // Members
  { email: 'chris.member@example.com', full_name: 'Chris Member', role: 'member' },
  { email: 'jordan.member@example.com', full_name: 'Jordan Member', role: 'member' },
  { email: 'lee.member@example.com', full_name: 'Lee Member', role: 'member' },
  { email: 'morgan.member@example.com', full_name: 'Morgan Member', role: 'member' },
  { email: 'robin.member@example.com', full_name: 'Robin Member', role: 'member' },
  { email: 'casey.member@example.com', full_name: 'Casey Member', role: 'member' },
];

// Will be populated after auth users are created
let MOCK_USERS: MockUser[] = [];
let COACHES: MockUser[] = [];
let MEMBERS: MockUser[] = [];

// Classes with schedule (dayOfWeek: 0=Sun, 1=Mon, 2=Tue, etc.)
// Coach IDs will be assigned dynamically after users are created
interface MockClassInput {
  name: string;
  description: string;
  discipline: string;
  skill_level: string;
  default_duration_minutes: number;
  coachIndex: number; // 0 = first coach, 1 = second coach
  schedule: { dayOfWeek: number; hour: number; minute: number }[];
}

const MOCK_CLASS_INPUTS: MockClassInput[] = [
  {
    name: 'Beginner BJJ',
    description: 'Introduction to Brazilian Jiu-Jitsu fundamentals for beginners.',
    discipline: 'bjj',
    skill_level: 'beginner',
    default_duration_minutes: 60,
    coachIndex: 0,
    schedule: [
      { dayOfWeek: 1, hour: 18, minute: 0 }, // Mon 6pm
      { dayOfWeek: 3, hour: 18, minute: 0 }, // Wed 6pm
      { dayOfWeek: 5, hour: 18, minute: 0 }, // Fri 6pm
    ],
  },
  {
    name: 'All-Levels BJJ',
    description: 'BJJ training for all skill levels with rolling sessions.',
    discipline: 'bjj',
    skill_level: 'all-levels',
    default_duration_minutes: 90,
    coachIndex: 0,
    schedule: [
      { dayOfWeek: 2, hour: 19, minute: 30 }, // Tue 7:30pm
      { dayOfWeek: 4, hour: 19, minute: 30 }, // Thu 7:30pm
    ],
  },
  {
    name: 'Muay Thai Fundamentals',
    description: 'Learn the art of eight limbs - punches, kicks, elbows, and knees.',
    discipline: 'muay_thai',
    skill_level: 'beginner',
    default_duration_minutes: 60,
    coachIndex: 1,
    schedule: [
      { dayOfWeek: 1, hour: 19, minute: 30 }, // Mon 7:30pm
      { dayOfWeek: 3, hour: 19, minute: 30 }, // Wed 7:30pm
    ],
  },
  {
    name: 'Striking Conditioning',
    description: 'High-intensity conditioning focused on striking cardio and technique.',
    discipline: 'striking',
    skill_level: 'all-levels',
    default_duration_minutes: 45,
    coachIndex: 1,
    schedule: [
      { dayOfWeek: 6, hour: 11, minute: 0 }, // Sat 11am
    ],
  },
];

// Will be populated after coaches are created
let MOCK_CLASSES: MockClass[] = [];

// Membership plans
const MEMBERSHIP_PLANS: MockMembershipPlan[] = [
  {
    id: randomUUID(),
    name: 'Unlimited Training',
    description: 'Unlimited access to all classes and open mat sessions.',
    price_cents: 14900,
    billing_interval: 'month',
    max_classes_per_interval: null,
  },
  {
    id: randomUUID(),
    name: '8 Classes / Month',
    description: 'Perfect for those with a busy schedule - 8 classes per month.',
    price_cents: 9900,
    billing_interval: 'month',
    max_classes_per_interval: 8,
  },
];

// ============================================================================
// Seeding Functions
// ============================================================================

async function cleanupExistingData(client: SupabaseClient): Promise<void> {
  console.log('Cleaning up existing data...');

  // Delete in reverse order of dependencies (child tables first)
  // 1. First, get all class instances for this gym's classes to clean up registrations/attendance
  const { data: existingGym } = await client
    .from('gyms')
    .select('id')
    .eq('slug', NOVA_GYM.slug)
    .single();

  if (existingGym) {
    const gymId = existingGym.id;

    // Get class instance IDs for this gym
    const { data: instances } = await client
      .from('class_instances')
      .select('id')
      .eq('gym_id', gymId);

    if (instances && instances.length > 0) {
      const instanceIds = instances.map((i) => i.id);
      await client.from('attendance_logs').delete().in('class_instance_id', instanceIds);
      await client.from('class_registrations').delete().in('class_instance_id', instanceIds);
    }

    // Delete in order respecting foreign keys
    await client.from('class_instances').delete().eq('gym_id', gymId);
    await client.from('classes').delete().eq('gym_id', gymId);
    await client.from('payments').delete().eq('gym_id', gymId);
    await client.from('memberships').delete().eq('gym_id', gymId);
    await client.from('membership_plans').delete().eq('gym_id', gymId);
    await client.from('gym_users').delete().eq('gym_id', gymId);
    await client.from('gyms').delete().eq('id', gymId);

    console.log('  ✓ Cleaned up existing data for gym');
  } else {
    console.log('  ✓ No existing gym data to clean up');
  }
}

async function seedGyms(client: SupabaseClient): Promise<void> {
  console.log('Seeding gyms...');

  const { error } = await client.from('gyms').upsert(
    {
      id: NOVA_GYM.id,
      name: NOVA_GYM.name,
      slug: NOVA_GYM.slug,
      timezone: NOVA_GYM.timezone,
    },
    { onConflict: 'slug' }
  );

  await handleError(error, 'gyms');
  console.log('  ✓ Seeded 1 gym');
}

async function seedAuthUsersAndProfiles(client: SupabaseClient): Promise<void> {
  console.log('Seeding auth users and profiles...');

  const createdUsers: MockUser[] = [];

  for (const userInput of MOCK_USER_INPUTS) {
    // Check if user already exists
    const { data: existingUsers } = await client.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find((u) => u.email === userInput.email);

    let userId: string;

    if (existingUser) {
      console.log(`  → User ${userInput.email} already exists, using existing ID`);
      userId = existingUser.id;
    } else {
      // Create auth user
      const { data, error } = await client.auth.admin.createUser({
        email: userInput.email,
        password: 'password123', // Simple password for dev
        email_confirm: true,
        user_metadata: {
          full_name: userInput.full_name,
        },
      });

      if (error) {
        console.error(`  ✗ Failed to create auth user ${userInput.email}:`, error.message);
        throw new Error(`Failed to create auth user: ${error.message}`);
      }

      userId = data.user.id;
      console.log(`  → Created auth user: ${userInput.email}`);
    }

    createdUsers.push({
      id: userId,
      email: userInput.email,
      full_name: userInput.full_name,
      role: userInput.role,
    });
  }

  // Update global user arrays
  MOCK_USERS = createdUsers;
  COACHES = MOCK_USERS.filter((u) => u.role === 'coach');
  MEMBERS = MOCK_USERS.filter((u) => u.role === 'member');

  // Build MOCK_CLASSES now that we have coach IDs
  MOCK_CLASSES = MOCK_CLASS_INPUTS.map((input) => ({
    id: randomUUID(),
    name: input.name,
    description: input.description,
    discipline: input.discipline,
    skill_level: input.skill_level,
    default_duration_minutes: input.default_duration_minutes,
    default_coach_user_id: COACHES[input.coachIndex].id,
    schedule: input.schedule,
  }));

  // Now upsert user_profiles (might already exist via trigger, but ensure data is correct)
  const profiles = MOCK_USERS.map((user) => ({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
  }));

  const { error: profileError } = await client.from('user_profiles').upsert(profiles, {
    onConflict: 'id',
  });

  if (profileError) {
    console.error('Error upserting user_profiles:', profileError.message);
    // Don't throw - profiles might be auto-created by trigger
  }

  console.log(`  ✓ Seeded ${MOCK_USERS.length} auth users and profiles`);
}

async function seedGymUsers(client: SupabaseClient): Promise<void> {
  console.log('Seeding gym users...');

  const gymUsers = MOCK_USERS.map((user) => ({
    id: randomUUID(),
    gym_id: NOVA_GYM.id,
    user_id: user.id,
    role: user.role,
  }));

  // Delete existing gym_users for this gym to avoid duplicates
  await client.from('gym_users').delete().eq('gym_id', NOVA_GYM.id);

  const { error } = await client.from('gym_users').insert(gymUsers);

  await handleError(error, 'gym_users');
  console.log(`  ✓ Seeded ${gymUsers.length} gym users`);
}

async function seedClasses(client: SupabaseClient): Promise<void> {
  console.log('Seeding classes...');

  const classes = MOCK_CLASSES.map((c) => ({
    id: c.id,
    gym_id: NOVA_GYM.id,
    name: c.name,
    description: c.description,
    discipline: c.discipline,
    skill_level: c.skill_level,
    default_duration_minutes: c.default_duration_minutes,
    default_coach_user_id: c.default_coach_user_id,
    is_active: true,
  }));

  const { error } = await client.from('classes').upsert(classes, {
    onConflict: 'id',
  });

  await handleError(error, 'classes');
  console.log(`  ✓ Seeded ${classes.length} classes`);
}

async function seedClassInstances(client: SupabaseClient): Promise<void> {
  console.log('Seeding class instances...');

  const instances: {
    id: string;
    gym_id: string;
    class_id: string;
    coach_user_id: string;
    start_time: string;
    end_time: string;
    max_capacity: number;
  }[] = [];

  // Create instances for the current week and next week
  for (const mockClass of MOCK_CLASSES) {
    for (const scheduleItem of mockClass.schedule) {
      // This week
      const thisWeekDate = getDateForDayOfWeek(
        scheduleItem.dayOfWeek,
        scheduleItem.hour,
        scheduleItem.minute,
        0
      );
      
      // Next week
      const nextWeekDate = getDateForDayOfWeek(
        scheduleItem.dayOfWeek,
        scheduleItem.hour,
        scheduleItem.minute,
        1
      );

      // Also create some past instances (last week)
      const lastWeekDate = new Date(thisWeekDate);
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);

      for (const date of [lastWeekDate, thisWeekDate, nextWeekDate]) {
        const endTime = addMinutes(date, mockClass.default_duration_minutes);
        
        instances.push({
          id: randomUUID(),
          gym_id: NOVA_GYM.id,
          class_id: mockClass.id,
          coach_user_id: mockClass.default_coach_user_id,
          start_time: date.toISOString(),
          end_time: endTime.toISOString(),
          max_capacity: mockClass.discipline === 'bjj' ? 30 : 20,
        });
      }
    }
  }

  // Delete existing instances for this gym
  await client.from('class_instances').delete().eq('gym_id', NOVA_GYM.id);

  const { error } = await client.from('class_instances').insert(instances);

  await handleError(error, 'class_instances');
  console.log(`  ✓ Seeded ${instances.length} class instances`);

  // Store for use in registrations/attendance
  return instances as any;
}

async function seedMembershipPlans(client: SupabaseClient): Promise<void> {
  console.log('Seeding membership plans...');

  const plans = MEMBERSHIP_PLANS.map((plan) => ({
    id: plan.id,
    gym_id: NOVA_GYM.id,
    name: plan.name,
    description: plan.description,
    price_cents: plan.price_cents,
    billing_interval: plan.billing_interval,
    max_classes_per_interval: plan.max_classes_per_interval,
    is_active: true,
  }));

  const { error } = await client.from('membership_plans').upsert(plans, {
    onConflict: 'id',
  });

  await handleError(error, 'membership_plans');
  console.log(`  ✓ Seeded ${plans.length} membership plans`);
}

async function seedMemberships(client: SupabaseClient): Promise<void> {
  console.log('Seeding memberships...');

  const memberships: {
    id: string;
    gym_id: string;
    user_id: string;
    membership_plan_id: string;
    status: string;
    start_date: string;
    stripe_customer_id: string;
    stripe_subscription_id: string;
  }[] = [];

  // First 3 members get Unlimited, last 3 get 8 Classes
  const unlimitedPlan = MEMBERSHIP_PLANS[0];
  const eightClassPlan = MEMBERSHIP_PLANS[1];
  const startDate = getFirstDayOfMonth(0).toISOString().split('T')[0];

  MEMBERS.forEach((member, index) => {
    const plan = index < 3 ? unlimitedPlan : eightClassPlan;
    const membershipId = randomUUID();

    memberships.push({
      id: membershipId,
      gym_id: NOVA_GYM.id,
      user_id: member.id,
      membership_plan_id: plan.id,
      status: 'active',
      start_date: startDate,
      stripe_customer_id: `cus_mock_${member.email.split('@')[0]}`,
      stripe_subscription_id: `sub_mock_${membershipId.slice(0, 8)}`,
    });
  });

  // Delete existing memberships for this gym
  await client.from('memberships').delete().eq('gym_id', NOVA_GYM.id);

  const { error } = await client.from('memberships').insert(memberships);

  await handleError(error, 'memberships');
  console.log(`  ✓ Seeded ${memberships.length} memberships`);

  // Store for payments
  return memberships as any;
}

async function seedPayments(client: SupabaseClient): Promise<void> {
  console.log('Seeding payments...');

  const payments: {
    id: string;
    gym_id: string;
    user_id: string;
    membership_id: string | null;
    amount_cents: number;
    currency: string;
    status: string;
    paid_at: string;
    stripe_payment_intent_id: string;
  }[] = [];

  MEMBERS.forEach((member, index) => {
    const plan = index < 3 ? MEMBERSHIP_PLANS[0] : MEMBERSHIP_PLANS[1];
    
    // Create payment for last month
    const lastMonthDate = getFirstDayOfMonth(1);
    lastMonthDate.setDate(lastMonthDate.getDate() + Math.floor(Math.random() * 5));
    
    payments.push({
      id: randomUUID(),
      gym_id: NOVA_GYM.id,
      user_id: member.id,
      membership_id: null, // We'd need to track membership IDs, keeping simple
      amount_cents: plan.price_cents,
      currency: 'USD',
      status: 'succeeded',
      paid_at: lastMonthDate.toISOString(),
      stripe_payment_intent_id: `pi_mock_${randomUUID().slice(0, 12)}`,
    });

    // Create payment for this month
    const thisMonthDate = getFirstDayOfMonth(0);
    thisMonthDate.setDate(thisMonthDate.getDate() + Math.floor(Math.random() * 5));
    
    payments.push({
      id: randomUUID(),
      gym_id: NOVA_GYM.id,
      user_id: member.id,
      membership_id: null,
      amount_cents: plan.price_cents,
      currency: 'USD',
      status: 'succeeded',
      paid_at: thisMonthDate.toISOString(),
      stripe_payment_intent_id: `pi_mock_${randomUUID().slice(0, 12)}`,
    });
  });

  // Delete existing payments for this gym
  await client.from('payments').delete().eq('gym_id', NOVA_GYM.id);

  const { error } = await client.from('payments').insert(payments);

  await handleError(error, 'payments');
  console.log(`  ✓ Seeded ${payments.length} payments`);
}

async function seedRegistrationsAndAttendance(client: SupabaseClient): Promise<void> {
  console.log('Seeding class registrations and attendance...');

  // Fetch recent class instances
  const { data: instances, error: instancesError } = await client
    .from('class_instances')
    .select('id, start_time')
    .eq('gym_id', NOVA_GYM.id)
    .order('start_time', { ascending: true });

  await handleError(instancesError, 'fetching class_instances');

  if (!instances || instances.length === 0) {
    console.log('  ⚠ No class instances found, skipping registrations');
    return;
  }

  const registrations: {
    id: string;
    class_instance_id: string;
    user_id: string;
    status: string;
  }[] = [];

  const attendanceLogs: {
    id: string;
    class_instance_id: string;
    user_id: string;
    checked_in_at: string;
  }[] = [];

  // For each instance, register 3-5 random members
  for (const instance of instances) {
    const numRegistrations = 3 + Math.floor(Math.random() * 3); // 3-5 registrations
    const shuffledMembers = [...MEMBERS].sort(() => Math.random() - 0.5);
    const selectedMembers = shuffledMembers.slice(0, numRegistrations);

    for (const member of selectedMembers) {
      const registrationId = randomUUID();
      const instanceDate = new Date(instance.start_time);
      const isPast = instanceDate < new Date();

      registrations.push({
        id: registrationId,
        class_instance_id: instance.id,
        user_id: member.id,
        status: isPast ? 'attended' : 'registered',
      });

      // For past classes, add attendance logs (80% attendance rate)
      if (isPast && Math.random() < 0.8) {
        attendanceLogs.push({
          id: randomUUID(),
          class_instance_id: instance.id,
          user_id: member.id,
          checked_in_at: instanceDate.toISOString(),
        });
      }
    }
  }

  // Delete existing registrations and attendance for this gym's instances
  const instanceIds = instances.map((i) => i.id);
  
  await client.from('attendance_logs').delete().in('class_instance_id', instanceIds);
  await client.from('class_registrations').delete().in('class_instance_id', instanceIds);

  // Insert registrations
  const { error: regError } = await client.from('class_registrations').insert(registrations);
  await handleError(regError, 'class_registrations');

  // Insert attendance logs
  if (attendanceLogs.length > 0) {
    const { error: attError } = await client.from('attendance_logs').insert(attendanceLogs);
    await handleError(attError, 'attendance_logs');
  }

  console.log(`  ✓ Seeded ${registrations.length} class registrations`);
  console.log(`  ✓ Seeded ${attendanceLogs.length} attendance logs`);
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  console.log('');
  console.log('🥊 FightGym OS - Seeding Mock Data');
  console.log('===================================');
  console.log('');

  try {
    // Clean up existing data first (respects foreign key constraints)
    await cleanupExistingData(supabase);

    // Seed in order of dependencies
    await seedGyms(supabase);
    await seedAuthUsersAndProfiles(supabase);
    await seedGymUsers(supabase);
    await seedClasses(supabase);
    await seedClassInstances(supabase);
    await seedMembershipPlans(supabase);
    await seedMemberships(supabase);
    await seedPayments(supabase);
    await seedRegistrationsAndAttendance(supabase);

    console.log('');
    console.log('===================================');
    console.log('✅ Seeding complete!');
    console.log('');
    console.log('Summary:');
    console.log(`  • Gym: ${NOVA_GYM.name}`);
    console.log(`  • Users: ${MOCK_USER_INPUTS.length} (2 owners, 2 coaches, 2 employees, 6 members)`);
    console.log(`  • Classes: ${MOCK_CLASS_INPUTS.length}`);
    console.log(`  • Membership Plans: ${MEMBERSHIP_PLANS.length}`);
    console.log('');
    console.log('Test credentials: any email above with password "password123"');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();

