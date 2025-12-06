'use server';
/**
 * @fileOverview This file defines a Genkit flow for chatting with an AI stylist to get personalized outfit recommendations.
 *
 * - chatWithStylist - A function that initiates the chat with the AI stylist and returns outfit suggestions.
 * - ChatWithStylistInput - The input type for the chatWithStylist function, including user ID and the user's query.
 * - ChatWithStylistOutput - The return type for the chatWithStylist function, providing suggested outfit items and a stylist note.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getWeather} from '@/services/mockContext';
import {getCalendarEvents} from '@/services/mockContext';
import { getAvailableClothing } from '@/ai/tools/get-available-clothing-tool';
import { ClothingItem, ClothingItemSchema } from '@/lib/types';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({text: z.string()})),
});

const ChatWithStylistInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting outfit suggestions.'),
  query: z.string().describe('The user query for outfit recommendations.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('The history of the conversation so far.'),
  wardrobeItems: z.array(ClothingItemSchema).describe("The user's current wardrobe items."),
});
export type ChatWithStylistInput = z.infer<typeof ChatWithStylistInputSchema>;

const ChatWithStylistOutputSchema = z.object({
  suggestedItems: z.array(ClothingItemSchema).describe('An array of suggested clothing items.'),
  stylistNote: z.string().describe('A short note from the stylist explaining the outfit choice.'),
});
export type ChatWithStylistOutput = z.infer<typeof ChatWithStylistOutputSchema>;

export async function chatWithStylist(input: ChatWithStylistInput): Promise<ChatWithStylistOutput> {
  return chatWithStylistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithStylistPrompt',
  tools: [getAvailableClothing],
  input: {
    schema: ChatWithStylistInputSchema.extend({
      weather: z.any(),
      calendarEvents: z.any(),
    }),
  },
  output: {
    schema: ChatWithStylistOutputSchema,
  },
  prompt: `You are a personal stylist helping a female user choose outfits from her digital wardrobe.

  First, use the 'getAvailableClothing' tool to see what items the user has. You can call it with 'favoritesOnly: true' to see her favorite items, which you should prioritize. The user's available items are provided in the input.

  The user's request is: {{{query}}}.

  Here's the weather information: {{weather}}.
  Here are the calendar events: {{calendarEvents}}.

  Based on the request, weather, and calendar, suggest an outfit. If the user is asking for another suggestion, do not suggest the same items from the chat history.
  Respond with the \"suggestedItems\" which is a list of clothing item objects, and a short \"stylistNote\" explaining your choice. Be mindful of the weather and calendar. For example, do not suggest open shoes if it is raining. Suggest appropriate business attire for meetings.
  `,
});

const chatWithStylistFlow = ai.defineFlow(
  {
    name: 'chatWithStylistFlow',
    inputSchema: ChatWithStylistInputSchema,
    outputSchema: ChatWithStylistOutputSchema,
  },
  async input => {
    const weather = await getWeather();
    const calendarEvents = await getCalendarEvents();
    
    const history = input.chatHistory || [];

    const {output} = await ai.generate({
      history,
      prompt: prompt.compile({
        ...input,
        weather,
        calendarEvents,
      })
    })

    return output!;
  }
);
