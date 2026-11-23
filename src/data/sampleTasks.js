export const SAMPLE_TASKS = [
  {
    id: 101,
    title: 'Finalize dashboard layout and design tokens',
    description: 'Align spacing, card radii, typography scale, and status badges with the Figma desktop and mobile frames.',
    category: 'Design',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-23',
  },
  {
    id: 102,
    title: 'Build reusable task CRUD components',
    description: 'Implement TaskForm modal for creating and editing tasks with title validation, status, priority, and due date fields.',
    category: 'Development',
    status: 'In progress',
    priority: 'High',
    dueDate: '2026-11-24',
  },
  {
    id: 103,
    title: 'Implement three-slide Focus Notes carousel',
    description: 'Create manual previous/next controls, active slide indicators, circular navigation, and responsive slide layout.',
    category: 'Development',
    status: 'In progress',
    priority: 'Medium',
    dueDate: '2026-11-25',
  },
  {
    id: 104,
    title: 'Verify responsive behavior at 390px, 768px, and 1440px',
    description: 'Test sidebar collapse, stacked mobile cards, touch targets, and modal layout to prevent horizontal overflow.',
    category: 'Testing',
    status: 'To do',
    priority: 'High',
    dueDate: '2026-11-26',
  },
  {
    id: 105,
    title: 'Audit keyboard navigation and ARIA labels',
    description: 'Confirm semantic landmarks, visible focus rings, form field labels, and keyboard-accessible confirmation dialogs.',
    category: 'Testing',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-11-22',
  },
  {
    id: 106,
    title: 'Research localStorage error handling patterns',
    description: 'Document safe JSON parsing and fallback initialization so saved user tasks are never overwritten on page refresh.',
    category: 'Research',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-11-21',
  },
];

export const TASK_STATUSES = ['To do', 'In progress', 'Completed'];

export const TASK_PRIORITIES = ['Low', 'Medium', 'High'];

export const TASK_CATEGORIES = ['Design', 'Development', 'Testing', 'Research', 'General'];
