import React from "react";

export default function GuessErrorModal({ errorMessage }) {
  return (
    <div className="error-modal-content">
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}
