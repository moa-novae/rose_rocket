import React from "react";
import "./modal.scss";
export default function Modal({ showModal, setShowModal, children }) {
  return (
    // only show modal if showModal === true
    <>
      {showModal && (
        <>
          <div
            className="backdrop"
            onClick={() => {
              setShowModal(false);
            }}
          ></div>
          <div className="modal">{children}</div>
        </>
      )}
    </>
  );
}
