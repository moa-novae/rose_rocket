import React, { useState } from "react";
import "./calendarSidebar.scss";
import DropdownMultiple from "../../Dropdown/DropdownMultiple";
import CreateModal from "./CreateModal/CreateModal";
export default function CalendarSidebar(props) {
  const {
    addTask,
    driversSelected,
    driversList,
    toggleDriverSelected,
    addAndDeleteTask,
  } = props;
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
      <div className="driver-selection-wrapper">
        <DropdownMultiple
          list={driversSelected}
          toggle={toggleDriverSelected}
          title="Select Drivers"
        />
      </div>

      <CreateModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        driversList={driversList}
        addTask={addTask}
        addAndDeleteTask={addAndDeleteTask}
      />
    </div>
  );
}
