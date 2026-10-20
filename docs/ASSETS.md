# Aset, sumber, dan lisensi

Font aktif disajikan lokal dari Fontsource; lisensi OFL disertakan. Seluruh ui-v1 berasal dari komponen yang diberikan pengguna; [inventaris](ui-v1-inventory.json) menyimpan hash sumber dan perubahan kompatibilitas. Dependency pihak ketiga mempertahankan lisensinya masing-masing.

## Aset yang disertakan

| Aset                                            | Sumber dan ketentuan                                                                                                                                            |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source Sans 3, IBM Plex Sans, Plus Jakarta Sans | Paket Fontsource tersedia; generator font menyalin hanya preset aktif beserta OFL. Lihat [panduan font](../README.md#tema-tipografi-dan-desain).                |
| `public/models/box.glb`                         | Box oleh Cesium, 2017, dari Khronos glTF Sample Assets; **CC BY 4.0**, file tidak diubah. Atribusi dan tautan sumber/lisensi tampil pada halaman contoh visual. |
| Geometri pada `GeometryPreview`                 | Dibentuk melalui kode Three.js; tidak mengambil model eksternal.                                                                                                |

Metadata file Box, hash, ukuran, pemilik, sumber unduhan, dan ketentuan redistribusi dicatat di [assets.manifest.json](../assets.manifest.json). Pemberitahuan sumber dan teks lisensi berada di [licenses](licenses/). `npm run assets` memeriksa metadata wajib, file lisensi, hash, ukuran, dan header GLB. Pemeriksaan ini tidak dapat menentukan sendiri legalitas aset baru; manusia/AI tetap harus membaca ketentuan sumbernya.

[Sumber resmi Box](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Box) menyebut copyright Cesium dan lisensi CC BY 4.0. [Ketentuan CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) mewajibkan atribusi, tautan lisensi, dan keterangan perubahan. Pertahankan atribusi ketika menyalin boilerplate; jika model diganti, sesuaikan halaman, manifest, dan pemberitahuan lisensinya.

## Gambar dari Google/internet

Tidak ada foto raster bawaan. Untuk proyek klien:

1. Cari subjek spesifik melalui Google Images atau internet; buka halaman pemilik aset.
2. Baca lisensi **per file**, termasuk penggunaan komersial, modifikasi, atribusi, dan redistribusi dalam template. Hasil pencarian atau label marketplace bukan izin penggunaan.
3. Pilih aset yang membantu tugas/konten. Catat author, halaman sumber, URL unduhan, tanggal akses, lisensi, atribusi, ukuran, dan SHA-256 sebelum memasukkannya ke proyek.
4. Simpan aset lokal yang boleh didistribusikan; optimalkan dimensinya dan sediakan alt sesuai fungsi gambar. Hindari hotlink yang bergantung pada URL stok acak.
5. Tambahkan entri manifest dan file lisensi. Checker mendukung entri aset umum; pemeriksaan header GLB berlaku untuk file dengan akhiran `.glb`.

Untuk font, unduh dari distributor resmi dan verifikasi ketentuan embedding/redistribusi. Untuk model, tekstur, animasi, serta komponen sumber seperti React Bits, periksa lisensi masing-masing; jangan menganggap semua aset suatu situs memakai CC0.

## 3D dan motion

Three.js, React Three Fiber, Drei, React Spring Three, dan Motion sudah terpasang. Model GLB disajikan lokal, engine/model dimuat ketika contoh visual dibuka, tidak memakai decoder CDN, dan komponen menyediakan fallback DOM serta reduced motion. Cara mengganti model dan batas runtime dijelaskan di [3D_MOTION_LOADING.md](3D_MOTION_LOADING.md).
