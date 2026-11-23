import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ task, onConfirm, onCancel }) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (!task) return;
    cancelBtnRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [task, onCancel]);

  if (!task) return null;

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
        className="modal modal--confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="modal__header">
          <div className="confirm-title-row">
            <div className="confirm-icon" aria-hidden="true">
              <AlertTriangle size={20} />
            </div>
            <h2 id="delete-dialog-title" className="modal__title">
              Delete Task?
            </h2>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onCancel}
            aria-label="Cancel deletion"
          >
            <X size={20} />
          </button>
        </div>

        <p id="delete-dialog-desc" className="confirm-message">
          Are you sure you want to permanently remove{' '}
          <strong>“{task.title}”</strong>? This action cannot be undone.
        </p>

        <div className="modal__footer">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => onConfirm(task.id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
