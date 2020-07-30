import React from "react";
import "./dayColumn.scss";
import HourBlock from "./HourBlock/HourBlock";
import Task from "./Task/Task";
import findOverlappingTasks from "../../../utils/findOverlappingTasks";
export default function ({
  day,
  dailyTasks,
  driversSelected,
  driversList,
  addTask,
  deleteTask,
  addAndDeleteTask,
}) {
  // add 24 HourBlocks to each DayColumn
  // each HourBlock is assigned an hour
  const hourBlocks = Array.from(Array(24), (_, i) => <HourBlock key={i} />);

  // the filter allows tasks that have drivers selected to show up
  const visibleTasks = dailyTasks.filter((task) =>
    driversSelected.some(
      (driver) => driver.selected && driver.id === task.driver.id
    )
  );
  // not sure if this is more efficient for finding overlapping tasks or dom ref is better
  // find overlapping tasks and style them differently
  const overlappingTaskIds = findOverlappingTasks(visibleTasks);

  const tasks = visibleTasks.map((task) => (
    <Task
      key={task.id}
      taskInfo={task}
      driversList={driversList}
      addTask={addTask}
      deleteTask={deleteTask}
      addAndDeleteTask={addAndDeleteTask}
      overlap={overlappingTaskIds.includes(task.id)}
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
