import React from "react";
import "./textInput.scss";
export default function TextInput(props) {
  const { name, value, placeholder, handleOnChange } = props;
  return (
    <div className="text-input">
      <input
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        maxLength={50}
      />
    </div>
  );
}
