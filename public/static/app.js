/* Kuralivo Workspace — vanilla JS frontend. Data lives in localStorage only. */
(() => {
  'use strict'
  const LS_KEY = 'kuralivo.projects.v1'
  const LS_CUR = 'kuralivo.current.v1'
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const uid = (p) => p + '_' + Math.random().toString(36).slice(2, 8)
  const today = () => new Date().toISOString().slice(0, 10)

  const STEPS = [
    { id: 'intake', label: 'Intake', icon: 'fa-bullseye' },
    { id: 'evidence', label: 'Bukti', icon: 'fa-scale-balanced' },
    { id: 'journey', label: 'Journey', icon: 'fa-route' },
    { id: 'production', label: 'Produksi', icon: 'fa-clapperboard' },
    { id: 'review', label: 'Review gate', icon: 'fa-shield-halved' },
    { id: 'prompt', label: 'Prompt', icon: 'fa-wand-magic-sparkles' },
    { id: 'measure', label: 'Ukur & belajar', icon: 'fa-chart-line' },
  ]

  let LIB = null
  let store = load()
  let step = location.hash.slice(1) || 'intake'

  // ---------- storage ----------
  function blank(name = 'Proyek tanpa nama') {
    return { id: uid('prj'), name, updatedAt: Date.now(), data: { intake: { language: 'Bahasa Indonesia', affiliate: true }, evidence: [], stages: [], assets: [], metrics: [] } }
  }
  function load() {
    let s
    try { s = JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { s = {} }
    if (!s.projects || !Object.keys(s.projects).length) {
      const p = blank('Proyek pertama')
      s = { projects: { [p.id]: p } }
    }
    s.current = localStorage.getItem(LS_CUR)
    if (!s.projects[s.current]) s.current = Object.keys(s.projects)[0]
    return s
  }
  function save() {
    cur().updatedAt = Date.now()
    localStorage.setItem(LS_KEY, JSON.stringify({ projects: store.projects }))
    localStorage.setItem(LS_CUR, store.current)
  }
  const cur = () => store.projects[store.current]
  const P = () => cur().data

  // ---------- api ----------
  async function api(path, body) {
    const r = await fetch('/api/' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})
    const j = r.headers.get('content-type')?.includes('json') ? await r.json() : await r.text()
    if (!r.ok) throw new Error(j.error || 'Request gagal')
    return j
  }

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden')
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.add('hidden'), 2200)
  }

  // ---------- header ----------
  function renderHeader() {
    const sel = $('#project-select')
    sel.innerHTML = Object.values(store.projects).sort((a, b) => b.updatedAt - a.updatedAt)
      .map((p) => `<option value="${p.id}" ${p.id === store.current ? 'selected' : ''}>${esc(p.name)}</option>`).join('')
    $('#step-nav').innerHTML = STEPS.map((s, i) =>
      `<a href="#${s.id}" class="step-tab ${s.id === step ? 'active' : ''}" ${s.id === step ? 'aria-current="step"' : ''}><span class="dot">${i + 1}</span>${s.label}</a>`).join('')
  }

  function render() {
    if (!STEPS.some((s) => s.id === step)) step = 'intake'
    renderHeader()
    const old = $('#view')
    const v = old.cloneNode(false) // fresh node => no stacked listeners
    old.replaceWith(v)
    v.innerHTML = VIEWS[step]()
    BIND[step]?.(v)
    window.scrollTo({ top: 0 })
  }

  const nextBtn = (to, label) => `<div class="mt-6 flex justify-end"><a href="#${to}" class="btn">${label} <i class="fa-solid fa-arrow-right"></i></a></div>`
  const head = (title, sub) => `<div class="mb-5"><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">${title}</h1><p class="text-gray-600 mt-1 max-w-3xl">${sub}</p></div>`
  const clsChip = (c) => `<span class="chip cls-${c}">${esc(LIB.evidenceClasses[c]?.label || c)}</span>`

  // ---------- views ----------
  const VIEWS = {
    intake() {
      const i = P().intake
      const f = (k, label, ph = '', hint = '', type = 'text') => `<div class="field"><label for="in-${k}">${label}</label><input id="in-${k}" data-k="${k}" type="${type}" class="inp" value="${esc(i[k])}" placeholder="${esc(ph)}">${hint ? `<small>${hint}</small>` : ''}</div>`
      const ta = (k, label, ph = '', hint = '') => `<div class="field"><label for="in-${k}">${label}</label><textarea id="in-${k}" data-k="${k}" class="inp" placeholder="${esc(ph)}">${esc(i[k])}</textarea>${hint ? `<small>${hint}</small>` : ''}</div>`
      const stageOpts = ['', ...Object.keys(LIB.stages)].map((s) => `<option value="${s}" ${i.stage === s ? 'selected' : ''}>${s ? LIB.stages[s].label : 'Belum tahu — sarankan'}</option>`).join('')
      const fmtOpts = ['', ...Object.keys(LIB.formats)].map((s) => `<option value="${esc(s)}" ${i.format === s ? 'selected' : ''}>${s || 'Bebas / beberapa format'}</option>`).join('')
      return head('1. Intake', 'Tetapkan tujuan dan aksi audiens sebelum membuat aset. Isi yang memengaruhi hasil; sisanya boleh menyusul sebagai asumsi.') + `
      <form id="intake-form" class="grid lg:grid-cols-2 gap-5" onsubmit="return false">
        <section class="card space-y-1"><h2 class="font-bold mb-2"><i class="fa-solid fa-bullseye text-olive mr-1"></i>Tujuan & produk</h2>
          ${ta('goal', 'Tujuan', 'Mis. Membantu pekerja kantoran memilih kursi ergonomis dan klik link affiliate', 'Apa yang ingin dicapai konten ini?')}
          ${f('audienceAction', 'Aksi audiens yang diharapkan', 'Mis. Klik link untuk cek harga & syarat')}
          ${f('product', 'Produk / penawaran / topik', 'Nama produk atau topik')}
          ${f('productUrl', 'URL listing resmi', 'https://…', 'Akan otomatis ditawarkan ke evidence ledger.', 'url')}
          <div class="field flex items-center gap-2 pt-2"><input id="in-affiliate" data-k="affiliate" type="checkbox" class="w-4 h-4" ${i.affiliate ? 'checked' : ''}><label for="in-affiliate" class="!mb-0">Konten affiliate (wajib disclosure komisi)</label></div>
        </section>
        <section class="card space-y-1"><h2 class="font-bold mb-2"><i class="fa-solid fa-users text-olive mr-1"></i>Audiens & channel</h2>
          ${ta('audience', 'Audiens & situasinya', 'Siapa mereka, apa masalahnya, seberapa paham?', 'Profil audiens dianggap hipotesis sampai ada data.')}
          <div class="grid sm:grid-cols-2 gap-3">
            ${f('channel', 'Channel', 'TikTok, Instagram, YouTube…')}
            <div class="field"><label for="in-format">Format utama</label><select id="in-format" data-k="format" class="inp">${fmtOpts}</select></div>
            <div class="field"><label for="in-stage">Tahap journey</label><select id="in-stage" data-k="stage" class="inp">${stageOpts}</select></div>
            ${f('successMetric', 'Metrik keberhasilan', 'Mis. CTR link ≥ 1%')}
          </div>
        </section>
        <section class="card space-y-1 lg:col-span-2"><h2 class="font-bold mb-2"><i class="fa-solid fa-sliders text-olive mr-1"></i>Gaya & batasan</h2>
          <div class="grid sm:grid-cols-3 gap-3">${f('language', 'Bahasa', 'Bahasa Indonesia')}${f('tone', 'Tone', 'jelas, natural, tidak berlebihan')}${f('deadline', 'Deadline', '', '', 'date')}</div>
          ${ta('constraints', 'Batasan brand / sumber daya / anggaran', 'Mis. Tanpa wajah, hanya HP, tanpa musik berlisensi')}
        </section>
      </form>` + nextBtn('evidence', 'Lanjut ke bukti')
    },

    evidence() {
      const ev = P().evidence
      const opts = (sel) => Object.entries(LIB.evidenceClasses).map(([k, v]) => `<option value="${k}" ${sel === k ? 'selected' : ''}>${v.label}</option>`).join('')
      const url = P().intake.productUrl
      const suggest = url && !ev.some((e) => e.sourceUrl === url)
        ? `<div class="card mb-4 flex flex-wrap items-center gap-3 text-sm"><i class="fa-solid fa-lightbulb text-olive"></i><span>URL listing dari intake belum ada di ledger.</span><button id="btn-add-listing" class="btn-ghost">Tambahkan sebagai klaim penjual</button></div>` : ''
      return head('2. Evidence ledger', 'Setiap klaim material harus punya kelas bukti, sumber, dan tanggal cek. Jangan pernah mengisi celah dengan karangan.') + suggest + `
      <div class="grid lg:grid-cols-3 gap-5">
        <form id="ev-form" class="card lg:col-span-1 space-y-2 self-start">
          <h2 class="font-bold"><i class="fa-solid fa-plus text-olive mr-1"></i>Tambah klaim</h2>
          <div class="field"><label for="ev-claim">Klaim (persis seperti sumbernya)</label><textarea id="ev-claim" class="inp" required placeholder="Mis. Sandaran bisa direbahkan hingga 135°"></textarea></div>
          <div class="field"><label for="ev-cls">Kelas bukti</label><select id="ev-cls" class="inp">${opts('seller_claim')}</select><small id="ev-cls-hint"></small></div>
          <div class="field"><label for="ev-url">URL sumber</label><input id="ev-url" type="url" class="inp" placeholder="https://…"></div>
          <div class="field"><label for="ev-date">Tanggal dicek</label><input id="ev-date" type="date" class="inp" value="${today()}"></div>
          <div class="field"><label for="ev-caveat">Catatan / caveat</label><input id="ev-caveat" class="inp" placeholder="Mis. Harga bisa berubah; varian tertentu saja"></div>
          <button class="btn w-full justify-center" type="submit"><i class="fa-solid fa-plus"></i>Tambah ke ledger</button>
        </form>
        <section class="lg:col-span-2 space-y-3">
          <div class="flex flex-wrap gap-2 text-xs">${Object.keys(LIB.evidenceClasses).map((k) => `${clsChip(k)}<span class="text-gray-500 -ml-1 mr-2">${ev.filter((e) => e.cls === k).length}</span>`).join('')}</div>
          ${ev.length ? ev.map((e) => `
            <article class="card !p-4" data-id="${e.id}">
              <div class="flex flex-wrap items-start gap-2">
                <div class="flex-1 min-w-[200px]"><div class="flex items-center gap-2 mb-1">${clsChip(e.cls)}<code class="text-[10px] text-gray-400">${e.id}</code></div>
                  <p class="font-medium">${esc(e.claim)}</p>
                  <p class="text-xs text-gray-500 mt-1">${e.sourceUrl ? `<a class="underline break-all" href="${esc(e.sourceUrl)}" target="_blank" rel="noopener nofollow">${esc(e.sourceUrl)}</a>` : '<span class="text-red-600">tanpa sumber</span>'} · ${e.checkedAt ? 'dicek ' + esc(e.checkedAt) : '<span class="text-amber-700">tanggal cek kosong</span>'}${e.caveat ? ' · ' + esc(e.caveat) : ''}</p>
                  <p class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-pen-nib mr-1"></i>${esc(LIB.evidenceClasses[e.cls].publishable)}</p>
                </div>
                <div class="flex gap-1"><select class="inp !py-1 !text-xs w-auto" data-act="cls" aria-label="Ubah kelas">${opts(e.cls)}</select><button class="btn-ghost btn-danger" data-act="del" aria-label="Hapus"><i class="fa-solid fa-trash"></i></button></div>
              </div>
            </article>`).join('') : `<div class="card text-center text-gray-500 py-10"><i class="fa-regular fa-folder-open text-3xl mb-2"></i><p>Ledger masih kosong. Mulai dari listing resmi produk, aturan program affiliate, lalu bukti independen.</p></div>`}
        </section>
      </div>` + nextBtn('journey', 'Lanjut ke journey')
    },

    journey() {
      const sel = P().stages
      return head('3. Audiens & journey', 'Pilih tahap terkecil yang berguna untuk tujuan ini. Matriks konten di bawah adalah titik awal — sesuaikan.') + `
      <div class="card mb-5"><div class="flex flex-wrap items-center gap-2 mb-3"><h2 class="font-bold flex-1">Tahap journey</h2><button id="btn-suggest" class="btn-ghost"><i class="fa-solid fa-wand-magic-sparkles"></i>Sarankan dari intake</button></div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">${Object.entries(LIB.stages).map(([k, s]) => `
          <label class="border rounded-xl p-3 cursor-pointer ${sel.includes(k) ? 'border-deep bg-lime/30' : 'border-line bg-white'}">
            <div class="flex items-center gap-2 font-bold"><input type="checkbox" data-stage="${k}" ${sel.includes(k) ? 'checked' : ''}>${s.label}</div>
            <p class="text-xs text-gray-600 mt-1">${esc(s.purpose)}</p><p class="text-[11px] text-gray-500 mt-1">CTA: ${esc(s.cta)}</p></label>`).join('')}
        </div></div>
      <section class="card"><div class="flex flex-wrap items-center gap-2 mb-3"><h2 class="font-bold flex-1">Matriks konten</h2><button id="btn-matrix" class="btn-ghost"><i class="fa-solid fa-table"></i>Bangun matriks</button></div>
        <div id="matrix" class="overflow-x-auto text-sm text-gray-500">Pilih tahap lalu klik “Bangun matriks”.</div></section>` + nextBtn('production', 'Lanjut ke produksi')
    },

    production() {
      const a = P().assets
      const stageOpts = Object.entries(LIB.stages).map(([k, s]) => `<option value="${k}" ${P().stages[0] === k ? 'selected' : ''}>${s.label}</option>`).join('')
      const fmtOpts = Object.keys(LIB.formats).map((f) => `<option ${P().intake.format === f ? 'selected' : ''}>${esc(f)}</option>`).join('')
      return head('4. Brief produksi', 'Satu aset = satu pesan inti. Brief di-draft dari bukti yang disetujui; lengkapi pesan inti, naskah, dan hak aset.') + `
      <div class="card mb-5 flex flex-wrap items-end gap-3">
        <div class="field"><label for="nb-stage">Tahap</label><select id="nb-stage" class="inp">${stageOpts}</select></div>
        <div class="field"><label for="nb-format">Format</label><select id="nb-format" class="inp">${fmtOpts}</select></div>
        <button id="btn-new-brief" class="btn"><i class="fa-solid fa-plus"></i>Draft brief baru</button>
      </div>
      <div class="space-y-5">${a.length ? a.map(briefCard).join('') : '<div class="card text-center text-gray-500 py-10">Belum ada brief aset.</div>'}</div>` + nextBtn('review', 'Jalankan review gate')
    },

    review() {
      return head('5. Review gate', 'Pemeriksaan otomatis untuk bukti, klaim berisiko, disclosure, dan hak aset. Hasil ini membantu — keputusan akhir tetap di manusia.') + `
      <div id="review-out" class="text-gray-500">Memeriksa…</div>
      <section class="card mt-5"><h2 class="font-bold mb-2">Checklist manual (tidak bisa diotomatisasi)</h2>
        <ul class="space-y-2 text-sm">${[
          'Harga, stok, syarat, dan link dicek ulang tepat sebelum publikasi.',
          'Aturan terbaru platform dan program affiliate spesifik sudah dibaca.',
          'Tidak ada pengalaman pribadi, testimoni, atau hasil yang tidak benar-benar terjadi.',
          'Visual, musik, logo punya izin pakai; atribusi dicantumkan bila wajib.',
          'Disclosure komisi terlihat dekat rekomendasi/link, dalam format yang dilihat audiens.',
          'Ejaan, aksesibilitas (subtitle/alt text), tone, dan kecocokan audiens.',
          'Seorang manusia menyetujui versi final. Publikasi dilakukan manual.',
        ].map((t, k) => `<li><label class="flex gap-2"><input type="checkbox" data-manual="${k}" ${P().manual?.[k] ? 'checked' : ''}> ${esc(t)}</label></li>`).join('')}</ul>
        <p class="text-xs text-gray-500 mt-3">Bukan nasihat hukum. Panduan asing tidak otomatis berlaku sebagai hukum Indonesia.</p></section>` + nextBtn('prompt', 'Buat prompt')
    },

    prompt() {
      const a = P().assets
      return head('6. Prompt untuk model eksternal', 'Kuralivo tidak memanggil model AI. Salin prompt ini ke model pilihanmu; hanya fakta di ledger yang diizinkan. Prompt bukan aset jadi.') + `
      <div class="card mb-4 flex flex-wrap items-end gap-3">
        <div class="field"><label for="pr-asset">Cakupan</label><select id="pr-asset" class="inp"><option value="">Paket konten (semua tahap)</option>${a.map((x) => `<option value="${x.id}">${esc(x.title)}</option>`).join('')}</select></div>
        <label class="flex items-center gap-2 text-sm pb-2"><input id="pr-sys" type="checkbox" checked> Sertakan master system prompt</label>
        <button id="btn-gen-prompt" class="btn"><i class="fa-solid fa-wand-magic-sparkles"></i>Buat prompt</button>
        <button id="btn-copy-prompt" class="btn-ghost"><i class="fa-regular fa-copy"></i>Salin</button>
      </div>
      <pre id="prompt-out" class="prompt">Klik “Buat prompt”.</pre>`
    },

    measure() {
      const m = P().metrics
      const n = (k, label) => `<div class="field"><label for="m-${k}">${label}</label><input id="m-${k}" data-m="${k}" type="number" min="0" step="any" class="inp"></div>`
      return head('7. Ukur & belajar', 'Catat angka aktual saja, lengkap dengan sumber dan jendela waktu. Diagnosis menunjukkan kemungkinan titik friksi, bukan sebab-akibat.') + `
      <div class="grid lg:grid-cols-3 gap-5">
        <form id="m-form" class="card space-y-1 self-start">
          <h2 class="font-bold mb-1">Catat hasil post</h2>
          <div class="field"><label for="m-url">URL konten</label><input id="m-url" data-m="url" class="inp" type="url"></div>
          <div class="grid grid-cols-2 gap-2">
            <div class="field"><label for="m-channel">Channel</label><input id="m-channel" data-m="channel" class="inp"></div>
            <div class="field"><label for="m-date">Tanggal post</label><input id="m-date" data-m="date" class="inp" type="date"></div>
            ${n('impressions', 'Impressions')}${n('views', 'Views')}${n('avgWatchPct', 'Rata-rata tonton %')}${n('saves', 'Saves')}${n('shares', 'Shares')}${n('comments', 'Komentar')}${n('clicks', 'Klik link')}${n('conversions', 'Konversi')}${n('windowDays', 'Jendela (hari)')}
          </div>
          <div class="field"><label for="m-source">Sumber data</label><input id="m-source" data-m="source" class="inp" placeholder="Mis. TikTok Analytics, dashboard affiliate"></div>
          <div class="field"><label for="m-notes">Catatan (hook, angle, konteks)</label><textarea id="m-notes" data-m="notes" class="inp"></textarea></div>
          <button class="btn w-full justify-center" type="submit"><i class="fa-solid fa-plus"></i>Simpan & diagnosa</button>
        </form>
        <section class="lg:col-span-2 space-y-3" id="m-list">${m.length ? m.slice().reverse().map(metricCard).join('') : '<div class="card text-center text-gray-500 py-10">Belum ada data. Publikasikan secara manual, lalu catat hasilnya di sini.</div>'}</section>
      </div>`
    },
  }

  function briefCard(a) {
    const ev = P().evidence
    const fld = (k, label, rows = 2) => `<div class="field"><label>${label}</label><textarea class="inp" data-f="${k}" rows="${rows}">${esc(a[k])}</textarea></div>`
    return `<article class="card" data-asset="${a.id}">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <input class="inp font-bold !text-base flex-1 min-w-[200px]" data-f="title" value="${esc(a.title)}" aria-label="Judul aset">
        <span class="chip bg-lime/60 text-deep">${esc(LIB.stages[a.stage]?.label)}</span><span class="chip bg-gray-100">${esc(a.format)}</span>
        <label class="text-xs flex items-center gap-1"><input type="checkbox" data-f="approved" ${a.approved ? 'checked' : ''}>Disetujui manusia</label>
        <button class="btn-ghost btn-danger" data-act="del-asset" aria-label="Hapus aset"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="grid lg:grid-cols-2 gap-x-5">
        <div>
          <div class="field"><label>Pesan inti (satu kalimat)</label><input class="inp" data-f="coreMessage" value="${esc(a.coreMessage)}" placeholder="Apa satu hal yang harus diingat penonton?"></div>
          ${fld('hooks', 'Opsi hook (satu per baris)', 3)}
          ${fld('beats', 'Struktur beat-by-beat (satu per baris)', 5)}
          ${fld('visualPlan', 'Rencana visual / shot / audio', 2)}
          <div class="grid grid-cols-2 gap-2"><div class="field"><label>Pilar</label><input class="inp" data-f="pillar" value="${esc(a.pillar)}"></div><div class="field"><label>Channel</label><input class="inp" data-f="channel" value="${esc(a.channel)}"></div></div>
        </div>
        <div>
          ${fld('onScreenText', 'Teks layar', 2)}${fld('narration', 'Narasi / voice-over', 3)}${fld('caption', 'Caption', 3)}
          <div class="grid grid-cols-2 gap-2"><div class="field"><label>CTA</label><input class="inp" data-f="cta" value="${esc(a.cta)}"></div><div class="field"><label>Hak aset (visual/musik)</label><input class="inp" data-f="assetsRights" value="${esc(a.assetsRights)}" placeholder="Mis. footage sendiri; musik library platform"></div></div>
          ${fld('disclosure', 'Disclosure', 2)}
        </div>
      </div>
      <details class="mt-2"><summary class="text-sm font-semibold cursor-pointer">Bukti yang dipakai (${a.evidenceIds.length})</summary>
        <div class="mt-2 space-y-1">${ev.length ? ev.map((e) => `<label class="flex gap-2 text-sm items-start"><input type="checkbox" data-ev="${e.id}" ${a.evidenceIds.includes(e.id) ? 'checked' : ''}> ${clsChip(e.cls)} <span>${esc(e.claim)}</span></label>`).join('') : '<p class="text-sm text-gray-500">Ledger kosong.</p>'}</div></details>
    </article>`
  }

  function metricCard(m) {
    return `<article class="card !p-4" data-metric="${m.id}">
      <div class="flex flex-wrap gap-2 items-center mb-2"><b class="flex-1">${esc(m.channel || 'Channel?')} · ${esc(m.date || 'tanggal?')}</b>${m.url ? `<a class="text-xs underline break-all" href="${esc(m.url)}" target="_blank" rel="noopener nofollow">${esc(m.url)}</a>` : ''}<button class="btn-ghost btn-danger" data-act="del-metric" aria-label="Hapus"><i class="fa-solid fa-trash"></i></button></div>
      <div class="flex flex-wrap gap-3 text-xs text-gray-600">${['impressions', 'views', 'avgWatchPct', 'saves', 'shares', 'comments', 'clicks', 'conversions'].filter((k) => m[k] !== undefined).map((k) => `<span><b>${k}</b>: ${m[k]}</span>`).join('')}</div>
      ${m.notes ? `<p class="text-sm mt-2">${esc(m.notes)}</p>` : ''}
      <div class="mt-3 text-sm">${(m.diagnosis?.friction || []).map((d) => `<p><i class="fa-solid fa-magnifying-glass-chart text-olive mr-1"></i><b>${esc(d.stage)}</b>: ${esc(d.note)}</p>`).join('')}
      <ul class="text-xs text-gray-500 mt-1 list-disc ml-5">${(m.diagnosis?.caveats || []).map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div></article>`
  }

  // ---------- bindings ----------
  const BIND = {
    intake(v) {
      v.addEventListener('input', (e) => {
        const k = e.target.dataset.k; if (!k) return
        P().intake[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        if (k === 'product' && cur().name.startsWith('Proyek') && e.target.value) { cur().name = e.target.value.slice(0, 50); renderHeader() }
        save()
      })
      v.addEventListener('change', (e) => { if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT') e.target.dispatchEvent(new Event('input', { bubbles: true })) })
    },
    evidence(v) {
      const hint = () => { $('#ev-cls-hint').textContent = LIB.evidenceClasses[$('#ev-cls').value].desc }
      hint(); $('#ev-cls').addEventListener('change', hint)
      $('#ev-form').addEventListener('submit', (e) => {
        e.preventDefault()
        const claim = $('#ev-claim').value.trim(); if (!claim) return
        P().evidence.push({ id: uid('ev'), claim, cls: $('#ev-cls').value, sourceUrl: $('#ev-url').value.trim(), checkedAt: $('#ev-date').value, caveat: $('#ev-caveat').value.trim() })
        save(); render(); toast('Klaim ditambahkan')
      })
      $('#btn-add-listing')?.addEventListener('click', () => {
        P().evidence.push({ id: uid('ev'), claim: `Listing resmi ${P().intake.product || 'produk'}`, cls: 'seller_claim', sourceUrl: P().intake.productUrl, checkedAt: today(), caveat: 'Isi detail spesifikasi/harga sebagai klaim terpisah.' })
        save(); render()
      })
      v.addEventListener('change', (e) => {
        if (e.target.dataset.act !== 'cls') return
        const it = P().evidence.find((x) => x.id === e.target.closest('[data-id]').dataset.id); it.cls = e.target.value; save(); render()
      })
      v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act="del"]'); if (!b) return
        const id = b.closest('[data-id]').dataset.id
        if (!confirm('Hapus klaim ini?')) return
        P().evidence = P().evidence.filter((x) => x.id !== id)
        P().assets.forEach((a) => (a.evidenceIds = a.evidenceIds.filter((x) => x !== id)))
        save(); render()
      })
    },
    journey(v) {
      v.addEventListener('change', (e) => {
        const s = e.target.dataset.stage; if (!s) return
        const order = Object.keys(LIB.stages)
        const set = new Set(P().stages); e.target.checked ? set.add(s) : set.delete(s)
        P().stages = order.filter((x) => set.has(x)); save(); render()
      })
      $('#btn-suggest').addEventListener('click', async () => {
        const r = await api('journey', { intake: P().intake, evidence: P().evidence })
        P().stages = r.stages; save(); render(); toast('Tahap disarankan dari intake')
      })
      const build = async () => {
        if (!P().stages.length) return
        const r = await api('journey', P())
        $('#matrix').innerHTML = `<table class="tbl"><thead><tr><th>Tahap</th><th>Pilar</th><th>Pertanyaan audiens</th><th>Format</th><th>Hook awal</th><th>Bukti dibutuhkan</th><th>CTA</th><th>Metrik</th><th></th></tr></thead><tbody>${r.matrix.map((row, k) => `
          <tr><td><b>${esc(row.stageLabel)}</b></td><td>${esc(row.pillar)}</td><td>${esc(row.question)}</td><td>${esc(row.format)}</td><td>${esc(row.hook)}</td><td class="text-xs">${esc(row.evidenceNeeded)}<br><span class="text-gray-400">tersedia: ${row.evidenceAvailable}</span></td><td>${esc(row.cta)}</td><td class="text-xs">${esc(row.metric)}</td>
          <td><button class="btn-ghost !text-xs" data-row="${k}"><i class="fa-solid fa-clapperboard"></i>Brief</button></td></tr>`).join('')}</tbody></table>
          <p class="text-xs text-gray-500 mt-2">Disclosure affiliate otomatis disertakan pada brief tahap Evaluate/Decide.</p>`
        $$('[data-row]', $('#matrix')).forEach((b) => b.addEventListener('click', async () => {
          const row = r.matrix[+b.dataset.row]; await newBrief(row.stage, row.format, row.pillar); location.hash = 'production'
        }))
      }
      $('#btn-matrix').addEventListener('click', build)
      build()
    },
    production(v) {
      $('#btn-new-brief').addEventListener('click', () => newBrief($('#nb-stage').value, $('#nb-format').value).then(render))
      v.addEventListener('input', (e) => {
        const card = e.target.closest('[data-asset]'); if (!card) return
        const a = P().assets.find((x) => x.id === card.dataset.asset)
        const f = e.target.dataset.f, evId = e.target.dataset.ev
        if (f) a[f] = e.target.type === 'checkbox' ? e.target.checked : (f === 'hooks' || f === 'beats') ? e.target.value.split('\n').filter((l) => l.trim()) : e.target.value
        if (evId) a.evidenceIds = e.target.checked ? [...new Set([...a.evidenceIds, evId])] : a.evidenceIds.filter((x) => x !== evId)
        save()
      })
      v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act="del-asset"]'); if (!b) return
        if (!confirm('Hapus brief ini?')) return
        P().assets = P().assets.filter((x) => x.id !== b.closest('[data-asset]').dataset.asset); save(); render()
      })
    },
    async review(v) {
      const r = await api('review', P())
      const color = { Ready: 'bg-green-600', 'Needs evidence': 'bg-red-600', 'Needs human review': 'bg-amber-600' }[r.status]
      const groups = {}
      r.findings.forEach((f) => (groups[f.area] ||= []).push(f))
      $('#review-out').innerHTML = `
        <div class="card flex flex-wrap items-center gap-4 mb-4"><span class="text-white font-bold px-3 py-1.5 rounded-lg ${color}">${esc(r.status)}</span>
          <span class="text-sm"><b class="text-red-600">${r.summary.critical}</b> kritis · <b class="text-amber-600">${r.summary.warning}</b> peringatan · <b class="text-slate-600">${r.summary.info}</b> info</span>
          <span class="text-xs text-gray-500 flex-1">${r.status === 'Ready' ? 'Tidak ada temuan otomatis. Tetap selesaikan checklist manual sebelum publikasi.' : 'Selesaikan temuan kritis sebelum menandai konten siap.'}</span></div>
        ${Object.entries(groups).map(([area, list]) => `<section class="mb-3"><h3 class="font-bold text-sm mb-1">${esc(area)}</h3><div class="space-y-1">${list.map((f) => `<div class="lvl-${f.level} rounded-r-lg px-3 py-2 text-sm">${esc(f.message)}</div>`).join('')}</div></section>`).join('')}`
      v.addEventListener('change', (e) => { const k = e.target.dataset.manual; if (k === undefined) return; (P().manual ||= {})[k] = e.target.checked; save() })
    },
    prompt() {
      const gen = async () => {
        const r = await api('prompt', { project: P(), assetId: $('#pr-asset').value || undefined, includeSystem: $('#pr-sys').checked })
        $('#prompt-out').textContent = r.prompt
      }
      $('#btn-gen-prompt').addEventListener('click', gen)
      $('#btn-copy-prompt').addEventListener('click', async () => { await navigator.clipboard.writeText($('#prompt-out').textContent); toast('Prompt disalin') })
      gen()
    },
    measure(v) {
      $('#m-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        const m = { id: uid('m') }
        $$('[data-m]', e.target).forEach((el) => { if (el.value !== '') m[el.dataset.m] = el.type === 'number' ? +el.value : el.value.trim() })
        m.diagnosis = await api('diagnose', m)
        P().metrics.push(m); save(); render(); toast('Hasil dicatat')
      })
      v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act="del-metric"]'); if (!b || !confirm('Hapus data ini?')) return
        P().metrics = P().metrics.filter((x) => x.id !== b.closest('[data-metric]').dataset.metric); save(); render()
      })
    },
  }

  async function newBrief(stage, format, pillar) {
    const b = await api('brief', { intake: P().intake, evidence: P().evidence, stage, format })
    if (pillar) b.pillar = pillar
    P().assets.push({ id: uid('as'), ...b }); save(); toast('Brief dibuat — lengkapi pesan inti & naskah')
  }

  // ---------- export ----------
  function download(name, text, type) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); URL.revokeObjectURL(a.href)
  }
  const slug = () => cur().name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'proyek'

  async function exportMd() {
    const p = P(), i = p.intake, r = await api('review', p)
    const L = []
    L.push(`# ${cur().name}`, `_Diekspor ${new Date().toLocaleString('id-ID')} dari Kuralivo. Draft — bukan bukti atau persetujuan._`, '')
    L.push('## 1. Tujuan & asumsi', `- Tujuan: ${i.goal || '-'}`, `- Aksi audiens: ${i.audienceAction || '-'}`, `- Produk: ${i.product || '-'} ${i.productUrl || ''}`, `- Audiens (hipotesis): ${i.audience || '-'}`, `- Channel/format: ${i.channel || '-'} / ${i.format || '-'}`, `- Metrik: ${i.successMetric || '-'}`, `- Affiliate: ${i.affiliate ? 'ya' : 'tidak'}`, '')
    L.push('## 2. Status bukti', '| Kelas | Klaim | Sumber | Dicek | Catatan |', '|---|---|---|---|---|')
    p.evidence.forEach((e) => L.push(`| ${LIB.evidenceClasses[e.cls].label} | ${e.claim.replace(/\|/g, '/')} | ${e.sourceUrl || '-'} | ${e.checkedAt || '-'} | ${(e.caveat || '').replace(/\|/g, '/')} |`))
    L.push('', '## 3. Journey', p.stages.map((s) => LIB.stages[s].label).join(' → ') || '-', '')
    L.push('## 4. Aset')
    p.assets.forEach((a) => {
      L.push(`### ${a.title}${a.approved ? ' ✅' : ''}`, `- Tahap: ${LIB.stages[a.stage].label} · Pilar: ${a.pillar} · Format: ${a.format} · Channel: ${a.channel}`, `- Pesan inti: ${a.coreMessage || '-'}`, '- Hook:', ...a.hooks.map((h) => `  - ${h}`), '- Struktur:', ...a.beats.map((h) => `  - ${h}`))
      ;['visualPlan', 'onScreenText', 'narration', 'caption', 'cta', 'disclosure', 'assetsRights'].forEach((k) => a[k] && L.push(`- ${k}: ${a[k]}`))
      L.push(`- Bukti: ${a.evidenceIds.join(', ') || '-'}`, '')
    })
    L.push(`## 5. Review gate — **${r.status}**`, ...r.findings.map((f) => `- [${f.level}] ${f.area}: ${f.message}`), '')
    L.push('## 6. Pengukuran')
    p.metrics.forEach((m) => L.push(`- ${m.date || '?'} ${m.channel || ''} ${m.url || ''} — ${['impressions', 'views', 'avgWatchPct', 'clicks', 'conversions'].filter((k) => m[k] !== undefined).map((k) => `${k}: ${m[k]}`).join(', ')} (sumber: ${m.source || '?'})`))
    download(`${slug()}-laporan.md`, L.join('\n'), 'text/markdown')
  }

  function sample() {
    const p = blank('Contoh: Kursi ergonomis (fiktif)')
    const ev1 = uid('ev'), ev2 = uid('ev'), ev3 = uid('ev'), ev4 = uid('ev')
    p.data = {
      intake: { goal: 'Membantu pekerja remote memilih kursi kerja dan klik link affiliate untuk cek detail', audienceAction: 'Klik link untuk cek harga & syarat terkini', product: 'Kursi Ergonomis Contoh X1', productUrl: 'https://example.com/listing-contoh', audience: 'Pekerja remote 22–35 th, kerja 6+ jam duduk, budget terbatas (hipotesis)', channel: 'TikTok', format: 'Video pendek', stage: '', language: 'Bahasa Indonesia', tone: 'santai, jujur, tidak lebay', successMetric: 'CTR link ≥ 1%', affiliate: true },
      evidence: [
        { id: ev1, claim: 'Listing menyebut sandaran dapat direbahkan hingga 135°', cls: 'seller_claim', sourceUrl: 'https://example.com/listing-contoh', checkedAt: today(), caveat: 'DATA FIKTIF — contoh saja' },
        { id: ev2, claim: 'Listing menyebut garansi rangka 1 tahun', cls: 'seller_claim', sourceUrl: 'https://example.com/listing-contoh', checkedAt: today(), caveat: 'DATA FIKTIF' },
        { id: ev3, claim: 'Audiens sering mengeluh pegal punggung bawah', cls: 'hypothesis', caveat: 'Belum ada data — perlu riset komentar/survei' },
        { id: ev4, claim: 'Persentase komisi program', cls: 'unknown', caveat: 'Cek dashboard affiliate' },
      ],
      stages: ['understand', 'evaluate', 'decide'], assets: [], metrics: [],
    }
    store.projects[p.id] = p; store.current = p.id; save(); render(); toast('Contoh fiktif dimuat')
  }

  // ---------- global events ----------
  function bindGlobal() {
    window.addEventListener('hashchange', () => { step = location.hash.slice(1); render() })
    $('#project-select').addEventListener('change', (e) => { store.current = e.target.value; save(); render() })
    $('#btn-new-project').addEventListener('click', () => {
      const name = prompt('Nama proyek baru:', 'Proyek baru'); if (name === null) return
      const p = blank(name.trim() || 'Proyek baru'); store.projects[p.id] = p; store.current = p.id; save(); location.hash = 'intake'; render()
    })
    const menu = $('#menu'), mb = $('#btn-menu')
    mb.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); mb.setAttribute('aria-expanded', !menu.classList.contains('hidden')) })
    document.addEventListener('click', () => menu.classList.add('hidden'))
    menu.addEventListener('click', async (e) => {
      const act = e.target.closest('[data-action]')?.dataset.action
      if (act === 'export-json') download(`${slug()}.kuralivo.json`, JSON.stringify({ kuralivo: 1, name: cur().name, data: P() }, null, 2), 'application/json')
      if (act === 'import-json') $('#import-file').click()
      if (act === 'export-md') exportMd()
      if (act === 'load-sample') sample()
      if (act === 'rename') { const n = prompt('Nama proyek:', cur().name); if (n) { cur().name = n.trim(); save(); renderHeader() } }
      if (act === 'delete') {
        if (!confirm(`Hapus proyek “${cur().name}”? Tidak bisa dibatalkan.`)) return
        delete store.projects[store.current]
        if (!Object.keys(store.projects).length) { const p = blank('Proyek pertama'); store.projects[p.id] = p }
        store.current = Object.keys(store.projects)[0]; save(); render()
      }
    })
    $('#import-file').addEventListener('change', async (e) => {
      const file = e.target.files[0]; if (!file) return
      try {
        const j = JSON.parse(await file.text())
        if (!j.data || !j.data.intake) throw new Error('Format tidak dikenali')
        const p = blank(j.name || file.name); p.data = { evidence: [], stages: [], assets: [], metrics: [], ...j.data }
        store.projects[p.id] = p; store.current = p.id; save(); render(); toast('Proyek diimpor')
      } catch (err) { alert('Gagal impor: ' + err.message) }
      e.target.value = ''
    })
  }

  // ---------- boot ----------
  ;(async () => {
    try { LIB = await api('library') } catch (e) { $('#view').innerHTML = `<div class="card text-red-600">Gagal memuat library: ${esc(e.message)}</div>`; return }
    bindGlobal(); render()
  })()
})()
