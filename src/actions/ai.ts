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
    // Check if the result is valid and has items.
    if (result && result.suggestedItems && result.suggestedItems.length > 0) {
      return result;
    }
    // If AI returns an empty list, it's considered a failure to be caught.
    throw new Error('AI suggestion returned empty.');
  } catch (error) {
    console.error('Error suggesting outfit, providing fallback:', error);
    
    // Fallback: Return the first 3 items from the wardrobe if available.
    const fallbackItems = wardrobeItems.slice(0, 3);
    
    return {
      suggestedItems: fallbackItems,
      stylistNote:
        "I had some trouble coming up with a perfect outfit, but here are a few items from your wardrobe to get you started! Try adding more items for better suggestions.",
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
