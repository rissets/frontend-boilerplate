import { ArrowLeft, ArrowRight, RotateCcw } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
export function SceneControls({
  ready,
  angle,
  onRotate,
  onReset,
}: {
  ready: boolean;
  angle: number;
  onRotate: (direction: -1 | 1) => void;
  onReset: () => void;
}) {
  return (
    <div role="group" aria-label="Kontrol objek 3D" className="flex flex-wrap gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={!ready}
        onClick={() => onRotate(-1)}
      >
        <ArrowLeft aria-hidden="true" />
        Putar kiri
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={!ready}
        onClick={() => onRotate(1)}
      >
        <ArrowRight aria-hidden="true" />
        Putar kanan
      </Button>
      <Button type="button" size="sm" variant="ghost" disabled={!ready} onClick={onReset}>
        <RotateCcw aria-hidden="true" />
        Atur ulang objek
      </Button>
      <output
        aria-label="Sudut objek"
        className="self-center px-2 text-sm tabular-nums text-muted-foreground"
      >
        {((Math.round((angle * 180) / Math.PI) % 360) + 360) % 360}°
      </output>
    </div>
  );
}
