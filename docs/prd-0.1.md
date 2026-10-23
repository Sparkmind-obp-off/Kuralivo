# KURALIVO Product Requirements Document — 0.1

**Status:** Draft for validation. Not a production commitment.
**Product:** KURALIVO affiliate and creator campaign network.
**Parent ecosystem:** HOLBERY (product factory) → AMARIFA (discovery/promotion) → KURALIVO (affiliate activation).

## 1. Product summary

KURALIVO helps creators and affiliates discover approved campaigns, understand the offer, access authorized promotional assets and links, and review whatever performance information can be reliably obtained from the merchant or affiliate platform.

The first version is an operations-led pilot supported by a lightweight public site and structured campaign records. It is not a full affiliate network with proprietary attribution, payout processing, or marketplace checkout.

## 2. Problem statement

Affiliates can struggle to identify relevant offers, understand campaign rules, obtain useful product information, and distinguish estimated clicks from confirmed commissionable sales. Small sellers can struggle to brief and coordinate multiple creators. KURALIVO tests whether a curated campaign layer can reduce this friction.

These are hypotheses to validate, not universal claims.

## 3. Target users

### Primary: affiliate/creator
- New or small creator who wants clear rules and a practical first campaign.
- Niche creator who needs products that fit their audience.
- Community publisher who can distribute useful recommendations responsibly.

### Secondary: merchant/brand
- Small brand or seller with a legitimate product and clear fulfillment.
- Product owner seeking measurable distribution beyond posting on their own account.

### Internal operator
- Reviews products and merchants, publishes campaigns, answers questions, reconciles reports, and handles disputes.

## 4. Jobs to be done

- As an affiliate, I want to see the product, audience fit, commission basis, eligibility, and payout terms before I spend time creating content.
- As an affiliate, I want approved assets and a valid destination link so I can promote accurately.
- As a merchant, I want to explain my offer once and see which creators participate.
- As an operator, I want a consistent record of campaign terms, link status, performance source, and decisions.
- As a customer, I want to know when a recommendation may earn a commission and where checkout actually occurs.

## 5. MVP goals

1. Validate merchant supply and creator interest.
2. Run one real, trackable campaign with transparent terms.
3. Provide a clear campaign page and a manual creator onboarding path.
4. Capture simple, privacy-conscious activity metrics.
5. Learn what should be automated next.

## 6. Non-goals for 0.1

- Holding customer funds or paying commissions from KURALIVO's own wallet.
- Building a custom checkout or fulfillment network.
- Guaranteeing sales, income, or attribution.
- Building native mobile apps.
- Building complex multi-level referral/downline commissions.
- Automated scraping of private communities or platform accounts.
- Full CRM, tax, invoicing, or merchant ERP.
- Open public listing without moderation.
- Custom analytics pretending to know sales not reported by a trusted source.

## 7. MVP user flows

### Affiliate
1. Visit KURALIVO.
2. Understand what the network does and how compensation works.
3. Browse available campaign details or submit interest.
4. Read product, audience, commission, eligibility, content rules, tracking, cancellation, and payout information.
5. Apply through a simple form or approved channel.
6. Receive approval and official links/assets.
7. Publish compliant content.
8. Review platform/merchant report or clearly labeled manual status.
9. Ask questions or report a broken link.

### Merchant
1. Review the partner proposition.
2. Submit product, fulfillment, pricing, margin/commission, assets, and policy information.
3. Operator reviews product claims and terms.
4. Approve, request changes, or reject.
5. Agree campaign rules and source of truth for tracking.
6. Receive creator activity summary where available.

### Operator
1. Create merchant and product record.
2. Verify destination URL and program terms.
3. Create campaign and content kit.
4. Review affiliate applications.
5. Issue links and assets.
6. Record status changes and evidence.
7. Reconcile reported activity and close campaign.

## 8. Functional requirements

### P0 — required for pilot
- Public landing page with clear brand role and CTA.
- Campaign page template with merchant, product, audience fit, destination, commission basis, campaign period, eligibility, content rules, cancellation/return caveats, payout source/timing, and last-verified date.
- Affiliate interest/application form.
- Merchant interest form.
- Manual approval workflow.
- Operator-controlled campaign status: draft, review, active, paused, ended.
- Affiliate disclosure near relevant monetized links.
- Contact/support route that is actually monitored.
- Basic privacy notice and data minimization.
- Manual campaign performance log that names the source and timestamp.
- Link validation checklist before activation.

### P1 — after pilot evidence
- Affiliate login and personal dashboard.
- Campaign applications and status.
- Link/asset library.
- UTM or referral-link helper where supported and authorized.
- Campaign announcements.
- Downloadable content briefs.
- Basic click events with privacy notice and consent where required.
- CSV import/export and reporting.

### P2 — only if justified
- Merchant portal.
- Affiliate-specific links generated from verified partner integrations.
- Automated conversion reconciliation.
- Commission ledger and payout status sourced from partner reports.
- Campaign matching and recommendation.
- API integrations.

## 9. Data model (conceptual)

- **Merchant:** id, name, contact, verification_status, terms_url, created_at.
- **Product:** id, merchant_id, name, category, description, evidence/source links, destination_url, status, last_verified_at.
- **Campaign:** id, product_id, title, brief, audience_fit, commission_type, commission_value, eligibility, start_at, end_at, payout_terms, tracking_source, status, terms_version.
- **Affiliate:** id, display_name, contact, channels, niche, application_status, consent_records.
- **Application:** id, affiliate_id, campaign_id, status, reviewed_at, notes.
- **Asset:** id, campaign_id, type, url, license/usage terms.
- **TrackingRecord:** id, campaign_id, source, period, clicks, conversions, commission_reported, status, imported_at.
- **AuditEvent:** actor, action, entity, timestamp, change summary.

Do not collect identity documents or tax data in the MVP unless a real partner/payout requirement makes them necessary and an appropriate secure process exists.

## 10. Non-functional requirements

- Mobile-first, low-bandwidth friendly.
- Clear Indonesian language; accessible contrast and keyboard navigation.
- Secure handling of forms and secrets.
- No secret API keys in frontend code or repository.
- Minimize personal data; define retention and deletion process.
- Accessible support and clear error states.
- Campaign terms are versioned or archived so historical rules remain understandable.
- No reliance on GitHub Actions; deployment can be configured through the chosen host's supported integration or manual process.

## 11. Trust, safety, and compliance

- No income guarantees or fabricated proof.
- Clearly identify affiliate/sponsored content.
- Follow the rules of each affiliate platform and merchant.
- Reject counterfeit, illegal, unsafe, misleading, or unsupported products/claims.
- Keep product creator, seller, marketplace, and affiliate roles distinct.
- Do not imply KURALIVO itself sold, shipped, or endorsed a product beyond the evidence.
- Establish privacy, terms, affiliate disclosure, campaign terms, and complaint handling before launch.
- Have local legal/accounting advice review the actual operating and payment arrangement before scaling.

## 12. Success metrics

North-star candidate: **number of active campaigns with at least one qualified affiliate action and verifiable performance evidence**.

Supporting measures:
- Qualified merchant leads.
- Approved campaigns.
- Affiliate applications and approval rate.
- Active affiliates per campaign.
- Valid outbound clicks from the available source.
- Confirmed conversions and reported commission, when supplied by the partner.
- Broken-link rate.
- Dispute/complaint rate.
- Time to launch a campaign.
- Creator repeat participation.

Do not use registered accounts or raw page views as proof of business success.

## 13. Acceptance criteria for pilot

- At least one merchant/product has verified terms and a functioning destination.
- Campaign terms and affiliate disclosure are visible before promotion.
- At least three creators are invited or approved for the pilot (participation is not assumed).
- Every reported metric has a named source and period.
- A user can ask for help through a monitored channel.
- No unverified claims about commission, tracking, or payout are displayed.
- A manual closeout report records outcomes and unresolved questions.

## 14. Open decisions

- First micro-category.
- Merchant of record and contracting entity.
- Whether commission is paid by merchant/platform directly or shared by contract.
- Attribution and reporting source.
- Affiliate eligibility and content review rules.
- Hosting, form handling, analytics, and retention choices.
