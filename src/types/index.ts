export type ServiceCategory = 
  | 'cleaning'
  | 'plumbing'
  | 'electrical'
  | 'handyman'
  | 'bakkie_moving'
  | 'gardening'
  | 'hair_beauty'
  | 'tutoring'
  | 'appliance_repair';

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  shortDesc: string;
  icon: string;
  startingPrice: number; // in ZAR (R)
  image: string;
  popularTasks: string[];
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerLocation: string;
  rating: number;
  date: string;
  comment: string;
  serviceCategory: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  category: ServiceCategory;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  hourlyRate: number; // in ZAR (R)
  calloutFee: number; // in ZAR (R)
  city: string;
  suburbs: string[];
  distanceKm: number;
  verifiedId: boolean;
  policeClearance: boolean;
  yearsExperience: number;
  languages: string[];
  availableToday: boolean;
  hasOwnTransport: boolean;
  hasOwnTools: boolean;
  loadSheddingBackup: boolean; // has generator/inverter/battery equipment
  featuredImage?: string;
  portfolio: string[];
  reviews: Review[];
  phone: string;
  whatsapp: string;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'en_route'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'cash' | 'ozow_eft' | 'escrow';

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerPhone: string;
  serviceCategory: ServiceCategory;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  suburb: string;
  city: string;
  status: BookingStatus;
  totalCost: number; // ZAR
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  rated?: boolean;
}

export interface TaskQuote {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  offeredPrice: number; // ZAR
  message: string;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ClientTask {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  city: string;
  suburb: string;
  budget: number; // in ZAR
  urgency: 'flexible' | 'today' | 'this_week' | 'emergency';
  postedAt: string;
  clientName: string;
  quotesCount: number;
  quotes: TaskQuote[];
  status: 'open' | 'assigned' | 'completed';
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  sender: 'client' | 'provider';
  text: string;
  timestamp: string;
}
