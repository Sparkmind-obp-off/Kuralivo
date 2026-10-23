# KURALIVO — UI/UX & Design System

**Status:** Design direction, not proof of implemented screens.

## Experience goals
- Calm, focused, premium, operational.
- The next action is obvious.
- Evidence and approval status are visible.
- Editing content is faster than navigating between tools.
- Desktop-first workspace with usable mobile layouts.

## Visual direction
- Base: warm off-white canvas, dark forest/ink text, restrained olive accent, pale lime highlight, white cards.
- Typography: system sans-serif or licensed web font; strong hierarchy and comfortable line length.
- Components: restrained borders, medium rounded corners, generous spacing, minimal decoration.
- Avoid: noisy gradients, excessive badges, fake analytics, decorative dashboards with no actions.

## Design tokens (initial)
- Background: #F7F8F3
- Surface: #FFFFFF
- Text: #17241E
- Muted text: #66736B
- Border: #E2E7DF
- Primary dark: #14231D
- Accent olive: #718A2B
- Accent lime: #D7F36B

Check contrast before production; tokens are a starting point, not an accessibility certification.

## Layout
- Desktop: left navigation, central work area, optional right evidence/review panel.
- Tablet: collapsible navigation, stacked content and evidence.
- Mobile: single-column flow, sticky primary action only where it does not obscure content.
- Content editor: script/caption fields should be easy to select, edit, and copy.
- Evidence panel: show source title/domain, date checked, claim, and confidence.

## Core screen specifications
### Overview
- Primary CTA: Continue draft / New project.
- Show draft/review blockers and recent work.
- Metrics appear only when source data exists; otherwise show an empty state explaining how to add data.

### New project
- Required: project name, intended channel, content goal, audience/problem.
- Optional: product, language, format, CTA, constraints.
- Save draft early and preserve partial input.

### Evidence pack
- Source URL, source type, date checked, supported claim, limitation, permission note.
- Distinguish Verified, Needs Review, and Rejected.
- Never label a source “verified” merely because a URL was entered.

### AI draft studio
- Separate output sections: hooks, script, shot list/storyboard, visual direction, caption, CTA, disclosures.
- Each section editable independently.
- Show model output as draft and preserve source context.
- Regenerate one section without silently replacing approved sections.

### Review gate
- Checklist rows with Pass, Needs attention, N/A.
- Block approval when a critical safety check is unresolved.
- Human approver and timestamp recorded when persistence is available.

### Results
- Source and reporting period required for recorded metrics.
- Empty state: “No source metrics recorded yet.”
- No inferred revenue, commission, or conversion totals.

## Interaction states
- Loading: explain what is processing; prevent accidental duplicate submissions.
- Error: show actionable recovery and retain user input.
- Empty: give one clear next action.
- Success: confirm only after the operation actually succeeds.
- Disabled: explain what prerequisite is missing.
- Destructive action: confirmation and clear consequences.

## Accessibility
- Semantic headings and labels.
- Keyboard access and visible focus.
- Text labels in addition to color/status icons.
- Adequate contrast, scalable text, reduced-motion respect.
- Do not rely on color alone for review state.
- Announce asynchronous errors/status in accessible text when implemented.

## Copy tone
Direct, clear, useful, not hype-driven. Say “Draft generated,” not “Guaranteed viral.” Say “Not connected,” not “Coming soon” when connection status is unknown.
