/**
 * @file Attendance.tsx
 * @description Attendance tracking and statistics page for the Staff Portal.
 * Provides an overview of gym attendance metrics and recent check-in activity.
 * Owners see expanded metrics; coaches see a filtered view.
 *
 * @portal Staff
 * @roles owner (full stats), coach (limited stats)
 * @route /attendance
 *
 * @features
 * - Statistics cards:
 *   - Today's check-ins (all roles)
 *   - This week's check-ins (all roles)
 *   - This month's check-ins (owner only)
 *   - Average per class (owner only)
 * - Recent check-ins list showing:
 *   - Member name
 *   - Class attended
 *   - Check-in time
 *
 * @note
 * For real-time check-in operations, use the Check-ins page (/check-ins).
 * This page is for viewing attendance statistics and history.
 *
 * @data
 * - Currently uses mock data (to be replaced with Supabase 'check_ins' table)
 */

import { useState } from 'react';
import { useDevRole } from '../../lib/devRoleMode';
import WidgetCard from '../../components/WidgetCard';

// Mock attendance data
const mockAttendanceStats = {
  today: 38,
  thisWeek: 245,
  thisMonth: 892,
  avgPerClass: 12,
};

const mockRecentCheckins = [
  { id: '1', memberName: 'Chris Martinez', className: 'Beginner BJJ', time: '9:15 AM' },
  { id: '2', memberName: 'Jordan Lee', className: 'Beginner BJJ', time: '9:12 AM' },
  { id: '3', memberName: 'Morgan Chen', className: 'Beginner BJJ', time: '9:08 AM' },
  { id: '4', memberName: 'Taylor Brown', className: 'Beginner BJJ', time: '9:05 AM' },
  { id: '5', memberName: 'Alex Rivera', className: 'Beginner BJJ', time: '9:02 AM' },
];

export default function Attendance() {
  const { viewRole } = useDevRole();
  const isOwner = viewRole === 'owner';
  const isCoach = viewRole === 'coach';

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Attendance</h1>
        <p className="text-gray-400 mt-1">
          {isCoach ? 'Track attendance for your classes' : 'Overview of gym attendance'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <WidgetCard title="Today">
          <p className="text-3xl font-bold text-white">{mockAttendanceStats.today}</p>
          <p className="text-xs text-gray-500 mt-1">check-ins</p>
        </WidgetCard>
        
        <WidgetCard title="This Week">
          <p className="text-3xl font-bold text-white">{mockAttendanceStats.thisWeek}</p>
          <p className="text-xs text-gray-500 mt-1">check-ins</p>
        </WidgetCard>
        
        {isOwner && (
          <>
            <WidgetCard title="This Month">
              <p className="text-3xl font-bold text-white">{mockAttendanceStats.thisMonth}</p>
              <p className="text-xs text-gray-500 mt-1">check-ins</p>
            </WidgetCard>
            
            <WidgetCard title="Avg Per Class">
              <p className="text-3xl font-bold text-white">{mockAttendanceStats.avgPerClass}</p>
              <p className="text-xs text-gray-500 mt-1">members</p>
            </WidgetCard>
          </>
        )}
      </div>

      {/* Recent Check-ins */}
      <WidgetCard title="Recent Check-ins">
        <div className="divide-y divide-gray-800">
          {mockRecentCheckins.map((checkin) => (
            <div key={checkin.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{checkin.memberName}</p>
                <p className="text-sm text-gray-500">{checkin.className}</p>
              </div>
              <span className="text-sm text-gray-400">{checkin.time}</span>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}


