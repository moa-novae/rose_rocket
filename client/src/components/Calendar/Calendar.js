import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import useCalendar from "./useCalendar";
import "./calendar.scss";

export default function () {
  const {
    changeWeekBy,
    week,
    weeklyTasks,
    weekInput,
    handleOnChange,
    handleWeekJump,
  } = useCalendar();
  const days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
  //task of each day is passed to each DayColumn
  const dayColumns = days.map((day, i) => {
    const dailyTasks = weeklyTasks.filter((task) => task.time.day === i);
    return <DayColumn day={day} dailyTasks={dailyTasks} />;
  });
  return (
    <div className="calendar">
      <CalendarHeader
        week={week}
        changeWeekBy={changeWeekBy}
        weekInput={weekInput}
        handleOnChange={handleOnChange}
        handleWeekJump={handleWeekJump}
      />
      <div className="calendar-body">
        <TimeColumn />
        {dayColumns}
      </div>
    </div>
  );
}
