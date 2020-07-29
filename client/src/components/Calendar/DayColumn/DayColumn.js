import React from "react";
import "./dayColumn.scss";
import HourBlock from "./HourBlock/HourBlock";
import Task from "./Task/Task";
export default function ({
  day,
  dailyTasks,
  drivers,
  driversList,
  addTask,
  deleteTask,
}) {
  // add 24 HourBlocks to each DayColumn
  // each HourBlock is assigned an hour
  const hourBlocks = Array(24).fill(<HourBlock />);

  // only allows tasks that have drivers selected to show up
  const tasks = dailyTasks
    .filter((task) =>
      drivers.some((driver) => driver.selected && driver.id === task.driver.id)
    )
    .map((task) => (
      <Task
        key={task.id}
        taskInfo={task}
        drivers={driversList}
        addTask={addTask}
        deleteTask={deleteTask}
      />
    ));

  return (
    <div className="day-column">
      <div className="day-header">{day}</div>
      <div className="notch"></div>
      <div className="day-block">
        <div className="hour-blocks">{hourBlocks}</div>
        <div className="task-block">{tasks}</div>
      </div>
    </div>
  );
}
