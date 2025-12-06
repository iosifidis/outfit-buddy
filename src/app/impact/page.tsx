'use client';
import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ItemCard } from '@/components/wardrobe/ItemCard';
import { mockClothingItems } from '@/lib/mock-data';
import type { ClothingItem, Category } from '@/lib/types';
import { HeartHandshake } from 'lucide-react';
import { CategoryFilter } from '@/components/wardrobe/CategoryFilter';

// This would typically come from a user's data, not mock data
const initialDonatedIds = ['5', '9'];

export default function ImpactPage() {
  const [donatedItems, setDonatedItems] = useState<ClothingItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState<Category | 'All'>('All');

  useEffect(() => {
    // In a real app, you'd fetch this from a database.
    // For this demo, we filter the mock data.
    const items = mockClothingItems.filter(item => initialDonatedIds.includes(item.id));
    setDonatedItems(items);
    setIsClient(true);
  }, []);

  const handleDelete = (itemId: string) => {
    setDonatedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  if (!isClient) {
    return null;
  }
  
  const filteredItems = filter === 'All'
    ? donatedItems
    : donatedItems.filter(item => item.category === filter);

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Your Impact</h1>
        </div>
        
        {donatedItems.length > 0 ? (
          <div className="space-y-4">
            <CategoryFilter selected={filter} onSelect={setFilter} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  variant="donated"
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed rounded-lg border-border">
              <HeartHandshake className="w-16 h-16 text-muted-foreground" />
              <h2 className="mt-6 text-xl font-semibold">No Donations Yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Head to your wardrobe to donate items and track your impact.
              </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
