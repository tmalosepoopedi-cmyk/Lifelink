import React from 'react';
import { ShieldCheck, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSafety: () => void;
  onSelectCategory: (cat: any) => void;
  onSelectCity: (city: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSafety,
  onSelectCategory,
  onSelectCity,
}) => {
  return (
    <footer className="bg-white border-t border-stone-200 text-stone-600 text-xs pb-20 md:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                L
              </span>
              <span className="text-lg font-extrabold tracking-tight text-stone-900">
                LifeLink
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-emerald-800 bg-emerald-50 border border-emerald-200">
                South Africa
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed max-w-sm mb-4">
              LifeLink is a mobile-friendly local services marketplace empowering South African households to find skilled, affordable, vetted local artisans — while unlocking sustainable income for local taskers.
            </p>
            <div className="flex items-center gap-2 text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>SAPS Background Checked & Verified Artisans</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider text-[11px]">
              Services
            </h4>
            <ul className="space-y-2">
              {['handyman', 'cleaning', 'plumbing', 'bakkie_moving', 'electrical'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onSelectCategory(id)}
                    className="hover:text-emerald-700 transition-colors capitalize"
                  >
                    {id.replace('_', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* South African Cities */}
          <div>
            <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider text-[11px]">
              Major Cities
            </h4>
            <ul className="space-y-2">
              {['Johannesburg', 'Cape Town', 'Pretoria', 'Durban', 'Gqeberha (Port Elizabeth)'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => onSelectCity(city)}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider text-[11px]">
              Trust & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSafety}
                  className="hover:text-emerald-700 transition-colors"
                >
                  LifeLink Safety Shield
                </button>
              </li>
              <li>
                <span className="text-stone-400">Emergency: 0800 543 354</span>
              </li>
              <li>
                <span className="text-stone-400">WhatsApp: +27 82 455 1982</span>
              </li>
              <li>
                <span className="text-stone-400">support@lifelink.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <div>
            © 2026 LifeLink Technologies (Pty) Ltd. All rights reserved. Registered in South Africa.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Built with care for South Africa</span>
            <span className="text-emerald-700">🇿🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
