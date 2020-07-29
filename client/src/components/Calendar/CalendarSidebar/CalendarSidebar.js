import React, { useState } from "react";
import "./calendarSidebar.scss";
import Dropdown from "../../Dropdown/Dropdown";
import CreateModal from "./CreateModal/CreateModal";
export default function CalendarSidebar({ drivers, toggleDriverSelected }) {
  const [showCreateModal, setShowCreateModal] = useState(true);
  return (
    <div className="calendar-sidebar-content">
      <button className="new-task-btn" onClick={() => setShowCreateModal(true)}>
        Create Task
      </button>

      <CreateModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
      />

      <Dropdown
        list={drivers}
        toggle={toggleDriverSelected}
        title="Select Drivers"
      />
    </div>
  );
}
