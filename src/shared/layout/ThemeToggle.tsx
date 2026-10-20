import { Moon, Sun } from '@/shared/icons';
import { useTheme } from '@/shared/lib/theme';
import { Button } from '@/shared/ui/button';
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Ganti tema"
      title={resolvedTheme === 'dark' ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
