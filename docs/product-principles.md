# KURALIVO — Product Principles & Scope

## Product definition
KURALIVO is an internal AI-assisted content workflow. Initially it may consist of documented processes, prompt templates, structured files, and a lightweight web workspace if implementation is justified. The product name does not imply that all described capabilities already exist.

## Core operating loop
Brief → evidence pack → creative plan → AI draft generation → human review → approved export → manual publishing → real results → next experiment.

## Product principles
1. **Start from a job, not a feature.** Help the operator create one useful content asset end to end.
2. **Evidence travels with claims.** Important product facts should have sources, dates, and confidence notes.
3. **Separate draft from approval.** Generated content is not automatically ready to publish.
4. **Manual-first integrations.** Copy/export is acceptable before official APIs are justified.
5. **No fake data.** Demo data must be clearly labelled; analytics only show imported or manually recorded source values.
6. **Make failure recoverable.** Preserve drafts and explain validation errors without losing work.
7. **Respect rights and platform policies.** Generated assets do not automatically grant rights to logos, music, likenesses, or merchant imagery.
8. **Small surface area.** No payments, team billing, public marketplace, or complex role system in the MVP.
9. **Accessible and responsive.** Core workflows work on desktop and mobile browser sizes.
10. **Observe before automating.** Automate a step only after it is repeated and its quality can be evaluated.

## MVP must support
- Create and edit a content project/campaign.
- Record product/audience context and source evidence.
- Generate or manually write a creative brief.
- Draft hooks, scripts, captions, shot lists, and visual instructions.
- Review claims, disclosures, rights, and content status.
- Approve or request revisions.
- Export a content package.
- Record where/when content was published.
- Enter source-based performance data and review experiments.

## Explicitly deferred
- Direct publishing to social networks.
- Scraping private groups or restricted sources.
- Automated DMs/comments/following.
- Affiliate link generation or commission attribution without official integrations.
- Public multi-tenant SaaS, subscriptions, wallets, payouts, and creator marketplace.
- Unsupervised generation/posting at scale.
- Automatic product claims based only on model knowledge.

## Decision rule
If a feature does not help produce, verify, approve, publish, or learn from content in the current workflow, defer it unless there is clear user evidence for it.
