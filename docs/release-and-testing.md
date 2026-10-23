# KURALIVO — Release & Testing Plan

## Testing layers
- Content checks: required sections, source references, safety notes.
- Unit tests: schemas, state transitions, calculations, formatting if code exists.
- Integration tests: provider adapter, persistence, export, authentication only if implemented.
- End-to-end: brief → evidence → draft → review → approval → export → publication/metrics log.
- Security: secret exposure, authorization, validation, upload limits, log redaction.
- Accessibility: keyboard flow, labels, focus, contrast, responsive behavior.
- Manual acceptance: operator can complete a content package without a developer.

## Critical cases
1. Generation alone cannot mark content Approved.
2. Missing evidence is visibly identified.
3. Unsupported claims are flagged.
4. Missing metrics do not show as zero or fabricated values.
5. Failed AI calls do not erase user input.
6. Retries do not create unintended duplicates.
7. Export includes the final approved version and disclosure reminders.
8. Unverified affiliate URLs are not labelled active.
9. If multi-user access exists, users cannot access another workspace's records.
10. No provider secret is exposed in frontend bundles, logs, or Git history.

## Definition of done
Acceptance criteria pass; known limitations documented; live service state verified; no unresolved critical safety/security issue; recovery plan exists for persistent changes; labels match actual capability.

A repository commit is not a deployment. Verify each live capability independently.
