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

const ChatWithStylistInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting outfit suggestions.'),
  query: z.string().describe('The user query for outfit recommendations.'),
});
export type ChatWithStylistInput = z.infer<typeof ChatWithStylistInputSchema>;

const ChatWithStylistOutputSchema = z.object({
  suggestedItems: z.array(z.string()).describe('An array of suggested clothing item IDs.'),
  stylistNote: z.string().describe('A short note from the stylist explaining the outfit choice.'),
});
export type ChatWithStylistOutput = z.infer<typeof ChatWithStylistOutputSchema>;

export async function chatWithStylist(input: ChatWithStylistInput): Promise<ChatWithStylistOutput> {
  return chatWithStylistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithStylistPrompt',
  input: {
    schema: ChatWithStylistInputSchema,
  },
  output: {
    schema: ChatWithStylistOutputSchema,
  },
  prompt: `You are a personal stylist helping a female user choose outfits from her digital wardrobe.

  The user is asking for outfit recommendations for the following scenario: {{{query}}}.

  Here's the weather information: {{weather}}.
  Here are the calendar events: {{calendarEvents}}.

  Based on the scenario, weather, and calendar events, suggest a combination of clothing items (Top, Bottom, Shoes, etc.) from the user's wardrobe.
  Respond with the \"suggestedItems\" which is a list of item ids, and a short \"stylistNote\" explaining the outfit choice. Be mindful of the weather and calendar events when creating the outfit. For example, do not suggest open shoes if it is raining. Suggest appropriate business attire for meetings.
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

    const {output} = await prompt({
      ...input,
      weather,
      calendarEvents,
    });
    return output!;
  }
);
