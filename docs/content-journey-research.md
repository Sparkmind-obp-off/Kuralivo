# Kuralivo — Content Journey & Design Reference Research
Updated: 2026-10-24
Status: research brief / direction for later; not a claim that features are implemented.

## Purpose
Kuralivo should help turn a real offer, product, audience need, and evidence into a complete content journey—not merely generate isolated captions. The workflow must work for affiliate marketing first, but be adaptable to education, product marketing, brand awareness, lead generation, retention, and other content use cases.

The core promise: **every content asset has a purpose, audience, evidence basis, format, call to action, review checklist, and measurable next step.** AI output is a draft; it is not proof that a claim is true or that a product has been tested.

## Design references to keep for later
These are inspiration/reference sources, not requirements to copy their visual design or assets.

1. **GetLayers AI** — https://www.getlayers.ai/
   - Structured library: full templates, 3D scenes, sections, backgrounds, gradients, browser-based design tools, and MCP access.
   - Pattern worth learning from: search/browse → tune/customize → get a prompt or source asset → let an agent use the library. The official docs describe an MCP with tools for searching, planning, finding, building, and restyling.
   - Use for Kuralivo: reusable content “layers” (brief templates, story structures, hooks, CTA patterns, visual recipes, and format templates) that can be composed and adapted.
   - Do not copy proprietary prompts, source assets, or design outputs without checking licence/permission.

2. **Godly / Godly Design Inspiration** — https://godly.design/
   - Curated gallery of strong web/app/interface and visual work.
   - The supplied godly.website reference appears to have moved/redirected in current search results; preserve the original URL as given, but use the current canonical destination when actually browsing.
   - Use for Kuralivo: visual direction and layout inspiration, not content strategy or proof of marketing performance.

3. **Landdding** — https://landdding.com/
   - Landing-page inspiration library with category browsing; the site reports categories spanning multiple industries and a large collection of landing pages.
   - Use for Kuralivo: landing-page and offer-page patterns, including hero, benefits, proof, comparison, FAQ, objection handling, and CTA sections.

4. **Font In Logo** — https://www.fontinlogo.com/
   - Reference for typefaces associated with well-known brands and brand/title typography.
   - Use for Kuralivo: typography research and visual consistency. Verify font licences before using a typeface in commercial work; a font associated with a brand does not mean the brand's exact logo typeface is free to use.

5. **60fps.design** — https://60fps.design/
   - Gallery of interaction and UI animation examples from mobile and web apps.
   - Use for Kuralivo: motion references for short-form video, transitions, UI/product demos, and landing-page micro-interactions. Reinterpret rather than copy a distinctive animation or another brand's assets.

## Product direction
- Keep Kuralivo MCP-first/plugin-first where real, compatible tools exist; don't recreate mature design libraries or external AI providers.
- Use existing MCP integrations directly in a compatible host when possible. A custom Kuralivo MCP should focus on unique content workflow tools: briefs, evidence ledgers, content journeys, format-specific prompts, review gates, and performance learning.
- Do not assume every chat product/plan supports custom remote MCP, or that a connector is live merely because a URL or configuration exists. Verify host support, authorization, tool discovery, and a real tool invocation.
- Hosted/cloud use is the goal; no dedicated local desktop or extra hardware should be required for the deployed service. A compatible host is still necessary.
- The current Kuralivo repository contains a prototype prompt studio and a proposed Cloudflare Worker MCP, but its README says the worker is **not yet verified as built, deployed, authenticated, or connected to a live host**. Treat it as prototype only.

## Content journey: one complete cycle
1. **Choose the job to be done**
   - Use case: affiliate promotion, awareness, education, consideration, conversion, retention, community, launch, or brand storytelling.
   - Product/offer, platform, target audience, language, budget/resources, content cadence, and success metric.
2. **Build a product/evidence dossier**
   - Product name, seller/official listing, current price/date, features, limitations, specifications, warranty/returns, delivery terms, available media, affiliate-link/commission terms, and platform restrictions.
   - Separate verified fact, seller claim, independent evidence, personal experience, and unknown.
   - Record source URL, date checked, and any licence/permission for images or video.
3. **Define audience and intent**
   - Audience situation and need; what they already know; pain point; buying trigger; barriers/objections; and what would help them decide.
   - Avoid inventing customer interviews, search volume, sales, testimonials, or demand. Label assumptions and validate them.
4. **Map the journey**
   - Discover: identify a relevant problem or use case.
   - Understand: explain the problem, options, and criteria.
   - Evaluate: demonstrate features, compare options, answer objections, and show evidence.
   - Decide: transparent recommendation, price/terms, who it suits and does not suit, and clear CTA.
   - After purchase: setup, usage tips, troubleshooting, care, FAQs, and honest follow-up.
   - Not every product needs every stage; choose stages based on evidence and funnel goal.
5. **Choose content pillar + format**
   - Match the message to the platform, audience, stage, and available proof. One evidence-backed idea can be adapted into multiple formats without blindly duplicating the same post.
6. **Create a production brief**
   - One-sentence objective; audience; stage; key message; evidence; hook; beat-by-beat outline; visuals/B-roll; on-screen text; narration/caption; CTA; disclosure; aspect ratio/duration; asset checklist; and review criteria.
7. **Generate drafts**
   - Use a format-specific prompt with verified facts and explicit “do not claim” boundaries.
   - Create variants for hooks/angles, not fabricated facts or fake experiences.
8. **Review before publishing**
   - Check factual claims, dates/prices, fit, limitations, evidence, rights, disclosures, spelling, accessibility, platform rules, and CTA/link destination.
   - For affiliate content, disclose the commercial relationship clearly near the recommendation/link and in the format where viewers encounter it. Follow the target platform/program's latest rules.
9. **Publish manually at first**
   - Keep account access and publishing permissions separate from content generation. Do not auto-post until platform permissions, review, and failure handling are actually verified.
10. **Measure and learn**
    - Record post URL, platform, date, format, angle, hook, impressions/reach, watch time/completion, saves/shares/comments, clicks, conversions/commission (where available), and caveats.
    - Diagnose the stage: reach problem, retention problem, trust/consideration problem, CTA/click problem, or offer/conversion problem. Don't infer causation from one post.
11. **Update the library**
    - Keep what worked as a reusable pattern with its context and sample size; mark weak/inconclusive results honestly. Do not treat one successful post as universal proof.

## Content categories library (configurable, not a fixed checklist)
- **Awareness/discovery:** relatable problem, myth/assumption check, trend with relevant context, quick insight, “before you buy”, common mistake.
- **Education/how-to:** tutorial, checklist, explainer, setup guide, maintenance, glossary, step-by-step.
- **Demonstration:** real product demo, workflow, feature walkthrough, unboxing only if actually done, use-case simulation clearly labelled as illustrative.
- **Evaluation:** comparison, alternatives, pros/cons, buyer's guide, specifications, fit-by-user-type, price/value breakdown, limitation/FAQ.
- **Trust/evidence:** source-backed fact, transparent test methodology, real personal experience (only if true), documented update, correction, verified customer feedback with permission and context.
- **Conversion:** offer explanation, use-case recommendation, product roundup, CTA, objection response. Avoid fake scarcity or guaranteed results.
- **Post-purchase/retention:** onboarding, tips, troubleshooting, care, advanced use, frequently asked questions.
- **Community/engagement:** question, poll, audience request, response-to-comment, audience-submitted problem (with permission).
- **Brand/creator:** values, process, editorial standards, behind-the-scenes (only when real), why this recommendation is being made, affiliate disclosure.
- **Repurposing:** long-to-short summary, carousel from tutorial, FAQ from comments, article/email from video, short clip from longer demo—respect platform rules and rights.
- **Campaign/seasonal:** launch, event, seasonal need, promotion. Verify date, eligibility, and terms before publication.

## Content formats
- Short vertical video / Reel / TikTok / Shorts
- Carousel / slide explainer
- Single-image post / infographic
- Story / status / poll
- Text post / thread
- Long-form video
- Blog/article/SEO guide
- Comparison or buyer-guide page
- Email/newsletter
- Landing page/product page
- FAQ/knowledge-base entry
- Live/demo outline
- Downloadable checklist/template
Each format needs its own pacing, length, accessibility, platform constraints, and CTA; don't force one script into every channel.

## Prompt blueprint
Every generated prompt should include:
- Role and objective
- Product/offer and target audience
- Funnel stage and content pillar
- Channel and exact format
- Desired viewer action
- Verified facts and source ledger
- Claims allowed / claims prohibited / unknowns
- Real experience available (or explicitly none)
- Hook options and story structure
- Visual and audio plan
- On-screen text, caption, CTA, and disclosure
- Rights/brand constraints
- Tone/language
- Output schema
- Self-review checklist and missing-information questions

Required instruction: **If a material fact is missing, ask or mark it unknown; do not fill the gap with invented product details, reviews, personal use, outcomes, prices, commission rates, or scarcity.**

## Affiliate integrity and accountability
- State that the creator may earn a commission, in clear language near the relevant recommendation/link. Don't rely only on vague wording such as “affiliate link.”
- Do not say “I use this,” “I tested this,” or “customers love it” unless supported by genuine experience or verifiable permissioned evidence.
- Don't guarantee savings, performance, health, income, or other outcomes.
- Use only assets the creator has permission to use; check the affiliate program's rules on links, disclosures, content, platform, and paid promotion.
- Shopee Indonesia's published affiliate terms place responsibility on affiliates for content, compliance, and prohibited manipulative/spam practices; verify the latest terms for the specific program before acting.
- Keep an audit record: source, date, claim, disclosure, rights, reviewer, publication URL, correction history, and results.

## Proposed Kuralivo MCP tools (future scope; not yet implemented/verified)
1. content_intake — structure the user's objective, product, audience, platform, and constraints.
2. evidence_ledger — organize claims, sources, timestamps, rights, and unknowns.
3. journey_mapper — recommend stages and content gaps for a given offer.
4. content_matrix — map pillars × journey stage × format × channel.
5. production_brief — produce a shoot/design brief for one asset.
6. prompt_for_format — generate format-specific prompts with evidence boundaries.
7. claim_and_disclosure_review — flag unsupported claims and missing disclosures.
8. repurpose_plan — adapt approved source content into other formats.
9. experiment_log — structure performance tracking and lessons without overclaiming.
10. library_save_pattern — save reusable patterns with context, evidence, and caveats.

These tools should return structured, reusable outputs and ask for missing critical facts rather than hallucinating. They should not publish, message, buy, or change external accounts without explicit user approval.

## First practical test when resumed
Use one actual product from the user's affiliate catalog (not a made-up product) and create:
- an evidence dossier,
- a 7-day content journey with mixed formats,
- three first-post options,
- one ready-to-record short-video brief,
- disclosure and claim review,
- a simple metrics sheet.
Then compare the outputs to the real listing and platform rules before any publication.

## Sources checked
- GetLayers official site: https://www.getlayers.ai/
- GetLayers docs: https://www.getlayers.ai/docs
- Godly Design Inspiration: https://godly.design/
- Original supplied domain: https://godly.website/
- Landdding: https://landdding.com/
- Font In Logo: https://www.fontinlogo.com/
- 60fps: https://60fps.design/
- Shopee Affiliate terms for individuals: https://help.shopee.co.id/portal/4/article/71217-Syarat-dan-Ketentuan-Program-Afiliasi-Shopee-untuk-Individu
- FTC endorsement disclosure guidance (useful general principle; not Indonesian legal advice): https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
