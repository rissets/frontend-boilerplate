---
name: Frontend Boilerplate
description: Starter teknis netral dengan token semantik, komponen reusable, dan dua referensi terpisah.
colors:
  light-background: '#f7f8fa'
  light-foreground: '#1b2430'
  light-card: '#ffffff'
  light-card-foreground: '#1b2430'
  light-popover: '#ffffff'
  light-popover-foreground: '#1b2430'
  light-primary: '#1e5f9e'
  light-primary-foreground: '#ffffff'
  light-secondary: '#eaf0f6'
  light-secondary-foreground: '#213d58'
  light-muted: '#eef1f5'
  light-muted-foreground: '#546477'
  light-accent: '#eaf0f6'
  light-accent-foreground: '#213d58'
  light-destructive: '#b42318'
  light-border: '#d6dee8'
  light-input: '#b7c4d3'
  light-ring: '#1e5f9e'
  light-chart-1: '#1e5f9e'
  light-chart-2: '#25816d'
  light-chart-3: '#94631c'
  light-chart-4: '#8056a0'
  light-chart-5: '#aa4f60'
  light-sidebar: '#ffffff'
  light-sidebar-foreground: '#1b2430'
  light-sidebar-primary: '#1e5f9e'
  light-sidebar-primary-foreground: '#ffffff'
  light-sidebar-accent: '#eaf0f6'
  light-sidebar-accent-foreground: '#213d58'
  light-sidebar-border: '#d6dee8'
  light-sidebar-ring: '#1e5f9e'
  dark-background: '#111820'
  dark-foreground: '#edf2f8'
  dark-card: '#19232e'
  dark-card-foreground: '#edf2f8'
  dark-popover: '#19232e'
  dark-popover-foreground: '#edf2f8'
  dark-primary: '#91bfee'
  dark-primary-foreground: '#132a42'
  dark-secondary: '#283b50'
  dark-secondary-foreground: '#deebf7'
  dark-muted: '#253241'
  dark-muted-foreground: '#b7c5d6'
  dark-accent: '#283b50'
  dark-accent-foreground: '#deebf7'
  dark-destructive: '#ffaaa1'
  dark-border: '#3e5166'
  dark-input: '#526a84'
  dark-ring: '#91bfee'
  dark-chart-1: '#91bfee'
  dark-chart-2: '#73cfb8'
  dark-chart-3: '#ebc482'
  dark-chart-4: '#c9a3e8'
  dark-chart-5: '#ef9eae'
  dark-sidebar: '#19232e'
  dark-sidebar-foreground: '#edf2f8'
  dark-sidebar-primary: '#91bfee'
  dark-sidebar-primary-foreground: '#132a42'
  dark-sidebar-accent: '#283b50'
  dark-sidebar-accent-foreground: '#deebf7'
  dark-sidebar-border: '#3e5166'
  dark-sidebar-ring: '#91bfee'
typography:
  display:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 1.875rem
    fontWeight: 600
    lineHeight: 2.25rem
    letterSpacing: -0.025em
  title:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.75rem
  body:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: '1.5'
  body-small:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  label:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: '1'
  control:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
  caption:
    fontFamily: Workspace, 'Segoe UI', Arial, sans-serif
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.625rem
  xl: 0.875rem
spacing:
  '1': 0.25rem
  '2': 0.5rem
  '3': 0.75rem
  '4': 1rem
  '5': 1.25rem
  '6': 1.5rem
  '8': 2rem
  '10': 2.5rem
  '12': 3rem
components:
  button-default:
    backgroundColor: '{colors.light-primary}'
    textColor: '{colors.light-primary-foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.5rem 1rem
  button-outline:
    backgroundColor: transparent
    textColor: '{colors.light-foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.5rem 1rem
  button-secondary:
    backgroundColor: '{colors.light-secondary}'
    textColor: '{colors.light-secondary-foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.5rem 1rem
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.light-foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.5rem 1rem
  button-link:
    backgroundColor: transparent
    textColor: '{colors.light-primary}'
    typography: '{typography.control}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.5rem 1rem
  button-destructive:
    backgroundColor: '{colors.light-destructive}'
    textColor: '#ffffff'
    typography: '{typography.control}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.5rem 1rem
  input:
    backgroundColor: transparent
    textColor: '{colors.light-foreground}'
    rounded: '{rounded.md}'
    height: 2.25rem
    padding: 0.25rem 0.75rem
  badge-secondary:
    backgroundColor: '{colors.light-secondary}'
    textColor: '{colors.light-secondary-foreground}'
    rounded: '{rounded.md}'
    padding: 0.125rem 0.5rem
  badge-outline:
    backgroundColor: transparent
    textColor: '{colors.light-foreground}'
    rounded: '{rounded.md}'
    padding: 0.125rem 0.5rem
  card:
    backgroundColor: '{colors.light-card}'
    textColor: '{colors.light-card-foreground}'
    rounded: '{rounded.xl}'
    padding: 1.5rem
  navigation-active:
    textColor: '{colors.light-primary}'
    typography: '{typography.control}'
---

# Design System: Frontend Boilerplate

## Overview

**Creative North Star: "Starter teknis netral"**

Sistem yang sudah diterapkan mengutamakan keterbacaan, urutan informasi, dan kontrol yang mudah dikenali. Satu keluarga sans, permukaan netral sejuk, aksen biru semantik, serta primitive ui-v1 yang terkendali memberi dasar konsisten untuk referensi teknis. Ini adalah keputusan awal starter; identitas brand, domain, density, dan kebutuhan layar klien tetap ditentukan dari brief.

Dokumen ini menggabungkan panduan awal dengan implementasi saat ini. Frontmatter adalah snapshot normatif bagi konsumen DESIGN.md, diturunkan dari [design.tokens.json](design.tokens.json), [stylesheet](src/styles/index.css), [font aktif](src/styles/font.css), dan komponen di `src/shared`. Sumber implementasi warna/radius tetap `design.tokens.json`: ubah kedua tema di sana, jalankan `npm run tokens`, lalu perbarui frontmatter dan [.impeccable/design.json](.impeccable/design.json) bersama. Jangan mengedit `tokens.css` secara manual. Ukuran, spacing, dan variasi komponen berasal dari kode serta theme Tailwind yang terpasang. Sidecar menyimpan shadow, motion, breakpoint, dan cuplikan primitive; bukan salinan screenshot atau aset kreatif.

Panduan cara memilih keputusan untuk proyek klien ada di [docs/DESIGN_GUIDE.md](docs/DESIGN_GUIDE.md). Sebelum layar baru, lengkapi [PRODUCT.md](PRODUCT.md) dan model data: pengguna, pekerjaan, informasi utama, aksi, perangkat, kepadatan, serta 2–3 referensi nyata dengan alasan spesifik. Pisahkan fakta, usulan, dan pertanyaan terbuka.

**Key Characteristics:**

- Hierarki melalui teks, jarak, alignment, dan kontras sebelum surface tambahan.
- Satu font UI lokal dan pasangan token light/dark pada seluruh layar.
- SVG Lucide bernama; tidak ada emoji atau glyph Unicode sebagai ikon.
- Status data serta pemulihan jelas; motion dan 3D mempunyai fungsi serta fallback.
- Komposisi starter sederhana; keputusan visual klien mengikuti pekerjaan dan brief.

## Colors

Palet memakai netral sejuk dengan biru untuk aksi dan pilihan. Nama token pada frontmatter memakai awalan `light-` dan `dark-` untuk menampung dua tema dalam skema datar; CSS runtime tetap memakai nama semantik tanpa awalan, misalnya `--primary`. Ringkasan komponen frontmatter menunjukkan baseline light; pasangan dark mengikuti peran semantik yang sama. Cuplikan sidecar memakai CSS custom properties runtime agar mengikuti tema aktif.

### Primary

`primary` dan `primary-foreground` membentuk pasangan aksi utama. Biru yang lebih terang pada tema gelap menjaga penekanan terhadap permukaan gelap. `ring` mengikuti aksen fokus; gunakan untuk fokus yang terlihat, bukan ornamen.

### Secondary

`secondary` / `secondary-foreground` memberi penekanan lebih rendah. `accent` / `accent-foreground` dipakai untuk hover dan pilihan pada primitive. Kesamaan beberapa nilainya saat ini adalah keputusan token starter, bukan dua brand berbeda.

### Neutral

`background` / `foreground` menentukan kanvas dan teks utama. `card` serta `popover` mempunyai pasangan foreground sendiri. `muted` / `muted-foreground` mendukung konten penjelas dan keadaan nonutama. `border` memisahkan kelompok; `input` membuat batas field dapat dikenali.

`destructive` memberi arti error/aksi berisiko dan selalu disertai label yang menjelaskan. Status Aktif/Diarsipkan pada koleksi memakai badge secondary/outline dengan teks; jangan mengasumsikan hijau/merah atau menambah warna bisnis yang belum diputuskan. Lima token chart dan keluarga sidebar tetap tersedia bagi modul ui-v1; tersedianya token tersebut tidak mewajibkan chart atau sidebar pada halaman.

**The Semantic Pair Rule.** Gunakan pasangan background/foreground sesuai perannya dan ubah light/dark bersama. Jangan mengunci surface satu halaman dengan warna literal atau menilai dark mode hanya dari pembalikan screenshot terang.

Tema dimulai dari `system`, mengikuti perubahan preferensi OS, dan menyimpan pilihan yang tersedia pada browser. `ThemeProvider` menerima `light`, `dark`, atau `system`; tombol shell berganti antara hasil light dan dark. Pilihan diterapkan sebelum React mount dan memberi `color-scheme` yang sesuai untuk kontrol native. Evaluasi kontras body/placeholder (minimal 4.5:1) dan teks besar (3:1) ketika mengganti token; angka ini adalah target penerimaan, bukan klaim semua komposisi otomatis lolos.

## Typography

**Display Font / Body Font:** Source Sans 3 lokal melalui alias CSS `Workspace`, dengan fallback `'Segoe UI', Arial, sans-serif`.

**Character:** Satu sans yang mudah dibaca untuk judul, isi, label, dan kontrol. Hierarki menggunakan ukuran serta bobot yang jelas, tanpa mengubah keluarga per halaman. Font variable aktif mempunyai rentang bobot 200–900; pola antarmuka memakai 400/500/600. Font ditampilkan dengan `font-display: swap`.

### Hierarchy

| Peran frontmatter   | Pemakaian yang diamati                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| `display`           | Judul beranda pada lebar `sm` ke atas; pada ponsel memakai ukuran `headline`. Ini bukan kewajiban hero besar. |
| `headline`          | Judul halaman contoh; tracking rapat konsisten.                                                               |
| `title`             | Judul bagian visual.                                                                                          |
| `body`              | Isi utama dan deskripsi pembuka.                                                                              |
| `body-small`        | Navigasi, penjelasan form/status, dan caption objek.                                                          |
| `label` / `control` | Label field ber-leading rapat serta teks tombol bernilai medium.                                              |
| `caption`           | Atribusi dan metadata berprioritas rendah.                                                                    |

Input memakai ukuran isi pada ponsel dan beralih ke ukuran kecil pada `md` ke atas. Pembuka halaman dibatasi ke lebar bacaan (`max-w-2xl`, 42rem), tanpa memaksa semua tabel/form mengikuti measure bacaan tersebut. Gunakan `tabular-nums` ketika angka dibandingkan, seperti output sudut objek; font mono hanya ketika membantu kode/angka, bukan aksen dekoratif.

### Konfigurasi font

[app.config.json](app.config.json) menetapkan `name`, `appId`, dan `font`. Preset yang tersedia: `source-sans-3` (aktif), `ibm-plex-sans`, dan `plus-jakarta-sans`. Ubah nilai `font`, jalankan `npm run fonts`, lalu perbarui keputusan tipografi dokumen ini. Script menyalin WOFF2 Latin normal terpilih ke `public/fonts`, mempertahankan alias `Workspace`, dan menyediakan lisensi OFL di `docs/licenses`. Pilih satu keluarga UI untuk proyek; dukungan karakter tambahan harus disiapkan bila bahasa klien melampaui subset yang disediakan.

Ukuran awal panduan proyek baru tetap 14/16px untuk isi, 20/24px untuk bagian, dan 28/32px untuk judul halaman, disesuaikan konteks. Nilai tersebut adalah titik evaluasi brief, bukan pengganti ukuran yang benar-benar diterapkan pada frontmatter.

## Layout

Shell `PageFrame` terpusat, lebar maksimum 64rem, padding horizontal 20px pada layar kecil dan 32px mulai `sm`, serta padding vertikal 24px. Header memakai flex yang dapat membungkus, gap 16px, garis bawah, dan ruang bawah 20px. Konten utama mulai 40px setelah header dan mempunyai ruang bawah 32px. Breakpoint aktif pada komposisi ini adalah `sm` (40rem / 640px) dan `md` (48rem / 768px); nilai tersebut mengikuti theme Tailwind terpasang.

Ritme inti adalah kelipatan 4px. Frontmatter memuat langkah yang berulang dalam implementasi; utamakan 4/8/12/16/24/32/48px dan gunakan 20/40px ketika sesuai shell yang ada. Jarak antarbagian lebih besar daripada jarak isi dalam satu kelompok. Bagian visual memakai jarak 48px, kelompok koleksi 24px, dan kontrol yang berkaitan memakai jarak lebih rapat.

Pada ponsel, navigasi membungkus secara alami tanpa sidebar baru. Form tambah item ditumpuk, lalu sejajar mulai `sm`; pencarian/filter serta kontrol scene dapat membungkus. Tabel menyediakan scroll horizontal bila dibutuhkan dan nama item mengizinkan wrapping; pertahankan keterbacaan teks panjang sebelum menyembunyikan kolom. Canvas setinggi 320px pada ponsel dan 384px mulai `sm`.

Komposisi starter saat ini mempunyai beranda ringkas dan dua contoh terpisah: referensi fitur koleksi serta referensi visual. Beranda/pembuka mendukung membaca dan memilih tujuan, sedangkan koleksi mendukung input, pencarian, filter, dan aksi baris. Pertahankan cakupan ini selama mengembangkan starter. Untuk proyek klien, pilih susunan layar dari pekerjaan pengguna; jangan menaikkan komposisi contoh menjadi aturan semua produk.

## Elevation & Depth

Sebagian besar halaman tetap datar: warna surface, border tipis, dan jarak memberi pemisahan. Primitive memakai shadow kecil secara selektif, sehingga sistem ini tidak sepenuhnya tanpa shadow. Outline button, input, dan trigger select memakai `shadow-xs`; Card memakai `shadow-sm`; popover/select memakai `shadow-md`; dialog memakai `shadow-lg` dan overlay gelap. Nilai persisnya dicatat pada `extensions.shadows` di sidecar dari theme Tailwind yang terpasang.

Jangan menambah glow, glass/blur, gradien, background grid, atau lapisan kartu hanya untuk membuat starter terlihat ramai. Gunakan surface/border ketika benar-benar memisahkan informasi atau menandai konteks interaksi. Efek fokus berbeda dari elevasi: field/tombol ui-v1 memakai border ring dan ring 3px beropasitas 50%; elemen lain mendapat outline global 2px dengan offset 3px.

3D adalah representasi objek pada contoh visual, bukan dekorasi hero. Canvas transparan berada di surface `card`; material GLB mengikuti aset dan material kubus bawaan tetap merupakan warna objek, bukan token surface UI. Pedoman resource, model, dan batas grafis ada di [docs/3D_MOTION_LOADING.md](docs/3D_MOTION_LOADING.md).

## Shapes

Sudut membulat ringan dengan `--radius` dasar 0.625rem. Radius `sm`, `md`, `lg`, dan `xl` pada frontmatter adalah hasil rumus `index.css` terhadap dasar itu; jangan mengambil radius bawaan Tailwind yang telah dioverride. Tombol, field, badge, dan skeleton memakai `md`; canvas/dialog memakai `lg`; Card memakai `xl`. Border normal satu piksel dan mengikuti token semantik. Badge status tetap persegi membulat, bukan pill baru. Ikon memakai bentuk SVG Lucide dengan stroke yang konsisten; umumnya 16px pada kontrol, 24px pada empty state, dan 32px pada fallback objek.

## Components

Gunakan [53 modul ui-v1](docs/UI_COMPONENTS.md) yang tersedia di `src/shared/ui`. Tidak semua primitive harus tampil pada beranda. Feedback, layout, motion, dan three adalah kelompok reusable tersendiri di `src/shared`; inventaris ui-v1 tidak ditambah dengan wrapper tersebut.

### Buttons

Tombol berteks menjelaskan tindakan. Varian yang tersedia: `default`, `destructive`, `outline`, `secondary`, `ghost`, dan `link`. Default memakai pasangan primary; secondary memakai pasangannya; outline transparan dengan border; ghost menegaskan hover; link memakai warna primary dan underline saat hover. Hover default/secondary menurunkan opasitas warna sesuai primitive. Destructive memakai teks putih dengan background destructive; primitive memberi opasitas background khusus pada tema gelap, jadi uji komposisinya bila dipakai untuk alur baru.

Ukuran default tinggi 36px dengan padding horizontal 16px (12px bila ada SVG langsung), small 32px, large 40px, dan icon 36px; icon-small/icon-large mengikuti 32/40px. Tombol nonaktif memakai opasitas 50% dan menolak interaksi. Pertahankan ring fokus, label aksesibel pada tombol ikon, dan ruang klik sesuai perangkat; ukuran primitive adalah baseline yang perlu dievaluasi untuk konteks sentuh klien. Tombol tidak boleh menjadi dekorasi.

### Inputs / Fields

Field memakai border input, surface transparan, dan background input beropasitas rendah pada tema gelap. Tinggi 36px, padding horizontal 12px, sudut `md`, shadow paling ringan. Fokus memperjelas border/ring; invalid memakai destructive dan pesan yang menjelaskan perbaikan, bukan warna saja. Label, bantuan, dan pesan error tetap terhubung dengan input. Pertahankan perilaku IME pada Input/Dialog dan jangan memotong komposisi teks dengan shortcut Enter/Escape.

Contoh koleksi memakai `Form`/`Input`, label yang jelas, batas judul 80 karakter, pencarian, dan select native berlabel. Field tidak direset bila penyimpanan gagal; keberhasilan diumumkan setelah mutation selesai.

### Badges / Tables

Badge Aktif menggunakan secondary; Diarsipkan menggunakan outline. Teks membawa arti status. Badge memakai ukuran caption dengan bobot medium, padding horizontal 8px, dan vertikal 2px. Tabel berukuran isi kecil, header medium, pemisah baris, serta highlight hover muted beropasitas rendah. Nama item boleh membungkus; aksi baris ditempatkan di kanan dengan label yang menyertakan nama item untuk aksesibilitas.

### Cards / Overlays

Card yang tersedia memakai pasangan card, border, radius `xl`, shadow kecil, dan ruang internal 24px. Pakai hanya ketika kelompok konten membutuhkannya; halaman contoh tidak dibungkus berulang dalam kartu. Popover/select memakai pasangan popover dan dialog memakai background dengan overlay, batas lebar responsif, serta kontrol penutup yang dapat diakses.

### Navigation

Header menampilkan nama dari `app.config.json`, dua tautan contoh, dan tombol tema SVG. Navigasi default memakai muted-foreground, hover menjadi foreground, dan tujuan aktif memakai primary serta bobot medium. Header membungkus pada ponsel. Skip link muncul saat difokuskan dan mengarah ke konten utama; pertahankan urutan keyboard dan penanda tujuan aktif.

### Feedback / Motion

`LoadingState` menyebut konten yang ditunggu bersama spinner SVG; `ContentSkeleton` mengulang bentuk baris konten, bukan persentase buatan. `EmptyState` menjelaskan langkah awal atau perubahan filter. `ErrorState` memberi pesan spesifik serta retry bila pemulihan tersedia. `AsyncBoundary` mengisolasi kegagalan lazy module/scene. Lengkapi pending, success, dan disabled sesuai operasi; jangan mengubah kegagalan HTTP menjadi keberhasilan lokal. Status ilustratif harus disebutkan jujur, tanpa klaim realtime/backend.

`MotionProvider` memakai `LazyMotion` dan preferensi reduced motion pengguna. Token DOM adalah fast 140ms, normal 220ms, slow 320ms, dengan ease-out `cubic-bezier(0.16, 1, 0.3, 1)`; slow tersedia tetapi bukan kewajiban pemakaian. `Reveal` menggeser konten yang sudah terlihat sejauh 8px satu kali; `PresenceMessage` memudarkan perubahan teks singkat dalam live region. Jangan memasangnya otomatis pada seluruh bagian. Reduced motion meniadakan durasi wrapper dan spring; global CSS memendekkan animasi/transisi, sementara spinner/skeleton pada wrapper feedback berhenti beranimasi.

### 3D

`ModelViewer` memuat GLB lokal secara lazy; `GeometryPreview` menunjukkan geometri native. `SceneCanvas` menyediakan caption DOM, status loading/ready/unavailable, boundary error, dan fallback tanpa WebGL2. Renderer demand membatasi DPR ke 1–1.5 serta memakai preferensi low-power; tidak ada autorotate atau damping otomatis. Tombol berlabel memutar objek 45 derajat dan baru aktif saat siap. Reset mengembalikan rotasi objek, bukan kamera yang diseret. Spring memakai tension 170/friction 26 dan langsung berubah bila reduced motion aktif.

Kegagalan model menyediakan retry yang membersihkan cache URL; hilangnya konteks grafis memberi fallback DOM dan arahan memuat ulang. Nama/caption tetap dapat dibaca ketika grafis tidak tersedia. Gunakan [manifest aset](assets.manifest.json) untuk hash, sumber, lisensi, perubahan, dan atribusi; pertahankan atribusi Box pada halaman bila aset dipakai. Foto ditemukan melalui pencarian internet dengan pencatatan pemilik, izin penggunaan/redistribusi, lisensi, dan atribusi; Google Images adalah alat penemuan, bukan lisensi.

## Do's and Don'ts

### Do:

- **Do** mulai dari brief, model data, urutan informasi, dan satu aksi utama per konteks; pisahkan keputusan klien dari default starter.
- **Do** gunakan semantic tokens untuk seluruh surface, termasuk input, popover, toast, caption, loading, dan kedua tema; perbarui sumber serta dokumen bersama.
- **Do** gunakan satu keluarga UI lokal, bobot yang jelas, tabular-nums untuk angka yang dibandingkan, dan SVG Lucide bernama.
- **Do** siapkan loading, pending, empty, error, retry, success, dan disabled yang benar; nyatakan keberhasilan setelah operasi benar-benar tersimpan.
- **Do** evaluasi konten panjang/ekstrem, keyboard, fokus, IME, ponsel/desktop, zoom, overflow, kedua tema, reduced motion, dan koneksi lambat pada browser.
- **Do** pakai 3D/gambar ketika menjelaskan objek atau tugas, dengan lazy loading, fallback DOM, dan provenance aset.
- **Do** jelaskan data ilustratif secara jujur serta bedakan hasil build, smoke render, workflow, dan integrasi backend pada laporan verifikasi.

### Don't:

- **Don't** menambah KPI palsu, sidebar, avatar, chart, kartu identik/kartu bersarang, hero kerja berlebihan, atau 3D tanpa kebutuhan produk.
- **Don't** memakai eyebrow/nomor bagian dekoratif, klaim/metrik/quote tanpa sumber, gradien teks, glow, glass, partikel, atau grid latar sebagai pengganti hierarki.
- **Don't** memakai emoji atau glyph Unicode sebagai ikon, mencampur katalog/stroke tanpa aturan, atau membuat tombol ikon tanpa nama aksesibel.
- **Don't** mengunci warna surface per halaman, memakai status tanpa label, atau menganggap palet/font starter sebagai identitas klien yang sudah disetujui.
- **Don't** menyembunyikan konten menunggu reveal, mengulang animasi setiap section, menghambat input, atau menambahkan parallax/autorotate yang tidak dapat dihentikan.
- **Don't** menyajikan tombol mati, sukses palsu, fixture sebagai realtime, atau error tanpa jalan pemulihan yang tersedia.
- **Don't** memakai kata utuh “demo” pada antarmuka/ekspor klien atau mengklaim alur klien selesai hanya dari lint, build, daftar library, atau screenshot beranda.
