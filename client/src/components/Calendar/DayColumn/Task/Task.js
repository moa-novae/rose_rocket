import React, { useState } from "react";
import { bgBrightness } from "../../../../utils/bgBrightness";
import TaskModal from "./TaskModal/TaskModal";
import "./task.scss";

export default function Task(props) {
  const {
    addTask,
    taskInfo,
    driversList,
    deleteTask,
    addAndDeleteTask,
    overlap,
  } = props;
  const [showModal, setShowModal] = useState(false);
  // lane is used for horizontal offsets when more than one task share an hour block
  let lane = 0;
  const driverIndex = driversList
    .map((driver) => driver.id)
    .indexOf(taskInfo.driver.id);
  if (overlap) {
    lane = driverIndex + 1;
  }
  const taskBgColour = driversList[driverIndex].colour;
  const taskFontColour =
    bgBrightness(taskBgColour) === "bright" ? "#3c4043" : "#fafafa";
  console.log(taskFontColour);
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
              width: `${100 - lane * 4}%`,
              backgroundColor: taskBgColour,
              color: taskFontColour,
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
