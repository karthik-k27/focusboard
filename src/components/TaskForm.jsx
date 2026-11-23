import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { TASK_STATUSES, TASK_PRIORITIES, TASK_CATEGORIES } from '../data/sampleTasks';

function getTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function TaskForm({ isOpen, editingTask, onSubmit, onCancel }) {
  const isEditing = Boolean(editingTask);
  const titleInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(getTodayIso());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setCategory(editingTask.category || 'Development');
      setStatus(editingTask.status || 'To do');
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || getTodayIso());
    } else {
      setTitle('');
      setDescription('');
      setCategory('Development');
      setStatus('To do');
      setPriority('Medium');
      setDueDate(getTodayIso());
    }
    setErrors({});

    const timer = window.setTimeout(() => {
      titleInputRef.current?.focus();
    }, 30);

    return () => window.clearTimeout(timer);
  }, [isOpen, editingTask]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (!title.trim()) {
      nextErrors.title = 'Task title is required and cannot be blank.';
    }
    if (!status) {
      nextErrors.status = 'Please select a status.';
    }
    if (!priority) {
      nextErrors.priority = 'Please select a priority level.';
    }
    if (!dueDate) {
      nextErrors.dueDate = 'Please choose a due date.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.title) {
        titleInputRef.current?.focus();
      }
      return;
    }

    onSubmit({
      ...(editingTask ? { id: editingTask.id } : {}),
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      dueDate,
    });
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className="modal modal--form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-heading"
      >
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">
              {isEditing ? 'Update Task' : 'New Task'}
            </p>
            <h2 id="task-form-heading" className="modal__title">
              {isEditing ? 'Edit Task Details' : 'Create a New Task'}
            </h2>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onCancel}
            aria-label="Close task form"
          >
            <X size={20} />
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="task-title" className="form-label">
              Title <span className="form-required" aria-hidden="true">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="e.g., Prepare sprint review presentation"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }
              }}
              aria-required="true"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'task-title-error' : undefined}
            />
            {errors.title && (
              <p id="task-title-error" className="form-error" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="task-description" className="form-label">
              Description <span className="form-optional">(optional)</span>
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              rows={4}
              placeholder="Add key details, acceptance criteria, or notes..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="task-status" className="form-label">
                Status <span className="form-required" aria-hidden="true">*</span>
              </label>
              <select
                id="task-status"
                className={`form-input ${errors.status ? 'form-input--error' : ''}`}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                aria-required="true"
              >
                {TASK_STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-priority" className="form-label">
                Priority <span className="form-required" aria-hidden="true">*</span>
              </label>
              <select
                id="task-priority"
                className={`form-input ${errors.priority ? 'form-input--error' : ''}`}
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                aria-required="true"
              >
                {TASK_PRIORITIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <select
                id="task-category"
                className="form-input"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {TASK_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-due-date" className="form-label">
                Due Date <span className="form-required" aria-hidden="true">*</span>
              </label>
              <input
                id="task-due-date"
                type="date"
                className={`form-input ${errors.dueDate ? 'form-input--error' : ''}`}
                value={dueDate}
                onChange={(event) => {
                  setDueDate(event.target.value);
                  if (errors.dueDate) {
                    setErrors((prev) => ({ ...prev, dueDate: undefined }));
                  }
                }}
                aria-required="true"
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
              />
              {errors.dueDate && (
                <p id="task-due-date-error" className="form-error" role="alert">
                  {errors.dueDate}
                </p>
              )}
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
