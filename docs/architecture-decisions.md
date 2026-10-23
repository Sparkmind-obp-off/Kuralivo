# KURALIVO — Architecture Decision Records

## ADR-001: Internal engine before public SaaS
**Status:** Accepted  
**Context:** Repeatable workflow and external demand are not yet proven.  
**Decision:** Start with an internal content workflow; defer public SaaS, marketplace, billing, and multi-tenant features.  
**Consequence:** Lower cost and faster learning; external-user functionality is intentionally limited.

## ADR-002: Separate engine from affiliate account
**Status:** Accepted  
**Decision:** KURALIVO is the internal content engine. A separate public affiliate account will be named later.  
**Consequence:** Publishing identity, eligibility, and link status are tracked separately from the engine.

## ADR-003: Manual publishing first
**Status:** Accepted  
**Decision:** Export content and publish manually until an official supported integration is verified and justified.  
**Consequence:** More manual work, less integration and policy risk.

## ADR-004: Evidence-first claims
**Status:** Accepted  
**Decision:** Record source URLs/dates, mark uncertainty, and require human review before publication.  
**Consequence:** Review takes time but reduces unsupported claims.

## ADR-005: Provider-neutral AI adapter
**Status:** Proposed  
**Decision:** If AI integration is implemented, isolate provider-specific code behind a small adapter and keep manual fallback.  
**Consequence:** Easier provider changes, with modest abstraction cost.
