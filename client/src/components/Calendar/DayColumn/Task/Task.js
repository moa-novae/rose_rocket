import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";
import "./task.scss";

export default function Task(props) {
  const { addTask, taskInfo, driversList, deleteTask, addAndDeleteTask} = props;
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
            addAndDeleteTask={addAndDeleteTask}
            driversList={driversList}
          />

          <div
            className="task"
            // -0.1 and +0.05 allows sliver of space between connective tasks
            style={{
              height: `${3 * taskInfo.duration - 0.1}em`,
              top: `${3 * taskInfo.hour + 0.05}em`,
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
