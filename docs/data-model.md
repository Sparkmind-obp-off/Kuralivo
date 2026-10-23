# KURALIVO — Data Model

**Status:** Logical schema proposal; not a database migration.

## Entities

### Project
- id (stable ID)
- name
- objective
- channel
- language
- audience
- audience_problem
- CTA
- constraints
- status
- created_at, updated_at

### ProductBrief
- id, project_id
- product_name, seller_name
- official_listing_url
- category
- intended_use
- verified_features
- limitations
- seller_terms_url
- affiliate_program_status (unknown / available / not eligible / approved)
- checked_at

### EvidenceItem
- id, project_id
- claim_text
- source_url
- source_type
- source_title
- date_checked
- confidence (unverified / supported / conflicting / rejected)
- limitation_notes
- permission_notes

### ContentAsset
- id, project_id
- asset_type (hook / script / storyboard / visual_direction / voiceover / caption / CTA / disclosure / other)
- content
- prompt_version
- source_evidence_ids
- status
- generated_at
- edited_at

### ReviewRecord
- id, asset_id
- checklist_version
- item_results
- issues
- reviewer_id (optional in single-user mode)
- decision (needs_changes / approved)
- reviewed_at

### Publication
- id, project_id, asset_bundle_id
- platform
- post_url
- published_at
- format
- disclosure_checked
- status

### MetricObservation
- id, publication_id
- metric_name
- value
- unit
- source_name
- source_url_or_reference
- period_start, period_end
- recorded_at
- observed_or_estimated
- notes

### Experiment
- id, project_id
- hypothesis
- variable_tested
- comparison
- start_date, end_date
- outcome_summary
- next_decision
- evidence_metric_ids

### PromptTemplate
- id, name, purpose
- version
- input_schema
- prompt_body
- output_schema
- guardrails
- active

## Integrity rules
- No published status without a publication record.
- No Approved status without a human review decision.
- Every metric observation requires a source and period or an explicit explanation of why unavailable.
- Never overwrite historical metric observations; append new observations or corrections with notes.
- Store source dates because product details and platform rules can change.
- Avoid collecting personal data that is not needed for content production.

## Proposed relationships
Project 1:N ProductBrief, EvidenceItem, ContentAsset, Publication, Experiment.  
ContentAsset 1:N ReviewRecord.  
Publication 1:N MetricObservation.  
Experiment N:M MetricObservation (via evidence references).

## Implementation note
IDs, constraints, indexes, and migrations must be adapted to the actual storage technology before coding. This document alone does not mean a schema exists.
