import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;
type ThemeState = { theme: Theme; resolvedTheme: ResolvedTheme; setTheme: (value: Theme) => void };
const ThemeContext = createContext<ThemeState | null>(null);
const mediaQuery = '(prefers-color-scheme: dark)';
const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system';
function readTheme(fallback: Theme): Theme {
  try {
    const value = localStorage.getItem('theme');
    return isTheme(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
function systemTheme(): ResolvedTheme {
  return window.matchMedia(mediaQuery).matches ? 'dark' : 'light';
}
function subscribeSystem(callback: () => void) {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;
}
/** Apply the preference before React mounts; this CSR starter needs no injected script. */
export function initializeTheme() {
  const theme = readTheme('system');
  applyTheme(theme === 'system' ? systemTheme() : theme);
}
export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: {
  children: ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setPreference] = useState(() => readTheme(defaultTheme));
  const system = useSyncExternalStore(subscribeSystem, systemTheme, () => 'light' as const);
  const resolvedTheme = theme === 'system' ? system : theme;
  useLayoutEffect(() => applyTheme(resolvedTheme), [resolvedTheme]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === 'theme' || event.key === null)
        setPreference(isTheme(event.newValue) ? event.newValue : defaultTheme);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [defaultTheme]);
  const setTheme = (value: Theme) => {
    setPreference(value);
    try {
      localStorage.setItem('theme', value);
    } catch {
      /* The current tab can still change theme when storage is unavailable. */
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requires ThemeProvider');
  return context;
}
