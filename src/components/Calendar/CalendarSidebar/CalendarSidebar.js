import React, { useState } from "react";
import "./calendarSidebar.scss";
import DropdownMultiple from "../../Dropdown/DropdownMultiple";

import CreateModal from "./CreateModal/CreateModal";
import GenerateCsv from "./GenerateCsv/GenerateCsv";
import DriverBgSelection from "./DriverBgSelection/DriverBgSelection";
export default function CalendarSidebar(props) {
  const {
    addTask,
    driversSelected,
    driversList,
    toggleDriverSelected,
    addAndDeleteTask,
    yearlyTasks,
    handleDriverBgChange,
  } = props;
  const [showCreateModal, setShowCreateModal] = useState(false);

  const driverBgSelections = driversList.map((driver) => (
    <DriverBgSelection
      key={driver.id}
      driver={driver}
      handleDriverBgChange={handleDriverBgChange}
    />
  ));
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
      <div className="driver-selection-wrapper side-bar-wrapper">
        <h3>{"Select displayed driver(s)"} </h3>
        <DropdownMultiple
          list={driversSelected}
          toggle={toggleDriverSelected}
          title="Select Drivers"
        />
        <div className="driver-color-selection-wrapper">
          {driverBgSelections}
        </div>
      </div>
      <div className="csv-generation-wrapper side-bar-wrapper">
        <GenerateCsv yearlyTasks={yearlyTasks} driversList={driversList} />
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
