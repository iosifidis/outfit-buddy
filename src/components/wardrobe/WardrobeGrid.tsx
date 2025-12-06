'use client';

import { useState } from 'react';
import { ItemCard } from './ItemCard';
import { CategoryFilter } from './CategoryFilter';
import type { Category } from '@/lib/types';
import type { ClothingItem } from '@/lib/types';

interface WardrobeGridProps {
  items: ClothingItem[];
}

export function WardrobeGrid({ items }: WardrobeGridProps) {
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div className="space-y-6">
      <CategoryFilter selected={filter} onSelect={setFilter} />
      {filteredItems.length > 0 ? (
         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No items found for this category.</p>
        </div>
      )}
    </div>
  );
}
