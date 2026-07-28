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
};

// Unsplash placeholder images (senior living, warm interiors, gardens)
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const coreFacilities: Facility[] = [
  {
    id: "willowbrook-gardens",
    name: "Willowbrook Gardens",
    neighborhood: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    address: "42, 12th Main Road, Indiranagar, Bengaluru 560038",
    priceMin: 45000,
    priceMax: 85000,
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    lastVerified: "March 2026",
    featured: true,
    description:
      "A leafy, low-density home with private rooms overlooking a courtyard garden.",
    longDescription:
      "Willowbrook Gardens is a boutique 32-resident home built around a central courtyard garden. Our team of geriatric-trained nurses, physiotherapists and activity coordinators has been together for over five years. Meals are cooked fresh on-site with a rotating South Indian and Continental menu.",
    images: [
      img("1568092775055-078e77df6ac8"),
      img("1560448204-e02f11c3d0e2"),
      img("1584622650111-993a426fbf0a"),
      img("1519974719765-e6559eac2575"),
    ],
    careTypes: ["Assisted living", "Independent living", "Memory/dementia care"],
    amenities: [
      "Landscaped garden",
      "Physical therapy on-site",
      "24/7 nursing",
      "Library & reading room",
      "Yoga studio",
      "Housekeeping daily",
    ],
    medicalCapabilities: [
      "On-site nursing",
      "Physical therapy",
      "Emergency response",
      "Medication management",
      "Dementia care wing",
    ],
    staffRatio: "1 : 4 (day) · 1 : 8 (night)",
    licensing: [
      "Karnataka Private Nursing Home Act (Reg. KA/PNH/2019/0421)",
      "NABH Entry-Level Certified",
    ],
    languages: ["English", "Kannada", "Hindi", "Tamil"],
    residentInterests: ["Gardening", "Carnatic music", "Card games", "Book club"],
    schedule: [
      { day: "Mon", activities: ["Morning yoga", "Physiotherapy", "Music circle"] },
      { day: "Tue", activities: ["Garden walk", "Art class", "Movie evening"] },
      { day: "Wed", activities: ["Bhajan session", "Board games", "Doctor's round"] },
      { day: "Thu", activities: ["Chair aerobics", "Cooking demo", "Book club"] },
      { day: "Fri", activities: ["Storytelling", "Physiotherapy", "Cultural evening"] },
    ],
    reviews: [
      {
        author: "Priya Ramesh",
        rating: 5,
        date: "Feb 2026",
        verifiedStay: true,
        text: "My mother has been at Willowbrook for 14 months. The staff know her by name, her preferences, even the songs she likes. The garden is her favourite spot.",
      },
      {
        author: "Arun Menon",
        rating: 5,
        date: "Jan 2026",
        verifiedStay: true,
        text: "Genuinely warm place. The physio team helped my father walk again after his hip surgery. Very transparent on billing.",
      },
      {
        author: "Sudha Iyer",
        rating: 4,
        date: "Dec 2025",
        verifiedStay: true,
        text: "Beautiful facility and caring staff. The food could use more variety but overall we are very happy.",
      },
    ],
  },
  {
    id: "silverpine-residences",
    name: "Silverpine Residences",
    neighborhood: "Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    address: "18, Palm Meadows Road, Whitefield, Bengaluru 560066",
    priceMin: 60000,
    priceMax: 110000,
    rating: 4.7,
    reviewCount: 98,
    verified: true,
    lastVerified: "February 2026",
    featured: true,
    description:
      "Modern assisted living with a specialised memory care unit and on-site clinic.",
    longDescription:
      "Silverpine is a purpose-built 64-suite residence with a dedicated 16-bed memory care wing. Every suite is wheelchair-accessible with fall-detection sensors. Our clinical partner is a leading city hospital.",
    images: [
      img("1580489944761-15a19d654956"),
      img("1522708323590-d24dbb6b0267"),
      img("1586023492125-27b2c045efd7"),
      img("1519974719765-e6559eac2575"),
    ],
    careTypes: ["Assisted living", "Memory/dementia care", "Nursing care"],
    amenities: [
      "On-site clinic",
      "24/7 nursing",
      "Physical therapy on-site",
      "Salon & spa",
      "Chapel & multi-faith room",
      "Pet-friendly visits",
    ],
    medicalCapabilities: [
      "24/7 on-site nursing",
      "Memory care unit",
      "Physical therapy",
      "Emergency response",
      "Medication management",
      "Post-operative care",
    ],
    staffRatio: "1 : 3 (day) · 1 : 6 (night)",
    licensing: [
      "Karnataka Private Nursing Home Act (Reg. KA/PNH/2017/0198)",
      "NABH Full Accreditation",
      "ISO 9001:2015",
    ],
    languages: ["English", "Hindi", "Kannada", "Malayalam", "Telugu"],
    residentInterests: ["Chess", "Classical music", "Poetry", "Movies"],
    schedule: [
      { day: "Mon", activities: ["Aqua therapy", "Memory games", "Live music"] },
      { day: "Tue", activities: ["Physiotherapy", "Poetry circle", "Documentary night"] },
      { day: "Wed", activities: ["Gentle yoga", "Cooking club", "Bingo"] },
      { day: "Thu", activities: ["Guided walk", "Art therapy", "Concert"] },
      { day: "Fri", activities: ["Prayer meet", "Physiotherapy", "Family evening"] },
    ],
    reviews: [
      {
        author: "Rajesh Krishnan",
        rating: 5,
        date: "Feb 2026",
        verifiedStay: true,
        text: "The memory care team is exceptional. My father, who has moderate dementia, is calmer and more engaged than he has been in years.",
      },
      {
        author: "Meera Nair",
        rating: 4,
        date: "Jan 2026",
        verifiedStay: true,
        text: "Excellent medical setup. Slightly on the pricier side but you can see where the money goes.",
      },
      {
        author: "Vikram Shetty",
        rating: 5,
        date: "Nov 2025",
        verifiedStay: true,
        text: "We shifted my mother here from another city. The intake team handled everything sensitively.",
      },
    ],
  },
  {
    id: "banyan-house",
    name: "Banyan House",
    neighborhood: "Jayanagar",
    city: "Bengaluru",
    state: "Karnataka",
    address: "9, 4th Block, Jayanagar, Bengaluru 560011",
    priceMin: 32000,
    priceMax: 55000,
    rating: 4.5,
    reviewCount: 74,
    verified: true,
    lastVerified: "January 2026",
    description:
      "A homely 20-resident bungalow with a family-run feel and a beloved banyan tree courtyard.",
    longDescription:
      "Banyan House is a family-run home that has been operating in Jayanagar for 18 years. Twenty residents, small dining hall, and a wraparound veranda where residents gather every evening.",
    images: [
      img("1502672260266-1c1ef2d93688"),
      img("1600585154340-be6161a56a0c"),
      img("1560448204-e02f11c3d0e2"),
      img("1568092775055-078e77df6ac8"),
    ],
    careTypes: ["Assisted living", "Independent living"],
    amenities: [
      "Outdoor space",
      "Home-style meals",
      "Housekeeping",
      "Doctor visits weekly",
      "Cultural programs",
    ],
    medicalCapabilities: [
      "Trained caregivers",
      "Medication management",
      "Weekly doctor visits",
      "Emergency response",
    ],
    staffRatio: "1 : 5 (day) · 1 : 10 (night)",
    licensing: ["Karnataka Private Nursing Home Act (Reg. KA/PNH/2008/0044)"],
    languages: ["Kannada", "Tamil", "English"],
    residentInterests: ["Gardening", "Devotional music", "Storytelling"],
    schedule: [
      { day: "Mon", activities: ["Morning walk", "Group prayer", "TV time"] },
      { day: "Tue", activities: ["Physiotherapy visit", "Bhajans", "Cards"] },
      { day: "Wed", activities: ["Gardening", "Storytelling", "Movie"] },
      { day: "Thu", activities: ["Chair yoga", "Music circle", "Family calls"] },
      { day: "Fri", activities: ["Temple visit (optional)", "Games", "Dinner outdoors"] },
    ],
    reviews: [
      {
        author: "Lakshmi Gowda",
        rating: 5,
        date: "Feb 2026",
        verifiedStay: true,
        text: "My aunt says it feels like a joint family. The owner-manager knows every resident personally.",
      },
      {
        author: "Ganesh Bhat",
        rating: 4,
        date: "Dec 2025",
        verifiedStay: true,
        text: "Great value and warm environment. Facilities are basic but clean and well-kept.",
      },
      {
        author: "Anitha Rao",
        rating: 5,
        date: "Oct 2025",
        verifiedStay: true,
        text: "A rare place that still feels human. The food is exactly like home.",
      },
    ],
  },
  {
    id: "meadowlark-manor",
    name: "Meadowlark Manor",
    neighborhood: "HSR Layout",
    city: "Bengaluru",
    state: "Karnataka",
    address: "27, Sector 6, HSR Layout, Bengaluru 560102",
    priceMin: 55000,
    priceMax: 95000,
    rating: 4.6,
    reviewCount: 112,
    verified: true,
    lastVerified: "March 2026",
    featured: true,
    description: "Independent living apartments with hotel-style services and a rooftop garden.",
    longDescription:
      "For active seniors who want autonomy without household stress. 48 studio and 1BHK apartments, restaurant-style dining, and a rich calendar of trips and interest groups.",
    images: [
      img("1522156373667-4c7234bbd804"),
      img("1600585154526-990dced4db0d"),
      img("1586023492125-27b2c045efd7"),
      img("1502672260266-1c1ef2d93688"),
    ],
    careTypes: ["Independent living", "Assisted living"],
    amenities: [
      "Rooftop garden",
          "Fitness centre",
      "Library",
      "Guest suites",
      "Weekend outings",
      "Pet-friendly",
    ],
    medicalCapabilities: [
      "On-call nurse",
      "Emergency response",
      "Medication reminders",
      "Physiotherapy (on request)",
    ],
    staffRatio: "1 : 6 (day) · 1 : 12 (night)",
    licensing: ["Karnataka Private Nursing Home Act (Reg. KA/PNH/2020/0611)"],
    languages: ["English", "Hindi", "Kannada"],
    residentInterests: ["Travel", "Photography", "Bridge", "Book club"],
    schedule: [
      { day: "Mon", activities: ["Zumba gold", "Book club", "Trivia night"] },
      { day: "Tue", activities: ["Photography walk", "Bridge", "Movie"] },
      { day: "Wed", activities: ["Guest lecture", "Rooftop tea", "Concert stream"] },
      { day: "Thu", activities: ["City outing", "Cooking class", "Games"] },
      { day: "Fri", activities: ["Morning walk", "Wine & cheese", "Live band"] },
    ],
    reviews: [
      {
        author: "Kavita Suri",
        rating: 5,
        date: "Feb 2026",
        verifiedStay: true,
        text: "My parents feel independent but supported. The outings program is fantastic.",
      },
      {
        author: "Deepak Bose",
        rating: 4,
        date: "Jan 2026",
        verifiedStay: true,
        text: "Great community for active seniors. Not suited for high medical needs — they are upfront about this.",
      },
      {
        author: "Sunita Prasad",
        rating: 5,
        date: "Dec 2025",
        verifiedStay: true,
        text: "The staff genuinely listen. My mother has made close friends here.",
      },
    ],
  },
  {
    id: "ashraya-nivas",
    name: "Ashraya Nivas",
    neighborhood: "Malleshwaram",
    city: "Bengaluru",
    state: "Karnataka",
    address: "63, 8th Cross, Malleshwaram, Bengaluru 560003",
    priceMin: 22000,
    priceMax: 40000,
    rating: 4.3,
    reviewCount: 58,
    verified: true,
    lastVerified: "December 2025",
    description:
      "An accessible, no-frills home run by a trust — traditional food, temple nearby, warm staff.",
    longDescription:
      "Ashraya Nivas is a trust-run home focused on affordability without compromising on dignity. Twin-sharing and single rooms available. Vegetarian home-cooked meals, morning prayers, and a small in-house clinic.",
    images: [
      img("1560448204-e02f11c3d0e2"),
      img("1502672260266-1c1ef2d93688"),
      img("1600585154340-be6161a56a0c"),
      img("1519974719765-e6559eac2575"),
    ],
    careTypes: ["Assisted living", "Independent living"],
    amenities: [
      "In-house clinic",
      "Vegetarian meals",
      "Prayer room",
      "Outdoor space",
      "Weekly doctor",
    ],
    medicalCapabilities: [
      "Trained caregivers",
      "Medication management",
      "Weekly doctor visits",
      "Emergency response",
    ],
    staffRatio: "1 : 6 (day) · 1 : 12 (night)",
    licensing: ["Karnataka Private Nursing Home Act (Reg. KA/PNH/2011/0089)", "Trust registered"],
    languages: ["Kannada", "Tamil", "Telugu", "Hindi"],
    residentInterests: ["Devotional music", "Reading", "Gardening"],
    schedule: [
      { day: "Mon", activities: ["Morning prayer", "Doctor visit", "Bhajan"] },
      { day: "Tue", activities: ["Chair yoga", "Reading circle", "Cards"] },
      { day: "Wed", activities: ["Cultural program", "Gardening", "Storytime"] },
      { day: "Thu", activities: ["Physio visit", "Music", "Board games"] },
      { day: "Fri", activities: ["Temple visit", "Group meal", "Family calls"] },
    ],
    reviews: [
      {
        author: "Ravi Kumar",
        rating: 4,
        date: "Jan 2026",
        verifiedStay: true,
        text: "Very reasonable rates and the staff are respectful. Facilities are simple but well maintained.",
      },
      {
        author: "Bharathi Kulkarni",
        rating: 5,
        date: "Nov 2025",
        verifiedStay: true,
        text: "My father settled in within a week. The daily prayer time means a lot to him.",
      },
      {
        author: "Prakash Naidu",
        rating: 4,
        date: "Sep 2025",
        verifiedStay: true,
        text: "Honest, dignified place. No fancy amenities but the care is real.",
      },
    ],
  },
  {
    id: "cypress-court",
    name: "Cypress Court",
    neighborhood: "Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    address: "5, 80 Feet Road, Koramangala 4th Block, Bengaluru 560034",
    priceMin: 70000,
    priceMax: 140000,
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    lastVerified: "March 2026",
    description:
      "Premium skilled-nursing residence for complex medical needs, with a 24/7 in-house medical team.",
    longDescription:
      "Cypress Court is a high-acuity residence for seniors with complex medical needs — post-stroke recovery, advanced dementia, Parkinson's, palliative care. Doctor-led team, in-house diagnostics, and a dedicated rehabilitation wing.",
    images: [
      img("1586023492125-27b2c045efd7"),
      img("1580489944761-15a19d654956"),
      img("1522708323590-d24dbb6b0267"),
      img("1584622650111-993a426fbf0a"),
    ],
    careTypes: ["Nursing care", "Memory/dementia care", "Assisted living"],
    amenities: [
      "24/7 nursing",
      "In-house doctor",
      "Rehabilitation wing",
      "Diagnostics on-site",
      "Palliative care",
      "Private rooms",
    ],
    medicalCapabilities: [
      "24/7 doctor-led team",
      "Post-stroke rehabilitation",
      "Advanced dementia care",
      "Palliative care",
      "IV therapy",
      "Wound care",
    ],
    staffRatio: "1 : 2 (day) · 1 : 4 (night)",
    licensing: [
      "Karnataka Private Nursing Home Act (Reg. KA/PNH/2016/0273)",
      "NABH Full Accreditation",
      "JCI Standards Aligned",
    ],
    languages: ["English", "Hindi", "Kannada", "Tamil", "Bengali"],
    residentInterests: ["Classical music", "Guided reading", "Gentle art therapy"],
    schedule: [
      { day: "Mon", activities: ["Physio", "Art therapy", "Music circle"] },
      { day: "Tue", activities: ["Occupational therapy", "Doctor rounds", "Reading"] },
      { day: "Wed", activities: ["Physio", "Family visit hour", "Live music"] },
      { day: "Thu", activities: ["Occupational therapy", "Sensory garden", "Movie"] },
      { day: "Fri", activities: ["Physio", "Cultural performance", "Prayer"] },
    ],
    reviews: [
      {
        author: "Anand Rao",
        rating: 5,
        date: "Feb 2026",
        verifiedStay: true,
        text: "After my mother's stroke, we couldn't manage at home. Cypress gave her rehab, dignity and time. She walks with a cane now.",
      },
      {
        author: "Fatima Sheikh",
        rating: 5,
        date: "Jan 2026",
        verifiedStay: true,
        text: "The doctor-led model makes a real difference. Communication is clear and daily.",
      },
      {
        author: "Joseph Thomas",
        rating: 5,
        date: "Nov 2025",
        verifiedStay: true,
        text: "Expensive, yes — but this is skilled nursing at hospital quality without the hospital feel.",
      },
    ],
  },
];

// ============================================================
// Pan-India expansion — additional sample facilities by state
// ============================================================

export const INDIAN_STATES = [
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Delhi/NCR",
  "West Bengal",
  "Kerala",
  "Gujarat",
  "Telangana",
  "Punjab",
  "Uttar Pradesh",
] as const;

const POOL = [
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

type ExtraSpec = {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  state: string;
  pin: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  careTypes: string[];
  languages: string[];
  tier: FacilityTier;
  cuisine: string[];
  dietary: string[];
  hospital: string;
  blurb: string;
  featured?: boolean;
};

const EXTRA_SPECS: ExtraSpec[] = [
  { id: "seaview-seniors-mumbai", name: "Seaview Seniors Residency", neighborhood: "Andheri West", city: "Mumbai", state: "Maharashtra", pin: "400053", priceMin: 65000, priceMax: 120000, rating: 4.6, reviewCount: 91, careTypes: ["Assisted living", "Independent living"], languages: ["English", "Hindi", "Marathi", "Gujarati"], tier: "Premium/Medical care", cuisine: ["Maharashtrian", "North Indian", "Jain"], dietary: ["Jain", "Vegetarian (general)", "Non-Vegetarian available"], hospital: "Kokilaben Dhirubhai Ambani Hospital — 10 min", blurb: "A bright sea-facing residence in Andheri with balconies, a physio gym and a busy cultural calendar.", featured: true },
  { id: "sahyadri-nivas-pune", name: "Sahyadri Nivas", neighborhood: "Kothrud", city: "Pune", state: "Maharashtra", pin: "411038", priceMin: 30000, priceMax: 58000, rating: 4.4, reviewCount: 63, careTypes: ["Assisted living", "Independent living"], languages: ["Marathi", "Hindi", "English"], tier: "Budget/Private", cuisine: ["Maharashtrian", "Home-style vegetarian"], dietary: ["Vegetarian (general)", "Brahmin"], hospital: "Deenanath Mangeshkar Hospital — 12 min", blurb: "A calm, tree-lined 24-resident home in Kothrud known for its home-style Maharashtrian kitchen." },
  { id: "marina-manor-chennai", name: "Marina Manor", neighborhood: "Adyar", city: "Chennai", state: "Tamil Nadu", pin: "600020", priceMin: 42000, priceMax: 78000, rating: 4.7, reviewCount: 104, careTypes: ["Assisted living", "Memory/dementia care"], languages: ["Tamil", "English", "Telugu"], tier: "Mid-range assisted living", cuisine: ["South Indian", "Chettinad", "Diabetic-friendly"], dietary: ["Brahmin", "Vegetarian (general)", "Non-Vegetarian available"], hospital: "Apollo Greams Road — 18 min", blurb: "A well-run Adyar home with a dedicated memory wing and daily Carnatic music sessions.", featured: true },
  { id: "kongu-care-coimbatore", name: "Kongu Care Home", neighborhood: "RS Puram", city: "Coimbatore", state: "Tamil Nadu", pin: "641002", priceMin: 20000, priceMax: 38000, rating: 4.2, reviewCount: 47, careTypes: ["Assisted living", "Independent living"], languages: ["Tamil", "English"], tier: "NGO/Free care", cuisine: ["South Indian vegetarian"], dietary: ["Vegetarian (general)", "Brahmin"], hospital: "PSG Hospitals — 15 min", blurb: "A trust-run, no-frills home in RS Puram offering dignified care at near-zero cost." },
  { id: "arya-vihar-delhi", name: "Arya Vihar Senior Living", neighborhood: "Vasant Kunj", city: "New Delhi", state: "Delhi/NCR", pin: "110070", priceMin: 55000, priceMax: 105000, rating: 4.5, reviewCount: 88, careTypes: ["Assisted living", "Nursing care"], languages: ["Hindi", "English", "Punjabi"], tier: "Premium/Medical care", cuisine: ["North Indian", "Continental", "Low-sodium"], dietary: ["Vegetarian (general)", "Non-Vegetarian available", "Jain"], hospital: "Fortis Vasant Kunj — 7 min", blurb: "A purpose-built Delhi residence with in-house diagnostics and a winter-garden atrium." },
  { id: "aravali-elders-gurugram", name: "Aravali Elders Home", neighborhood: "Sector 56", city: "Gurugram", state: "Delhi/NCR", pin: "122011", priceMin: 38000, priceMax: 70000, rating: 4.3, reviewCount: 55, careTypes: ["Assisted living", "Independent living"], languages: ["Hindi", "English"], tier: "Mid-range assisted living", cuisine: ["North Indian", "Jain options"], dietary: ["Jain", "Vegetarian (general)"], hospital: "Medanta Medicity — 20 min", blurb: "Apartment-style independent living beside the Aravali greens, with on-call nursing." },
  { id: "tagore-house-kolkata", name: "Tagore House", neighborhood: "Salt Lake", city: "Kolkata", state: "West Bengal", pin: "700091", priceMin: 26000, priceMax: 52000, rating: 4.4, reviewCount: 72, careTypes: ["Assisted living", "Independent living"], languages: ["Bengali", "Hindi", "English"], tier: "Budget/Private", cuisine: ["Bengali", "Home-style"], dietary: ["Vegetarian (general)", "Non-Vegetarian available"], hospital: "AMRI Salt Lake — 9 min", blurb: "A literary, adda-loving home in Salt Lake with evening recitations and Bengali home cooking." },
  { id: "ballygunge-care-kolkata", name: "Ballygunge Care Residency", neighborhood: "Ballygunge", city: "Kolkata", state: "West Bengal", pin: "700019", priceMin: 48000, priceMax: 88000, rating: 4.6, reviewCount: 66, careTypes: ["Nursing care", "Memory/dementia care", "Assisted living"], languages: ["Bengali", "English", "Hindi"], tier: "Premium/Medical care", cuisine: ["Bengali", "Continental", "Renal diet"], dietary: ["Non-Vegetarian available", "Christian", "Vegetarian (general)"], hospital: "Belle Vue Clinic — 8 min", blurb: "A heritage-building residence in Ballygunge with 24/7 nursing and palliative support." },
  { id: "backwater-haven-kochi", name: "Backwater Haven", neighborhood: "Kakkanad", city: "Kochi", state: "Kerala", pin: "682030", priceMin: 35000, priceMax: 66000, rating: 4.7, reviewCount: 79, careTypes: ["Assisted living", "Independent living"], languages: ["Malayalam", "English", "Tamil"], tier: "Mid-range assisted living", cuisine: ["Kerala", "South Indian", "Diabetic-friendly"], dietary: ["Christian", "Vegetarian (general)", "Non-Vegetarian available"], hospital: "Rajagiri Hospital — 10 min", blurb: "A waterside Kochi home with ayurvedic therapy, big verandahs and NRI family video calls.", featured: true },
  { id: "kowdiar-grace-tvm", name: "Kowdiar Grace Home", neighborhood: "Kowdiar", city: "Thiruvananthapuram", state: "Kerala", pin: "695003", priceMin: 22000, priceMax: 44000, rating: 4.3, reviewCount: 41, careTypes: ["Assisted living", "Independent living"], languages: ["Malayalam", "English"], tier: "NGO/Free care", cuisine: ["Kerala vegetarian"], dietary: ["Christian", "Vegetarian (general)"], hospital: "KIMS Thiruvananthapuram — 12 min", blurb: "A church-supported home in Kowdiar with a chapel, garden and gentle daily rhythm." },
  { id: "sabarmati-seniors-ahmedabad", name: "Sabarmati Seniors", neighborhood: "Satellite", city: "Ahmedabad", state: "Gujarat", pin: "380015", priceMin: 28000, priceMax: 56000, rating: 4.4, reviewCount: 58, careTypes: ["Assisted living", "Independent living"], languages: ["Gujarati", "Hindi", "English"], tier: "Budget/Private", cuisine: ["Gujarati", "Jain", "Satvik"], dietary: ["Jain", "Vegetarian (general)", "Brahmin"], hospital: "Sterling Hospital — 11 min", blurb: "A fully vegetarian, Jain-friendly home in Satellite with satsang evenings and a walking track." },
  { id: "vesu-vatsalya-surat", name: "Vesu Vatsalya Home", neighborhood: "Vesu", city: "Surat", state: "Gujarat", pin: "395007", priceMin: 24000, priceMax: 46000, rating: 4.1, reviewCount: 36, careTypes: ["Assisted living"], languages: ["Gujarati", "Hindi"], tier: "Budget/Private", cuisine: ["Gujarati", "Jain"], dietary: ["Jain", "Vegetarian (general)"], hospital: "Kiran Multi Super Speciality — 14 min", blurb: "A small family-run home in Vesu with 18 residents and a strictly satvik kitchen." },
  { id: "charminar-comforts-hyd", name: "Charminar Comforts", neighborhood: "Banjara Hills", city: "Hyderabad", state: "Telangana", pin: "500034", priceMin: 46000, priceMax: 90000, rating: 4.6, reviewCount: 83, careTypes: ["Assisted living", "Nursing care"], languages: ["Telugu", "Urdu", "Hindi", "English"], tier: "Premium/Medical care", cuisine: ["Hyderabadi", "North Indian", "Halal"], dietary: ["Muslim", "Non-Vegetarian available", "Vegetarian (general)"], hospital: "Apollo Jubilee Hills — 8 min", blurb: "A Banjara Hills residence with halal kitchen, 24/7 nursing and a landscaped courtyard." },
  { id: "gachibowli-grove-hyd", name: "Gachibowli Grove", neighborhood: "Gachibowli", city: "Hyderabad", state: "Telangana", pin: "500032", priceMin: 33000, priceMax: 62000, rating: 4.3, reviewCount: 49, careTypes: ["Independent living", "Assisted living"], languages: ["Telugu", "English", "Hindi"], tier: "Mid-range assisted living", cuisine: ["South Indian", "North Indian"], dietary: ["Vegetarian (general)", "Non-Vegetarian available"], hospital: "Continental Hospitals — 9 min", blurb: "Studio apartments for active seniors near the IT corridor, with shuttle outings twice a week." },
  { id: "sarabha-sadan-ludhiana", name: "Sarabha Sadan", neighborhood: "Sarabha Nagar", city: "Ludhiana", state: "Punjab", pin: "141001", priceMin: 25000, priceMax: 48000, rating: 4.2, reviewCount: 39, careTypes: ["Assisted living", "Independent living"], languages: ["Punjabi", "Hindi", "English"], tier: "Budget/Private", cuisine: ["Punjabi", "Home-style vegetarian"], dietary: ["Vegetarian (general)", "Non-Vegetarian available"], hospital: "DMC&H Ludhiana — 13 min", blurb: "A warm Punjabi home with langar-style shared meals and a large sunny lawn." },
  { id: "ranjit-retreat-amritsar", name: "Ranjit Retreat", neighborhood: "Ranjit Avenue", city: "Amritsar", state: "Punjab", pin: "143001", priceMin: 18000, priceMax: 36000, rating: 4.0, reviewCount: 28, careTypes: ["Assisted living"], languages: ["Punjabi", "Hindi"], tier: "NGO/Free care", cuisine: ["Punjabi vegetarian"], dietary: ["Vegetarian (general)"], hospital: "Fortis Escorts Amritsar — 16 min", blurb: "A gurdwara-supported home near Ranjit Avenue offering free and subsidised places." },
  { id: "gomti-gardens-lucknow", name: "Gomti Gardens", neighborhood: "Gomti Nagar", city: "Lucknow", state: "Uttar Pradesh", pin: "226010", priceMin: 27000, priceMax: 54000, rating: 4.4, reviewCount: 52, careTypes: ["Assisted living", "Memory/dementia care"], languages: ["Hindi", "Urdu", "English"], tier: "Mid-range assisted living", cuisine: ["Awadhi", "North Indian", "Halal"], dietary: ["Muslim", "Vegetarian (general)", "Non-Vegetarian available"], hospital: "Medanta Lucknow — 10 min", blurb: "A gracious Gomti Nagar home with a memory-care annexe and famous Awadhi kitchen." },
  { id: "noida-nirvana-up", name: "Noida Nirvana Care", neighborhood: "Sector 62", city: "Noida", state: "Uttar Pradesh", pin: "201309", priceMin: 40000, priceMax: 76000, rating: 4.5, reviewCount: 61, careTypes: ["Nursing care", "Assisted living"], languages: ["Hindi", "English"], tier: "Premium/Medical care", cuisine: ["North Indian", "Diabetic-friendly", "Low-sodium"], dietary: ["Vegetarian (general)", "Non-Vegetarian available"], hospital: "Jaypee Hospital — 15 min", blurb: "A clinical-grade Noida residence built for post-hospital recovery and long-term nursing." },
];

function buildExtra(sp: ExtraSpec, idx: number): Facility {
  const pick = (n: number) => img(POOL[(idx * 3 + n) % POOL.length]);
  const memory = sp.careTypes.some((c) => /memory/i.test(c));
  const nursing = sp.careTypes.some((c) => /nursing/i.test(c));
  return {
    id: sp.id,
    name: sp.name,
    neighborhood: sp.neighborhood,
    city: sp.city,
    state: sp.state,
    address: `${sp.neighborhood}, ${sp.city}, ${sp.state} ${sp.pin}`,
    priceMin: sp.priceMin,
    priceMax: sp.priceMax,
    rating: sp.rating,
    reviewCount: sp.reviewCount,
    verified: true,
    lastVerified: "March 2026",
    featured: sp.featured,
    description: sp.blurb,
    longDescription: `${sp.blurb} ${sp.name} has been serving families in ${sp.city} for over a decade, with trained caregivers, a resident doctor tie-up at ${sp.hospital.split(" — ")[0]}, and meals cooked fresh on-site. Families are welcome any day of the week.`,
    images: [pick(0), pick(1), pick(2), pick(3), pick(4)],
    careTypes: sp.careTypes,
    amenities: [
      "Outdoor space",
      "24/7 nursing",
      "Housekeeping daily",
      "Library",
      ...(memory ? ["Memory care wing"] : []),
      ...(nursing ? ["In-house clinic"] : ["Cultural programs"]),
    ],
    medicalCapabilities: [
      "On-site nursing",
      "Medication management",
      "Emergency response",
      ...(memory ? ["Dementia care wing"] : []),
      ...(nursing ? ["Post-operative care", "Physical therapy"] : ["Weekly doctor visits"]),
    ],
    staffRatio: nursing ? "1 : 3 (day) · 1 : 6 (night)" : "1 : 5 (day) · 1 : 10 (night)",
    licensing: [`${sp.state} Elder Care Registration (Reg. ${sp.state.slice(0, 2).toUpperCase()}/ECR/2021/${1000 + idx})`],
    languages: sp.languages,
    residentInterests: ["Music", "Reading", "Gardening", "Board games"],
    schedule: [
      { day: "Mon", activities: ["Morning walk", "Physiotherapy", "Music circle"] },
      { day: "Tue", activities: ["Chair yoga", "Art class", "Movie evening"] },
      { day: "Wed", activities: ["Doctor's round", "Board games", "Devotional hour"] },
      { day: "Thu", activities: ["Group walk", "Cooking demo", "Book club"] },
      { day: "Fri", activities: ["Storytelling", "Physiotherapy", "Cultural evening"] },
      { day: "Sat", activities: ["Family visiting hours", "Outing", "Antakshari"] },
      { day: "Sun", activities: ["Prayer / quiet morning", "Special lunch", "Film screening"] },
    ],
    reviews: [
      { author: "Verified family", rating: Math.min(5, Math.round(sp.rating)), date: "Feb 2026", verifiedStay: true, text: `We moved my mother to ${sp.name} last year. The staff are patient, the rooms are clean, and communication with the family has been excellent.` },
      { author: "Verified family", rating: 4, date: "Dec 2025", verifiedStay: true, text: `Good value for ${sp.city}. Food is genuinely home-style and the nursing team responds quickly at night.` },
    ],
  };
}

const EXTRA_FACILITIES: Facility[] = EXTRA_SPECS.map(buildExtra);

export const facilities: Facility[] = [...coreFacilities, ...EXTRA_FACILITIES];

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

export const NEIGHBORHOODS = Array.from(
  new Set(facilities.map((f) => f.neighborhood)),
).sort();

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
  { name: "Assisted Living", definition: "Help with daily activities (bathing, dressing, meals) while maintaining independence." },
  { name: "Nursing Care", definition: "24/7 medical nursing for chronic conditions and post-hospital recovery." },
  { name: "Dementia Care", definition: "Specialised memory care with secure environment and trained staff." },
  { name: "Palliative Care", definition: "Comfort-focused care for terminal illness, emphasising quality of life." },
  { name: "Respite / Short-stay", definition: "Temporary stays (days to weeks) to support family caregivers." },
  { name: "Independent Living", definition: "Community living with light housekeeping and social programmes." },
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
    conditionCare: ["Post-surgery recovery", "Chronic illness (diabetes, hypertension)", "Dementia/Alzheimer's"],
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
    emergencyPlan: { ...commonEmergency, partnerHospital: "Fortis Whitefield (partner, priority admission)" },
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
      extras: [
        { name: "Voluntary contribution", cost: "As you're able" },
      ],
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
    emergencyPlan: { ...commonEmergency, partnerHospital: "Victoria Hospital (govt. tie-up)", ambulance: "108 ambulance response" },
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
for (const sp of EXTRA_SPECS) {
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
      deposit: sp.tier === "NGO/Free care" ? "None" : `₹${(Math.round(sp.priceMin / 10000) * 10000).toLocaleString("en-IN")} refundable`,
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
    trialStay: { available: sp.tier !== "NGO/Free care", nights: 3, price: Math.round(sp.priceMin / 8) },
    petFriendly: sp.reviewCount % 2 === 0,
    distantFamilySupport: "Weekly video check-ins for families living away",
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
  facilityId: "willowbrook-gardens",
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
  "silverpine-residences": ["Vegetarian (general)", "Non-Vegetarian available", "Christian", "Muslim"],
  "banyan-house": ["Brahmin", "Vegetarian (general)", "Jain"],
  "meadowlark-manor": ["Vegetarian (general)", "Non-Vegetarian available", "Christian"],
  "tulsi-nivas": ["Brahmin", "Jain", "Vegetarian (general)"],
  "cypress-court": ["Vegetarian (general)", "Non-Vegetarian available", "Muslim", "Christian"],
};

for (const sp of EXTRA_SPECS) {
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
  { id: "Q-101", facility: "Nandi Serene Care", tier: "Budget/Private", submitted: "2 days ago", documents: "3 of 4 uploaded", kind: "registration" },
  { id: "Q-102", facility: "Ashwini Elder Residency", tier: "Mid-range assisted living", submitted: "4 days ago", documents: "4 of 4 uploaded", kind: "registration" },
  { id: "Q-103", facility: "Hope Haven Trust", tier: "NGO/Free care", submitted: "1 week ago", documents: "2 of 4 uploaded", kind: "registration" },
  { id: "Q-201", facility: "Shanti Nilaya Senior Home", tier: "Budget/Private", submitted: "1 day ago", documents: "Ownership proof uploaded", kind: "claim", claimant: "Ramesh Gowda (Owner)" },
  { id: "Q-202", facility: "Sunshine Elders Care", tier: "NGO/Free care", submitted: "3 days ago", documents: "Trust deed pending", kind: "claim", claimant: "Sr. Mary Joseph (Administrator)" },
];

export type PlatformFacilityRow = {
  id: string;
  name: string;
  neighborhood: string;
  tier: string;
  claimed: boolean;
  verified: boolean;
  active: boolean;
  views: number;
  leads: number;
  shortlists: number;
};

export const FOUNDER_FACILITIES: PlatformFacilityRow[] = [
  ...facilities.map<PlatformFacilityRow>((f, i) => ({
    id: f.id,
    name: f.name,
    neighborhood: f.neighborhood,
    tier: FACILITY_ENRICHMENT[f.id]?.tier ?? "Mid-range assisted living",
    claimed: true,
    verified: f.verified,
    active: true,
    views: 1284 - i * 137,
    leads: 38 - i * 4,
    shortlists: 92 - i * 9,
  })),
  ...UNCLAIMED_LISTINGS.map<PlatformFacilityRow>((l, i) => ({
    id: l.id,
    name: l.name,
    neighborhood: l.neighborhood,
    tier: l.tier,
    claimed: false,
    verified: false,
    active: true,
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
  { id: "U-2041", name: "Priya Sharma", email: "priya.s@gmail.com", signupDate: "12 Mar 2026", enquiries: 4, shortlists: 7 },
  { id: "U-2038", name: "Arun Menon", email: "arun.menon@outlook.com", signupDate: "09 Mar 2026", enquiries: 2, shortlists: 3 },
  { id: "U-2030", name: "Fatima Sheikh", email: "fatima.sk@gmail.com", signupDate: "27 Feb 2026", enquiries: 6, shortlists: 11 },
  { id: "U-2025", name: "Joseph Thomas", email: "j.thomas@yahoo.in", signupDate: "21 Feb 2026", enquiries: 1, shortlists: 2 },
  { id: "U-2019", name: "Lakshmi Gowda", email: "lakshmi.g@gmail.com", signupDate: "14 Feb 2026", enquiries: 3, shortlists: 5 },
  { id: "U-2011", name: "Vikram Shetty", email: "vikram.shetty@gmail.com", signupDate: "02 Feb 2026", enquiries: 5, shortlists: 9 },
  { id: "U-2004", name: "Anitha Rao", email: "anitha.rao@rediffmail.com", signupDate: "19 Jan 2026", enquiries: 2, shortlists: 4 },
  { id: "U-1998", name: "Ganesh Bhat", email: "ganesh.bhat@gmail.com", signupDate: "05 Jan 2026", enquiries: 0, shortlists: 1 },
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
