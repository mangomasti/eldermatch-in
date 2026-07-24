## Overview

Three coordinated additions to ElderMatch: a mock Facility Admin Dashboard, an expanded Preference Questionnaire, and richer Facility registration + public profile fields (with anonymized reviews).

---

## Part 1 — Facility Admin Dashboard

**New routes** (layout + tabs):
- `src/routes/dashboard.tsx` — sidebar layout with `<Outlet />`, shell chrome
- `src/routes/dashboard.index.tsx` — Overview
- `src/routes/dashboard.profile.tsx` — Manage Profile
- `src/routes/dashboard.verification.tsx` — Verification checklist
- `src/routes/dashboard.leads.tsx` — Enquiries with status dropdown
- `src/routes/dashboard.reviews.tsx` — Anonymous reviews + respond
- `src/routes/dashboard.analytics.tsx` — Mock bar chart + percentile stat

**Access:**
- After submitting `register-facility.tsx`, redirect to `/dashboard` (replace success screen's primary CTA / navigate on submit)
- Add "Facility Login" link in `SiteFooter`

**Mock data:** extend `src/lib/mock-data.ts` with `MOCK_DASHBOARD` (facility identity, stats, leads, reviews, verification state, weekly views array).

**Design:** dense card grid, muted sidebar, same tokens. Profile views & Leads generated are the largest hero stats.

---

## Part 2 — Expanded Questionnaire

Edit `src/components/questionnaire-form.tsx` to add 7 new steps (all skippable): condition, mobility, environment, timeline, room preference, pets, distant family.

Extend `Preferences` in `src/lib/prefs.ts` with new fields + defaults.

Remove `urgency` from `Profile.recipient` in `prefs.ts` and from `src/routes/profile.tsx` recipient card; timeline lives in Preferences now.

Update `src/routes/profile.tsx` Care Preferences card to display the new fields.

Add lightweight "Recommended for you" tag on `src/routes/search.tsx` facility cards when preferences match (illustrative — e.g. show tag if condition/mobility aligns with facility's care capabilities).

---

## Part 3 — Registration + Public Profile

**Registration (`src/routes/register-facility.tsx`):** add fields — tier dropdown, standardized care checkboxes with tooltip definitions, itemized costs (single/double/shared + extras + deposit), condition-specific multi-select, staff experience, hospital tie-up, distances (airport/hospital), cuisine, emergency plan (on-call doctor / ambulance / partner hospital). On submit → `navigate({ to: "/dashboard" })`.

**Mock data (`src/lib/mock-data.ts`):** extend each facility with tier, itemized costs, condition capabilities, staff experience, hospital tie-up, distances, cuisine, emergency plan, priceHistory, lastVerified, lastUpdated. Strip reviewer names → replace with `verifiedStay: true`.

**Public profile (`src/routes/facility.$id.tsx`):**
- Tier badge near top; last verified / last updated prominent
- Itemized cost table (included vs. billed separately)
- Condition-specific care tags
- Hospital tie-up section
- Staff credential callout
- Distances shown with location
- Cuisine field
- Emergency Preparedness section
- Price history mini-timeline
- "Request a Trial Stay" button beside contact CTA
- Reviews render anonymously with "Verified Stay" badge

---

## Technical notes

- All new routes use `createFileRoute` with `head()` metadata.
- Dashboard sidebar uses existing shadcn sidebar primitives.
- Analytics chart: simple CSS bar chart (no chart lib needed).
- Tooltips for care-type definitions: shadcn `Tooltip`.
- No backend — leads/reviews/stats are hardcoded mock state; edits are local component state with toast confirmations.
- Preferences additions are backward-compatible via optional fields + defaults.

