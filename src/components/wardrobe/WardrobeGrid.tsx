'use client';

import Image from 'next/image';
import { mockClothingItems } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function WardrobeGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {mockClothingItems.map(item => (
        <Card key={item.id} className="overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative aspect-[3/4]">
              <Image
                src={item.imageUrl}
                alt={item.description}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
                data-ai-hint={`${item.color} ${item.category}`}
              />
              <Badge variant="secondary" className="absolute top-2 left-2">{item.category}</Badge>
            </div>
            <div className="p-3">
              <p className="font-semibold truncate">{item.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                 <Badge variant="outline">{item.color}</Badge>
                 <Badge variant="outline">{item.season}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
