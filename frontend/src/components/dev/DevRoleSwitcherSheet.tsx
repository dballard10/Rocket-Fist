import { useEffect } from 'react';
import { useDevRole, getRoleInfo } from '../../lib/devRoleMode';
import Button from '../ui/Button';

interface DevRoleSwitcherSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roles = ['owner', 'coach', 'member'] as const;

export default function DevRoleSwitcherSheet({
  open,
  onOpenChange,
}: DevRoleSwitcherSheetProps) {
  const { viewRole, isDevMode, setViewRole, setIsDevMode } = useDevRole();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const handleRoleSelect = (role: ViewRole) => {
    setViewRole(role);
    if (!isDevMode) {
      setIsDevMode(true);
    }
  };

  const handleDisableOverride = () => {
    setIsDevMode(false);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />

      {/* Sheet */}
      <div
        className={`
          absolute right-0 bottom-0 left-0 sm:left-auto sm:top-0 
          sm:w-[360px] max-h-[80vh] sm:max-h-full sm:h-full
          bg-[--color-background-dark] border-t sm:border-t-0 sm:border-l border-gray-800
          rounded-t-2xl sm:rounded-none
          shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-out
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Dev Mode</h2>
              <p className="text-xs text-gray-400">Switch view perspective</p>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Status */}
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Override Active</span>
              <div className={`
                w-3 h-3 rounded-full
                ${isDevMode ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}
              `} />
            </div>
            {isDevMode && (
              <p className="text-xs text-amber-400 mt-2">
                ⚠️ Viewing as <span className="font-semibold">{getRoleInfo(viewRole).label}</span>. 
                Backend auth unchanged.
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
              Select View Role
            </h3>
            <div className="space-y-2">
              {roles.map((role) => {
                const info = getRoleInfo(role);
                const isSelected = viewRole === role && isDevMode;

                return (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg border transition-all
                      ${isSelected 
                        ? `border-${info.color.replace('text-', '')} ${info.bgColor}` 
                        : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${info.bgColor}
                    `}>
                      {role === 'owner' && (
                        <svg className={`w-5 h-5 ${info.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                      {role === 'coach' && (
                        <svg className={`w-5 h-5 ${info.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      )}
                      {role === 'member' && (
                        <svg className={`w-5 h-5 ${info.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${isSelected ? info.color : 'text-white'}`}>
                        {info.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {role === 'owner' && 'Full admin access view'}
                        {role === 'coach' && 'Coach dashboard view'}
                        {role === 'member' && 'Member portal view'}
                      </p>
                    </div>
                    {isSelected && (
                      <svg className={`w-5 h-5 ${info.color}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-xs text-amber-400">
              <strong>Note:</strong> This only changes the frontend view. 
              Backend authorization and RLS policies still use your real role.
            </p>
          </div>
        </div>

        {/* Footer */}
        {isDevMode && (
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleDisableOverride}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Disable Override
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

