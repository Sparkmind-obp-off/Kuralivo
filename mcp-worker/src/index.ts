import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

const serverVersion = "0.1.0";

function createServer() {
  const server = new McpServer({
    name: "kuralivo",
    version: serverVersion,
  });

  server.registerTool(
    "kuralivo_status",
    {
      description:
        "Returns the current Kuralivo MCP capability and deployment boundaries. Does not claim that external providers are connected.",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name: "Kuralivo",
              version: serverVersion,
              status: "prototype",
              hosting: "remote Cloudflare Worker",
              requiresLocalDesktop: false,
              provides: [
                "content brief structuring",
                "reusable prompts for external AI hosts",
                "human-review checklist",
              ],
              doesNotProvideYet: [
                "built-in model inference",
                "provider OAuth and account linking",
                "external MCP proxy or aggregation",
                "persistent workspace storage",
              ],
              note:
                "Connect this remote MCP endpoint from a compatible host. Models and external tools run through that host/provider; Kuralivo does not run a local model.",
            },
            null,
            2,
          ),
        },
      ],
    }),
  );

  server.registerTool(
    "create_content_brief",
    {
      description:
        "Turns a product and audience description into a structured, evidence-conscious content brief.",
      inputSchema: {
        product: z.string().min(1).max(240).describe("Product or offer name"),
        audience: z.string().min(1).max(500).describe("Intended audience"),
        platform: z
          .enum(["TikTok", "Instagram", "YouTube Shorts", "Facebook", "General"])
          .default("General"),
        objective: z
          .string()
          .max(300)
          .default("Explain the offer clearly and help the audience decide"),
        verifiedFacts: z
          .array(z.string().max(500))
          .max(20)
          .default([])
          .describe("Facts confirmed from reliable sources; leave empty if unknown"),
        constraints: z.array(z.string().max(300)).max(20).default([]),
      },
    },
    async ({ product, audience, platform, objective, verifiedFacts, constraints }) => {
      const brief = {
        product,
        audience,
        platform,
        objective,
        verifiedFacts,
        unknownsToVerify: verifiedFacts.length
          ? ["Confirm facts remain current before publication"]
          : [
              "Product features and limitations",
              "Current price, availability, and terms",
              "Affiliate eligibility and link validity, if applicable",
              "Usage rights for product images, logos, and other assets",
            ],
        constraints,
        guardrails: [
          "Do not invent features, prices, testimonials, personal experience, scarcity, or outcomes.",
          "Mark unsupported claims as questions to verify rather than presenting them as facts.",
          "Review platform rules, disclosure requirements, and asset rights before publishing.",
          "Human approval is required before publication.",
        ],
      };

      return {
        content: [{ type: "text", text: JSON.stringify(brief, null, 2) }],
      };
    },
  );

  server.registerTool(
    "build_content_prompt",
    {
      description:
        "Builds a copy-ready prompt for an external AI model to create a content package from a brief. This tool builds a prompt; it does not call a model.",
      inputSchema: {
        brief: z.string().min(1).max(12000).describe("Structured brief or verified source notes"),
        format: z
          .enum(["short-video", "caption", "carousel", "product-comparison", "content-plan"])
          .default("short-video"),
        tone: z.string().max(160).default("clear, natural, helpful, not exaggerated"),
        variants: z.number().int().min(1).max(5).default(3),
      },
    },
    async ({ brief, format, tone, variants }) => {
      const prompt = [
        "You are helping create accurate, audience-first marketing content.",
        "Use only the supplied brief as factual grounding. Do not invent missing facts.",
        "If important information is missing, list questions to verify instead of guessing.",
        "Do not fabricate testimonials, personal use, product outcomes, pricing, scarcity, or earnings.",
        "Clearly separate confirmed facts, assumptions, and creative suggestions.",
        "",
        `FORMAT: ${format}`,
        `TONE: ${tone}`,
        `VARIANTS: ${variants}`,
        "",
        "BRIEF / SOURCE NOTES:",
        brief,
        "",
        "OUTPUT:",
        "1. State any factual gaps or risks first.",
        "2. Create the requested variants.",
        "3. For each variant, include the hook, main copy/script, suggested visual direction, CTA, and claims requiring verification.",
        "4. Add a final human-review checklist for accuracy, asset rights, platform policy, and affiliate disclosure where relevant.",
        "5. Do not publish, schedule, message, or purchase anything.",
      ].join("\n");

      return { content: [{ type: "text", text: prompt }] };
    },
  );

  server.registerTool(
    "content_review_checklist",
    {
      description:
        "Returns a practical pre-publication review checklist for AI-assisted marketing content.",
      inputSchema: {
        platform: z
          .enum(["TikTok", "Instagram", "YouTube Shorts", "Facebook", "General"])
          .default("General"),
        affiliate: z.boolean().default(false),
      },
    },
    async ({ platform, affiliate }) => {
      const items = [
        "Every factual product claim is supported by a current, checkable source.",
        "Price, stock, terms, and links have been checked recently where applicable.",
        "Visuals, music, logos, and product assets have permitted usage rights.",
        "The content does not imply personal use or results that did not happen.",
        "The content follows the selected platform's current rules.",
        "A human has reviewed and approved the final version.",
      ];
      if (affiliate) {
        items.push(
          "Affiliate relationship and compensation are disclosed clearly where viewers can notice them.",
          "The affiliate program and link are active and the content complies with its terms.",
        );
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ platform, checklist: items, publishAutomatically: false }, null, 2),
          },
        ],
      };
    },
  );

  return server;
}

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/health") {
      return Response.json({
        service: "Kuralivo MCP",
        version: serverVersion,
        status: "prototype",
        mcpEndpoint: "/mcp",
        requiresLocalDesktop: false,
        note: "This health response confirms the Worker is responding, not that an MCP client or external provider is connected.",
      });
    }

    if (url.pathname !== "/mcp") {
      return Response.json({ error: "Not found", mcpEndpoint: "/mcp" }, { status: 404 });
    }

    return createMcpHandler(createServer())(request, env, ctx);
  },
};
