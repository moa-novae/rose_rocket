import React from "react";
import "./calendarSidebar.scss";
import Dropdown from "../../Dropdown/Dropdown";
export default function CalendarSidebar() {
  return (
    <div className="calendar-sidebar-content">
      <button className="new-task-btn">Create Task</button>
      <Dropdown />
    </div>
  );
}
