'use client';

import { useState } from 'react';
import { mockClothingItems } from '@/lib/mock-data';
import { ItemCard } from './ItemCard';
import { CategoryFilter } from './CategoryFilter';
import type { Category } from '@/lib/types';

export function WardrobeGrid() {
  const [items, setItems] = useState(mockClothingItems);
  const [donatedItems, setDonatedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const handleDonate = (itemId: string) => {
    setDonatedItems(prev => [...prev, itemId]);
  };

  const visibleItems = items.filter(item => !donatedItems.includes(item.id));

  const filteredItems = filter === 'All'
    ? visibleItems
    : visibleItems.filter(item => item.category === filter);

  return (
    <div className="space-y-6">
      <CategoryFilter selected={filter} onSelect={setFilter} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} onDonate={handleDonate} />
        ))}
      </div>
    </div>
  );
}
