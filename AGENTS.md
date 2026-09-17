# AI Agent Instructions

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Stack & Architecture

- **Framework:** Next.js (App Router with no src/ folder.)
- **Language:** TypeScript (Strict mode enabled, prefer `interface` over `type`)
- **Styling:** Tailwind CSS latest version
- **UI:** Tailwindcss , MagicUI , Framer Motion , Remotion
- **Coding style** Use clean code standards , design patterns , clean file structure , next js best practices

## Guardrails & Patterns
- **Server vs. Client:** Default to React Server Components (RSC). Explicitly add the `"use client"` directive at the very top of the file *only* when utilizing state, hooks, or client-side event listeners.
- **Data Fetching:** Prefer server-side data fetching directly inside async server components or Server Actions. Do not use client-side fetching unless specifically asked.
- **Routing:** Use the standard file-based routing mechanism inside the `app/` directory. Ensure `page.tsx` handles views and `layout.tsx` wraps global elements.
- **Error Handling:** Always leverage a local `error.tsx` boundary file for routing exceptions.

# Project Introduction

- *Name* : پلتفرم تدریس اسلامی رستادی (پتار) به انگلیسی : Petar
- *Language* : Iranian Persian (Farsi)
- *Descripion* : یک پلتفرم آموزش اسلامی و قرآنی

# Roles

- Don't leave any comment in the project
- Do not use Persian نیم فاصله in Persian texts
- Do not use emojis in texts
- Ask if you have a question or recommandation
- Use modern animations , modern UI
- Use ادبیات غیر رسمی، صمیمانه و دوستانه in persian texts

# Tools 

You can use your skills and mcps. e.g frontend-design , ui-ux-max , coding-standards , nextjs-best-practices , MagicUI mcp
