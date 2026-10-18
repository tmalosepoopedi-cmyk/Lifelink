import React from 'react';
import { Search, Briefcase, Plus, Calendar, UserCheck } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: 'browse' | 'tasks' | 'bookings' | 'provider_dash';
  setCurrentTab: (tab: 'browse' | 'tasks' | 'bookings' | 'provider_dash') => void;
  onOpenPostTask: () => void;
  activeBookingsCount: number;
  isProviderMode: boolean;
  setIsProviderMode: (val: boolean) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenPostTask,
  activeBookingsCount,
  isProviderMode,
  setIsProviderMode,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 pb-safe">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {/* Tab 1: Explore */}
        <button
          onClick={() => {
            setIsProviderMode(false);
            setCurrentTab('browse');
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] ${
            currentTab === 'browse' && !isProviderMode
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Explore</span>
        </button>

        {/* Tab 2: Community Tasks */}
        <button
          onClick={() => {
            setIsProviderMode(false);
            setCurrentTab('tasks');
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] ${
            currentTab === 'tasks' && !isProviderMode
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Tasks</span>
        </button>

        {/* Tab 3: Post Task (Highlighted center action) */}
        <div className="flex justify-center items-center">
          <button
            onClick={onOpenPostTask}
            className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            aria-label="Post a Task"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Tab 4: Bookings Tracker */}
        <button
          onClick={() => {
            setIsProviderMode(false);
            setCurrentTab('bookings');
          }}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] ${
            currentTab === 'bookings' && !isProviderMode
              ? 'text-emerald-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Bookings</span>
          {activeBookingsCount > 0 && (
            <span className="absolute top-2 right-4 w-4 h-4 bg-amber-500 text-stone-950 font-bold text-[9px] rounded-full flex items-center justify-center">
              {activeBookingsCount}
            </span>
          )}
        </button>

        {/* Tab 5: Provider Mode Switch */}
        <button
          onClick={() => {
            const nextMode = !isProviderMode;
            setIsProviderMode(nextMode);
            setCurrentTab(nextMode ? 'provider_dash' : 'browse');
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] ${
            isProviderMode
              ? 'text-amber-800 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">
            {isProviderMode ? 'Provider' : 'Tasker?'}
          </span>
        </button>
      </div>
    </div>
  );
};
