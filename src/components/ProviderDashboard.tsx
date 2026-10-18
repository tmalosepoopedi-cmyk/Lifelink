import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Star, 
  Zap, 
  AlertCircle,
  Banknote,
  Briefcase
} from 'lucide-react';
import { Booking, Provider } from '../types';

interface ProviderDashboardProps {
  currentProvider: Provider;
  bookings: Booking[];
  onUpdateStatus: (bookingId: string, status: Booking['status']) => void;
  onExitProviderMode: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({
  currentProvider,
  bookings,
  onUpdateStatus,
  onExitProviderMode,
}) => {
  const [isAvailable, setIsAvailable] = useState(currentProvider.availableToday);
  const [hourlyRate, setHourlyRate] = useState(currentProvider.hourlyRate);
  const [calloutFee, setCalloutFee] = useState(currentProvider.calloutFee);
  const [savedNotice, setSavedNotice] = useState(false);

  const providerBookings = bookings.filter(
    (b) => b.providerId === currentProvider.id || b.providerName === currentProvider.name
  );

  const totalEarnings = providerBookings
    .filter((b) => b.status === 'completed')
    .reduce((acc, curr) => acc + curr.totalCost, 4850);

  const handleSaveRates = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="py-8 bg-stone-50 min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={currentProvider.avatar}
              alt={currentProvider.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  {currentProvider.name}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Provider Console
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {currentProvider.title} · {currentProvider.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Availability Switch */}
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isAvailable
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-stone-200 text-stone-600 border-stone-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-600' : 'bg-stone-400'}`}
              />
              <span>{isAvailable ? 'Accepting Jobs Today' : 'Offline / Busy'}</span>
            </button>

            <button
              onClick={onExitProviderMode}
              className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-100"
            >
              Exit to Client View
            </button>
          </div>
        </div>

        {/* 4-KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-emerald-700" />
              Total Earnings (ZAR)
            </span>
            <div className="text-2xl font-extrabold text-stone-900 mt-2 tabular-nums">
              R{totalEarnings.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              +R1,200 this week (PISP Escrow)
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-700" />
              Jobs Completed
            </span>
            <div className="text-2xl font-extrabold text-stone-900 mt-2 tabular-nums">
              {currentProvider.completedJobs + providerBookings.filter(b => b.status === 'completed').length}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              100% on-time arrival rate
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              Client Rating
            </span>
            <div className="text-2xl font-extrabold text-stone-900 mt-2 tabular-nums">
              {currentProvider.rating.toFixed(2)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              From {currentProvider.reviewCount} verified reviews
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Verification Status
            </span>
            <div className="text-base font-bold text-emerald-700 mt-3 flex items-center gap-1">
              <span>SAPS & ID Cleared</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Renewed for 2026
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Job Requests & Bookings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Your Client Bookings & Requests ({providerBookings.length})
              </h2>
            </div>

            {providerBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
                <Clock className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-stone-800">No active bookings right now</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Keep your availability set to "Accepting Jobs Today" to appear at the top of client search in {currentProvider.city}.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {providerBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-stone-900">{b.id}</span>
                          <span className="text-xs text-stone-400">·</span>
                          <span className="text-xs font-semibold text-emerald-800">{b.serviceTitle}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Client: <strong className="text-stone-800">{b.clientName}</strong> · {b.clientPhone}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                          R{b.totalCost}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded capitalize ${
                          b.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="py-2.5 text-xs text-stone-600 flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{b.date} ({b.timeSlot})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{b.clientAddress}, {b.suburb}</span>
                      </div>
                    </div>

                    {b.notes && (
                      <div className="p-2 bg-stone-50 rounded-lg text-xs text-stone-600 mb-3">
                        Note: "{b.notes}"
                      </div>
                    )}

                    {/* Status Advance Stepper for Artisan */}
                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100 flex-wrap">
                      <span className="text-[11px] font-bold text-stone-400">Update Status:</span>
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => onUpdateStatus(b.id, 'en_route')}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
                        >
                          Mark: En Route to Client
                        </button>
                      )}
                      {b.status === 'en_route' && (
                        <button
                          onClick={() => onUpdateStatus(b.id, 'in_progress')}
                          className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold"
                        >
                          Mark: Started Work
                        </button>
                      )}
                      {b.status === 'in_progress' && (
                        <button
                          onClick={() => onUpdateStatus(b.id, 'completed')}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                        >
                          Mark Job Completed & Request Payment
                        </button>
                      )}
                      {b.status === 'completed' && (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Payment Ready for Payout
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rate & Service Settings */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
                Service Pricing Controls
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Hourly Rate (ZAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-400">R</span>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Standard Callout Fee (ZAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-400">R</span>
                    <input
                      type="number"
                      value={calloutFee}
                      onChange={(e) => setCalloutFee(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveRates}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Save Rates & Coverage
                </button>

                {savedNotice && (
                  <div className="text-center text-xs text-emerald-700 font-bold animate-in fade-in">
                    ✓ Updated rates saved to marketplace!
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips for Providers */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-2">
              <h3 className="font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-700" />
                Pro-Tips for Higher Earnings:
              </h3>
              <ul className="space-y-1.5 text-emerald-900 list-disc list-inside">
                <li>Respond within 15 mins for a 3x higher booking chance.</li>
                <li>Carry battery or cordless tools during load-shedding stages.</li>
                <li>Ask happy clients to leave a 5-star review on LifeLink.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
