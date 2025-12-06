'use client';

import { Button } from '@/components/ui/button';
import { CATEGORIES, type Category } from '@/lib/types';
import { cn } from '@/lib/utils';

const allCategories: (Category | 'All')[] = ['All', ...CATEGORIES];

interface CategoryFilterProps {
  selected: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {allCategories.map(category => (
        <Button
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
