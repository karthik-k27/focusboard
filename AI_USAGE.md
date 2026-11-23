# AI Usage Disclosure

## Tools Used

- **Gemini** — Used for architecture planning, component scaffolding, CSS responsive layout refinement, and documentation drafting.

## Representative Prompts

1. "Help me structure a modular React + Vite task management dashboard with reusable components for stats cards, a 3-slide carousel, task CRUD modals, and combined search/status/priority filters."
2. "Write a custom `useLocalStorage` React hook that safely parses JSON, falls back to initial sample data only when no saved data exists, and does not overwrite an intentionally empty task list on refresh."
3. "Review my CSS media queries for 1440px, 768px, and 390px viewports to prevent horizontal overflow and keep task cards and modal controls touch-friendly."
4. "Check my task form and delete confirmation dialog for keyboard accessibility, ARIA attributes, and validation edge cases such as whitespace-only task titles."

## AI-Assisted Areas

- Initial React + Vite folder structure and component scaffolding (`Sidebar`, `Header`, `StatCard`, `FocusNotes`, `TaskCard`, `TaskList`, `TaskForm`, `DeleteConfirmModal`).
- Responsive CSS layout and breakpoint rules for desktop (`1440px`), tablet (`768px`), and mobile (`390px`).
- Accessibility review (semantic landmarks, `aria-live` regions, `role="alertdialog"`, visible focus indicators, and `Escape`-key modal handling).
- Drafting `README.md` structure and state-management documentation.

## Verified or Corrected Suggestion

- **Empty-array persistence edge case:** An initial `localStorage` helper checked `if (!parsed || parsed.length === 0)` before returning saved tasks, which would have restored the 6 sample tasks after a user intentionally deleted every task and refreshed the page. This was corrected to check only `item === null` and `Array.isArray(parsed)` so deleting all tasks persists cleanly as `[]` across refreshes, while still guarding against corrupted JSON.
- **Division-by-zero guard in statistics:** Verified that `completionRate` explicitly returns `0` when `tasks.length === 0` rather than computing `NaN%`.
