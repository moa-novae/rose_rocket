import React from "react";
import "./dayColumn.scss";
import HourBlock from './HourBlock/HourBlock'
export default function (props) {
  const { day } = props;
  const dayBlock = [];
  //each day has 24 hour blocks
  for (let i = 0; i < 24; i++) {
    dayBlock.push(<HourBlock />);
  }

  return (
    <div className="day-column">
      <div className="day-header">{day}</div>
      <div className="notch"></div>
      {dayBlock}
    </div>
  );
}
