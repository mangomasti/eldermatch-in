# Assessment of the uploaded research file + import plan

## Verdict

The file is good, usable input. It covers all 40 listings currently on the site, uses the same IDs as our data layer (e.g. `athulya-kasavanahalli-bengaluru`), is organised by state, and is explicit about sourcing (official vs. secondary vs. N/A). Nothing appears fabricated, which is exactly what we need given every listing is currently marked Unverified.

Main caution: depth is very uneven. Roughly a third of listings (Athulya branches especially) only carry company-wide boilerplate, and several entries are flagged as non-residential addresses.

## What the file DOES include

Fields it can meaningfully fill on our listings:

- Identity: name, neighborhood, city, state, address (partial postal for many), phone, email, website
- Source attribution per facility (official / named secondary / N/A)
- Tier and tier label (NGO/free, budget, mid-range, premium medical, real-estate senior living)
- Care types + browse category (Assisted Living / Independent Living / Palliative Care)
- Condition-specific care (dementia, post-surgery, palliative, paralysis, bedridden, chronic illness)
- Medical capabilities and licensing / registration notes (RERA, trust reg. numbers, IGBC, "JCI/NABH-inspired")
- Staff credentials in prose (doctors, nurses, physios, nutritionists) — brand level, not branch level
- Amenities, and for some: cuisine/dining, distant-family support (video conferencing)
- Some emergency data: on-call doctor, ambulance, panic alarms, occasional hospital tie-up
- Some distances (airport/hospital) for a handful of listings
- Short description + long description text ready to drop in
- Year founded / brand history for most
- Pricing for 5 facilities only: Kadji, Antara (ACB monthly), Serene Urbana, Ashiana Shubham, Athashri
- Useful flags: 6 secondary-source-only listings; corporate offices / day-care chapters wrongly listed as homes (Vedaanta Cunningham Road, Bellandur, HSR; HelpAge Qutab; Dignity Byculla and Anna Nagar)

## What the file does NOT include

Fields our pages render that would stay empty or N/A:

- priceMin / priceMax for ~35 of 40 facilities, and priceNote for most
- Itemized cost breakdown (private / double / shared room, extras, what's included vs. billed separately)
- Deposit amounts (only one secondary figure, for Athulya)
- Price history timeline — absent for all 40
- Staff ratio and average staff experience — absent for all 40
- "A Typical Week" schedule — absent for all 40
- "Life at the Home" resident interests / narrative tags — absent for all 40
- Trial stay availability, nights, price — absent for all 40
- Reviews, ratings, review counts — none (we would keep showing "Unverified")
- Photos — none usable; we keep stock placeholders and the "Photos pending" label
- Per-branch phone and email for most multi-branch brands (only company-wide numbers)
- Community / dietary preference (Jain, Brahmin, Muslim, Christian, Veg, Non-veg) — almost entirely missing
- Languages spoken — missing for nearly all
- Pet-friendly — missing for all
- Full postal addresses and geo coordinates for many
- Hospital tie-up and distances for the majority
- lastVerified / verified — N/A by design

## Proposed next step (once you approve)

1. Rewrite `src/lib/facility-specs.ts` from the file, per facility: fill every field the document supports verbatim, leave the rest as `"N/A"` / empty arrays. No inference.
2. Add a `source` and `sourceType` (`official` | `secondary`) field per listing; surface a small "Details from secondary sources — pending facility confirmation" note on profiles where `sourceType` is secondary.
3. Add a `listingKind` field (`residential` vs `office/day-care`) and label the flagged Vedaanta / HelpAge / Dignity entries so families aren't misdirected; optionally hide them from search results.
4. Replace generated boilerplate `longDescription` with the document's per-facility description and long description text.
5. Keep unverified status, "Pricing N/A", photos-pending label and empty reviews exactly as they are.
6. Add a completeness indicator (internal only, founder console): % of fields filled per listing, so you can prioritise the phone-call pass for pricing, staff ratio and trial stay.

### Technical notes

- Data lands in `src/lib/facility-specs.ts`; `buildReal()` in `src/lib/mock-data.ts` gets extended to carry the new fields through to `Facility` and the enrichment map.
- Profile page (`src/routes/facility.$id.tsx`) already renders most of these sections; empty ones should be hidden rather than showing "N/A" blocks everywhere — I'd render "Not provided by the facility yet" only in the pricing and staff sections.
- No backend changes; still fully frontend mock data.
