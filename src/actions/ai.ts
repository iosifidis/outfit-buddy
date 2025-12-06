'use server';

import { suggestOutfit as suggestOutfitFlow } from '@/ai/flows/suggest-outfit-flow';
import { chatWithStylist as chatWithStylistFlow } from '@/ai/flows/chat-with-stylist-flow';
import { mockClothingItems } from '@/lib/mock-data';

export async function getOutfitSuggestion() {
  try {
    // In a real app, you'd get the userId from the session
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
        mockClothingItems.find(item => item.id === '1')!,
        mockClothingItems.find(item => item.id === '2')!,
        mockClothingItems.find(item => item.id === '3')!,
      ].filter(Boolean),
      stylistNote:
        "Here's a classic and reliable choice for today. This outfit is versatile and comfortable, perfect for a variety of occasions.",
    };
  }
}

export async function getChatResponse(query: string) {
  try {
    const result = await chatWithStylistFlow({ userId: 'user1', query });
    const items = mockClothingItems.filter(item => result.suggestedItems.includes(item.id));
    return {
      suggestedItems: items,
      stylistNote: result.stylistNote,
    };
  } catch (error) {
    console.error('Error in chat with stylist:', error);
    return null;
  }
}
