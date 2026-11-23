import { Menu, Plus, Bell } from 'lucide-react';

export default function Header({ onOpenSidebar, onOpenCreateForm, completedCount, totalCount }) {
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="top-header">
      <div className="top-header__left">
        <button
          type="button"
          className="icon-btn top-header__menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="top-header__date">{todayLabel}</p>
          <h1 className="top-header__title">My Tasks Overview</h1>
        </div>
      </div>

      <div className="top-header__actions">
        <div className="top-header__summary-chip" aria-live="polite">
          <span className="status-dot status-dot--completed" aria-hidden="true" />
          <span>
            {completedCount} of {totalCount} completed
          </span>
        </div>

        <button
          type="button"
          className="icon-btn top-header__notify-btn"
          aria-label="Notifications (visual placeholder)"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          type="button"
          className="btn btn--primary"
          onClick={onOpenCreateForm}
        >
          <Plus size={18} aria-hidden="true" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
