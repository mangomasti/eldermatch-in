export type Facility = {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
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

export const facilities: Facility[] = [
  {
    id: "willowbrook-gardens",
    name: "Willowbrook Gardens",
    neighborhood: "Indiranagar",
    city: "Bengaluru",
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
      "Restaurant-style dining",
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
  "Restaurant-style dining",
  "Fitness centre",
  "Library",
];

export const NEIGHBORHOODS = [
  "Indiranagar",
  "Whitefield",
  "Jayanagar",
  "HSR Layout",
  "Malleshwaram",
  "Koramangala",
];

export const LANGUAGES = ["English", "Hindi", "Kannada", "Tamil", "Telugu", "Malayalam", "Bengali"];

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function getFacility(id: string) {
  return facilities.find((f) => f.id === id);
}
