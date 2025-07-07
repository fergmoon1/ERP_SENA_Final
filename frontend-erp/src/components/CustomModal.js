import React from "react";
import "../styles/CustomModal.css";

const CustomModal = ({ show, onClose, title, children, actions }) => {
  if (!show) return null;
  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-wrap" onClick={e => e.stopPropagation()}>
        <button className="custom-modal-close" onClick={onClose}>&times;</button>
        {title && <h2 className="custom-modal-header">{title}</h2>}
        <div className="custom-modal-content">{children}</div>
        {actions && <div className="custom-modal-actions">{actions}</div>}
      </div>
    </div>
  );
};

export default CustomModal; 