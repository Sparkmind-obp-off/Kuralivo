export function renderApp(version: string) {
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#14231d">
<meta name="description" content="Kuralivo — workspace content journey berbasis bukti: intake, evidence ledger, journey, brief produksi, review gate, prompt, dan pengukuran.">
<title>Kuralivo — Content Journey Workspace</title>
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config={theme:{extend:{colors:{ink:'#17241e',deep:'#14231d',lime:'#d7f36b',olive:'#718a2b',paper:'#f7f8f3',line:'#e2e7df'},fontFamily:{sans:['Inter','ui-sans-serif','system-ui','sans-serif']}}}}
</script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
<link href="/static/style.css" rel="stylesheet">
</head>
<body class="bg-paper text-ink font-sans antialiased">
<header id="app-header" class="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-line">
  <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
    <a href="/" class="flex items-center gap-2 font-black tracking-[.14em]"><span class="w-8 h-8 grid place-items-center rounded-lg bg-lime text-deep text-sm">K</span>KURALIVO</a>
    <span class="text-xs text-gray-500 border border-line rounded-full px-2 py-0.5 bg-white">v${version} · prototype</span>
    <div class="flex-1"></div>
    <label for="project-select" class="sr-only">Pilih proyek</label>
    <select id="project-select" class="text-sm border border-line rounded-lg px-2 py-1.5 bg-white max-w-[220px]"></select>
    <button id="btn-new-project" class="btn-ghost" title="Proyek baru"><i class="fa-solid fa-plus"></i><span class="hidden sm:inline">Baru</span></button>
    <div class="relative">
      <button id="btn-menu" class="btn-ghost" aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
      <div id="menu" class="hidden absolute right-0 mt-2 w-60 bg-white border border-line rounded-xl shadow-lg p-1 text-sm">
        <button data-action="export-json" class="menu-item"><i class="fa-solid fa-file-export w-5"></i>Export JSON</button>
        <button data-action="import-json" class="menu-item"><i class="fa-solid fa-file-import w-5"></i>Import JSON</button>
        <button data-action="export-md" class="menu-item"><i class="fa-solid fa-file-lines w-5"></i>Export laporan Markdown</button>
        <button data-action="load-sample" class="menu-item"><i class="fa-solid fa-flask w-5"></i>Muat contoh (data fiktif)</button>
        <button data-action="rename" class="menu-item"><i class="fa-solid fa-pen w-5"></i>Ganti nama proyek</button>
        <button data-action="delete" class="menu-item text-red-600"><i class="fa-solid fa-trash w-5"></i>Hapus proyek</button>
      </div>
    </div>
    <input id="import-file" type="file" accept="application/json" class="hidden">
  </div>
  <nav id="step-nav" class="max-w-7xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto text-sm" aria-label="Langkah workflow"></nav>
</header>

<main id="workspace" class="max-w-7xl mx-auto px-4 py-6">
  <div id="notice" class="mb-4 text-xs text-gray-600 bg-white border border-line rounded-xl px-3 py-2">
    <i class="fa-solid fa-circle-info text-olive mr-1"></i>
    Data tersimpan <b>hanya di browser ini</b> (localStorage). Tidak ada model AI yang dipanggil, tidak ada akun eksternal yang terhubung, dan tidak ada yang dipublikasikan otomatis. Export JSON untuk backup.
  </div>
  <section id="view" aria-live="polite"></section>
</main>

<footer id="app-footer" class="max-w-7xl mx-auto px-4 py-8 text-xs text-gray-500 flex flex-wrap gap-4 justify-between">
  <span>Kuralivo · HOLBERY ecosystem · Draft AI bukan bukti atau persetujuan.</span>
  <span class="flex gap-3"><a class="underline" href="/api/chatgpt-profile" target="_blank" rel="noopener">Profil ChatGPT</a><a class="underline" href="/openapi.json" target="_blank" rel="noopener">OpenAPI (GPT Action)</a><a class="underline" href="/api/master-prompt" target="_blank" rel="noopener">Master prompt</a><a class="underline" href="/static/legacy/landing">Landing lama</a><a class="underline" href="/static/legacy/prompt-studio">Prompt Studio lama</a><a class="underline" href="/api/health" target="_blank" rel="noopener">Status API</a></span>
</footer>

<div id="toast" class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-deep text-white text-sm px-4 py-2 rounded-lg shadow-lg hidden" role="status"></div>
<script src="/static/app.js"></script>
</body>
</html>`
}
