# Kuralivo Product Roadmap
Updated: 2026-10-24
Status: proposed execution roadmap; stages are not complete until their acceptance criteria are verified.

## Product outcome
Kuralivo turns a real product/offer and evidence into a complete, reviewable content journey and measurable production loop. Start with affiliate marketing; keep the workflow configurable for other content goals.

## Non-goals
- Rebuilding every AI model, design library, research provider, or social platform.
- A universal integration marketplace before the core workflow works.
- Auto-publishing or automated DMs in the MVP.
- Fabricating demand, testimonials, product experience, performance data, or sales.
- Claiming production readiness based only on committed code or a reachable URL.
- Requiring a dedicated local desktop or paid infrastructure before validating the workflow.

## Priority order
1. Deliver a reliable end-to-end content workflow with evidence and human review.
2. Verify the smallest useful hosted MCP and connect it to one compatible host.
3. Validate on one real affiliate product and real published content.
4. Add persistence and measurement only when the manual workflow proves useful.
5. Expand provider integrations and automation based on observed bottlenecks.

## Phase 0 — Product contract and master prompt
Goal: make product behaviour explicit before expanding code.

Deliverables:
- Master system prompt and guardrails.
- Content journey stages and content category/format library.
- Evidence classification and source ledger specification.
- Review gates for claims, affiliate disclosure, rights, and publication.
- Roadmap and explicit status vocabulary: Proposed / In progress / Implemented / Tested / Live.

Acceptance criteria:
- A new contributor can explain Kuralivo's purpose, non-goals, and first user.
- The prompt never treats unknowns as facts and never invents first-hand experience.
- The README clearly distinguishes implemented, proposed, and unverified features.

## Phase 1 — Core content workflow (MVP)
Goal: create useful, structured outputs for one real product without requiring external integrations.

Deliverables:
- Intake: goal, product/offer, audience, platform, format, constraints, and success metric.
- Evidence dossier: claim, source URL, source type, checked date, confidence/status, rights, and unknowns.
- Journey mapper: Discover → Understand → Evaluate → Decide → After purchase, selectively applied.
- Content matrix: pillar × stage × audience question × format × CTA × metric.
- Production brief: hook, structure, shots/visuals, script/caption, CTA, disclosure, and assets needed.
- Claim/disclosure/rights review checklist.
- Simple manual measurement sheet.

Acceptance criteria:
- Given one real affiliate product, the workflow produces an evidence dossier, a 7-day journey, three first-post options, one short-video brief, a review checklist, and metrics sheet.
- Each material product claim is linked to evidence or marked unknown.
- The user can manually verify every source and link before publishing.
- Outputs are reusable and not tied to a single platform.

## Phase 2 — Prompt Studio and composable production layers
Goal: turn approved strategy into format-specific production instructions.

Deliverables:
- Reusable prompt templates for short video, carousel, image post, story/status, text/thread, long-form video, blog/SEO, comparison guide, email, landing page, FAQ, and downloadable resource.
- Layer library: hooks, story structures, visual treatments, CTA patterns, disclosure blocks, and review checks.
- Prompt variables and explicit source/claim boundaries.
- Import/export of briefs and outputs in a portable format.

Acceptance criteria:
- The same evidence dossier can generate at least three platform-appropriate formats without changing the facts.
- Each output declares its intended audience action and includes relevant limitations/disclosures.
- The browser prototype clearly states whether it is local-only and whether data is persisted.

## Phase 3 — Remote MCP reliability and host connection
Goal: expose Kuralivo's unique workflow as a real hosted toolset and verify one end-to-end connection.

Deliverables:
- Review current Worker code and dependency compatibility before changing protocol assumptions.
- Select and document one supported MCP host/client and its current protocol/transport requirements.
- Verify Cloudflare deployment, endpoint URL, tool discovery, input schemas, tool calls, error handling, and logs.
- Add authentication/authorization appropriate to the chosen host; use least privilege and keep secrets server-side.
- Add rate limits, input limits, timeouts, abuse protection, and privacy-safe logs.
- Keep tools focused on Kuralivo workflow rather than cloning specialist providers.

Candidate tools, in priority order:
1. kuralivo_status — accurate service and capability status.
2. content_intake / create_content_brief — structured content brief.
3. evidence_ledger — normalize claims, sources, dates, and unknowns.
4. journey_mapper — map stages and content gaps.
5. production_brief / build_content_prompt — format-specific asset instructions.
6. claim_and_disclosure_review — flag missing evidence, disclosure, and rights checks.
7. repurpose_plan — adapt approved material.
8. experiment_log — record actual metrics and learnings.

Acceptance criteria:
- A compatible host successfully discovers and invokes at least one real tool against the deployed endpoint.
- Unauthenticated requests are rejected when access control is required.
- Invalid input returns a clear, structured error without exposing secrets.
- No feature is labelled live until a reproducible test record exists.
- If the selected host cannot use the endpoint, document the limitation and retain a manual workflow.

## Phase 4 — First real affiliate pilot
Goal: test usefulness and content quality before scaling.

Deliverables:
- Select one actual product from the user's affiliate catalog.
- Verify current listing details, programme rules, permitted assets, and link destination.
- Produce one evidence-backed 7-day journey and a small set of varied assets.
- Manually review and publish only with the user's approval.
- Record actual reach, retention, engagement, clicks, and conversions where available.

Acceptance criteria:
- No invented reviews, personal-use claims, prices, commissions, results, or demand metrics.
- Disclosure and link destination are checked before publishing.
- Results include dates, data source, sample size, and caveats.
- The next iteration is chosen from observed evidence, not assumed success.

## Phase 5 — Persistence and content library
Goal: preserve useful work and make it reusable after the manual workflow proves value.

Deliverables:
- Secure storage for workspaces, briefs, evidence items, assets, reviews, and revisions.
- Export/delete workflow and clear data-retention policy.
- Reusable pattern library with context, performance range, sample size, and limitations.
- Basic search/filtering by product, audience, journey stage, platform, and status.

Acceptance criteria:
- User data is isolated by workspace/account.
- Secrets and unnecessary personal data are not stored.
- Export and deletion are tested.
- Saved performance patterns do not imply universal results.

## Phase 6 — Provider integrations and assisted production
Goal: connect only external tools that solve proven bottlenecks.

Candidate integration categories:
- Research and source discovery.
- Image/design generation and reference libraries.
- Video/voice production and editing.
- Asset storage and file conversion.
- Analytics/reporting.

Rules:
- Verify each provider's current API/MCP support, licence, cost, data handling, and host compatibility.
- Use the provider's own tool directly when it works; do not add a redundant Kuralivo proxy without a clear reason.
- Keep provider-specific credentials separate and server-side.
- Show the user what a tool will do before consequential external actions.
- Maintain a manual fallback for provider outages or unavailable permissions.

Acceptance criteria:
- Every integration has a tested success path, a tested failure path, and documented permissions/costs.
- The app distinguishes generated assets from prompts and design references.
- No integration is described as connected until a real authenticated test passes.

## Phase 7 — Learning loop and selective automation
Goal: help users improve content based on reliable performance evidence.

Deliverables:
- Metrics import or manual capture with source and time window.
- Stage-aware diagnosis: reach, retention, understanding/trust, click/CTA, conversion, post-purchase.
- Experiment notes and next-step recommendations with confidence/caveats.
- Optional publishing integration only after permissions, preview, approval, audit trail, and rollback/failure handling are in place.

Acceptance criteria:
- Recommendations cite the underlying recorded metrics.
- Small samples and confounders are clearly stated.
- External posting requires explicit confirmation of exact content, account, destination, and timing.
- Automation can be disabled and has an auditable history.

## Operating constraints
- Prefer Cloudflare-hosted components already selected for the project; avoid adding paid infrastructure until necessary.
- Do not introduce GitHub Actions unless the owner explicitly changes that constraint.
- Keep the browser prototype, Worker source, deployed service, and connected host status distinct.
- Keep affiliate distribution/account identity separate from Kuralivo product identity until the owner decides otherwise.
- Bozq One System remains private and separate from Kuralivo/HOLBERY.
- No new product or brand expansion before the first workflow is tested with real evidence.

## Current status at roadmap creation
- Repository README and reference research document exist.
- Browser prompt-studio prototype exists and is described as browser-only.
- A Cloudflare Worker MCP prototype exists in source, but the repository notes it has not been verified as built, deployed, authenticated, or connected to a live host.
- The roadmap, master prompt, and research documents are specifications. Their presence in Git is not proof of implementation.

## First execution checklist
- [ ] Add and review master system prompt.
- [ ] Add and review roadmap.
- [ ] Update README to link both and clarify status.
- [ ] Inspect current Worker dependencies and build locally or in a verified environment.
- [ ] Choose one MCP host and verify current protocol/authorization requirements.
- [ ] Test one real product through the manual workflow.
- [ ] Only then decide which persistence or provider integration is necessary.
