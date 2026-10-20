# Panduan untuk AI dan kontributor

Ini boilerplate, dengan contoh teknis koleksi item yang diminta pengguna. Jangan mengubahnya menjadi aplikasi bisnis tanpa brief proyek. Gunakan skill lokal [frontend-starter](skills/frontend-starter/SKILL.md) ketika membuat brief atau fitur baru.

## Skill frontend pendukung

Keenam skill yang diminta pengguna tersedia project-local pada `.agents/skills`, dengan commit/hash/lisensi pada skills.sources.json. Ikuti [routing dan hasil research](docs/AI_SKILLS.md) untuk memilih skill sesuai tugas: React/performance, composition, shadcn, TypeScript, Tailwind, atau browser testing. Baca entrypoint dan rule yang relevan, bukan seluruh paket sekaligus.

Konteks starter mengatur penerapannya: Vite CSR, React 19, TanStack Query, Zod, Tailwind v4, Radix/ui-v1 dan SVG Lucide. Public API fitur, strict typecheck saat build, sumber token, tema dan scope pengguna tetap berlaku. Contoh Next.js/SWR/Base UI/preset/showcase upstream tidak otomatis diterapkan. Tidak ada update vendor, instalasi global, reinitialisasi atau overwrite komponen sebagai efek samping membaca skill. Periksa npm run skills:check ketika integrasi berubah.

## Sebelum menulis kode

1. Baca PRODUCT.md dan DESIGN.md. Jika brief belum memuat kebutuhan klien, gunakan workflow brief pada skill untuk membuat/melengkapi keduanya dari fakta pengguna. Tandai asumsi dan pertanyaan terbuka; jangan mengarang domain, brand, data pelanggan atau klaim keberhasilan.
2. Baca [arsitektur](docs/ARCHITECTURE.md), [aturan folder/file/kode](docs/CODE_GUIDE.md), dan [model data](docs/DATA_MODEL.md). Tentukan pemilik fitur dan kontrak data sebelum membuat folder, file atau fixture.
3. Untuk perubahan visual baca [anti AI slop](docs/DESIGN_GUIDE.md). Untuk scene/animasi/status baca [3D, motion dan loading](docs/3D_MOTION_LOADING.md).

## Aturan implementasi

- Lapisan: app -> pages -> features -> shared. Halaman mengimpor fitur melalui index.ts; fitur tidak mengimpor fitur lain, pages, atau app. Komposisikan beberapa fitur di halaman. Model tidak bergantung pada API/UI. API tidak bergantung pada UI.
- Folder fitur memakai kebab-case. Komponen baru memakai PascalCase.tsx dan named exports; schema, repository, hooks dan helper mengikuti suffix/contoh CODE_GUIDE. File ui-v1 serta helper kompatibilitas mempertahankan nama aslinya.
- Gunakan 53 modul ui-v1 di src/shared/ui; jangan mengedit sumber asli di frontend-component. Tambahkan reusable feedback, layout, motion dan three pada direktori shared yang sesuai, bukan ke inventaris ui-v1.
- Semua ikon adalah SVG Lucide dari shared/icons atau SVG authored yang telah disepakati. Tidak boleh ada emoji atau glyph Unicode sebagai pengganti ikon. Tombol ikon perlu nama aksesibel; ikon dekoratif memakai aria-hidden. Jangan mengimpor seluruh katalog ikon secara dinamis.
- UI membaca data melalui query/mutation fitur. Validasi input dan respons pada boundary. Adapter lokal dan HTTP harus mematuhi schema yang sama; kegagalan HTTP tidak berubah menjadi keberhasilan lokal.
- Siapkan loading, pending, empty, error, retry, success dan disabled sesuai kebutuhan. Pertahankan input IME, keyboard dan fokus. Tampilkan keberhasilan setelah data benar-benar tersimpan.
- Tema light/dark/system dan font proyek harus berlaku pada semua layar. Gunakan semantic tokens; jangan mengunci warna permukaan per halaman. Tidak ada kata utuh demo dalam antarmuka/ekspor klien. Data ilustratif harus disebutkan secara jujur.
- Impor scene 3D secara lazy, gunakan demand rendering, DPR terbatas, loading serta DOM fallback. Hormati reduced motion. Catat aset beserta hash, sumber, lisensi, perubahan dan atribusi di assets.manifest.json.

## Selesai berarti terverifikasi

Jalankan npm run check dan npm run build. Uji alur yang diubah pada browser, termasuk tema dan ponsel. Periksa bahwa 53 modul/285 ekspor ui-v1 tetap terintegrasi. Laporkan pengujian aktual dan batasnya; build bukan bukti integrasi backend atau seluruh workflow klien. Jangan memasang skill global, mengirim pesan, memakai layanan berbayar, atau mempublikasikan proyek tanpa instruksi yang sesuai.
