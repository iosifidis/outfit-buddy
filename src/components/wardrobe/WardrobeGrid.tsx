'use client';

import { useState } from 'react';
import { mockClothingItems } from '@/lib/mock-data';
import { ItemCard } from './ItemCard';
import { CategoryFilter } from './CategoryFilter';
import type { Category } from '@/lib/types';
import type { ClothingItem } from '@/lib/types';

export function WardrobeGrid() {
  const [items, setItems] = useState<ClothingItem[]>(mockClothingItems);
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const handleDelete = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div className="space-y-6">
      <CategoryFilter selected={filter} onSelect={setFilter} />
      {filteredItems.length > 0 ? (
         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} onDelete={handleDelete} />
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
