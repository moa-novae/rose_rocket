import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";
import "./task.scss";

export default function Task(props) {
  const { addTask, taskInfo, driversList, deleteTask } = props;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {taskInfo && (
        <>
          {/* show modal of task detail if user click on task */}
          <TaskModal
            showModal={showModal}
            setShowModal={setShowModal}
            taskInfo={taskInfo}
            addTask={addTask}
            deleteTask={deleteTask}
            driversList={driversList}
          />

          <div
            className="task"
            style={{
              height: `${3 * taskInfo.duration}em`,
              top: `${3 * taskInfo.hour}em`,
            }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            <div className="task-name">
              {taskInfo.name}
              <div className="task-description">{taskInfo.description}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
