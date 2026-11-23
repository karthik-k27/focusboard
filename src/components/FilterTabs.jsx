import { RotateCcw } from 'lucide-react';
import { TASK_PRIORITIES } from '../data/sampleTasks';

const STATUS_OPTIONS = ['All', 'To do', 'In progress', 'Completed'];

export default function FilterTabs({
  selectedStatus,
  onSelectStatus,
  selectedPriority,
  onSelectPriority,
  statusCounts,
  hasActiveFilters,
  onResetFilters,
}) {
  return (
    <div className="filter-bar">
      <div className="status-tabs" role="tablist" aria-label="Filter tasks by status">
        {STATUS_OPTIONS.map((status) => {
          const isActive = selectedStatus === status;
          const count = statusCounts[status] ?? 0;
          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab ${isActive ? 'status-tab--active' : ''}`}
              onClick={() => onSelectStatus(status)}
            >
              <span>{status}</span>
              <span className="status-tab__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="filter-bar__right">
        <div className="priority-filter">
          <label htmlFor="priority-filter-select" className="priority-filter__label">
            Priority
          </label>
          <select
            id="priority-filter-select"
            className="select-control"
            value={selectedPriority}
            onChange={(event) => onSelectPriority(event.target.value)}
          >
            <option value="All">All priorities</option>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onResetFilters}
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
