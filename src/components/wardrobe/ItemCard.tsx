'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ClothingItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ItemDetailsDialog } from './ItemDetailsDialog';
import { cn } from '@/lib/utils';
import { BriefcaseIcon, ThermometerIcon, SmileIcon } from '@/components/icons';

interface ItemCardProps {
  item: ClothingItem;
  onDelete?: (itemId: string) => void;
}

export function ItemCard({ item, onDelete }: ItemCardProps) {
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  return (
    <ItemDetailsDialog
      item={item}
      open={isDetailsOpen}
      onOpenChange={setDetailsOpen}
      onDelete={onDelete}
    >
      <Card
        className={cn(
          'group overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl bg-card/80 border-0 cursor-pointer hover:-translate-y-1'
        )}
        onClick={() => setDetailsOpen(true)}
      >
        <CardContent className="p-4">
          <div className="relative aspect-square bg-background/50 rounded-md flex items-center justify-center mb-4">
            <Image
              src={item.imageUrl}
              alt={item.description}
              width={100}
              height={100}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={`${item.color} ${item.category}`}
            />
          </div>
          <div className="text-center">
            <p className="font-semibold truncate text-sm" title={item.description}>
              {item.description}
            </p>
            <p className="text-xs text-muted-foreground">{item.fabric}</p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
             <div className="flex items-center gap-1.5">
                <BriefcaseIcon className="w-3.5 h-3.5" />
                <span>{item.formal || 0}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <ThermometerIcon className="w-3.5 h-3.5" />
                <span>{item.warmth || 0}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <SmileIcon className="w-3.5 h-3.5" />
                <span>{item.relaxed || 0}</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </ItemDetailsDialog>
  );
}
