import React from "react";
import "./dayColumn.scss";
import HourBlock from "./HourBlock/HourBlock";
import Task from "./Task/Task";
import findOverlappingTasks from "../../../utils/findOverlappingTasks";
export default function ({
  day,
  dailyTasks,
  drivers,
  driversList,
  addTask,
  deleteTask,
  addAndDeleteTask,
}) {
  // add 24 HourBlocks to each DayColumn
  // each HourBlock is assigned an hour
  const hourBlocks = Array(24).fill(<HourBlock />);

  // the filter allows tasks that have drivers selected to show up
  const visibleTasks = dailyTasks.filter((task) =>
    drivers.some((driver) => driver.selected && driver.id === task.driver.id)
  );
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
