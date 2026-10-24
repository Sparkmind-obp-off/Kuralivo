import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { bodyLimit } from 'hono/body-limit'
import masterPrompt from '../docs/MASTER_SYSTEM_PROMPT.md?raw'
import {
  EVIDENCE_CLASSES, STAGES, PILLARS, FORMATS, HOOK_PATTERNS, DISCLOSURE_TEMPLATES,
  reviewProject, suggestStages, buildMatrix, draftBrief, buildPrompt, diagnose,
  type Project, type StageId,
} from './lib/kuralivo'
import { renderApp } from './page'
import { chatgptProfile, openApiSchema } from './lib/chatgpt'

const VERSION = '0.3.0'
const app = new Hono()

app.use('*', secureHeaders({ crossOriginEmbedderPolicy: false }))
app.use('/api/*', cors())
app.use('/api/*', bodyLimit({ maxSize: 256 * 1024, onError: (c) => c.json({ error: 'Payload terlalu besar (maks 256KB).' }, 413) }))

const emptyProject = (p: Partial<Project> = {}): Project => ({
  intake: p.intake || {},
  evidence: Array.isArray(p.evidence) ? p.evidence : [],
  stages: Array.isArray(p.stages) ? p.stages : [],
  assets: Array.isArray(p.assets) ? p.assets.map((a) => ({ ...a, hooks: a.hooks || [], beats: a.beats || [], evidenceIds: a.evidenceIds || [] })) : [],
  metrics: Array.isArray(p.metrics) ? p.metrics : [],
})
const isStage = (s: unknown): s is StageId => typeof s === 'string' && s in STAGES

async function json<T>(c: any): Promise<T | null> {
  try { return await c.req.json() } catch { return null }
}

app.get('/api/health', (c) =>
  c.json({
    service: 'Kuralivo Workspace',
    version: VERSION,
    status: 'prototype',
    storage: 'browser localStorage (tidak ada penyimpanan server)',
    modelCalls: false,
    externalSideEffects: false,
    note: 'Respons ini hanya menandakan server merespons. Tidak ada model AI, akun eksternal, atau MCP host yang terhubung.',
  }),
)

app.get('/api/library', (c) =>
  c.json({ evidenceClasses: EVIDENCE_CLASSES, stages: STAGES, pillars: PILLARS, formats: FORMATS, hooks: HOOK_PATTERNS, disclosure: DISCLOSURE_TEMPLATES }),
)

app.get('/api/master-prompt', (c) => c.text(masterPrompt))

app.post('/api/journey', async (c) => {
  const b = await json<any>(c)
  if (!b) return c.json({ error: 'Body JSON tidak valid.' }, 400)
  const p = emptyProject(b)
  const stages = p.stages.length ? p.stages.filter(isStage) : suggestStages(p.intake)
  return c.json({ stages, matrix: buildMatrix(p.intake, stages, p.evidence) })
})

app.post('/api/brief', async (c) => {
  const b = await json<any>(c)
  if (!b) return c.json({ error: 'Body JSON tidak valid.' }, 400)
  if (!isStage(b.stage)) return c.json({ error: 'stage wajib salah satu: ' + Object.keys(STAGES).join(', ') }, 400)
  const p = emptyProject(b)
  return c.json(draftBrief(p.intake, b.stage, p.evidence, typeof b.format === 'string' ? b.format : undefined))
})

app.post('/api/review', async (c) => {
  const b = await json<any>(c)
  if (!b) return c.json({ error: 'Body JSON tidak valid.' }, 400)
  return c.json(reviewProject(emptyProject(b)))
})

app.post('/api/prompt', async (c) => {
  const b = await json<any>(c)
  if (!b) return c.json({ error: 'Body JSON tidak valid.' }, 400)
  const p = emptyProject(b.project || b)
  return c.json({ prompt: buildPrompt(p, b.assetId, b.includeSystem ? masterPrompt : undefined), note: 'Ini prompt, bukan aset jadi. Jalankan di model pilihanmu lalu review hasilnya.' })
})

app.post('/api/diagnose', async (c) => {
  const b = await json<any>(c)
  if (!b) return c.json({ error: 'Body JSON tidak valid.' }, 400)
  return c.json(diagnose(b))
})

app.get('/favicon.ico', (c) => c.redirect('/static/favicon.svg', 301))
app.get('/api/chatgpt-profile', (c) => c.json(chatgptProfile(new URL(c.req.url).origin)))
app.get('/openapi.json', (c) => c.json(openApiSchema(new URL(c.req.url).origin)))
app.get('/privacy', (c) => c.html('<!doctype html><meta charset="utf-8"><title>Kuralivo — Privasi</title><body style="font-family:system-ui;max-width:680px;margin:40px auto;padding:0 16px;line-height:1.6"><h1>Kebijakan Privasi Kuralivo (prototype)</h1><p>API Kuralivo memproses data yang dikirim per permintaan untuk menghasilkan journey, brief, review, prompt, dan diagnosis. Data <b>tidak disimpan</b> di server dan tidak dikirim ke pihak ketiga. Workspace web menyimpan proyek hanya di localStorage browser Anda.</p><p>Cloudflare dapat mencatat metadata permintaan standar (mis. IP, waktu) sesuai kebijakan Cloudflare. Jangan kirim data pribadi sensitif atau rahasia.</p><p>Dokumen ini placeholder dan perlu ditinjau pemilik/legal sebelum penggunaan publik.</p><p><a href="/">Kembali</a></p></body>'))

app.get('/', (c) => c.html(renderApp(VERSION)))

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))
app.all('*', (c) => c.html('<p>Halaman tidak ditemukan. <a href="/">Kembali ke Kuralivo</a></p>', 404))

export default app
