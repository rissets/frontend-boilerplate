import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { appConfig } from '@/shared/config/app';
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
      <a
        href="#main-content"
        className="sr-only rounded bg-background p-3 text-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
      >
        Lewati ke konten
      </a>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-5">
        <Link to="/" className="font-medium">
          {appConfig.name}
        </Link>
        <nav aria-label="Navigasi starter" className="flex flex-wrap items-center gap-4 text-sm">
          <NavLink
            to="/examples/feature"
            className={({ isActive }) =>
              isActive ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
            }
          >
            Contoh fitur
          </NavLink>
          <NavLink
            to="/examples/visual"
            className={({ isActive }) =>
              isActive ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
            }
          >
            3D dan motion
          </NavLink>
          <ThemeToggle />
        </nav>
      </header>
      <main id="main-content" className="pt-10 pb-8">
        {children}
      </main>
    </div>
  );
}
