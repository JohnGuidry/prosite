import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const Drawer: React.FC<Props> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="drawer-body">
          {content}
        </div>
      </div>
    </div>
  );
};
