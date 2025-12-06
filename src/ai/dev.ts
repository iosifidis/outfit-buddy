import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/chat-with-stylist-flow.ts';
import '@/ai/flows/suggest-outfit-flow.ts';
import '@/ai/flows/generate-audio-description-flow.ts';
import '@/ai/flows/recognize-item-flow.ts';
import '@/ai/tools/get-available-clothing-tool.ts';
