import React from 'react';
import { ShieldCheck, Lock, Award, HeartHandshake, PhoneCall, CheckCircle2 } from 'lucide-react';

interface SafetyProps {
  onClose?: () => void;
  onOpenSafety?: () => void;
  isModal?: boolean;
}

export const SafetyGuaranteeBanner: React.FC<SafetyProps> = ({ onClose, isModal = false }) => {
  const content = (
    <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden">
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full transition-colors"
        >
          ✕
        </button>
      )}

      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>The LifeLink South Africa Safety Shield</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Safe. Transparent. Guaranteed.
        </h2>

        <p className="text-sm text-stone-300 mt-2 leading-relaxed">
          Inviting someone to your home or office requires total confidence. That’s why LifeLink operates strict South African safety protocols:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-stone-800/80 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-2.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">ID & Criminal Clearance</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every artisan submits a valid South African ID or work permit, verified against national records, along with a police criminal record check.
            </p>
          </div>

          <div className="p-4 bg-stone-800/80 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-2.5 mb-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Escrow Payment Protection</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              When paying with card or Ozow Instant EFT, your money is held in trust and only released once you inspect the job and give final approval.
            </p>
          </div>

          <div className="p-4 bg-stone-800/80 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-2.5 mb-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">LifeLink R5,000 Guarantee</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              In the rare event of verified accidental property damage during a LifeLink booked service, our platform cover has you protected up to R5,000.
            </p>
          </div>

          <div className="p-4 bg-stone-800/80 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-2.5 mb-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">24/7 SA Support Helpline</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Toll-free emergency dispatch: <strong>0800 543 354</strong> or direct WhatsApp support 7 days a week from 07:00 to 20:00.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-3xl w-full">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {content}
    </section>
  );
};
