# Neurolix Site Development Rules

## Build & Test Commands
- Development: `npm run dev`
- Production Build: `npm run build`
- Linting: `npm run lint`

## Tech Stack & Architecture
- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS, `app/globals.css`
- Component Strategy: Clean, modular TypeScript components. Client-side visual components must explicitly use the 'use client' directive.
- Core Values: "Engineers, not marketers". Performance over heavy animations. Target device optimization: Safari on iPhone SE.

## Code Style Guidelines
- Use explicit TypeScript types, avoid `any`.
- Keep components modular and single-responsibility.
- Clean up all event listeners, canvas contexts, and requestAnimationFrame loops on component unmount to prevent memory leaks.@AGENTS.md
