import { it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
it('preserves input outside dialogs and protects composing Enter', () => {
  const key = vi.fn();
  render(<Input aria-label="Nama" onKeyDown={key} />);
  const input = screen.getByLabelText('Nama');
  fireEvent.keyDown(input, { key: 'a' });
  fireEvent.compositionStart(input);
  fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
  expect(key).toHaveBeenCalledTimes(1);
  fireEvent.compositionEnd(input);
});
it('restores dialog focus after Escape', async () => {
  const user = userEvent.setup();
  render(
    <Dialog>
      <DialogTrigger>Buka</DialogTrigger>
      <DialogContent>
        <DialogTitle>Isian</DialogTitle>
        <DialogDescription>Isi nama.</DialogDescription>
        <Input aria-label="Nama" />
      </DialogContent>
    </Dialog>,
  );
  await user.click(screen.getByText('Buka'));
  expect(screen.getByRole('dialog')).toBeVisible();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByText('Buka')).toHaveFocus();
});
