'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { AddItemForm } from '@/components/wardrobe/AddItemForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WardrobePage() {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const handleItemAdded = () => {
    setShowAddItemForm(false);
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
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
        <AnimatePresence>
          {showAddItemForm && (
             <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-6 border-2 border-dashed rounded-lg border-border mb-6">
                <AddItemForm onItemAdded={handleItemAdded} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <WardrobeGrid />
      </div>
    </AppLayout>
  );
}
