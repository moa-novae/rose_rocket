import { useState } from "react";

export default function useCreateModal(initialState) {
  const [form, setForm] = useState(initialState);
  console.log("form", form);
  function validateOnChange(name, newValue, oldValue) {
    switch (name) {
      case "startDay":
      case "endDay":
        if (newValue >= 0 && newValue <= 364) {
          return newValue;
        }
        return oldValue;
      case "startHour":
      case "endHour":
        if (newValue >= 0 && newValue < 24) {
          return newValue;
        }
        return oldValue;
      default:
        return newValue;
    }
  }
  function handleOnChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setForm((prev) => ({
      ...prev,
      [name]: validateOnChange(name, value, prev[name]),
    }));
  }
  function handleDriverChange(driver) {
    setForm((prev) => ({ ...prev, driver }));
  }
  function handleTaskTypeChange(taskType) {
    setForm((prev) => ({ ...prev, taskType }));
  }
  return { form, handleOnChange, handleDriverChange, handleTaskTypeChange };
}
