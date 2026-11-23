# FocusBoard

A responsive, single-user task management dashboard built with **React** and **Vite**. FocusBoard demonstrates component-based architecture, predictable React state management, full task CRUD operations, dynamic statistics, combined search and filtering, a three-slide Focus Notes carousel, browser persistence via `localStorage`, and accessible responsive layouts across desktop (`1440px`), tablet (`768px`), and mobile (`390px`).

## Links

- **Hosted Application URL:** `https://<your-deployed-app>.vercel.app` *(update after deploying to Vercel or Netlify)*
- **GitHub Repository URL:** `https://github.com/<your-username>/focusboard` *(update after pushing to GitHub)*

## Technology Stack

- **HTML5 & CSS3** — Semantic landmarks, CSS custom properties, Flexbox/Grid, responsive media queries
- **JavaScript (ES6+)** — Modular application logic
- **React 18** — Reusable functional components and React Hooks (`useState`, `useEffect`, `useMemo`, `useRef`)
- **Vite** — Fast development server and production bundler
- **Lucide React** — Accessible, crisp UI icons
- **Browser `localStorage`** — Client-side data persistence

## Key Features Implemented

- **Initial Sample Dataset:** Preloaded with 6 structured sample tasks covering `To do`, `In progress`, and `Completed` statuses, `Low`/`Medium`/`High` priorities, and multiple categories (`Design`, `Development`, `Testing`, `Research`).
- **Full CRUD Operations:**
  - **Create Task:** Reusable `TaskForm` modal with validation (rejects empty or whitespace-only titles and missing required fields).
  - **Edit Task:** Reuses `TaskForm` pre-populated with the selected task while preserving its original unique `id`.
  - **Delete Task:** Accessible confirmation dialog (`DeleteConfirmModal`) before permanent removal.
  - **Inline Status Updates:** Per-card status selector (`To do`, `In progress`, `Completed`) that updates the board and statistics immediately.
- **Dynamic Dashboard Statistics:** Live calculation of Total Tasks, In Progress, Completed, and Completion Rate (`(completed / total) * 100`, safely returning `0%` when there are zero tasks).
- **Focus Notes Carousel:** 3-slide interactive carousel with Previous/Next circular navigation, clickable slide indicator dots, and `aria-live` updates.
- **Combined Search & Filtering:** Case-insensitive partial title search, status tabs with live counts (`All`, `To do`, `In progress`, `Completed`), priority dropdown (`All`, `Low`, `Medium`, `High`), and one-click filter reset.
- **Browser Persistence:** Automatic read/write synchronization with `localStorage` (`focusboard_tasks`) so user changes survive refreshes without being overwritten by sample data.
- **Responsive & Accessible UI:** Tested across `1440px`, `768px`, and `390px` viewports with collapsible mobile navigation drawer, keyboard-accessible dialogs (`Escape` to close), visible `:focus-visible` outlines, semantic HTML, and non-color indicators alongside badges.

## Project Folder Structure

```text
focusboard/
├── public/
│   └── favicon.svg
├── screenshots/
│   ├── desktop-1440.png
│   └── mobile-390.png
├── src/
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx
│   │   ├── FilterTabs.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   │   ├── focusNotes.js
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AI_USAGE.md
├── README.md
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## Getting Started Locally

### Prerequisites

- Node.js (v18+ recommended) and npm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Create a production build
npm run build

# 4. Preview the production build locally
npm run preview
```

## State Management Explanation

- **Approach Selected:** React Hooks (`useState`, `useMemo`, `useEffect`) centralized in `App.jsx` paired with a custom `useLocalStorage` hook. Because FocusBoard is a single-user, single-screen dashboard with shallow prop depth, React Hooks keep the data flow transparent, predictable, and free of external state-library boilerplate.
- **Single Source of Truth:** The complete `tasks` array lives in `App.jsx` and is passed down to child components via props.
- **Predictable Immutable Mutations:**
  - *Create* prepends a new task object (`[newTask, ...prevTasks]`) with a unique numeric ID.
  - *Edit* and *Status Update* return a new array via `.map()` replacing only the matching `task.id`.
  - *Delete* returns a new array via `.filter()` excluding the confirmed `task.id`.
- **Derived Statistics & Filters:** `stats`, `statusCounts`, and `filteredTasks` are computed dynamically with `useMemo` from `tasks`, `searchQuery`, `selectedStatus`, and `selectedPriority`—never stored as redundant state or hardcoded.
- **Carousel State:** `activeSlide` (`0`, `1`, `2`) is maintained in React state and synchronized with `FocusNotes.jsx` Previous/Next handlers and slide dot indicators using modulo wrap-around arithmetic.

## `localStorage` Implementation

- **Storage Key:** `focusboard_tasks`
- **Lazy Initialization:** On first render, `useLocalStorage` checks `window.localStorage.getItem('focusboard_tasks')`. If valid saved JSON exists (including an empty array `[]` when a user deletes all tasks), it restores that array. Sample data (`SAMPLE_TASKS`) is loaded only when no saved key exists or stored data is invalid/corrupted.
- **Automatic Synchronization:** A `useEffect` hook serializes the full `tasks` array (never the filtered subset) to JSON whenever `tasks` changes, wrapped in `try/catch` blocks to guard against storage quota or privacy-mode errors.

## Known Limitations & Placeholders

- **Visual Placeholders:** The sidebar **Preferences** link (badged *Soon*) and the header **Notifications** bell button are visual placeholders outside the single-screen scope of this assessment.
- **Figma Fine-Tuning:** Design tokens (`src/index.css`) and Focus Notes slide copy (`src/data/focusNotes.js`) are cleanly centralized so exact Figma hex values, spacing, or slide text can be adjusted in one place if the live Figma file updates.
- **Client-Side Only:** Tasks are stored in the current browser's `localStorage` and do not sync across devices or browsers.
