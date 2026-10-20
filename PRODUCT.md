# Frontend Boilerplate — Product brief

## Positioning and audience

Fondasi frontend reusable untuk pengembang/AI yang membuat presentasi aplikasi klien dengan cepat, kemudian melanjutkan implementasi ke backend. Produk ini adalah starter teknis; tidak memilih domain bisnis klien.

## Operating context

React/TypeScript/Vite, browser ponsel dan desktop, light/dark/system. Font dan aset model sampel disajikan lokal. Penggunaan dasar tidak memerlukan backend, API key, akun atau layanan AI berbayar. Semua paket 3D/motion yang digunakan tersedia pada lockfile.

## Primary workflows

1. Pengembang membuat salinan proyek melalui generator, lalu menyusun PRODUCT.md dan DESIGN.md berdasarkan brief klien menggunakan skill lokal.
2. Pengembang membuat model/kontrak dan fitur sesuai feature-based guide; halaman mengonsumsi public API fitur.
3. Pengembang mempelajari sampel koleksi item: tambah, validasi, cari/filter, ubah status, reload persistence dan recovery error.
4. Pengembang memakai komponen UI/3D/motion/feedback yang diperlukan dan memeriksa browser, perangkat, tema, aksesibilitas serta batas integrasi nyata.

## Data and integrations

Sampel teknis memiliki Item(UUID,title,status active/archived,createdAt ISO), satu koleksi tanpa aktor/otorisasi bisnis. Source default localStorage dengan seed ilustratif stabil dan namespace appId; adapter HTTP tersedia dengan schema yang sama, tetapi server belum disediakan. Model/peran/scope produk klien ditentukan dari brief sebelum fixture/backend diintegrasikan.

## Scope and non-goals

Termasuk: 53 modul ui-v1 asli, struktur dan public boundary fitur, guide file/kode/desain, skill PRODUCT/DESIGN, sampel netral pilihan pengguna, local/HTTP adapter, tema, ikon SVG tanpa emoji, 3D dan loading/motion/fallback, font lokal, provenance aset, generator dan pengujian.

Tidak termasuk: aplikasi procurement/dashboard bisnis, data pelanggan nyata, login/otorisasi backend, pembayaran, kolaborasi multi pengguna, deployment publik atau bukti integrasi provider. Tidak semua primitive harus tampil pada homepage.

## Product principles

- Referensi teknis harus dapat dilanjutkan, bukan dibuang karena logika data bercampur dengan JSX.
- Model dan fakta produk mendahului pilihan layout dan data ilustratif.
- Perilaku loading/error/pending/success harus benar; tidak ada klaim backend/realtime/sukses palsu.
- Keterbacaan, tugas, keyboard, tema dan reduced motion mendahului dekorasi.
- Komponen source-owned, aset berprovenance dan batas pengujian harus mudah ditelusuri.

## Evidence and open decisions

Confirmed: permintaan pengguna untuk boilerplate feature-based lengkap, 53 modul ui-v1, skill pembuat PRODUCT/DESIGN, anti AI slop, ikon proper tanpa emoji, 3D/motion/loading, contoh netral serta kedua tema. Pengguna memilih koleksi item netral melalui klarifikasi pada 20 Oktober 2026. Inventaris komponen dan kode adalah bukti implementasi; STARTER_VERIFICATION mencatat hasil yang benar-benar dijalankan.

Proposed/default: token netral dan font Source Sans 3 sebagai titik awal, bukan identitas brand klien yang disetujui. Open untuk setiap proyek baru: domain/aktor, kontrak backend, brand, kebutuhan security/data, deployment dan acceptance bisnis.

## Acceptance

Semua modul/ekspor ui-v1 tetap tersedia; aturan arsitektur/ikon teruji; generator menghasilkan salinan yang dapat diinstal/check/build; sampel menjalankan alur utama dan error tanpa sukses palsu; viewer 3D benar-benar memuat GLB pada lingkungan WebGL dan menyediakan fallback bila tidak didukung; tema, font dan reduced motion konsisten. Skill dapat menghasilkan dua dokumen yang berisi fakta/usulan yang jelas tanpa membuat aplikasi di luar scope. Pengujian lokal tidak membuktikan backend atau seluruh perangkat klien.
