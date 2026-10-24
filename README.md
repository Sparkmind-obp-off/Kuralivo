# KURALIVO — AI Content Journey Workspace + Remote MCP

**KURALIVO is a lightweight AI Content Journey & Production Workspace in the HOLBERY ecosystem.** It turns a real product, idea, or marketing goal into an evidence-backed journey of content assets—from research and planning through production, review, publishing, and measurement. It is not intended to be a new general-purpose AI platform.

## URLs
- **Production**: https://kuralivo.pages.dev
- **Profil ChatGPT**: https://kuralivo.pages.dev/api/chatgpt-profile
- **OpenAPI (GPT Action)**: https://kuralivo.pages.dev/openapi.json · Privasi: https://kuralivo.pages.dev/privacy
- **GitHub**: https://github.com/Sparkmind-obp-off/Kuralivo

## Workspace v0.3 (Hono + Cloudflare Pages) — status
| Item | Status |
|---|---|
| Workspace web app (7 langkah) | **Implemented & tested locally** (sandbox `wrangler pages dev`) |
| Push ke GitHub `Sparkmind-obp-off/Kuralivo` | Lihat riwayat commit `main` |
| Deploy Cloudflare Pages (BYOK) | **Live** — project `kuralivo`, diverifikasi dengan curl 2026-10-24 |
| Profil ChatGPT (Custom GPT, Custom Instructions, OpenAPI Action) | **Implemented** — harus ditempel manual di ChatGPT; belum diuji dari GPT Builder |
| Model AI / akun eksternal / auto-publish | **Tidak ada** (by design) |
| Penyimpanan server | **Tidak ada** — data hanya di localStorage browser + export/import JSON |

### Fitur yang sudah selesai
1. **Intake** — tujuan, aksi audiens, produk + URL listing, audiens, channel, format, tahap journey, bahasa/tone, batasan, deadline, metrik, toggle affiliate.
2. **Evidence ledger** — 6 kelas bukti (terverifikasi, klaim penjual, independen, pengalaman langsung, hipotesis, belum diketahui), URL sumber, tanggal cek, caveat, panduan cara publikasi per kelas.
3. **Journey & matriks konten** — Discover → Understand → Evaluate → Decide → After purchase; saran tahap dari intake; matriks pilar × tahap × pertanyaan × format × hook × bukti × CTA × metrik; tombol "Brief" per baris.
4. **Brief produksi** — draft otomatis (hook, beat-by-beat, visual, teks layar, narasi, caption, CTA, disclosure, hak aset), tautan ke bukti, tanda "disetujui manusia".
5. **Review gate** — status `Ready` / `Needs evidence` / `Needs human review`; cek bukti tanpa sumber, data harga/stok basi (>14 hari), aset memakai hipotesis/unknown, disclosure affiliate, frasa berisiko (jaminan, superlatif, urgensi palsu, klaim kesehatan/penghasilan, testimoni, klaim pengalaman pribadi), hak aset, aksesibilitas; plus checklist manual.
6. **Prompt builder** — prompt untuk model eksternal yang hanya mengizinkan fakta dari ledger; opsional menyertakan master system prompt.
7. **Ukur & belajar** — catat metrik aktual + sumber + jendela waktu; diagnosis titik friksi (retensi, pemahaman, CTA, konversi) dengan caveat sampel kecil & non-kausal.
8. **Profil ChatGPT** — `/api/chatgpt-profile` (nama, deskripsi, instruksi GPT ±5.4k karakter, conversation starters, Custom Instructions ≤1.500 karakter), `/openapi.json` untuk GPT Actions, `/privacy`.
9. Multi-proyek, export/import JSON, export laporan Markdown, contoh data **fiktif** berlabel.

### Entry URI
| Path | Method | Keterangan |
|---|---|---|
| `/` | GET | Workspace (SPA, hash routes `#intake` `#evidence` `#journey` `#production` `#review` `#prompt` `#measure`) |
| `/api/health` | GET | Status layanan (jujur: tanpa model/akun eksternal) |
| `/api/library` | GET | Kelas bukti, tahap, pilar, format, pola hook, template disclosure |
| `/api/master-prompt` | GET | Teks `docs/MASTER_SYSTEM_PROMPT.md` |
| `/api/journey` | POST | `{intake, evidence, stages?}` → `{stages, matrix}` |
| `/api/brief` | POST | `{intake, evidence, stage, format?}` → draft brief |
| `/api/review` | POST | Project JSON → `{status, findings, summary}` |
| `/api/prompt` | POST | `{project, assetId?, includeSystem?}` → `{prompt}` |
| `/api/diagnose` | POST | Metrik → `{friction, caveats}` |
| `/static/legacy/landing.html`, `/static/legacy/prompt-studio.html` | GET | Halaman lama (dipindah dari root) |

### Data model
`Project { intake, evidence[], stages[], assets[], metrics[] }` — lihat `src/lib/kuralivo.ts`. Logika deterministik, tanpa panggilan model, tanpa efek samping eksternal. Body API dibatasi 256KB.

### Jalankan lokal
```sh
npm install
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000   # atau: pm2 start ecosystem.config.cjs
```

### Deploy (Cloudflare Pages, akun sendiri)
```sh
export CLOUDFLARE_API_TOKEN=...          # token dengan izin Cloudflare Pages: Edit
npx wrangler pages project create kuralivo --production-branch main
npm run deploy:prod
```
URL `*.pages.dev` baru dianggap live setelah output deploy & `curl` mengonfirmasinya.

### Belum diimplementasikan / langkah berikutnya
- Uji GPT Action dari ChatGPT GPT Builder (import `/openapi.json`) dan catat hasilnya.
- Penyimpanan server (D1) & akun pengguna — hanya setelah workflow manual terbukti berguna.
- Menghubungkan workspace ke MCP worker (`mcp-worker/`) dan menguji dengan satu host MCP.
- Pilot dengan satu produk affiliate nyata (Phase 4 roadmap).
- Tailwind via CDN → build Tailwind untuk produksi.

## Product direction
The product direction is now:
1. **Content Journey Engine** — decide what content is needed, for whom, at which journey stage, and why.
2. **Content Production Layers** — assemble reusable hooks, story structures, scripts, visuals, captions, CTAs, formats, and prompts.
3. **Evidence & Accountability** — separate verified facts, seller claims, independent evidence, real experience, assumptions, and unknowns; check claims and disclosures before use.
4. **MCP-first external tools** — connect mature design, research, and production providers directly through a compatible host when possible. Kuralivo's custom MCP should focus on unique content workflow tools rather than recreate external providers.

Initial use case: **affiliate content**, expandable to education, product marketing, awareness, lead generation, retention, and other content types.

## Master prompt and roadmap
- [Master System Prompt](docs/MASTER_SYSTEM_PROMPT.md) — Kuralivo's role, workflow, evidence rules, tool-use policy, affiliate integrity, and output standards.
- [Product Roadmap](docs/ROADMAP.md) — phased delivery with acceptance criteria and current-state limitations.
- [Content Journey & Design Reference Research](docs/content-journey-research.md)

## Research and design references
- [GetLayers AI MCP](https://www.getlayers.ai/mcp) — reference for MCP-mediated design library and production workflows.
- [Godly Design Inspiration](https://godly.design/)
- [Landdding](https://landdding.com/)
- [Font In Logo](https://www.fontinlogo.com/)
- [60fps.design](https://60fps.design/)

References are for learning patterns, not copying protected assets. Confirm licences and actual tool access before using external services.

## Try the browser prototype
- [Open Kuralivo Prompt Studio (legacy)](public/static/legacy/prompt-studio.html) — browser-only prompt builder. It does not call a model or save data to a server.

## Remote MCP worker
- [MCP Worker implementation and setup](mcp-worker/README.md)
- Source: [mcp-worker/src/index.ts](mcp-worker/src/index.ts)

The first remote MCP prototype exposes:
- `kuralivo_status`
- `create_content_brief`
- `build_content_prompt`
- `content_review_checklist`

The worker is designed for Cloudflare's hosted environment, so a deployed service does not require a dedicated desktop or extra local device. A compatible chat/agent host is still needed to connect to a remote MCP endpoint. The host/provider is responsible for model execution; Kuralivo's prompt tool does not itself call a model.

**Important:** the Worker has been added to the repository but has not been verified as built, deployed, authenticated, or connected to a live host. The initial endpoint has no OAuth or per-user access control and exposes only content utility tools. Do not treat it as production-ready until authentication, host compatibility, live MCP tool calls, and abuse controls have been tested.

## Content operating loop
Goal → product/evidence dossier → audience and journey map → content matrix → production brief → draft → fact/rights/disclosure review → manual publish → metrics → learning.

Content should help people make informed decisions, not merely mass-produce posts. For product content, document what was actually tested and what was not; don't imply personal experience that does not exist. Google's people-first content guidance similarly emphasizes usefulness, originality, accuracy, and transparent context about who/how/why content was made: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Proposed future MCP tools (not yet implemented/verified)
- `content_intake` — capture objective, product, audience, platform, constraints.
- `evidence_ledger` — organize claims, source URLs, timestamps, rights, and unknowns.
- `journey_mapper` — recommend stages and content gaps.
- `content_matrix` — map pillar × journey stage × format × channel.
- `production_brief` — produce a shoot/design brief for one asset.
- `prompt_for_format` — create format-specific prompts with evidence boundaries.
- `claim_and_disclosure_review` — flag unsupported claims and missing disclosures.
- `repurpose_plan` — adapt approved source material to other formats.
- `experiment_log` — record performance and learnings without overclaiming.

These are proposed scope only; do not represent them as implemented.

## Guardrails
- AI output is a draft, not evidence or approval.
- Never fabricate product features, prices, results, testimonials, scarcity, personal use, commissions, or earnings.
- Track asset rights, source dates, and required disclosures.
- Keep publishing manual until permissions, review, and failure handling are verified.
- Keep secrets out of prompts, logs, and Git.
- Do not claim an integration, account approval, deployment, or revenue is live without verification.

## Ecosystem
- HOLBERY: parent and product factory.
- KURALIVO: content journey, production workflow, and focused MCP toolset.
- Separate affiliate account: public distribution and monetization channel; name TBD.
- Bozq One System remains private and separate.
