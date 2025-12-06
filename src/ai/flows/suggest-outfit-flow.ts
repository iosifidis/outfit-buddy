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

const SuggestOutfitInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to suggest an outfit.'),
});
export type SuggestOutfitInput = z.infer<typeof SuggestOutfitInputSchema>;

const ClothingItemSchema = z.object({
  id: z.string().describe('The UUID of the clothing item'),
  userId: z.string().describe('Foreign Key referencing the user'),
  imageUrl: z.string().describe('URL of the clothing item image'),
  color: z.string().describe('Color of the clothing item'),
  fabric: z.string().describe('Fabric of the clothing item'),
  pattern: z.string().describe('Pattern of the clothing item'),
  season: z.enum(['Spring', 'Summer', 'Autumn', 'Winter']).describe('Season for which the clothing item is suitable'),
  length: z.enum(['Mini', 'Midi', 'Maxi', 'Long']).describe('Length of the clothing item'),
  category: z.string().describe('Category of the clothing item (e.g., Top, Bottom, Shoes, Outerwear)'),
  occasion: z.string().describe('Occasion for which the clothing item is suitable'),
  description: z.string().describe('Description of the clothing item'),
  lastWorn: z.string().nullable().describe('Date the item was last worn'),
});
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
  input: {
    schema: SuggestOutfitInputSchema.extend({
      weatherCondition: z.string(),
      calendarEvent: z.string()
    }),
  },
  output: {schema: SuggestOutfitOutputSchema},
  prompt: `You are a personal stylist AI. Given the following weather conditions, calendar event, and clothing items, suggest the best outfit consisting of one top, one bottom, and one pair of shoes. Return the suggested items and a short stylist note explaining the outfit choice.

Weather Conditions: {{{weatherCondition}}}
Calendar Event: {{{calendarEvent}}}

Consider these clothing items:
{{#each clothingItems}}
  - Category: {{category}}, Color: {{color}}, Description: {{description}}
{{/each}}

Output the suggestedItems array with items chosen from the input clothingItems array, and a stylistNote explaining the outfit choice. Make sure the outfit is appropriate for the weather and calendar event.
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

    // Mock Data Connect query - replace with actual Data Connect call
    const clothingItems: ClothingItem[] = [
      { id: '1', userId: input.userId, imageUrl: 'top1.jpg', color: 'Blue', fabric: 'Cotton', pattern: 'Solid', season: 'Spring', length: 'Mini', category: 'Top', occasion: 'Casual', description: 'Blue cotton t-shirt', lastWorn: null },
      { id: '2', userId: input.userId, imageUrl: 'bottom1.jpg', color: 'Black', fabric: 'Denim', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Bottom', occasion: 'Casual', description: 'Black denim jeans', lastWorn: null },
      { id: '3', userId: input.userId, imageUrl: 'shoes1.jpg', color: 'White', fabric: 'Leather', pattern: 'Solid', season: 'Summer', length: 'Mini', category: 'Shoes', occasion: 'Casual', description: 'White leather sneakers', lastWorn: null },
      { id: '4', userId: input.userId, imageUrl: 'top2.jpg', color: 'Red', fabric: 'Silk', pattern: 'Floral', season: 'Summer', length: 'Mini', category: 'Top', occasion: 'Party', description: 'Red silk blouse', lastWorn: null },
      { id: '5', userId: input.userId, imageUrl: 'bottom2.jpg', color: 'Gray', fabric: 'Wool', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Bottom', occasion: 'Business', description: 'Gray wool trousers', lastWorn: null },
      { id: '6', userId: input.userId, imageUrl: 'shoes2.jpg', color: 'Black', fabric: 'Leather', pattern: 'Solid', season: 'Winter', length: 'Mini', category: 'Shoes', occasion: 'Business', description: 'Black leather heels', lastWorn: null },
    ];

    const {output} = await prompt({
      ...input,
      weatherCondition: `Temperature: ${weather.temp}, Condition: ${weather.condition}, Location: ${weather.location}`,
      calendarEvent: `Time: ${calendarEvent.time}, Event: ${calendarEvent.event}`,
      clothingItems: clothingItems,
    });
    return output!;
  }
);
