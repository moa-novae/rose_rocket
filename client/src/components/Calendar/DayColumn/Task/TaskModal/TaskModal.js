import React, { useState } from "react";
import Modal from "../../../../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faTruckMoving,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { convertTime } from "../../../../../utils/convertTime";
import "./taskModal.scss";
export default function TaskModal({ taskInfo, showModal, setShowModal }) {
  const day = taskInfo.time.start % (24 * 7);
  const week = Math.floor(convertTime(taskInfo.time.start, "hour", "week"));
  const startHour = taskInfo.time.start % 24;
  const endHour = taskInfo.time.end % 24;
  const [mode, setMode] = useState("view");
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {mode === "view" && (
          <div className="task-wrapper">
            <div className="action-wrapper">
              <FontAwesomeIcon icon={faEdit} />
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <div className="task-name">{taskInfo.name}</div>
            <div className="task-line no-icon">
              <div>{taskInfo.type}</div>
            </div>
            <div className="task-line">
              <FontAwesomeIcon icon={faTruckMoving} />

              <div>{taskInfo.driver.name}</div>
            </div>

            <div className="task-line">
              <FontAwesomeIcon icon={faClock} />

              <div>
                {`From week ${week} day ${day} hour ${startHour} to ${endHour}`}
              </div>
            </div>

            <div className="task-line">
              <FontAwesomeIcon icon={faMapMarkerAlt} />

              <div>
                {`From ${taskInfo.location.start} to ${taskInfo.location.finish}`}{" "}
              </div>
            </div>
            <div className="task-line no-icon">
              <div>{taskInfo.detail}</div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
