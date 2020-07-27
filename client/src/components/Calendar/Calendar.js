import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import useCalendar from "./useCalendar";
import "./calendar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function () {
  const { changeWeekBy, week, weeklyTasks } = useCalendar();
  const days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
  //task of each day is passed to each DayColumn
  const dayColumns = days.map((day, i) => {
    const dailyTasks = weeklyTasks.filter((task) => task.time.day === i);
    return <DayColumn day={day} dailyTasks={dailyTasks} />;
  });
  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-header-left">
          <div className="calendar-week">{`Week ${week}`}</div>
          <div className="calendar-week-btns">
            <div className="calendar-week-btn">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={() => changeWeekBy(-1)}
              />
            </div>
            <div className="calendar-week-btn">
              <FontAwesomeIcon
                icon={faArrowRight}
                onClick={() => changeWeekBy(1)}
              />
            </div>
          </div>
        </div>
        <div className="calendar-header-right">
          Change week to
          <input type="number" max="52" />
        </div>
      </div>
      <div className="calendar-body">
        <TimeColumn />
        {dayColumns}
      </div>
    </div>
  );
}