import React from 'react';
import { Search, MapPin, ShieldCheck, Zap, Banknote, Sparkles, Truck } from 'lucide-react';
import { SA_CITIES, HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onSearchSubmit: () => void;
  onQuickCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  onSearchSubmit,
  onQuickCategory,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Search Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Trusted Local Services across South Africa</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Affordable local skills. Handled by trusted South African artisans.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Find background-checked plumbers, domestic cleaners, electricians, bakkie movers, and handymen in your neighborhood — with transparent pricing in Rands and guaranteed work.
            </p>

            {/* High-Intent Search Box */}
            <div className="bg-stone-50 p-2 sm:p-2.5 rounded-2xl border border-stone-200 shadow-sm max-w-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                }}
                className="flex flex-col sm:flex-row gap-2"
              >
                {/* Search Term */}
                <div className="relative flex-1 flex items-center">
                  <Search className="w-5 h-5 text-stone-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Geyser leak, deep clean, bakkie moving..."
                    className="w-full pl-10 pr-3 py-2.5 bg-white rounded-xl text-sm text-stone-900 placeholder-stone-400 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>

                {/* City Selector */}
                <div className="relative sm:w-48 flex items-center">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-white rounded-xl text-sm text-stone-800 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {SA_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 text-stone-400 text-xs">▼</div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm shrink-0 active:scale-95 text-center"
                >
                  Find Help
                </button>
              </form>

              {/* Quick Prompt Pills */}
              <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                <span className="font-medium text-stone-600">Popular:</span>
                {[
                  { label: 'Geyser repair', cat: 'plumbing' },
                  { label: 'Deep home cleaning', cat: 'cleaning' },
                  { label: 'Bakkie furniture move', cat: 'bakkie_moving' },
                  { label: 'Inverter wiring', cat: 'electrical' },
                  { label: 'TV mounting', cat: 'handyman' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onQuickCategory(item.cat)}
                    className="px-2.5 py-1 bg-white hover:bg-stone-200/70 border border-stone-200 rounded-md text-stone-700 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/3] bg-stone-100 group">
              <img
                src={HERO_IMAGE}
                alt="Friendly South African artisan ready with tools for home repairs"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Gradient scrim overlay for badge contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/10 pointer-events-none" />

              {/* Verified Artisan Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">LifeLink Verified</h4>
                    <p className="text-[11px] text-stone-500">ID checked & background reviewed</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-700 tabular-nums">4.9 / 5.0</span>
                  <p className="text-[10px] text-stone-400">Over 1,200 jobs done</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Full-Width Trust Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">SA ID & Police Checked</h3>
              <p className="text-xs text-stone-500 leading-snug mt-0.5">Every provider verified with National ID and criminal checks.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-700">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Transparent ZAR (R) Pricing</h3>
              <p className="text-xs text-stone-500 leading-snug mt-0.5">No hidden fees. Upfront hourly rates and fair callout charges.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-700">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Load-Shedding Ready</h3>
              <p className="text-xs text-stone-500 leading-snug mt-0.5">Taskers equipped with cordless tools, inverters, and backup batteries.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Local Neighborhood Focus</h3>
              <p className="text-xs text-stone-500 leading-snug mt-0.5">Support local skills right in your suburb or township.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
