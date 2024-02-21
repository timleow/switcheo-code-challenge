import React from 'react';
import './ConfirmationModal.css'; // Import the CSS file for styling

function ConfirmationModal({ isOpen, onCancel, onConfirm }) {
  return (
    <div className={`confirmation-modal ${isOpen ? 'open' : ''}`}>
      <div className="confirmation-overlay" onClick={onCancel}></div>
      <div className="confirmation-content">
        <h2>Confirm Swap</h2>
        <p>Are you sure you want to swap the currencies? This action is irreversible.</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
