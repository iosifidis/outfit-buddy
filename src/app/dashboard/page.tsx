'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Cloudy,
  Calendar,
  Thermometer,
  MapPin,
  Sparkles,
  Shirt,
  Volume2,
  Loader
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
import { getOutfitSuggestion, getAudioDescription } from '@/actions/ai';
import { getWeather, getCalendarEvents } from '@/services/mockContext';
import type { SuggestOutfitOutput } from '@/ai/flows/suggest-outfit-flow';

function DailyRecommendation() {
  const [recommendation, setRecommendation] = useState<SuggestOutfitOutput | null>(null);
  const [isGettingRecommendation, setIsGettingRecommendation] = useState(true);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function fetchRecommendation() {
      setIsGettingRecommendation(true);
      const result = await getOutfitSuggestion();
      setRecommendation(result);
      setIsGettingRecommendation(false);
    }
    fetchRecommendation();
  }, []);

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      audioRef.current.onended = () => {
        setIsGeneratingAudio(false);
      };
    }
  }, [audioDataUri]);

  const handleListen = async () => {
    if (!recommendation?.stylistNote || isGeneratingAudio) return;

    setIsGeneratingAudio(true);
    setAudioDataUri(null);

    const result = await getAudioDescription(recommendation.stylistNote);
    if (result?.audioDataUri) {
      setAudioDataUri(result.audioDataUri);
    } else {
      setIsGeneratingAudio(false);
      // You could add a toast here to inform the user of the failure
      console.error('Failed to generate audio description.');
    }
  };
  
  if (isGettingRecommendation) {
      return (
      <Card className="col-span-1 lg:col-span-4 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <CardHeader>
            <div className="flex items-center justify-center">
                <Loader className="w-8 h-8 mr-2 animate-spin" />
                <CardTitle>Stylist is thinking...</CardTitle>
            </div>
          <CardDescription>
            Your AI stylist is curating the perfect outfit for you.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }


  if (!recommendation) {
    return (
      <Card className="col-span-1 lg:col-span-4 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
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
    <Card className="col-span-1 lg:col-span-4">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold">Stylist's Note</p>
            <Button variant="ghost" size="icon" onClick={handleListen} disabled={isGeneratingAudio} aria-label="Listen to description">
              {isGeneratingAudio ? <Loader className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {recommendation.stylistNote}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline">
            <Shirt className="w-4 h-4 mr-2" />
            Mark as Worn
          </Button>
          <Link href="/chat">
            <Button>Chat with Stylist</Button>
          </Link>
        </div>
      </CardFooter>
      <audio ref={audioRef} className="hidden" />
    </Card>
  );
}

function ContextCards() {
  const weather = getWeather();
  const calendar = getCalendarEvents();

  return (
    <>
       <Card className="col-span-1 lg:col-span-2">
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
      <Card className="col-span-1 lg:col-span-2">
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
    </>
  );
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <ContextCards />
          <DailyRecommendation />
        </div>
      </div>
    </AppLayout>
  );
}
