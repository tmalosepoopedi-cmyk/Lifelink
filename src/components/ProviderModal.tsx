import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Zap, 
  Truck, 
  Wrench, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Provider } from '../types';

interface ProviderModalProps {
  provider: Provider | null;
  onClose: () => void;
  onBook: (provider: Provider) => void;
}

export const ProviderModal: React.FC<ProviderModalProps> = ({
  provider,
  onClose,
  onBook,
}) => {
  if (!provider) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-stone-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-stone-100 bg-stone-50/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  {provider.name}
                </h2>
                {provider.verifiedId && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Verified Artisan
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-stone-600 mt-0.5">
                {provider.title}
              </p>

              <div className="flex items-center gap-2 text-xs text-stone-500 mt-2">
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="tabular-nums">{provider.rating.toFixed(2)}</span>
                </span>
                <span>·</span>
                <span className="tabular-nums">{provider.reviewCount} reviews</span>
                <span>·</span>
                <span className="tabular-nums">{provider.completedJobs} completed jobs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Rates & Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Hourly Rate</span>
              <p className="text-lg font-extrabold text-stone-900 tabular-nums">R{provider.hourlyRate}<span className="text-xs font-normal text-stone-500">/hr</span></p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Callout Fee</span>
              <p className="text-lg font-extrabold text-stone-900 tabular-nums">
                {provider.calloutFee > 0 ? `R${provider.calloutFee}` : 'Free'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Experience</span>
              <p className="text-lg font-extrabold text-stone-900 tabular-nums">{provider.yearsExperience} yrs</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Availability</span>
              <p className="text-sm font-bold text-emerald-700 mt-1">
                {provider.availableToday ? 'Available Today' : 'Schedule Ahead'}
              </p>
            </div>
          </div>

          {/* About & Bio */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
              About the Service Provider
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {provider.bio}
            </p>
          </div>

          {/* Verification & Trust Credentials */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              LifeLink Trust & Safety Clearance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>South African National ID verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Police criminal clearance verified (SAPS)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Phone number & WhatsApp confirmed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Covered by LifeLink Service Guarantee</span>
              </div>
            </div>
          </div>

          {/* Service Areas & Readiness */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Coverage & Readiness
            </h3>
            <div className="flex items-start gap-2 text-xs text-stone-600">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800">Operating in {provider.city}: </span>
                <span>{provider.suburbs.join(' · ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-stone-700 pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>{provider.hasOwnTransport ? 'Has own reliable bakkie/vehicle' : 'Public transit'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-emerald-700" />
                <span>{provider.hasOwnTools ? 'Arrives fully equipped with tools' : 'Client tools requested'}</span>
              </div>
              {provider.loadSheddingBackup && (
                <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Battery / Inverter equipped for load-shedding</span>
                </div>
              )}
            </div>
          </div>

          {/* Past Work / Portfolio */}
          {provider.portfolio && provider.portfolio.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                Job Gallery & Craftsmanship
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {provider.portfolio.map((imgUrl, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] border border-stone-200 bg-stone-100">
                    <img
                      src={imgUrl}
                      alt={`${provider.name} past job`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Recent Client Reviews ({provider.reviews.length})
              </h3>
              <span className="text-xs text-stone-500">Verified South African Clients</span>
            </div>

            <div className="space-y-3">
              {provider.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900">{rev.reviewerName}</span>
                      <span className="text-[11px] text-stone-500 ml-1.5">({rev.reviewerLocation})</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-stone-400 mt-1.5">
                    {rev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-stone-500">Estimated base rate</div>
            <div className="text-lg font-extrabold text-stone-900 tabular-nums">
              R{provider.hourlyRate}
              <span className="text-xs font-normal text-stone-500">/hr</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${provider.phone}`}
              className="p-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Call Provider"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Call</span>
            </a>

            <a
              href={provider.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBook(provider);
              }}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-95"
            >
              Book Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
