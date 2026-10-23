# KURALIVO PRD 1.0 — Internal AI Content Engine

**Status:** Proposed baseline; implementation status must be verified separately.  
**Owner:** HOLBERY  
**Primary operator:** one person initially  
**Public affiliate account:** separate account, naming TBD

## 1. Problem
Producing consistent short-form marketing content involves scattered research, scripts, visual prompts, captions, review checks, publishing notes, and results. Without a repeatable workflow, the operator repeatedly starts from zero and risks unsupported product claims or missing disclosures.

## 2. Goal
Create a lightweight, repeatable workflow that turns a verified brief into a reviewed content package and records what happened after publication.

## 3. Primary user
A solo operator producing faceless-first marketing content for an affiliate account or other legitimate campaign. The operator chooses what to publish and remains accountable for final accuracy, rights, and platform compliance.

## 4. User jobs
- Organize a product/campaign and target audience.
- Record facts, sources, limitations, and asset permissions.
- Create several content angles and select one.
- Generate hooks, scripts, storyboard, shot list, voice-over draft, captions, and CTA.
- Review factual claims, visual fidelity, rights, and disclosures.
- Export assets and publish manually on a permitted channel.
- Record source metrics and decide the next test.

## 5. MVP functional requirements

### P0 — essential
- FR-01: Create, edit, archive a campaign/project.
- FR-02: Store audience, problem, channel, language, objective, CTA, and constraints.
- FR-03: Add source URLs, dates checked, extracted facts, limitations, and confidence.
- FR-04: Generate creative briefs and drafts from supplied context; do not imply web verification unless it occurred.
- FR-05: Generate variants for hooks, script, caption, storyboard, shot list, and visual directions.
- FR-06: Show source/context next to claims where practical.
- FR-07: Provide a review checklist for facts, product depiction, asset rights, AI disclosure, affiliate disclosure, and platform rules.
- FR-08: Support statuses: Idea, Researching, Draft, In Review, Needs Changes, Approved, Published, Archived.
- FR-09: Require explicit human approval before a draft is marked Approved.
- FR-10: Export a content package as Markdown/text/CSV or downloadable bundle when implemented.
- FR-11: Record post URL, platform, publication date, format, and source-reported metrics.
- FR-12: Distinguish observed values from estimates/hypotheses and preserve metric source/date.
- FR-13: Keep secrets out of prompt history, content records, and Git.
- FR-14: Display clear empty, loading, error, and success states in any UI.

### P1 — after MVP evidence
- Reusable templates and prompt versions.
- Batch drafting with independent review for every asset.
- Content calendar and asset library.
- Basic charts based only on recorded source metrics.
- Optional approved integrations after API access and policy review.

### P2 — conditional
- Multi-user workspaces and role permissions.
- Public creator workspace or SaaS.
- Billing/subscriptions and campaign directory.
- Official scheduled publishing integrations.

## 6. Non-functional requirements
- Responsive layout and keyboard-usable primary flows.
- Clear status and recoverable errors.
- No unsupported claims that integrations or automation are live.
- Minimize collected personal data.
- Protect saved drafts and credentials using approved platform controls.
- Log significant status transitions where persistent storage exists.
- Use accessible contrast, visible focus, labels, and descriptive errors.
- Model outputs are untrusted drafts and must pass review.

## 7. Acceptance criteria
- A user can create a project and enter product/audience context.
- The project can hold sourced facts and their check dates.
- Draft assets are editable and status-labelled.
- Approval cannot be inferred from generation alone.
- Exported package includes script, caption, CTA, source notes, and disclosure reminders.
- Published performance is never fabricated; absent metrics show “not recorded”.
- User can return to an incomplete draft without losing saved work, if persistence is implemented.
- All integrations are labelled Available, Beta, Planned, or Not connected based on actual state.

## 8. Metrics
- Time from brief to approved content.
- First-review pass rate and correction rate.
- Number of reviewed/published assets.
- Production time per approved asset.
- Actual reach, watch metrics, clicks, orders, and commission when source data exists.
- Broken links, complaints, takedowns, and policy incidents.
- Weekly number of actionable learning decisions.

## 9. Risks and mitigations
- **Hallucinated product claims:** evidence pack, source links, human review.
- **Misleading synthetic visuals:** require product-accuracy check; label illustrative assets.
- **Rights violations:** record asset provenance and allowed usage.
- **No affiliate eligibility:** keep content engine usable without active links; never imply monetization.
- **No sales despite content:** run small tests and use actual data; do not promise outcomes.
- **Overbuilding:** no public SaaS until repeated use and external demand are demonstrated.

## 10. Out of scope
Public affiliate account naming, account creation, approval decisions, purchases, paid ads, guaranteed income, autonomous posting, private-source scraping, and any integration not explicitly verified.

## 11. Release gate
A release is ready only when the core flow is tested, statuses are accurate, export is usable, and all content-safety gates are present. Repository documentation alone is not proof of implementation.
