'use server';
/**
 * @fileOverview Suggests an outfit based on weather, calendar events, and user preferences.
 *
 * - suggestOutfit - A function that suggests an outfit for the user.
 * - SuggestOutfitInput - The input type for the suggestOutfit function.
 * - SuggestOutfitOutput - The return type for the suggestOutfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getWeather, getCalendarEvents} from '@/services/mockContext';
import {getAvailableClothing} from '@/ai/tools/get-available-clothing-tool';
import { ClothingItemSchema } from '@/lib/types';

const SuggestOutfitInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to suggest an outfit.'),
  wardrobeItems: z.array(ClothingItemSchema).describe("The user's current wardrobe items."),
});
export type SuggestOutfitInput = z.infer<typeof SuggestOutfitInputSchema>;

export type ClothingItem = z.infer<typeof ClothingItemSchema>;

const SuggestOutfitOutputSchema = z.object({
  suggestedItems: z.array(ClothingItemSchema).describe('The list of suggested clothing items for the outfit.'),
  stylistNote: z.string().describe('A short note from the AI stylist explaining the outfit choice.'),
});
export type SuggestOutfitOutput = z.infer<typeof SuggestOutfitOutputSchema>;

export async function suggestOutfit(input: SuggestOutfitInput): Promise<SuggestOutfitOutput> {
  return suggestOutfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOutfitPrompt',
  tools: [getAvailableClothing],
  input: {
    schema: SuggestOutfitInputSchema.extend({
      weatherCondition: z.string(),
      calendarEvent: z.string(),
    }),
  },
  output: {schema: SuggestOutfitOutputSchema},
  prompt: `You are a personal stylist AI for a female user. Your task is to suggest an outfit for her based on the current weather, her calendar events, and her available wardrobe.

First, use the 'getAvailableClothing' tool to get the list of items in the user's wardrobe by passing the 'wardrobeItems' from the input to it.

Then, considering the context below, suggest the best outfit consisting of one top, one bottom, and one pair of shoes. You can also include an accessory or outerwear if appropriate.

Weather Conditions: {{{weatherCondition}}}
Calendar Event: {{{calendarEvent}}}

Pay attention to items that have been worn recently and try to suggest something different. The 'lastWorn' property indicates the last date the item was worn. Today's date is ${new Date().toISOString().split('T')[0]}.

Output the 'suggestedItems' array with items chosen from the available clothing, and a 'stylistNote' explaining your outfit choice. Make sure the outfit is appropriate for the weather and calendar event.
`,
});

const suggestOutfitFlow = ai.defineFlow(
  {
    name: 'suggestOutfitFlow',
    inputSchema: SuggestOutfitInputSchema,
    outputSchema: SuggestOutfitOutputSchema,
  },
  async input => {
    const weather = getWeather();
    const calendarEvent = getCalendarEvents();

    const {output} = await prompt({
      ...input,
      weatherCondition: `Temperature: ${weather.temp}°C, Condition: ${weather.condition}, Location: ${weather.location}`,
      calendarEvent: `Time: ${calendarEvent.time}, Event: ${calendarEvent.event}`,
    });
    return output!;
  }
);
