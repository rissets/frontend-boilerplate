# Model sebelum backend

Untuk setiap fitur, tentukan entity/ID, relasi, ownership/scope, status/transisi, validasi, date-only vs timestamp, decimal/mata uang, pagination/filter dan bentuk error. Simpan kontrak serta schema runtime bersama fitur. Pisahkan domain, form input, dan DTO jika bentuknya berbeda.

Gunakan schema yang sama untuk memeriksa respons API dan fixture lokal. Factory fixture perlu seed/tanggal acuan stabil, foreign key valid dan satu sumber record untuk angka turunan. Pilih adapter lokal/HTTP di layer API fitur; jangan menaruh if local/remote di komponen. Jangan mereseed perubahan diam-diam atau mengubah error remote menjadi sukses fixture.

Boilerplate menyediakan `apiRequest(path, responseSchema)`, Query provider dan Zod. Referensi konkret tersedia di `src/features/example-items`: schema ID UUID, judul, status active/archived, createdAt UTC; input tambah dan ubah status memiliki schema sendiri. Fixture tetap dan adapter localStorage/HTTP menjalankan kontrak yang sama. Lihat [contoh fitur](EXAMPLE_FEATURE.md) untuk struktur, penggunaan, error, serta kontrak endpoint.

Adapter lokal memvalidasi data sebelum membaca/menyimpan, mempertahankan data rusak hingga pengguna memilih pemulihan, dan tidak melaporkan sukses jika penulisan gagal. Pemulihan hanya menyentuh namespace koleksi contoh. Adapter HTTP memvalidasi respons dan tidak beralih diam-diam ke fixture saat server gagal. Pilih sumber melalui `VITE_EXAMPLE_DATA_SOURCE`; restart Vite setelah mengubah environment.

Entitas bisnis, ownership/auth, pagination server, dan integrasi backend diisi sesuai kebutuhan proyek; belum ada endpoint backend yang diklaim tersedia. Skema item ini adalah contoh teknik, bukan model bisnis wajib untuk semua proyek.
