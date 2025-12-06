'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { AppLayout } from '@/components/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockOutfitHistory } from '@/lib/mock-data';
import { BriefcaseIcon, Shirt } from 'lucide-react';
import type { OutfitHistory as OutfitHistoryType } from '@/lib/types';


const historyData: OutfitHistoryType[] = mockOutfitHistory.map(h => ({ ...h, userId: 'user1' }));

export default function HistoryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedOutfit = useMemo(() => {
    if (!date) return null;
    const selectedDateString = date.toDateString();
    return historyData.find(
      (h) => h.date.toDateString() === selectedDateString
    );
  }, [date]);

  const wornDates = useMemo(() => historyData.map(h => h.date), []);

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Outfit History</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full",
                table: "w-full",
                head_row: "w-full",
                row: "w-full justify-between",
              }}
              modifiers={{
                worn: wornDates,
              }}
               modifiersStyles={{
                worn: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  textDecorationColor: 'hsl(var(--primary))',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '0.2rem',
                }
              }}
            />
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Outfit for {date ? format(date, 'PPP') : 'N/A'}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedOutfit ? (
                <div className="space-y-4">
                  {selectedOutfit.notes && (
                    <CardDescription className="italic">"{selectedOutfit.notes}"</CardDescription>
                  )}
                  <ScrollArea className="h-96">
                    <div className="space-y-4 pr-4">
                      {selectedOutfit.selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-background rounded-lg">
                           <div className="relative w-20 h-20 bg-muted rounded-md flex-shrink-0">
                             {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.description}
                                  fill
                                  className="object-contain"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Shirt className="w-10 h-10 text-muted-foreground" />
                                </div>
                              )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold">{item.description}</p>
                            <p className="text-sm text-muted-foreground">{item.color} • {item.fabric}</p>
                             <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="secondary">{item.category}</Badge>
                                <Badge variant="secondary">{item.occasion}</Badge>
                                <Badge variant="outline">{item.season}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center text-muted-foreground">
                  <BriefcaseIcon className="w-16 h-16 mb-4" />
                  <p className="font-semibold">No Outfit Logged</p>
                  <p className="text-sm">There is no outfit history recorded for this day.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
