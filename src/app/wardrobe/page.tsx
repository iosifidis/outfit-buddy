'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { AddItemForm } from '@/components/wardrobe/AddItemForm';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useWardrobe } from '@/hooks/use-wardrobe';
import { Skeleton } from '@/components/ui/skeleton';

export default function WardrobePage() {
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const { allItems, handleItemAdded, handleItemDeleted, handleToggleFavorite, handleSeedDatabase, isLoading } = useWardrobe();

  const onItemAdded = (newItemData: Omit<any, 'id' | 'userId'>) => {
    handleItemAdded(newItemData);
    setShowAddItemDialog(false);
  };

  const [isSeeding, setIsSeeding] = useState(false);
  const onSeedDatabase = async () => {
    setIsSeeding(true);
    await handleSeedDatabase();
    setIsSeeding(false);
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Wardrobe</h1>
          <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
               <DialogHeader className="p-6 pb-0">
                  <DialogTitle>Add a New Item to Your Wardrobe</DialogTitle>
               </DialogHeader>
               <div className="p-6">
                <AddItemForm onItemAdded={onItemAdded} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : allItems.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
             <h3 className="text-lg font-semibold text-foreground">Your Wardrobe is Empty</h3>
             <p className="mt-2">Start by adding your first item, or seed your wardrobe with sample data for your presentation.</p>
             <Button onClick={onSeedDatabase} disabled={isSeeding} className="mt-4">
               <Sparkles className="w-4 h-4 mr-2" />
               {isSeeding ? "Adding Items..." : "Seed Sample Wardrobe"}
             </Button>
           </div>
        ) : (
          <WardrobeGrid items={allItems} onItemDeleted={handleItemDeleted} onToggleFavorite={handleToggleFavorite} />
        )}
      </div>
    </AppLayout>
  );
}
