import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Star, 
  Send, 
  ShieldCheck, 
  AlertCircle,
  Truck,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { Booking, BookingStatus, ChatMessage } from '../types';

interface BookingsTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
  onLeaveReview: (bookingId: string, rating: number, comment: string, tip: number) => void;
}

export const BookingsTrackerModal: React.FC<BookingsTrackerProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateStatus,
  onLeaveReview,
}) => {
  if (!isOpen) return null;

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings[0]?.id || ''
  );
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'LL-89104': [
      {
        id: 'm-1',
        bookingId: 'LL-89104',
        sender: 'provider',
        text: 'Hello Malose! I will arrive at 09:00 sharp tomorrow with all eco-friendly cleaning detergents and steam mops.',
        timestamp: '09:05 AM'
      },
      {
        id: 'm-2',
        bookingId: 'LL-89104',
        sender: 'client',
        text: 'Great, thank you Naledi! Buzz unit 4B at the main entrance gate.',
        timestamp: '09:12 AM'
      }
    ]
  });
  const [chatInput, setChatInput] = useState('');

  // Review states
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [tipAmount, setTipAmount] = useState(50);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const currentBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleSendMessage = () => {
    if (!chatInput.trim() || !currentBooking) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      bookingId: currentBooking.id,
      sender: 'client',
      text: chatInput,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => ({
      ...prev,
      [currentBooking.id]: [...(prev[currentBooking.id] || []), newMsg]
    }));
    setChatInput('');

    // Simulated provider reply after 1.5 seconds
    setTimeout(() => {
      const providerReplies = [
        "Got it! Thanks for the update.",
        "Understood, see you shortly!",
        "Perfect, bringing extra backup supplies.",
        "Thank you! Will let you know once at the gate."
      ];
      const replyText = providerReplies[Math.floor(Math.random() * providerReplies.length)];
      setChatMessages((prev) => ({
        ...prev,
        [currentBooking.id]: [
          ...(prev[currentBooking.id] || []),
          {
            id: `msg-reply-${Date.now()}`,
            bookingId: currentBooking.id,
            sender: 'provider',
            text: replyText,
            timestamp: 'Just now'
          }
        ]
      }));
    }, 1500);
  };

  const handleAdvanceStatus = () => {
    if (!currentBooking) return;
    const flow: Record<BookingStatus, BookingStatus> = {
      pending: 'confirmed',
      confirmed: 'en_route',
      en_route: 'in_progress',
      in_progress: 'completed',
      completed: 'completed',
      cancelled: 'cancelled',
    };
    const next = flow[currentBooking.status];
    onUpdateStatus(currentBooking.id, next);
  };

  const handleCompleteReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBooking) return;
    onLeaveReview(currentBooking.id, rating, reviewComment, tipAmount);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewing(false);
      setReviewSubmitted(false);
    }, 1500);
  };

  const currentChat = (currentBooking && chatMessages[currentBooking.id]) || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-stone-900"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              Service Bookings & Live Tracker
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Track arrival status, message your provider, and release payment upon satisfaction.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">You have no active bookings</h3>
            <p className="text-xs text-stone-500 mt-1">
              Browse trusted local providers or post a task to get started.
            </p>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left list of bookings */}
            <div className="md:col-span-5 space-y-2.5 border-r border-stone-100 pr-0 md:pr-4">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Your Service Orders ({bookings.length})
              </span>
              {bookings.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBookingId(b.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all ${
                    selectedBookingId === b.id
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{b.id}</span>
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      R{b.totalCost}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800 mt-1 truncate">
                    {b.serviceTitle}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {b.providerName} · {b.date}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                      b.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : b.status === 'en_route'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status.replace('_', ' ')}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                </button>
              ))}
            </div>

            {/* Right Detailed View for Selected Booking */}
            {currentBooking && (
              <div className="md:col-span-7 space-y-5">
                {/* Provider Card Header */}
                <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentBooking.providerAvatar}
                      alt={currentBooking.providerName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        {currentBooking.providerName}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {currentBooking.serviceCategory.replace('_', ' ')} · {currentBooking.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${currentBooking.providerPhone}`}
                      className="p-2 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl text-stone-700 transition-colors"
                      title="Call Artisan"
                    >
                      <Phone className="w-4 h-4 text-emerald-700" />
                    </a>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                      Service Progress
                    </span>
                    <button
                      onClick={handleAdvanceStatus}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                      title="Simulate Next Lifecycle Stage"
                    >
                      Simulate Next Status →
                    </button>
                  </div>

                  {/* Visual Stepper */}
                  <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                    {[
                      { key: 'confirmed', label: 'Confirmed' },
                      { key: 'en_route', label: 'En Route' },
                      { key: 'in_progress', label: 'In Progress' },
                      { key: 'completed', label: 'Completed' },
                    ].map((step, idx) => {
                      const order = ['pending', 'confirmed', 'en_route', 'in_progress', 'completed'];
                      const currentIdx = order.indexOf(currentBooking.status);
                      const stepIdx = order.indexOf(step.key);
                      const isDone = currentIdx >= stepIdx;
                      const isCurrent = currentBooking.status === step.key;

                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isDone
                                ? 'bg-emerald-700 text-white'
                                : 'bg-stone-200 text-stone-500'
                            } ${isCurrent ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}
                          >
                            {isDone ? '✓' : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] mt-1 font-medium ${
                              isDone ? 'text-stone-900 font-bold' : 'text-stone-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Key Info */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Scheduled:</span>
                    <span className="font-semibold text-stone-800">
                      {currentBooking.date} ({currentBooking.timeSlot})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Service Address:</span>
                    <span className="font-semibold text-stone-800 truncate max-w-[240px]">
                      {currentBooking.clientAddress}, {currentBooking.suburb}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment:</span>
                    <span className="font-semibold text-emerald-800 capitalize">
                      {currentBooking.paymentMethod.replace('_', ' ')} (R{currentBooking.totalCost})
                    </span>
                  </div>
                </div>

                {/* Completed Action / Review */}
                {currentBooking.status === 'completed' && !currentBooking.rated && !isReviewing && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950">Job Completed Successfully!</h4>
                      <p className="text-[11px] text-emerald-800">Rate your experience with {currentBooking.providerName}.</p>
                    </div>
                    <button
                      onClick={() => setIsReviewing(true)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Leave Review & Tip
                    </button>
                  </div>
                )}

                {/* In-Modal Review Form */}
                {isReviewing && (
                  <form onSubmit={handleCompleteReview} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Rate {currentBooking.providerName}
                    </h4>

                    {/* Star selector */}
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              s <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={2}
                      placeholder="How was the craftsmanship and punctuality?"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:outline-none"
                      required
                    />

                    {/* Tip Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Add Artisan Tip (Optional)
                      </label>
                      <div className="flex gap-2">
                        {[0, 20, 50, 100].map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTipAmount(t)}
                            className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                              tipAmount === t
                                ? 'bg-emerald-700 text-white border-emerald-700'
                                : 'bg-white text-stone-700 border-stone-200'
                            }`}
                          >
                            {t === 0 ? 'No tip' : `+R${t}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsReviewing(false)}
                        className="px-3 py-1.5 text-xs text-stone-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                )}

                {/* In-App Direct Chat */}
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                  <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                      Direct Chat with {currentBooking.providerName}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Online</span>
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="p-3.5 space-y-2.5 max-h-48 overflow-y-auto bg-stone-50/50">
                    {currentChat.length === 0 ? (
                      <p className="text-xs text-stone-400 text-center py-4">
                        Send a message to clarify task specifics or gate directions.
                      </p>
                    ) : (
                      currentChat.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${m.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                              m.sender === 'client'
                                ? 'bg-emerald-700 text-white rounded-br-none'
                                : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-2xs'
                            }`}
                          >
                            <p>{m.text}</p>
                            <span
                              className={`block text-[9px] mt-1 text-right ${
                                m.sender === 'client' ? 'text-emerald-200' : 'text-stone-400'
                              }`}
                            >
                              {m.timestamp}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="p-2.5 border-t border-stone-200 flex items-center gap-2 bg-white">
                    <input
                      type="text"
                      placeholder="Type a message (e.g. 'I am at the gate')..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-all shadow-2xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
