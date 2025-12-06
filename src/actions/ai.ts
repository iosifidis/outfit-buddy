'use server';

import { suggestOutfit as suggestOutfitFlow } from '@/ai/flows/suggest-outfit-flow';
import { chatWithStylist as chatWithStylistFlow } from '@/ai/flows/chat-with-stylist-flow';
import { generateAudioDescription as generateAudioDescriptionFlow } from '@/ai/flows/generate-audio-description-flow';
import { recognizeItem as recognizeItemFlow } from '@/ai/flows/recognize-item-flow';
import type { ClothingItem } from '@/lib/types';
import type { SuggestOutfitOutput } from '@/ai/flows/suggest-outfit-flow';
import type { ChatWithStylistInput } from '@/ai/flows/chat-with-stylist-flow';

export async function getOutfitSuggestion(wardrobeItems: ClothingItem[]): Promise<SuggestOutfitOutput> {
  try {
    const result = await suggestOutfitFlow({ userId: 'user1', wardrobeItems });
    if (result && result.suggestedItems.length > 0) {
      return result;
    }
    throw new Error('AI suggestion failed or returned empty.');
  } catch (error) {
    console.error('Error suggesting outfit:', error);
    // Return an empty outfit as a fallback
    return {
      suggestedItems: [],
      stylistNote:
        "Hello! I'm your AI Stylist. I had some trouble coming up with an outfit. Please make sure you have items in your wardrobe and try again!",
    };
  }
}

export async function getChatResponse(wardrobeItems: ClothingItem[], query: string, chatHistory?: ChatWithStylistInput['chatHistory']) {
  try {
    // In a real app, you'd get the userId from the session
    const result = await chatWithStylistFlow({ userId: 'user1', query, chatHistory, wardrobeItems });
    return result;
  } catch (error) {
    console.error('Error in chat with stylist:', error);
    return null;
  }
}

export async function getAudioDescription(text: string) {
  try {
    const result = await generateAudioDescriptionFlow(text);
    return result;
  } catch (error) {
    console.error('Error generating audio description:', error);
    return null;
  }
}

export async function getItemRecognition(photoDataUri: string) {
  try {
    const result = await recognizeItemFlow({ photoDataUri });
    return result;
  } catch (error) {
    console.error('Error recognizing item:', error);
    return null;
  }
}
