import React from "react";
import "./timeColumn.scss";
export default function TimeColumn() {
  // hours = [1, 2, ... 24]
  const hours = Array.from(Array(24), (_, i) => i);
  return (
    <div className="time-column">
      <div className="time-column-header"></div>
      <div className="time-slots">
        {hours.map((hour) => (
          <div className="time-slot">
            <div className="time-number">{hour}</div>
            <div className="time-notch"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
