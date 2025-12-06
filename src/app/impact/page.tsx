'use client';

import { useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { useWardrobe } from '@/hooks/use-wardrobe';
import { isBefore, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function ImpactPage() {
  const { allItems, handleItemDeleted, handleToggleFavorite } = useWardrobe();

  const donationSuggestions = useMemo(() => {
    const sixMonthsAgo = subMonths(new Date(), 6);
    
    return allItems.filter(item => {
      // Item has never been worn
      if (item.lastWorn === null) {
        return true;
      }
      // Item was last worn more than 6 months ago
      try {
        const lastWornDate = new Date(item.lastWorn);
        return isBefore(lastWornDate, sixMonthsAgo);
      } catch (error) {
        // Handle potential invalid date strings gracefully
        return false;
      }
    });
  }, [allItems]);

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Your Impact</h1>
            <p className="text-muted-foreground max-w-2xl">
              Making a difference starts with small actions. Here are some items from your wardrobe you haven't worn in a while. Consider donating them to give them a new life and support a great cause.
            </p>
          </div>
          <Button>Find Donation Center</Button>
        </div>
        
        {donationSuggestions.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground">
             <p>Your wardrobe is up to date!</p>
             <p className="text-sm">No donation suggestions at the moment. Keep enjoying your outfits!</p>
           </div>
        ) : (
          <WardrobeGrid items={donationSuggestions} onItemDeleted={handleItemDeleted} onToggleFavorite={handleToggleFavorite} />
        )}
      </div>
    </AppLayout>
  );
}
