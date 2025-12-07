# Outfit Buddy: System Analysis & Design Document

## 1. System Overview
**Outfit Buddy** is a "Smart Wardrobe" application that functions as a personal stylist. It differentiates itself from simple inventory apps by integrating:
1.  **Context Awareness:** It is aware of the weather and the user's schedule (Outlook).
2.  **AI Ratings:** It automatically rates clothing items (Formality, Warmth, Comfort).
3.  **Social Impact:** It suggests donating clothes that are no longer being used.

---

## 2. Functional Requirements

### 2.1 Account Management & Authentication (Auth)

* **1.1.** Support for Sign Up / Sign In via Email.
* **1.2.** **"Sign In Anonymously"** feature (for quick testing without registration).
* **1.3.** Password recovery (Forgot password).

### 2.2 Dashboard & AI Stylist (Main Screen)

* **2.1. Weather Integration:** Displays location (e.g., Thessaloniki), Temperature, Weather Conditions (e.g., Rainy), Humidity, and Wind.
* **2.2. Calendar Integration:** Integration with **Outlook Calendar**. Displays the day's agenda (e.g., Weekly Standup, Lunch, Dinner Date).
* **2.3. AI Chatbot:**
    * Chat interface located on the main screen.
    * The Agent must "read" the Outlook schedule (e.g., "I have a Dinner Date") and the weather, and propose 3 specific items from the wardrobe (Image + Title).
    * Support for voice commands (Voice Input icon).

### 2.3 Digital Wardrobe & Data Entry

* **3.1. Inventory View:** Grid view with filters (All, Top, Bottom, Shoes, Outerwear, Accessory).
* **3.2. Item Cards:** Each card displays a Photo, Title, Material, and usage statistics.
* **3.3. Add Item / Scan with AI:**
    * Capture photo or Upload.
    * **AI Auto-Tagging:** "Scan with AI" function for automatic feature recognition.
* **3.4. Item Data (Data Schema):**
    * *Basics:* Description, Category, Color, Fabric, Pattern, Occasion.
    * *AI Ratings (Sliders 0-10):*
        * **Formal Scale** (How formal is it?)
        * **Warmth Scale** (How warm is it? - Critical for the weather algorithm)
        * **Relaxed Scale** (How comfortable/casual is it?)

### 2.4 Smart Shop & Recommendations

* **4.1.** The system suggests new clothes for purchase (Shop Recommendations).
* **4.2.** Logic (Algorithm): "Based on your favorites". The system analyzes what the user likes and suggests complementary items.

### 2.5 Your Impact (Eco-Conscious Feature)

* **5.1. Inactivity Tracker:** The system identifies clothes that haven't been worn for a long period ("items you haven't worn in a while").
* **5.2. Donation flow:** Suggests these items for donation and provides a "Find Donation Center" button.

---

## 3. User Stories

### 1. Authentication & Onboarding
* **US-1.1:** As a **new user**, I want to use **"Sign In Anonymously"** so I can test the app's features quickly without providing my email.
* **US-1.2:** As a **registered user**, I want to log in with my email so I can retrieve my saved wardrobe and history on any device.

### 2. Dashboard & Context Awareness
* **US-2.1:** As a **user**, I want to see the **Weather (Temperature & Conditions)** for my location on the home screen, so I know if I need to dress warmly or take an umbrella.
* **US-2.2:** As a **busy professional**, I want the app to connect to my **Outlook Calendar** and show me my daily agenda, so that clothing suggestions match my obligations (e.g., Meeting vs. Dinner).

### 3. AI Stylist & Interaction
* **US-3.1:** As a **user**, I want to chat with the **AI Stylist** on the home screen to receive specific suggestions (Top, Bottom, Shoes) based on my schedule.
* **US-3.2:** As a **user on the go**, I want to use **Voice Input** to ask the Stylist for help without typing.

### 4. Wardrobe Management & Metadata
* **US-4.1:** As an **organized user**, I want to view my clothes in a **Grid View** and filter them by category (Top, Bottom, Shoes) to quickly find what I'm looking for.
* **US-4.2:** As a **user**, I want to use **"Scan with AI"** when adding an item so that fields (Color, Material, Pattern) are filled in automatically, saving me time.
* **US-4.3:** As a **user**, I want to define item properties using **Sliders (Scales)** for:
    * **Warmth:** So the AI knows when to suggest it based on the weather.
    * **Formal:** To match the event type (e.g., Wedding vs. Gym).
    * **Relaxed:** For casual occasions.

### 5. Smart Shopping
* **US-5.1:** As a **user looking for a refresh**, I want to receive **Shop Recommendations** based on my "Favorites," so I can discover new clothes that match my style.

### 6. Social Impact & Ecology
* **US-6.1:** As an **eco-conscious user**, I want the system to automatically identify **"Items I haven't worn in a while"** (inactive items) so I can declutter my wardrobe.
* **US-6.2:** As a **user**, I want to click **"Find Donation Center"** for unworn clothes to see where I can easily donate them.

### 7. Favorites & Management
* **US-7.1:** As a **user**, I want to add clothes to **Favorites** (heart icon) so the algorithm has data on what I like best and can make better shopping suggestions.

---

## 4. Use Cases

### UC-01: Context-Aware Outfit Suggestion

**Actors:** User, AI Stylist (System), Weather API, Outlook Calendar API.
**Precondition:** The user has connected Outlook and has registered clothes in the wardrobe.

**Description (Basic Flow):**
1.  The user opens the app on the Dashboard.
2.  The system automatically retrieves the weather for the location (e.g., "Thessaloniki, 13°C, Rainy") and events from Outlook (e.g., "Dinner Date - 06:00 PM").
3.  The user types in the Chat or presses the microphone: *"What should I wear for the date tonight?"*.
4.  The AI analyzes the data:
    * Due to **"Dinner Date"**, it filters for clothes with a high **Formal Score**.
    * Due to **"13°C"**, it filters for clothes with a high **Warmth Score** (e.g., wool, not sleeveless).
    * Due to **"Rainy"**, it excludes sensitive shoes (e.g., suede or canvas).
5.  The system displays 3 cards in the Chat (Top, Bottom, Shoes): *"White silk shirt, Black wool trousers, Leather loafers"*.
6.  The user is satisfied, and the interaction ends.

**Alternative Flow:**
* If the user doesn't want the shirt, they type: *"Something warmer?"*. The AI searches for the next item with the highest Warmth Score (e.g., Olive green knit sweater) and updates the suggestion.

---

### UC-02: Adding a New Item with "Scan with AI"

**Actors:** User, Image Recognition Service (AI).
**Goal:** Quick entry without typing.

**Description (Basic Flow):**
1.  The user navigates to the "Wardrobe" tab and presses **"+ Add Item"**.
2.  In the modal that opens, the user selects a photo from the device or takes a picture of the garment.
3.  The user presses the **"Scan with AI"** button.
4.  The system analyzes the image and automatically fills in:
    * **Category:** Top
    * **Fabric:** Silk
    * **Color:** Red
5.  The system calculates and automatically sets the bars (Sliders):
    * **Formal:** 8/10 (due to silk).
    * **Warmth:** 3/10 (due to thin fabric).
6.  The user confirms the details and presses **"Save to Wardrobe"**.

---

### UC-03: Managing Inactive Items & Donation (Eco-Impact)

**Actors:** User, Database (Tracking System).
**Logic:** The system tracks the `last_worn_date`.

**Description (Basic Flow):**
1.  The user selects the **"Your Impact"** section from the menu.
2.  The system executes a database query and filters clothes that haven't been used for over X months (Inactive Items).
3.  A list of suggestions appears, e.g., *"Beige trench coat - Last worn 2 years ago"*.
4.  The user realizes they don't need it and selects it.
5.  The user presses the **"Find Donation Center"** button.
6.  The system (via external map/list) shows the nearest clothing donation points.

---

### UC-04: Smart Shop Recommendations

**Actors:** User, Recommendation Engine.
**Goal:** Suggest complementary items rather than random ads.

**Description (Basic Flow):**
1.  The user navigates to the **"Shop"** tab.
2.  The system analyzes the user's **"Favorites"** (what style they like) and **gaps** in their wardrobe (e.g., they have many trousers but few winter coats).
3.  The algorithm suggests specific items for purchase (e.g., "Black Wool Peacoat") that match their existing clothes stylistically.
4.  The user views the product card with AI Ratings (Warmth, Formal, etc.) to decide if it suits them.
