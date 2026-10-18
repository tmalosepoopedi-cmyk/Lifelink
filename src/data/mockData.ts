import { CategoryInfo, Provider, ClientTask, Booking } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_south_africa_artisans_1792310671689.jpg';
export const CLEANING_IMAGE = '/src/assets/images/service_home_cleaning_1792310673184.jpg';
export const BAKKIE_IMAGE = '/src/assets/images/service_bakkie_moving_1792310672552.jpg';
export const PLUMBING_IMAGE = '/src/assets/images/service_handyman_plumbing_1792310672777.jpg';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'handyman',
    name: 'Handyman & Repairs',
    shortDesc: 'Carpentry, curtain rails, door fixing, wall mounts',
    icon: 'Wrench',
    startingPrice: 220,
    image: HERO_IMAGE,
    popularTasks: ['Mounting TV on brick/drywall', 'Door lock replacement', 'Curtain rail installation', 'General household repairs']
  },
  {
    id: 'cleaning',
    name: 'Domestic Cleaning',
    shortDesc: 'Standard home clean, deep clean, move-in/out',
    icon: 'Sparkles',
    startingPrice: 180,
    image: CLEANING_IMAGE,
    popularTasks: ['Full house deep cleaning', 'Move-out bond cleaning', 'Ironing & laundry wash', 'Office space sanitization']
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    shortDesc: 'Burst pipes, tap replacements, unblocking drains',
    icon: 'Droplets',
    startingPrice: 350,
    image: PLUMBING_IMAGE,
    popularTasks: ['Geyser thermostat repair', 'Leaking pipe under sink', 'Blocked shower drain', 'Toilet valve installation']
  },
  {
    id: 'bakkie_moving',
    name: 'Bakkie Hire & Moving',
    shortDesc: 'Furniture transport, store pickups, rubble removal',
    icon: 'Truck',
    startingPrice: 450,
    image: BAKKIE_IMAGE,
    popularTasks: ['Single room furniture move', 'Builders/Makro goods delivery', 'Garden refuse & rubble dumping', 'Small office relocation']
  },
  {
    id: 'electrical',
    name: 'Electrical & Solar',
    shortDesc: 'Inverter setups, DB board fixes, lighting, plugs',
    icon: 'Zap',
    startingPrice: 380,
    image: HERO_IMAGE,
    popularTasks: ['Backup battery & inverter install', 'Tripping circuit breaker diagnosis', 'New plug points wiring', 'Security spotlight installation']
  },
  {
    id: 'gardening',
    name: 'Garden & Yard Care',
    shortDesc: 'Lawn mowing, hedge trimming, tree felling, cleanup',
    icon: 'Trees',
    startingPrice: 200,
    image: CLEANING_IMAGE,
    popularTasks: ['Weekly lawn trimming & edging', 'Overgrown hedge cutting', 'Gutter cleaning before rain', 'Garden fertilizer & seeding']
  },
  {
    id: 'hair_beauty',
    name: 'Hair & Grooming',
    shortDesc: 'Knotless braids, dreadlocks, mobile barbers, fades',
    icon: 'Scissors',
    startingPrice: 150,
    image: HERO_IMAGE,
    popularTasks: ['Box braids / knotless medium', 'Dreadlock wash & retwist', 'Mobile clean fade haircut', 'Cornrows styling']
  },
  {
    id: 'appliance_repair',
    name: 'Appliance Repairs',
    shortDesc: 'Washing machines, fridges, ovens, microwaves',
    icon: 'Refrigerator',
    startingPrice: 320,
    image: PLUMBING_IMAGE,
    popularTasks: ['Washing machine drum spin fault', 'Fridge regas & cooling fault', 'Oven heating element repair', 'Microwave repair']
  },
  {
    id: 'tutoring',
    name: 'Tutoring & Skills',
    shortDesc: 'Matric Maths, Physical Science, English, Coding',
    icon: 'GraduationCap',
    startingPrice: 160,
    image: CLEANING_IMAGE,
    popularTasks: ['Matric Grade 12 Maths prep', 'High school Physical Science', 'Afrikaans first additional language', 'Python & web coding basics']
  }
];

export const SA_CITIES = [
  'All Cities',
  'Johannesburg',
  'Cape Town',
  'Pretoria',
  'Durban',
  'Gqeberha (Port Elizabeth)',
  'Bloemfontein'
];

export const SA_SUBURBS: Record<string, string[]> = {
  Johannesburg: ['Sandton', 'Rosebank', 'Soweto (Diepkloof)', 'Soweto (Orlando)', 'Randburg', 'Midrand', 'Fourways', 'Braamfontein', 'Roodepoort', 'Kempton Park'],
  'Cape Town': ['City Bowl', 'Sea Point', 'Rondebosch', 'Khayelitsha', 'Bellville', 'Somerset West', 'Claremont', 'Camps Bay', 'Mitchells Plain'],
  Pretoria: ['Menlyn', 'Centurion', 'Hatfield', 'Mamelodi', 'Arcadia', 'Garsfontein', 'Silverton', 'Moreleta Park'],
  Durban: ['Umhlanga', 'Morningside', 'Durban North', 'Umlazi', 'Berea', 'Westville', 'Pinetown'],
  'Gqeberha (Port Elizabeth)': ['Summerstrand', 'Walmer', 'Mill Park', 'New Brighton', 'Newton Park'],
  Bloemfontein: ['Westdene', 'Brandwag', 'Langenhoven Park', 'Universitas', 'Bayswater']
};

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'p-1',
    name: 'Sipho Ndlovu',
    title: 'Certified Master Electrician & Solar Installer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    bio: '12+ years experience across residential and commercial electrical work. Red Seal certified electrician specializing in load-shedding backup inverters, solar panels, and DB board rewirings. Reliable and safety-first.',
    category: 'electrical',
    rating: 4.96,
    reviewCount: 94,
    completedJobs: 182,
    hourlyRate: 380,
    calloutFee: 250,
    city: 'Johannesburg',
    suburbs: ['Sandton', 'Randburg', 'Rosebank', 'Fourways', 'Midrand'],
    distanceKm: 3.8,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 12,
    languages: ['English', 'isiZulu', 'Sesotho'],
    availableToday: true,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: true,
    portfolio: [HERO_IMAGE, PLUMBING_IMAGE],
    phone: '+27 82 455 1982',
    whatsapp: 'https://wa.me/27824551982',
    reviews: [
      {
        id: 'r-101',
        reviewerName: 'Tshepo Motsepe',
        reviewerLocation: 'Sandton',
        rating: 5,
        date: '3 days ago',
        comment: 'Sipho arrived on time during Stage 4 load-shedding with his own inverter test rig. Fixed our tripping breakers in under an hour. Very honest rates!',
        serviceCategory: 'electrical'
      },
      {
        id: 'r-102',
        reviewerName: 'Megan Kelly',
        reviewerLocation: 'Randburg',
        rating: 5,
        date: '1 week ago',
        comment: 'Installed our 5kVA backup inverter. Very tidy cabling and took time to explain how to manage loads. Highly recommended.',
        serviceCategory: 'electrical'
      }
    ]
  },
  {
    id: 'p-2',
    name: 'Naledi Mokoena',
    title: 'Professional Domestic & Deep Cleaning Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    bio: 'Dedicated, meticulous home cleaner with 7 years of trusted service in residential homes and guest lodges. Uses eco-friendly products, punctual, trustworthy, and brings own specialized cleaning kit upon request.',
    category: 'cleaning',
    rating: 4.98,
    reviewCount: 138,
    completedJobs: 260,
    hourlyRate: 190,
    calloutFee: 0,
    city: 'Johannesburg',
    suburbs: ['Rosebank', 'Sandton', 'Braamfontein', 'Randburg', 'Soweto (Diepkloof)'],
    distanceKm: 2.1,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 7,
    languages: ['English', 'Sesotho', 'isiZulu'],
    availableToday: true,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: false,
    portfolio: [CLEANING_IMAGE],
    phone: '+27 71 890 3341',
    whatsapp: 'https://wa.me/27718903341',
    reviews: [
      {
        id: 'r-201',
        reviewerName: 'Gareth Evans',
        reviewerLocation: 'Rosebank',
        rating: 5,
        date: 'Yesterday',
        comment: 'Naledi transformed our flat before our landlord inspection. Not a single speck of dust left behind. The oven looks brand new!',
        serviceCategory: 'cleaning'
      },
      {
        id: 'r-202',
        reviewerName: 'Lerato Mabena',
        reviewerLocation: 'Randburg',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Prompt, courteous, and very respectful with our pets. Booked her for regular bi-weekly cleans now.',
        serviceCategory: 'cleaning'
      }
    ]
  },
  {
    id: 'p-3',
    name: 'Lwazi & Brothers Bakkie Services',
    title: 'Reliable 1-Ton & 1.5-Ton Bakkie Hire & Moving',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    bio: 'We offer safe, covered bakkie transport with 2 strong assistants included. Perfect for buying second-hand furniture on Marketplace, hardware runs from Builders Warehouse, and single room moves across the Western Cape.',
    category: 'bakkie_moving',
    rating: 4.92,
    reviewCount: 88,
    completedJobs: 174,
    hourlyRate: 280,
    calloutFee: 450,
    city: 'Cape Town',
    suburbs: ['City Bowl', 'Sea Point', 'Rondebosch', 'Claremont', 'Bellville', 'Khayelitsha'],
    distanceKm: 5.4,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 5,
    languages: ['English', 'isiXhosa', 'Afrikaans'],
    availableToday: true,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: true,
    portfolio: [BAKKIE_IMAGE],
    phone: '+27 83 712 9012',
    whatsapp: 'https://wa.me/27837129012',
    reviews: [
      {
        id: 'r-301',
        reviewerName: 'Chloe Du Plessis',
        reviewerLocation: 'Sea Point',
        rating: 5,
        date: '4 days ago',
        comment: 'Moved our 3-seater sofa and fridge up 2 flights of stairs without a single scratch. Strapped everything securely. Super fair price!',
        serviceCategory: 'bakkie_moving'
      }
    ]
  },
  {
    id: 'p-4',
    name: 'Johan van der Merwe',
    title: 'Licensed Plumber & Geyser Specialist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    bio: 'PIRB registered plumber with 15 years in Gauteng plumbing infrastructure. Specializing in leak detection, geyser valve replacements, pressure issues, and new bathroom pipe installations. Emergency callouts welcomed.',
    category: 'plumbing',
    rating: 4.89,
    reviewCount: 112,
    completedJobs: 210,
    hourlyRate: 360,
    calloutFee: 300,
    city: 'Pretoria',
    suburbs: ['Menlyn', 'Centurion', 'Hatfield', 'Garsfontein', 'Moreleta Park'],
    distanceKm: 4.2,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 15,
    languages: ['Afrikaans', 'English'],
    availableToday: false,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: true,
    portfolio: [PLUMBING_IMAGE],
    phone: '+27 84 991 4452',
    whatsapp: 'https://wa.me/27849914452',
    reviews: [
      {
        id: 'r-401',
        reviewerName: 'Kobus Snyman',
        reviewerLocation: 'Centurion',
        rating: 5,
        date: '5 days ago',
        comment: 'Had a burst geyser pipe flooding our ceiling. Johan was here in 30 minutes, isolated the shutoff valve, and replaced the corroded copper joint neatly.',
        serviceCategory: 'plumbing'
      }
    ]
  },
  {
    id: 'p-5',
    name: 'Thabo Khumalo',
    title: 'All-Round Home Handyman & Painter',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces',
    bio: 'Versatile craftsman doing television wall-mountings, door planing, lock replacements, wall patching, crack repair, and interior painting. Precise, clean worker who leaves the workspace spotless.',
    category: 'handyman',
    rating: 4.94,
    reviewCount: 76,
    completedJobs: 130,
    hourlyRate: 230,
    calloutFee: 150,
    city: 'Johannesburg',
    suburbs: ['Soweto (Diepkloof)', 'Soweto (Orlando)', 'Roodepoort', 'Randburg', 'Braamfontein'],
    distanceKm: 1.5,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 9,
    languages: ['isiZulu', 'English', 'Sesotho', 'Setswana'],
    availableToday: true,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: true,
    portfolio: [HERO_IMAGE],
    phone: '+27 76 341 8722',
    whatsapp: 'https://wa.me/27763418722',
    reviews: [
      {
        id: 'r-501',
        reviewerName: 'Nomvula Sithole',
        reviewerLocation: 'Soweto (Diepkloof)',
        rating: 5,
        date: 'Last week',
        comment: 'Mounted our 65 inch TV on the exposed brick wall and concealed all cables inside trunking. Great work brother Thabo!',
        serviceCategory: 'handyman'
      }
    ]
  },
  {
    id: 'p-6',
    name: 'Zanele Dlamini',
    title: 'Master Braider & Natural Hair Stylist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    bio: 'Gentle, pain-free braiding specialist with 6 years experience. Knotless braids, goddess braids, faux locs, cornrows, and kid-friendly styling. Home visits available across Durban North and Umhlanga.',
    category: 'hair_beauty',
    rating: 4.97,
    reviewCount: 165,
    completedJobs: 310,
    hourlyRate: 170,
    calloutFee: 100,
    city: 'Durban',
    suburbs: ['Umhlanga', 'Morningside', 'Durban North', 'Berea'],
    distanceKm: 3.1,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 6,
    languages: ['isiZulu', 'English'],
    availableToday: true,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: false,
    portfolio: [CLEANING_IMAGE],
    phone: '+27 72 610 9411',
    whatsapp: 'https://wa.me/27726109411',
    reviews: [
      {
        id: 'r-601',
        reviewerName: 'Ayanda Cele',
        reviewerLocation: 'Umhlanga',
        rating: 5,
        date: '3 days ago',
        comment: 'Zanele is so gentle on edges! Did waist-length knotless braids in record time and they are super neat. 10/10 service.',
        serviceCategory: 'hair_beauty'
      }
    ]
  },
  {
    id: 'p-7',
    name: 'Kyle Pillay',
    title: 'Appliance Repair Technician',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    bio: 'Specialist in Samsung, Defy, LG, Bosch, and Whirlpool appliances. Diagnose and repair washing machines that will not drain or spin, fridge gas leaks, oven thermostats, and tumble dryers with genuine spare parts.',
    category: 'appliance_repair',
    rating: 4.88,
    reviewCount: 64,
    completedJobs: 118,
    hourlyRate: 320,
    calloutFee: 200,
    city: 'Durban',
    suburbs: ['Umhlanga', 'Durban North', 'Morningside', 'Westville'],
    distanceKm: 6.0,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 8,
    languages: ['English', 'isiZulu'],
    availableToday: false,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: true,
    portfolio: [PLUMBING_IMAGE],
    phone: '+27 81 502 9918',
    whatsapp: 'https://wa.me/27815029918',
    reviews: [
      {
        id: 'r-701',
        reviewerName: 'Devan Moodley',
        reviewerLocation: 'Durban North',
        rating: 5,
        date: '2 days ago',
        comment: 'Our Defy front loader pump died. Kyle had the replacement part in his van and had it running within 45 mins. Saved us buying a new machine.',
        serviceCategory: 'appliance_repair'
      }
    ]
  },
  {
    id: 'p-8',
    name: 'Gift Maluleke',
    title: 'Garden Landscaper & Tree Care Specialist',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=faces',
    bio: 'Equipped with commercial petrol mowers, brush cutters, and chainsaws. Weekly garden maintenance, seasonal pruning, tree felling, compost application, and yard revitalization.',
    category: 'gardening',
    rating: 4.91,
    reviewCount: 52,
    completedJobs: 98,
    hourlyRate: 210,
    calloutFee: 150,
    city: 'Johannesburg',
    suburbs: ['Randburg', 'Sandton', 'Fourways', 'Roodepoort'],
    distanceKm: 4.5,
    verifiedId: true,
    policeClearance: true,
    yearsExperience: 10,
    languages: ['Xitsonga', 'English', 'isiZulu'],
    availableToday: true,
    hasOwnTransport: true,
    hasOwnTools: true,
    loadSheddingBackup: true,
    portfolio: [CLEANING_IMAGE],
    phone: '+27 73 998 1277',
    whatsapp: 'https://wa.me/27739981277',
    reviews: [
      {
        id: 'r-801',
        reviewerName: 'Wayne Coetzee',
        reviewerLocation: 'Randburg',
        rating: 5,
        date: '6 days ago',
        comment: 'Gift pruned our two large palm trees and hauled away all green waste. Very polite team and excellent finish.',
        serviceCategory: 'gardening'
      }
    ]
  }
];

export const INITIAL_TASKS: ClientTask[] = [
  {
    id: 'task-1',
    title: 'Bakkie needed to collect couch from Builders Fourways to Bryanston',
    description: 'Bought a 3-seater corner couch from Builders Warehouse in Fourways. Need a bakkie and driver plus 1 assistant to transport it to 2nd floor flat in Bryanston.',
    category: 'bakkie_moving',
    city: 'Johannesburg',
    suburb: 'Fourways',
    budget: 650,
    urgency: 'today',
    postedAt: '45 mins ago',
    clientName: 'Nandi Sithole',
    quotesCount: 3,
    status: 'open',
    quotes: [
      {
        id: 'q-1',
        providerId: 'p-3',
        providerName: 'Lwazi & Brothers Bakkie Services',
        providerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
        providerRating: 4.92,
        offeredPrice: 600,
        message: 'We have our 1-ton bakkie nearby with heavy duty straps and blankets. Can collect by 14:00 today.',
        submittedAt: '30 mins ago',
        status: 'pending'
      }
    ]
  },
  {
    id: 'task-2',
    title: 'Kitchen sink pipe leaking into cupboard',
    description: 'PVC drain pipe under kitchen double sink came loose and is leaking soapy water whenever dishwasher runs. Need replacement seal or re-fitting.',
    category: 'plumbing',
    city: 'Johannesburg',
    suburb: 'Randburg',
    budget: 450,
    urgency: 'today',
    postedAt: '2 hours ago',
    clientName: 'Brian Miller',
    quotesCount: 2,
    status: 'open',
    quotes: []
  },
  {
    id: 'task-3',
    title: 'Pre-move-in deep cleaning for 2-bedroom townhouse',
    description: 'Moving into a new townhouse this Saturday. Need full kitchen cupboards wiped down, tiled floors steam mopped, bathrooms sanitized, and windows cleaned.',
    category: 'cleaning',
    city: 'Cape Town',
    suburb: 'Sea Point',
    budget: 700,
    urgency: 'this_week',
    postedAt: '5 hours ago',
    clientName: 'Annelize Rossouw',
    quotesCount: 4,
    status: 'open',
    quotes: []
  },
  {
    id: 'task-4',
    title: 'Install 5kW Inverter changeover switch on DB Board',
    description: 'Purchased a portable inverter trolley with lithium battery. Need qualified electrician to install manual changeover switch into main distribution board so critical lights and fridge stay on.',
    category: 'electrical',
    city: 'Pretoria',
    suburb: 'Centurion',
    budget: 1200,
    urgency: 'this_week',
    postedAt: '1 day ago',
    clientName: 'Pieter Gouws',
    quotesCount: 3,
    status: 'open',
    quotes: []
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'LL-89104',
    providerId: 'p-2',
    providerName: 'Naledi Mokoena',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    providerPhone: '+27 71 890 3341',
    serviceCategory: 'cleaning',
    serviceTitle: 'Full Home Deep Clean (3 Rooms)',
    date: '2026-10-19',
    timeSlot: '09:00 - 13:00',
    clientName: 'Malose Poopedi',
    clientPhone: '+27 82 123 4567',
    clientAddress: '14 Oxford Road, Saxonwold',
    suburb: 'Rosebank',
    city: 'Johannesburg',
    status: 'confirmed',
    totalCost: 570,
    paymentMethod: 'escrow',
    notes: 'Please buzz gate unit 4B. We have a friendly golden retriever.',
    createdAt: '2026-10-18T08:30:00Z',
    rated: false
  }
];
