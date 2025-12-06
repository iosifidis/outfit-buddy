'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ClothingItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ItemDetailsDialog } from './ItemDetailsDialog';
import { BriefcaseIcon, ThermometerIcon, SmileIcon } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
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
import { Button } from '../ui/button';
import { MoreVertical, Heart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';


interface ItemCardProps {
  item: ClothingItem;
  onDeleteItem: (itemId: string) => void;
  onToggleFavorite: (itemId: string) => void;
}

export function ItemCard({ item, onDeleteItem, onToggleFavorite }: ItemCardProps) {
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteItem(item.id);
    toast({
      title: 'Item Deleted',
      description: `${item.description} has been removed.`,
      variant: 'destructive',
    });
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(item.id);
    toast({
      title: item.isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      description: `${item.description} has been ${item.isFavorite ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  return (
    <>
      <ItemDetailsDialog
        item={item}
        open={isDetailsOpen}
        onOpenChange={setDetailsOpen}
        onDelete={() => {
          onDeleteItem(item.id);
          setDetailsOpen(false);
        }}
      />
      <Card
        className="group overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl bg-card border-border cursor-pointer hover:-translate-y-1"
        onClick={() => setDetailsOpen(true)}
      >
        <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
                {item.imageUrl ? (
                <Image
                    src={item.imageUrl}
                    alt={item.description}
                    fill
                    className="object-contain"
                    data-ai-hint={`${item.color} ${item.category}`}
                />
                ) : (
                    <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                        <BriefcaseIcon className="w-16 h-16 text-muted-foreground" />
                    </div>
                )}
                 <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 left-0 h-7 w-7 text-pink-500 rounded-full bg-transparent hover:bg-pink-500/10"
                  onClick={handleFavoriteClick}
                >
                  <Heart className={cn("h-4 w-4", item.isFavorite && "fill-current")} />
                </Button>
            </div>

            <h3 className="font-semibold text-sm truncate w-full" title={item.description}>
                {item.description}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">{item.fabric}</p>

            <div className="flex justify-around w-full text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                <BriefcaseIcon className="w-3.5 h-3.5" />
                <span>{item.formal || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                <ThermometerIcon className="w-3.5 h-3.5" />
                <span>{item.warmth || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                <SmileIcon className="w-3.5 h-3.5" />
                <span>{item.relaxed || 0}</span>
                </div>
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <AlertDialog onOpenChange={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
