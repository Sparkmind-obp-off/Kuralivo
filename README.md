# KURALIVO — AI Content Workflow + Remote MCP

**KURALIVO is a lightweight AI-assisted content workflow in the HOLBERY ecosystem.** It is being shaped as a chat-callable toolset, not a new general-purpose AI platform. Heavy model inference and unrelated integrations should remain with mature external providers wherever possible.

## Try the browser prototype
- [Open Kuralivo Prompt Studio](workspace.html) — browser-only prompt builder. It does not call a model or save data to a server.

## Remote MCP worker
- [MCP Worker implementation and setup](mcp-worker/README.md)
- Source: [mcp-worker/src/index.ts](mcp-worker/src/index.ts)

The first remote MCP prototype exposes:
- `kuralivo_status`
- `create_content_brief`
- `build_content_prompt`
- `content_review_checklist`

The worker is designed to run in Cloudflare's hosted environment, so the deployed service does not require a dedicated desktop or extra local device. A compatible chat/agent host is still needed to connect to a remote MCP endpoint. The host/provider is responsible for model execution; Kuralivo's prompt tool does not itself call a model.

**Important:** the Worker has been added to the repository but has not been verified as built, deployed, authenticated, or connected to a live host. The initial endpoint has no OAuth or per-user access control and exposes only content utility tools. Do not treat it as production-ready until authentication, host compatibility, live MCP tool calls, and abuse controls have been tested.

## Product direction
Keep Kuralivo small:
1. Kuralivo provides focused content tools and reusable workflows.
2. Connect mature external MCP providers directly in the chat host when supported.
3. Add a Kuralivo gateway/proxy only if real integration constraints make direct connections insufficient.
4. Do not build multi-model hosting, a universal connector registry, billing, or a giant internal AI stack before validated need.

## Evidence-first operating loop
Brief → verified facts → content draft → human review → manual publication → record real source metrics → improve the next experiment.

## Guardrails
- AI output is a draft, not evidence or approval.
- Never fabricate product features, prices, results, testimonials, scarcity, personal use, commissions, or earnings.
- Track asset rights, source dates, and required disclosures.
- Publish manually only when the account and platform permit it.
- Keep secrets out of prompts, logs, and Git.
- Do not claim a feature, integration, account approval, deployment, or revenue is live without verification.

## Ecosystem
- HOLBERY: parent and product factory.
- KURALIVO: content workflow and MCP toolset.
- Separate affiliate account: public distribution and monetization channel; name TBD.
- Bozq One System remains private and separate.
