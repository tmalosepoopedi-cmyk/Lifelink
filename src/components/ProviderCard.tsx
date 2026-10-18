import React from 'react';
import { Star, ShieldCheck, MapPin, Zap, Truck, Check, MessageSquare } from 'lucide-react';
import { Provider } from '../types';

interface ProviderCardProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
  onBook: (provider: Provider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onSelect,
  onBook,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Avatar, Name, Category & Verified Status */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative shrink-0">
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-xl object-cover border border-stone-200"
              onError={(e) => {
                // Fallback to initials
                e.currentTarget.style.display = 'none';
              }}
            />
            {provider.availableToday && (
              <span
                title="Available Today"
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold"
              >
                ✓
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors truncate">
                {provider.name}
              </h3>
              {provider.verifiedId && (
                <span className="inline-flex items-center text-emerald-700 text-xs" title="National ID & SAPS Background Verified">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>

            <p className="text-xs text-stone-500 font-medium truncate mt-0.5">
              {provider.title}
            </p>

            {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{provider.rating.toFixed(2)}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{provider.reviewCount} reviews</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{provider.completedJobs} jobs</span>
            </div>
          </div>
        </div>

        {/* Bio Snippet */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
          {provider.bio}
        </p>

        {/* Local Highlights & Equipment */}
        <div className="space-y-1.5 py-2.5 border-t border-b border-stone-100 text-[11px] text-stone-600">
          <div className="flex items-center gap-1.5 text-stone-700">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">
              {provider.city} ({provider.suburbs.slice(0, 3).join(', ')}...)
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-500">
            {provider.hasOwnTransport && (
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-600" />
                Own transport
              </span>
            )}
            {provider.loadSheddingBackup && (
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-600" />
                Inverter/Cordless ready
              </span>
            )}
          </div>

          <div className="text-[11px] text-stone-500">
            Languages: {provider.languages.join(', ')}
          </div>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-4 pt-2 flex items-center justify-between gap-3">
        <div>
          <div className="text-base font-extrabold text-stone-900 tabular-nums">
            R{provider.hourlyRate}
            <span className="text-xs font-normal text-stone-500">/hr</span>
          </div>
          <div className="text-[10px] text-stone-400 tabular-nums">
            {provider.calloutFee > 0 ? `+ R${provider.calloutFee} callout` : 'No callout fee'}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelect(provider)}
            className="px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Details
          </button>
          <button
            onClick={() => onBook(provider)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shadow-xs active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
