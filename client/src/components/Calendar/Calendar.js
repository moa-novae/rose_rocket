import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import CalendarMainHeader from "./CalendarMainHeader/CalendarMainHeader";
import CalendarSidebar from "./CalendarSidebar/CalendarSidebar";
import useCalendar from "./useCalendar";
import "./calendar.scss";

export default function () {
  const {
    changeWeekBy,
    drivers,
    week,
    weeklyTasks,
    weekInput,
    handleOnChange,
    handleWeekJump,
    toggleDriverSelected
  } = useCalendar();
  const days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
  //task of each day is passed to each DayColumn
  const dayColumns = days.map((day, i) => {
    const dailyTasks = weeklyTasks.filter((task) => task.time.day === i);
    return <DayColumn day={day} dailyTasks={dailyTasks} />;
  });
  return (
    <div className="calendar">
      <div className="calendar-sidebar">
        <CalendarSidebar drivers={drivers} toggleDriverSelected={toggleDriverSelected}/>
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
