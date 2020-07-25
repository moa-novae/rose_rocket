import React from "react";

// Each hour block can display one task if there is one
export default function HourBlock({ taskDetail }) {
  const Task = ({ taskDetails }) => <div className="task">{taskDetails}</div>;
  return (
    <div className="hour-block">
      {taskDetail && <Task taskDetails={taskDetail} />}
    </div>
  );
}
