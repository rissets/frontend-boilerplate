import { afterEach, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers } from '../src/app/providers';
import { ThemeToggle } from '../src/shared/layout/ThemeToggle';
afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('light', 'dark');
  vi.restoreAllMocks();
});
it('mounts client providers without React script errors', () => {
  const error = vi.spyOn(console, 'error');
  render(
    <Providers>
      <p>Provider ready</p>
    </Providers>,
  );
  expect(screen.getByText('Provider ready')).toBeVisible();
  expect(error).not.toHaveBeenCalled();
});
it('applies a saved theme and persists a changed preference', async () => {
  localStorage.setItem('theme', 'dark');
  render(
    <Providers>
      <ThemeToggle />
    </Providers>,
  );
  expect(document.documentElement).toHaveClass('dark');
  await userEvent.setup().click(screen.getByRole('button', { name: 'Ganti tema' }));
  expect(document.documentElement).toHaveClass('light');
  expect(localStorage.getItem('theme')).toBe('light');
});
