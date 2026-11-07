# Foodie App - Figma Design Specifications (9 Frames)

This document provides a text specification for the 9 mobile screen frames required for the Foodie Capstone mobile application.

- **Design Canvas Device Target**: iPhone 15 / 16 (393 × 852 px) or Android standard (360 × 800 px)
- **Primary Color Palette**:
  - Primary Red / Accent: `#E63946`
  - Secondary Slate Blue: `#457B9D`
  - Emerald Green: `#2A9D8F`
  - Dark Charcoal (Text/Dark Mode): `#121212` / `#1E1E1E`
  - Light Background: `#F6F6F6`
  - White (Cards): `#FFFFFF`
  - Danger / Error Red: `#D62828`
  - Subtext Grey: `#777777`

---

## Frame 1: Login Screen (`Frame_01_Login`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Status Bar**: 44 px height (time, wifi, battery indicator).
  - **Hero Branding Section** (Centered, Y: 120 px):
    - Circular Logo: 72 × 72 px, Background `#E63946`, White cutlery/restaurant icon (38 px).
    - App Title: "Foodie" (28 pt bold, sans-serif, `#222222`).
    - Tagline: "Welcome back! Log in to access your culinary world" (14 pt regular, `#777777`).
  - **Form Card** (Y: 280 px, Margins: 20 px left/right, Padding: 20 px, Background: `#FFFFFF`, Radius: 16 px, Elevation: 3):
    - Title: "Login" (22 pt bold, `#222222`).
    - Error Message Banner (Conditional): Red border `#D62828`, light red fill `#FFEAEA`, alert icon + error text (13 pt bold).
    - Email Field: Label "Email Address" (14 pt semibold), Input Box (height 48 px, 1 px border `#CCCCCC`, radius 8 px, placeholder "name@example.com").
    - Password Field: Label "Password" (14 pt semibold), Input Box with eye toggle icon button on the right.
    - Submit Button: Height 50 px, Background `#E63946`, Radius 8 px, Text "Login" (16 pt bold, white).
    - Switch Link: "Don't have an account? **Sign Up**" (14 pt regular, `#777777`, accent `#E63946`).

---

## Frame 2: Registration / Signup Screen (`Frame_02_Signup`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Navigation Bar**: Back chevron + Title "Create Account".
  - **Hero Header**: Small Foodie circular emblem + header "Join Foodie".
  - **Signup Form Card** (Margins: 20 px, Background: `#FFFFFF`, Radius: 16 px):
    - Title: "Sign Up" (22 pt bold).
    - Validation Error Box: Visible red error container for invalid email, short password (<6 chars), or existing account.
    - Username Field: Label "Username", Placeholder "e.g. chef_emmanuel".
    - Email Field: Label "Email Address", Placeholder "name@example.com".
    - Password Field: Label "Password", Placeholder "At least 6 characters" + Eye toggle icon.
    - Submit Button: Full-width button, Background `#E63946`, Text "Sign Up" (16 pt bold, white).
    - Switch Link: "Already have an account? **Login**" (Centered at bottom).

---

## Frame 3: Home Feed Screen (`Frame_03_Home`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **App Header** (Height: 56 px):
    - Left: Mini Red Logo icon (30 × 30 px) + Title "Foodie" (22 pt bold).
    - Right Icons: Heart outline/filled icon (Favorites link) + Settings gear icon (`settings-outline`).
  - **Horizontal Category Bar** (Height: 56 px, Scrollable):
    - Chips: `[All]`, `[Explore]`, `[Breakfast]`, `[Lunch]`, `[Dinner]`, `[Dessert]`, `[Salad]`, `[Soup]`, `[Pasta]`, `[Seafood]`, `[Vegetarian]`, `[Snacks]`, `[Drinks]`, `[My Food]`.
    - Active Chip Style: Pill shape, Background `#E63946`, White bold text.
    - Inactive Chip Style: Pill shape, Background `#EEEEEE`, Dark grey text.
  - **Recipe Feed (Vertical FlatList)**:
    - Recipe Card (Height: 250 px, Margin Bottom: 16 px, Radius: 12 px, Shadow Elevation: 3):
      - Hero Food Image (Height: 180 px, cover fill).
      - Card Footer: Recipe name (18 pt semibold), Category pill, Red Heart toggle icon button, and blue Chevron forward button (`chevron-forward-circle`).

---

## Frame 4: Recipe Detail Screen (`Frame_04_Detail`)
- **Dimensions**: 393 × 852 px (Scrollable)
- **Layout & Structure**:
  - **Navigation Bar**: Back arrow + Title "Recipe Details".
  - **Cover Image**: Full-width header image (Height: 260 px).
  - **Body Content** (Padding: 18 px, Background: `#FFFFFF`):
    - Header Row: Recipe Name (24 pt bold), Category badge, Large Heart toggle icon (`#E63946`).
    - **Meta Info Grid** (2 × 2 card box, background `#F6F6F6`, radius 12 px):
      - Prep Time (e.g., "20 min") | Servings (e.g., "4")
      - Calories (e.g., "350 kcal") | Difficulty (e.g., "Easy")
    - **Ingredients Section**: Section title (20 pt bold), Bulleted rows with green checkmark circles (`#2A9D8F`) and ingredient measurement texts.
    - **Instructions Section**: Section title (20 pt bold), Numbered red step badges (`#E63946`) with step-by-step cooking descriptions.
    - **Action Row** (For user's own recipes): "Edit Recipe" (Blue button `#457B9D`) + "Delete" (Red button `#D62828`).

---

## Frame 5: Favorites & Saved Recipes Screen (`Frame_05_Favorites`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Navigation Bar**: Back arrow + Title "My Favorites".
  - **Favorites Count / Subheader**: "Saved Recipes (X items)".
  - **List Container**:
    - Cards of all favorited dishes with solid red hearts.
    - Tapping card opens Recipe Detail.
    - Tapping red heart immediately unfavorites and refreshes list.
  - **Empty State** (When 0 favorites):
    - Large muted broken heart icon (56 px, `#BBBBBB`).
    - Heading: "No Favorites Yet".
    - Subtitle: "Tap the heart icon on any recipe to add it to your personal favorites list."

---

## Frame 6: API Integration & Explore Screen (`Frame_06_Explore_API`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Top Category Bar**: Active chip on "Explore" (Cloud icon + "Explore").
  - **API Status Header**:
    - Title: "Explore Recipes".
    - Subtitle: "Live dishes fetched from TheMealDB API".
    - Action Button: "Sync API" (Blue button `#457B9D`, refresh icon).
  - **States**:
    - *Loading State*: Centered circular spinner (`#E63946`) with "Fetching delicious recipes from TheMealDB...".
    - *Error / Offline State*: Cloud offline icon, error explanation, and "Retry Fetch" button.
    - *Success Feed*: Cards displaying TheMealDB dishes with an "Online" cyan badge (`#2A9D8F`) and real-time ingredients parsed from the external REST endpoint.

---

## Frame 7: Settings Menu Screen (`Frame_07_Settings_Menu`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Navigation Bar**: Back arrow + Title "Settings Menu".
  - **User Profile Header Card**:
    - Circular user avatar with username initial.
    - Logged-in Username (18 pt bold) and Email (13 pt grey).
  - **Menu List Card** (White card, rounded 14 px):
    - Item 1: **Profile & Preferences** (Person icon, subtitle "Manage account, dark mode & app info", trailing chevron).
    - Item 2: **Notification Center** (Bell icon, subtitle "Reminders, daily cooking alerts & test triggers", trailing chevron).
    - Item 3: **Stored Data Inspector** (Database/server icon, subtitle "Inspect raw JSON persisted in AsyncStorage", trailing chevron).
  - **Logout Button**:
    - Full-width card with red border, Logout icon, and red text "Log Out" (Clears session and routes back to Login).

---

## Frame 8: Settings & Preferences Screen (`Frame_08_Settings_Detail`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Navigation Bar**: Back arrow + Title "Profile & Settings".
  - **Section 1: User Account**:
    - Read-only card with Username field and Email field.
  - **Section 2: Preferences**:
    - Row 1: **Dark Mode** toggle switch (Persisted across sessions in AsyncStorage).
    - Row 2: **Cooking Reminders** toggle switch.
  - **Section 3: About Foodie**:
    - Version info: "v2.0.0 (Capstone Edition)".
    - Build Platform: "Expo & React Native".

---

## Frame 9: Notification Center Screen (`Frame_09_Notifications`)
- **Dimensions**: 393 × 852 px
- **Layout & Structure**:
  - **Navigation Bar**: Back arrow + Title "Notifications".
  - **In-App Toast Banner** (Conditional): Green banner (`#2A9D8F`) showing scheduled confirmation or test notification alert.
  - **Main Master Switch**: "Enable Notifications" toggle switch.
  - **Reminder Interval Selector**:
    - Horizontal pill buttons: `[1 min]`, `[5 min]`, `[15 min]`, `[1 Hour]`.
    - Active interval highlighted in `#E63946`.
  - **Trigger Test Action Card**:
    - Explanatory copy: "Trigger an immediate 2-second countdown notification to verify system notification handler."
    - Red Action Button: Paper plane icon + "Send Test Notification (2s)".
  - **Platform Notice Box**:
    - Informational card explaining local notifications with graceful web/Snack toast fallback.
