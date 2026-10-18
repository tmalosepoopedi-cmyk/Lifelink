/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProviderCard } from './components/ProviderCard';
import { ProviderModal } from './components/ProviderModal';
import { BookingModal } from './components/BookingModal';
import { PostTaskModal } from './components/PostTaskModal';
import { CommunityTasksFeed } from './components/CommunityTasksFeed';
import { ProviderDashboard } from './components/ProviderDashboard';
import { BookingsTrackerModal } from './components/BookingsTrackerModal';
import { SafetyGuaranteeBanner } from './components/SafetyGuaranteeBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

import { 
  INITIAL_PROVIDERS, 
  INITIAL_TASKS, 
  INITIAL_BOOKINGS,
  SA_CITIES,
  SA_SUBURBS
} from './data/mockData';

import { 
  Provider, 
  ClientTask, 
  Booking, 
  ServiceCategory, 
  BookingStatus,
  TaskQuote 
} from './types';

import { 
  Filter, 
  SlidersHorizontal, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Search,
  Briefcase
} from 'lucide-react';

export default function App() {
  // Navigation & View Mode
  const [currentTab, setCurrentTab] = useState<'browse' | 'tasks' | 'bookings' | 'provider_dash'>('browse');
  const [isProviderMode, setIsProviderMode] = useState<boolean>(false);

  // Data Collections
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [tasks, setTasks] = useState<ClientTask[]>(INITIAL_TASKS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Johannesburg');
  const [selectedSuburb, setSelectedSuburb] = useState('All Suburbs');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'jobs'>('rating');

  // Modals
  const [activeProviderModal, setActiveProviderModal] = useState<Provider | null>(null);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  // Notification Banner
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setBannerNotice(msg);
    setTimeout(() => setBannerNotice(null), 3500);
  };

  // Suburbs for selected city
  const availableSuburbs = useMemo(() => {
    if (selectedCity === 'All Cities') return ['All Suburbs'];
    return ['All Suburbs', ...(SA_SUBURBS[selectedCity] || [])];
  }, [selectedCity]);

  // Filtered Providers
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // City check
      if (selectedCity !== 'All Cities' && p.city !== selectedCity) {
        return false;
      }
      // Suburb check
      if (selectedSuburb !== 'All Suburbs' && !p.suburbs.includes(selectedSuburb)) {
        return false;
      }
      // Category check
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Available today check
      if (onlyAvailableToday && !p.availableToday) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesBio = p.bio.toLowerCase().includes(query);
        const matchesCity = p.city.toLowerCase().includes(query);
        const matchesSuburbs = p.suburbs.some((s) => s.toLowerCase().includes(query));
        const matchesCategory = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesTitle && !matchesBio && !matchesCity && !matchesSuburbs && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'jobs') return b.completedJobs - a.completedJobs;
      return 0;
    });
  }, [providers, selectedCity, selectedSuburb, selectedCategory, onlyAvailableToday, searchQuery, sortBy]);

  // Handlers
  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setBookingProvider(null);
    showNotice(`Booking confirmed for ${newBooking.date} with ${newBooking.providerName}!`);
    // Open bookings tracker to show the new order
    setIsBookingsModalOpen(true);
  };

  const handleTaskCreated = (newTask: ClientTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setCurrentTab('tasks');
    showNotice(`Task published! Local taskers in ${newTask.city} will submit quotes.`);
  };

  const handleSubmitQuote = (
    taskId: string,
    quoteData: Omit<TaskQuote, 'id' | 'submittedAt' | 'status'>
  ) => {
    const newQuote: TaskQuote = {
      ...quoteData,
      id: `q-${Date.now()}`,
      submittedAt: 'Just now',
      status: 'pending',
    };

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              quotesCount: t.quotesCount + 1,
              quotes: [...t.quotes, newQuote],
            }
          : t
      )
    );
    showNotice(`Quote of R${quoteData.offeredPrice} submitted to client.`);
  };

  const handleAcceptQuote = (taskId: string, quoteId: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    const targetQuote = targetTask.quotes.find((q) => q.id === quoteId);
    if (!targetQuote) return;

    // Mark quote accepted
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'assigned',
              quotes: t.quotes.map((q) =>
                q.id === quoteId ? { ...q, status: 'accepted' } : q
              ),
            }
          : t
      )
    );

    // Create a corresponding booking
    const newBooking: Booking = {
      id: `LL-${Math.floor(10000 + Math.random() * 90000)}`,
      providerId: targetQuote.providerId,
      providerName: targetQuote.providerName,
      providerAvatar: targetQuote.providerAvatar,
      providerPhone: '+27 82 455 1982',
      serviceCategory: targetTask.category,
      serviceTitle: targetTask.title,
      date: new Date().toISOString().split('T')[0],
      timeSlot: '11:00 - 14:00',
      clientName: targetTask.clientName,
      clientPhone: '+27 82 123 4567',
      clientAddress: `${targetTask.suburb}, ${targetTask.city}`,
      suburb: targetTask.suburb,
      city: targetTask.city,
      status: 'confirmed',
      totalCost: targetQuote.offeredPrice,
      paymentMethod: 'escrow',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    showNotice(`Accepted quote from ${targetQuote.providerName}! Booking reference: ${newBooking.id}`);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    showNotice(`Booking ${bookingId} status updated to: ${status.replace('_', ' ')}`);
  };

  const handleLeaveReview = (
    bookingId: string,
    rating: number,
    comment: string,
    tip: number
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, rated: true } : b))
    );

    const b = bookings.find((bk) => bk.id === bookingId);
    if (b) {
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === b.providerId || p.name === b.providerName) {
            const newRev = {
              id: `r-${Date.now()}`,
              reviewerName: b.clientName,
              reviewerLocation: b.suburb,
              rating,
              date: 'Just now',
              comment,
              serviceCategory: b.serviceCategory,
            };
            const updatedReviewCount = p.reviewCount + 1;
            const updatedRating = (p.rating * p.reviewCount + rating) / updatedReviewCount;
            return {
              ...p,
              reviews: [newRev, ...p.reviews],
              reviewCount: updatedReviewCount,
              rating: updatedRating,
            };
          }
          return p;
        })
      );
    }
    showNotice(`Thank you! Your ${rating}-star review and R${tip} tip were submitted.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Toast notification banner */}
      {bannerNotice && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{bannerNotice}</span>
        </div>
      )}

      {/* Top Header conforming to Top Bar Contract */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenPostTask={() => setIsPostTaskOpen(true)}
        onOpenSafety={() => setIsSafetyModalOpen(true)}
        activeBookingsCount={bookings.filter((b) => b.status !== 'completed').length}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          setSelectedSuburb('All Suburbs');
        }}
        isProviderMode={isProviderMode}
        setIsProviderMode={setIsProviderMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: PROVIDER CONSOLE (Artisan Mode) */}
        {isProviderMode || currentTab === 'provider_dash' ? (
          <ProviderDashboard
            currentProvider={providers[0]} // Sipho Ndlovu as demo provider
            bookings={bookings}
            onUpdateStatus={handleUpdateBookingStatus}
            onExitProviderMode={() => {
              setIsProviderMode(false);
              setCurrentTab('browse');
            }}
          />
        ) : currentTab === 'tasks' ? (
          /* VIEW 2: COMMUNITY TASKS FEED */
          <CommunityTasksFeed
            tasks={tasks}
            onOpenPostTask={() => setIsPostTaskOpen(true)}
            onSubmitQuote={handleSubmitQuote}
            onAcceptQuote={handleAcceptQuote}
            selectedCity={selectedCity}
          />
        ) : currentTab === 'bookings' ? (
          /* VIEW 3: DEDICATED BOOKINGS VIEW */
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Your LifeLink Service Orders
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Real-time status updates and direct provider contact.
                </p>
              </div>
              <button
                onClick={() => setIsBookingsModalOpen(true)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Open Full Tracker & Chat
              </button>
            </div>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setIsBookingsModalOpen(true)}
                  className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-stone-300 transition-all cursor-pointer shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={b.providerAvatar}
                      alt={b.providerName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{b.id}</span>
                        <span className="text-xs text-stone-400">·</span>
                        <span className="text-xs font-semibold text-emerald-800">{b.serviceTitle}</span>
                      </div>
                      <h2 className="text-sm font-bold text-stone-900 mt-0.5">{b.providerName}</h2>
                      <p className="text-xs text-stone-500">
                        {b.date} ({b.timeSlot}) · {b.clientAddress}, {b.suburb}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                    <span className="text-base font-extrabold text-stone-900 tabular-nums">
                      R{b.totalCost}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg capitalize ${
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* VIEW 4: DEFAULT EXPLORE / BROWSE MARKETPLACE */
          <div>
            {/* Hero Section */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={(city) => {
                setSelectedCity(city);
                setSelectedSuburb('All Suburbs');
              }}
              onSearchSubmit={() => {
                const el = document.getElementById('provider-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onQuickCategory={(cat) => {
                setSelectedCategory(cat as ServiceCategory);
                const el = document.getElementById('provider-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Category Section */}
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const el = document.getElementById('provider-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectTaskKeyword={(kw) => {
                setSearchQuery(kw);
                const el = document.getElementById('provider-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Provider Directory Section */}
            <section id="provider-listings" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Directory Filter Controls Bar */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6 shadow-2xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Results Count & Current Filter Indicators */}
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
                      <span>Vetted Service Providers</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600 tabular-nums">
                        {filteredProviders.length} available
                      </span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Showing results for {selectedCity}{selectedSuburb !== 'All Suburbs' ? ` · ${selectedSuburb}` : ''}
                      {selectedCategory !== 'all' ? ` · ${selectedCategory.replace('_', ' ')}` : ''}
                    </p>
                  </div>

                  {/* Filter Selectors */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    {/* Suburb Selector */}
                    {availableSuburbs.length > 1 && (
                      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <select
                          value={selectedSuburb}
                          onChange={(e) => setSelectedSuburb(e.target.value)}
                          className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer"
                        >
                          {availableSuburbs.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Available Today Toggle */}
                    <button
                      onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
                      className={`px-3 py-1.5 rounded-xl border font-medium transition-all ${
                        onlyAvailableToday
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {onlyAvailableToday ? '✓ Ready Today Only' : 'Available Today'}
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="rating">Top Rated (4.8+)</option>
                        <option value="price_low">Lowest Hourly Rate</option>
                        <option value="jobs">Most Completed Jobs</option>
                      </select>
                    </div>

                    {/* Reset Filters */}
                    {(selectedCategory !== 'all' || selectedSuburb !== 'All Suburbs' || onlyAvailableToday || searchQuery) && (
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedSuburb('All Suburbs');
                          setOnlyAvailableToday(false);
                          setSearchQuery('');
                        }}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Provider Cards Grid */}
              {filteredProviders.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
                  <Search className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-stone-900">
                    No providers match this criteria
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 mb-5 leading-relaxed">
                    Try clearing your suburb filter, choosing "All Categories", or post an open job on our community board so providers can contact you.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedSuburb('All Suburbs');
                        setOnlyAvailableToday(false);
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                    >
                      Clear Filters
                    </button>
                    <button
                      onClick={() => setIsPostTaskOpen(true)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                    >
                      Post a Task for Quotes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onSelect={(p) => setActiveProviderModal(p)}
                      onBook={(p) => setBookingProvider(p)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Trust & Safety Banner */}
            <SafetyGuaranteeBanner onOpenSafety={() => setIsSafetyModalOpen(true)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenSafety={() => setIsSafetyModalOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentTab('browse');
          const el = document.getElementById('provider-listings');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCity={(city) => {
          setSelectedCity(city);
          setSelectedSuburb('All Suburbs');
          setCurrentTab('browse');
          const el = document.getElementById('provider-listings');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Mobile Fixed Bottom Tab Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenPostTask={() => setIsPostTaskOpen(true)}
        activeBookingsCount={bookings.filter((b) => b.status !== 'completed').length}
        isProviderMode={isProviderMode}
        setIsProviderMode={setIsProviderMode}
      />

      {/* MODALS */}
      {/* 1. Full Provider Details Modal */}
      {activeProviderModal && (
        <ProviderModal
          provider={activeProviderModal}
          onClose={() => setActiveProviderModal(null)}
          onBook={(p) => {
            setActiveProviderModal(null);
            setBookingProvider(p);
          }}
        />
      )}

      {/* 2. Direct Service Booking Modal */}
      {bookingProvider && (
        <BookingModal
          provider={bookingProvider}
          onClose={() => setBookingProvider(null)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {/* 3. Post a Task Modal */}
      <PostTaskModal
        isOpen={isPostTaskOpen}
        onClose={() => setIsPostTaskOpen(false)}
        onTaskCreated={handleTaskCreated}
      />

      {/* 4. Service Bookings & Live Tracker Modal */}
      <BookingsTrackerModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        onUpdateStatus={handleUpdateBookingStatus}
        onLeaveReview={handleLeaveReview}
      />

      {/* 5. Safety Guarantee Modal */}
      {isSafetyModalOpen && (
        <SafetyGuaranteeBanner
          isModal={true}
          onClose={() => setIsSafetyModalOpen(false)}
        />
      )}
    </div>
  );
}
