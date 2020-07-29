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
import "./createModal.scss";
export default function CreateModal({ showModal, setShowModal }) {
  const taskType = [{ name: "pickup" }, { name: "dropoff" }, { name: "other" }];
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="create-modal-content-wrapper">
        <div className="create-modal-first">
          <div className="task-name-input-wrapper">
            {/* choose task name */}
            <TextInput placeholder="Task Name" />
          </div>
          <div className="task-type-dd-wrapper">
            {/* choose task type */}
            <DropdownSingle list={taskType} title="Task Type" />
          </div>
        </div>
        <div className="create-modal-icon twos">
          <FontAwesomeIcon icon={faTruckMoving} />
          <DropdownSingle list={[]} title="Driver" />
        </div>

        <div className="create-modal-icon fours">
          <FontAwesomeIcon icon={faClock} />
          <TextInput placeholder="Day" />
          <DropdownSingle list={[]} title="Hour" />
          <span>-</span>
          <DropdownSingle list={[]} title="Hour" />
          <TextInput placeholder="Day" />
        </div>
        <div className="create-modal-icon twos">
          <FontAwesomeIcon icon={faMapMarkerAlt} />

          <DropdownSingle list={[]} title="Start" />
          <TextInput placeholder="Finish" />
        </div>
        <div className="create-modal-first description">
          <TextArea placeholder="Task Description" />
        </div>
      </div>
    </Modal>
  );
}
