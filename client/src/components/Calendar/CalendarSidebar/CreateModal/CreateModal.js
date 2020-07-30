import React from "react";
import Modal from "../../../Modal/Modal";
import TextInput from "../../../Form/TextInput/TextInput";
import TextArea from "../../../Form/TextArea/TextArea";
import DropdownSingle from "../../../Dropdown/DropdownSingle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
import useCreateModal from "./useCreateModal";
import "./createModal.scss";
export default function CreateModal({
  driversList,
  showModal,
  setShowModal,
  addTask,
  deleteTask,
  addAndDeleteTask,
  initialState,
  handleOnClose,
}) {
  const taskTypes = [
    { id: "pickup", name: "Pick up" },
    { id: "dropoff", name: "Drop off" },
    { id: "other", name: "Other" },
  ];
  // the existence of initial state means it is edit mode
  if (!initialState) {
    initialState = {
      name: "",
      taskType: {},
      driver: {},
      startDay: "",
      startHour: "",
      endHour: "",
      startLocation: "",
      endLocation: "",
      description: "",
    };
  }
  const {
    showConflictOptions,
    form,
    errors,
    closeConflictOptions,
    handleSubmit,
    handleOnChange,
    handleDriverChange,
    handleTaskTypeChange,
    handlePlaceAroundConflict,
    handleOverrideConflict,
  } = useCreateModal(
    initialState,
    addTask,
    deleteTask,
    addAndDeleteTask,
    setShowModal
  );
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      handleOnClose={handleOnClose}
    >
      <div className="create-modal-content-wrapper">
        <div className="create-modal-first">
          <div className="task-name-input-wrapper">
            {/* choose task name */}
            <TextInput
              placeholder="Task Name"
              name="name"
              value={form.name}
              handleOnChange={handleOnChange}
            />
            <div className="form-modal-error">{errors.name}</div>
          </div>
          <div className="task-type-dd-wrapper">
            {/* choose task type */}
            <DropdownSingle
              list={taskTypes}
              title="Task Type"
              selected={form.taskType}
              select={handleTaskTypeChange}
            />
            <div className="form-modal-error">{errors.taskType}</div>
          </div>
        </div>
        <div className="create-modal-icon twos">
          <FontAwesomeIcon icon={faTruckMoving} />

          <DropdownSingle
            list={driversList}
            title="Driver"
            selected={form.driver}
            select={handleDriverChange}
          />
        </div>
        <div className="form-modal-error outer">{errors.driver}</div>

        <div className="create-modal-icon fours">
          <FontAwesomeIcon icon={faClock} />

          <TextInput
            placeholder="Day"
            name="startDay"
            value={form.startDay}
            handleOnChange={handleOnChange}
          />
          <TextInput
            placeholder="Hour"
            name="startHour"
            value={form.startHour}
            handleOnChange={handleOnChange}
          />
          <span>-</span>
          <TextInput
            placeholder="Hour"
            name="endHour"
            value={form.endHour}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="form-modal-error outer"> {errors.time}</div>
        <div className="create-modal-icon twos">
          <FontAwesomeIcon icon={faMapMarkerAlt} />

          <TextInput
            placeholder="Start"
            name="startLocation"
            value={form.startLocation}
            handleOnChange={handleOnChange}
          />
          <TextInput
            placeholder="End"
            name="endLocation"
            value={form.endLocation}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="create-modal-first description">
          <TextArea
            placeholder="Task Description"
            name="description"
            value={form.description}
            handleOnChange={handleOnChange}
          />
        </div>
        {!showConflictOptions && (
          <div className="save-btn-wrapper">
            <button className="simple-btn save-btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        )}
        {showConflictOptions && (
          <div className="conflicted-options-wrapper">
            <button
              className="simple-btn override-btn"
              onClick={handleOverrideConflict}
            >
              Override Conflict
            </button>
            <button
              className="simple-btn gentle-btn"
              onClick={() => handlePlaceAroundConflict("before")}
            >
              Place Before Conflict
            </button>
            <button
              className="simple-btn gentle-btn"
              onClick={() => handlePlaceAroundConflict("after")}
            >
              Place After Conflict
            </button>
            <button
              className="simple-btn cancel-btn"
              onClick={closeConflictOptions}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
