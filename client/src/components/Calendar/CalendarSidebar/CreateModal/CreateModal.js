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
export default function CreateModal({ drivers, showModal, setShowModal }) {
  const taskTypes = [
    { id: "pickup", name: "Pick up" },
    { id: "dropoff", name: "Drop off" },
    { id: "other", name: "Other" },
  ];
  const initialState = {
    name: "",
    taskType: {},
    driver: {},
    startDay: "",
    startHour: "",
    endHour: "",
    endDay: "",
    startLocation: "",
    endLocation: "",
    description: "",
  };
  const {
    form,
    handleOnChange,
    handleDriverChange,
    handleTaskTypeChange,
  } = useCreateModal(initialState);
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
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
          </div>
          <div className="task-type-dd-wrapper">
            {/* choose task type */}
            <DropdownSingle
              list={taskTypes}
              title="Task Type"
              selected={form.taskType}
              select={handleTaskTypeChange}
            />
          </div>
        </div>
        <div className="create-modal-icon twos">
          <FontAwesomeIcon icon={faTruckMoving} />
          <DropdownSingle
            list={drivers}
            title="Driver"
            selected={form.driver}
            select={handleDriverChange}
          />
        </div>

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
          <TextInput
            placeholder="Day"
            name="endDay"
            value={form.endDay}
            handleOnChange={handleOnChange}
          />
        </div>
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
            value={form.endhLocation}
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
      </div>
    </Modal>
  );
}
