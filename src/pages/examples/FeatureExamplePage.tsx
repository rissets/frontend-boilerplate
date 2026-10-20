import { ExampleItems } from '@/features/example-items';
import { PageFrame } from '@/shared/layout/PageFrame';
export default function FeatureExamplePage() {
  return (
    <PageFrame>
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Contoh fitur</h1>
        <p className="mt-3 text-muted-foreground">
          Referensi feature-based: schema, adapter data, query, formulir, dan status antarmuka.
        </p>
      </div>
      <ExampleItems />
    </PageFrame>
  );
}
