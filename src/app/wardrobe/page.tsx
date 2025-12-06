import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { AddItemSheet } from '@/components/wardrobe/AddItemSheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WardrobePage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Digital Wardrobe</h1>
          <div>
            <AddItemSheet>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </AddItemSheet>
          </div>
        </div>
        <WardrobeGrid />
      </div>
    </AppLayout>
  );
}
