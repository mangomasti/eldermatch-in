export type Facility = {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  state: string;
  address: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  lastVerified: string;
  description: string;
  longDescription: string;
  images: string[];
  careTypes: string[]; // Assisted living, Memory/dementia care, Nursing care, Independent living
  amenities: string[];
  medicalCapabilities: string[];
  staffRatio: string;
  licensing: string[];
  languages: string[];
  residentInterests: string[];
  schedule: { day: string; activities: string[] }[];
  reviews: {
    author: string;
    rating: number;
    date: string;
    verifiedStay: boolean;
    text: string;
  }[];
  featured?: boolean;
  photosPending?: boolean;
  phone?: string;
  email?: string;
  website?: string;
};


// Unsplash placeholder images (senior living, warm interiors, gardens)
import { REAL_FACILITY_SPECS, type RealFacilitySpec } from "./facility-specs";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const STOCK_POOL = [
  "1568092775055-078e77df6ac8",
  "1560448204-e02f11c3d0e2",
  "1584622650111-993a426fbf0a",
  "1519974719765-e6559eac2575",
  "1580489944761-15a19d654956",
  "1522708323590-d24dbb6b0267",
  "1586023492125-27b2c045efd7",
  "1502672260266-1c1ef2d93688",
  "1600585154340-be6161a56a0c",
  "1522156373667-4c7234bbd804",
  "1600585154526-990dced4db0d",
];

export const PHOTOS_PENDING_LABEL = "Photos pending — official images coming soon";

function buildReal(sp: RealFacilitySpec, idx: number): Facility {
  const pick = (n: number) => img(STOCK_POOL[(idx * 3 + n) % STOCK_POOL.length]);
  return {
    id: sp.id,
    name: sp.name,
    neighborhood: sp.neighborhood,
    city: sp.city,
    state: sp.state,
    address: sp.address,
    priceMin: sp.priceMin,
    priceMax: sp.priceMax,
    rating: sp.rating,
    reviewCount: sp.reviewCount,
    verified: false,
    lastVerified: "",
    description: sp.description,
    longDescription: `${sp.description} Pricing: ${sp.priceNote}. Source of listing information: ${sp.source}. This listing is unverified — details are drawn from public sources and have not yet been confirmed by the facility.`,
    images: [pick(0), pick(1), pick(2), pick(3)],
    photosPending: true,
    careTypes: sp.careTypes,
    amenities: sp.amenities,
    medicalCapabilities: sp.conditionCare,
    staffRatio: sp.staffRatio,
    licensing: sp.licensing,
    languages: sp.languages,
    residentInterests: [],
    schedule: [],
    reviews: [],
    phone: sp.phone,
    email: sp.email,
    website: sp.website,
  };
}

export const facilities: Facility[] = REAL_FACILITY_SPECS.map(buildReal);

export const ALL_CARE_TYPES = [
  "Assisted living",
  "Memory/dementia care",
  "Nursing care",
  "Independent living",
];

export const ALL_AMENITIES = [
  "Outdoor space",
  "Physical therapy on-site",
  "24/7 nursing",
  "Pet-friendly",
  "In-house clinic",
  "Fitness centre",
  "Library",
];

export const NEIGHBORHOODS = Array.from(new Set(facilities.map((f) => f.neighborhood))).sort();

export const STATES = Array.from(new Set(facilities.map((f) => f.state))).sort();

export const CITIES = Array.from(new Set(facilities.map((f) => f.city))).sort();

export function citiesInState(state: string) {
  return Array.from(
    new Set(facilities.filter((f) => !state || f.state === state).map((f) => f.city)),
  ).sort();
}

export const LANGUAGES = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Urdu",
];

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function getFacility(id: string) {
  return facilities.find((f) => f.id === id);
}

// ============================================================
// Expanded metadata: standardized tiers, care types, per-facility enrichment
// ============================================================

export const FACILITY_TIERS = [
  "NGO/Free care",
  "Budget/Private",
  "Mid-range assisted living",
  "Premium/Medical care",
] as const;
export type FacilityTier = (typeof FACILITY_TIERS)[number];

export const STANDARDIZED_CARE_TYPES: { name: string; definition: string }[] = [
  {
    name: "Assisted Living",
    definition:
      "Help with daily activities (bathing, dressing, meals) while maintaining independence.",
  },
  {
    name: "Nursing Care",
    definition: "24/7 medical nursing for chronic conditions and post-hospital recovery.",
  },
  {
    name: "Dementia Care",
    definition: "Specialised memory care with secure environment and trained staff.",
  },
  {
    name: "Palliative Care",
    definition: "Comfort-focused care for terminal illness, emphasising quality of life.",
  },
  {
    name: "Respite / Short-stay",
    definition: "Temporary stays (days to weeks) to support family caregivers.",
  },
  {
    name: "Independent Living",
    definition: "Community living with light housekeeping and social programmes.",
  },
];

export const CONDITION_CARE_OPTIONS = [
  "Post-surgery recovery",
  "Paralysis",
  "Chronic illness (diabetes, hypertension)",
  "Palliative care",
  "Bedridden care",
  "Dementia/Alzheimer's",
];

export type FacilityEnrichment = {
  tier: FacilityTier;
  yearFounded: number;
  lastUpdated: string;
  itemizedCosts: {
    private?: number;
    shared?: number;
    extras: { name: string; cost: string }[];
    deposit: string;
  };
  conditionCare: string[];
  staff: { credentials: string; ratio: string; avgExperience: string };
  hospitalTieUp?: string;
  distanceToHospital: string;
  distanceToAirport: string;
  cuisine: string[];
  emergencyPlan: {
    onCallDoctor: string;
    ambulance: string;
    partnerHospital: string;
    protocol: string;
  };
  priceHistory: { month: string; price: number }[];
  trialStay: { available: boolean; nights: number; price?: number };
  petFriendly: boolean;
  distantFamilySupport?: string;
};

const commonEmergency = {
  onCallDoctor: "24/7 on-call doctor within 15 minutes",
  ambulance: "Ambulance on standby, 2-minute dispatch",
  partnerHospital: "Manipal Hospital (partner, priority admission)",
  protocol: "Family notified within 5 minutes of any incident.",
};

export const FACILITY_ENRICHMENT: Record<string, FacilityEnrichment> = {
  "willowbrook-gardens": {
    tier: "Mid-range assisted living",
    yearFounded: 2016,
    lastUpdated: "March 2026",
    itemizedCosts: {
      private: 65000,
      shared: 45000,
      extras: [
        { name: "Physiotherapy sessions", cost: "₹500 / session" },
        { name: "Special diet (diabetic)", cost: "₹2,500 / month" },
        { name: "Escorted hospital visit", cost: "₹1,500 / visit" },
      ],
      deposit: "₹50,000 refundable",
    },
    conditionCare: [
      "Post-surgery recovery",
      "Chronic illness (diabetes, hypertension)",
      "Dementia/Alzheimer's",
    ],
    staff: {
      credentials: "GNM & B.Sc. Nursing; 2 geriatric-trained doctors",
      ratio: "1 : 4 (day) · 1 : 8 (night)",
      avgExperience: "8 years",
    },
    hospitalTieUp: "Manipal Hospitals (Old Airport Road) — 15 min",
    distanceToHospital: "3.2 km to Manipal",
    distanceToAirport: "38 km to KIA",
    cuisine: ["South Indian", "North Indian", "Continental", "Diabetic-friendly"],
    emergencyPlan: commonEmergency,
    priceHistory: [
      { month: "Sep 2025", price: 60000 },
      { month: "Dec 2025", price: 62000 },
      { month: "Mar 2026", price: 65000 },
    ],
    trialStay: { available: true, nights: 3, price: 8500 },
    petFriendly: true,
    distantFamilySupport: "Weekly video check-ins for NRI families",
  },
  "silverpine-residences": {
    tier: "Premium/Medical care",
    yearFounded: 2012,
    lastUpdated: "February 2026",
    itemizedCosts: {
      private: 95000,
      extras: [
        { name: "24/7 dedicated attendant", cost: "₹15,000 / month" },
        { name: "Specialist consultations", cost: "₹2,000 / visit" },
      ],
      deposit: "₹1,00,000 refundable",
    },
    conditionCare: ["Post-surgery recovery", "Paralysis", "Palliative care", "Bedridden care"],
    staff: {
      credentials: "MD-supervised; ICU-trained nurses",
      ratio: "1 : 3 (day) · 1 : 6 (night)",
      avgExperience: "12 years",
    },
    hospitalTieUp: "Fortis Whitefield — 8 min",
    distanceToHospital: "1.6 km to Fortis",
    distanceToAirport: "45 km to KIA",
    cuisine: ["South Indian", "North Indian", "Low-sodium", "Renal diet"],
    emergencyPlan: {
      ...commonEmergency,
      partnerHospital: "Fortis Whitefield (partner, priority admission)",
    },
    priceHistory: [
      { month: "Sep 2025", price: 90000 },
      { month: "Dec 2025", price: 92000 },
      { month: "Feb 2026", price: 95000 },
    ],
    trialStay: { available: true, nights: 5, price: 18000 },
    petFriendly: false,
    distantFamilySupport: "Dedicated NRI liaison and monthly medical reports",
  },
  "banyan-house": {
    tier: "Budget/Private",
    yearFounded: 2019,
    lastUpdated: "January 2026",
    itemizedCosts: {
      shared: 28000,
      private: 42000,
      extras: [
        { name: "Laundry (personal)", cost: "₹800 / month" },
        { name: "Physio (weekly)", cost: "₹1,800 / month" },
      ],
      deposit: "₹25,000 refundable",
    },
    conditionCare: ["Chronic illness (diabetes, hypertension)"],
    staff: {
      credentials: "GNM nurses + trained caregivers",
      ratio: "1 : 6 (day) · 1 : 12 (night)",
      avgExperience: "5 years",
    },
    hospitalTieUp: "Apollo Jayanagar — 10 min",
    distanceToHospital: "2.4 km to Apollo",
    distanceToAirport: "42 km to KIA",
    cuisine: ["South Indian", "Home-style vegetarian"],
    emergencyPlan: { ...commonEmergency, partnerHospital: "Apollo Jayanagar (partner)" },
    priceHistory: [
      { month: "Jul 2025", price: 26000 },
      { month: "Oct 2025", price: 27000 },
      { month: "Jan 2026", price: 28000 },
    ],
    trialStay: { available: true, nights: 2, price: 3500 },
    petFriendly: true,
  },
  "meadowlark-manor": {
    tier: "Premium/Medical care",
    yearFounded: 2010,
    lastUpdated: "March 2026",
    itemizedCosts: {
      private: 88000,
      extras: [
        { name: "Personal chef consult", cost: "₹5,000 / month" },
        { name: "Salon & wellness", cost: "₹2,500 / month" },
      ],
      deposit: "₹75,000 refundable",
    },
    conditionCare: ["Dementia/Alzheimer's", "Post-surgery recovery"],
    staff: {
      credentials: "Geriatrician-led; certified memory-care staff",
      ratio: "1 : 3 (day) · 1 : 5 (night)",
      avgExperience: "10 years",
    },
    hospitalTieUp: "Sakra World Hospital — 12 min",
    distanceToHospital: "2.9 km to Sakra",
    distanceToAirport: "40 km to KIA",
    cuisine: ["Multi-cuisine", "Diabetic-friendly", "Jain options"],
    emergencyPlan: { ...commonEmergency, partnerHospital: "Sakra World Hospital (partner)" },
    priceHistory: [
      { month: "Sep 2025", price: 84000 },
      { month: "Dec 2025", price: 86000 },
      { month: "Mar 2026", price: 88000 },
    ],
    trialStay: { available: true, nights: 3, price: 12000 },
    petFriendly: false,
    distantFamilySupport: "Video visits scheduled by concierge",
  },
  "ashraya-nivas": {
    tier: "NGO/Free care",
    yearFounded: 2005,
    lastUpdated: "December 2025",
    itemizedCosts: {
      shared: 0,
      extras: [{ name: "Voluntary contribution", cost: "As you're able" }],
      deposit: "None",
    },
    conditionCare: ["Chronic illness (diabetes, hypertension)"],
    staff: {
      credentials: "ANM nurses + volunteer caregivers",
      ratio: "1 : 8 (day) · 1 : 15 (night)",
      avgExperience: "6 years",
    },
    hospitalTieUp: "Victoria Hospital (govt.) — 20 min",
    distanceToHospital: "5.1 km to Victoria",
    distanceToAirport: "48 km to KIA",
    cuisine: ["South Indian vegetarian"],
    emergencyPlan: {
      ...commonEmergency,
      partnerHospital: "Victoria Hospital (govt. tie-up)",
      ambulance: "108 ambulance response",
    },
    priceHistory: [
      { month: "Jan 2025", price: 0 },
      { month: "Jan 2026", price: 0 },
    ],
    trialStay: { available: false, nights: 0 },
    petFriendly: false,
  },
  "cypress-court": {
    tier: "Mid-range assisted living",
    yearFounded: 2015,
    lastUpdated: "March 2026",
    itemizedCosts: {
      private: 58000,
      shared: 40000,
      extras: [
        { name: "Physiotherapy", cost: "₹450 / session" },
        { name: "Cultural events", cost: "Included" },
      ],
      deposit: "₹40,000 refundable",
    },
    conditionCare: ["Chronic illness (diabetes, hypertension)", "Post-surgery recovery"],
    staff: {
      credentials: "GNM nurses; visiting physician (3x/week)",
      ratio: "1 : 5 (day) · 1 : 10 (night)",
      avgExperience: "7 years",
    },
    hospitalTieUp: "Aster CMI — 14 min",
    distanceToHospital: "3.6 km to Aster",
    distanceToAirport: "35 km to KIA",
    cuisine: ["South Indian", "North Indian", "Vegan options"],
    emergencyPlan: { ...commonEmergency, partnerHospital: "Aster CMI (partner)" },
    priceHistory: [
      { month: "Sep 2025", price: 54000 },
      { month: "Dec 2025", price: 56000 },
      { month: "Mar 2026", price: 58000 },
    ],
    trialStay: { available: true, nights: 3, price: 7500 },
    petFriendly: true,
    distantFamilySupport: "Fortnightly video updates",
  },
};

// Auto-generate enrichment for the pan-India sample facilities
for (const sp of REAL_FACILITY_SPECS) {
  const f = EXTRA_FACILITIES.find((x) => x.id === sp.id)!;
  const priv = Math.round(sp.priceMax * 0.8);
  const shared = Math.round(sp.priceMin * 0.95);
  FACILITY_ENRICHMENT[sp.id] = {
    tier: sp.tier,
    yearFounded: 2008 + (sp.reviewCount % 12),
    lastUpdated: "March 2026",
    itemizedCosts: {
      private: sp.tier === "NGO/Free care" ? undefined : priv,
      shared: sp.tier === "NGO/Free care" ? 0 : shared,
      extras: [
        { name: "Physiotherapy sessions", cost: "₹450 / session" },
        { name: "Medicines (billed at cost)", cost: "Actuals, monthly statement" },
        { name: "Electricity / AC surcharge", cost: "₹1,200 / month" },
      ],
      deposit:
        sp.tier === "NGO/Free care"
          ? "None"
          : `₹${(Math.round(sp.priceMin / 10000) * 10000).toLocaleString("en-IN")} refundable`,
    },
    conditionCare: f.careTypes.some((c) => /memory/i.test(c))
      ? ["Dementia/Alzheimer's", "Chronic illness (diabetes, hypertension)"]
      : f.careTypes.some((c) => /nursing/i.test(c))
        ? ["Post-surgery recovery", "Bedridden care", "Palliative care"]
        : ["Chronic illness (diabetes, hypertension)"],
    staff: {
      credentials: "GNM nurses; visiting physician",
      ratio: f.staffRatio,
      avgExperience: `${5 + (sp.reviewCount % 7)} years`,
    },
    hospitalTieUp: sp.hospital,
    distanceToHospital: `${(1 + (sp.reviewCount % 5)).toFixed(1)} km to ${sp.hospital.split(" — ")[0]}`,
    distanceToAirport: `${18 + (sp.reviewCount % 30)} km to ${sp.city} airport`,
    cuisine: sp.cuisine,
    emergencyPlan: {
      ...commonEmergency,
      partnerHospital: `${sp.hospital.split(" — ")[0]} (partner, priority admission)`,
    },
    priceHistory: [
      { month: "Sep 2025", price: Math.round(sp.priceMin * 0.92) },
      { month: "Dec 2025", price: Math.round(sp.priceMin * 0.96) },
      { month: "Mar 2026", price: sp.priceMin },
    ],
    trialStay: {
      available: sp.tier !== "NGO/Free care",
      nights: 3,
      price: Math.round(sp.priceMin / 8),
    },
    petFriendly: sp.reviewCount % 2 === 0,
    distantFamilySupport: "Weekly video check-ins for families living away",
  };
}

for (const sp of REAL_FACILITY_SPECS) {
  FACILITY_ENRICHMENT[sp.id] = {
    tier: sp.tier,
    yearFounded: 0,
    lastUpdated: "Unverified listing",
    itemizedCosts: {
      private: sp.priceMax || undefined,
      shared: sp.priceMin || undefined,
      extras: [{ name: "Pricing details", cost: sp.priceNote }],
      deposit: sp.deposit,
    },
    conditionCare: sp.conditionCare,
    staff: { credentials: "N/A", ratio: sp.staffRatio, avgExperience: "N/A" },
    hospitalTieUp: sp.hospitalTieUp,
    distanceToHospital: sp.distanceToHospital,
    distanceToAirport: sp.distanceToAirport,
    cuisine: sp.cuisine,
    emergencyPlan: {
      onCallDoctor: "N/A",
      ambulance: "N/A",
      partnerHospital: sp.hospitalTieUp,
      protocol: "N/A",
    },
    priceHistory: [],
    trialStay: { available: false, nights: 0 },
    petFriendly: false,
    distantFamilySupport: "N/A",
  };
}

export function getEnrichment(id: string): FacilityEnrichment | undefined {
  return FACILITY_ENRICHMENT[id];
}

// ============================================================
// Mock Dashboard data (for the Facility Admin experience)
// ============================================================

export type Lead = {
  id: string;
  name: string;
  contact: string;
  question: string;
  receivedAt: string;
  status: "New" | "Contacted" | "Tour scheduled" | "Enrolled" | "Not a fit";
  notes: string;
};

export type ReviewItem = {
  id: string;
  rating: number;
  date: string;
  verifiedStay: boolean;
  text: string;
  ownerReply?: string;
};

export type DashboardData = {
  facilityId: string;
  metrics: {
    profileViews30d: number;
    profileViewsPrev30d: number;
    inquiries30d: number;
    inquiriesPrev30d: number;
    saves30d: number;
    conversionRate: number;
    responseTimeHours: number;
    avgRating: number;
    ratingCount: number;
  };
  verification: {
    status: "Verified" | "Pending" | "Expiring soon";
    lastVerified: string;
    expiresOn: string;
    documents: { name: string; status: "Approved" | "Missing" | "Expiring" }[];
  };
  leads: Lead[];
  reviews: ReviewItem[];
  demographics: { area: string; percent: number }[];
  weeklyViews: { week: string; views: number }[];
  competitorComparison: {
    metric: string;
    you: number | string;
    marketAvg: number | string;
  }[];
};

export const MOCK_DASHBOARD: DashboardData = {
  facilityId: REAL_FACILITY_SPECS[0].id,
  metrics: {
    profileViews30d: 1284,
    profileViewsPrev30d: 1042,
    inquiries30d: 38,
    inquiriesPrev30d: 29,
    saves30d: 92,
    conversionRate: 3.0,
    responseTimeHours: 4.2,
    avgRating: 4.8,
    ratingCount: 127,
  },
  verification: {
    status: "Verified",
    lastVerified: "March 2026",
    expiresOn: "March 2027",
    documents: [
      { name: "Karnataka PNH registration", status: "Approved" },
      { name: "Fire safety NOC", status: "Approved" },
      { name: "NABH pre-accreditation", status: "Approved" },
      { name: "Insurance (public liability)", status: "Expiring" },
    ],
  },
  leads: [
    {
      id: "L-1042",
      name: "Priya S.",
      contact: "priya***@gmail.com · +91 98••••32",
      question: "Do you have availability for a 78-year-old post-hip-surgery in April?",
      receivedAt: "2 hours ago",
      status: "New",
      notes: "",
    },
    {
      id: "L-1041",
      name: "Anonymous (NRI family)",
      contact: "Via ElderMatch relay",
      question: "Interested in trial stay. Father has early Alzheimer's.",
      receivedAt: "Yesterday",
      status: "Contacted",
      notes: "Sent brochure; scheduling video tour Thursday.",
    },
    {
      id: "L-1040",
      name: "Rakesh M.",
      contact: "+91 98••••17",
      question: "Monthly cost for shared room including physiotherapy?",
      receivedAt: "3 days ago",
      status: "Tour scheduled",
      notes: "Tour: Sat 11am.",
    },
    {
      id: "L-1038",
      name: "Vandana K.",
      contact: "vandana***@yahoo.in",
      question: "Vegetarian Jain meals available?",
      receivedAt: "1 week ago",
      status: "Enrolled",
      notes: "Moved in on the 12th.",
    },
    {
      id: "L-1035",
      name: "Suresh R.",
      contact: "+91 97••••04",
      question: "Palliative care options?",
      receivedAt: "2 weeks ago",
      status: "Not a fit",
      notes: "Referred to Silverpine.",
    },
  ],
  reviews: [
    {
      id: "R-3021",
      rating: 5,
      date: "2 weeks ago",
      verifiedStay: true,
      text: "The nursing team is exceptional. My mother settled in within a week and the garden has been a real gift for her.",
      ownerReply: "Thank you — we're so glad she's thriving. Please pass on our warm regards.",
    },
    {
      id: "R-3018",
      rating: 4,
      date: "1 month ago",
      verifiedStay: true,
      text: "Great facility overall. Food could have more variety on weekends but the care is genuinely warm.",
    },
    {
      id: "R-3012",
      rating: 5,
      date: "2 months ago",
      verifiedStay: true,
      text: "As an NRI, the weekly video updates gave me real peace of mind. Highly recommend for distant families.",
      ownerReply: "Thank you — our NRI liaison programme is one of the things we're proudest of.",
    },
    {
      id: "R-3005",
      rating: 3,
      date: "3 months ago",
      verifiedStay: true,
      text: "Care is solid, but the initial paperwork was slower than expected.",
    },
  ],
  demographics: [
    { area: "Indiranagar & nearby", percent: 42 },
    { area: "Whitefield / east BLR", percent: 22 },
    { area: "Central Bengaluru", percent: 18 },
    { area: "NRI / out of city", percent: 18 },
  ],
  weeklyViews: [
    { week: "W1", views: 264 },
    { week: "W2", views: 298 },
    { week: "W3", views: 341 },
    { week: "W4", views: 381 },
  ],
  competitorComparison: [
    { metric: "Avg. price (private room)", you: "₹65,000", marketAvg: "₹72,000" },
    { metric: "Rating", you: 4.8, marketAvg: 4.5 },
    { metric: "Response time (hours)", you: 4.2, marketAvg: 9.6 },
    { metric: "Verified stay reviews", you: 127, marketAvg: 84 },
  ],
};

// ============================================================
// Community / dietary preference
// ============================================================

export const DIETARY_PREFERENCES = [
  "Jain",
  "Brahmin",
  "Muslim",
  "Christian",
  "Vegetarian (general)",
  "Non-Vegetarian available",
  "No specific preference",
] as const;
export type DietaryPreference = (typeof DIETARY_PREFERENCES)[number];

export const FACILITY_DIETARY: Record<string, string[]> = {
  "willowbrook-gardens": ["Vegetarian (general)", "Jain", "Brahmin", "Non-Vegetarian available"],
  "silverpine-residences": [
    "Vegetarian (general)",
    "Non-Vegetarian available",
    "Christian",
    "Muslim",
  ],
  "banyan-house": ["Brahmin", "Vegetarian (general)", "Jain"],
  "meadowlark-manor": ["Vegetarian (general)", "Non-Vegetarian available", "Christian"],
  "tulsi-nivas": ["Brahmin", "Jain", "Vegetarian (general)"],
  "cypress-court": ["Vegetarian (general)", "Non-Vegetarian available", "Muslim", "Christian"],
};

for (const sp of REAL_FACILITY_SPECS) {
  FACILITY_DIETARY[sp.id] = sp.dietary;
}

export function facilityDietary(id: string) {
  return FACILITY_DIETARY[id] ?? ["No specific preference"];
}

// ============================================================
// Simplified browse care categories
// ============================================================

export const BROWSE_CARE_TYPES = [
  "Assisted Living",
  "Independent Living",
  "Palliative Care",
] as const;

export function facilityBrowseCategories(f: Facility): string[] {
  const out: string[] = [];
  if (f.careTypes.some((c) => /assisted/i.test(c))) out.push("Assisted Living");
  if (f.careTypes.some((c) => /independent/i.test(c))) out.push("Independent Living");
  const e = FACILITY_ENRICHMENT[f.id];
  if (
    f.amenities.some((a) => /palliative/i.test(a)) ||
    f.medicalCapabilities.some((a) => /palliative/i.test(a)) ||
    e?.conditionCare.some((c) => /palliative/i.test(c))
  )
    out.push("Palliative Care");
  return out;
}

// ============================================================
// Unclaimed (pre-loaded) facility listings for the owner entry flow
// ============================================================

export type OwnerListing = {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  state: string;
  careType: string;
  tier: FacilityTier;
  status: "Unclaimed" | "Already Registered";
};

export const UNCLAIMED_LISTINGS: OwnerListing[] = [
  {
    id: "shanti-nilaya",
    name: "Shanti Nilaya Senior Home",
    neighborhood: "Basavanagudi",
    city: "Bengaluru",
    state: "Karnataka",
    careType: "Assisted Living",
    tier: "Budget/Private",
    status: "Unclaimed",
  },
  {
    id: "sunshine-elders",
    name: "Sunshine Elders Care",
    neighborhood: "Rajajinagar",
    city: "Bengaluru",
    state: "Karnataka",
    careType: "Assisted Living",
    tier: "NGO/Free care",
    status: "Unclaimed",
  },
  {
    id: "green-meadows-seniors",
    name: "Green Meadows Seniors Village",
    neighborhood: "Yelahanka",
    city: "Bengaluru",
    state: "Karnataka",
    careType: "Independent Living",
    tier: "Mid-range assisted living",
    status: "Unclaimed",
  },
  {
    id: "aashray-palliative",
    name: "Aashray Palliative Home",
    neighborhood: "Banashankari",
    city: "Bengaluru",
    state: "Karnataka",
    careType: "Palliative Care",
    tier: "NGO/Free care",
    status: "Unclaimed",
  },
];

export const OWNER_LISTINGS: OwnerListing[] = [
  ...facilities.map<OwnerListing>((f) => ({
    id: f.id,
    name: f.name,
    neighborhood: f.neighborhood,
    city: f.city,
    state: f.state,
    careType: facilityBrowseCategories(f)[0] ?? f.careTypes[0],
    tier: FACILITY_ENRICHMENT[f.id]?.tier ?? "Mid-range assisted living",
    status: "Already Registered",
  })),
  ...UNCLAIMED_LISTINGS,
];

export function getOwnerListing(id: string) {
  return OWNER_LISTINGS.find((l) => l.id === id);
}

// ============================================================
// Facility-side aggregate insights (Insights tab)
// ============================================================

export const MOCK_INSIGHTS = {
  shortlists30d: 24,
  shortlistsChangePct: 15,
  shortlistsTotal: 186,
  profileViews30d: 1284,
  monthlyShortlists: [
    { month: "Nov", count: 12 },
    { month: "Dec", count: 15 },
    { month: "Jan", count: 18 },
    { month: "Feb", count: 21 },
    { month: "Mar", count: 24 },
  ],
  visitorTrends: [
    { label: "Most searched care type by visitors", value: "Assisted Living", share: 58 },
    { label: "Most common budget range among visitors", value: "₹40,000–₹60,000", share: 44 },
    { label: "Top priority among visitors", value: "Location convenience", share: 37 },
    { label: "Common room preference", value: "Private room requested", share: 62 },
  ],
  careTypeMix: [
    { label: "Assisted Living", pct: 58 },
    { label: "Independent Living", pct: 26 },
    { label: "Palliative Care", pct: 16 },
  ],
  budgetMix: [
    { label: "Under ₹40,000", pct: 21 },
    { label: "₹40,000–₹60,000", pct: 44 },
    { label: "₹60,000–₹90,000", pct: 24 },
    { label: "Above ₹90,000", pct: 11 },
  ],
};

// ============================================================
// Founder / internal admin mock data
// ============================================================

export const FOUNDER_PASSWORD = "eldermatch2026";

export const FOUNDER_OVERVIEW = {
  totalFacilities: 148,
  byTier: [
    { tier: "NGO/Free care", count: 22 },
    { tier: "Budget/Private", count: 51 },
    { tier: "Mid-range assisted living", count: 48 },
    { tier: "Premium/Medical care", count: 27 },
  ],
  totalUsers: 3421,
  totalLeads: 1874,
  totalShortlists: 6210,
  revenueNote: "₹0 — no monetization live yet",
  mockCommission: "₹0 tracked across 0 paid placements",
};

export type QueueItem = {
  id: string;
  facility: string;
  tier: string;
  submitted: string;
  documents: string;
  kind: "registration" | "claim";
  claimant?: string;
  decision?: "Approved" | "Rejected" | "Info requested";
};

export const FOUNDER_QUEUE: QueueItem[] = [
  {
    id: "Q-101",
    facility: "Nandi Serene Care",
    tier: "Budget/Private",
    submitted: "2 days ago",
    documents: "3 of 4 uploaded",
    kind: "registration",
  },
  {
    id: "Q-102",
    facility: "Ashwini Elder Residency",
    tier: "Mid-range assisted living",
    submitted: "4 days ago",
    documents: "4 of 4 uploaded",
    kind: "registration",
  },
  {
    id: "Q-103",
    facility: "Hope Haven Trust",
    tier: "NGO/Free care",
    submitted: "1 week ago",
    documents: "2 of 4 uploaded",
    kind: "registration",
  },
  {
    id: "Q-201",
    facility: "Shanti Nilaya Senior Home",
    tier: "Budget/Private",
    submitted: "1 day ago",
    documents: "Ownership proof uploaded",
    kind: "claim",
    claimant: "Ramesh Gowda (Owner)",
  },
  {
    id: "Q-202",
    facility: "Sunshine Elders Care",
    tier: "NGO/Free care",
    submitted: "3 days ago",
    documents: "Trust deed pending",
    kind: "claim",
    claimant: "Sr. Mary Joseph (Administrator)",
  },
];

export type PlatformFacilityRow = {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  state: string;
  tier: string;
  claimed: boolean;
  verified: boolean;
  active: boolean;
  status: "Verified" | "Pending" | "Rejected";
  views: number;
  leads: number;
  shortlists: number;
};

export const FOUNDER_FACILITIES: PlatformFacilityRow[] = [
  ...facilities.map<PlatformFacilityRow>((f, i) => ({
    id: f.id,
    name: f.name,
    neighborhood: f.neighborhood,
    city: f.city,
    state: f.state,
    tier: FACILITY_ENRICHMENT[f.id]?.tier ?? "Mid-range assisted living",
    claimed: true,
    verified: f.verified,
    active: i % 9 !== 7,
    status: "Verified",
    views: 1284 - i * 41,
    leads: 46 - i,
    shortlists: 98 - i * 3,
  })),
  ...UNCLAIMED_LISTINGS.map<PlatformFacilityRow>((l, i) => ({
    id: l.id,
    name: l.name,
    neighborhood: l.neighborhood,
    city: l.city,
    state: l.state,
    tier: l.tier,
    claimed: false,
    verified: false,
    active: true,
    status: "Pending",
    views: 320 - i * 45,
    leads: 6 - i,
    shortlists: 14 - i * 2,
  })),
];

export type PlatformUserRow = {
  id: string;
  name: string;
  email: string;
  signupDate: string;
  enquiries: number;
  shortlists: number;
};

export const FOUNDER_USERS: PlatformUserRow[] = [
  {
    id: "U-2041",
    name: "Priya Sharma",
    email: "priya.s@gmail.com",
    signupDate: "12 Mar 2026",
    enquiries: 4,
    shortlists: 7,
  },
  {
    id: "U-2038",
    name: "Arun Menon",
    email: "arun.menon@outlook.com",
    signupDate: "09 Mar 2026",
    enquiries: 2,
    shortlists: 3,
  },
  {
    id: "U-2030",
    name: "Fatima Sheikh",
    email: "fatima.sk@gmail.com",
    signupDate: "27 Feb 2026",
    enquiries: 6,
    shortlists: 11,
  },
  {
    id: "U-2025",
    name: "Joseph Thomas",
    email: "j.thomas@yahoo.in",
    signupDate: "21 Feb 2026",
    enquiries: 1,
    shortlists: 2,
  },
  {
    id: "U-2019",
    name: "Lakshmi Gowda",
    email: "lakshmi.g@gmail.com",
    signupDate: "14 Feb 2026",
    enquiries: 3,
    shortlists: 5,
  },
  {
    id: "U-2011",
    name: "Vikram Shetty",
    email: "vikram.shetty@gmail.com",
    signupDate: "02 Feb 2026",
    enquiries: 5,
    shortlists: 9,
  },
  {
    id: "U-2004",
    name: "Anitha Rao",
    email: "anitha.rao@rediffmail.com",
    signupDate: "19 Jan 2026",
    enquiries: 2,
    shortlists: 4,
  },
  {
    id: "U-1998",
    name: "Ganesh Bhat",
    email: "ganesh.bhat@gmail.com",
    signupDate: "05 Jan 2026",
    enquiries: 0,
    shortlists: 1,
  },
];

export const FOUNDER_GROWTH = [
  { month: "Oct", facilities: 8, users: 210, enquiries: 96 },
  { month: "Nov", facilities: 11, users: 268, enquiries: 128 },
  { month: "Dec", facilities: 14, users: 341, enquiries: 174 },
  { month: "Jan", facilities: 19, users: 402, enquiries: 233 },
  { month: "Feb", facilities: 23, users: 512, enquiries: 291 },
  { month: "Mar", facilities: 31, users: 648, enquiries: 358 },
];

export const FOUNDER_PREFERENCE_TRENDS = [
  { label: "Most requested care type", value: "Assisted Living", share: 61 },
  { label: "Most common budget range", value: "₹40,000–₹60,000", share: 39 },
  { label: "Top priority overall", value: "Healthcare quality", share: 34 },
  { label: "Most common dietary preference", value: "Vegetarian (general)", share: 46 },
];

// ============================================================
// Founder: revenue (hypothetical), churn, notes
// ============================================================

export const REVENUE_ASSUMPTIONS = {
  commissionPct: 8, // % of first month's fee, per placement
  monthlySubscription: 2500, // ₹ per active listing per month
  placementsPerMonth: 34,
};

export const FOUNDER_REVENUE_MONTHS = [
  { month: "Oct", placements: 12 },
  { month: "Nov", placements: 17 },
  { month: "Dec", placements: 21 },
  { month: "Jan", placements: 26 },
  { month: "Feb", placements: 30 },
  { month: "Mar", placements: 34 },
];

export type ChurnRow = {
  id: string;
  name: string;
  state: string;
  tier: string;
  onboarded: string;
  lastActive: string;
  reason: "Stopped responding" | "Requested removal" | "Low lead conversion" | "Deactivated by ops";
};

export const FOUNDER_CHURN: ChurnRow[] = [
  {
    id: "C-01",
    name: "Sunrise Elders Trust",
    state: "Karnataka",
    tier: "NGO/Free care",
    onboarded: "Aug 2025",
    lastActive: "Jan 2026",
    reason: "Stopped responding",
  },
  {
    id: "C-02",
    name: "Pearl Harbour Seniors",
    state: "Telangana",
    tier: "Budget/Private",
    onboarded: "Sep 2025",
    lastActive: "Feb 2026",
    reason: "Low lead conversion",
  },
  {
    id: "C-03",
    name: "Devi Nilayam",
    state: "Tamil Nadu",
    tier: "Budget/Private",
    onboarded: "Jun 2025",
    lastActive: "Dec 2025",
    reason: "Requested removal",
  },
  {
    id: "C-04",
    name: "Yamuna Care Point",
    state: "Delhi/NCR",
    tier: "Mid-range assisted living",
    onboarded: "Jul 2025",
    lastActive: "Jan 2026",
    reason: "Stopped responding",
  },
  {
    id: "C-05",
    name: "Konkan Rest Home",
    state: "Maharashtra",
    tier: "Budget/Private",
    onboarded: "Oct 2025",
    lastActive: "Feb 2026",
    reason: "Deactivated by ops",
  },
  {
    id: "C-06",
    name: "Ganga Sadan",
    state: "Uttar Pradesh",
    tier: "NGO/Free care",
    onboarded: "May 2025",
    lastActive: "Nov 2025",
    reason: "Low lead conversion",
  },
];

export const FOUNDER_ONBOARDED_TOTAL = 62;

export type FounderNote = { id: string; at: string; text: string };

export const FOUNDER_SEED_NOTES: FounderNote[] = [
  {
    id: "N-3",
    at: "28 Jul 2026, 10:12",
    text: "Called Athulya Senior Care — interested in onboarding, wants tier pricing sheet.",
  },
  {
    id: "N-2",
    at: "24 Jul 2026, 16:40",
    text: "Kerala cluster converting well; consider a Kochi field verifier on retainer.",
  },
  {
    id: "N-1",
    at: "19 Jul 2026, 09:05",
    text: "Two Punjab NGOs asked for free listings permanently — decide policy before Q4.",
  },
];
