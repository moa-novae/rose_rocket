import React from "react";
import "./dayColumn.scss";
import HourBlock from "./HourBlock/HourBlock";
export default function ({ day, dailyTasks }) {
  const dayBlock = [];
  //each day has 24 hour blocks
  for (let i = 0; i < 24; i++) {
    const taskInfo = dailyTasks.filter((task) => task.time.hour === i)[0];
    dayBlock.push(<HourBlock taskInfo={taskInfo} />);
  }

  return (
    <div className="day-column">
      <div className="day-header">{day}</div>
      <div className="notch"></div>
      {dayBlock}
    </div>
  );
}
