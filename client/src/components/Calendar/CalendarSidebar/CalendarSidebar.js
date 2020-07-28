import React from "react";
import "./calendarSidebar.scss";
import Dropdown from "../../Dropdown/Dropdown";
export default function CalendarSidebar({ drivers, toggleDriverSelected }) {
  return (
    <div className="calendar-sidebar-content">
      <button className="new-task-btn">Create Task</button>
      <Dropdown
        list={drivers}
        toggle={toggleDriverSelected}
        title="Select Drivers"
      />
    </div>
  );
}
