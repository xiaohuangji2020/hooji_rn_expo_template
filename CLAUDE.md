# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native project using file-based routing (expo-router) with TypeScript. The project is configured for local native builds rather than cloud builds, with special optimizations for development in China (Aliyun mirrors).

**Key Technologies:**

- Expo SDK ~54.0
- React Native 0.81.5
- React 19.1.0
- Expo Router (file-based routing)
- React Navigation (Drawer navigation)
- TypeScript with strict mode
- New Architecture enabled (`newArchEnabled: true`)
- React Compiler enabled (experimental)

**Special Features:**

- Gaode Map integration (expo-gaode-map-navigation)
- Camera functionality (expo-camera)
- Custom Android mirror configuration for faster builds in China

## Development Commands

### Start Development Server

```bash
npm start
# or
npx expo start
```

### Run on Platforms

```bash
# Android (requires Android Studio and emulator/device)
npm run android
# or
npx expo run:android

# iOS (requires Xcode, Mac only)
npm run ios
# or
npx expo run:ios

# Web
npm run web
```

### Code Quality

```bash
# Run linter
npm run lint

# Format code (Prettier with 160 char line width)
npx prettier --write .
```

### Native Directory Management

```bash
# Generate/regenerate native directories (android/ and ios/)
npx expo prebuild

# Clean and regenerate
npm run clean
# or
npx expo prebuild --clean
```

**Important:** Run `npx expo prebuild` after adding new native plugins or modifying `app.json` plugins.

### Production Builds (Local)

```bash
# Android APK
eas build --platform android --local --profile production

# iOS IPA
eas build --platform ios --local --profile production
```

## Architecture

### File-Based Routing

The project uses Expo Router with file-based routing. Routes are defined by the file structure in the `app/` directory:

- `app/_layout.tsx` - Root layout with Drawer navigation
- `app/index.tsx` - Home screen
- `app/(scan)/scan.tsx` - Scan screen (route group)
- `app/+not-found.tsx` - 404 screen

Route groups use parentheses `(groupName)` to organize routes without affecting the URL structure.

### Project Structure

```
app/                    # File-based routes (Expo Router)
components/             # Reusable components
  ├── buttons/         # Button components
  ├── camera/          # Camera-related components
  ├── images/          # Image components
  ├── map/             # Map components
  └── menu/            # Menu components (DrawerMenu)
constants/             # Constants and shared values
  ├── css/            # Typography and styling constants
  └── menu/           # Menu configuration
assets/                # Static assets (images, fonts)
scripts/               # Build scripts
  └── with-android-mirrors.js  # Aliyun mirror config plugin
```

### Path Aliases

The project uses `@/*` as an alias for the root directory:

```typescript
import { DrawerMenu } from "@/components/menu/DrawerMenu";
import { Typography } from "@/constants/css/Typography";
```

### Navigation Structure

- **Root Layout**: Drawer navigation configured in `app/_layout.tsx`
- **Custom Drawer**: `DrawerMenu` component provides the drawer content
- **Theme**: Custom theme with white background, centered header titles
- **Header**: Notification icon in header right position

### Android Mirror Configuration

The project includes a custom Expo config plugin (`scripts/with-android-mirrors.js`) that automatically injects Aliyun Maven mirrors into `android/build.gradle` for faster dependency downloads in China. This runs automatically during `expo prebuild`.

## Code Conventions

### Component Exports

Use named exports instead of default exports:

```typescript
// ✅ Correct
export function Home() {}

// ❌ Avoid
export default function Home() {}
```

### File Naming

1. **Lowercase (kebab-case/camelCase)**: Functional files
   - `api.ts`, `utils.ts`, `useAuth.ts`
2. **PascalCase**: React components
   - `MyButton.tsx`, `HomeView.tsx`
3. **Route files**: Must be lowercase
   - `app/index.tsx`, `app/(scan)/scan.tsx`
4. **Index files**: Use `index.tsx` as re-export hubs

### Component Organization

- **Public components**: `components/` - Shared across the app
- **Page components**: Within `app/` directory - Screen-specific views
- Any file exporting JSX should use PascalCase naming

## Environment Setup Notes

### Required Tools

- Node.js 20+ (LTS)
- JDK 17 (for Android)
- Android Studio with SDK Platform 34+
- Xcode (Mac only, for iOS)
- CocoaPods (Mac only, for iOS)
- EAS CLI: `npm install -g eas-cli`
- Watchman (Mac only, recommended)

### Android Emulator Quick Start

```bash
# List available emulators
emulator -list-avds

# Start emulator directly
emulator -avd <emulator_name>
```

### Git Workflow

The `android/` and `ios/` directories should be in `.gitignore`. Each developer generates their own native directories using `npx expo prebuild` to avoid merge conflicts.

## Configuration Files

- **app.json**: Expo configuration, plugins, and native settings
- **package.json**: Dependencies and npm scripts
- **tsconfig.json**: TypeScript config with strict mode and path aliases
- **eslint.config.js**: ESLint with Expo and Prettier integration
- **.prettierrc**: Prettier config (160 char line width)

## Special Considerations

1. **New Architecture**: This project has React Native's New Architecture enabled
2. **React Compiler**: Experimental React Compiler is enabled
3. **Typed Routes**: Expo Router typed routes are enabled for type-safe navigation
4. **Gaode Maps**: Configured with API keys in `app.json` (Android and iOS)
5. **Camera Permissions**: Custom permission messages configured in `app.json`
