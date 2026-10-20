import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createItemSchema } from '../model/item.schema';
import type { CreateItemInput } from '../model/item.types';
import { Plus, LoaderCircle } from '@/shared/icons';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/shared/ui/form';
export function ItemForm({
  onSubmit,
  pending,
}: {
  onSubmit: (input: CreateItemInput) => Promise<unknown>;
  pending: boolean;
}) {
  const form = useForm<CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: { title: '' },
  });
  const submit = form.handleSubmit(async (input) => {
    try {
      await onSubmit(input);
      form.reset();
    } catch {
      /* Mutation feedback is displayed by the feature container. */
    }
  });
  return (
    <Form {...form}>
      <form
        onSubmit={submit}
        className="flex flex-col items-start gap-3 sm:flex-row sm:items-start"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>Nama item</FormLabel>
              <FormControl>
                <Input {...field} disabled={pending} autoComplete="off" aria-required="true" />
              </FormControl>
              <FormDescription>Maksimal 80 karakter.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending} className="sm:mt-6">
          {pending ? (
            <LoaderCircle aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
          ) : (
            <Plus aria-hidden="true" />
          )}
          {pending ? 'Menyimpan...' : 'Tambah item'}
        </Button>
      </form>
    </Form>
  );
}
