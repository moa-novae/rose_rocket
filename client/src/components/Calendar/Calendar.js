import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import useCalendar from "./useCalendar";
import "./calendar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
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
      <div className="calendar-header">
        <div className="calendar-header-left">
          <div className="calendar-week">{`Week ${week}`}</div>
          <div className="calendar-week-btns">
            <div className="calendar-week-btn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={() => changeWeekBy(-1)}
              />
            </div>
            <div className="calendar-week-btn">
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={() => changeWeekBy(1)}
              />
            </div>
          </div>
        </div>
        <div className="calendar-header-right">
          Change week to
          <input
            // not using type='number'
            // since easier to use regex to limit value to 0<=x<-51
            value={weekInput}
            onChange={handleOnChange}
          />
          <FontAwesomeIcon icon={faArrowRight} onClick={handleWeekJump} />
        </div>
      </div>
      <div className="calendar-body">
        <TimeColumn />
        {dayColumns}
      </div>
    </div>
  );
}
