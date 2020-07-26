import React from "react";

export default function Task({ taskInfo }) {
  return (
    <>
      {taskInfo && (
        <div className="task">
          <div className="task-name">
            {taskInfo.name}
            <div className="task-detail">{taskInfo.detail}</div>
          </div>
        </div>
      )}
    </>
  );
}
