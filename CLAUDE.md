# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pomogato is a cat-themed Pomodoro timer designed for ADHD users. It is built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4. The UI is in Brazilian Portuguese.

## Commands

```bash
npm run dev          # Start Next.js dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint via Next.js
npm run storybook    # Storybook dev server at localhost:6006
npm run build-storybook  # Build static Storybook
npx vitest           # Run Storybook component tests (headless Chromium via Playwright)
```

## Architecture

Everything lives in `src/`:

- `app/page.tsx` — root page, renders only `<Timer />`
- `app/globals.css` — Tailwind v4 theme tokens and custom keyframe animations
- `components/Timer.tsx` — the main stateful component; owns all timer logic (countdown, mode switching, session tracking, sound). Composes all other components.
- `components/CatAvatar.tsx` — purely presentational; receives `mood` and `isRunning` props, renders ASCII art cat with animated states
- `components/TaskInput.tsx` — controlled input for the current focus task
- `components/AdhdTips.tsx` — static list of ADHD study tips rendered as `<details>` accordions

## Styling

Tailwind CSS v4 is configured via `@theme` in `globals.css` — custom colors (`peach`, `sage`, `lavender`, `coral`, `charcoal`, `soft-gray`) and animations (`animate-float`, `animate-purr`, `animate-fade-in`) are defined there, not in a `tailwind.config` file.

## Testing

Tests are Storybook stories run through `@storybook/addon-vitest` + Playwright (Chromium). Stories live alongside components as `*.stories.tsx`. Add new component stories in `src/components/`.

## Timer logic

- Three modes: `focus` (25 min), `shortBreak` (5 min), `longBreak` (15 min)
- After every 4 focus sessions a long break is triggered; otherwise a short break
- Session paw icons track progress within the current cycle of 4 (`sessionsCompleted % 4`)
- End-of-session sound uses the Web Audio API (no external audio files)
- Cat mood derives from `isRunning` + `mode`; message rotation is time-based (`Date.now() / 10000`)
