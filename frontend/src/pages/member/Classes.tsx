/**
 * @file Classes.tsx (Member)
 * @description Class browsing and booking page for the Member Portal.
 * Allows members to view available classes, filter by day and discipline,
 * and make/cancel reservations.
 *
 * @portal Member
 * @roles member (gym members only)
 * @route /schedule
 *
 * @features
 * - Day selector:
 *   - Horizontal scrollable 7-day picker
 *   - Today highlighted, future days selectable
 * - Discipline filter:
 *   - Filter by: All, BJJ, Muay Thai, MMA, Boxing, Wrestling
 *   - Pill-style buttons
 * - Class cards showing:
 *   - Class name, instructor, time, duration
 *   - Discipline and skill level badges
 *   - Spots remaining with color coding (green/amber/red)
 *   - Capacity progress bar
 *   - Reserve/Cancel/Full action buttons
 * - Reservation state management:
 *   - Reserved classes highlighted with emerald border
 *   - Full classes show disabled "Full" button
 *
 * @data
 * - Currently uses mock data (to be replaced with Supabase 'classes' table)
 * - Reservations managed in local state (to be synced with Supabase)
 */

import { useState } from "react";
import Button from "../../components/ui/Button";

// Mock classes data - replace with Supabase query
const mockClasses = [
  {
    id: "1",
    name: "Beginner BJJ",
    instructor: "Sarah Chen",
    time: "9:00 AM",
    duration: "60 min",
    spotsLeft: 4,
    totalSpots: 16,
    discipline: "BJJ",
    level: "Beginner",
    isReserved: false,
  },
  {
    id: "2",
    name: "All-Levels BJJ",
    instructor: "Sarah Chen",
    time: "12:00 PM",
    duration: "90 min",
    spotsLeft: 0,
    totalSpots: 18,
    discipline: "BJJ",
    level: "All Levels",
    isReserved: true,
  },
  {
    id: "3",
    name: "Muay Thai Fundamentals",
    instructor: "Tommy Rodriguez",
    time: "5:00 PM",
    duration: "60 min",
    spotsLeft: 7,
    totalSpots: 20,
    discipline: "Muay Thai",
    level: "Beginner",
    isReserved: false,
  },
  {
    id: "4",
    name: "Advanced MMA",
    instructor: "Alex Kim",
    time: "7:00 PM",
    duration: "90 min",
    spotsLeft: 2,
    totalSpots: 12,
    discipline: "MMA",
    level: "Advanced",
    isReserved: false,
  },
  {
    id: "5",
    name: "Boxing Cardio",
    instructor: "Mike Johnson",
    time: "6:00 AM",
    duration: "45 min",
    spotsLeft: 10,
    totalSpots: 15,
    discipline: "Boxing",
    level: "All Levels",
    isReserved: false,
  },
];

const disciplines = ["All", "BJJ", "Muay Thai", "MMA", "Boxing", "Wrestling"];

// Generate next 7 days
const getWeekDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      isToday: i === 0,
    });
  }
  return days;
};

export default function MemberClasses() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");
  const [reservations, setReservations] = useState<Record<string, boolean>>({
    "2": true, // Pre-reserved class
  });

  const weekDays = getWeekDays();

  const filteredClasses = mockClasses.filter(
    (cls) =>
      selectedDiscipline === "All" || cls.discipline === selectedDiscipline
  );

  const handleReserve = (classId: string) => {
    setReservations((prev) => ({ ...prev, [classId]: true }));
  };

  const handleCancel = (classId: string) => {
    setReservations((prev) => {
      const next = { ...prev };
      delete next[classId];
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Classes</h1>
        <p className="text-gray-400 mt-1">Browse and book classes</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-hide">
        {weekDays.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`
              flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl transition-all
              ${
                selectedDay === index
                  ? "bg-[--color-primary-red] text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
              }
            `}
          >
            <span className="text-xs font-medium uppercase">
              {day.isToday ? "Today" : day.dayName}
            </span>
            <span className="text-xl font-bold mt-1">{day.dayNum}</span>
          </button>
        ))}
      </div>

      {/* Discipline Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-hide">
        {disciplines.map((discipline) => (
          <button
            key={discipline}
            onClick={() => setSelectedDiscipline(discipline)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                selectedDiscipline === discipline
                  ? "bg-white text-black"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white"
              }
            `}
          >
            {discipline}
          </button>
        ))}
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {filteredClasses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No classes available for this filter
            </p>
          </div>
        ) : (
          filteredClasses.map((cls) => {
            const isReserved = reservations[cls.id];
            const isFull = cls.spotsLeft === 0 && !isReserved;

            return (
              <div
                key={cls.id}
                className={`
                  bg-[--color-background-dark] rounded-xl border p-5 transition-all
                  ${
                    isReserved
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-gray-800 hover:border-gray-700"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white">
                        {cls.name}
                      </h3>
                      {isReserved && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
                          Reserved
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{cls.instructor}</p>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-white font-medium">{cls.time}</span>
                      <span className="text-gray-500">{cls.duration}</span>
                      <span
                        className={`
                        ${
                          cls.spotsLeft <= 3
                            ? "text-amber-400"
                            : "text-gray-500"
                        }
                      `}
                      >
                        {cls.spotsLeft} spots left
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                        {cls.discipline}
                      </span>
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                        {cls.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isReserved ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancel(cls.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Cancel
                      </Button>
                    ) : isFull ? (
                      <Button variant="secondary" size="sm" disabled>
                        Full
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleReserve(cls.id)}
                      >
                        Reserve
                      </Button>
                    )}
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mt-4">
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        cls.spotsLeft === 0
                          ? "bg-red-500"
                          : cls.spotsLeft <= 3
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${
                          ((cls.totalSpots - cls.spotsLeft) / cls.totalSpots) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
