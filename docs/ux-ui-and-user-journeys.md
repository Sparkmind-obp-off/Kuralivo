# UX/UI Direction & User Journeys — KURALIVO 0.1

## Design principle

The first experience should feel like a trustworthy campaign desk, not a get-rich-quick scheme or an empty marketplace. Show real offers and clear terms. If no campaign is active, say so and collect interest honestly.

## Information architecture

### Public
- Home
- How it works
- Available campaigns
- Campaign detail
- For affiliates
- For brands/merchants
- Trust & disclosure
- FAQ
- Contact
- Privacy and terms

### Affiliate area (later P1)
- Overview
- Explore campaigns
- My applications
- My links/assets
- Performance reports
- Profile and channels
- Help

### Operator area (manual at MVP; protected if built)
- Merchant records
- Product review queue
- Campaign editor
- Affiliate applications
- Link verification
- Report import
- Audit log

## Home page wireframe (text)

1. Header: KURALIVO logo; Campaigns; How it works; For brands; Sign in (only when implemented).
2. Hero:
   - Headline: “Temukan kampanye yang cocok dengan audiensmu.”
   - Subhead: “Lihat produk, pahami aturan, gunakan materi yang disetujui, lalu promosikan secara transparan.”
   - Primary CTA: “Lihat kampanye”
   - Secondary CTA: “Daftarkan minat sebagai afiliator”
3. Trust strip: “Aturan jelas • Produk dikurasi • Komisi dijelaskan di awal” (only show these if the process actually enforces them).
4. Campaign cards: category, product, audience fit, commission basis, campaign status, last verified.
5. “Cara kerja” in three steps: pilih kampanye → promosikan sesuai brief → cek laporan dari sumber yang tersedia.
6. For merchants: “Punya produk yang layak dipromosikan?” → submit partner interest.
7. Disclosure: KURALIVO may receive compensation; details appear on each campaign.
8. Footer: contact, privacy, terms, disclosures.

## Campaign card content

Required:
- Product/campaign name.
- Category and audience fit.
- Merchant identity.
- Commission basis, or “belum dikonfirmasi” and not open for promotion.
- Campaign status.
- Key eligibility.
- CTA to details.

Avoid showing a vague “up to” amount without conditions. Do not use fake stars, fake sales counts, or urgency timers.

## Campaign detail page

Sections:
1. Product and merchant summary.
2. Who it is for / not for.
3. Offer details and destination.
4. Commission basis and calculation example only when verified.
5. Eligibility and allowed channels.
6. Content brief and approved assets.
7. Tracking source, attribution caveats, cancellation/return handling.
8. Payout responsible party and timing.
9. Required disclosure and prohibited claims.
10. Last verified date and support contact.
11. Apply/Join CTA.

## Core user journeys

### Journey A — beginner affiliate
Discover KURALIVO → understand there is no guaranteed income → view real campaign → check audience fit and terms → apply → receive approval → get official link and content brief → publish → review source-backed report → decide whether to continue.

Success: user understands terms before creating content and knows where performance figures come from.

### Journey B — merchant
Arrive from partner page → submit product and business information → receive acknowledgement → provide evidence, fulfillment details, and commission rules → review campaign draft → approve terms → campaign goes live → review summary.

Success: no campaign goes live without verified destination and agreed rules.

### Journey C — shopper
See affiliate content → recognize commercial disclosure → open product information → understand who sells it and where checkout happens → decide independently.

Success: customer is not misled about ownership, sponsorship, or destination.

### Journey D — operator
Receive submission → verify merchant/product and claim sources → record terms → draft campaign → check destination → approve campaign → onboard creator → log performance evidence → close and learn.

Success: a full campaign can be audited without relying on memory or chat fragments.

## States and error handling

- No active campaigns: explain that the pilot is being prepared; invite interest without suggesting availability.
- Campaign paused/ended: remove active promotion CTA and explain status.
- Broken destination: disable link and flag operator; never silently redirect.
- Missing commission terms: campaign cannot be promoted as an active affiliate offer.
- Delayed report: label report as pending and show source/period.
- Conversion not reported: say “belum tersedia dari sumber mitra,” not “zero sales.”
- Application rejected: communicate respectfully and avoid implying the creator is inherently unqualified.
- Form failure: preserve entered data where safe and provide a support route.

## Visual direction

- Premium, restrained, warm, modern.
- Strong typography and generous whitespace.
- Neutral base with one distinctive accent color.
- Product imagery must be authorized and accurate.
- No fake earnings screenshots, stock “creator success” claims, or luxury imagery that implies guaranteed wealth.
- Mobile-first cards and one clear CTA per section.

## Accessibility checklist

- Semantic headings and labels.
- Keyboard-accessible navigation and forms.
- Visible focus state.
- Contrast checked for all text.
- Meaningful alt text.
- Errors described in text, not color alone.
- Avoid motion-heavy animations.
