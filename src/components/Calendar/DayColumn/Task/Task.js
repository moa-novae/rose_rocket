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
  // each driver has own bg colour for task
  const taskBgColour = driversList[driverIndex].colour;
  // choose font colour dynamically depending on bg
  const taskFontColour =
    bgBrightness(taskBgColour) === "bright" ? "#3c4043" : "#fafafa";
  // -0.1 and +0.05 allows sliver of space between connective tasks
  const taskHeightNum = 3 * taskInfo.duration - 0.1;
  const taskHeight = `${taskHeightNum}em`;
  const top = `${3 * taskInfo.hour + 0.05}em`;
  const width = `${100 - lane * 4}%`;
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
              height: taskHeight,
              top,
              width,
              backgroundColor: taskBgColour,
              color: taskFontColour,
            }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            <div className="task-name">{taskInfo.name}</div>
            {/* only allow rendering of location when height larger than 3em and location exist*/}
            {taskHeightNum > 3 &&
              taskInfo.location.start &&
              taskInfo.location.end && (
                <div className="task-description">{`From ${taskInfo.location.start} to ${taskInfo.location.end}`}</div>
              )}
          </div>
        </>
      )}
    </>
  );
}
