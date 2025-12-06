'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { AddItemForm } from '@/components/wardrobe/AddItemForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

export default function WardrobePage() {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const handleItemAdded = () => {
    // Here you would typically refetch the items
    // For now, we just close the form
    setShowAddItemForm(false);
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Wardrobe</h1>
          <div>
            <Button onClick={() => setShowAddItemForm(prev => !prev)}>
              {showAddItemForm ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </>
              )}
            </Button>
          </div>
        </div>
        {showAddItemForm && (
          <div className="p-6 border-2 border-dashed rounded-lg border-border">
              <AddItemForm onItemAdded={handleItemAdded} />
          </div>
        )}
        <WardrobeGrid />
      </div>
    </AppLayout>
  );
}
