import React, { useEffect } from "react";
import "./modal.scss";
export default function Modal({
  showModal,
  setShowModal,
  handleOnClose,
  children,
}) {
  /* not the cleanest way to run function when modal closes
  since it is also run on load as modal is closed by default
  but things work for now
  it is mainly used to reset modal related state on close*/
  useEffect(() => {
    if (!showModal) {
      if (handleOnClose) {
        handleOnClose();
      }
    }
  }, [showModal, handleOnClose]);
  return (
    <>
      {/* only show modal if showModal === true */}
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
