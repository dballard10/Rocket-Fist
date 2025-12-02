import { useState, useRef, useEffect } from 'react';
import type { Member } from '../../types/members';
import StatusBadge from '../ui/StatusBadge';

interface MemberRowProps {
  member: Member;
  onSelect: (member: Member) => void;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelativeDate(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function MemberRow({ member, onSelect }: MemberRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const fullName = `${member.first_name} ${member.last_name}`;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleViewDetails = () => {
    onSelect(member);
    setMenuOpen(false);
  };

  const handleEditMember = () => {
    // TODO: Implement edit member functionality
    console.log('Edit member:', member.id);
    setMenuOpen(false);
  };

  const handleMarkDelinquent = () => {
    // TODO: Implement mark as delinquent functionality
    console.log('Mark as delinquent:', member.id);
    setMenuOpen(false);
  };

  return (
    <tr
      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer"
      onClick={() => onSelect(member)}
    >
      <td className="py-3 px-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[--color-primary-red] to-[--color-primary-red-dark] flex items-center justify-center text-white text-sm font-medium">
            {getInitials(member.first_name, member.last_name)}
          </div>
          <div>
            <p className="text-white font-medium">{fullName}</p>
            <p className="text-gray-500 text-sm">{member.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-3 text-gray-300">
        {member.membership_plan || '—'}
      </td>
      <td className="py-3 px-3">
        <StatusBadge status={member.status} />
      </td>
      <td className="py-3 px-3 text-gray-400">
        {formatDate(member.next_billing_date)}
      </td>
      <td className="py-3 px-3 text-gray-400">
        {formatRelativeDate(member.last_check_in_at)}
      </td>
      <td className="py-3 px-3">
        <div className="relative flex justify-end" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails();
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                View details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditMember();
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Edit member
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkDelinquent();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
              >
                Mark as delinquent
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

