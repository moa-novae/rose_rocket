import React, { useState } from "react";
import Modal from "../../../Modal/Modal";
import "./task.scss";

export default function Task({ taskInfo }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {taskInfo && (
        <>
          {/* show modal of task detail if user click on task */}
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <div>{taskInfo.name}</div>
            <div>{taskInfo.time.hour}</div>
          </Modal>
          {/* task in hour block */}
          <div
            className="task"
            style={{
              height: `${3 * taskInfo.duration}em`,
              top: `${3 * taskInfo.time.hour}em`,
            }}
            onClick={() => {
              setShowModal(true);
              console.log("also");
            }}
          >
            <div className="task-name">
              {taskInfo.name}
              <div className="task-detail">{taskInfo.detail}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
