import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Banknote, 
  Zap, 
  AlertCircle 
} from 'lucide-react';
import { Provider, Booking, PaymentMethod } from '../types';

interface BookingModalProps {
  provider: Provider | null;
  onClose: () => void;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  provider,
  onClose,
  onBookingConfirmed,
}) => {
  if (!provider) return null;

  const [hours, setHours] = useState(2);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('09:00 - 12:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+27 ');
  const [clientAddress, setClientAddress] = useState('');
  const [suburb, setSuburb] = useState(provider.suburbs[0] || 'Sandton');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('escrow');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const hourlyTotal = hours * provider.hourlyRate;
  const totalCost = hourlyTotal + provider.calloutFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!clientAddress.trim()) {
      setErrorMsg('Please enter your street address');
      return;
    }
    if (clientPhone.trim().length < 8) {
      setErrorMsg('Please enter a valid South African phone number');
      return;
    }

    const bookingId = `LL-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking: Booking = {
      id: bookingId,
      providerId: provider.id,
      providerName: provider.name,
      providerAvatar: provider.avatar,
      providerPhone: provider.phone,
      serviceCategory: provider.category,
      serviceTitle: `${provider.title} (${hours} hrs)`,
      date,
      timeSlot,
      clientName,
      clientPhone,
      clientAddress,
      suburb,
      city: provider.city,
      status: 'confirmed',
      totalCost,
      paymentMethod,
      notes,
      createdAt: new Date().toISOString(),
      rated: false,
    };

    onBookingConfirmed(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-stone-900"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border border-stone-200"
            />
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Book {provider.name}
              </h2>
              <p className="text-xs text-stone-500">
                {provider.title} · {provider.city}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Service Hours Stepper */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
              Estimated Duration (Hours)
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 6, 8].map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => setHours(h)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    hours === h
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {h} hr{h > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2.5 bg-white text-xs text-stone-800 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                Time Window
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 bg-white text-xs text-stone-800 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="08:00 - 11:00">Morning (08:00 - 11:00)</option>
                <option value="11:00 - 14:00">Midday (11:00 - 14:00)</option>
                <option value="14:00 - 17:00">Afternoon (14:00 - 17:00)</option>
                <option value="17:00 - 19:00">Evening (17:00 - 19:00)</option>
              </select>
            </div>
          </div>

          {/* Load Shedding Notice */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Load-Shedding Tip:</span> Please verify your suburb's power schedule if the task requires electric power outlets. Sipho and our solar artisans carry cordless backups.
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Your Contact & Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-500 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Malose Poopedi"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-500 mb-1">Phone Number (SA)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+27 82 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-stone-500 mb-1">Street Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. 14 Oxford Rd, Flat 2B"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-500 mb-1">Suburb</label>
                <select
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {provider.suburbs.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-500 mb-1">
                Special instructions (gate code, parking, exact task notes)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Gate code is #1982. Please park in visitor bay 12."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Payment Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('escrow')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  paymentMethod === 'escrow'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">LifeLink Escrow</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Pay online; released on completion</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ozow_eft')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  paymentMethod === 'ozow_eft'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">Instant EFT (Ozow)</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Capitec, FNB, Standard Bank, Nedbank</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">Cash on Finish</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Inspect first, pay artisan in cash</div>
              </button>
            </div>
          </div>

          {/* Price Breakdown Summary */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>{hours} hours × R{provider.hourlyRate}/hr</span>
              <span className="tabular-nums font-semibold">R{hourlyTotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Callout & traveling fee</span>
              <span className="tabular-nums font-semibold">
                {provider.calloutFee > 0 ? `R${provider.calloutFee}` : 'Free'}
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Trust & safety fee</span>
              <span className="text-emerald-700 font-semibold">Free (MVP Promotion)</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm">
              <span className="font-extrabold text-stone-900">Total payable</span>
              <span className="font-extrabold text-stone-900 tabular-nums text-base">R{totalCost}</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Booking for R{totalCost}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
