# KURALIVO — Personas & User Journeys

## Persona A — Solo content operator
**Goal:** Produce useful, compliant content without repeating every task manually.  
**Constraints:** Limited budget, limited time, uncertain affiliate eligibility, faceless-first preference.  
**Needs:** Clear next action, reusable templates, source tracking, editable outputs, manual control.

## Persona B — Viewer / potential buyer
**Goal:** Understand whether a product may fit their needs.  
**Needs:** Accurate features, fair limitations, transparent affiliate relationship, no fabricated review or personal experience.  
**Note:** This person interacts with the separate public account, not necessarily with KURALIVO directly.

## Persona C — Future creator (hypothesis only)
**Goal:** Produce quality content more efficiently.  
**Status:** Not a validated customer segment. Do not build creator-facing SaaS until interviews or behavior demonstrate demand.

## Primary journey: create one content package
1. **Start:** Operator opens the workspace or template set.
   - UI: clear “New content project” action and recent drafts.
   - Success: new project exists.
2. **Define:** Enter product, audience, problem, channel, language, content goal, CTA, and constraints.
   - UI: guided brief with helpful examples and optional fields.
   - Error prevention: warn if product/source context is missing.
3. **Verify:** Add official listing/source URLs, facts, limitations, and asset permissions.
   - UI: source table with date checked and confidence.
   - Gate: unsupported claims are marked “unverified,” not presented as fact.
4. **Plan:** Generate multiple angles and choose one.
   - UI: comparable angle cards with hook, audience problem, evidence, and risk.
5. **Draft:** Generate script, storyboard, visual directions, caption, CTA, and disclosures.
   - UI: editable sections with copy/export controls.
6. **Review:** Check factual claims, product match, rights, AI disclosure, affiliate disclosure, and channel rules.
   - UI: checklist with pass / needs attention / not applicable.
   - Gate: approval requires a human action.
7. **Export:** Package approved content for the separate publishing account.
   - UI: copy-ready content bundle and asset manifest.
8. **Publish manually:** Operator posts through the authorized platform interface.
   - UI: mark published and enter the actual URL/date.
9. **Learn:** Enter source metrics and a brief interpretation.
   - UI: separate observed data from hypotheses; “not recorded” when missing.
10. **Next experiment:** Choose one variable to test next.
   - UI: recommendation is a hypothesis, not a guarantee.

## Alternate journeys
- **No affiliate eligibility:** continue making useful non-shoppable content; do not invent links or imply commission.
- **Missing product source:** save project as Researching; do not approve claim-heavy content.
- **Rights unclear:** replace asset or pause the content.
- **Draft rejected:** show specific issues and return to Draft/Needs Changes.
- **Integration unavailable:** use manual export and clearly label the integration Not connected.
- **No performance data:** record the post, leave metrics blank, and avoid fabricated charts.

## Journey-level measures
- Completion rate from brief to approved draft.
- Median time to first usable draft.
- Number of corrections required.
- Percentage of published assets with complete source/disclosure checks.
- Percentage of experiments with actual source metrics and a recorded learning.
