# **App Name**: OutfitBuddy

## Core Features:

- Clothing Digitization: Users can upload clothing images with metadata (color, fabric, pattern, season, etc.) to Firebase Storage and Firestore.
- AI Outfit Suggestion: Suggest outfits based on weather, calendar events, and user style preferences using a Genkit flow. The flow acts as a tool to fetch weather, calendar and user information.
- Daily Recommendation Display: Display a daily outfit recommendation with weather/calendar context on the dashboard.
- Outfit History Tracking: Track outfit history and last worn dates of clothing items in Firestore.
- Chat with Stylist: A chat interface to ask for outfit recommendations based on specific prompts.
- User Authentication: Enable user authentication using Firebase Authentication (email/password or Google).
- Accept Outfit Action: User can accept the outfit suggested by the AI, updating the 'lastWorn' field of clothing items in Firestore.

## Style Guidelines:

- Primary color: Deep Blue (#1A237E) to convey trust and sophistication.
- Background color: Light Gray (#ECEFF1), providing a neutral backdrop.
- Accent color: Yellow-Amber (#FFB300) to highlight key actions and information.
- Body font: 'Inter', a sans-serif for clean and modern readability. Headline Font: 'Space Grotesk', a sans-serif for a computerized, techy feel. 
- Use clear, minimalist icons from a set like Material Icons to represent clothing categories and actions.
- Employ a mobile-first, grid-based layout using Tailwind CSS for responsive design.
- Incorporate subtle transitions and animations for a polished user experience when loading outfits or switching views.