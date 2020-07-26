import React from "react";
import Task from "./Task/Task"

// Each hour block can display one task if there is one
export default function HourBlock({ taskInfo }) {
  return (
    <div className="hour-block">
      {taskInfo && <Task taskInfo={taskInfo} />}
    </div>
  );
}
