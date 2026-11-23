import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title
      </label>
      <Search size={18} className="search-bar__icon" aria-hidden="true" />
      <input
        id="task-search-input"
        type="search"
        className="search-bar__input"
        placeholder="Search tasks by title..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search query"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
