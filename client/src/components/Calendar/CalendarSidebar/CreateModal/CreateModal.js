import React from "react";
import Modal from "../../../Modal/Modal";
import TextInput from "../../../Form/TextInput/TextInput";
import TextArea from "../../../Form/TextArea/TextArea";
export default function CreateModal({ showModal, setShowModal }) {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div>what</div>
      <TextInput />
      <TextArea />
    </Modal>
  );
}
