# Senior Haven

build this as a responsive website, not a mobile app.
Build a static/frontend-only website (no backend, no auth, no database — use mock/sample data hardcoded in the app) for a local senior care matching platform called [YOUR APP NAME]. It connects families/caregivers and elderly individuals with old age homes/assisted living facilities in their city. Style: clean, modern SaaS/marketplace look, similar to Airbnb — lots of whitespace, card-based layouts, soft shadows, rounded corners, high-quality placeholder images, friendly but professional typography.

USER FLOW:

1. LANDING/ROLE SELECT SCREEN (first thing shown, before homepage)

   - Simple centered screen: "Who are you?" with two large clickable cards/buttons:

     a) "I'm looking for a care facility" (customer)

     b) "I'm an old age home / facility admin"

   - If user selects (a): show the optional Preference Questionnaire modal/screen next (see below), with a visible "Skip for now" button. After skip or submit, go to Homepage.

   - If user selects (b): navigate directly to the Facility Registration Form page (mock form, no real submission — show a success toast/message on submit like "Thanks! Our team will review and contact you.")

2. PREFERENCE QUESTIONNAIRE (optional, shown after selecting "customer", and also accessible later via a "Get personalized recommendations" button on the Homepage and Search Results page)

   - Short, friendly multi-step or single-page form:

     - Who is this search for? (Myself / A parent or family member / Someone else)

     - Care needs (multi-select): Mobility assistance, Memory/dementia care, Medication management, Physical therapy, General assisted living, Independent living

     - Budget range (slider or dropdown, monthly)

     - Preferred location/city area

     - Priorities (rank or select top 2-3): Healthcare quality, Social activities, Price, Location convenience, Food quality

     - Language preference (dropdown)

   - Clear "Skip" option at every step

   - On submit, show a "Recommended for you" section/tag applied on the Search Results page (can be mocked — just visually highlight 1-2 facilities as "Recommended based on your preferences")

3. HOMEPAGE

   - Hero section with headline (e.g. "Find the right care home for your loved one") + subheadline

   - Prominent search bar (location input + "Search" button)

   - Below search bar: filter chips/preview (Care type, Budget, Location)

   - "Get personalized recommendations" button/banner linking to the questionnaire

   - Section showcasing 3-4 featured/verified facilities (cards with photo, name, location, price range, star rating, "Verified" badge)

   - Trust section: short blurb + icons about "Verified reviews," "Licensed & accredited," "Real photos & videos" — links to About/Trust page

   - Simple footer

4. SEARCH RESULTS / LISTING PAGE

   - Left sidebar (or top bar on mobile) with FILTERS:

     - Location/radius

     - Budget range (slider)

     - Care type (checkboxes: Assisted living, Memory/dementia care, Nursing care, Independent living)

     - Amenities (checkboxes: Outdoor space, Physical therapy on-site, 24/7 nursing, Pet-friendly, etc.)

     - Minimum rating

     - "Verified only" toggle

   - Main area: grid/list of facility cards (photo, name, location, price/month, star rating + review count, verified badge, 1-line description, "View Profile" button)

   - "Recommended for you" tag/highlight on 1-2 cards if questionnaire was completed

   - "Get personalized recommendations" button accessible from this page too

5. FACILITY PROFILE / DETAIL PAGE

   - Photo/video gallery at top (use placeholder images, label one as "Verified recent photos")

   - Facility name, location, verified badge with "Last verified: [date]"

   - Pricing breakdown (base cost + what's extra)

   - Full amenities list

   - Staff-to-resident ratio

   - Medical capabilities (dementia care, physical therapy, on-site nursing, emergency response — as tags/icons)

   - Licensing/accreditation info displayed

   - Activity calendar preview (sample weekly schedule)

   - Resident interest tags (e.g. "Residents enjoy: gardening, music, cards")

   - Languages spoken by staff/residents

   - Reviews section: 3-4 mock reviews with star ratings, reviewer verification badge ("Verified stay"), review text

   - Sticky "Contact this facility" button/panel (opens Contact/Enquiry form)

   - "Save to shortlist" button (can just be a visual toggle, no persistence needed)

6. CONTACT / ENQUIRY FORM (can be a modal or dedicated page, triggered from facility profile)

   - Fields: Name, Phone, Email, Message, "Preferred contact method" (Call / WhatsApp / Email)

   - On submit: show success message ("Thanks! [Facility name] will contact you shortly.") — no real backend needed

7. FACILITY SELF-REGISTRATION FORM (also used as the "admin" mock landing)

   - Fields: Facility name, Location/address, Contact person, Phone, Email, Care types offered (checkboxes), Pricing range, Brief description, "Upload photos" (can be a non-functional file upload UI), "Upload license/accreditation documents" (non-functional upload UI)

   - On submit: success message like "Thanks! Our verification team will review your submission and contact you within 3-5 business days."

8. ABOUT / TRUST PAGE

   - Explains how verification works: facility license checks, on-site audits, verified review process (reviews only from confirmed stays), photo/video authenticity checks, re-verification cadence

   - Simple, reassuring tone — this is the platform's key differentiator, make it feel credible

MOCK DATA:

Create 5-6 sample facilities with realistic-sounding names, varied locations (same city, different neighborhoods), price ranges, care types, ratings (4.2-4.9 stars), amenities, and 2-3 mock reviews each with reviewer names and verified-stay badges. Use diverse, warm placeholder images (search terms like "senior living facility," "elderly care home," "nursing home interior" for image placeholders).

GENERAL NOTES:

- Fully responsive, mobile-first

- Use a warm but professional color palette (avoid cold clinical blues only — consider warm neutrals with one trustworthy accent color like teal or deep green)

- Large, readable font sizes throughout (this audience includes older users and stressed caregivers)

- No authentication/login needed for v1 — this is a UI/UX demo with mock data and mock form submissions

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://eldermatchindia.vercel.app/search

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b0fa879-ecd0-4e4f-adcf-a8c218f7aa93).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
