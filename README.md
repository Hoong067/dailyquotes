# Daily Quotes & Motivation App

A beautiful dark-theme mobile app for daily motivational quotes.  
Built with **React Native + Expo** — publish to Google Play Store.

---

## Project Structure

```
src/
├── constants/
│   ├── colors.js          # All color tokens (dark theme)
│   └── admob.js           # AdMob unit IDs (replace with real ones)
├── data/
│   └── quotes.js          # Free + premium quotes (30 free, 20 premium)
├── hooks/
│   └── useStorage.js      # useFavorites() + usePremium() hooks
├── utils/
│   └── shareQuote.js      # Native share + clipboard copy
├── navigation/
│   └── AppNavigator.js    # Bottom tabs + Stack navigator
├── components/
│   ├── QuoteCard.js        # Gradient quote card with actions
│   └── BannerAd.js        # AdMob banner placeholder
└── screens/
    ├── HomeScreen.js       # Swipeable daily feed + stats
    ├── FavoritesScreen.js  # Saved quotes list
    ├── CategoriesScreen.js # Browse by category with chips
    ├── PremiumScreen.js    # Paywall with plan selector
    └── QuoteDetailScreen.js# Modal quote detail sheet
```

---

## Running the App

```bash
# Install dependencies (already done)
npm install

# Run on Android (requires Android Studio or physical device)
npm run android

# Run on iOS (macOS only)
npm run ios

# Or scan QR code with Expo Go
npx expo start
```

---

## Monetization Setup

### 1. Banner Ads (Google AdMob)

1. Create an app at https://admob.google.com
2. Create a Banner Ad Unit
3. Replace the test IDs in `src/constants/admob.js`:
   ```js
   export const ADMOB_APP_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX';
   export const AD_UNIT_IDS = {
     banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
   };
   export const USE_TEST_ADS = false; // set false in production
   ```
4. Update the AdMob plugin config in `app.json` with your real app ID
5. Build with EAS (see below) — AdMob requires native code and won't work with Expo Go

**Uncomment the production code** in `src/components/BannerAd.js` after building with EAS.

### 2. Premium Quote Packs (In-App Purchases)

1. Set up your app on [Google Play Console](https://play.google.com/console)
2. Create in-app products:
   - `premium_monthly` — $1.99/month
   - `premium_yearly` — $9.99/year
   - `premium_lifetime` — $19.99 one-time
3. Install the IAP library:
   ```bash
   npx expo install expo-in-app-purchases
   ```
4. In `src/screens/PremiumScreen.js`, replace the `handlePurchase` simulation with:
   ```js
   import * as InAppPurchases from 'expo-in-app-purchases';
   // ... purchase flow using InAppPurchases.purchaseItemAsync(productId)
   ```
5. After a verified purchase, call `unlockPremium()` from `usePremium()` hook

---

## Publishing to Google Play Store

### Step 1 — Set up EAS Build

```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Step 2 — Update app.json

- Change `android.package` to your unique package name (e.g. `com.yourname.dailyquotes`)
- Replace `extra.eas.projectId` with your real EAS project ID

### Step 3 — Build the APK / AAB

```bash
# Build Android App Bundle (required for Play Store)
eas build --platform android --profile production
```

### Step 4 — Download & Upload

1. Download the `.aab` file from the EAS dashboard
2. Upload to Google Play Console → Production → Create new release
3. Fill in store listing (title, description, screenshots)
4. Review and publish!

---

## App Store Listing Copy

**Title:** Daily Quotes — Motivation

**Short Description:**
Start every day inspired. 50+ handpicked motivational quotes. Save, share & go premium.

**Full Description:**
Daily Quotes brings you the best motivational quotes from the world's greatest minds — every single day.

✨ Features:
- Swipeable daily quote feed
- 30 free quotes across 7 categories
- Favorite & save quotes for offline access
- Share to WhatsApp, Instagram, and more
- Copy quote text with one tap
- Beautiful dark theme

👑 Premium includes:
- 20+ exclusive premium quotes
- Ad-free experience
- All quote categories unlocked
- Future quote packs included

---

## Recommended Next Features

- [ ] Daily push notifications (expo-notifications)
- [ ] Quote-as-image export (react-native-view-shot)
- [ ] Widget support (expo-widgets)
- [ ] More quote categories (Bible, Stoic, Sports)
- [ ] Random quote of the hour
- [ ] Dark/Light theme toggle
