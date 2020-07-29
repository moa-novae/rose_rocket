import React, { useState } from "react";
import "./calendarSidebar.scss";
import DropdownMultiple from "../../Dropdown/DropdownMultiple";
import CreateModal from "./CreateModal/CreateModal";
export default function CalendarSidebar({
  addTask,
  driversSelected,
  driversList,
  toggleDriverSelected,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <div className="calendar-sidebar-content">
      <div className="new-task-btn-wrapper">
        <button
          className="new-task-btn simple-btn"
          onClick={() => setShowCreateModal(true)}
        >
          Create Task
        </button>
      </div>

      <CreateModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        drivers={driversList}
        addTask={addTask}
      />

      <DropdownMultiple
        list={driversSelected}
        toggle={toggleDriverSelected}
        title="Select Drivers"
      />
    </div>
  );
}
