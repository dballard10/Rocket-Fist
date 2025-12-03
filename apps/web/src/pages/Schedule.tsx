/**
 * @file Schedule.tsx
 * @description Weekly class schedule management page for the Staff Portal.
 * Displays a calendar view of scheduled class instances and allows staff to
 * view registrations, manage capacity, and check in members.
 *
 * @portal Staff
 * @roles owner (full access), employee (full access), coach (read access)
 * @route /schedule
 *
 * @features
 * - Week-based navigation (previous/next week, "Go to today")
 * - Mobile: Vertical daily list view
 * - Desktop: 7-day grid calendar view
 * - Click class to view details modal with:
 *   - Date, time, coach, capacity info
 *   - Registration list with status badges
 *   - Check-in functionality for upcoming classes
 *   - Edit capacity option
 *   - Cancel class action (upcoming only)
 *
 * @data
 * - Currently uses mockClassInstances (to be replaced with Supabase 'classes' table)
 * - Mock registrations derived from mockMembers
 */

import { useState, useMemo } from "react";
import WidgetCard from "../components/WidgetCard";
import { Button, Modal, Input, StatusBadge } from "@rocket-fist/ui";
import type { ClassInstance } from "../data/mockData";
import { mockClassInstances, mockMembers } from "../data/mockData";

export default function Schedule() {
  const [selectedInstance, setSelectedInstance] =
    useState<ClassInstance | null>(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Get the start of the current week (Monday)
  const weekStart = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1 + currentWeekOffset * 7);
    start.setHours(0, 0, 0, 0);
    return start;
  }, [currentWeekOffset]);

  // Generate days of the week
  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      days.push(date);
    }
    return days;
  }, [weekStart]);

  // Group instances by day
  const instancesByDay = useMemo(() => {
    const map = new Map<string, ClassInstance[]>();

    weekDays.forEach((day) => {
      const dateKey = day.toISOString().split("T")[0];
      map.set(dateKey, []);
    });

    mockClassInstances.forEach((instance) => {
      const dateKey = instance.startTime.toISOString().split("T")[0];
      const existing = map.get(dateKey);
      if (existing) {
        existing.push(instance);
      }
    });

    // Sort each day's instances by time
    map.forEach((instances) => {
      instances.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    });

    return map;
  }, [weekDays]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDayHeader = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    return {
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      isToday,
    };
  };

  const formatWeekRange = () => {
    const endOfWeek = new Date(weekStart);
    endOfWeek.setDate(weekStart.getDate() + 6);

    const startMonth = weekStart.toLocaleDateString("en-US", {
      month: "short",
    });
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" });

    if (startMonth === endMonth) {
      return `${startMonth} ${weekStart.getDate()} - ${endOfWeek.getDate()}, ${weekStart.getFullYear()}`;
    }
    return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${weekStart.getFullYear()}`;
  };

  const isPast = (date: Date) => date < new Date();

  // Mock registrations for selected instance
  const mockRegistrations = selectedInstance
    ? mockMembers.slice(0, selectedInstance.registeredCount).map((m, i) => ({
        id: `reg-${i}`,
        memberName: m.name,
        status:
          i < selectedInstance.attendedCount
            ? "attended"
            : isPast(selectedInstance.startTime)
            ? "no-show"
            : "registered",
      }))
    : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Button
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
          Add Class Instance
        </Button>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          }
        >
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="text-center">
          <h2 className="text-white font-semibold">{formatWeekRange()}</h2>
          {currentWeekOffset !== 0 && (
            <button
              onClick={() => setCurrentWeekOffset(0)}
              className="text-[--color-primary-red] text-sm hover:underline"
            >
              Go to today
            </button>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
          className="flex-row-reverse"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          }
        >
          <span className="hidden sm:inline">Next</span>
        </Button>
      </div>

      {/* Mobile: Vertical List */}
      <div className="md:hidden space-y-4">
        {weekDays.map((day) => {
          const dateKey = day.toISOString().split("T")[0];
          const instances = instancesByDay.get(dateKey) || [];
          const { dayName, dayNum, isToday } = formatDayHeader(day);

          return (
            <div key={dateKey}>
              <div
                className={`flex items-center gap-2 mb-2 ${
                  isToday ? "text-[--color-primary-red]" : "text-gray-400"
                }`}
              >
                <span className="font-semibold">{dayName}</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isToday ? "bg-[--color-primary-red] text-white" : ""
                  }`}
                >
                  {dayNum}
                </span>
              </div>

              {instances.length === 0 ? (
                <p className="text-gray-600 text-sm py-4 text-center border border-dashed border-gray-800 rounded-lg">
                  No classes
                </p>
              ) : (
                <div className="space-y-2">
                  {instances.map((instance) => (
                    <button
                      key={instance.id}
                      onClick={() => setSelectedInstance(instance)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isPast(instance.startTime)
                          ? "bg-gray-800/30 border-gray-800"
                          : "bg-[--color-primary-red]/10 border-[--color-primary-red]/30 hover:border-[--color-primary-red]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-white">
                            {instance.className}
                          </p>
                          <p className="text-sm text-gray-400">
                            {formatTime(instance.startTime)} -{" "}
                            {formatTime(instance.endTime)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {instance.coach}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            {instance.registeredCount}/{instance.maxCapacity}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: Week Grid */}
      <div className="hidden md:block">
        <WidgetCard title="" className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[700px]">
            {/* Day Headers */}
            {weekDays.map((day) => {
              const { dayName, dayNum, isToday } = formatDayHeader(day);
              return (
                <div
                  key={day.toISOString()}
                  className={`text-center py-3 border-b border-gray-700 ${
                    isToday ? "bg-[--color-primary-red]/10" : ""
                  }`}
                >
                  <p
                    className={`text-sm ${
                      isToday ? "text-[--color-primary-red]" : "text-gray-400"
                    }`}
                  >
                    {dayName}
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      isToday ? "text-[--color-primary-red]" : "text-white"
                    }`}
                  >
                    {dayNum}
                  </p>
                </div>
              );
            })}

            {/* Day Content */}
            {weekDays.map((day) => {
              const dateKey = day.toISOString().split("T")[0];
              const instances = instancesByDay.get(dateKey) || [];
              const { isToday } = formatDayHeader(day);

              return (
                <div
                  key={dateKey}
                  className={`min-h-[200px] p-2 border-r border-gray-800 last:border-r-0 ${
                    isToday ? "bg-[--color-primary-red]/5" : ""
                  }`}
                >
                  <div className="space-y-2">
                    {instances.map((instance) => (
                      <button
                        key={instance.id}
                        onClick={() => setSelectedInstance(instance)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-all ${
                          isPast(instance.startTime)
                            ? "bg-gray-800/50 hover:bg-gray-800"
                            : "bg-[--color-primary-red]/20 hover:bg-[--color-primary-red]/30 border border-[--color-primary-red]/30"
                        }`}
                      >
                        <p className="font-medium text-white truncate">
                          {instance.className}
                        </p>
                        <p className="text-gray-400">
                          {formatTime(instance.startTime)}
                        </p>
                        <p className="text-gray-500 truncate">
                          {instance.coach}
                        </p>
                        <p className="text-gray-400 mt-1">
                          {instance.registeredCount}/{instance.maxCapacity}{" "}
                          spots
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </WidgetCard>
      </div>

      {/* Class Instance Detail Modal */}
      <Modal
        isOpen={!!selectedInstance}
        onClose={() => setSelectedInstance(null)}
        title={selectedInstance?.className || "Class Details"}
        size="lg"
      >
        {selectedInstance && (
          <div className="space-y-6">
            {/* Instance Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-white">
                  {selectedInstance.startTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-400">
                  {formatTime(selectedInstance.startTime)} -{" "}
                  {formatTime(selectedInstance.endTime)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Coach</p>
                <p className="text-white">{selectedInstance.coach}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="text-white">
                  {selectedInstance.registeredCount} /{" "}
                  {selectedInstance.maxCapacity} registered
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p
                  className={
                    isPast(selectedInstance.startTime)
                      ? "text-gray-400"
                      : "text-emerald-400"
                  }
                >
                  {isPast(selectedInstance.startTime)
                    ? "Completed"
                    : "Upcoming"}
                </p>
              </div>
            </div>

            {/* Edit Capacity */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-end gap-3">
                <Input
                  label="Max Capacity"
                  type="number"
                  value={selectedInstance.maxCapacity.toString()}
                  onChange={() => {}}
                  className="w-32"
                />
                <Button variant="secondary" size="sm">
                  Update
                </Button>
              </div>
            </div>

            {/* Registrations */}
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white font-medium mb-3">
                Registrations ({mockRegistrations.length})
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {mockRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-lg"
                  >
                    <span className="text-white">{reg.memberName}</span>
                    <div className="flex items-center gap-2">
                      <StatusBadge
                        status={
                          reg.status as "attended" | "registered" | "no-show"
                        }
                        size="sm"
                      />
                      {!isPast(selectedInstance.startTime) && (
                        <Button size="sm" variant="ghost">
                          Check In
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <Button variant="ghost" onClick={() => setSelectedInstance(null)}>
                Close
              </Button>
              <Button variant="secondary">Edit Instance</Button>
              {!isPast(selectedInstance.startTime) && (
                <Button variant="danger">Cancel Class</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
