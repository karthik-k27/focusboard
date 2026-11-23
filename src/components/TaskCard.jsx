import {
  Calendar,
  Pencil,
  Trash2,
  Circle,
  Clock,
  CheckCircle2,
  Flag,
} from 'lucide-react';
import { TASK_STATUSES } from '../data/sampleTasks';

const STATUS_META = {
  'To do': { className: 'status-badge--todo', icon: Circle },
  'In progress': { className: 'status-badge--progress', icon: Clock },
  Completed: { className: 'status-badge--completed', icon: CheckCircle2 },
};

const PRIORITY_CLASS = {
  High: 'priority-badge--high',
  Medium: 'priority-badge--medium',
  Low: 'priority-badge--low',
};

function formatDueDate(dateStr) {
  if (!dateStr) return 'No due date';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const statusInfo = STATUS_META[task.status] || STATUS_META['To do'];
  const StatusIcon = statusInfo.icon;
  const priorityClass = PRIORITY_CLASS[task.priority] || PRIORITY_CLASS.Medium;
  const isCompleted = task.status === 'Completed';

  return (
    <article className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}>
      <div className="task-card__main">
        <div className="task-card__badges">
          <span className={`status-badge ${statusInfo.className}`}>
            <StatusIcon size={13} aria-hidden="true" />
            <span>{task.status}</span>
          </span>
          <span className={`priority-badge ${priorityClass}`}>
            <Flag size={12} aria-hidden="true" />
            <span>{task.priority} priority</span>
          </span>
          {task.category && (
            <span className="category-badge">{task.category}</span>
          )}
        </div>

        <h3 className="task-card__title">{task.title}</h3>
        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}

        <div className="task-card__meta">
          <span className="task-card__due">
            <Calendar size={14} aria-hidden="true" />
            <span>Due {formatDueDate(task.dueDate)}</span>
          </span>
        </div>
      </div>

      <div className="task-card__controls">
        <div className="task-card__status-control">
          <label htmlFor={`status-select-${task.id}`} className="sr-only">
            Change status for {task.title}
          </label>
          <select
            id={`status-select-${task.id}`}
            className="select-control select-control--compact"
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="task-card__actions">
          <button
            type="button"
            className="icon-btn icon-btn--bordered"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${task.title}`}
            title="Edit task"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--bordered icon-btn--danger"
            onClick={() => onDelete(task)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
