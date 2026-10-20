# Panduan desain yang tidak generik

DESIGN.md menyimpan keputusan proyek. Dokumen ini memberi cara memilih dan menilai keputusan; tidak memaksa semua klien memiliki estetika yang sama.

## Tentukan dunia produk

Mulai dari siapa penggunanya, pekerjaan utama, frekuensi, perangkat, pencahayaan, kepadatan data, serta aset/brand yang benar-benar tersedia. Catat fakta, asumsi dan pertanyaan. Ambil 2–3 referensi nyata dengan alasan spesifik: hierarki, pola navigasi, proporsi, atau tipografi. Jangan menyalin satu landing page sebagai jawaban semua produk.

Sebelum JSX, tentukan urutan informasi dan satu aksi utama per konteks. Operasional mengutamakan scanability dan input; presentasi menjelaskan mekanisme dan bukti; bacaan memerlukan struktur. Pilih layout karena kontennya, bukan karena generator terbiasa membuat sidebar dan empat KPI.

## Checklist keputusan yang harus ada di DESIGN.md

| Aspek          | Keputusan yang dapat diimplementasikan                                   |
| -------------- | ------------------------------------------------------------------------ |
| Hierarki       | urutan bagian, primary/secondary action, density, ukuran konten          |
| Tipografi      | font aktif, rentang bobot, skala, leading, measure dan angka             |
| Warna          | semantic tokens light/dark, arti status, fokus, contrast                 |
| Spacing/layout | rhythm, breakpoint, batas lebar, alignment, wrapping                     |
| Komponen       | ui-v1 yang dipakai, varian, pola form/list/detail/navigation             |
| Ikon           | Lucide SVG, nama/ukuran/stroke, aturan dekoratif vs interaktif           |
| Motion         | tujuan satu transisi, durasi/easing, reduced motion, tidak menunda tugas |
| 3D/gambar      | manfaat, sumber/lisensi, ukuran, lazy loading, DOM fallback              |
| States         | loading/pending/empty/error/retry/success/disabled dan teksnya           |
| Acceptance     | keyboard, fokus, perangkat, tema, konten panjang dan alur nyata          |

## Pola yang harus ditolak kecuali ada alasan produk

- Hero sangat besar pada layar kerja, deretan KPI palsu, card identik berisi ikon/judul/kalimat, serta card di dalam card.
- Eyebrow atau nomor bagian dekoratif, label generik seperti “Smart/Next-gen/Powerful” tanpa informasi, klaim/metrik/quote yang tidak bersumber.
- Gradien teks, glow, glass/blur dekoratif, grid latar palsu, partikel/floating blobs, atau 3D yang tidak menjelaskan objek/relasi.
- Ikon dari emoji/glyph Unicode; mencampur katalog, stroke dan fill tanpa aturan. Pakai SVG Lucide bernama.
- Semua section masuk dengan animasi yang sama, konten tersembunyi menunggu reveal, parallax/autorotate yang tidak bisa dihentikan, atau spinner yang tidak mengatakan apa yang ditunggu.
- Tombol mati, sukses palsu, data fixture yang diklaim realtime, skeleton yang tidak menyerupai bentuk konten, dan error tanpa pemulihan.

## Cara mendapatkan hasil yang khas tanpa berlebihan

Gunakan teks dan isi yang sesuai domain, bukan sekadar mengganti logo/warna. Susun kelompok lewat alignment, jarak dan ukuran teks sebelum menambah surface/shadow. Kepadatan, komposisi dan pola interaksi harus bervariasi mengikuti tugas, bukan mengikuti satu template. Satu detail khas yang berasal dari pekerjaan pengguna lebih kuat daripada puluhan efek dekoratif.

Font proyek disajikan lokal. Gunakan satu keluarga UI dengan bobot yang jelas; data numerik memakai tabular-nums. Warna status dilengkapi teks/ikon. Semua permukaan memiliki padanan light/dark, termasuk dropdown, toast, input, loading dan caption 3D. Kontras body/placeholder minimal 4.5:1 dan teks besar 3:1; jangan menilai dark mode hanya dari screenshot terang yang dibalik.

## Review sebelum menyerahkan

Periksa halaman dengan konten nyata/ilustratif yang jujur, nama panjang, nilai kosong/ekstrem dan error. Periksa ponsel + desktop, kedua tema, zoom, overflow, keyboard, fokus, reduced motion dan koneksi lambat. Lihat hasil browser yang sebenarnya. Cocokkan klaim dengan sumber dan kontrol dengan aksi nyata.

Bedakan hasil build/typecheck, smoke render, pengujian workflow, dan verifikasi backend. Kualitas tampilan tidak bisa dinyatakan selesai dari daftar library atau satu screenshot.
