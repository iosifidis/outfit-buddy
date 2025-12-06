
import {
  Cloudy,
  Calendar,
  Thermometer,
  MapPin,
  Sparkles,
  Shirt,
} from 'lucide-react';
import Image from 'next/image';

import { AppLayout } from '@/components/AppLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getOutfitSuggestion } from '@/actions/ai';
import { getWeather, getCalendarEvents } from '@/services/mockContext';
import { mockClothingItems } from '@/lib/mock-data';
import Link from 'next/link';

async function DailyRecommendation() {
  const recommendation = await getOutfitSuggestion();

  if (!recommendation) {
    return (
      <Card className="lg:col-span-3 flex flex-col items-center justify-center p-8 text-center">
        <CardHeader>
          <CardTitle>Could not generate a recommendation</CardTitle>
          <CardDescription>
            The AI stylist is taking a break. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const outfitItems = recommendation.suggestedItems;

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-2xl">Today's Outfit</CardTitle>
            <CardDescription>
              Selected for you by your AI Stylist
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-primary border-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Curated
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {outfitItems.map(
            item =>
              item && (
                <div key={item.id} className="relative group">
                  <Card className="overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.description}
                      width={400}
                      height={600}
                      className="object-cover w-full h-auto aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={`${item.color} ${item.category}`}
                    />
                  </Card>
                  <div className="mt-2 text-center">
                    <p className="font-semibold">{item.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md p-4 rounded-lg bg-muted/50">
          <p className="text-sm font-semibold">Stylist's Note</p>
          <p className="text-sm text-muted-foreground">
            {recommendation.stylistNote}
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">
            <Shirt className="w-4 h-4 mr-2" />
            Mark as Worn
          </Button>
          <Link href="/chat">
            <Button>Chat with Stylist</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

function ContextCards() {
  const weather = getWeather();
  const calendar = getCalendarEvents();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:contents">
       <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Weather</CardTitle>
          <Cloudy className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weather.condition}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Thermometer className="w-3 h-3 mr-1" />
            <span>{weather.temp}°C</span>
            <MapPin className="w-3 h-3 ml-2 mr-1" />
            <span>{weather.location}</span>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Today's Main Event
          </CardTitle>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calendar.event}</div>
          <p className="text-xs text-muted-foreground">at {calendar.time}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <DailyRecommendation />
          <ContextCards />
        </div>
      </div>
    </AppLayout>
  );
}
