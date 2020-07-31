import React, { useState, useEffect } from "react";
import { isHexColour } from "../../../../utils/helper";
import TextInput from "../../../Form/TextInput/TextInput";
import "./driverBgSelection.scss";
export default function DriverBgSelection({ driver, handleDriverBgChange }) {
  // this is to control text input
  const [inputColour, setInputColour] = useState(driver.colour);
  // not every inputted hex value is valid, so only update when valid
  function handleOnChange(e) {
    const newValue = e.target.value;
    setInputColour(newValue);
  }
  // on
  useEffect(() => {
    if (isHexColour.test(inputColour)) {
      handleDriverBgChange(inputColour, driver.id);
    }
  }, [inputColour]);
  return (
    <div className="driver-color-selection">
      <div className="driver-name">{driver.name}</div>
      <div style={{ borderBottom: `${inputColour} solid 2px` }}>
        <TextInput
          name="colour"
          value={inputColour}
          handleOnChange={handleOnChange}
        />
      </div>
    </div>
  );
}
