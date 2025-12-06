# Outfit Buddy 👔

Outfit Buddy is an AI-powered smart wardrobe assistant hosted on **Azure Static Web Apps**. It helps users dress smarter by analyzing their Outlook calendar and local weather.

## 🚀 Live Demo
Access the live application here: **[https://white-grass-0a295f903.3.azurestaticapps.net](https://white-grass-0a295f903.3.azurestaticapps.net)**

## 🛠 Tech Stack
*   **Framework:** Next.js (React)
*   **Hosting:** Azure Static Web Apps
*   **Backend/DB:** Firebase (Firestore & Auth)
*   **Styling:** Tailwind CSS

## ⚙️ Setup & Permissions

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/iosifidis/outfit-buddy.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file with the required API keys (Firebase Config).
4.  Run the development server:
    ```bash
    npm run dev
    ```

### Test Script (Happy Path)
1.  Log in using the "Sign In Anonymously" button.
2.  Navigate to the **Dashboard**. Observe the Weather and Outlook Calendar integration.
3.  Check the **AI Stylist** suggestion card. It suggests items based on the "Rainy" weather.
4.  Go to **Your Impact** (bottom left) to see donation recommendations for unused items.

![Screen](https://github.com/iosifidis/outfit-buddy/blob/main/outfit-buddy.png)

## Developers

1. [Efstathios Iosifidis](https://www.linkedin.com/in/eiosifidis/) ([Github](https://github.com/iosifidis/))
2. Efrosini Nalbanti
3. Dimitris Topalidis
4. Christos Kopsahilis
5. Evagelia Tsioumani
