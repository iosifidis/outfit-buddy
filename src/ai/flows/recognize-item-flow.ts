'use server';
/**
 * @fileOverview A Genkit flow for recognizing a clothing item from an image.
 *
 * - recognizeItem - A function that takes an image and returns its attributes.
 * - RecognizeItemInput - The input type for the recognizeItem function.
 * - RecognizeItemOutput - The return type for the recognizeItem function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { CATEGORIES, SEASONS, LENGTHS } from '@/lib/types';

const RecognizeItemInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a clothing item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecognizeItemInput = z.infer<typeof RecognizeItemInputSchema>;

const RecognizeItemOutputSchema = z.object({
  description: z.string().describe('A concise, descriptive name for the clothing item (e.g., "Blue Floral Summer Dress").'),
  category: z.enum(CATEGORIES).describe('The category of the clothing item.'),
  color: z.string().describe('The primary color of the item.'),
  fabric: z.string().describe('The apparent fabric of the item (e.g., Cotton, Denim, Silk).'),
  pattern: z.string().describe('The pattern of the item (e.g., Solid, Floral, Striped).'),
  season: z.enum(SEASONS).describe('The most appropriate season for this item.'),
  length: z.enum(LENGTHS).describe('The length of the item.'),
  occasion: z.string().describe('A suitable occasion for the item (e.g., Casual, Business, Party).'),
});
export type RecognizeItemOutput = z.infer<typeof RecognizeItemOutputSchema>;


export async function recognizeItem(input: RecognizeItemInput): Promise<RecognizeItemOutput> {
  return recognizeItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recognizeItemPrompt',
  input: { schema: RecognizeItemInputSchema },
  output: { schema: RecognizeItemOutputSchema },
  prompt: `You are an expert fashion assistant. Analyze the provided image of a single clothing item and identify its key attributes.

Based on the image, provide the following details:
- A concise, descriptive name for the item.
- Its category (Top, Bottom, Shoes, Outerwear, Accessory).
- Its primary color.
- Its fabric type.
- Its pattern.
- The most suitable season to wear it.
- Its length (Mini, Midi, Maxi, Long).
- A suitable occasion for wearing it.

Return the information in the specified JSON format.

Photo: {{media url=photoDataUri}}`,
});

const recognizeItemFlow = ai.defineFlow(
  {
    name: 'recognizeItemFlow',
    inputSchema: RecognizeItemInputSchema,
    outputSchema: RecognizeItemOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
