'use server';

import { suggestOutfit as suggestOutfitFlow } from '@/ai/flows/suggest-outfit-flow';
import { chatWithStylist as chatWithStylistFlow } from '@/ai/flows/chat-with-stylist-flow';
import { mockClothingItems } from '@/lib/mock-data';

export async function getOutfitSuggestion() {
  try {
    // In a real app, you'd get the userId from the session
    const result = await suggestOutfitFlow({ userId: 'user1' });
    return result;
  } catch (error) {
    console.error('Error suggesting outfit:', error);
    return null;
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
