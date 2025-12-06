'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Sun,
  MapPin,
  Sparkles,
  Wind,
  Droplets,
  Plus,
  Mic,
  Send,
  MoreVertical,
  Bot,
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { getOutfitSuggestion, getChatResponse } from '@/actions/ai';
import type { ClothingItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function WeatherCard() {
  return (
    <Card className="bg-card/50 border-0">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <p className="text-xl font-bold">Thessaloniki</p>
            </div>
            <p className="text-sm text-muted-foreground">Saturday, December 6</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <Sun className="w-6 h-6 text-yellow-400" />
              <p className="text-4xl font-bold">18°</p>
            </div>
            <p className="text-sm text-muted-foreground">Sunny</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-background/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase">Humidity</p>
            <div className="flex items-baseline gap-2 mt-1">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <p className="text-2xl font-semibold">65%</p>
            </div>
          </div>
          <div className="bg-background/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase">Wind</p>
            <div className="flex items-baseline gap-2 mt-1">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <p className="text-2xl font-semibold">12 <span className="text-sm">km/h</span></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const calendarEvents = [
    { time: '09:00', period: 'AM', title: 'Weekly Standup', location: 'Office', color: 'border-blue-500' },
    { time: '12:30', period: 'PM', title: 'Lunch w/ Marketing', location: 'Bistro', color: 'border-green-500' },
    { time: '06:00', period: 'PM', title: 'Dinner Date', location: 'Downtown', color: 'border-pink-500' },
    { time: '08:00', period: 'PM', title: 'No events', location: null, color: 'border-transparent' },
];

function CalendarCard() {
    return (
        <Card className="bg-card/50 border-0">
            <CardHeader className="flex flex-row items-center justify-between p-6">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <CardTitle className="text-lg">Outlook Calendar</CardTitle>
                </div>
                <Button variant="secondary" size="sm" className="rounded-full text-xs h-7">Today</Button>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                    {calendarEvents.map((event) => (
                        <div key={event.time} className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="font-semibold text-sm">{event.time}</p>
                                <p className="text-xs text-muted-foreground">{event.period}</p>
                            </div>
                            <div className={`flex-1 flex items-center p-4 rounded-lg bg-background/50 border-l-4 ${event.color}`}>
                                {event.location ? (
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                           <MapPin className="w-3 h-3" />
                                           <span>{event.location}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">{event.title}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  items?: ClothingItem[];
};

function StylistCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchInitialSuggestion() {
      setIsLoading(true);
      const result = await getOutfitSuggestion();
      if (result) {
        setMessages([
          {
            id: 'initial-suggestion',
            sender: 'ai',
            text: result.stylistNote,
            items: result.suggestedItems,
          },
        ]);
      }
      setIsLoading(false);
    }
    fetchInitialSuggestion();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    const result = await getChatResponse(query);
    if (result) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: result.stylistNote,
        items: result.suggestedItems,
      };
      setMessages(prev => [...prev, aiMessage]);
    } else {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm sorry, I couldn't come up with a suggestion right now. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };
  
  return (
      <Card className="bg-card/50 border-0 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                      <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                      <CardTitle className="text-lg">AI Stylist</CardTitle>
                      <p className="text-xs text-green-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Online & Connected to Outlook
                      </p>
                  </div>
              </div>
              <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="w-8 h-8"><MoreVertical /></Button>
              </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
             {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'ai' && (
                        <div className="bg-primary text-primary-foreground p-2 rounded-full">
                           <Bot className="w-5 h-5"/>
                        </div>
                    )}
                    <div className={`p-3 rounded-lg max-w-[80%] ${message.sender === 'ai' ? 'bg-background/80' : 'bg-primary text-primary-foreground'}`}>
                        <p className="text-sm">{message.text}</p>
                        {message.items && message.items.length > 0 && (
                          <div className="mt-3">
                             <Carousel opts={{ loop: false, align: 'start' }} className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                                <CarouselContent className="-ml-2">
                                  {message.items.map((item) => (
                                    <CarouselItem key={item.id} className="pl-2 basis-1/2 md:basis-1/3">
                                      <div className="relative aspect-square">
                                        <Image src={item.imageUrl} alt={item.description} fill className="object-cover rounded-md" />
                                      </div>
                                      <p className="text-xs mt-1 truncate">{item.description}</p>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                             </Carousel>
                          </div>
                        )}
                    </div>
                </div>
             ))}
             {isLoading && messages.length === 0 && (
                <div className="flex items-start gap-3">
                   <Skeleton className="w-9 h-9 rounded-full" />
                   <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                   </div>
                </div>
             )}
          </CardContent>
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="relative">
              <Button type="button" variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8">
                  <Plus />
              </Button>
              <Input 
                placeholder="Ask me to create an outfit for your meeting..." 
                className="bg-background/80 rounded-full h-12 pl-12 pr-28"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <Button type="button" variant="ghost" size="icon" className="h-8 w-8"><Mic /></Button>
                 <Button type="submit" size="icon" className="h-9 w-9 rounded-full" disabled={isLoading || !query.trim()}>
                    <Send />
                 </Button>
              </div>
            </form>
          </div>
      </Card>
  );
}


export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <WeatherCard />
                <CalendarCard />
            </div>
            <div className="lg:col-span-1">
                <StylistCard />
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
