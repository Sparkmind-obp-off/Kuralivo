# KURALIVO Product Requirements Document — 0.1 (AI-First Content Engine)

**Status:** Validation draft. Not a production commitment.
**Product:** AI-first affiliate content engine, physical-first and digital-enabled.

## 1. Product summary

KURALIVO helps an operator turn verified product information into faceless-first marketing content and evaluate real distribution outcomes. AI assists with research synthesis, creative planning, scripts, storyboards, visual prompts, captions, and analysis. Human review is required before publication.

The first release is an operating playbook and manual tracker, not an autonomous publishing platform, custom checkout, payout wallet, or proprietary attribution network.

## 2. Problem hypotheses

- Product promotion takes too much time when each creative starts from scratch.
- New affiliates may lack a repeatable content workflow and may not know which product facts and rules are safe to use.
- AI can reduce production effort, but unreviewed AI content may create inaccurate claims, rights issues, synthetic-media concerns, or repetitive low-quality posts.
- A small, evidence-led content loop may help identify product/creative fit before building software.

These hypotheses must be tested; they are not established market facts.

## 3. Users

- Initial operator: researches offers, generates and reviews content, publishes manually, records outcomes.
- Future affiliate/creator: uses briefs, templates, authorized links, and content tools.
- Future merchant/product owner: supplies product facts, usage rights, campaign terms, and performance source.

## 4. MVP outcomes

1. Verify at least one product and its official affiliate pathway before monetized promotion.
2. Generate a small batch of original creative concepts from a sourced evidence pack.
3. Review every asset for facts, rights, disclosure, visual fidelity, and platform rules.
4. Publish manually only if account and program eligibility permit it.
5. Record metrics from named sources and learn which formats deserve another test.
6. Keep production and validation costs as close to zero as practical.

## 5. Non-goals

- Guaranteed sales or earnings.
- Unsupervised AI publication or mass posting.
- Fake testimonials, synthetic customer endorsements, fabricated hands-on experience, or invented product results.
- Scraping private communities, spam DMs/comments, fake engagement, or bypassing platform restrictions.
- Custom checkout, inventory, shipping, wallet, payout processing, or commission attribution.
- Automated access to accounts without official authorization.
- Paid ads, paid tooling, or inventory purchase without explicit owner approval.
- Treating AI-generated images as proof that the real product looks or performs a certain way.

## 6. Workflow requirements

### P0 — required for manual pilot
- Product intake record: product, merchant, official URL, category, eligibility, permitted channels, source date, rights notes.
- Evidence pack: sourced facts, limitations, approved/prohibited claims, source URLs, review date.
- Creative brief: audience hypothesis, intent, hook, angle, proof, format, CTA, disclosure.
- AI generation templates for scripts, storyboards, image/video prompts, captions, and variants.
- Human review checklist before publication.
- Asset log with origin, license/permission, generation tool, and any synthetic-media disclosure decision.
- Official affiliate link register with program terms and eligibility evidence.
- Manual content calendar and publication log.
- Results tracker distinguishing views/reach, clicks, reported orders, confirmed conversions, reported commission, and completed payout.
- Incident log for inaccurate claims, rights complaints, broken links, takedowns, and corrections.

### P1 — only after repeated use
- Structured content brief editor.
- Versioned prompt library and reusable creative templates.
- Batch generation assistance with per-asset review states.
- Campaign/product catalog.
- CSV import/export of authorized partner reports.
- Simple performance dashboard based only on source-provided metrics.
- Creator application and approval workflow.

### P2 — only if justified
- Authorized platform/affiliate integrations.
- AI-assisted product matching.
- Multi-user workspace and role permissions.
- Scheduled publishing only through official supported integrations and after explicit approval.
- Partner report reconciliation and audit trail.

## 7. Content quality gate

Every creative must pass:
1. **Fact check:** each product claim is supported by an identified source.
2. **Visual fidelity:** generated imagery does not misrepresent the real item, packaging, size, use, or outcome.
3. **Experience honesty:** no fabricated first-person use, review, unboxing, or testimonial.
4. **Rights:** product assets, music, likeness, logos, fonts, and clips have a permitted use basis.
5. **Disclosure:** affiliate/sponsored relationship is clear where required.
6. **Platform rules:** eligibility, AI/synthetic-media labeling, link placement, branded content, and content policies checked for the target account and channel.
7. **CTA and link:** destination works and matches the described product.
8. **Human approval:** named operator approves before publishing.

## 8. Suggested data records

- Product: id, name, merchant, official_url, category, status, source_pack, claim_risk, rights_notes, last_verified_at.
- AffiliateProgram: product_id, platform, eligibility_evidence, allowed_channels, link, commission_terms, attribution_source, payout_owner, cancellation_rules, verified_at.
- CreativeBrief: id, product_id, audience_hypothesis, angle, hook, format, CTA, disclosure_plan, status.
- Asset: id, brief_id, asset_type, source_or_generation_method, prompt_version, rights_status, review_status, reviewer, approved_at.
- Post: asset_id, platform, account, published_url, published_at, disclosure_check, status.
- MetricSnapshot: post_id, period, metric_name, value, source, captured_at.
- Incident: asset_id, type, severity, resolution, date.
- AuditEvent: actor, action, entity, timestamp, change summary.

Avoid collecting personal data that is not needed. Do not store passwords, session cookies, OTPs, or API secrets in content records or Git.

## 9. Success metrics

- Time from verified product brief to approved creative.
- First-review pass rate and correction rate.
- Number of original approved/published creatives.
- Reach and watch/retention metrics where the platform provides them.
- Outbound clicks from a named source.
- Confirmed conversions and reported commission from authorized partner data.
- Broken links, complaints, policy strikes, corrections, and takedowns.
- Cost per approved creative and repeatable format rate.

AI asset count and raw views are not proof of revenue.

## 10. Acceptance criteria

- Product facts and affiliate eligibility are sourced and dated.
- No monetized promotion begins before program terms and account eligibility are verified.
- Every published asset has a recorded human approval.
- Affiliate disclosure and link destination are checked.
- Every performance number names its source and period.
- Unverified conversion, commission, or payout claims are not displayed.
- A pilot closeout records evidence, uncertainty, costs, and next experiment.

## 11. Open decisions

- First product micro-category.
- Initial platform and affiliate eligibility path.
- Approved AI image/video/voice tools available at zero cost.
- Whether product assets can be licensed or must be generated from text/owned assets.
- Hosting and content storage.
- Which metrics can actually be accessed without paid APIs.
