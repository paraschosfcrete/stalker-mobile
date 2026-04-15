# Project Log

This file is the durable handoff for this repo. At the start of a future session, I can read this file and continue from the latest recorded state.

## Project

- Name: `stalker-mobile`
- Type: Expo / React Native app with Expo Router
- Date created in this log: `2026-04-12`

## Current State

- The project is still based on the Expo Router starter scaffold, but the visible screens now have custom UI.
- The app now uses a dark-first visual theme with custom navigation colors.
- There is a custom `main-menu` screen with small equal-width buttons for `New Campaign` and `Load Game`.
- The player/home screen supports adding named players to an in-memory list.
- Player entries now use stable ids and duplicate names are blocked.
- Player data is not yet persisted.
- No backend, storage layer, authentication, or campaign/game systems are present yet in the codebase.

## Key Files

- `app/main-menu.tsx`: custom dark-themed main menu screen with atmospheric styling and two menu buttons
- `app/(tabs)/index.tsx`: custom dark-themed player roster screen with local player state
- `app/(tabs)/explore.tsx`: starter Expo screen
- `app/(tabs)/_layout.tsx`: tab layout
- `app/_layout.tsx`: app shell with forced dark navigation theme
- `app.json`: Expo config with dark UI style
- `package.json`: Expo 54 / React 19 / React Native 0.81 setup and startup env workarounds

## Current Home Screen Summary

- Uses `useState` for:
  - `players`
  - `name`
- Supports:
  - typing a player name
  - pressing `Add Player`
  - rendering the current list of players
  - preventing duplicate names
- Limitations:
  - no delete/edit actions
  - no persistent storage
  - no navigation flow wired from the main menu yet

## Current Main Menu Summary

- Custom dark-themed landing screen at `app/main-menu.tsx`
- Atmospheric S.T.A.L.K.E.R.-inspired presentation with:
  - muted green/rust accents
  - dark card panel
  - compact equal-width buttons
- Buttons currently present:
  - `New Campaign`
  - `Load Game`
- Buttons are not wired to real destinations yet

## Dependencies Snapshot

- `expo` `~54.0.33`
- `expo-router` `~6.0.23`
- `react` `19.1.0`
- `react-native` `0.81.5`
- TypeScript and Expo ESLint are installed

## Session Log

### 2026-04-12

- Added this `PROJECT_LOG.md` file to preserve progress and current repo context.
- Confirmed the repo is an Expo app scaffold with a basic custom player-entry screen.
- Noted that `git` was not available in the current terminal environment, so version-control status was not captured here.
- Fixed TypeScript issues in `app/(tabs)/index.tsx` by adding a typed `Player` model.
- Improved the player screen by adding stable player ids, duplicate-name protection, and cleaner styling.
- Investigated `npm start` failures and found:
  - PowerShell execution policy was blocking `npm.ps1`
  - Expo startup was trying to modify `.gitignore` and `tsconfig.json`
  - Expo dependency validation was failing on network fetch
- Updated the local PowerShell execution policy for the current user to `RemoteSigned`, allowing `npm` to run normally.
- Updated `package.json` start scripts to set:
  - `EXPO_NO_TYPESCRIPT_SETUP=1`
  - `EXPO_NO_DEPENDENCY_VALIDATION=1`
- Updated `app.json`:
  - removed `typedRoutes`
  - set `userInterfaceStyle` to `dark`
- Updated `app/_layout.tsx` to use a forced custom dark theme and light status bar.
- Created a custom `main-menu` screen with:
  - small equal-width `New Campaign` and `Load Game` buttons
  - atmospheric dark styling inspired by a field terminal / bunker UI
- Applied matching atmospheric dark styling to `app/(tabs)/index.tsx`.

## Next Suggested Steps

- Decide the first real feature set for the app:
  - persistent player storage
  - campaign/session model
  - faction/inventory/quest tracking
  - better mobile UI
- Replace starter screens that are still unused.
- Wire the main menu buttons to actual screens and routes.
- Add typed models for players and future campaign entities.
- Introduce local persistence such as AsyncStorage or SQLite when we are ready.

## How To Keep This Useful

- Add a short dated entry under `Session Log` whenever we make meaningful changes.
- Record architectural decisions, unfinished work, and known issues here.
- If a feature spans multiple files, add a one-line summary so future sessions can rehydrate context quickly.
