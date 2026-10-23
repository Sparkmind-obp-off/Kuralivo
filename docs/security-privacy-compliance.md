# KURALIVO — Security, Privacy & Content Compliance

## Security baseline
- Never commit API keys, tokens, cookies, passwords, OTPs, or session secrets.
- Store credentials only in server-side secret management if a backend exists.
- Never expose provider keys in browser code or frontend bundles.
- Use least privilege and official OAuth/integration flows.
- Validate inputs, URLs, and uploads; limit file type and size if uploads exist.
- Treat imported listing text, webpages, prompts, and model output as untrusted.
- Never automatically execute model-generated code or external actions.
- Redact secrets and unnecessary personal information from logs.
- Back up important content and test recovery if persistence is implemented.

## Privacy
Collect only information needed to create and evaluate content. Avoid storing buyer personal data in the MVP. Before adding integrations, document what data is sent to the provider, retention, deletion, and access rules. Do not use private or restricted community data without authorization.

## Content integrity
- No fabricated product features, certifications, results, prices, discounts, urgency, testimonials, reviews, unboxing, personal use, commissions, or earnings.
- Generated product visuals must not misrepresent the actual item.
- Record permission/usage basis for footage, images, music, logos, fonts, voices, and likenesses.
- Apply current platform rules for AI-generated/altered content and affiliate disclosure.
- Verify destination URLs and offer terms before publishing.
- Never imply eligibility, links, sales, commissions, or payout without confirmation.
- A human reviews the final rendered asset before publication.

## Policy note
Rules vary by platform, account, location, product, and affiliate program. Check current official policies at time of use. This is an operational checklist, not legal advice or a guarantee of compliance.

## Incident response
1. Pause the affected campaign/asset.
2. Preserve relevant versions and source notes without retaining secrets.
3. Identify the claim, rights, disclosure, or security issue.
4. Correct/remove the asset through authorized controls.
5. Rotate exposed credentials if a secret may have leaked.
6. Record cause and prevention.
7. Resume only after a responsible human confirms resolution.
