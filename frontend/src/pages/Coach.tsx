import { useState, useEffect, useMemo } from 'react';
import TodayClassesList from '../components/coach/TodayClassesList';
import ClassRoster from '../components/coach/ClassRoster';
import type { ClassSummary, ClassRosterEntry } from '../types/classes';
import { supabase } from '../lib/supabase/client';

// Mock data for development (remove when Supabase is connected)
const mockClasses: ClassSummary[] = [
  {
    id: '1',
    name: 'Beginner BJJ',
    start_time: new Date().setHours(9, 0, 0, 0).toString(),
    end_time: new Date().setHours(10, 0, 0, 0).toString(),
    location: 'Mat Room A',
    reserved_count: 12,
    checked_in_count: 8,
  },
  {
    id: '2',
    name: 'All-Levels BJJ',
    start_time: new Date().setHours(12, 0, 0, 0).toString(),
    end_time: new Date().setHours(13, 30, 0, 0).toString(),
    location: 'Mat Room A',
    reserved_count: 18,
    checked_in_count: 5,
  },
  {
    id: '3',
    name: 'Muay Thai Fundamentals',
    start_time: new Date().setHours(17, 0, 0, 0).toString(),
    end_time: new Date().setHours(18, 0, 0, 0).toString(),
    location: 'Striking Area',
    reserved_count: 15,
    checked_in_count: 0,
  },
  {
    id: '4',
    name: 'Advanced MMA',
    start_time: new Date().setHours(19, 0, 0, 0).toString(),
    end_time: new Date().setHours(20, 30, 0, 0).toString(),
    location: 'Mat Room B',
    reserved_count: 8,
    checked_in_count: 0,
  },
];

const mockRosterData: Record<string, ClassRosterEntry[]> = {
  '1': [
    { reservation_id: 'r1', member_id: 'm1', member_name: 'Chris Martinez', status: 'checked_in' },
    { reservation_id: 'r2', member_id: 'm2', member_name: 'Jordan Lee', status: 'checked_in' },
    { reservation_id: 'r3', member_id: 'm3', member_name: 'Morgan Chen', status: 'reserved' },
    { reservation_id: 'r4', member_id: 'm4', member_name: 'Robin Taylor', status: 'checked_in' },
    { reservation_id: 'r5', member_id: 'm5', member_name: 'Casey Williams', status: 'reserved' },
    { reservation_id: 'r6', member_id: 'm6', member_name: 'Alex Rivera', status: 'checked_in' },
    { reservation_id: 'r7', member_id: 'm7', member_name: 'Sam Johnson', status: 'reserved' },
    { reservation_id: 'r8', member_id: 'm8', member_name: 'Taylor Brown', status: 'checked_in' },
    { reservation_id: 'r9', member_id: 'm9', member_name: 'Jamie Garcia', status: 'checked_in' },
    { reservation_id: 'r10', member_id: 'm10', member_name: 'Drew Anderson', status: 'checked_in' },
    { reservation_id: 'r11', member_id: 'm11', member_name: 'Quinn Thomas', status: 'checked_in' },
    { reservation_id: 'r12', member_id: 'm12', member_name: 'Riley Jackson', status: 'reserved' },
  ],
  '2': [
    { reservation_id: 'r13', member_id: 'm1', member_name: 'Chris Martinez', status: 'checked_in' },
    { reservation_id: 'r14', member_id: 'm2', member_name: 'Jordan Lee', status: 'reserved' },
    { reservation_id: 'r15', member_id: 'm3', member_name: 'Morgan Chen', status: 'checked_in' },
    { reservation_id: 'r16', member_id: 'm4', member_name: 'Robin Taylor', status: 'reserved' },
    { reservation_id: 'r17', member_id: 'm5', member_name: 'Casey Williams', status: 'checked_in' },
    { reservation_id: 'r18', member_id: 'm6', member_name: 'Alex Rivera', status: 'reserved' },
    { reservation_id: 'r19', member_id: 'm7', member_name: 'Sam Johnson', status: 'reserved' },
    { reservation_id: 'r20', member_id: 'm8', member_name: 'Taylor Brown', status: 'reserved' },
    { reservation_id: 'r21', member_id: 'm9', member_name: 'Jamie Garcia', status: 'checked_in' },
    { reservation_id: 'r22', member_id: 'm10', member_name: 'Drew Anderson', status: 'reserved' },
    { reservation_id: 'r23', member_id: 'm11', member_name: 'Quinn Thomas', status: 'reserved' },
    { reservation_id: 'r24', member_id: 'm12', member_name: 'Riley Jackson', status: 'reserved' },
    { reservation_id: 'r25', member_id: 'm13', member_name: 'Avery White', status: 'reserved' },
    { reservation_id: 'r26', member_id: 'm14', member_name: 'Cameron Harris', status: 'reserved' },
    { reservation_id: 'r27', member_id: 'm15', member_name: 'Peyton Clark', status: 'reserved' },
    { reservation_id: 'r28', member_id: 'm16', member_name: 'Blake Lewis', status: 'checked_in' },
    { reservation_id: 'r29', member_id: 'm17', member_name: 'Skyler Robinson', status: 'reserved' },
    { reservation_id: 'r30', member_id: 'm18', member_name: 'Dakota Walker', status: 'reserved' },
  ],
  '3': [
    { reservation_id: 'r31', member_id: 'm1', member_name: 'Chris Martinez', status: 'reserved' },
    { reservation_id: 'r32', member_id: 'm3', member_name: 'Morgan Chen', status: 'reserved' },
    { reservation_id: 'r33', member_id: 'm5', member_name: 'Casey Williams', status: 'reserved' },
    { reservation_id: 'r34', member_id: 'm7', member_name: 'Sam Johnson', status: 'reserved' },
    { reservation_id: 'r35', member_id: 'm9', member_name: 'Jamie Garcia', status: 'reserved' },
    { reservation_id: 'r36', member_id: 'm11', member_name: 'Quinn Thomas', status: 'reserved' },
    { reservation_id: 'r37', member_id: 'm13', member_name: 'Avery White', status: 'reserved' },
    { reservation_id: 'r38', member_id: 'm15', member_name: 'Peyton Clark', status: 'reserved' },
    { reservation_id: 'r39', member_id: 'm17', member_name: 'Skyler Robinson', status: 'reserved' },
    { reservation_id: 'r40', member_id: 'm19', member_name: 'Jordan Mitchell', status: 'reserved' },
    { reservation_id: 'r41', member_id: 'm20', member_name: 'Sydney Moore', status: 'reserved' },
    { reservation_id: 'r42', member_id: 'm21', member_name: 'Parker Young', status: 'reserved' },
    { reservation_id: 'r43', member_id: 'm22', member_name: 'Hayden King', status: 'reserved' },
    { reservation_id: 'r44', member_id: 'm23', member_name: 'Emerson Scott', status: 'reserved' },
    { reservation_id: 'r45', member_id: 'm24', member_name: 'River Green', status: 'reserved' },
  ],
  '4': [
    { reservation_id: 'r46', member_id: 'm2', member_name: 'Jordan Lee', status: 'reserved' },
    { reservation_id: 'r47', member_id: 'm4', member_name: 'Robin Taylor', status: 'reserved' },
    { reservation_id: 'r48', member_id: 'm6', member_name: 'Alex Rivera', status: 'reserved' },
    { reservation_id: 'r49', member_id: 'm8', member_name: 'Taylor Brown', status: 'reserved' },
    { reservation_id: 'r50', member_id: 'm10', member_name: 'Drew Anderson', status: 'reserved' },
    { reservation_id: 'r51', member_id: 'm12', member_name: 'Riley Jackson', status: 'reserved' },
    { reservation_id: 'r52', member_id: 'm14', member_name: 'Cameron Harris', status: 'reserved' },
    { reservation_id: 'r53', member_id: 'm16', member_name: 'Blake Lewis', status: 'reserved' },
  ],
};

// Format mock data start_time/end_time to proper ISO strings
const formattedMockClasses = mockClasses.map((c) => ({
  ...c,
  start_time: new Date(parseInt(c.start_time)).toISOString(),
  end_time: new Date(parseInt(c.end_time)).toISOString(),
}));

export default function Coach() {
  const [classes, setClasses] = useState<ClassSummary[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedClassRoster, setSelectedClassRoster] = useState<ClassRosterEntry[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isLoadingRoster, setIsLoadingRoster] = useState(false);
  const [updatingReservationId, setUpdatingReservationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get the selected class summary
  const selectedClass = useMemo(
    () => classes.find((c) => c.id === selectedClassId) || null,
    [classes, selectedClassId]
  );

  // Fetch today's classes on mount
  useEffect(() => {
    async function fetchTodaysClasses() {
      setIsLoadingClasses(true);
      setError(null);

      try {
        // Get today's start and end in local time
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        // Try to fetch from Supabase
        const { data: classesData, error: classesError } = await supabase
          .from('classes')
          .select('*')
          .gte('start_time', startOfDay.toISOString())
          .lt('start_time', endOfDay.toISOString())
          .order('start_time', { ascending: true });

        if (classesError) {
          console.warn('Supabase fetch failed, using mock data:', classesError);
          setClasses(formattedMockClasses);
          return;
        }

        if (!classesData || classesData.length === 0) {
          // Use mock data if no classes found
          setClasses(formattedMockClasses);
          return;
        }

        // Fetch reservation counts for each class
        const classIds = classesData.map((c) => c.id);
        const { data: reservationsData } = await supabase
          .from('class_reservations')
          .select('class_id, status')
          .in('class_id', classIds)
          .neq('status', 'cancelled');

        // Aggregate counts
        const countsMap: Record<string, { reserved: number; checked_in: number }> = {};
        classIds.forEach((id) => {
          countsMap[id] = { reserved: 0, checked_in: 0 };
        });

        if (reservationsData) {
          reservationsData.forEach((r) => {
            if (r.status === 'reserved') {
              countsMap[r.class_id].reserved++;
            } else if (r.status === 'checked_in') {
              countsMap[r.class_id].checked_in++;
            }
          });
        }

        // Map to ClassSummary
        const classSummaries: ClassSummary[] = classesData.map((c) => ({
          id: c.id,
          name: c.name,
          start_time: c.start_time,
          end_time: c.end_time,
          location: c.location,
          reserved_count: countsMap[c.id].reserved + countsMap[c.id].checked_in,
          checked_in_count: countsMap[c.id].checked_in,
        }));

        setClasses(classSummaries);
      } catch (err) {
        console.warn('Failed to fetch classes, using mock data:', err);
        setClasses(formattedMockClasses);
      } finally {
        setIsLoadingClasses(false);
      }
    }

    fetchTodaysClasses();
  }, []);

  // Fetch roster when a class is selected
  useEffect(() => {
    if (!selectedClassId) {
      setSelectedClassRoster([]);
      return;
    }

    async function fetchRoster() {
      setIsLoadingRoster(true);

      try {
        // Try to fetch from Supabase
        const { data, error: rosterError } = await supabase
          .from('class_reservations')
          .select(`
            id,
            member_id,
            status,
            members (
              first_name,
              last_name
            )
          `)
          .eq('class_id', selectedClassId)
          .neq('status', 'cancelled')
          .order('created_at', { ascending: true });

        if (rosterError || !data) {
          console.warn('Supabase roster fetch failed, using mock data:', rosterError);
          // Use mock data
          const mockRoster = mockRosterData[selectedClassId] || [];
          setSelectedClassRoster(mockRoster);
          return;
        }

        // Map to ClassRosterEntry
        const rosterEntries: ClassRosterEntry[] = data.map((r: any) => ({
          reservation_id: r.id,
          member_id: r.member_id,
          member_name: r.members
            ? `${r.members.first_name} ${r.members.last_name}`
            : 'Unknown Member',
          status: r.status,
        }));

        // Sort by name
        rosterEntries.sort((a, b) => a.member_name.localeCompare(b.member_name));

        setSelectedClassRoster(rosterEntries);
      } catch (err) {
        console.warn('Failed to fetch roster, using mock data:', err);
        const mockRoster = mockRosterData[selectedClassId] || [];
        setSelectedClassRoster(mockRoster);
      } finally {
        setIsLoadingRoster(false);
      }
    }

    fetchRoster();
  }, [selectedClassId]);

  // Mark member as present
  const handleMarkPresent = async (reservationId: string) => {
    setUpdatingReservationId(reservationId);

    try {
      // Try to update in Supabase
      const { error: updateError } = await supabase
        .from('class_reservations')
        .update({ status: 'checked_in' })
        .eq('id', reservationId);

      if (updateError) {
        console.warn('Supabase update failed, updating locally:', updateError);
      }

      // Optimistically update the roster
      setSelectedClassRoster((prev) =>
        prev.map((entry) =>
          entry.reservation_id === reservationId
            ? { ...entry, status: 'checked_in' }
            : entry
        )
      );

      // Update the class summary counts
      if (selectedClassId) {
        setClasses((prev) =>
          prev.map((c) =>
            c.id === selectedClassId
              ? { ...c, checked_in_count: c.checked_in_count + 1 }
              : c
          )
        );
      }
    } catch (err) {
      console.error('Error marking present:', err);
      setError('Failed to mark member as present. Please try again.');
    } finally {
      setUpdatingReservationId(null);
    }
  };

  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Coach View</h1>
        <p className="text-gray-400 mt-1">Today's Classes</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Classes List */}
        <div className="w-full lg:w-1/2 xl:w-2/5">
          <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-4 md:p-6">
            <h2 className="text-lg font-semibold text-[--color-primary-red] mb-4">
              Classes
            </h2>
            <TodayClassesList
              classes={classes}
              selectedClassId={selectedClassId}
              onSelectClass={handleSelectClass}
              isLoading={isLoadingClasses}
            />
          </div>
        </div>

        {/* Right: Roster Panel */}
        <div className="w-full lg:w-1/2 xl:w-3/5">
          <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-4 md:p-6 min-h-[400px] lg:min-h-[600px]">
            <ClassRoster
              classSummary={selectedClass}
              roster={selectedClassRoster}
              isLoading={isLoadingRoster}
              onMarkPresent={handleMarkPresent}
              updatingReservationId={updatingReservationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


