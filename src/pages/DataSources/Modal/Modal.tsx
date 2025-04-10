import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sourceType: string) => void;
}

function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const sourceType = (
      form.elements.namedItem('sourceType') as HTMLSelectElement
    ).value;

    if (sourceType === 'google-services') {
      // Direct navigation to the Google OAuth endpoint
      // This avoids CORS issues by letting the browser handle the entire redirect flow
      window.location.href = 'http://localhost:3001/api/v1/connect/google';
    } else {
      // Handle other source types normally in more if statements
      onSubmit(sourceType);
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Add New Data Source</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <label htmlFor="sourceType">Select Source Type</label>
            <select id="sourceType" name="sourceType" className={styles.select}>
              <option value="">Select a source...</option>
              <option value="google-services">Google Services</option>
            </select>
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Source
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
