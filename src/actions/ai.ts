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
        mockClothingItems.find(item => item.id === '7')!, // Trench Coat
        mockClothingItems.find(item => item.id === '1')!, // Silk Blouse
        mockClothingItems.find(item => item.id === '2')!, // Wool Trousers
        mockClothingItems.find(item => item.id === '6')!, // Ankle Boots
      ].filter(Boolean),
      stylistNote:
        "Since the AI stylist is busy, I've picked out a chic and practical outfit for your business meeting. The trench coat is perfect for the rain, and the combination of the silk blouse, wool trousers, and ankle boots is both professional and stylish. You'll look sharp and stay comfortable.",
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
