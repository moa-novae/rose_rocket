import React from "react";
import Modal from "../../../../Modal/Modal";

export default function TaskModal({ taskInfo, showModal, setShowModal }) {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div>{taskInfo.name}</div>
      <div>{taskInfo.hour}</div>
      <div>
        from {taskInfo.location.start} to {taskInfo.location.finish}
      </div>
      <div>{taskInfo.detail}</div>
      <div>{taskInfo.driver.name}</div>
    </Modal>
  );
}
