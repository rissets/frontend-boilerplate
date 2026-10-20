# Aturan folder, file dan kode

Gunakan dokumen ini sebelum membuat atau memindahkan source. Contoh lengkap ada pada src/features/example-items; baca index.ts, model, repository dan UI-nya bersama-sama.

## Menentukan tempat file

| Isi                                    | Letak                     | Contoh nyata                                 |
| -------------------------------------- | ------------------------- | -------------------------------------------- |
| route dan lazy loading halaman         | app                       | routes.tsx                                   |
| susunan satu layar dari fitur/komponen | pages                     | examples/FeatureExamplePage.tsx              |
| schema runtime dan aturan domain murni | features/name/model       | item.schema.ts                               |
| tipe turunan schema                    | features/name/model       | item.types.ts                                |
| query key dan scope                    | features/name/model       | item.keys.ts                                 |
| kontrak penyimpanan dan adapter        | features/name/api         | item.repository.ts, local-item.repository.ts |
| query/mutation hooks                   | features/name/api         | use-items.ts                                 |
| formulir, daftar dan container fitur   | features/name/ui          | ItemForm.tsx, ItemList.tsx, ExampleItems.tsx |
| perhitungan/filter khusus fitur        | features/name/lib         | filter-items.ts                              |
| unit/integration test internal         | `features/name/__tests__` | items.test.ts                                |
| API yang boleh dikonsumsi luar fitur   | features/name/index.ts    | named export komponen dan tipe               |
| primitive atau helper lintas fitur     | shared                    | ui, feedback, layout, motion, three          |

Jangan membuat root components/services/types untuk mencampur semua fitur. File yang hanya digunakan satu fitur tetap pada fitur itu. Jangan mengimpor internal fitur dari halaman, memakai barrel `export *`, atau melewati batas melalui dynamic import. Kode UI tidak mengakses fetch/localStorage langsung; tema dan adapter adalah pengecualian yang memang memiliki boundary penyimpanan.

## Penamaan

- Folder: kebab-case, satu kemampuan yang jelas; contoh example-items atau account-settings.
- Komponen baru: PascalCase.tsx; export function ItemForm. Props memakai tipe lokal jika pendek, tipe bernama jika kompleks/dipakai ulang.
- File nonkomponen: kebab-case dengan suffix peran: item.schema.ts, item.types.ts, item.repository.ts, item.keys.ts, filter-items.ts. Hook diekspor sebagai useItems dari use-items.ts.
- Test: *.test.ts / *.test.tsx; browser *.spec.ts. Aset: kebab-case dengan provenance.
- Nama komponen/file ui-v1 dan helper kompatibilitas yang sudah ada dipertahankan. Jangan merename seluruh pustaka hanya untuk mengikuti aturan file baru.

## Membuat fitur baru, berurutan

1. Tuliskan masalah, aktor, hasil dan batas fitur pada PRODUCT.md. Tentukan route/pola interaksi pada DESIGN.md. Baca pedoman visual sebelum membuat JSX.
2. Tentukan entity, ID, relasi/scope, status/transisi, waktu, validasi dan error. Tulis schema Zod dan tipe inferensinya pada model; jangan menentukan model dari bentuk tabel UI.
3. Buat api/*.repository.ts untuk kontrak yang dipakai UI. Implementasikan adapter yang diperlukan. Backend belum tersedia: adapter lokal memakai schema yang sama, seed stabil dan namespace sendiri. Jangan menyebut data lokal sebagai respons backend.
4. Buat query/mutation dengan query key scoped. Invalidasi cache setelah mutation berhasil; jangan memalsukan sukses dengan catch yang mengembalikan fixture.
5. Buat UI kecil: container menyusun state, form memvalidasi input, daftar menerima data/aksi lewat props. Gunakan ui-v1 dan shared feedback. Sediakan loading, pending, empty, error/retry, success dan disabled yang relevan.
6. Ekspor hanya public API dari index.ts. Halaman mengimpor `@/features/name`, lalu route didaftarkan di app/routes.tsx. Hindari menambahkan fitur bisnis hanya karena folder sudah tersedia.
7. Tulis test untuk aturan/error boundary penting; periksa alur browser aktual, tema, keyboard dan ponsel. Jalankan check/build.

## Pola kode

```ts
// model/item.types.ts: derive, do not manually duplicate the schema.
import type { z } from 'zod';
import type { itemSchema } from './item.schema';
export type Item = z.infer<typeof itemSchema>;
```

```tsx
// A page consumes the feature's explicit public API.
import { ExampleItems } from '@/features/example-items';
export default function FeatureExamplePage() {
  return <ExampleItems />;
}
```

- Gunakan named exports untuk komponen/helper fitur dan shared. Default export dipakai halaman/lazy renderer bila mempermudah React.lazy. Jangan menyembunyikan side effect dalam index.ts.
- Alias @/ untuk lintas lapisan; relative import di dalam modul/fitur. Kelompokkan dependency eksternal dan internal dengan jelas. Import type untuk kebutuhan tipe saja.
- Gunakan TypeScript strict; hindari any, non-null assertion dan type assertion untuk melewati kontrak yang belum dipahami. Validasi data eksternal sebelum menjadi model.
- Pisahkan input form dan respons bila bentuknya berbeda. API client menerima JSON response schema; caller bertanggung jawab atas serialisasi body/header. Tangani non-JSON/HTTP error secara nyata.
- Jangan memutasi cache/props/fixture global; update melalui mutation dan invalidasi/setQueryData dengan nilai baru. Abort read saat query dibatalkan. Jangan mereset data pengguna saat reload.
- State komponen untuk interaksi lokal; React Query untuk server/adapter state. Jangan menduplikasi record yang sama pada beberapa store.
- Komentar menjelaskan alasan/constraint, bukan menerjemahkan setiap baris. Formatter: npm run format. Hindari abstraksi sebelum ada pemakai nyata.

## Ikon, style dan aksesibilitas

```tsx
import { Plus } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
<Button type="button">
  <Plus aria-hidden="true" />
  Tambah item
</Button>;
```

Gunakan Lucide SVG named import; tambah ekspor yang dibutuhkan ke shared/icons/index.ts. Jangan memakai emoji atau glyph Unicode sebagai ikon. Ikon dekoratif aria-hidden; tombol hanya ikon wajib aria-label dan focus terlihat. Ukuran 16–20 px, stroke konsisten dengan Lucide default; jangan mencampur fill/stroke/katalog tanpa keputusan desain.

Gunakan semantic classes seperti bg-background, text-foreground, text-muted-foreground dan border-input. Warna objek/aset 3D dapat mengikuti materialnya; permukaan UI mengikuti tokens light/dark. Jangan menambah spinner buatan dengan emoji; gunakan shared/feedback atau Spinner ui-v1. CSS motion dan JS motion sama-sama harus mendukung reduced motion.

## Pemeriksaan

`npm run architecture` menghalangi import ilegal dan emoji source. `npm run check` menambahkan token parity, strict typecheck, lint, unit dan test tooling. `npm run build` membuat output statis. Untuk acceptance UI jalankan browser test pada alur yang diubah; hasil compile saja tidak cukup.

## Referensi skill sesuai tugas

Gunakan [AI_SKILLS.md](AI_SKILLS.md) untuk memilih referensi React performance/composition, shadcn, TypeScript, Tailwind atau browser testing. Public API fitur dan inferensi schema tetap berlaku; hindari memo tanpa bukti, prop mode boolean yang menumpuk, type assertion untuk menutupi kontrak, serta mengganti komponen pengguna mengikuti contoh registry terbaru. Typecheck tetap wajib saat build.
