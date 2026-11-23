import { useEffect } from 'react';
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  Sparkles,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'My Tasks', icon: LayoutDashboard, sectionId: 'tasks-section' },
  { id: 'focus', label: 'Focus Notes', icon: Sparkles, sectionId: 'focus-notes-section' },
  { id: 'stats', label: 'Statistics', icon: BarChart3, sectionId: 'stats-section' },
  { id: 'backlog', label: 'To Do Queue', icon: ListTodo, filterStatus: 'To do' },
  { id: 'settings', label: 'Preferences', icon: Settings, placeholder: true },
];

export default function Sidebar({
  activeNav,
  onSelectNav,
  isOpen,
  onClose,
  taskCount,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (item) => {
    onSelectNav(item);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="sidebar__brand">
          <div className="brand-mark" aria-hidden="true">
            <CheckSquare size={20} strokeWidth={2.4} />
          </div>
          <div className="brand-copy">
            <span className="brand-name">FocusBoard</span>
            <span className="brand-tagline">Task Workspace</span>
          </div>
          <button
            type="button"
            className="icon-btn sidebar__close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          <p className="sidebar__section-label">Workspace</p>
          <ul className="sidebar__list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="sidebar__link-text">{item.label}</span>
                    {item.id === 'overview' && (
                      <span className="sidebar__pill" aria-label={`${taskCount} total tasks`}>
                        {taskCount}
                      </span>
                    )}
                    {item.placeholder && (
                      <span className="sidebar__badge-soon">Soon</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__profile">
            <div className="avatar" aria-hidden="true">FB</div>
            <div className="sidebar__profile-info">
              <span className="sidebar__profile-name">Personal Board</span>
              <span className="sidebar__profile-meta">Local storage active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
