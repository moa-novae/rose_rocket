import React, { useState } from "react";
import Modal from "../../../../Modal/Modal";
import CreateModal from "../../../CalendarSidebar/CreateModal/CreateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faTruckMoving,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { convertTime, findDayFromTime } from "../../../../../utils/convertTime";
import "./taskModal.scss";
export default function TaskModal({
  taskInfo,
  showModal,
  setShowModal,
  driversList,
  addTask,
  deleteTask,
  addAndDeleteTask,
}) {
  // transform time into human readable day and hour
  const day = findDayFromTime(taskInfo.time.start);
  const week = Math.floor(convertTime(taskInfo.time.start, "hour", "week"));
  const startHour = taskInfo.time.start % 24;
  const endHour = taskInfo.time.end % 24;
  // massage taskInfo prop into the correct form state shape and pass as initial state
  const initialState = {
    id: taskInfo.id,
    name: taskInfo.name,
    taskType: { id: taskInfo.type },
    driver: { id: taskInfo.driver.id },
    // add 1 so users thanks day 0 is day 1
    startDay: Math.floor(convertTime(taskInfo.time.start, "hour", "day")) + 1,
    startHour: taskInfo.time.start % 24,
    endHour: taskInfo.time.end % 24,
    startLocation: taskInfo.location.start,
    endLocation: taskInfo.location.finish,
    description: taskInfo.description,
  };
  const [mode, setMode] = useState("view");
  return (
    <>
      {mode === "view" && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleOnClose={() => setMode("view")}
        >
          <div className="task-wrapper">
            <div className="action-wrapper">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => {
                  setMode("edit");
                }}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => deleteTask(taskInfo.id)}
              />
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
                {`From week ${week + 1} ${day} hour ${startHour} to ${endHour}`}
              </div>
            </div>

            <div className="task-line">
              <FontAwesomeIcon icon={faMapMarkerAlt} />

              <div>
                {`From ${taskInfo.location.start} to ${taskInfo.location.finish}`}
              </div>
            </div>
            <div className="task-line no-icon">
              <div>{taskInfo.description}</div>
            </div>
          </div>
        </Modal>
      )}
      {mode === "edit" && (
        <CreateModal
          initialState={initialState}
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
          deleteTask={deleteTask}
          addAndDeleteTask={addAndDeleteTask}
          driversList={driversList}
          handleOnClose={() => setMode("view")}
        />
      )}
    </>
  );
}
