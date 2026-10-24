// Kuralivo core logic — deterministic, no model calls, no external side effects.
// Implements the workflow defined in docs/MASTER_SYSTEM_PROMPT.md.

export type EvidenceClass =
  | 'verified'
  | 'seller_claim'
  | 'independent'
  | 'first_hand'
  | 'hypothesis'
  | 'unknown'

export type StageId = 'discover' | 'understand' | 'evaluate' | 'decide' | 'after'

export interface Intake {
  goal?: string
  audienceAction?: string
  product?: string
  productUrl?: string
  audience?: string
  channel?: string
  format?: string
  stage?: StageId | ''
  language?: string
  tone?: string
  constraints?: string
  deadline?: string
  successMetric?: string
  affiliate?: boolean
}

export interface EvidenceItem {
  id: string
  claim: string
  cls: EvidenceClass
  sourceUrl?: string
  checkedAt?: string
  caveat?: string
  usable?: boolean
}

export interface AssetBrief {
  id: string
  title: string
  stage: StageId
  pillar: string
  format: string
  channel: string
  coreMessage: string
  hooks: string[]
  beats: string[]
  visualPlan?: string
  onScreenText?: string
  narration?: string
  caption?: string
  cta?: string
  disclosure?: string
  evidenceIds: string[]
  assetsRights?: string
  approved?: boolean
}

export interface MetricEntry {
  id: string
  url?: string
  channel?: string
  date?: string
  impressions?: number
  views?: number
  avgWatchPct?: number
  saves?: number
  shares?: number
  comments?: number
  clicks?: number
  conversions?: number
  source?: string
  windowDays?: number
  notes?: string
}

export interface Project {
  intake: Intake
  evidence: EvidenceItem[]
  stages: StageId[]
  assets: AssetBrief[]
  metrics: MetricEntry[]
}

// ---------- Libraries ----------

export const EVIDENCE_CLASSES: Record<EvidenceClass, { label: string; desc: string; publishable: string }> = {
  verified: {
    label: 'Fakta terverifikasi',
    desc: 'Didukung langsung oleh sumber andal atau observasi yang tervalidasi.',
    publishable: 'Boleh dinyatakan sebagai fakta (cek ulang tanggal).',
  },
  seller_claim: {
    label: 'Klaim penjual/program',
    desc: 'Dinyatakan penjual atau program affiliate, belum dibuktikan independen.',
    publishable: 'Atribusikan: “menurut penjual…”, “di listing tertulis…”.',
  },
  independent: {
    label: 'Bukti independen',
    desc: 'Didukung sumber kredibel yang independen dari penjual.',
    publishable: 'Boleh dipakai dengan menyebut sumber.',
  },
  first_hand: {
    label: 'Pengalaman langsung',
    desc: 'Benar-benar dialami kreator dan dijelaskan akurat.',
    publishable: 'Boleh, hanya jika benar terjadi. Jangan dilebihkan.',
  },
  hypothesis: {
    label: 'Hipotesis',
    desc: 'Masuk akal tetapi belum tervalidasi.',
    publishable: 'Jangan dinyatakan sebagai fakta. Uji atau hapus.',
  },
  unknown: {
    label: 'Belum diketahui',
    desc: 'Belum ada dasar.',
    publishable: 'Jangan dipakai. Verifikasi atau tanyakan.',
  },
}

export const STAGES: Record<StageId, { label: string; purpose: string; formats: string[]; cta: string; questions: string[] }> = {
  discover: {
    label: 'Discover',
    purpose: 'Penonton menyadari masalah, kebutuhan, atau peluang.',
    formats: ['Video pendek', 'Carousel', 'Post gambar'],
    cta: 'Ikuti / simpan untuk lanjutan',
    questions: ['Masalah apa yang sering dialami audiens ini?', 'Situasi apa yang memicu kebutuhan ini?'],
  },
  understand: {
    label: 'Understand',
    purpose: 'Menjelaskan masalah, istilah, dan kriteria keputusan.',
    formats: ['Carousel edukasi', 'Video penjelasan', 'Thread'],
    cta: 'Simpan panduan ini',
    questions: ['Apa yang perlu diketahui sebelum memilih?', 'Istilah apa yang membingungkan?'],
  },
  evaluate: {
    label: 'Evaluate',
    purpose: 'Membandingkan opsi, mendemonstrasikan fitur terverifikasi, menjawab keberatan.',
    formats: ['Video demo', 'Perbandingan', 'Pros/cons', 'FAQ'],
    cta: 'Cek detail & syarat di link',
    questions: ['Apa kelebihan & keterbatasannya?', 'Cocok untuk siapa, tidak cocok untuk siapa?'],
  },
  decide: {
    label: 'Decide',
    purpose: 'Rekomendasi transparan, batas kecocokan, syarat, dan CTA.',
    formats: ['Video pendek rekomendasi', 'Story dengan link', 'Post ringkas'],
    cta: 'Cek harga terkini di link (affiliate)',
    questions: ['Apa alasan jujur untuk membeli / tidak membeli?', 'Syarat, garansi, retur apa yang berlaku?'],
  },
  after: {
    label: 'After purchase',
    purpose: 'Onboarding, setup, perawatan, troubleshooting, FAQ.',
    formats: ['Tutorial', 'FAQ', 'Checklist'],
    cta: 'Tanya di komentar / simpan tutorial',
    questions: ['Apa langkah pertama setelah barang diterima?', 'Masalah umum apa dan solusinya?'],
  },
}

export const PILLARS = [
  'Awareness', 'Edukasi', 'How-to', 'Demonstrasi', 'Perbandingan', "Buyer's guide",
  'Pros/cons', 'FAQ', 'Trust/bukti', 'Konversi', 'Pasca-pembelian', 'Komunitas', 'Repurposing',
]

export const FORMATS: Record<string, { ratio: string; length: string; notes: string }> = {
  'Video pendek': { ratio: '9:16', length: '15–45 detik', notes: 'Hook di 1–2 detik pertama, teks layar untuk tonton tanpa suara, subtitle.' },
  'Carousel': { ratio: '4:5', length: '5–10 slide', notes: 'Slide 1 = hook, 1 ide per slide, slide akhir = ringkasan + CTA + disclosure.' },
  'Post gambar': { ratio: '1:1 atau 4:5', length: '1 gambar', notes: 'Satu pesan, teks minim, alt text.' },
  'Story/status': { ratio: '9:16', length: '1–5 frame', notes: 'Disclosure di frame yang memuat link.' },
  'Thread/teks': { ratio: '-', length: '3–8 bagian', notes: 'Poin pertama memuat janji nilai yang jujur.' },
  'Video panjang': { ratio: '16:9', length: '5–12 menit', notes: 'Chapter, disclosure di awal & deskripsi.' },
  'Artikel/blog': { ratio: '-', length: '800–1.500 kata', notes: 'Sebut siapa/bagaimana/kenapa konten dibuat; sumber ditautkan.' },
  'Perbandingan': { ratio: '4:5 atau 16:9', length: 'tabel + ringkasan', notes: 'Kriteria sama untuk semua opsi; sebut sumber per baris.' },
  'FAQ': { ratio: '-', length: '5–10 pertanyaan', notes: 'Jawab dari bukti; tandai yang belum diketahui.' },
  'Email': { ratio: '-', length: '120–250 kata', notes: 'Satu CTA, disclosure dekat link.' },
}

export const HOOK_PATTERNS: Record<StageId, string[]> = {
  discover: [
    'Kalau kamu sering {masalah}, ini yang perlu kamu tahu.',
    '3 tanda kamu butuh {kategori} — nomor 2 sering dilewatkan.',
    'Kesalahan umum saat {aktivitas} yang bikin {akibat}.',
  ],
  understand: [
    'Sebelum beli {kategori}, cek 4 hal ini dulu.',
    '{istilah} itu apa sih? Penjelasan 30 detik.',
    'Yang membedakan {kategori} murah vs mahal sebenarnya ini.',
  ],
  evaluate: [
    '{produk}: yang tertulis di listing vs yang perlu kamu cek sendiri.',
    'Cocok buat siapa dan TIDAK cocok buat siapa: {produk}.',
    '{produk} vs {alternatif} — dibandingkan dengan kriteria yang sama.',
  ],
  decide: [
    'Kalau kebutuhanmu {kebutuhan}, ini opsi yang masuk akal — dan batasannya.',
    'Ringkasan jujur {produk} sebelum kamu checkout.',
    'Sebelum klik beli, cek 3 syarat ini.',
  ],
  after: [
    'Baru terima {produk}? Lakukan ini dulu.',
    '3 cara merawat {produk} supaya awet.',
    'Masalah umum {produk} dan cara mengatasinya.',
  ],
}

export const DISCLOSURE_TEMPLATES = {
  short: 'Link affiliate — saya bisa dapat komisi jika kamu membeli lewat link ini, tanpa biaya tambahan untukmu.',
  video: 'Video ini memuat link affiliate. Kalau kamu beli lewat link, saya bisa dapat komisi.',
  notTested: 'Saya belum mencoba produk ini secara langsung; informasi diambil dari listing penjual.',
}

// Phrases that typically overclaim or create false urgency (ID + EN).
export const RISKY_PHRASES: { re: RegExp; why: string }[] = [
  { re: /\b(dijamin|garansi hasil|pasti (berhasil|sembuh|untung|laku))\b/i, why: 'Janji hasil / jaminan tanpa bukti.' },
  { re: /\b(100\s?%|terbaik( di dunia| se-indonesia)?|nomor\s?1|no\.?\s?1|paling (bagus|ampuh|murah))\b/i, why: 'Klaim superlatif perlu bukti independen.' },
  { re: /\b(stok (terbatas|tinggal|hampir habis)|hari ini saja|buruan|sebelum kehabisan|promo berakhir)\b/i, why: 'Urgensi/kelangkaan harus terverifikasi saat publikasi.' },
  { re: /\b(sembuh|menyembuhkan|obat|anti(kanker|virus)|turun \d+\s?kg)\b/i, why: 'Klaim kesehatan berisiko tinggi; perlu sumber kuat & cek regulasi.' },
  { re: /\b(passive income|cuan (pasti|terus)|balik modal|penghasilan \d+)\b/i, why: 'Klaim penghasilan dilarang tanpa bukti dan konteks.' },
  { re: /\b(saya (sudah )?(pakai|coba|pake) (sendiri|selama)|udah aku (pakai|coba))\b/i, why: 'Klaim pengalaman pribadi — pastikan benar terjadi (first-hand).' },
  { re: /\b(testimoni|kata pembeli|review pelanggan|rating \d)/i, why: 'Testimoni/rating harus asli, bersumber, dan diizinkan.' },
  { re: /\b(guaranteed|best ever|miracle|limited stock|act now|risk[- ]free)\b/i, why: 'Overclaim / false urgency (EN).' },
]

// ---------- Helpers ----------

const has = (s?: string) => !!s && s.trim().length > 0
const daysBetween = (iso: string) => {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return null
  return Math.floor((Date.now() - t) / 86400000)
}

export interface Finding {
  level: 'critical' | 'warning' | 'info'
  area: string
  message: string
  ref?: string
}

export function reviewProject(p: Project): { status: 'Ready' | 'Needs evidence' | 'Needs human review'; findings: Finding[]; summary: Record<string, number> } {
  const f: Finding[] = []
  const i = p.intake || {}

  // Intake
  if (!has(i.goal)) f.push({ level: 'warning', area: 'Intake', message: 'Tujuan belum diisi.' })
  if (!has(i.audience)) f.push({ level: 'warning', area: 'Intake', message: 'Audiens belum dijelaskan.' })
  if (!has(i.product)) f.push({ level: 'warning', area: 'Intake', message: 'Produk/topik belum diisi.' })
  if (!has(i.successMetric)) f.push({ level: 'info', area: 'Intake', message: 'Metrik keberhasilan belum ditentukan.' })

  // Evidence
  const ev = p.evidence || []
  const byId = new Map(ev.map((e) => [e.id, e]))
  if (ev.length === 0) f.push({ level: 'critical', area: 'Bukti', message: 'Belum ada bukti sama sekali. Tambahkan minimal listing resmi produk.' })
  for (const e of ev) {
    if ((e.cls === 'verified' || e.cls === 'independent') && !has(e.sourceUrl))
      f.push({ level: 'critical', area: 'Bukti', message: `Klaim “${trim(e.claim)}” ditandai ${EVIDENCE_CLASSES[e.cls].label} tapi tanpa URL sumber.`, ref: e.id })
    if (e.cls === 'seller_claim' && !has(e.sourceUrl))
      f.push({ level: 'warning', area: 'Bukti', message: `Klaim penjual “${trim(e.claim)}” tanpa URL listing.`, ref: e.id })
    if (has(e.sourceUrl) && !has(e.checkedAt))
      f.push({ level: 'warning', area: 'Bukti', message: `Tanggal cek belum diisi untuk “${trim(e.claim)}”.`, ref: e.id })
    if (has(e.checkedAt)) {
      const d = daysBetween(e.checkedAt!)
      if (d !== null && d > 14 && /harga|price|rp|diskon|stok|komisi|promo/i.test(e.claim))
        f.push({ level: 'warning', area: 'Bukti', message: `Data sensitif waktu (“${trim(e.claim)}”) dicek ${d} hari lalu — cek ulang sebelum publikasi.`, ref: e.id })
    }
  }
  if (i.affiliate) {
    const hasTerms = ev.some((e) => /komisi|commission|program|affiliate|syarat/i.test(e.claim))
    if (!hasTerms) f.push({ level: 'warning', area: 'Bukti', message: 'Aturan program affiliate belum dicatat di evidence ledger.' })
  }

  // Assets
  for (const a of p.assets || []) {
    const name = a.title || a.id
    const text = [a.hooks.join(' '), a.beats.join(' '), a.onScreenText, a.narration, a.caption, a.cta].filter(Boolean).join('\n')
    if (!has(a.coreMessage)) f.push({ level: 'warning', area: `Aset: ${name}`, message: 'Pesan inti belum diisi.' })
    if (!has(a.cta)) f.push({ level: 'warning', area: `Aset: ${name}`, message: 'CTA belum diisi.' })
    if (a.evidenceIds.length === 0) f.push({ level: 'critical', area: `Aset: ${name}`, message: 'Aset tidak ditautkan ke bukti mana pun.' })
    for (const id of a.evidenceIds) {
      const e = byId.get(id)
      if (!e) f.push({ level: 'warning', area: `Aset: ${name}`, message: `Bukti ${id} tidak ditemukan.` })
      else if (e.cls === 'hypothesis' || e.cls === 'unknown')
        f.push({ level: 'critical', area: `Aset: ${name}`, message: `Memakai ${EVIDENCE_CLASSES[e.cls].label.toLowerCase()} “${trim(e.claim)}” — jangan dinyatakan sebagai fakta.`, ref: e.id })
    }
    if (i.affiliate) {
      const disc = (a.disclosure || '') + ' ' + (a.caption || '')
      if (!/komisi|affiliate|afiliasi|commission/i.test(disc))
        f.push({ level: 'critical', area: `Aset: ${name}`, message: 'Disclosure affiliate belum ada / tidak menyebut komisi secara jelas.' })
    }
    for (const r of RISKY_PHRASES) {
      const m = text.match(r.re)
      if (m) f.push({ level: 'warning', area: `Aset: ${name}`, message: `Frasa berisiko “${m[0]}”: ${r.why}` })
    }
    if (!has(a.assetsRights)) f.push({ level: 'warning', area: `Aset: ${name}`, message: 'Status hak pakai visual/musik belum dicatat.' })
    if (/video/i.test(a.format) && !has(a.onScreenText))
      f.push({ level: 'info', area: `Aset: ${name}`, message: 'Tambahkan teks layar/subtitle untuk aksesibilitas.' })
  }
  if ((p.assets || []).length === 0) f.push({ level: 'info', area: 'Produksi', message: 'Belum ada brief aset.' })

  const summary = {
    critical: f.filter((x) => x.level === 'critical').length,
    warning: f.filter((x) => x.level === 'warning').length,
    info: f.filter((x) => x.level === 'info').length,
  }
  const evidenceCritical = f.some((x) => x.level === 'critical' && (x.area === 'Bukti' || /bukti|hipotesis|belum diketahui/i.test(x.message)))
  const status = summary.critical > 0
    ? (evidenceCritical ? 'Needs evidence' : 'Needs human review')
    : summary.warning > 0 ? 'Needs human review' : 'Ready'
  return { status, findings: f, summary }
}

function trim(s: string, n = 60) {
  s = (s || '').trim()
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}

export function suggestStages(i: Intake): StageId[] {
  const g = `${i.goal || ''} ${i.audienceAction || ''}`.toLowerCase()
  if (i.stage) {
    const order: StageId[] = ['discover', 'understand', 'evaluate', 'decide', 'after']
    const idx = order.indexOf(i.stage as StageId)
    return order.slice(Math.max(0, idx - 1), idx + 2)
  }
  if (/beli|checkout|konversi|jual|klik|affiliate/.test(g)) return ['understand', 'evaluate', 'decide']
  if (/kenal|awareness|follower|jangkau/.test(g)) return ['discover', 'understand']
  if (/retensi|pelanggan|setelah|onboard/.test(g)) return ['after']
  return ['discover', 'understand', 'evaluate', 'decide']
}

export function buildMatrix(i: Intake, stages: StageId[], evidence: EvidenceItem[]) {
  const usable = evidence.filter((e) => ['verified', 'seller_claim', 'independent', 'first_hand'].includes(e.cls))
  const pillarFor: Record<StageId, string[]> = {
    discover: ['Awareness', 'Edukasi'],
    understand: ['Edukasi', "Buyer's guide"],
    evaluate: ['Demonstrasi', 'Pros/cons', 'Perbandingan'],
    decide: ['Konversi', 'Trust/bukti'],
    after: ['Pasca-pembelian', 'How-to'],
  }
  const rows = stages.flatMap((s) => {
    const st = STAGES[s]
    return pillarFor[s].slice(0, 2).map((pillar, k) => ({
      stage: s,
      stageLabel: st.label,
      pillar,
      question: st.questions[k] || st.questions[0],
      format: i.format || st.formats[k] || st.formats[0],
      channel: i.channel || 'General',
      hook: fillHook(HOOK_PATTERNS[s][k] || HOOK_PATTERNS[s][0], i),
      evidenceNeeded: s === 'discover' ? 'Sinyal masalah audiens (sumber + tanggal)' : s === 'after' ? 'Panduan resmi/manual produk' : 'Spesifikasi, syarat, keterbatasan dari listing + bukti independen',
      evidenceAvailable: usable.length,
      cta: st.cta,
      disclosure: i.affiliate && (s === 'evaluate' || s === 'decide') ? DISCLOSURE_TEMPLATES.short : i.affiliate ? 'Jika ada link affiliate: ' + DISCLOSURE_TEMPLATES.short : '-',
      effort: s === 'evaluate' ? 'Sedang–tinggi' : 'Rendah–sedang',
      metric: s === 'discover' ? 'Reach, retensi 3 detik' : s === 'understand' ? 'Saves, watch time' : s === 'evaluate' ? 'Komentar pertanyaan, klik' : s === 'decide' ? 'Klik link, konversi' : 'Saves, pertanyaan berkurang',
    }))
  })
  return rows
}

function fillHook(t: string, i: Intake) {
  return t
    .replace(/\{produk\}/g, i.product || '[produk]')
    .replace(/\{kategori\}/g, i.product || '[kategori]')
    .replace(/\{[^}]+\}/g, (m) => `[${m.slice(1, -1)}]`)
}

export function draftBrief(i: Intake, stage: StageId, evidence: EvidenceItem[], format?: string): Omit<AssetBrief, 'id'> {
  const st = STAGES[stage]
  const fmt = format || i.format || st.formats[0]
  const usable = evidence.filter((e) => ['verified', 'seller_claim', 'independent', 'first_hand'].includes(e.cls))
  const notTested = !evidence.some((e) => e.cls === 'first_hand')
  const beats = /video/i.test(fmt)
    ? [
        '0–2 dtk: Hook (masalah/pertanyaan audiens), teks layar besar.',
        '2–8 dtk: Konteks — siapa yang mengalami dan kenapa penting.',
        '8–25 dtk: 2–3 poin dari bukti yang disetujui (sebut sumber: “di listing tertulis…”).',
        '25–35 dtk: Keterbatasan / tidak cocok untuk siapa.',
        `Penutup: CTA (${st.cta})${i.affiliate ? ' + disclosure lisan & teks.' : '.'}`,
      ]
    : /carousel/i.test(fmt)
    ? ['Slide 1: Hook.', 'Slide 2: Masalah/konteks.', 'Slide 3–5: Poin dari bukti (1 poin per slide, sumber kecil di bawah).', 'Slide 6: Keterbatasan & cocok untuk siapa.', `Slide 7: Ringkasan + CTA${i.affiliate ? ' + disclosure' : ''}.`]
    : ['Pembuka: hook.', 'Isi: poin dari bukti yang disetujui.', 'Batasan & kecocokan.', `Penutup: CTA${i.affiliate ? ' + disclosure' : ''}.`]
  return {
    title: `${st.label} — ${fmt}${i.product ? ' — ' + i.product : ''}`,
    stage,
    pillar: stage === 'evaluate' ? 'Pros/cons' : stage === 'decide' ? 'Konversi' : stage === 'after' ? 'Pasca-pembelian' : 'Edukasi',
    format: fmt,
    channel: i.channel || 'General',
    coreMessage: '',
    hooks: HOOK_PATTERNS[stage].map((h) => fillHook(h, i)),
    beats,
    visualPlan: FORMATS[fmt]?.notes || '',
    onScreenText: '',
    narration: notTested && i.affiliate ? DISCLOSURE_TEMPLATES.notTested : '',
    caption: '',
    cta: st.cta,
    disclosure: i.affiliate ? (/video/i.test(fmt) ? DISCLOSURE_TEMPLATES.video : DISCLOSURE_TEMPLATES.short) : '',
    evidenceIds: usable.map((e) => e.id),
    assetsRights: '',
    approved: false,
  }
}

export function buildPrompt(p: Project, assetId?: string, systemPrompt?: string) {
  const i = p.intake || {}
  const asset = p.assets.find((a) => a.id === assetId)
  const allowed = (p.evidence || []).filter((e) => ['verified', 'independent', 'first_hand', 'seller_claim'].includes(e.cls))
  const blocked = (p.evidence || []).filter((e) => e.cls === 'hypothesis' || e.cls === 'unknown')
  const fmt = asset?.format || i.format || 'Video pendek'
  const spec = FORMATS[fmt]
  const lines: string[] = []
  if (systemPrompt) {
    lines.push('=== SYSTEM (Kuralivo Master Prompt) ===', systemPrompt.trim(), '')
  }
  lines.push(
    '=== TASK ===',
    `Buat ${asset ? 'aset' : 'paket konten'} untuk: ${i.product || '[produk/topik]'}`,
    `Tujuan: ${i.goal || '[belum diisi]'} | Aksi audiens yang diharapkan: ${i.audienceAction || '[belum diisi]'}`,
    `Audiens: ${i.audience || '[belum diisi]'}`,
    `Channel: ${asset?.channel || i.channel || 'General'} | Format: ${fmt}${spec ? ` (${spec.ratio}, ${spec.length})` : ''}`,
    asset ? `Tahap journey: ${STAGES[asset.stage].label} — ${STAGES[asset.stage].purpose}` : `Tahap journey: ${(p.stages || []).map((s) => STAGES[s].label).join(' → ') || '[belum dipilih]'}`,
    `Bahasa: ${i.language || 'Bahasa Indonesia'} | Tone: ${i.tone || 'jelas, natural, membantu, tidak berlebihan'}`,
    i.constraints ? `Batasan: ${i.constraints}` : '',
    '',
    '=== FAKTA YANG BOLEH DIPAKAI (hanya ini) ===',
    ...(allowed.length
      ? allowed.map((e) => `- [${EVIDENCE_CLASSES[e.cls].label}] ${e.claim}${e.sourceUrl ? ` (sumber: ${e.sourceUrl}${e.checkedAt ? ', dicek ' + e.checkedAt : ''})` : ''}${e.caveat ? ` — catatan: ${e.caveat}` : ''}`)
      : ['- (belum ada fakta yang disetujui — tulis daftar pertanyaan verifikasi, jangan mengarang)']),
    '',
    '=== JANGAN DINYATAKAN SEBAGAI FAKTA ===',
    ...(blocked.length ? blocked.map((e) => `- ${e.claim} (${EVIDENCE_CLASSES[e.cls].label})`) : ['- (tidak ada)']),
    '- Pengalaman pribadi, testimoni, rating, penjualan, harga/komisi/stok terkini, hasil/penghasilan yang tidak ada di daftar fakta.',
    '',
  )
  if (asset) {
    lines.push(
      '=== BRIEF ASET ===',
      `Pesan inti: ${asset.coreMessage || '[tentukan satu pesan inti]'}`,
      `Opsi hook: ${asset.hooks.join(' | ')}`,
      'Struktur:',
      ...asset.beats.map((b) => `  - ${b}`),
      `CTA: ${asset.cta || '-'}`,
      asset.disclosure ? `Disclosure wajib (dekat link/rekomendasi): ${asset.disclosure}` : '',
      '',
    )
  } else if (i.affiliate) {
    lines.push(`Disclosure wajib (dekat link/rekomendasi): ${DISCLOSURE_TEMPLATES.short}`, '')
  }
  lines.push(
    '=== OUTPUT ===',
    '1. Sebutkan dulu celah fakta & risiko.',
    '2. Buat 3 varian. Tiap varian: hook, naskah/copy, arahan visual, teks layar, caption, CTA, disclosure.',
    '3. Tandai setiap klaim dengan sumbernya dari daftar fakta; klaim penjual diatribusikan (“menurut penjual…”).',
    '4. Akhiri dengan checklist review: akurasi, hak aset, aturan platform/program, disclosure.',
    '5. Jangan publish, menjadwalkan, mengirim pesan, atau membeli apa pun.',
  )
  return lines.filter((l) => l !== '').join('\n').replace(/\n=== /g, '\n\n=== ')
}

export function diagnose(m: MetricEntry) {
  const out: { stage: string; note: string }[] = []
  const caveats: string[] = []
  const imp = m.impressions || m.views || 0
  if (!imp) caveats.push('Tidak ada data impressions/views — diagnosis tidak bisa dilakukan.')
  if (imp && imp < 500) caveats.push(`Sampel kecil (${imp}). Hasil belum konklusif.`)
  if (!m.source) caveats.push('Sumber data belum dicatat.')
  if (!m.windowDays) caveats.push('Jendela waktu belum dicatat.')
  caveats.push('Satu post tidak membuktikan sebab-akibat. Bandingkan beberapa post dengan variabel yang dikontrol.')
  if (imp) {
    const er = ((m.saves || 0) + (m.shares || 0) + (m.comments || 0)) / imp
    const ctr = (m.clicks || 0) / imp
    const cvr = m.clicks ? (m.conversions || 0) / m.clicks : 0
    if (m.avgWatchPct !== undefined && m.avgWatchPct < 30) out.push({ stage: 'Retensi', note: `Rata-rata tonton ${m.avgWatchPct}% — kemungkinan hook/pacing awal kurang kuat.` })
    if (er < 0.01) out.push({ stage: 'Pemahaman/kepercayaan', note: `Engagement ${(er * 100).toFixed(2)}% — pesan mungkin kurang relevan atau kurang jelas.` })
    if (m.clicks !== undefined && ctr < 0.005) out.push({ stage: 'Klik/CTA', note: `CTR ${(ctr * 100).toFixed(2)}% — CTA/link mungkin kurang jelas atau tahap journey belum tepat.` })
    if (m.clicks && m.conversions !== undefined && cvr < 0.01) out.push({ stage: 'Penawaran/konversi', note: `Konversi ${(cvr * 100).toFixed(2)}% dari klik — cek kesesuaian harga/syarat/halaman tujuan.` })
    if (!out.length) out.push({ stage: '-', note: 'Tidak ada titik friksi menonjol berdasarkan ambang sederhana. Lanjutkan pengujian.' })
  }
  return { friction: out, caveats }
}
