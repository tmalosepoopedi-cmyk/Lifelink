import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  Send, 
  Briefcase, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { ClientTask, TaskQuote } from '../types';

interface CommunityTasksFeedProps {
  tasks: ClientTask[];
  onOpenPostTask: () => void;
  onSubmitQuote: (taskId: string, quote: Omit<TaskQuote, 'id' | 'submittedAt' | 'status'>) => void;
  onAcceptQuote: (taskId: string, quoteId: string) => void;
  selectedCity: string;
}

export const CommunityTasksFeed: React.FC<CommunityTasksFeedProps> = ({
  tasks,
  onOpenPostTask,
  onSubmitQuote,
  onAcceptQuote,
  selectedCity,
}) => {
  const [activeTaskForQuote, setActiveTaskForQuote] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number>(450);
  const [quoteMessage, setQuoteMessage] = useState('');
  const [providerName, setProviderName] = useState('Sipho Ndlovu');

  const filteredTasks = tasks.filter((t) => {
    if (selectedCity !== 'All Cities' && t.city !== selectedCity) return false;
    return true;
  });

  const handleSendQuote = (taskId: string) => {
    if (!quoteMessage.trim()) return;

    onSubmitQuote(taskId, {
      providerId: 'p-current',
      providerName: providerName,
      providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      providerRating: 4.96,
      offeredPrice: Number(quotePrice),
      message: quoteMessage,
    });

    setActiveTaskForQuote(null);
    setQuoteMessage('');
  };

  return (
    <div className="py-8 bg-stone-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feed Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                Live Community Task Board
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Real-time job requests posted by households and small businesses in South Africa.
            </p>
          </div>

          <button
            onClick={onOpenPostTask}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Post a New Task</span>
          </button>
        </div>

        {/* Task Cards List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
            <Briefcase className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-900">No active tasks in this area</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
              Be the first to post a job request or change your city filter.
            </p>
            <button
              onClick={onOpenPostTask}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              Post a Task Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {task.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500">{task.postedAt}</span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs font-medium text-stone-600">By {task.clientName}</span>
                    </div>

                    <h2 className="text-base font-bold text-stone-900 tracking-tight">
                      {task.title}
                    </h2>

                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100 flex-wrap">
                      <div className="flex items-center gap-1.5 text-stone-700">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{task.city} · {task.suburb}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span className="capitalize">{task.urgency.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                        <span>{task.quotes.length} Quote{task.quotes.length === 1 ? '' : 's'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget & Action Box */}
                  <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100 shrink-0 sm:w-44">
                    <div>
                      <div className="text-[11px] text-stone-400">Client Budget</div>
                      <div className="text-lg font-extrabold text-stone-900 tabular-nums">
                        R{task.budget}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTaskForQuote(activeTaskForQuote === task.id ? null : task.id);
                        setQuotePrice(task.budget);
                      }}
                      className="mt-2 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      {activeTaskForQuote === task.id ? 'Cancel Quote' : 'Send a Quote'}
                    </button>
                  </div>
                </div>

                {/* Quote submission panel */}
                {activeTaskForQuote === task.id && (
                  <div className="mt-4 pt-4 border-t border-stone-200 bg-stone-50/70 p-4 rounded-xl">
                    <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                      Submit Your Quote & Availability
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-500 mb-1">
                          Your Name / Business
                        </label>
                        <input
                          type="text"
                          value={providerName}
                          onChange={(e) => setProviderName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-500 mb-1">
                          Offered Price (ZAR R)
                        </label>
                        <input
                          type="number"
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none tabular-nums"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">
                        Proposal message (equipment, time you can arrive, transport)
                      </label>
                      <textarea
                        rows={2}
                        value={quoteMessage}
                        onChange={(e) => setQuoteMessage(e.target.value)}
                        placeholder="e.g. I am in the area with full tools and transport. Can do today at 3pm."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveTaskForQuote(null)}
                        className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendQuote(task.id)}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Quote (R{quotePrice})</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Existing Quotes on this task */}
                {task.quotes.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Received Quotes ({task.quotes.length})
                    </span>
                    {task.quotes.map((q) => (
                      <div
                        key={q.id}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={q.providerAvatar}
                            alt={q.providerName}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover border border-stone-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900">{q.providerName}</span>
                              <span className="text-[11px] text-amber-600 font-bold">★ {q.providerRating}</span>
                              <span className="text-[10px] text-stone-400">· {q.submittedAt}</span>
                            </div>
                            <p className="text-xs text-stone-600 mt-0.5">"{q.message}"</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                          <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                            R{q.offeredPrice}
                          </span>
                          {q.status === 'accepted' ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Accepted
                            </span>
                          ) : (
                            <button
                              onClick={() => onAcceptQuote(task.id, q.id)}
                              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                            >
                              Accept Quote
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
