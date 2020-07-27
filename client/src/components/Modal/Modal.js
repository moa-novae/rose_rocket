import React from "react";
import "./modal.scss";
export default function Modal({ showModal, setShowModal, children }) {
  return (
    // only show modal if showModal === true
    <div
      className="backdrop"
      style={{ display: showModal ? "flex" : "none" }}
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div className="modal">{children}</div>
    </div>
  );
}
