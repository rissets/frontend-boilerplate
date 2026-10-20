import { Link } from 'react-router-dom';
import { PageFrame } from '@/shared/layout/PageFrame';
import { ArrowRight } from '@/shared/icons';
export default function HomePage() {
  return (
    <PageFrame>
      <div className="max-w-2xl py-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Mulai dari sini.</h1>
        <p className="mt-4 text-muted-foreground">
          Fondasi frontend siap untuk kebutuhan proyek Anda.
        </p>
        <p className="mt-8 text-sm text-muted-foreground">
          Gunakan contoh terpisah untuk mempelajari struktur fitur, status data, komponen 3D, dan
          animasi.
        </p>
        <Link
          to="/examples/feature"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4"
        >
          Lihat contoh penggunaan
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </PageFrame>
  );
}
