import type { Item, ItemStatus } from '../model/item.types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/shared/ui/table';
export function ItemList({
  items,
  pending,
  onStatusChange,
}: {
  items: Item[];
  pending: boolean;
  onStatusChange: (id: string, status: ItemStatus) => void;
}) {
  return (
    <Table>
      <TableCaption className="sr-only">Koleksi item ilustratif</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="max-w-48 whitespace-normal break-words font-medium">
              {item.title}
            </TableCell>
            <TableCell>
              <Badge variant={item.status === 'active' ? 'secondary' : 'outline'}>
                {item.status === 'active' ? 'Aktif' : 'Diarsipkan'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={pending}
                aria-label={(item.status === 'active' ? 'Arsipkan ' : 'Aktifkan ') + item.title}
                onClick={() =>
                  onStatusChange(item.id, item.status === 'active' ? 'archived' : 'active')
                }
              >
                {item.status === 'active' ? 'Arsipkan' : 'Aktifkan'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
