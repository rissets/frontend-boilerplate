# Komponen ui-v1

Seluruh **53 modul dan 285 ekspor runtime** dari sumber pengguna tersedia pada `src/shared/ui`. Tidak ada modul yang dikeluarkan dari pemeriksaan TypeScript atau diganti placeholder. Hash sumber asli dan daftar ekspornya ada di [inventaris](ui-v1-inventory.json). Folder sumber di luar boilerplate tetap utuh.

```tsx
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { ChartContainer, ChartTooltipContent } from '@/shared/ui/chart';
```

Import per modul agar bundler hanya memasukkan JavaScript yang digunakan. Komponen bersifat source-owned dan dapat diedit pada proyek klien. Tailwind memindai seluruh `src`, sehingga gaya komponen yang belum ditampilkan tetap tersedia.

## Penyesuaian salinan

| Modul                   | Penyesuaian                                                                                                                                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| calendar                | Key class DayPicker 10 menggunakan `month_grid`.                                                                                                                                                                                 |
| chart                   | Tipe content tooltip/legend Recharts 3; formatter menerima seluruh payload; nilai nol tetap ditampilkan; key series mendukung data key function.                                                                                 |
| resizable               | API react-resizable-panels 4: Group/Panel/Separator di balik nama ekspor ui-v1. Gunakan `orientation`, bukan `direction`; ukuran persentase ditulis `"50%"`, angka berarti piksel. Styling separator mengikuti aria-orientation. |
| sidebar                 | Type-only import; shadow memakai semantic CSS color; skeleton memakai lebar stabil.                                                                                                                                              |
| carousel                | Lepas listener select dan reInit pada cleanup. Sinkronisasi state dengan Embla dipertahankan.                                                                                                                                    |
| input, textarea, dialog | Native `isComposing` bertipe; helper komposisi disediakan; timer dialog dibersihkan saat unmount.                                                                                                                                |
| sonner                  | Mengikuti provider tema lokal Vite; API props Toaster tetap tersedia.                                                                                                                                                            |
| Semua file              | Format konsisten; helper `cn`, `useIsMobile`, `useComposition` dan alias import disertakan.                                                                                                                                      |

Tema default disediakan oleh `src/shared/lib/theme.tsx`: light/dark/system, preferensi localStorage, perubahan sistem, dan sinkronisasi tab. Provider CSR tidak menyisipkan script React. Referensi pendekatan: [panduan tema Vite shadcn/ui](https://ui.shadcn.com/docs/dark-mode/vite).

## Cara memakai

- Root aplikasi sudah memasang ThemeProvider, QueryClientProvider, MotionProvider, TooltipProvider dan satu Toaster. Hindari memasang Toaster lagi tanpa kebutuhan khusus.
- Gabungkan primitive sesuai kontraknya: Dialog perlu Title/Description; Form memakai react-hook-form; Tooltip/Sidebar perlu providernya; Chart content harus di dalam ChartContainer.
- Beri nama aksesibel pada input, tombol ikon, checkbox, switch, slider dan separator interaktif. Tentukan label, locale kalender, serta format tanggal/angka sesuai produk.
- Contoh komposisi semua modul tersedia **khusus pengujian** pada `tests/fixtures/ui.tsx`. Ini bukan halaman produk, route aplikasi, atau entry build produksi.
- Jalankan `npm run check`, `npm run build`, kemudian `npm run test:browser`. Instal browser sekali dengan `npx playwright install chromium webkit`.

Komponen tambahan di luar ui-v1 tersedia pada `shared/feedback`, `shared/layout`, `shared/motion`, dan `shared/three`. Lihat [panduan kode](CODE_GUIDE.md), [contoh fitur](EXAMPLE_FEATURE.md), serta [panduan 3D/motion/loading](3D_MOTION_LOADING.md) untuk API dan pemakaiannya. Ikon memakai Lucide SVG melalui `shared/icons`; emoji tidak digunakan.

Smoke test merender setiap modul pada Chromium dan WebKit tanpa error JavaScript/console. Pengujian tambahan mencakup kalender, chart tooltip bernilai nol, legend, resize horizontal/vertikal dengan keyboard, validasi form, dialog/fokus, select, toast, dan tema. Pemeriksaan aksesibilitas otomatis mencakup halaman awal serta halaman contoh dalam matriks ukuran/tema; bukan sertifikasi seluruh kombinasi props komponen. Event IME unit test bersifat sintetis; input melalui IME OS secara fisik belum diuji.
