# Genspark / AI Build Brief — KURALIVO MVP 0.1

Use this as the single source brief when asking Genspark or another coding AI to implement the MVP. The AI should inspect the existing repository before changing anything.

## Mission

Build a lean, mobile-first public campaign directory and interest-capture website for KURALIVO, the affiliate/creator network in the HOLBERY → AMARIFA → KURALIVO ecosystem.

## First deliverable

A polished, responsive website that can honestly launch before a full backend exists:
- Home
- How it works
- Campaign listing with empty-state support
- Campaign detail template
- Affiliate interest form
- Merchant/brand interest form
- Trust/disclosure section
- Privacy and terms placeholders clearly marked for owner/legal review
- Operator instructions for managing campaign data manually

## Technical constraints

- Inspect the current repository and preserve existing working content unless there is a clear reason to change it.
- Prefer static-first architecture and zero-cost/free-tier deployment.
- No paid service, domain purchase, account creation, or recurring expense without explicit owner approval.
- Do not use GitHub Actions.
- Do not add secrets, tokens, private keys, or personal data to the repository.
- Keep affiliate links as data/configuration, not hardcoded claims about active programs.
- No custom checkout, payment custody, wallet, or commission payout system in 0.1.
- Do not fabricate products, merchants, prices, commissions, reviews, stock, sales, or tracking status.
- Use Indonesian copy by default.
- Accessibility and responsive layout are required.
- Do not add analytics until its data use and privacy notice are decided.

## Content behavior

If no campaigns are configured:
- Show “Kampanye perdana sedang disiapkan.”
- Offer a creator/affiliate interest form.
- Do not display fabricated campaign cards.
- Do not claim users can already earn commission.

Every active campaign must include:
- verified merchant/product
- verified destination
- commission basis and responsible payer
- eligibility and allowed channels
- tracking/report source and caveats
- cancellation/return conditions
- payout terms
- required disclosure
- last verified date

If any field is missing, prevent the campaign from being marked active.

## UX requirements

- One clear primary CTA on each page.
- Mobile-first and lightweight.
- Plain language and clear error/success states.
- Do not require account creation to express interest.
- Forms must explain what information is collected and why.
- Provide a real monitored contact route only after one is configured.
- No fake testimonials, earnings screenshots, countdowns, or urgency.

## Suggested phases

1. Audit current HTML/docs.
2. Propose a short implementation plan and identify any blockers.
3. Build responsive pages using the existing stack.
4. Validate links, forms, semantic HTML, accessibility, and mobile layout.
5. Produce a file change summary and manual test checklist.
6. Do not claim deployment or integration success unless verified.

## Definition of done

- Local/static preview works.
- All navigation and page links work.
- No fake data or unsupported earning claims.
- Empty campaign state works.
- Forms have validation and honest submission behavior.
- Disclosure is visible close to affiliate links.
- README explains setup and what remains manual.
- No GitHub Actions were introduced.
- Deployment status is described accurately, including anything that still requires owner action.

## Owner approval gates

Ask for approval before:
- enabling paid services
- adding a custom database/authentication provider
- collecting sensitive identity or tax data
- integrating payments or payout processing
- publishing a public campaign with commission terms
- making legal or trademark claims
