## LittleBibleStories — React Native Music & Learning App

Cross‑platform React Native application combining audio playback, quizzes, and a simple shop-like experience with drawer navigation, internationalization, and Redux state management.

### Highlights
- **Audio playback**: `react-native-track-player`, `react-native-sound`, transport controls, progress, repeat and favorite UI.
- **Learning/Quiz flows**: Quiz screens, results, and progress with Redux.
- **Navigation**: Drawer + stack navigation via `@react-navigation`.
- **i18n**: `i18next` + `react-i18next` with language resources under `App/Resources/Languages`.
- **Media**: Video playback via `react-native-video` and `react-native-video-player`.
- **Theming & assets**: Centralized colors, fonts, images, and scalable sizing helpers.
- **State**: Redux Toolkit and thunk for async flows.

---

## Tech Stack
- React 18, React Native 0.75
- Navigation: `@react-navigation/native`, `@react-navigation/drawer`, `@react-navigation/native-stack`
- State: `@reduxjs/toolkit`, `react-redux`, `redux-thunk`
- Audio/Media: `react-native-track-player`, `react-native-sound`, `react-native-video`
- UI/UX: `react-native-gesture-handler`, `react-native-reanimated`, `react-native-linear-gradient`, `react-native-progress`
- Utilities: `axios`, `moment`, `i18next`

---

## Project Structure

```
App/
  Actions/           # Action creators for auth, categories, quiz, settings, soundtrack
  Components/        # Reusable UI components (common + quiz)
  Helpers/           # Dialog, social login hooks, language effect, utilities
  Navigators/        # Drawer/stack navigators and navigation helpers
  Network/           # API base + constants
  Reducer/           # Redux reducers and root reducer
  Resources/         # Colors, fonts, images, strings, responsive helpers
  Screens/           # Feature screens: Auth, Home, SideMenu, Splash
  Store/             # Redux store setup

android/             # Android native project
ios/                 # iOS native project (Pods, workspace, assets)
```

Key entry points:
- `index.js` — app bootstrap
- `App.js` — top-level component
- `App/Navigators/AppNavigator.js` — root navigation
- `App/Store/Store.js` — Redux store

---

## Getting Started

1) Environment
- Follow the official React Native environment setup: `https://reactnative.dev/docs/environment-setup` (React Native CLI, not Expo)
- Node >= 18 (see `package.json#engines`)

2) Install dependencies
```bash
npm install
# or
yarn
```

3) iOS setup
```bash
cd ios && pod install && cd ..
```

4) Start Metro
```bash
npm start
# or
yarn start
```

5) Run the app
```bash
# Android
npm run android

# iOS (simulator)
npm run ios
```

---

## Scripts
- `start` — start Metro bundler
- `android` — build and run on Android emulator/device
- `ios` — build and run on iOS simulator
- `lint` — run ESLint
- `test` — run Jest tests

---

## Configuration
- API configuration lives under `App/Network/Constant.js` and `App/Network/Api.js`. Point base URLs, headers, and endpoints here.
- Internationalization resources are under `App/Resources/Languages`. Use `App/Helpers/UseLanguageEffect.js` to react to language changes.
- Colors, fonts, images, and typography scale are defined in `App/Resources/*` for consistent styling.

---

## iOS Notes
- Open `ios/LittleBibleStories.xcworkspace` in Xcode for native changes.
- After adding/removing native dependencies, run `pod install` again.
- Permissions are declared in `ios/LittleBibleStories/Info.plist` and `PrivacyInfo.xcprivacy` (for media/audio usage).

## Android Notes
- Minimum Gradle/AGP versions are configured in `android/build.gradle` and `android/gradle.properties`.
- App module config is in `android/app/build.gradle`.
- Assets (fonts/images) are linked via `react-native.config.js` and platform asset manifests.

---

## Testing & Linting
```bash
npm test
npm run lint
```

---

## Troubleshooting
- Make sure Android SDKs and iOS command line tools are installed and up to date.
- Clear caches if builds act up:
```bash
watchman watch-del-all || true
rm -rf node_modules && npm install
cd ios && pod deintegrate && pod install && cd ..
rm -rf android/app/build
```
- For more, see the React Native Troubleshooting docs: `https://reactnative.dev/docs/troubleshooting`.

---

## License
This project is private and provided as-is for personal development and learning purposes.
