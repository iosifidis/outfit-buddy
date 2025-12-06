'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { ClothingItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, HeartHandshake, Trash2 } from 'lucide-react';
import { EditItemSheet } from './EditItemSheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface ItemCardProps {
  item: ClothingItem;
  variant?: 'wardrobe' | 'donated';
  onDelete?: (itemId: string) => void;
  onDonate?: (itemId: string) => void;
}

export function ItemCard({
  item,
  variant = 'wardrobe',
  onDelete,
  onDonate,
}: ItemCardProps) {
  const [isEditSheetOpen, setEditSheetOpen] = useState(false);

  const handleDonate = () => {
    toast({
      title: 'Item Donated!',
      description: `${item.description} has been moved to Your Impact.`,
    });
    if (onDonate) onDonate(item.id);
  };

  const handleDelete = () => {
    toast({
      title: 'Item Deleted',
      description: `${item.description} has been removed.`,
      variant: 'destructive',
    });
    if (onDelete) onDelete(item.id);
  };

  const lastWornDate = item.lastWorn ? parseISO(item.lastWorn) : null;
  const lastWornDisplay = lastWornDate
    ? format(lastWornDate, 'MMM d, yyyy')
    : 'Not worn yet';

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl bg-card/50 border-0'
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] bg-background/50 flex items-center justify-center">
          <Image
            src={item.imageUrl}
            alt={item.description}
            width={150}
            height={200}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={`${item.color} ${item.category}`}
          />
          <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
             <Badge variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">{item.category}</Badge>
             <div className="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-opacity">
               {variant === 'wardrobe' && (
                 <>
                  <EditItemSheet item={item} open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </EditItemSheet>
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
                        <HeartHandshake className="h-4 w-4 text-primary" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to donate this item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will move the item to your "Your Impact" list. You can manage your donated items there.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDonate}>Donate</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                 </>
               )}
                {variant === 'donated' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to permanently delete this item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
             </div>
          </div>
        </div>
        <div className="p-3">
          <p className="font-semibold truncate" title={item.description}>{item.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-1 mt-1 text-xs text-muted-foreground">
             <p>{item.fabric}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
