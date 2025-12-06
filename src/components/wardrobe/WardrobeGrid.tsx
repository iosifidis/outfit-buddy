'use client';

import { mockClothingItems } from '@/lib/mock-data';
import { ItemCard } from './ItemCard';

export function WardrobeGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {mockClothingItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
