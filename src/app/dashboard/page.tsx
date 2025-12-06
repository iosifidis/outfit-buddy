'use client';
import {
  Cloud,
  Wind,
  Droplets,
  Calendar,
  Sun,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

function StylistCard() {
  return (
      <Card className="bg-gradient-to-br from-primary/80 to-primary/60 border-0">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
               <div className="bg-background/30 rounded-full p-3">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
               </div>
              <h3 className="mt-4 text-xl font-bold text-primary-foreground">AI Stylist</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">Get outfit recommendations, and chat with your personal stylist.</p>
              <Button variant="secondary" className="mt-4 rounded-full">
                  Chat with Stylist
              </Button>
          </CardContent>
      </Card>
  );
}


export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <WeatherCard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <CalendarCard />
            </div>
            <StylistCard />
        </div>
      </div>
    </AppLayout>
  );
}
