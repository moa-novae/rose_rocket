import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import CalendarMainHeader from "./CalendarMainHeader/CalendarMainHeader";
import CalendarSidebar from "./CalendarSidebar/CalendarSidebar";
import useCalendar from "./useCalendar";
import "./calendar.scss";

export default function () {
  const {
    addTask,
    addAndDeleteTask,
    deleteTask,
    changeWeekBy,
    driversSelected,
    driversList,
    week,
    weeklyTasks,
    weekInput,
    handleOnChange,
    handleWeekJump,
    handleDriverBgChange,
    toggleDriverSelected,
    yearlyTasks,
  } = useCalendar();
  const days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
  //task of each day is passed to each DayColumn
  const dayColumns = days.map((day, i) => {
    const dailyTasks = weeklyTasks.filter((task) => task.day === i);
    return (
      <DayColumn
        day={day}
        key={day}
        dailyTasks={dailyTasks}
        driversSelected={driversSelected}
        driversList={driversList}
        addTask={addTask}
        deleteTask={deleteTask}
        addAndDeleteTask={addAndDeleteTask}
      />
    );
  });
  return (
    <div className="calendar">
      <div className="calendar-sidebar">
        <CalendarSidebar
          driversSelected={driversSelected}
          driversList={driversList}
          toggleDriverSelected={toggleDriverSelected}
          addTask={addTask}
          addAndDeleteTask={addAndDeleteTask}
          yearlyTasks={yearlyTasks}
          handleDriverBgChange={handleDriverBgChange}
        />
      </div>
      <div className="calendar-main">
        <CalendarMainHeader
          week={week}
          changeWeekBy={changeWeekBy}
          weekInput={weekInput}
          handleOnChange={handleOnChange}
          handleWeekJump={handleWeekJump}
        />
        <div className="calendar-main-body">
          <TimeColumn />
          {dayColumns}
        </div>
      </div>
    </div>
  );
}
