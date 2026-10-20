import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import { LoadingState } from '@/shared/feedback';
const FeatureExamplePage = lazy(() => import('@/pages/examples/FeatureExamplePage'));
const VisualExamplePage = lazy(() => import('@/pages/examples/VisualExamplePage'));
export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <main className="starter">
          <LoadingState label="Memuat halaman" />
        </main>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/examples/feature" element={<FeatureExamplePage />} />
        <Route path="/examples/visual" element={<VisualExamplePage />} />
        <Route
          path="*"
          element={
            <main className="starter">
              <h1>Halaman tidak ditemukan</h1>
              <Link to="/">Kembali</Link>
            </main>
          }
        />
      </Routes>
    </Suspense>
  );
}
