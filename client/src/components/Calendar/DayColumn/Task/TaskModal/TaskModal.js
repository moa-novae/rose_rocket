import React from "react";
import Modal from "../../../../Modal/Modal";

export default function TaskModal({ taskInfo, showModal, setShowModal }) {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div>{taskInfo.name}</div>
      <div>{taskInfo.time.hour}</div>
    </Modal>
  );
}
