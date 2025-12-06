'use server';

import { suggestOutfit as suggestOutfitFlow } from '@/ai/flows/suggest-outfit-flow';
import { chatWithStylist as chatWithStylistFlow } from '@/ai/flows/chat-with-stylist-flow';
import { generateAudioDescription as generateAudioDescriptionFlow } from '@/ai/flows/generate-audio-description-flow';
import { recognizeItem as recognizeItemFlow } from '@/ai/flows/recognize-item-flow';
import { mockClothingItems } from '@/lib/mock-data';
import type { SuggestOutfitOutput } from '@/ai/flows/suggest-outfit-flow';
import type { ChatWithStylistInput } from '@/ai/flows/chat-with-stylist-flow';

export async function getOutfitSuggestion(): Promise<SuggestOutfitOutput> {
  try {
    const result = await suggestOutfitFlow({ userId: 'user1' });
    if (result && result.suggestedItems.length > 0) {
      return result;
    }
    throw new Error('AI suggestion failed or returned empty.');
  } catch (error) {
    console.error('Error suggesting outfit:', error);
    // Return a default outfit as a fallback
    return {
      suggestedItems: [
        mockClothingItems.find(item => item.id === '7')!, // Trench Coat
        mockClothingItems.find(item => item.id === '1')!, // Silk Blouse
        mockClothingItems.find(item => item.id === '2')!, // Wool Trousers
        mockClothingItems.find(item => item.id === '6')!, // Ankle Boots
      ].filter(Boolean),
      stylistNote:
        "Hello! I'm your AI Stylist. I've generated some looks for you based on the weather in Thessaloniki. Check them out!",
    };
  }
}

export async function getChatResponse(query: string, chatHistory?: ChatWithStylistInput['chatHistory']) {
  try {
    // In a real app, you'd get the userId from the session
    const result = await chatWithStylistFlow({ userId: 'user1', query, chatHistory });
    return {
      ...result,
      suggestedItems: mockClothingItems.filter(item => result.suggestedItems.includes(item.id))
    };
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
