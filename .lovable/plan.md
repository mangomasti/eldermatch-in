## Overview

Add a mock user profile stored in `localStorage` alongside existing prefs/shortlist. Profile is accessed via a header avatar and rendered on a dedicated `/profile` route with four sections. Care preferences reuse the existing questionnaire data — no duplication.

## 1. Data layer

Extend `src/lib/prefs.ts` with a new `useProfile` hook mirroring `usePreferences`:

- Storage key: `eldermatch.profile` (new; `kinstead.*` keys stay untouched so existing saved prefs/shortlist survive).
- Type `Profile` with:
  - `basic`: `{ name, email, phone, relationship }` where relationship is a union of the six dropdown values.
  - `recipient`: `{ name, notReadyToShareName: boolean, age, livingSituation, urgency }`.
- Returns `{ profile, save, hydrated }`. `save` merges partial updates.

No changes to the existing `usePreferences` / `useShortlist` hooks or their storage keys.

## 2. Header avatar (access point)

Update `src/components/site-chrome.tsx`:

- Add a `ProfileAvatar` button rendered inside `SiteHeader`, right-aligned next to the existing nav actions on desktop and inside the mobile menu on small screens.
- Circular button: shows the user's initials if `profile?.basic.name` is set, otherwise a `User` lucide icon. Uses `bg-primary/10 text-primary`, `ring-1 ring-border`, and a hover state.
- Wraps `<Link to="/profile">` with `aria-label="My profile"`. No dropdown — click navigates to the page.
- Suppress rendering until `useProfile().hydrated` to avoid SSR mismatch (returns a neutral placeholder circle so header layout doesn't shift).

## 3. `/profile` route

New file `src/routes/profile.tsx` with:

- `head()` metadata: title "My profile — ElderMatch", matching description + og:title/og:description; no og:image.
- Wrapped in `SiteHeader` + `SiteFooter`.
- Page hero: name + relationship subline + "Edit basic info" button.
- Four cards in a single-column layout on mobile, two-column on `md+`:

### A) Basic Info card

Inline form (always editable, autosaves on blur via `save`) with fields: Name, Email (type=email), Phone (type=tel), Relationship (native `<select>` with the six options). Uses the same `inputCls` styling pattern already used in `facility.$id.tsx`. Small "Saved" toast on blur when a field changes.

### B) Care Recipient Details card

Same inline-edit pattern:

- Name text input + a checkbox "Not ready to share yet" that disables the name field and stores `notReadyToShareName: true`.
- Age (number input, 40–110 range).
- Current living situation `<select>`: Living alone / Living with family / Currently in a facility / Currently hospitalized.
- Urgency `<select>`: Just researching / Planning within a few months / Need placement urgently. When "urgent" is chosen, show a subtle amber note "We'll prioritise homes with immediate availability."

### C) Care Preferences card (reuses questionnaire)

Read-only summary sourced from `usePreferences()`:

- If `prefs` is null: empty state with a "Build your preferences" button that opens the existing floating-CTA slide-in panel (see integration note below), or falls back to a link to `/questionnaire`.
- If `prefs` exists: render care needs as chips, budget as "Up to ₹X,XXX/mo", location, priorities (ordered chips 1/2/3), and language. A single "Update preferences" button opens the same slide-in panel.

Integration: extract the panel-opening state from `src/components/floating-profile-cta.tsx` into a tiny context (`PreferenceDrawerProvider` in `src/components/preference-drawer.tsx`) so both the floating CTA and the profile card can trigger it. The provider owns `open` state and renders the drawer once at the root. `FloatingProfileCta` becomes just the fixed button that calls `openDrawer()`. Fallback if this refactor is out of scope: the profile buttons simply `navigate({ to: "/questionnaire" })`.

### D) Saved/Shortlisted Facilities card

- Uses `useShortlist()` to read saved facility ids and `facilities` from `src/lib/mock-data.ts` to resolve them.
- Renders a compact list (thumbnail, name, neighbourhood, price range, rating, "View" link → `/facility/$id`, and a "Remove" button that calls `toggle(id)`).
- Empty state: "No saved homes yet — browse and tap the heart to shortlist." with a link to `/search`.

## 4. Floating CTA on the profile page

The existing `FloatingProfileCta` should stay hidden on `/profile` (redundant there). Add `/profile` to the pathname exclusion list in `src/components/floating-profile-cta.tsx`.

## Out of scope

- No real auth, no backend, no avatar upload.
- No editing questionnaire answers directly from card C (users use the shared questionnaire flow to change them).
- No changes to mock data or facility pages beyond the new "Remove from shortlist" reuse of the existing hook.
