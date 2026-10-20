# Contoh fitur: koleksi item

Buka `/examples/feature`. Ini referensi teknis netral yang diminta pengguna, bukan aplikasi bisnis untuk klien. Halaman awal tetap starter. UI menyatakan record lokal sebagai data ilustratif; tidak memakai kata demo.

## Coba alurnya

1. Buka halaman; skeleton muncul saat adapter lokal membaca koleksi. Tambahkan nama kosong untuk melihat validasi, kemudian nama valid untuk menyimpan item.
2. Cari nama, pilih status, arsipkan/aktifkan item. Hasil sukses muncul sesudah operasi dan cache diperbarui. Reload mempertahankan perubahan pada origin browser yang sama.
3. Cari nama yang tidak ada untuk melihat empty state. Tombol Pulihkan sampel hanya menghapus namespace contoh ini, lalu kembali ke seed awal; tidak menghapus data lain.
4. Untuk error, pengujian browser merusak payload namespace lokal lalu memastikan data tidak dihapus diam-diam dan pemulihan memerlukan aksi pengguna. Untuk HTTP, test memeriksa respons gagal/invalid dan tidak beralih ke lokal.

## Berkas dan kontrak

- model/item.schema.ts mendefinisikan UUID, nama 1–80 karakter sesudah trim, status active/archived, createdAt ISO timestamp, dan ID koleksi unik.
- model/item.types.ts memakai inferensi schema. item.keys.ts memasukkan appId dan sumber adapter pada cache key.
- api/item.repository.ts adalah kontrak list/create/updateStatus, dengan reset hanya ketika adapter menyediakannya.
- local-item.repository.ts memvalidasi record tersimpan, mempertahankan data rusak agar tidak hilang, menangani pembatalan read, dan tidak melaporkan sukses ketika write gagal.
- http-item.repository.ts memakai apiRequest dan schema yang sama. get-item.repository.ts memilih adapter; use-items.ts menangani React Query/mutation/cache.
- ui/ExampleItems.tsx menyusun state dan feedback; ItemForm menerima onSubmit/pending, ItemList menerima items/aksi. lib/filter-items.ts murni dan tidak memutasi koleksi.
- index.ts adalah public API. pages/examples/FeatureExamplePage.tsx tidak membaca internal adapter atau schema melalui deep import.

## Data lokal

Default `VITE_EXAMPLE_DATA_SOURCE=local`. Key storage: `<appId>:example-items:v1`. Dua record seed bertanggal tetap; record baru memakai UUID dan waktu penyimpanan yang sebenarnya. Delay 180 ms hanya untuk memperlihatkan status adapter contoh, bukan ukuran kecepatan backend. Gunakan createLocalItemRepository(storage,key,0) pada unit test.

LocalStorage bukan database multi pengguna, transaksi lintas tab, autentikasi, atau kontrol akses. Untuk produk nyata pilih strategi persistence yang sesuai brief. Scope bisnis tidak boleh disimpulkan dari sampel ini.

## Mengganti dengan HTTP

```dotenv
VITE_EXAMPLE_DATA_SOURCE=http
VITE_API_BASE_URL=/api
```

Restart server dev atau build ulang setelah mengubah environment. Semua VITE_* terlihat publik. Kontrak yang diharapkan:

| Method | Path relatif base  | Input           | Respons berhasil |
| ------ | ------------------ | --------------- | ---------------- |
| GET    | /example-items     | signal opsional | Item[]           |
| POST   | /example-items     | {title}         | Item             |
| PATCH  | /example-items/:id | {status}        | Item             |

Respons harus JSON sesuai schema; backend menentukan status HTTP dan autentikasi/otorisasi. Contoh belum menyediakan server. Error HTTP, malformed JSON, dan schema invalid menjadi error UI, bukan data lokal palsu. Endpoint/scope/pagination dapat disesuaikan setelah kontrak proyek ditetapkan.

## Menghapus contoh saat memulai produk

Hapus dua entry route contoh dari app/routes.tsx, tautan contoh pada PageFrame/HomePage, pages/examples, dan features/example-items beserta browser test khusus contoh. Komponen shared/three, motion, feedback dan seluruh ui-v1 tetap dapat dipakai. Jangan menghapus primitive hanya karena contoh dilepas.
