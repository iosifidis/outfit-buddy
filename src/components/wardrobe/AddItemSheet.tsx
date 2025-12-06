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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, SEASONS, LENGTHS } from '@/lib/types';
import { Upload } from 'lucide-react';

const clothingItemSchema = z.object({
  description: z.string().min(3, { message: 'Description must be at least 3 characters.' }),
  category: z.enum(CATEGORIES),
  color: z.string().min(2, { message: 'Color is required.' }),
  fabric: z.string().min(2, { message: 'Fabric is required.' }),
  pattern: z.string().min(2, { message: 'Pattern is required.' }),
  season: z.enum(SEASONS),
  length: z.enum(LENGTHS),
  occasion: z.string().min(2, { message: 'Occasion is required.' }),
  image: z.any().refine(files => files?.length === 1, 'Image is required.'),
});

type ClothingItemFormValues = z.infer<typeof clothingItemSchema>;

const defaultValues: Partial<ClothingItemFormValues> = {
  description: '',
  color: '',
  fabric: '',
  pattern: '',
  occasion: '',
};

export function AddItemSheet({
  children,
  open,
  onOpenChange
}: {
  children: React.ReactNode,
  open?: boolean,
  onOpenChange?: (open: boolean) => void
}) {
  const form = useForm<ClothingItemFormValues>({
    resolver: zodResolver(clothingItemSchema),
    defaultValues,
  });

  function onSubmit(data: ClothingItemFormValues) {
    console.log(data);
    toast({
      title: 'Item Added!',
      description: `${data.description} has been added to your wardrobe.`,
    });
    onOpenChange?.(false);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add New Clothing Item</SheetTitle>
          <SheetDescription>
            Digitize your wardrobe one piece at a time. Fill in the details below.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-border bg-muted/50 hover:bg-muted">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 800x400px)</p>
                          </div>
                          <Input id="dropzone-file" type="file" className="hidden" onChange={(e) => field.onChange(e.target.files)} />
                      </label>
                    </div> 
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <SheetFooter className="pt-4">
              <Button type="submit">Save Item</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
