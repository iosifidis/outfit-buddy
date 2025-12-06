'use client';

import Image from 'next/image';
import { useState } from 'react';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { ClothingItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ItemDetailsDialog } from './ItemDetailsDialog';
import { cn } from '@/lib/utils';
import { Shirt, Trash2 } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
}

export function ItemCard({ item }: ItemCardProps) {
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const firestore = useFirestore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the dialog
    if (!firestore || !item.userId || !item.id) return;
    const docRef = doc(firestore, `users/${item.userId}/clothingItems/${item.id}`);
    deleteDocumentNonBlocking(docRef);
  };

  return (
    <ItemDetailsDialog
      item={item}
      open={isDetailsOpen}
      onOpenChange={setDetailsOpen}
      onDelete={() => {
        if (!firestore || !item.userId || !item.id) return;
        const docRef = doc(firestore, `users/${item.userId}/clothingItems/${item.id}`);
        deleteDocumentNonBlocking(docRef);
      }}
    >
      <Card
        className="group overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl bg-card/80 border-0 cursor-pointer hover:-translate-y-1"
        onClick={() => setDetailsOpen(true)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square bg-background/50 rounded-t-lg flex items-center justify-center">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={`${item.color} ${item.category}`}
              />
            ) : (
              <Shirt className="w-16 h-16 text-muted-foreground" />
            )}
             <button
              onClick={handleDelete}
              className="absolute top-2 right-2 z-10 p-1.5 bg-background/50 rounded-full text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 text-center">
            <p className="font-semibold truncate text-sm" title={item.description}>
              {item.description}
            </p>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <Badge variant="secondary" className="text-xs">{item.category}</Badge>
              <Badge variant="outline" className="text-xs">{item.season}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </ItemDetailsDialog>
  );
}
