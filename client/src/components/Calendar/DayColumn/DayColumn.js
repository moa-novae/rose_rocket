import React from "react";
import "./dayColumn.scss";
import HourBlock from "./HourBlock/HourBlock";
export default function ({ day, dailyTasks, drivers }) {
  const dayBlock = [];
  // add 24 HourBlocks to each DayColumn
  // each HourBlock is assigned an hour
  for (let i = 0; i < 24; i++) {
    const taskInfo = dailyTasks.filter(
      (task) =>
        //taskInfo is provided to hourBlock if the hour of the task matches hour of HourBlock
        // and if the driver is selected
        task.time.hour === i &&
        drivers.some(
          (driver) => driver.selected && driver.id === task.driver.id
        )
    )[0];
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
