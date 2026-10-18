import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle, MapPin, Banknote, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, SA_CITIES, SA_SUBURBS } from '../data/mockData';
import { ClientTask, ServiceCategory } from '../types';

interface PostTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (newTask: ClientTask) => void;
}

export const PostTaskModal: React.FC<PostTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('handyman');
  const [city, setCity] = useState('Johannesburg');
  const [suburb, setSuburb] = useState('Sandton');
  const [budget, setBudget] = useState(500);
  const [urgency, setUrgency] = useState<'today' | 'this_week' | 'flexible' | 'emergency'>('today');
  const [clientName, setClientName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const suburbsList = SA_SUBURBS[city] || ['Central'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please specify what you need done.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please provide a short description.');
      return;
    }
    if (!clientName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const newTask: ClientTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      category,
      city,
      suburb,
      budget: Number(budget),
      urgency,
      postedAt: 'Just now',
      clientName,
      quotesCount: 0,
      quotes: [],
      status: 'open',
    };

    onTaskCreated(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-stone-900"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-stone-100 bg-stone-50/70">
          <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
            Post a Task or Request Quotes
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Describe what you need. Local vetted providers in South Africa will review and send you competitive offers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="e.g. Move couch from Fourways to Bryanston, or Fix burst pipe"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-xs text-stone-900 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                Your Budget (ZAR R)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-400">R</span>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none tabular-nums"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
              Description & Details
            </label>
            <textarea
              rows={3}
              placeholder="Provide key details (e.g. 2nd floor stairs, size of item, materials needed, access codes)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-white text-xs text-stone-900 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                City
              </label>
              <select
                value={city}
                onChange={(e) => {
                  const newCity = e.target.value;
                  setCity(newCity);
                  const subs = SA_SUBURBS[newCity] || ['Central'];
                  setSuburb(subs[0]);
                }}
                className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                {SA_CITIES.filter(c => c !== 'All Cities').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                Suburb / Area
              </label>
              <select
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                {suburbsList.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                When is it needed?
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="today">Today / ASAP</option>
                <option value="this_week">Within this week</option>
                <option value="emergency">Emergency (within 2 hrs)</option>
                <option value="flexible">Flexible timing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Nandi Sithole"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2 bg-white text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Task to LifeLink Community</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
