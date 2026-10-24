# Kuralivo Remote MCP Worker

A small, cloud-hosted MCP tool server for Kuralivo. It is designed to run on Cloudflare Workers and be called from a compatible chat/agent host. No local desktop, dedicated device, or local model is required for the hosted service.

## Current tools

- `kuralivo_status` — capability and boundary report.
- `create_content_brief` — structures a content brief and lists facts that still need verification.
- `build_content_prompt` — builds a prompt that can be passed to an external model; it does not run inference itself.
- `content_review_checklist` — provides a human-review checklist.

## Architecture decision

Kuralivo is not intended to recreate ChatGPT or host several large models itself. A compatible chat host handles the conversation and, where supported, model selection and tool orchestration. External MCP integrations should initially be connected directly to that host. Kuralivo supplies its own content-specific tools and prompts.

This keeps heavy model execution and provider infrastructure outside Kuralivo. A local desktop or device is not required for the deployed Worker, although a particular host may require a desktop client or may not support remote MCP. Confirm host compatibility before choosing the final user-facing connection flow.

## Important limitations

This is an initial stateless MCP prototype, not a production-ready account connector.

- No login/OAuth or per-user authorization has been added yet.
- No provider credentials are stored or managed.
- No external MCP servers are proxied through Kuralivo.
- No model inference, chat history, database, billing, or user workspace is implemented.
- The MCP endpoint exposes content utilities that do not perform external side effects. Do not add sensitive user data until authentication and access controls are implemented.

## Local test

Requires Node.js and npm. From this directory:

```sh
npm install
npm run typecheck
npm run dev
```

The Worker should be reachable locally at `http://localhost:8787`, with the MCP endpoint at `http://localhost:8787/mcp`. Use MCP Inspector or another compatible MCP client to connect and list tools.

## Deploy

After installing dependencies and confirming the project builds:

```sh
npx wrangler login
npm run deploy
```

This deploys to the Cloudflare account selected by Wrangler. The final `workers.dev` URL is assigned by Cloudflare; do not assume it until deployment output confirms it. Do not commit secrets.

## Production gate

Before calling this production-ready, add authentication/OAuth, verify the target host supports remote MCP, test list-tools and every tool invocation, add abuse/rate controls, and confirm logs contain no sensitive inputs. Deployment and live connectivity must be verified separately.
