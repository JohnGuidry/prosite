import React, { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const Drawer: React.FC<Props> = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div 
        className="drawer-content" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2>{title}</h2>
        <div className="drawer-body">
          {content}
        </div>
      </div>
    </div>
  );
};
