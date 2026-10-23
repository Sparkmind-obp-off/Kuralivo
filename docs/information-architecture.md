# KURALIVO — Information Architecture

## Navigation proposal
1. **Overview** — next action, recent projects, status summary.
2. **Projects** — campaign/project list and filters.
3. **Create Content** — guided brief, evidence, angles, drafts, review.
4. **Content Library** — approved scripts, captions, storyboards, prompts, assets.
5. **Publishing Log** — manually recorded post URL/date/platform/status.
6. **Experiments & Results** — hypotheses, metrics, source/date, learning.
7. **Templates** — brief templates, prompt versions, review checklist.
8. **Settings** — workspace preferences and integration status.

For the first manual version, these may be folders and documents rather than separate application screens. Do not build every screen before validating the workflow.

## Core objects
- Project: purpose and scope for a campaign or product.
- Product brief: item, seller, audience problem, product facts, limitations.
- Evidence item: claim, source, date checked, notes, confidence.
- Creative concept: angle, hook, audience, format, CTA, risk notes.
- Content asset: script, caption, storyboard, visual instruction, voice-over draft.
- Review: checklist result, reviewer, date, issues, approval status.
- Publication: platform, post URL, publication time, format.
- Metric observation: metric name/value/unit, source, date range, recorded time.
- Experiment: hypothesis, variable, comparison, outcome, next decision.
- Prompt template: purpose, version, inputs, output contract, safety rules.

## Status model
Idea → Researching → Draft → In Review → Needs Changes ↔ Draft → Approved → Published → Archived.

A project may contain multiple assets with different statuses. Approval of one asset does not approve every asset in a batch.

## Search and filters
Prioritize status, project, product/category, channel, date, and content format. Do not add complex taxonomy before users need it.

## Naming rules
Use human-readable project names. Use stable internal IDs if a database is implemented. Do not place access tokens, customer secrets, or sensitive account details in titles or filenames.
