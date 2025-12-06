'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, Sparkles, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatResponse } from '@/actions/ai';
import type { ClothingItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';

const userAvatar = PlaceHolderImages.find(p => p.id === 'userAvatar');

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  items?: ClothingItem[];
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your personal AI stylist. How can I help you dress today? For example, you can ask 'What should I wear for a night out?'",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await getChatResponse(input);
    setIsLoading(false);

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
        text: "I'm sorry, I couldn't come up with a suggestion right now. Please try a different prompt.",
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md rounded-xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                }`}
              >
                {message.text && <p className="text-sm">{message.text}</p>}
                {message.items && message.items.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {message.items.map(item => (
                      <Link href="/wardrobe" key={item.id}>
                        <Image
                          src={item.imageUrl}
                          alt={item.description}
                          width={100}
                          height={150}
                          className="object-cover rounded-md aspect-[2/3] transition-transform hover:scale-105"
                          data-ai-hint={`${item.color} ${item.category}`}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 border">
                  {userAvatar && (
                    <AvatarImage
                      src={userAvatar.imageUrl}
                      alt="User"
                      data-ai-hint={userAvatar.imageHint}
                    />
                  )}
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md p-3 rounded-xl bg-card">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 bg-background border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask for an outfit..."
            autoComplete="off"
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
