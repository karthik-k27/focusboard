import { FolderOpen, Plus, RotateCcw } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
  totalTaskCount,
  hasActiveFilters,
  onStatusChange,
  onEdit,
  onDelete,
  onResetFilters,
  onOpenCreateForm,
}) {
  if (tasks.length === 0) {
    const isFilteredEmpty = totalTaskCount > 0 && hasActiveFilters;

    return (
      <div className="empty-state" role="status" aria-live="polite">
        <div className="empty-state__icon" aria-hidden="true">
          <FolderOpen size={28} />
        </div>
        <h3 className="empty-state__title">
          {isFilteredEmpty ? 'No matching tasks found' : 'No tasks yet'}
        </h3>
        <p className="empty-state__text">
          {isFilteredEmpty
            ? 'Try adjusting your search query, status tab, or priority filter.'
            : 'Create your first task to start tracking progress on FocusBoard.'}
        </p>
        {isFilteredEmpty ? (
          <button type="button" className="btn btn--secondary" onClick={onResetFilters}>
            <RotateCcw size={16} aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={onOpenCreateForm}>
            <Plus size={16} aria-hidden="true" />
            <span>Create Task</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list" role="list" aria-label="Tasks">
      {tasks.map((task) => (
        <div key={task.id} role="listitem">
          <TaskCard
            task={task}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
