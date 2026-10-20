# Research dan pemakaian skill frontend

Ditinjau 21 Oktober 2026 dari keenam tautan pengguna, kemudian isi lengkap SKILL.md, referensi yang relevan, metadata commit, serta lisensi repository asal diperiksa. Salinan project-local berada di `.agents/skills`; sumbernya dipatok melalui [skills.sources.json](../skills.sources.json). Tidak ada pemasangan global atau dependency browser baru untuk membaca skill.

## Keputusan untuk enam skill

| Skill dan sumber                                                                                                                                                             | Kegunaan pada starter                                                             | Penerapan/batas konteks                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [vercel-react-best-practices](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-best-practices)                         | Prioritas waterfall, bundle, subscription dan render.                             | Pertahankan lazy route/3D, query dedup dan state turunan; hindari memo yang tidak terbukti diperlukan. Aturan Next/RSC/server tidak diterapkan pada Vite CSR.                    |
| [vercel-composition-patterns](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/composition-patterns)                         | Komposisi children, API komponen dan pemisahan state.                             | Gunakan komposisi ui-v1 dan varian eksplisit; provider hanya jika state benar-benar dibagi. Satu flag disabled/pending bukan alasan membuat compound framework baru.             |
| [shadcn](https://github.com/shadcn-ui/ui/tree/ba1503c64472b82256d9de95e2e62c5901a38e8b/skills/shadcn)                                                                        | Memilih, menyusun dan menyesuaikan primitive sesuai API sebenarnya.               | components.json memetakan Radix, Lucide, Tailwind v4, alias shared dan CSS yang sudah ada. CLI read-only mengenali 53 modul. Versi UI pengguna tetap menjadi acuan implementasi. |
| [webapp-testing](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/webapp-testing)                                                   | Inspect-rendered-DOM sebelum bertindak, lifecycle server, screenshot dan console. | Suite Node Playwright tetap menjadi jalur utama. Helper Python upstream tersedia sebagai alat opsional, tanpa memasang Python Playwright pada runtime frontend.                  |
| [typescript-advanced-types](https://github.com/wshobson/agents/tree/0874a27b17a22e2b7c2e2bcd725768e0803cad06/plugins/javascript-typescript/skills/typescript-advanced-types) | Generic berconstraint, inferensi, utility types dan discriminated unions.         | Pertahankan inferensi schema Zod dan generic apiRequest; gunakan advanced type hanya untuk kontrak nyata. Typecheck tetap wajib pada check/build.                                |
| [tailwind-design-system](https://github.com/wshobson/agents/tree/0874a27b17a22e2b7c2e2bcd725768e0803cad06/plugins/frontend-mobile-development/skills/tailwind-design-system) | CSS-first Tailwind v4, token semantik, CVA, state dan responsivitas.              | Sumber token tetap design.tokens.json -> tokens.css -> @theme inline. Gunakan theme/font proyek dan varian ui-v1, bukan menyalin palet/radius contoh upstream.                   |

Vercel dan wshobson berlisensi MIT; shadcn membawa MIT beserta copyright aslinya. webapp-testing membawa Apache-2.0. File lisensi/notice tercantum pada manifest dan ikut generator. Vercel mendeklarasikan MIT pada frontmatter; repository pada revisi yang dipatok tidak memiliki LICENSE terpisah. Deklarasi asli dipertahankan dan [catatan lisensi](licenses/vercel-agent-skills-MIT.txt) menyertakan teks izin MIT tanpa mengarang notice copyright upstream.

## Memilih skill sesuai pekerjaan

Baca [skill starter](../skills/frontend-starter/SKILL.md) dan PRODUCT/DESIGN terlebih dahulu. Muat entrypoint di bawah sesuai pekerjaan, kemudian hanya rule/reference yang dibutuhkan; jangan membaca keenam panduan lengkap untuk perubahan sederhana.

| Pekerjaan                                             | Entrypoint lokal                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Performa React, fetch, subscription, lazy loading     | [.agents/skills/vercel-react-best-practices/SKILL.md](../.agents/skills/vercel-react-best-practices/SKILL.md) |
| Props/variants, children, provider/compound component | [.agents/skills/vercel-composition-patterns/SKILL.md](../.agents/skills/vercel-composition-patterns/SKILL.md) |
| Primitive, form, dialog, registry, penyesuaian ui-v1  | [.agents/skills/shadcn/SKILL.md](../.agents/skills/shadcn/SKILL.md)                                           |
| Kontrak/generic/inferensi/state kompleks              | [.agents/skills/typescript-advanced-types/SKILL.md](../.agents/skills/typescript-advanced-types/SKILL.md)     |
| Token, tema, CVA, responsive layout                   | [.agents/skills/tailwind-design-system/SKILL.md](../.agents/skills/tailwind-design-system/SKILL.md)           |
| Browser workflow, selector, screenshot, console/error | [.agents/skills/webapp-testing/SKILL.md](../.agents/skills/webapp-testing/SKILL.md)                           |

Permintaan brief-only tetap menghasilkan PRODUCT.md/DESIGN.md tanpa otomatis membuat aplikasi, halaman showcase, chat, atau fitur bisnis. Agent yang mendukung project skills dapat menggunakan direktori `.agents/skills`; AGENTS.md dan skill starter menyediakan tautan eksplisit bila discovery agent berbeda.

## Penyesuaian yang mengikat pada proyek ini

Instruksi pengguna dan konteks proyek tetap mengatur scope. Panduan upstream adalah referensi teknis; contoh produknya bukan kebutuhan bisnis pengguna. Terapkan aturan pada stack dan versi yang terpasang, dengan penyesuaian berikut.

### React dan composition

- Vite CSR memakai React.lazy/import()/Suspense, bukan next/dynamic. Jangan menambah Next.js, RSC, Server Actions, cache server atau script hydration hanya untuk mengikuti contoh upstream.
- TanStack Query tetap memiliki query/mutation, dedup, abort dan invalidasi. Jangan menambah SWR untuk tugas yang sudah ditangani Query. Pertahankan query key berscope.
- Public API fitur berupa index.ts bernama tetap wajib. Larangan barrel besar diterapkan pada katalog wildcard; bukan izin deep import internal fitur dari halaman. UI diimpor per modul. Lucide memakai ekspor bernama yang bertipe; jangan mengakses path dist yang tidak memiliki kontrak tipe publik.
- Hitung state turunan sederhana saat render. Profilkan sebelum menambah memo/useMemo/useCallback. Mulai operasi async independen secara paralel jika tidak merusak urutan bisnis; operasi dependen tetap berurutan.
- Pertahankan children/varian yang jelas. Jangan memaksa setiap komponen pendek menjadi provider dan compound API. React 19 mendukung pola ref baru, tetapi helper/ui-v1 kompatibel tidak dimigrasikan massal tanpa kebutuhan dan pengujian.

### shadcn dan ui-v1

```sh
npm run ui:info
npm run ui:docs -- button dialog input
```

Kedua perintah memakai CLI shadcn **4.22.1**; eksekusi pertama dapat mengunduh CLI. Periksa hasil `info`, buka dokumentasi yang dikembalikan `docs`, lalu baca source lokal. components.json hanya menambahkan metadata CLI; tidak menerapkan preset, font, palet, atau mengganti 53 modul. new-york adalah metadata kompatibilitas legacy Radix, bukan klaim bahwa ui-v1 identik dengan registry terbaru.

Gunakan primitive/varian yang tersedia, nama aksesibel, komposisi form/overlay yang benar, SVG Lucide dan semantic tokens. Jangan menjalankan init, apply preset, add --all, atau overwrite sebagai efek samping membuat DESIGN.md. Untuk penambahan/updating yang diminta pengguna, tinjau dry-run/diff terlebih dahulu dan pertahankan penyesuaian lokal serta inventaris ekspor. Jangan mencampur API Base UI dengan Radix. Aturan baru seperti data-icon, FieldGroup, atau penggantian space-y tidak menjadi alasan rewrite massal ui-v1; cocokkan kontrak versi source terlebih dahulu.

### TypeScript dan Tailwind

- unknown pada boundary, parse runtime dengan Zod, lalu infer model dan input. Generic/utility/discriminated union dipakai bila menghilangkan state tidak valid atau duplikasi kontrak, bukan sekadar menunjukkan kemampuan tipe.
- Jangan menyalin contoh advanced type tanpa mengompilasinya. Test tipe harus benar-benar menghasilkan kegagalan compiler pada penggunaan salah, misalnya @ts-expect-error, atau assertion expectTypeOf yang nyata. Beberapa snippet upstream adalah ilustrasi; bukan file siap ditempel.
- Saran upstream untuk melewati typecheck pada build **tidak diadopsi**. npm run build tetap menjalankan tsc -b; strict dan validasi respons dipertahankan.
- CSS-first @theme inline dan custom dark variant sudah ada. Jangan membuat tailwind.config.ts v3 atau sumber warna kedua. Hex saat ini tetap canonical; penggunaan OKLCH contoh upstream tidak mewajibkan migrasi palet.
- Ubah primitive/CVA ketika desain komponen berubah; hindari override warna acak di halaman. Evaluasi light/dark, fokus, error, disabled, reduced motion dan ponsel bersama.

### Testing

Suite proyek menggunakan Playwright Test/TypeScript yang sudah terpasang, locator role/name, fixture terisolasi, webServer, trace serta screenshot kegagalan. Gunakan DOM hasil render untuk menentukan selector, lalu assertion yang menunggu state sasaran; jangan menjadikan sleep/networkidle sebagai bukti siap untuk semua aplikasi, terutama polling/SSE. [Panduan resmi Playwright](https://playwright.dev/docs/best-practices) mendukung pengujian perilaku pengguna, isolasi, dan locator dengan auto-wait.

Helper Python upstream dapat dipakai saat runner terpisah memang diperlukan:

```sh
python3 .agents/skills/webapp-testing/scripts/with_server.py --help
```

Ia mengelola proses server dan memerlukan Python; otomasi Python browser juga memerlukan paket/browser Playwright Python tersendiri. Pemeriksaan helper bukan bukti browser: hasil workflow browser tetap harus dilaporkan terpisah. Untuk jalur umum gunakan npm run test:browser.

## Integritas, pembaruan, dan bukti

```sh
npm run skills:check
npm run check
npm run build
npm run test:browser
```

Checker memeriksa commit penuh, identitas skill, hash/ukuran seluruh 125 file sumber, resource yang hilang/tidak tercatat (cache Python dan .DS_Store diabaikan), dan keberadaan lisensi/notice tanpa menjalankan kode upstream. Test negatif memastikan modifikasi instruksi, file asing dan resource hilang ditolak. Manifest checksum adalah deteksi perubahan terhadap snapshot lokal; bukan tanda tangan penerbit.

Generator menyalin keenam skill, manifest dan components.json. Skill/vendor tetap di luar src/public/dist dan tidak menambah JavaScript browser. Formatter/linter proyek tidak menulis ulang sumber vendor. Pembaruan harus eksplisit: baca diff revisi baru beserta lisensinya, ganti snapshot/manifest bersama, tinjau penyesuaian konteks di dokumen ini, lalu jalankan pemeriksaan. Jangan memperbarui seluruh skill global atau menjalankan shell substitutions dalam SKILL.md secara otomatis.

Salinan Vercel React AGENTS.md mempunyai tiga tautan relatif upstream yang tidak mengarah ke folder rules. Sumber dipertahankan byte-for-byte; pilih file individual pada rules/ dari entrypoint SKILL.md ketika membutuhkan rincian. Jangan memperbaiki snapshot diam-diam atau menganggap tautan tersebut sebagai resource tambahan yang hilang dari paket.

Hasil verifikasi integrasi dicatat terpisah pada [STARTER_VERIFICATION.md](STARTER_VERIFICATION.md). Dokumen ini menjelaskan sumber, keputusan dan alur pemakaian; keberadaan skill sendiri tidak membuktikan kualitas semua hasil AI di masa depan.
