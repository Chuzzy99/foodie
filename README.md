# Foodie - React Native & Expo Mobile Application

Foodie is an end-to-end recipe and culinary companion mobile application built with **React Native**, **Expo SDK**, **React Navigation**, and **AsyncStorage**. Designed for both standalone native execution (iOS, Android) and cloud-based reviewer inspection on **Snack Expo**.

> **Peer Reviewer Notice (Foodie App Submission)**:  
> When opening the app on Snack or Expo Go, sign up with any email (e.g. `test@example.com`) and any password of 6+ characters (e.g. `password123`) to enter the app. Your session will be saved automatically, giving you full access to the recipe feed, 11+ horizontal categories, recipe details, favorites, "My Food" recipe creator (Add/Edit/Delete), and settings.

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
   - Powered by `expo-notifications` local notification handlers with graceful web/Snack fallback.
   - Toggle to enable/disable cooking reminders.
   - Configurable reminder interval selector (`1 min`, `5 min`, `15 min`, `1 Hour`).
   - "Send Test Notification" button with an immediate 2-second countdown.

9. **AsyncStorage Data Inspector ("Stored Data")**:
   - Dedicated screen displaying raw formatted JSON dumps for all stored keys: `foodie_session`, `foodie_users`, `foodie_favorites`, `foodie_my_recipes`, `foodie_settings`, and `foodie_cached_api_recipes`.
   - Built specifically for grading, screenshot verification, and rubric demonstration.

---

## Rubric Item Mapping Table

| Rubric Item | Deliverable / File Link | Evidence Screenshot / Asset | Description |
| :--- | :--- | :--- | :--- |
| **Item 1: Repository** | [`https://github.com/Chuzzy99/foodie`](https://github.com/Chuzzy99/foodie) | Public Git Repository | Public repository with `App.js` and `package.json` at root for Snack Expo. |
| **Item 2: User Stories** | [`USER_STORIES.md`](https://github.com/Chuzzy99/foodie/blob/main/USER_STORIES.md) | None (Markdown) | Exactly 9 user stories in `As a <user>, I want <goal> so that <benefit>` format. |
| **Items 3–4: Figma Specs** | [`FIGMA_FRAMES.md`](https://github.com/Chuzzy99/foodie/blob/main/FIGMA_FRAMES.md) | `figma-evidence1.png`<br>`figma-evidence2.png` | Specs for all 9 mobile frames (Login, Signup, Home, Detail, Favorites, Explore, Menu, Settings, Notifications). |
| **Items 5–7: Signup** | [`screens/SignupScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/SignupScreen.js) | `signup_screen_evidence`<br>`signup_error` | Username, email, password fields, validation (empty, regex, <6 chars, duplicate), red error banner. |
| **Items 8–10: Login** | [`screens/LoginScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/LoginScreen.js) | `login_screen_evidence`<br>`login_error` | Email/password login, wrong credential error alert, link to sign up. |
| **Items 11–12: Home** | [`screens/HomeScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/HomeScreen.js) | `home-screen-evidence` | Header restaurant logo emblem + "Foodie" title, horizontal categories, recipe feed. |
| **Items 13–15: Detail** | [`screens/RecipeDetailScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/RecipeDetailScreen.js)<br>[`components/RecipeCard.js`](https://github.com/Chuzzy99/foodie/blob/main/components/RecipeCard.js) | `evidence-detail-navigation`<br>`evidence-detail-screen` | Visible chevron icon on cards; detail screen with prep time, servings, calories, difficulty, ingredients, instructions. |
| **Items 16–18: Storage** | [`services/storage.js`](https://github.com/Chuzzy99/foodie/blob/main/services/storage.js)<br>[`screens/StoredDataScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/StoredDataScreen.js) | `evidence-persistence`<br>`evidence-integrateScreen-persistence` | AsyncStorage central helper; live raw JSON inspector per key; side-by-side front-end vs. storage evidence. |
| **Items 19–20: API** | [`services/api.js`](https://github.com/Chuzzy99/foodie/blob/main/services/api.js) | `evidence-api-ux` | Live recipes from TheMealDB, category endpoint, loading spinner, error handling, local cache. |
| **Items 21–23: Settings Menu** | [`screens/SettingsMenuScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/SettingsMenuScreen.js) | `evidence-menu-icon`<br>`evidence-menu-items` | Gear icon in Home header; menu screen with Profile, Notifications, Stored Data, Logout. |
| **Items 24–25: Settings Screen** | [`screens/SettingsScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/SettingsScreen.js) | `evidence-settings-screen` | Logged-in username/email, persisted Dark Mode switch, notifications switch, app version. |
| **Items 26–28: Notifications** | [`services/notifications.js`](https://github.com/Chuzzy99/foodie/blob/main/services/notifications.js)<br>[`screens/NotificationsScreen.js`](https://github.com/Chuzzy99/foodie/blob/main/screens/NotificationsScreen.js) | `evidence-notification-configure`<br>`evidence-notification-alert` | `expo-notifications` setup, channel creation, permission handling, interval selector, 2s test alert banner. |

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
3. Paste your public GitHub repository URL: `https://github.com/Chuzzy99/foodie`
4. Snack will automatically mount `App.js` and `package.json` from the repository root.
