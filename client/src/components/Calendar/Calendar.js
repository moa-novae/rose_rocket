import React from "react";
import DayColumn from "./DayColumn/DayColumn";
import TimeColumn from "./TimeColumn/TimeColumn";
import "./calendar.scss";
export default function () {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Thu",
    "Fri",
    "Sat",
  ];
  const dayColumns = days.map((day) => <DayColumn day={day} />);

  return (
    <div className="calendar">
      <TimeColumn />
      {dayColumns}
    </div>
  );
}
