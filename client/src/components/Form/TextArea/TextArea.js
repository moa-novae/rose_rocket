import React from "react";
import "./textArea.scss";
export default function TextInput(props) {
  const { name, value, placeholder, handleOnChange } = props;
  return (
    <div className="text-area">
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        maxLength={400}
      />
    </div>
  );
}
