import React, { useState } from 'react';

function ConfirmSwapButton({ onConfirm }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmClick = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    onConfirm();
  };

  return (
    <>
      <button className="confirmSwapButton" onClick={handleConfirmClick}>
        Confirm Swap
      </button>
      {modalOpen && (
        <div className="confirmationModal">
          <div className="confirmationModalContent">
            <p>Are you sure you want to swap?</p>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmSwapButton;
