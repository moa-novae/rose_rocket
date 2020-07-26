import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import useCalendar from "./useCalendar";
import "./calendar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function () {
  const days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
  const dayColumns = days.map((day) => <DayColumn day={day} />);
  const { changeWeekBy, week } = useCalendar();

  return (
    <div>
      {week}
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => changeWeekBy(-1)} />
      <FontAwesomeIcon icon={faArrowRight} onClick={() => changeWeekBy(1)} />
      <div className="calendar">
        <TimeColumn />
        {dayColumns}
      </div>
    </div>
  );
}
