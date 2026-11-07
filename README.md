# Foodie - React Native & Expo Mobile Application

Foodie is an end-to-end recipe and culinary companion mobile application built with **React Native**, **Expo SDK**, **React Navigation**, and **AsyncStorage**. Designed for both standalone native execution (iOS, Android) and cloud-based reviewer inspection on **Snack Expo**.

---

## Key Features

1. **User Authentication & Session Management**:
   - Registration screen with validation (required fields, email format, minimum 6 characters for passwords, duplicate email detection).
   - Login screen with error alerts for incorrect credentials.
   - Persistent session storage in `AsyncStorage` so users stay logged in across app restarts.
   - Secure Logout action available in the Settings menu.

2. **Categorized Recipe Feed & Branding**:
   - Header with custom Foodie restaurant emblem and brand title.
   - Interactive horizontal category scrollbar featuring 11+ categories: **All**, **Explore (API)**, **Breakfast**, **Lunch**, **Dinner**, **Dessert**, **Salad**, **Soup**, **Pasta**, **Seafood**, **Vegetarian**, **Snacks**, **Drinks**, and **My Food**.
   - Recipe cards with food imagery, recipe title, category tag, heart bookmarking toggle, and a visible chevron navigation button.

3. **Complete Recipe Details**:
   - High-resolution hero image.
   - Key metadata grid: Prep Time, Servings, Calories, Difficulty.
   - Formatted ingredients checklist with checkmark indicators.
   - Step-by-step instructions with numbered circular badges.

4. **Personal Recipe Management ("My Food")**:
   - Create custom recipes with device photo upload (`expo-image-picker`), name, time, servings, calories, ingredients, and instructions.
   - Edit existing recipes with pre-filled inputs.
   - Delete recipes immediately from both local state and persistent storage.

5. **Favorites & Bookmarks**:
   - Quick heart icon toggle on recipe cards and detail pages.
   - Dedicated Favorites screen accessible via the header heart icon.

6. **Third-Party API Integration (TheMealDB)**:
   - Fetches live culinary recipes dynamically from TheMealDB REST API (`search.php?s=chicken`).
   - Real-time loading indicator and offline/error recovery with retry actions.
   - Automatic local caching in `AsyncStorage` for seamless offline access.

7. **Settings Menu & Customization**:
   - Gear icon in the Home header opening a modular Settings Menu (`Profile`, `Notifications`, `Stored Data`, `Logout`).
   - Persisted **Dark Mode** toggle switch and user profile display.
   - Application version and platform metadata.

8. **Local Cooking Notifications**:
   - Powered by `expo-notifications` local notification handlers.
   - Toggle to enable/disable cooking reminders.
   - Configurable reminder interval selector.
   - "Send Test Notification" button with an immediate 2-second countdown.
   - Graceful fallback with in-app banner alerts on web/Snack environments.

9. **AsyncStorage Data Inspector ("Stored Data")**:
   - Dedicated screen displaying raw formatted JSON dumps for all stored keys: `foodie_session`, `foodie_users`, `foodie_favorites`, `foodie_my_recipes`, `foodie_settings`, and `foodie_cached_api_recipes`.
   - Built specifically for grading, screenshot verification, and rubric demonstration.

---

## Rubric Item Mapping Table

| Rubric Requirement | File Path | Description |
| :--- | :--- | :--- |
| **Auth: Signup Screen** | [`screens/SignupScreen.js`](file:///screens/SignupScreen.js) | Username, email, password fields, validation (empty, regex email, <6 chars, duplicate), error message banner. |
| **Auth: Login Screen** | [`screens/LoginScreen.js`](file:///screens/LoginScreen.js) | Email and password login, error banner for invalid credentials, navigation link to sign up. |
| **Auth: Storage Service** | [`services/authStorage.js`](file:///services/authStorage.js) | Handles user registration, password verification, active session persistence, and logout. |
| **Home: Branding & Chevron** | [`screens/HomeScreen.js`](file:///screens/HomeScreen.js)<br>[`components/RecipeCard.js`](file:///components/RecipeCard.js) | Custom Foodie restaurant logo in header, horizontal categories, and visible chevron/arrow icon on cards. |
| **Recipe Detail View** | [`screens/RecipeDetailScreen.js`](file:///screens/RecipeDetailScreen.js) | Name, image, ingredients list, instructions list, prep time, servings, calories, difficulty, edit/delete actions. |
| **Local Storage Service** | [`services/storage.js`](file:///services/storage.js) | Centralized AsyncStorage helper for users, session, favorites, custom recipes, settings, and API cache. |
| **Stored Data Inspector** | [`screens/StoredDataScreen.js`](file:///screens/StoredDataScreen.js) | Live formatted JSON viewer of all stored keys for submission screenshots. |
| **API Integration (TheMealDB)** | [`services/api.js`](file:///services/api.js) | Fetches from TheMealDB API, parses meal schema, provides offline caching, and error handling. |
| **Settings Menu** | [`screens/SettingsMenuScreen.js`](file:///screens/SettingsMenuScreen.js) | Header gear navigation target with Profile, Notifications, Stored Data, and Logout. |
| **Settings & Preferences** | [`screens/SettingsScreen.js`](file:///screens/SettingsScreen.js) | Username/email display, persistent dark mode toggle, notification switch, and app version. |
| **Notifications Service & Screen** | [`services/notifications.js`](file:///services/notifications.js)<br>[`screens/NotificationsScreen.js`](file:///screens/NotificationsScreen.js) | `expo-notifications` setup, Android channel, permission handling, interval picker, 2s test trigger, web fallback. |
| **Navigation Stack** | [`App.js`](file:///App.js) | Root native stack navigator with all 10 screens and working back buttons. |
| **User Stories (9 Stories)** | [`USER_STORIES.md`](file:///USER_STORIES.md) | Exactly 9 user stories in `As a <user>, I want <goal> so that <benefit>` format. |
| **Figma Frame Specs (9 Frames)** | [`FIGMA_FRAMES.md`](file:///FIGMA_FRAMES.md) | Detailed layout specifications for the 9 mobile design frames. |

---

## How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

- Press **`w`** in the terminal to run in your web browser.
- Press **`a`** to open in an Android Emulator or scan the QR code with **Expo Go**.
- Press **`i`** to open in the iOS Simulator.

---

## Running on Snack Expo
1. Open [snack.expo.dev](https://snack.expo.dev).
2. Select **Import git repository** from the menu.
3. Paste your public GitHub repository URL (`https://github.com/Chuzzy99/foodie`).
4. Snack will automatically mount `App.js` and `package.json` from the repository root.
