## 1. Rename Kinstead → ElderMatch

Global find/replace of the brand name in user-facing copy only. Keep the `kinstead.*` localStorage keys unchanged to avoid wiping saved prefs.

Files with visible "Kinstead" strings to update:
- `src/components/logo.tsx` — wordmark text
- `src/components/site-chrome.tsx` — footer tagline + copyright
- `src/routes/__root.tsx` — default title/OG
- `src/routes/index.tsx`, `home.tsx`, `about.tsx`, `search.tsx`, `facility.$id.tsx`, `questionnaire.tsx`, `register-facility.tsx` — any `title`/`og:*`/description meta and body copy mentioning Kinstead
- `public/robots.txt`, `README` files if they reference the name in copy

No changes to storage keys, mock data IDs, or routes.

## 2. Global floating "Build Your Profile" CTA

New component `src/components/floating-profile-cta.tsx`:
- Fixed position: `right-4 md:right-6`, vertically centered (`top-1/2 -translate-y-1/2`), `z-40`.
- Pill button, primary color, soft shadow, rounded-full, icon (`ClipboardCheck` from lucide) + label.
- Label logic via `usePreferences()`:
  - `prefs == null` → "Build Your Profile"
  - `prefs` exists → "Update Your Preferences"
  - While `!hydrated`, render nothing (avoid SSR/hydration mismatch since prefs live in localStorage).
- Hover: subtle scale + shadow lift transition.
- Click opens a right-side slide-in panel (built in-component using a fixed overlay + translate-x panel, no new deps) containing the existing questionnaire flow.

### Reusing the questionnaire

The current `/questionnaire` route owns the multi-step form. To avoid duplicating logic:
- Extract the form body from `src/routes/questionnaire.tsx` into `src/components/questionnaire-form.tsx` (pure component, accepts an optional `onComplete` callback).
- The route re-renders the extracted form inside its existing page layout, navigating to `/search` on completion (unchanged behavior).
- The floating CTA panel renders the same component; on completion it closes the panel and navigates to `/search`.

### Hiding on the questionnaire page

Suppress the floating button on `/questionnaire` (redundant there) using `useRouterState({ select: s => s.location.pathname })`.

### Avoiding overlap with facility contact panel

On `/facility/$id` there is a sticky "Contact this facility" panel. To keep both usable:
- Detect the facility route via pathname.
- On that route, on `md+` screens, shift the floating button up: `top-[35%]` instead of `top-1/2` so it clears the contact card.
- On mobile (`<md`), the facility page shows a bottom sticky bar; the floating button stays vertically centered on the right edge and does not conflict.

No changes to the contact panel itself.

### Mounting

Add `<FloatingProfileCta />` once in `src/routes/__root.tsx`, rendered as a sibling of `<Outlet />` inside the body so it appears on every page automatically.

## Out of scope

- No backend, no auth, no analytics.
- No changes to mock data, routing, or existing questionnaire logic beyond extracting it into a shared component.
