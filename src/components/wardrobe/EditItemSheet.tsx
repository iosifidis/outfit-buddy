'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, SEASONS, LENGTHS, ClothingItem } from '@/lib/types';

const clothingItemSchema = z.object({
  description: z.string().min(3, { message: 'Description must be at least 3 characters.' }),
  category: z.enum(CATEGORIES),
  color: z.string().min(2, { message: 'Color is required.' }),
  fabric: z.string().min(2, { message: 'Fabric is required.' }),
  pattern: z.string().min(2, { message: 'Pattern is required.' }),
  season: z.enum(SEASONS),
  length: z.enum(LENGTHS),
  occasion: z.string().min(2, { message: 'Occasion is required.' }),
  lastWorn: z.string().optional(),
});

type ClothingItemFormValues = z.infer<typeof clothingItemSchema>;

export function EditItemSheet({
  item,
  children,
  open,
  onOpenChange
}: {
  item: ClothingItem,
  children: React.ReactNode,
  open?: boolean,
  onOpenChange?: (open: boolean) => void
}) {
  const form = useForm<ClothingItemFormValues>({
    resolver: zodResolver(clothingItemSchema),
    defaultValues: {
      ...item,
      lastWorn: item.lastWorn || ''
    },
  });

  function onSubmit(data: ClothingItemFormValues) {
    console.log({ ...item, ...data });
    toast({
      title: 'Item Updated!',
      description: `${data.description} has been updated.`,
    });
    onOpenChange?.(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Edit Clothing Item</SheetTitle>
          <SheetDescription>
            Update the details of your clothing item below.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 overflow-y-auto max-h-[calc(100vh-12rem)] pr-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Blue floral summer dress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Season</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a season" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEASONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="e.g., Navy Blue" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="fabric" render={({ field }) => (
                    <FormItem><FormLabel>Fabric</FormLabel><FormControl><Input placeholder="e.g., Cotton" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="pattern" render={({ field }) => (
                    <FormItem><FormLabel>Pattern</FormLabel><FormControl><Input placeholder="e.g., Solid" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="occasion" render={({ field }) => (
                    <FormItem><FormLabel>Occasion</FormLabel><FormControl><Input placeholder="e.g., Casual" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a length" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LENGTHS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="lastWorn"
                render={({ field }) => (
                    <FormItem><FormLabel>Last Worn (YYYY-MM-DD)</FormLabel><FormControl><Input placeholder="e.g., 2023-10-22" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            <SheetFooter className="pt-4 sticky bottom-0 bg-background">
              <Button type="submit">Save Changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
