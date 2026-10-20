# 3D, motion, loading dan fallback

Buka `/examples/visual` untuk pemakaian langsung. Seluruh package yang digunakan sudah berada di package.json/package-lock.json: three, @react-three/fiber, @react-three/drei, @react-spring/three, motion dan @types/three. Tidak diperlukan API key atau CDN runtime untuk sampel Box yang tidak terkompresi.

## Komponen yang tersedia

| Komponen                       | Kegunaan                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| SceneCanvas                    | wrapper lazy renderer, loading chunk, boundary error, deteksi WebGL2, caption dan status          |
| ModelViewer                    | memuat GLB lokal dengan useGLTF, salinan scene, rotasi React Spring dan kontrol DOM               |
| GeometryPreview                | contoh geometri native Three.js dengan spring rotasi                                              |
| SceneFallback                  | penjelasan DOM ketika grafis tidak tersedia                                                       |
| MotionProvider                 | LazyMotion/domAnimation dan reducedMotion user; sudah dipasang root                               |
| Reveal                         | satu perpindahan singkat dengan konten tetap terlihat; tidak dipasang otomatis pada semua section |
| PresenceMessage                | transisi perubahan feedback singkat yang tetap diumumkan live region                              |
| LoadingState / ContentSkeleton | status teks+spinner SVG atau skeleton sesuai bentuk konten                                        |
| ErrorState / EmptyState        | pemulihan error dan kondisi data kosong                                                           |
| AsyncBoundary                  | mengisolasi kegagalan lazy module/scene dari seluruh halaman                                      |

```tsx
import { ModelViewer } from '@/shared/three';
<ModelViewer
  src="/models/box.glb"
  label="Model Box dari Cesium"
  description="Satu mesh dan satu material, dengan kontrol putar dan caption DOM."
/>;
```

Gunakan komponen di bawah provider tema/motion milik app. SceneCanvas juga dapat menerima children R3F sendiri. Letakkan scene khusus pada fitur pemiliknya dan impor secara lazy; jangan menarik semua engine ke homepage lewat barrel fitur yang eager. Render tree 3D hanya memuat objek R3F. Loading, kontrol dan metadata pada starter ini berada di DOM biasa di luar Canvas, agar lifetime root tetap konsisten.

## Rendering dan motion

Renderer memakai frameloop demand, DPR 1–1.5, low-power preference dan kontrol tanpa damping otomatis. Scene diam tidak meminta loop render terus-menerus; React Spring menjadwalkan frame saat rotasi berubah. Motion DOM dan spring 3D mempunyai peran berbeda. Transisi DOM memakai shared/motion/motion.tokens.ts; spring memakai tension/friction, serta immediate ketika reduced motion aktif.

Contoh tidak autorotate. Pengguna dapat menyeret kamera dan memakai tombol berlabel untuk rotasi objek; tombol nonaktif ketika scene belum siap/tidak tersedia. Atur ulang objek mengembalikan rotasi objek, bukan kamera yang telah diseret. Caption dan nama objek tetap dapat dibaca tanpa WebGL.

Canvas transparan mengikuti bg-card CSS, sehingga pergantian tema tidak mengunci warna permukaan di renderer. Material file GLB tetap mengikuti aset asli. Untuk scene baru, jangan memakai warna UI hardcoded sebagai pengganti token; bedakan warna material objek dengan surface aplikasi.

## Loading, error dan resource

- Route dan renderer chunk memiliki Suspense fallback teks. GLB ditunggu oleh Suspense di dalam Canvas; indikator loading tetap pada DOM biasa di luar Canvas agar lifetime root React tidak bertabrakan. Loading adalah operasi yang sedang berlangsung, bukan persentase buatan.
- Tidak mendukung WebGL2: engine tidak diimpor dan SceneFallback ditampilkan.
- Model gagal: error boundary memberi pesan dan Coba lagi; retry membersihkan cache useGLTF untuk URL itu. Tidak ada sukses palsu.
- WebGL context loss: tampilkan DOM fallback dan nonaktifkan kontrol; pengguna dapat memuat ulang halaman.
- R3F memiliki renderer dan membersihkannya saat unmount. ModelViewer meng-clone scene untuk mencegah reparenting cache; geometry/material asset cache dibagi dan tidak di-dispose per primitive. Bila memperluas menjadi penjelajah banyak aset, rancang kebijakan cache/disposal menurut lifetime pemakaian.
- Decoder Draco/Meshopt dinonaktifkan pada sample useGLTF agar tidak mengambil decoder CDN. Untuk model terkompresi, pasang/konfigurasi decoder lokal yang sesuai serta lisensinya; jangan menganggap compressed GLB otomatis didukung konfigurasi ini.

## Ukuran dan batas performa

Build baseline menghasilkan chunk engine Three/Fiber sekitar 909 kB minified (241 kB gzip), sehingga Vite memberi warning chunk di atas 500 kB. Chunk ini dimuat saat scene dibutuhkan; pemeriksaan network produksi memastikan homepage tidak mengunduh engine atau model. Ini belum merupakan benchmark GPU/perangkat pengguna. Tambahkan target performa, optimasi mesh/tekstur dan pengukuran perangkat nyata ketika proyek memakai aset yang lebih besar.

## Aset dan provenance

public/models/box.glb berasal dari Khronos glTF Sample Assets, model Box oleh Cesium (2017), CC BY 4.0. File tidak diubah. Atribusi/link lisensi ditampilkan pada halaman visual, sumber disimpan di docs/licenses, dan hash dicatat pada assets.manifest.json. Pertahankan atribusi pada produk yang memakai aset ini atau ganti dengan aset yang haknya sesuai. Ketentuan per aset harus diperiksa; seluruh marketplace tidak memiliki satu lisensi yang sama.

## Referensi resmi

- [R3F installation](https://r3f.docs.pmnd.rs/getting-started/installation), [Canvas/fallback/resource ownership](https://r3f.docs.pmnd.rs/api/canvas), [demand rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
- [Drei useGLTF/decoder](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf).
- [React Spring untuk R3F](https://www.react-spring.dev/docs/guides/react-three-fiber).
- [Motion bundle](https://motion.dev/docs/react-reduce-bundle-size), [accessibility](https://motion.dev/docs/react-accessibility).
- [Model Box](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Box), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
