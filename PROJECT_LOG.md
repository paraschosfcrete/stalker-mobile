# Project Log

This file is the durable handoff for this repo. At the start of a future session, read this file first to recover the latest known project state.

## Project

- Name: `stalker-mobile`
- Type: Expo / React Native app with Expo Router
- Log created: `2026-04-12`
- Last reviewed: `2026-04-16`

## Current State

- The app is still partly based on the Expo Router starter scaffold, but the primary visual direction is now a custom dark S.T.A.L.K.E.R.-inspired interface.
- `app/main-menu.tsx` is the current entry experience and now pushes to real stack routes for `new-campaign` and `load-game`.
- `app/new-campaign.tsx` and `app/load-game.tsx` exist, but both are placeholder screens with only heading text.
- `app/(tabs)/index.tsx` contains a custom in-memory player roster screen where users can add uniquely named players.
- `app/(tabs)/explore.tsx`, `app/modal.tsx`, many shared components, and `README.md` are still largely starter/template content.
- There is still no persistence, backend, authentication, campaign model, save/load implementation, or real game flow.

## Navigation Summary

- Root stack is defined in `app/_layout.tsx`.
- Registered stack screens:
  - `main-menu`
  - `new-campaign`
  - `load-game`
  - `modal`
- `unstable_settings.anchor` is set to `Main Menu`.
- The old tab routes still exist under `app/(tabs)`, but they are not yet integrated into a finished user flow from the new menu screens.

## Screen Summary

- `app/main-menu.tsx`
  - Custom landing screen with atmospheric styling, haze/grid effects, and two compact action buttons.
  - Buttons now navigate with `useRouter()` instead of being inert placeholders.
- `app/new-campaign.tsx`
  - Placeholder screen using `SafeAreaView`.
  - No form, state, or campaign creation logic yet.
- `app/load-game.tsx`
  - Placeholder screen with only a title.
  - No storage lookup or saved-game list yet.
- `app/(tabs)/index.tsx`
  - Custom player roster screen using local `useState`.
  - Supports entering a player name, preventing duplicates, and rendering a simple list.
  - Player ids are generated locally from timestamp-plus-name.
  - Data is reset on reload because nothing is persisted.
- `app/(tabs)/explore.tsx`
  - Still the Expo starter example screen.
- `app/modal.tsx`
  - Still the Expo starter modal screen.

## Key Files

- `app/_layout.tsx`: root stack and custom dark navigation theme
- `app/main-menu.tsx`: current main entry screen and menu navigation
- `app/new-campaign.tsx`: placeholder route for future campaign creation
- `app/load-game.tsx`: placeholder route for future save loading
- `app/(tabs)/index.tsx`: local player roster prototype
- `app/(tabs)/_layout.tsx`: leftover tab layout from the starter structure
- `app.json`: Expo config, dark UI preference, splash config, and React Compiler experiment
- `package.json`: Expo 54 / React 19 setup with Windows-friendly start scripts that disable Expo TypeScript setup and dependency validation

## Dependencies Snapshot

- `expo` `~54.0.33`
- `expo-router` `~6.0.23`
- `react` `19.1.0`
- `react-native` `0.81.5`
- `react-native-safe-area-context` `~5.6.0`
- TypeScript and Expo ESLint are installed

## Working Tree Notes

- As of `2026-04-16`, local uncommitted changes were present in:
  - `app/_layout.tsx`
  - `app/main-menu.tsx`
  - `app/new-campaign.tsx`
  - `app/load-game.tsx`
- Those changes add the new stack routes and wire the main menu buttons to the placeholder destination screens.

## Known Gaps

- No persistent storage for players, campaigns, or saves
- No typed domain models beyond the local `Player` type
- No delete/edit actions on the roster screen
- No load-game functionality beyond a placeholder route
- No new-campaign flow beyond a placeholder route
- Starter scaffold code is still mixed with custom app code
- `README.md` has not been updated to describe the current project

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

### 2026-04-16

- Reviewed the whole repo to refresh this log against the actual current codebase.
- Confirmed that the main menu is now wired to real stack routes using `expo-router`.
- Confirmed that `app/new-campaign.tsx` and `app/load-game.tsx` were added as placeholder destination screens.
- Updated the log to distinguish custom screens from remaining Expo starter/template files.
- Recorded the current working-tree state and the main unfinished product gaps.

## Next Suggested Steps

- Turn `new-campaign` into the first real feature flow instead of a placeholder title screen.
- Decide whether the player roster should live inside the new-campaign flow, a campaign object, or a separate management screen.
- Add local persistence with AsyncStorage or SQLite before building save/load UI.
- Replace or remove the remaining starter screens and components that are no longer part of the intended app architecture.
- Update `README.md` once the route structure and first feature set are stable.

## How To Keep This Useful

- Add a short dated entry under `Session Log` whenever meaningful changes are made.
- Record architectural decisions, unfinished work, and known issues here.
- If a feature spans multiple files, add a one-line summary so future sessions can rebuild context quickly.
