/**
 * @file Settings.tsx
 * @description Gym settings and staff management page for the Staff Portal.
 * Owner-only page for configuring gym information and managing staff accounts.
 *
 * @portal Staff
 * @roles owner (exclusive access)
 * @route /settings
 *
 * @features
 * - Tabbed interface with two sections:
 *
 * 1. Gym Info tab:
 *   - Gym name, address, phone, email
 *   - Timezone selection
 *   - Save changes button
 *
 * 2. Staff Management tab:
 *   - Staff list table with name, email, role
 *   - Role badges (owner=purple, coach=blue, employee=amber)
 *   - Add staff button (stubbed)
 *   - Action menu per staff member (stubbed)
 *
 * @note
 * This page is only accessible to gym owners.
 * Staff member invitations would trigger email via Supabase Auth.
 *
 * @data
 * - Currently uses mock data (to be replaced with Supabase 'gyms' and 'profiles' tables)
 */

import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Mock gym data
const mockGymData = {
  name: 'Rocket Fist MMA',
  address: '123 Fight Street, Combat City, CA 90210',
  phone: '(555) 123-4567',
  email: 'info@rocketfistmma.com',
  timezone: 'America/Los_Angeles',
};

// Mock staff data
const mockStaff = [
  { id: '1', name: 'John Owner', email: 'john@rocketfist.com', role: 'owner' },
  { id: '2', name: 'Sarah Coach', email: 'sarah@rocketfist.com', role: 'coach' },
  { id: '3', name: 'Mike Coach', email: 'mike@rocketfist.com', role: 'coach' },
  { id: '4', name: 'Emily Front Desk', email: 'emily@rocketfist.com', role: 'employee' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'gym' | 'staff'>('gym');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your gym and staff</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('gym')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${activeTab === 'gym'
              ? 'bg-[--color-primary-red] text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
            }
          `}
        >
          Gym Info
        </button>
        <button
          onClick={() => setActiveTab('staff')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${activeTab === 'staff'
              ? 'bg-[--color-primary-red] text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
            }
          `}
        >
          Staff Management
        </button>
      </div>

      {/* Gym Info Tab */}
      {activeTab === 'gym' && (
        <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-[--color-primary-red] mb-6">
            Gym Information
          </h2>
          
          <div className="space-y-4 max-w-xl">
            <Input
              label="Gym Name"
              defaultValue={mockGymData.name}
              placeholder="Enter gym name"
            />
            <Input
              label="Address"
              defaultValue={mockGymData.address}
              placeholder="Enter address"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone"
                defaultValue={mockGymData.phone}
                placeholder="Enter phone"
              />
              <Input
                label="Email"
                defaultValue={mockGymData.email}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[--color-primary-red]">
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
              </select>
            </div>
            
            <div className="pt-4">
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Management Tab */}
      {activeTab === 'staff' && (
        <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[--color-primary-red]">
              Staff Members
            </h2>
            <Button variant="primary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Staff
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Role</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {mockStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-white">{staff.name}</td>
                    <td className="py-3 px-4 text-gray-400">{staff.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`
                          px-2 py-1 rounded text-xs font-medium capitalize
                          ${staff.role === 'owner' ? 'bg-purple-500/20 text-purple-400' : ''}
                          ${staff.role === 'coach' ? 'bg-blue-500/20 text-blue-400' : ''}
                          ${staff.role === 'employee' ? 'bg-amber-500/20 text-amber-400' : ''}
                        `}
                      >
                        {staff.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


