import React from 'react';
import { ShieldCheck, Calendar, Briefcase, PlusCircle, UserCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: 'browse' | 'tasks' | 'bookings' | 'provider_dash';
  setCurrentTab: (tab: 'browse' | 'tasks' | 'bookings' | 'provider_dash') => void;
  onOpenPostTask: () => void;
  onOpenSafety: () => void;
  activeBookingsCount: number;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  isProviderMode: boolean;
  setIsProviderMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenPostTask,
  onOpenSafety,
  activeBookingsCount,
  isProviderMode,
  setIsProviderMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setCurrentTab('browse');
                setIsProviderMode(false);
              }}
              className="group text-left focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                  L
                </span>
                <span className="text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                  LifeLink
                </span>
              </div>
            </button>

            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded text-emerald-800 bg-emerald-50 border border-emerald-200">
              South Africa
            </span>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                setIsProviderMode(false);
                setCurrentTab('browse');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                currentTab === 'browse' && !isProviderMode
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : ''
              }`}
            >
              Find Services
            </button>

            <button
              onClick={() => {
                setIsProviderMode(false);
                setCurrentTab('tasks');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                currentTab === 'tasks' && !isProviderMode
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : ''
              }`}
            >
              Task Board
            </button>

            <button
              onClick={() => {
                setIsProviderMode(false);
                setCurrentTab('bookings');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 relative ${
                currentTab === 'bookings' && !isProviderMode
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : ''
              }`}
            >
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[11px] font-bold bg-amber-500 text-stone-950 rounded-full">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSafety}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Safety Guarantee</span>
            </button>

            <button
              onClick={() => {
                setIsProviderMode(!isProviderMode);
                if (!isProviderMode) {
                  setCurrentTab('provider_dash');
                } else {
                  setCurrentTab('browse');
                }
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isProviderMode ? 'text-amber-700 font-semibold' : ''
              }`}
            >
              <Briefcase className="w-4 h-4 text-stone-500" />
              <span>{isProviderMode ? 'Client View' : 'Provider Mode'}</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {isProviderMode ? (
              <button
                onClick={() => {
                  setIsProviderMode(false);
                  setCurrentTab('browse');
                }}
                className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border border-stone-300"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Exit Provider Mode</span>
              </button>
            ) : (
              <button
                onClick={onOpenPostTask}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5 active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post a Task</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
