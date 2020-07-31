import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./calendarMainHeader.scss";

export default function CalendarHeader(props) {
  const {
    week,
    changeWeekBy,
    weekInput,
    handleOnChange,
    handleWeekJump,
  } = props;
  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-week">{`Week ${week + 1}`}</div>
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
        {/* not using type='number' */}
        {/* since easier to use regex to limit value to 0<=x<-51 */}
        <input value={weekInput} onChange={handleOnChange} />
        <FontAwesomeIcon icon={faArrowRight} onClick={handleWeekJump} />
      </div>
    </div>
  );
}
