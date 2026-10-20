// Browser test fixture; not a production application entry or route.
import { createRoot } from 'react-dom/client';
import { useState, type ReactNode } from 'react';
import { ThemeProvider } from '@/shared/lib/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bar, BarChart, XAxis } from 'recharts';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import './ui.css';
import * as Accordion from '@/components/ui/accordion';
import * as AlertDialog from '@/components/ui/alert-dialog';
import * as Alert from '@/components/ui/alert';
import * as AspectRatio from '@/components/ui/aspect-ratio';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as Breadcrumb from '@/components/ui/breadcrumb';
import * as ButtonGroup from '@/components/ui/button-group';
import * as Button from '@/components/ui/button';
import * as Calendar from '@/components/ui/calendar';
import * as Card from '@/components/ui/card';
import * as Carousel from '@/components/ui/carousel';
import * as Chart from '@/components/ui/chart';
import * as Checkbox from '@/components/ui/checkbox';
import * as Collapsible from '@/components/ui/collapsible';
import * as Command from '@/components/ui/command';
import * as ContextMenu from '@/components/ui/context-menu';
import * as Dialog from '@/components/ui/dialog';
import * as Drawer from '@/components/ui/drawer';
import * as DropdownMenu from '@/components/ui/dropdown-menu';
import * as Empty from '@/components/ui/empty';
import * as Field from '@/components/ui/field';
import * as Form from '@/components/ui/form';
import * as HoverCard from '@/components/ui/hover-card';
import * as InputGroup from '@/components/ui/input-group';
import * as InputOtp from '@/components/ui/input-otp';
import * as Input from '@/components/ui/input';
import * as Item from '@/components/ui/item';
import * as Kbd from '@/components/ui/kbd';
import * as Label from '@/components/ui/label';
import * as Menubar from '@/components/ui/menubar';
import * as NavigationMenu from '@/components/ui/navigation-menu';
import * as Pagination from '@/components/ui/pagination';
import * as Popover from '@/components/ui/popover';
import * as Progress from '@/components/ui/progress';
import * as RadioGroup from '@/components/ui/radio-group';
import * as Resizable from '@/components/ui/resizable';
import * as ScrollArea from '@/components/ui/scroll-area';
import * as Select from '@/components/ui/select';
import * as Separator from '@/components/ui/separator';
import * as Sheet from '@/components/ui/sheet';
import * as Sidebar from '@/components/ui/sidebar';
import * as Skeleton from '@/components/ui/skeleton';
import * as Slider from '@/components/ui/slider';
import * as Sonner from '@/components/ui/sonner';
import * as Spinner from '@/components/ui/spinner';
import * as Switch from '@/components/ui/switch';
import * as Table from '@/components/ui/table';
import * as Tabs from '@/components/ui/tabs';
import * as Textarea from '@/components/ui/textarea';
import * as ToggleGroup from '@/components/ui/toggle-group';
import * as Toggle from '@/components/ui/toggle';
import * as Tooltip from '@/components/ui/tooltip';

function CalendarFixture() {
  const [selected, setSelected] = useState<Date>();
  return (
    <>
      <Calendar.Calendar
        mode="single"
        defaultMonth={new Date(2026, 9, 1)}
        selected={selected}
        onSelect={setSelected}
      />
      <output aria-label="Tanggal terpilih">{selected?.getDate() ?? 'Belum dipilih'}</output>
    </>
  );
}
const schema = z.object({ name: z.string().min(1, 'Nama wajib diisi') });
function FormFixture() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });
  const [saved, setSaved] = useState(false);
  return (
    <Form.Form {...form}>
      <form onSubmit={form.handleSubmit(() => setSaved(true))}>
        <Form.FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.FormItem>
              <Form.FormLabel>Nama</Form.FormLabel>
              <Form.FormControl>
                <Input.Input {...field} />
              </Form.FormControl>
              <Form.FormDescription>Isian pengujian.</Form.FormDescription>
              <Form.FormMessage />
            </Form.FormItem>
          )}
        />
        <Button.Button type="submit">Simpan</Button.Button>
        <output>{saved ? 'Tersimpan' : ''}</output>
      </form>
    </Form.Form>
  );
}
function ChartFixture() {
  return (
    <Chart.ChartContainer
      className="h-64 w-full"
      config={{ value: { label: 'Nilai', color: 'var(--chart-1)' } }}
    >
      <BarChart
        data={[
          { name: 'Satu', value: 0 },
          { name: 'Dua', value: 7 },
        ]}
      >
        <XAxis dataKey="name" />
        <Bar dataKey="value" fill="var(--color-value)" isAnimationActive={false} />
        <Chart.ChartTooltip
          active
          defaultIndex={0}
          isAnimationActive={false}
          content={<Chart.ChartTooltipContent />}
        />
        <Chart.ChartLegend content={<Chart.ChartLegendContent />} />
      </BarChart>
    </Chart.ChartContainer>
  );
}
function ResizableFixture() {
  const vertical = new URLSearchParams(location.search).get('orientation') === 'vertical';
  return (
    <Resizable.ResizablePanelGroup
      orientation={vertical ? 'vertical' : 'horizontal'}
      style={{ height: 320 }}
    >
      <Resizable.ResizablePanel id="one" defaultSize="50%" minSize="20%">
        <div data-testid="panel-one">Panel satu</div>
      </Resizable.ResizablePanel>
      <Resizable.ResizableHandle withHandle aria-label="Ubah ukuran panel" />
      <Resizable.ResizablePanel id="two" defaultSize="50%" minSize="20%">
        Panel dua
      </Resizable.ResizablePanel>
    </Resizable.ResizablePanelGroup>
  );
}
const fixtures: Record<string, () => ReactNode> = {
  accordion: () => (
    <Accordion.Accordion type="single" collapsible>
      <Accordion.AccordionItem value="one">
        <Accordion.AccordionTrigger>Buka bagian</Accordion.AccordionTrigger>
        <Accordion.AccordionContent>Isi bagian</Accordion.AccordionContent>
      </Accordion.AccordionItem>
    </Accordion.Accordion>
  ),
  'alert-dialog': () => (
    <AlertDialog.AlertDialog defaultOpen>
      <AlertDialog.AlertDialogTrigger>Buka</AlertDialog.AlertDialogTrigger>
      <AlertDialog.AlertDialogContent>
        <AlertDialog.AlertDialogHeader>
          <AlertDialog.AlertDialogTitle>Konfirmasi</AlertDialog.AlertDialogTitle>
          <AlertDialog.AlertDialogDescription>Isian pengujian.</AlertDialog.AlertDialogDescription>
        </AlertDialog.AlertDialogHeader>
        <AlertDialog.AlertDialogFooter>
          <AlertDialog.AlertDialogCancel>Batal</AlertDialog.AlertDialogCancel>
          <AlertDialog.AlertDialogAction>Lanjut</AlertDialog.AlertDialogAction>
        </AlertDialog.AlertDialogFooter>
      </AlertDialog.AlertDialogContent>
    </AlertDialog.AlertDialog>
  ),
  alert: () => (
    <Alert.Alert>
      <Alert.AlertTitle>Informasi</Alert.AlertTitle>
      <Alert.AlertDescription>Isian pengujian.</Alert.AlertDescription>
    </Alert.Alert>
  ),
  'aspect-ratio': () => (
    <AspectRatio.AspectRatio ratio={16 / 9}>
      <div className="h-full bg-muted">Konten</div>
    </AspectRatio.AspectRatio>
  ),
  avatar: () => (
    <Avatar.Avatar>
      <Avatar.AvatarFallback>AB</Avatar.AvatarFallback>
    </Avatar.Avatar>
  ),
  badge: () => <Badge.Badge>Label</Badge.Badge>,
  breadcrumb: () => (
    <Breadcrumb.Breadcrumb>
      <Breadcrumb.BreadcrumbList>
        <Breadcrumb.BreadcrumbItem>
          <Breadcrumb.BreadcrumbLink href="#">Beranda</Breadcrumb.BreadcrumbLink>
        </Breadcrumb.BreadcrumbItem>
        <Breadcrumb.BreadcrumbSeparator />
        <Breadcrumb.BreadcrumbItem>
          <Breadcrumb.BreadcrumbPage>Halaman</Breadcrumb.BreadcrumbPage>
        </Breadcrumb.BreadcrumbItem>
      </Breadcrumb.BreadcrumbList>
    </Breadcrumb.Breadcrumb>
  ),
  'button-group': () => (
    <ButtonGroup.ButtonGroup aria-label="Aksi">
      <Button.Button>Satu</Button.Button>
      <ButtonGroup.ButtonGroupSeparator />
      <Button.Button>Dua</Button.Button>
    </ButtonGroup.ButtonGroup>
  ),
  button: () => <Button.Button>Tombol</Button.Button>,
  calendar: () => <CalendarFixture />,
  card: () => (
    <Card.Card>
      <Card.CardHeader>
        <Card.CardTitle>Judul</Card.CardTitle>
        <Card.CardDescription>Keterangan</Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent>Isi</Card.CardContent>
      <Card.CardFooter>Catatan</Card.CardFooter>
    </Card.Card>
  ),
  carousel: () => (
    <Carousel.Carousel className="mx-auto max-w-80">
      <Carousel.CarouselContent>
        <Carousel.CarouselItem>Satu</Carousel.CarouselItem>
        <Carousel.CarouselItem>Dua</Carousel.CarouselItem>
      </Carousel.CarouselContent>
      <Carousel.CarouselPrevious />
      <Carousel.CarouselNext />
    </Carousel.Carousel>
  ),
  chart: () => <ChartFixture />,
  checkbox: () => <Checkbox.Checkbox aria-label="Setuju" />,
  collapsible: () => (
    <Collapsible.Collapsible>
      <Collapsible.CollapsibleTrigger>Buka bagian</Collapsible.CollapsibleTrigger>
      <Collapsible.CollapsibleContent>Isi bagian</Collapsible.CollapsibleContent>
    </Collapsible.Collapsible>
  ),
  command: () => (
    <Command.Command>
      <Command.CommandInput placeholder="Cari" />
      <Command.CommandList>
        <Command.CommandEmpty>Tidak ditemukan</Command.CommandEmpty>
        <Command.CommandGroup heading="Pilihan">
          <Command.CommandItem>Satu</Command.CommandItem>
        </Command.CommandGroup>
      </Command.CommandList>
    </Command.Command>
  ),
  'context-menu': () => (
    <ContextMenu.ContextMenu>
      <ContextMenu.ContextMenuTrigger>Klik kanan</ContextMenu.ContextMenuTrigger>
      <ContextMenu.ContextMenuContent>
        <ContextMenu.ContextMenuItem>Pilihan</ContextMenu.ContextMenuItem>
      </ContextMenu.ContextMenuContent>
    </ContextMenu.ContextMenu>
  ),
  dialog: () => (
    <Dialog.Dialog>
      <Dialog.DialogTrigger>Buka dialog</Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogTitle>Isian</Dialog.DialogTitle>
        <Dialog.DialogDescription>Isian pengujian.</Dialog.DialogDescription>
        <Input.Input aria-label="Nama" />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  ),
  drawer: () => (
    <Drawer.Drawer defaultOpen>
      <Drawer.DrawerTrigger>Buka</Drawer.DrawerTrigger>
      <Drawer.DrawerContent>
        <Drawer.DrawerHeader>
          <Drawer.DrawerTitle>Panel</Drawer.DrawerTitle>
          <Drawer.DrawerDescription>Isian pengujian.</Drawer.DrawerDescription>
        </Drawer.DrawerHeader>
        <Drawer.DrawerFooter>
          <Drawer.DrawerClose>Tutup</Drawer.DrawerClose>
        </Drawer.DrawerFooter>
      </Drawer.DrawerContent>
    </Drawer.Drawer>
  ),
  'dropdown-menu': () => (
    <DropdownMenu.DropdownMenu defaultOpen>
      <DropdownMenu.DropdownMenuTrigger>Buka menu</DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent>
        <DropdownMenu.DropdownMenuItem>Pilihan</DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  ),
  empty: () => (
    <Empty.Empty>
      <Empty.EmptyHeader>
        <Empty.EmptyMedia variant="icon">
          <Search />
        </Empty.EmptyMedia>
        <Empty.EmptyTitle>Belum ada isi</Empty.EmptyTitle>
        <Empty.EmptyDescription>Keterangan</Empty.EmptyDescription>
      </Empty.EmptyHeader>
      <Empty.EmptyContent>Isi pengujian</Empty.EmptyContent>
    </Empty.Empty>
  ),
  field: () => (
    <Field.FieldGroup>
      <Field.Field>
        <Field.FieldLabel htmlFor="field">Nama</Field.FieldLabel>
        <Input.Input id="field" />
        <Field.FieldDescription>Isian pengujian.</Field.FieldDescription>
      </Field.Field>
    </Field.FieldGroup>
  ),
  form: () => <FormFixture />,
  'hover-card': () => (
    <HoverCard.HoverCard defaultOpen>
      <HoverCard.HoverCardTrigger>Informasi</HoverCard.HoverCardTrigger>
      <HoverCard.HoverCardContent>Keterangan</HoverCard.HoverCardContent>
    </HoverCard.HoverCard>
  ),
  'input-group': () => (
    <InputGroup.InputGroup>
      <InputGroup.InputGroupAddon>
        <Search />
      </InputGroup.InputGroupAddon>
      <InputGroup.InputGroupInput aria-label="Cari" />
    </InputGroup.InputGroup>
  ),
  'input-otp': () => (
    <InputOtp.InputOTP maxLength={4} aria-label="Kode">
      <InputOtp.InputOTPGroup>
        {[0, 1, 2, 3].map((index) => (
          <InputOtp.InputOTPSlot key={index} index={index} />
        ))}
      </InputOtp.InputOTPGroup>
    </InputOtp.InputOTP>
  ),
  input: () => <Input.Input aria-label="Nama" />,
  item: () => (
    <Item.Item>
      <Item.ItemContent>
        <Item.ItemTitle>Judul</Item.ItemTitle>
        <Item.ItemDescription>Keterangan</Item.ItemDescription>
      </Item.ItemContent>
    </Item.Item>
  ),
  kbd: () => (
    <Kbd.KbdGroup>
      <Kbd.Kbd>⌘</Kbd.Kbd>
      <Kbd.Kbd>K</Kbd.Kbd>
    </Kbd.KbdGroup>
  ),
  label: () => (
    <>
      <Label.Label htmlFor="label-input">Nama</Label.Label>
      <Input.Input id="label-input" />
    </>
  ),
  menubar: () => (
    <Menubar.Menubar>
      <Menubar.MenubarMenu>
        <Menubar.MenubarTrigger>Menu</Menubar.MenubarTrigger>
        <Menubar.MenubarContent>
          <Menubar.MenubarItem>Pilihan</Menubar.MenubarItem>
        </Menubar.MenubarContent>
      </Menubar.MenubarMenu>
    </Menubar.Menubar>
  ),
  'navigation-menu': () => (
    <NavigationMenu.NavigationMenu>
      <NavigationMenu.NavigationMenuList>
        <NavigationMenu.NavigationMenuItem>
          <NavigationMenu.NavigationMenuLink href="#">Beranda</NavigationMenu.NavigationMenuLink>
        </NavigationMenu.NavigationMenuItem>
      </NavigationMenu.NavigationMenuList>
    </NavigationMenu.NavigationMenu>
  ),
  pagination: () => (
    <Pagination.Pagination>
      <Pagination.PaginationContent>
        <Pagination.PaginationItem>
          <Pagination.PaginationPrevious href="#" />
        </Pagination.PaginationItem>
        <Pagination.PaginationItem>
          <Pagination.PaginationLink href="#" isActive>
            1
          </Pagination.PaginationLink>
        </Pagination.PaginationItem>
        <Pagination.PaginationItem>
          <Pagination.PaginationNext href="#" />
        </Pagination.PaginationItem>
      </Pagination.PaginationContent>
    </Pagination.Pagination>
  ),
  popover: () => (
    <Popover.Popover defaultOpen>
      <Popover.PopoverTrigger>Buka</Popover.PopoverTrigger>
      <Popover.PopoverContent>Isi panel</Popover.PopoverContent>
    </Popover.Popover>
  ),
  progress: () => <Progress.Progress value={50} aria-label="Progres" />,
  'radio-group': () => (
    <RadioGroup.RadioGroup defaultValue="one" aria-label="Pilihan">
      <RadioGroup.RadioGroupItem value="one" aria-label="Satu" />
      <RadioGroup.RadioGroupItem value="two" aria-label="Dua" />
    </RadioGroup.RadioGroup>
  ),
  resizable: () => <ResizableFixture />,
  'scroll-area': () => (
    <ScrollArea.ScrollArea className="h-32">
      <div className="h-96">Konten panjang</div>
    </ScrollArea.ScrollArea>
  ),
  select: () => (
    <Select.Select>
      <Select.SelectTrigger aria-label="Pilihan">
        <Select.SelectValue placeholder="Pilih" />
      </Select.SelectTrigger>
      <Select.SelectContent>
        <Select.SelectItem value="one">Satu</Select.SelectItem>
        <Select.SelectItem value="two">Dua</Select.SelectItem>
      </Select.SelectContent>
    </Select.Select>
  ),
  separator: () => (
    <>
      <p>Satu</p>
      <Separator.Separator />
      <p>Dua</p>
    </>
  ),
  sheet: () => (
    <Sheet.Sheet defaultOpen>
      <Sheet.SheetTrigger>Buka</Sheet.SheetTrigger>
      <Sheet.SheetContent>
        <Sheet.SheetHeader>
          <Sheet.SheetTitle>Panel</Sheet.SheetTitle>
          <Sheet.SheetDescription>Isian pengujian.</Sheet.SheetDescription>
        </Sheet.SheetHeader>
      </Sheet.SheetContent>
    </Sheet.Sheet>
  ),
  sidebar: () => (
    <Sidebar.SidebarProvider>
      <Sidebar.Sidebar>
        <Sidebar.SidebarHeader>Judul</Sidebar.SidebarHeader>
        <Sidebar.SidebarContent>
          <Sidebar.SidebarMenu>
            <Sidebar.SidebarMenuItem>
              <Sidebar.SidebarMenuButton>Menu</Sidebar.SidebarMenuButton>
            </Sidebar.SidebarMenuItem>
          </Sidebar.SidebarMenu>
        </Sidebar.SidebarContent>
      </Sidebar.Sidebar>
      <Sidebar.SidebarInset>
        <Sidebar.SidebarTrigger />
        <Sidebar.SidebarInput aria-label="Cari" />
      </Sidebar.SidebarInset>
    </Sidebar.SidebarProvider>
  ),
  skeleton: () => <Skeleton.Skeleton className="h-12 w-full" />,
  slider: () => <Slider.Slider defaultValue={[50]} aria-label="Nilai" />,
  sonner: () => (
    <>
      <Button.Button onClick={() => toast('Pesan tersampaikan')}>Tampilkan pesan</Button.Button>
      <Sonner.Toaster />
    </>
  ),
  spinner: () => <Spinner.Spinner />,
  switch: () => <Switch.Switch aria-label="Aktifkan" />,
  table: () => (
    <Table.Table>
      <Table.TableCaption>Keterangan</Table.TableCaption>
      <Table.TableHeader>
        <Table.TableRow>
          <Table.TableHead>Kolom</Table.TableHead>
        </Table.TableRow>
      </Table.TableHeader>
      <Table.TableBody>
        <Table.TableRow>
          <Table.TableCell>Isi</Table.TableCell>
        </Table.TableRow>
      </Table.TableBody>
    </Table.Table>
  ),
  tabs: () => (
    <Tabs.Tabs defaultValue="one">
      <Tabs.TabsList>
        <Tabs.TabsTrigger value="one">Satu</Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="two">Dua</Tabs.TabsTrigger>
      </Tabs.TabsList>
      <Tabs.TabsContent value="one">Isi satu</Tabs.TabsContent>
      <Tabs.TabsContent value="two">Isi dua</Tabs.TabsContent>
    </Tabs.Tabs>
  ),
  textarea: () => <Textarea.Textarea aria-label="Catatan" />,
  'toggle-group': () => (
    <ToggleGroup.ToggleGroup type="single" aria-label="Perataan">
      <ToggleGroup.ToggleGroupItem value="one" aria-label="Satu">
        Satu
      </ToggleGroup.ToggleGroupItem>
      <ToggleGroup.ToggleGroupItem value="two" aria-label="Dua">
        Dua
      </ToggleGroup.ToggleGroupItem>
    </ToggleGroup.ToggleGroup>
  ),
  toggle: () => <Toggle.Toggle aria-label="Aktifkan">Tombol</Toggle.Toggle>,
  tooltip: () => (
    <Tooltip.Tooltip defaultOpen>
      <Tooltip.TooltipTrigger>Informasi</Tooltip.TooltipTrigger>
      <Tooltip.TooltipContent>Keterangan</Tooltip.TooltipContent>
    </Tooltip.Tooltip>
  ),
};
const name = new URLSearchParams(location.search).get('component') ?? '';
const Fixture = fixtures[name];
createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light">
    <Tooltip.TooltipProvider>
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="mb-8 text-xl">{name}</h1>
        <div data-testid="fixture" data-component={name}>
          {Fixture ? <Fixture /> : 'Unknown component'}
        </div>
      </main>
    </Tooltip.TooltipProvider>
  </ThemeProvider>,
);
